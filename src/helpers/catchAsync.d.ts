import { NextFunction, RequestHandler, Request, Response } from 'express';

// export default (fn: RequestHandler) =>
// 	(req: Request, res: Response, next: NextFunction) =>
// 		fn(req, res, next).catch(next);
export = (fn: RequestHandler) => {
	return (req: Request, res: Response, next: NextFunction) => {
		fn(req, res, next).catch(next);
	};
};
