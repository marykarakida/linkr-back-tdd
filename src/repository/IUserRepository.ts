export interface IUserRepository {
  create: () => Promise<void>;
  exists: (email: string, name: string) => Promise<boolean>;
}
