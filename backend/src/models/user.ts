import mongoose, { Schema, Model, Document } from 'mongoose';
import validator from 'validator';
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
  // Validation

  if (!email || !password) {
    throw new Error('All fields must be filled!');
  }

  if (!validator.isEmail(email)) {
    throw new Error('Email is not valid!');
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error('Password is not strong enough!');
  }

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
