import { Request, Response, NextFunction } from 'express';

// Custom error handling middleware
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);

  // Handling specific types of errors
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    // For other types of errors
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Custom error class
class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export { errorHandler, CustomError };
