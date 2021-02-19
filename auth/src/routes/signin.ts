import express, {Response, Request} from "express";
import {body} from 'express-validator';
import jwt from 'jsonwebtoken';
import {User} from "../models/user";
import {BadRequestError, validateRequest} from "@middleware-errors/common";
import {PasswordService} from "../services/password-service";

const router = express.Router();

router.post(
    '/api/users/signin',
    [
        body('email')
            .isEmail()
            .notEmpty()
            .withMessage('Email must be provided'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('a password must be applied')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({email});

        if(!existingUser) {
            throw new BadRequestError('invalid credentials');
        }

        const correctPassword = await PasswordService.compare(existingUser.password, password);

        if (!correctPassword) {
            throw new BadRequestError('invalid credentials');
        }

        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        }, process.env.JWT_SECRET!);

        req.session = {
            jwt: userJwt
        };
        res.status(201).send(existingUser);
    });

export {router as signinRouter}
