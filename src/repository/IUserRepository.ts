export interface IUserRepository {
  create: () => Promise<void>;
  exists: () => Promise<boolean>;
}
