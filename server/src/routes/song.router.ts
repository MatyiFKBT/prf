import { Song } from "../db/Song";
import { NextFunction, Request, Response, Router } from "express";
import { isAuthenticated } from "../middlewares/auth";
import { z } from "zod";
import { Comment } from "../db/Comment";

const router = Router();

const newSongSchema = z.object({
	title: z.string().min(1).max(200),
	artist: z.string().min(1).max(200),
	link: z.string().min(1).max(200),
});

const validateNewSong = (req: Request, res: Response, next: NextFunction) => {
	const { success } = newSongSchema.safeParse(req.body);
	if (!success) {
		return res.status(400).json({ error: 'Invalid data' });
	}
	next();
}

const commentSchema = z.object({
	text: z.string().min(1).max(200),
});

const validateComment = (req: Request, res: Response, next: NextFunction) => {
	const { success } = commentSchema.safeParse(req.body);
	if (!success) {
		return res.status(400).json({ error: 'Invalid data' });
	}
	next();
}

router.post('/new',
	isAuthenticated,
	validateNewSong,
	(req, res) => {
		console.log('[song.router.ts]: POST /new')
		const { title, artist, link } = req.body;
		Song.create({ title, artist, link, user: req.user })
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

router.get('/my', isAuthenticated, (req, res) => {
	console.log('[song.router.ts]: GET /my')
	Song.find({ user: req.user! }).populate('user', 'username').populate('comments')
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
	Song.findById(id).populate('user', 'username').populate({
		path: 'comments',
		populate: {
			path: 'user',
			select: 'username'
		}
	})
		.then(song => {
			if (!song) {
				return res.status(404).json({ error: 'Song not found' });
			}
			return res.json(song);
		}).catch(err => {
			console.log({ err })
			return res.status(500).json({ error: err });
		})
})

router.put('/:id/like', isAuthenticated, async (req, res) => {
	console.log('[song.router.ts]: PUT /:id/like')
	const { id } = req.params;
	const song = await Song.findById(id).populate('user', 'username');
	if (!song) {
		return res.status(404).json({ error: 'Song not found' });
	}
	song.likes++;
	await song.save();
	return res.json(song);
})

router.post('/:id/comment',
	isAuthenticated,
	validateComment,
	async (req, res) => {
		console.log('[comment.router.ts]: POST /')
		const { text } = req.body;
		const comment = await Comment.create({ text, user: req.user, song: req.params.id })
		const song = await Song.findById(req.params.id)
		song!.comments.push(comment)
		await song!.save()
		return res.json(comment)
	})

router.delete('/:id', async (req, res) => {
	console.log('[song.router.ts]: DELETE /:id')
	const { id } = req.params;
	await Song.findByIdAndDelete(id);
	return res.json({ success: true });
})

export default router;