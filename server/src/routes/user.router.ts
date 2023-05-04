import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import { z } from 'zod';
const router = Router();

router.get('/', (req, res) => {
	res.send('user router')
})

// zod schema to validate incoming data

const loginSchema = z.object({
	username: z.string().min(3).max(20),
	password: z.string().min(3).max(20),
});

// middleware to validate incoming data

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
	const { success } = loginSchema.safeParse(req.body);
	if (!success) {
		return res.status(400).json({ error: 'Invalid data' });
	}
	next();
};

router.post('/login', validateLogin, (req, res) => {
	console.log('[user.router.ts]: POST /login')
	passport.authenticate('local', (err: any, user: Express.User, info: any) => {
		console.log({
			err, user, info
		})
		if (err) {
			return res.status(500).json({ error: err });
		}
		if (!user) {
			return res.status(400).json({ error: info.message });
		}
		req.login(user, (err) => {
			if (err) {
				return res.status(500).json({ error: err });
			}
			return res.json({ message: 'Login successful' });
		});
	})(req, res)
})

router.post('/logout', (req, res) => {
	if(req.isAuthenticated()){
		req.logout((err)=>{
			if(err) return res.status(500).json({error: err});
			return res.json({message: 'Logout successful'});
		});
	} else {
		return res.status(400).json({error: 'Not logged in'});
	}
})

router.get('/me', (req, res) => {
	if(req.isAuthenticated()){
		return res.json({user: req.user});
	}
	return res.status(400).json({error: 'Not logged in'});
})

export default router;