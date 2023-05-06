import { Song } from "../db/Song";
import { NextFunction, Request, Response, Router } from "express";
import { isAuthenticated } from "../middlewares/auth";
import { z } from "zod";

const router = Router();

const newSongSchema = z.object({
	title: z.string().min(3).max(20),
	artist: z.string().min(3).max(20),
	link: z.string().min(3).max(20),
});

const validateNewSong = (req: Request, res: Response, next: NextFunction) => {
	const { success } = newSongSchema.safeParse(req.body);
	if (!success) {
		return res.status(400).json({ error: 'Invalid data' });
	}
	next();
}

router.post('/new',
	// isAuthenticated,
	validateNewSong,
	(req, res) => {
		console.log('[song.router.ts]: POST /new')
		const { title, artist, link } = req.body;
		Song.create({ title, artist, link })
			.then(song => {
				return res.json(song);
			})
			.catch(err => {
				return res.status(500).json({ error: err });
			})
	})

router.get('/all', (req, res) => {
	console.log('[song.router.ts]: GET /all')
	Song.find().populate('user', 'username')
		.then(songs => {
			return res.json(songs);
		})
		.catch(err => {
			return res.status(500).json({ error: err });
		})
})

router.get('/:id', (req, res) => {
	console.log('[song.router.ts]: GET /:id')
	const { id } = req.params;
	Song.findById(id).populate('user', 'username')
		.then(song => {
			if (!song) {
				return res.status(404).json({ error: 'Song not found' });
			}
			return res.json(song);
		}).catch(err => {
			return res.status(500).json({ error: err });
		})
})

router.delete('/:id', async (req, res) => {
	console.log('[song.router.ts]: DELETE /:id')
	const { id } = req.params;
	await Song.findByIdAndDelete(id);
	return res.json({ success: true });
})

export default router;