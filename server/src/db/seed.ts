import { User } from "./User";

export async function seed() {
	try {
		const admin = await User.findOne({ username: 'admin' });
		if (!admin) {
			const newAdmin = new User({
				username: 'admin',
				password: 'matyi',
				role: 'admin'
			});
			await newAdmin.save();
			console.log('[db]: Admin user created');
		}
	} catch (err) {
		console.log(`Error seeding database: ${err}`);
	}
}