import mongoose, { Schema, Model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser extends Document {
  email: string;
  password: string;
}

interface IUserModel extends Model<IUser> {
  signup(email: string, password: string): Promise<IUser>;
}

const userSchema = new Schema<IUser, IUserModel>({
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

// User Static Methods
userSchema.statics.signup = async function (
  email: string,
  password: string
): Promise<IUser> {
  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw new Error('Email already is use!');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

const User = mongoose.model<IUser, IUserModel>('User', userSchema);

export default User;
