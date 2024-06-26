import mongoose, { Schema, Model, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
}

type UserModel = Model<IUser>;

const userSchema = new Schema<IUser, UserModel>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<IUser, UserModel>('User', userSchema);

export default User;
