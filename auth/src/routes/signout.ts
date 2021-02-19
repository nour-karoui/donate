import express, {Response, Request} from "express";
import {requireAuth} from '@middleware-errors/common';
const router = express.Router();

router.post(
    '/api/users/signout',
    requireAuth,
    (req: Request, res: Response) => {
        req.session = null;
        res.send({});
    });

export {router as signoutRouter}
