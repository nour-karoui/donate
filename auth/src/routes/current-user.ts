import express, {Response, Request} from "express";
import {currentUser} from "@middleware-errors/common";

const router = express.Router();

router.get(
    '/api/users/current-user',
    (req: Request, res: Response) => {
        res.send({currentUser: req.currentUser || null});
    });

export {router as currentUserRouter}
