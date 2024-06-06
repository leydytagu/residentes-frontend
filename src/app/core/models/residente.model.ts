export class ResidenteModel {
  constructor(
    public readonly _id: string,
    public identificacion: string,
    public nombre: string,
    public apellido: string,
    public celular: string,
    public correo: string,
    public apartamento: string,
    public createdAt: string,
    public password: string,
    public rol: string
  ) {}
}
