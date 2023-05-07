import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	artist: {
		type: String,
		required: true,
	},
	link: {
		type: String,
		required: true,

	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	likes: {
		type: Number,
		default: 0,
	},
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment',
	}]
}, {
	timestamps: true,
})

interface ISong extends mongoose.Document {
	title: string;
	artist: string;
	link: string;
	user: string;
	likes: number;
	comments: any[];
}

type SongModel = mongoose.Model<ISong, {}, {}>;
export const Song = mongoose.model<ISong, SongModel>('Song', songSchema);