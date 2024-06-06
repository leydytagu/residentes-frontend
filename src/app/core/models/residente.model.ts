export class ResidenteModel {
  constructor(
    public readonly _id: string,
    public nombre: string,
    public email: string,
    public tipoDocumento: string,
    public numeroDocumente: string,
    public rol: string,
    public createAt: Date,
    public numeroCelular?: number,
    public peso?: string,
    public fechaNacimiento?: Date,
    public password?: string
  ) {}
}
