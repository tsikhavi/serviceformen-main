import { ICity } from "../../core/city";
import { ICountry } from "../../core/country";

export interface IFilter {
  searchedModel: string;
  selectedCountry: ICountry;
  selectedCity: ICity;
  modelTypes: number[];
  countries: number[];
  cities: number[];
  districts: number[];
  undergrounds: number[];
  minAge: number;
  maxAge: number;
  hairColors: number[];
  hairSizes: number[];
  pubisHairs: number[];
  breastSizes: number[];
  breastTypes: number[];
  trips: number[];
  minWeight: number;
  maxWeight: number;
  minHeight: number;
  maxHeight: number;
  meetingPlaces: number[];
  services: number[];
  ethnicGroups: number[];
  nationalities: number[];
  languages: number[];
  smookers: number[];
  piercings: number[];
  tatoos: number[];
  eyesColors: number[];
  orientations: number[];
  tarifs: number[][];
}
