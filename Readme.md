## Reachinbox assignment

In this assignment I developed a server with nodejs and typescript.

### Run the app


1. Clone the repository
    ```
    git clone https://github.com/DarkNinja15/reachinbox-assignment.git
    cd reachinbox-assignment
    ```

2. install dependencies

    ```
    npm i
    ```
3. add .env

    ```
    PORT = 3000
    GOOGLE_CLIENT_ID = ***
    GOOGLE_CLIENT_SECRET = ***
    GOOGLE_REDIRECT_URI = ***
    GOOGLE_REFRESH_TOKEN = ***
    OPENAI_SECRECT_KEY = ***
    ```

4. In you google cloud console, turn on the gmail apis, and created an oauth service where you need to paste the GOOGLE_REDIRECT_URI. which will be http://localhost:PORT/auth/google/callback

3. Run redis locally

    ```
    docker run -d -p 6379:6379 redis/redis-stack
    ```

4. Run the server

    ```
    npm run dev
    ```
5. Now just go to http://localhost:PORT in your browser to acess it.



