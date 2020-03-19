import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export function validateUser(req: Request, res: Response, next: NextFunction) {
    const token: any = req.headers['x-access-token'] ;
    const private_key: string = process.env.PRIVATE_KEY || '';
    verify(token, private_key, (err: any, decoded: any) => {
        if(err) {
            res.status(401).json({
                status: 'failed',
                message: 'your session expired',
                data: null
            });
        } else {
            req.body.userId = decoded.id;
            next();
        }
    });
}