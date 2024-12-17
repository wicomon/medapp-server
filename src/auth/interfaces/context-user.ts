export interface IContextUser {
  idUser: number;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  refreshToken: string;
  idCompany: number;
}
