import { Request, Response, NextFunction } from "express";

/*
 * first arg is min time in millisecond,
 * second arg random time in millisecond add on top of min time
 */
export default (base: number, max: number) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  setTimeout(next, Math.floor(base + Math.random() * max));
};
