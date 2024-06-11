import Swal from 'sweetalert2';

export function mostrarError(error: any) {
  const errores = error.error.errores;

  if (errores && Object.keys(errores).length > 0) {
    const errorObject: any = errores[Object.keys(errores)[0]];
    Swal.fire({
      title: 'Error',
      html: `${errorObject.msg}`,
      icon: 'warning',
    });
  } else {
    Swal.fire('Error', `${error.error.msg}`, 'error');
  }
}
