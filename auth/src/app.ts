import express from 'express';
import cors from 'cors';
import {json} from 'body-parser';
import 'express-async-errors';
import {currentUser, errorHandler} from "@middleware-errors/common";
import  cookieSession  from 'cookie-session'
import {signupRouter} from "./routes/signup";
import {signoutRouter} from "./routes/signout";
import {signinRouter} from "./routes/signin";
import {currentUserRouter} from "./routes/current-user";


const app = express();

app
    .set('trust proxy', true)
    .use(cors())
    .use(json())
    .use(cookieSession({
        signed: false,
        secure: true
    }))
    .use(currentUser)
    .use(signupRouter)
    .use(signoutRouter)
    .use(signinRouter)
    .use(currentUserRouter)
    .use(errorHandler);

export {app}
