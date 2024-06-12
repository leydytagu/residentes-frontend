export interface LoginInterface {
  email: string;
  password: string;
}

export interface OlvidoInterface {
  email: string;
  numeroDocumento: string;
}

export interface RegistroInterface {
  identificacion: string;
  nombre: string;
  apellido: string;
  celular: string;
  correo: string;
  apartamento: string;
  password: string;
  rol?: string;
}
