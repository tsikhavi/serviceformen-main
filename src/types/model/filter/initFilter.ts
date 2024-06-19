import { ICity } from "../../core/city";
import { ICountry } from "../../core/country";
import { IFilter } from "./filter";

export function initFilter(): IFilter {
  const defaults = {
    searchedModel: "",
    selectedCountry: { id: -1 } as ICountry,
    selectedCity: { id: -1 } as ICity,
    modelTypes: [] as number[],
    countries: [] as number[],
    cities: [] as number[],
    districts: [] as number[],
    undergrounds: [] as number[],
    minAge: 18,
    maxAge: 65,
    hairColors: [] as number[],
    hairSizes: [] as number[],
    pubisHairs: [] as number[],
    breastSizes: [] as number[],
    breastTypes: [] as number[],
    trips: [] as number[],
    minWeight: 40,
    maxWeight: 125,
    minHeight: 150,
    maxHeight: 220,
    meetingPlaces: [] as number[],
    services: [] as number[],
    ethnicGroups: [] as number[],
    nationalities: [] as number[],
    languages: [] as number[],
    smookers: [] as number[],
    piercings: [] as number[],
    tatoos: [] as number[],
    eyesColors: [] as number[],
    orientations: [] as number[],
    tarifs: [] as number[][],
  };

  return {
    ...defaults,
  };
}
