import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

export interface IUserModel extends IUser, Document {
    createdAt: Date;
    updatedAt: Date;
    matchPassword(enteredPassword: string): Promise<Boolean>;
  }
const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, required: true, default: false },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

export default mongoose.model<IUserModel>('User', UserSchema);
