import { IService } from "./service";

export interface IServiceCategory {
  id: number;
  service_category: string;
  service_category_eng: string;
  services: IService[];
}
