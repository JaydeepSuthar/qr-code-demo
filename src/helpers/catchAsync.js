module.exports = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch(next);
	};
};

// export const asyncHandler =
// 	(fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) =>
// 		Promise.resolve(fn(req, res, next)).catch(next);
