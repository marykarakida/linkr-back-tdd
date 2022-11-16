import { Request, Response } from 'express';

import { BaseController } from '@/core/infra/BaseController';
import { SignUpDTO } from './SignUpDto';
import { SignUpUseCase } from './SignUpUseCase';
import { SignUpErrors } from './SignUpErrors';

export class SignUpController extends BaseController {
  private useCase: SignUpUseCase;

  constructor(useCase: SignUpUseCase) {
    super();
    this.useCase = useCase;
  }

  async execute(req: Request, res: Response): Promise<any> {
    const dto: SignUpDTO = {
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      pictureUrl: req.body.pictureUrl,
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isFailure) {
        const error = result.getErrorValue();

        switch (result.constructor) {
          case SignUpErrors.UserAlreadyExistsError:
            return this.conflict(res, error);
          default:
            return this.fail(res, error);
        }
      }

      return this.created(res);
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
