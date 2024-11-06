import { Queue, Worker } from "bullmq";
import { REDIS_CONFIG } from "./config/redis.confi";
import { FETCH_EMAILS_QUEUE, SEND_REPLIES_QUEUE } from "./constants/constants";
import { GmailService } from "./services/gmail.service";

const fetchEmailsQueue = new Queue(FETCH_EMAILS_QUEUE, {
    connection: REDIS_CONFIG
});

const sendRepliesQueue = new Queue(SEND_REPLIES_QUEUE, {
    connection: REDIS_CONFIG
});

const emailFetchingWorker = new Worker(
    FETCH_EMAILS_QUEUE, 
    async (job) => {
        const { tokens } = job.data;
        const gmailService = new GmailService(tokens);
        
        const emails = await gmailService.listEmails();
        console.log(emails);
        
        for (const email of emails) {
            await sendRepliesQueue.add('process-reply', {
                tokens,
                emailData: email
            });
        }
        
        return `Processed ${emails.length} emails`;
    },
    {
        connection: REDIS_CONFIG
    }
);

const replySendingWorker = new Worker(
    SEND_REPLIES_QUEUE, 
    async (job) => {
        const { tokens, emailData } = job.data;
        const gmailService = new GmailService(tokens);
        
        const replyContent = `Thank you for your email regarding "${emailData.subject}".\n\n`
            + "I am currently out of office and will respond to your message as soon as possible.\n\n"
            + "Best regards";
        
        const replyData: ReplyData = {
            to: emailData.from,
            subject: emailData.subject,
            content: replyContent,
            threadId: emailData.threadId
        };
        
        await gmailService.sendReply(replyData);

        console.log(`Sent reply to ${emailData.from}`);
        
        // return `Sent reply to ${emailData.from}`;
    },
    { 
        connection: REDIS_CONFIG,
    }
);


export async function startEmailProcessing(tokens: any) {
    try {
        await fetchEmailsQueue.add('fetch-emails', { tokens }, {
            repeat: {
                every: 5 * 60 * 1000
            }
        });
        
        console.log('Email processing started');
    } catch (error) {
        console.error('Error starting email processing:', error);
        throw error;
    }
}