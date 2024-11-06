"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var google_oauth_service_1 = require("./services/google.oauth.service");
dotenv_1.default.config();
var app = (0, express_1.default)();
var googleOAuth = new google_oauth_service_1.GoogleOAuthService((_a = process.env.GOOGLE_CLIENT_ID) !== null && _a !== void 0 ? _a : "", (_b = process.env.GOOGLE_CLIENT_SECRET) !== null && _b !== void 0 ? _b : "", (_c = process.env.GOOGLE_REDIRECT_URI) !== null && _c !== void 0 ? _c : "");
app.get('/', function (req, res) {
    res.send("\n        <h1>Welcome to OAuth Demo</h1>\n        <a href=\"/auth/google\">Sign in with Google</a>\n    ");
});
app.get('/auth/google', function (req, res) {
    var authUrl = googleOAuth.getAuthorizationUrl();
    res.redirect(authUrl);
});
app.get('/auth/google/callback', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var code, tokens, userInfo, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                code = req.query.code;
                return [4 /*yield*/, googleOAuth.getTokensFromCode(code)];
            case 1:
                tokens = _a.sent();
                return [4 /*yield*/, googleOAuth.getUserInfo(tokens.access_token)];
            case 2:
                userInfo = _a.sent();
                // Store tokens and user info in your database
                // ...
                console.log(tokens.access_token);
                res.send("\n            <h1>Login Successful!</h1>\n            <h2>User Info:</h2>\n            <pre>".concat(JSON.stringify(userInfo, null, 2), "</pre>\n        "));
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                res.redirect('/error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
var PORT = (_d = process.env.PORT) !== null && _d !== void 0 ? _d : 8080;
app.listen(PORT, function () {
    console.log("Server started on port", PORT);
});
