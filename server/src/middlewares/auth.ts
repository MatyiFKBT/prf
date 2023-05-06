// middleware to check if we have an authenticated user
import { NextFunction, Request, Response } from "express";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
	if (req.isAuthenticated()) {
		return next();
	}
	return res.status(401).json({ error: 'Not authenticated' });
}
