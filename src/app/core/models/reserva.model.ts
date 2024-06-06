export class ReservaModel {
  constructor(
    public readonly _id: string,
    public servicio: {
      _id: string;
      nombre: string;
      descripcion: string;
      apertura: string;
      cierre: string;
    },
    public usuario: {
      _id: string;
      nombre: string;
    },
    public residente: {
      _id: string;
      nombre: string;
      apellido: string;
      identificacion: string;
      celular: string;
    },
    public comentarios: string,
    public createdAt: string,
    public hora: string
  ) {}
}
