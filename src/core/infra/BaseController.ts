import { Request, Response } from 'express';

export abstract class BaseController {
  protected abstract execute(req: Request, res: Response): Promise<void | any>;

  public created(res: Response) {
    return res.sendStatus(201);
  }

  public conflict(res: Response, message: string = 'Conflict') {
    return res.status(409).json({ message });
  }

  public fail(res: Response, error: any) {
    console.log(error);
    return res.status(500).json({ message: error.toString() });
  }
}
