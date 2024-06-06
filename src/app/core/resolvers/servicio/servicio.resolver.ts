import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {inject} from "@angular/core";
import {ServiciosService} from "../../../services/servicios.service";

export const servicioResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(ServiciosService).getServicios();
};
