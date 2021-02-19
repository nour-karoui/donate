import express, {Response, Request} from "express";
import {body, validationResult} from "express-validator";
import {RequestValidationError, BadRequestError} from "@middleware-errors/common";
import {User} from "../models/user";
import jwt from 'jsonwebtoken';
import {validateRequest} from "@middleware-errors/common/build/middlewares/validate-request";

const router = express.Router();

// for creating a new user we use User.build() instead of new User()

router.post(
    '/api/users/signup',
    [
        body('email')
            .isEmail()
            .notEmpty()
            .withMessage('an email must be provided'),
        body('password')
            .trim()
            .notEmpty()
            .isLength({min: 4, max: 20})
            .withMessage('a password must be provided and should be between 4 and 20 characters')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) {
            throw new BadRequestError('Email already in use')
        }
        const user = User.build({email, password});
        await user.save();
        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_SECRET!);
        req.session = {jwt: userJwt};
        res.status(201).send(user);
    });

export {router as signupRouter}
