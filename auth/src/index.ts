import {app} from "./app";
import mongoose from "mongoose";

const start = async () => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT KEY MUST BE DEFINED');
    }
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('everything in place');
    }catch (e) {
        console.log('there\'s been an error', e)
    }

    app.listen(3000, () => {
        console.log('listening on port 3000');
    });
}

start();


