export interface IGenerateToken {
  userId: number;
  expirationTime: string;
  profile: string;
  secret: string;
}
