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
	}
}, {
	timestamps: true,
})

interface ISong extends mongoose.Document {
	title: string;
	artist: string;
	link: string;
	user: string;
}

type SongModel = mongoose.Model<ISong, {}, {}>;
export const Song = mongoose.model<ISong, SongModel>('Song', songSchema);