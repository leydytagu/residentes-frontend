export interface MenuInterface {
  path: string;
  title: string;
  icon?: string;
  classCss?: string;
  submenu?: MenuInterface[];
}
