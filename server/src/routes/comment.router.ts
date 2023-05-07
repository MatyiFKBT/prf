import { NextFunction, Request, Response, Router } from "express";
import { isAuthenticated } from "middlewares/auth";
import { z } from "zod";
import { Comment } from "../db/Comment";
import router from "./user.router";
const r = Router()

const commentSchema = z.object({
    text: z.string().min(3).max(20),
    songId: z.string().min(3).max(20),
});

const validateComment = (req: Request, res: Response, next: NextFunction) => {
    const { success } = commentSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ error: 'Invalid data' });
    }
    next();
}

r.post('/',
    isAuthenticated,
    validateComment,
    (req, res) => {
        console.log('[comment.router.ts]: POST /')
        const { text, songId } = req.body;
        Comment.create({ text, user: req.user, song: songId })
            .then(comment => { return res.json(comment) })
            .catch(err => { return res.status(500).json({ error: err }) })
    })

router.get('/', (req, res) => {
    console.log('[comment.router.ts]: GET /')
    Comment.find().populate('user', 'username')
        .then(comments => { return res.json(comments) })
        .catch(err => { return res.status(500).json({ error: err }) })
})

router.get('/:id', (req, res) => {
    console.log('[comment.router.ts]: GET /:id')
    Comment.findById(req.params.id).populate('user', 'username')
        .then(comment => { return res.json(comment) })
        .catch(err => { return res.status(500).json({ error: err }) })
})

router.put('/:id', isAuthenticated, (req, res) => {
    console.log('[comment.router.ts]: PUT /:id')
    Comment.findById(req.params.id)
        .then(comment => {
            if (comment?.user.toString() !== req.user?.toString()) {
                return res.status(403).json({ error: 'Unauthorized' })
            }
            comment!.text = req.body.text;
            comment!.save()
                .then(comment => { return res.json(comment) })
                .catch(err => { return res.status(500).json({ error: err }) })
        })
        .catch(err => { return res.status(500).json({ error: err }) })
}