export class ServicioModel {
  constructor(
    public readonly _id: string,
    public nombre: string,
    public descripcion: string,
    public apertura: string,
    public cierre: string,
    public dias: string,
    public encargado: string,
    public estado: boolean,
    public createdAt: string,
    public usuario: { _id: string; nombre: string }
  ) {}
}
