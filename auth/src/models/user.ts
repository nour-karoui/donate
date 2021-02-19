import mongoose from 'mongoose';
import {PasswordService} from "../services/password-service";

// an interface that describes the properties of a new user
interface UserAttributes {
    email: string,
    password: string
}

// an interface that describes the properties that a user model (the model in general) has
// (the build method for example)
interface UserModel extends mongoose.Model<UserDocument> {
    build(attrs: UserAttributes): UserDocument;
}

// an interface that describes the properties of a User Document
interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
        },
        versionKey: false
    }
});

userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const hashed = await PasswordService.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

userSchema.statics.build = (attrs: UserAttributes) => {
    return new User(attrs);
}

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export {User}
