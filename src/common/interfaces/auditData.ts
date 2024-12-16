export interface IAuditData {
  idRegister: string;
  table: string;
  action: string;
  value: string;
  idUser: number;
  idCompany: number;
  date: Date;
}
