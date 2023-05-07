import mongoose from 'mongoose';
import { hash, verify } from 'argon2';
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true,
		default: "user"
	},
	songs: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Song',
	}],
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment',
	}]
}, {
	timestamps: true,
})

userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await hash(this.password);
	}
	next();
});

userSchema.methods.comparePassword = async function (password: string) {
	return await verify(this.password, password);
}

interface IUser extends mongoose.Document {
	username: string;
	password: string;
	role: string;
}
interface IUserMethods {
	comparePassword: (password: string) => Promise<boolean>;
}
type UserModel = mongoose.Model<IUser, {}, IUserMethods>;
export const User = mongoose.model<IUser, UserModel>('User', userSchema);