import { UserRepository } from '../../repos/userRepository';
import { SignUpUseCase } from './SignUpUseCase';
import { SignUpController } from './SignUpController';

export function signUpControllerFactory(): SignUpController {
  const userRepository = new UserRepository();
  const signUpUseCase = new SignUpUseCase(userRepository);
  const signUpController = new SignUpController(signUpUseCase);

  return signUpController;
}
