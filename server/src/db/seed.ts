import { User } from "./User";
import { Song } from "./Song";
import { Comment } from "./Comment";

const users = [
	{ username: 'admin', password: 'matyi', role: 'admin' },
	{ username: 'felhasznalo', password: 'jelszo', role: 'user' },
	{ username: 'masikFelhasznalo', password: 'masikJelszo', role: 'user' }
]

export async function seed() {
	try {
		await User.deleteMany({});
		await Song.deleteMany({});
		await Comment.deleteMany({});
		console.log('[db]: collections cleared');
		const [admin, user1, user2] = await Promise.all(users.map((user) => {
			const newUser = new User(user);
			return newUser.save();
		}))
		console.log('[db]: users created');
		// check if there are any songs in the database
		await Song.deleteMany({});
		const newSong = new Song({
			title: 'Never Gonna Give You Up',
			artist: 'Rick Astley',
			link: 'https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT',
			user: admin?._id
		});
		await newSong.save();
		console.log('[db]: Song created');
		const newComment = new Comment({
			text: "yooooo ez a kedvenc zeném",
			user: admin?._id,
			song: newSong?._id
		});
		await newComment.save();
		console.log('[db]: Comment added');

	} catch (err) {
		console.log(`Error seeding database: ${err}`);
	}
}