import { Request, Response, NextFunction } from 'express';

export class SchemaMiddleware<T> {
  private schemas;

  constructor(schemas: any) {
    this.schemas = schemas;
  }

  private unprocessableEntity(res: Response, message: { [key: string]: string }[]) {
    return res.status(422).send({ message });
  }

  validate(schema: T) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error } = this.schemas[schema].validate(req.body, { abortEarly: false });

      if (error) {
        const messages = error.details.map(({ message }: { message: string }) => message);

        return this.unprocessableEntity(res, messages);
      }

      return next();
    };
  }
}
