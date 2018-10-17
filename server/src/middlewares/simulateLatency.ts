import { Request, Response, NextFunction } from "express";

export default (base: number, max: number) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  setTimeout(next, Math.floor(base + Math.random() * max));
};
