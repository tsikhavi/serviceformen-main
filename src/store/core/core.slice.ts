import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  getBreastSizes,
  getBreastTypes,
  getCities,
  getCountries,
  getCurrencies,
  getDaysOfWeek,
  getDistricts,
  getLogins,
  addDistrict,
  updateDistrict,
  deleteDistrict,
  getEthnicGroups,
  getEyesColors,
  getHairColors,
  getHairSizes,
  getSiteLanguages,
  getMeetingPlaces,
  getMeetings,
  getlanguages,
  getModelTypes,
  getNationalities,
  getOrientations,
  getPiercings,
  getPubisHairs,
  getServiceCategories,
  getSmookers,
  getTatoos,
  getTrips,
  getUndergrounds,
  addUnderground,
  updateUnderground,
  deleteUnderground,
  getWorkDurations,
  getProposalPlaces,
  addLogin,
  updateLogin,
  deleteLogin,
} from "./core.actions";

import { ISiteLanguage } from "../../types/core/siteLanguage";
import { ICountry } from "../../types/core/country";
import { ICity } from "../../types/core/city";
import { IDistrict } from "../../types/core/district";
import { IUnderground } from "../../types/core/underground";
import { IModelType } from "../../types/core/modelType";
import { IOrientation } from "../../types/core/orientation";
import { IMeeting } from "../../types/core/meeting";
import { IMeetingPlace } from "../../types/core/meetingPlace";
import { IEthnicGroup } from "../../types/core/ethnicGroup";
import { IHairColor } from "../../types/core/hairColor";
import { IHairSize } from "../../types/core/hairSize";
import { IPubisHair } from "../../types/core/pubisHair";
import { IBreastSize } from "../../types/core/breastSize";
import { IBreastType } from "../../types/core/breastType";
import { INationality } from "../../types/core/nationality";
import { ITrip } from "../../types/core/trip";
import { ILanguage } from "../../types/model/language/language";
import { ITatoo } from "../../types/core/tatoo";
import { ISmooker } from "../../types/core/smooker";
import { IEyesColor } from "../../types/core/eyesColor";
import { ICurrency } from "../../types/core/currency";
import { IWorkDuration } from "../../types/core/workDuration";
import { IDayOfWeek } from "../../types/core/dayOfWeek";
import { IServiceCategory } from "src/types/core/serviceCategory";
import { IPiercing } from "../../types/model/piercing/piercing";
import { IProposalPlace } from "../../types/core/proposalPlace";
import { ILogin } from "src/types/core/logins";

interface ICoreState {
  logins: ILogin[];
  siteLanguages: ISiteLanguage[];
  countries: ICountry[];
  cities: ICity[];
  districts: IDistrict[];
  undergrounds: IUnderground[];
  modelTypes: IModelType[];
  orientations: IOrientation[];
  meetings: IMeeting[];
  meetingPlaces: IMeetingPlace[];
  ethnicGroups: IEthnicGroup[];
  hairColors: IHairColor[];
  hairSizes: IHairSize[];
  pubisHairs: IPubisHair[];
  breastSizes: IBreastSize[];
  breastTypes: IBreastType[];
  nationalities: INationality[];
  trips: ITrip[];
  languages: ILanguage[];
  tatoos: ITatoo[];
  smookers: ISmooker[];
  eyesColors: IEyesColor[];
  currencies: ICurrency[];
  workDurations: IWorkDuration[];
  daysOfWeek: IDayOfWeek[];
  serviceCategories: IServiceCategory[];
  piercings: IPiercing[];
  proposalPlaces: IProposalPlace[];
  isLoading: boolean;
  status: string;
}

const initialState: ICoreState = {
  siteLanguages: [] as ISiteLanguage[],
  countries: [] as ICountry[],
  cities: [] as ICity[],
  districts: [] as IDistrict[],
  logins: [] as ILogin[],
  undergrounds: [] as IUnderground[],
  modelTypes: [] as IModelType[],
  orientations: [] as IOrientation[],
  meetings: [] as IMeeting[],
  meetingPlaces: [] as IMeetingPlace[],
  ethnicGroups: [] as IEthnicGroup[],
  hairColors: [] as IHairColor[],
  hairSizes: [] as IHairSize[],
  pubisHairs: [] as IPubisHair[],
  breastSizes: [] as IBreastSize[],
  breastTypes: [] as IBreastType[],
  nationalities: [] as INationality[],
  trips: [] as ITrip[],
  languages: [] as ILanguage[],
  tatoos: [] as ITatoo[],
  smookers: [] as ISmooker[],
  eyesColors: [] as IEyesColor[],
  currencies: [] as ICurrency[],
  workDurations: [] as IWorkDuration[],
  daysOfWeek: [] as IDayOfWeek[],
  serviceCategories: [] as IServiceCategory[],
  piercings: [] as IPiercing[],
  proposalPlaces: [] as IProposalPlace[],
  isLoading: false,
  status: "",
};

export const coreSlice = createSlice({
  name: "core",
  initialState,
  reducers: {
    setCities(state, action: PayloadAction<ICity[]>) {
      state.cities = action.payload;
    },
    setCountries(state, action: PayloadAction<ICountry[]>) {
      state.countries = action.payload;
    },
    setDistricts(state, action: PayloadAction<IDistrict[]>) {
      state.districts = action.payload;
    },
    setLogins(state, action: PayloadAction<ILogin[]>) {
      state.logins = action.payload;
    },
    setUndergrounds(state, action: PayloadAction<IUnderground[]>) {
      state.undergrounds = action.payload;
    },
    setModelTypes(state, action: PayloadAction<IModelType[]>) {
      state.modelTypes = action.payload;
    },
    setOrientations(state, action: PayloadAction<IOrientation[]>) {
      state.orientations = action.payload;
    },
    setMeetings(state, action: PayloadAction<IMeeting[]>) {
      state.meetings = action.payload;
    },
    setMeetingPlaces(state, action: PayloadAction<IMeetingPlace[]>) {
      state.meetingPlaces = action.payload;
    },
    setEthnicGroups(state, action: PayloadAction<IEthnicGroup[]>) {
      state.ethnicGroups = action.payload;
    },
    setHairColors(state, action: PayloadAction<IHairColor[]>) {
      state.hairColors = action.payload;
    },
    setHairSizes(state, action: PayloadAction<IHairSize[]>) {
      state.hairSizes = action.payload;
    },
    setPubisHairs(state, action: PayloadAction<IPubisHair[]>) {
      state.pubisHairs = action.payload;
    },
    setBreastSizes(state, action: PayloadAction<IBreastSize[]>) {
      state.breastSizes = action.payload;
    },
    setBreastTypes(state, action: PayloadAction<IBreastType[]>) {
      state.breastTypes = action.payload;
    },
    setNationalities(state, action: PayloadAction<INationality[]>) {
      state.nationalities = action.payload;
    },
    setTrips(state, action: PayloadAction<ITrip[]>) {
      state.trips = action.payload;
    },
    setLanguages(state, action: PayloadAction<ILanguage[]>) {
      state.languages = action.payload;
    },
    setTatoos(state, action: PayloadAction<ITatoo[]>) {
      state.tatoos = action.payload;
    },
    setSmookers(state, action: PayloadAction<ISmooker[]>) {
      state.smookers = action.payload;
    },
    setEyesColors(state, action: PayloadAction<IEyesColor[]>) {
      state.eyesColors = action.payload;
    },
    setPiercings(state, action: PayloadAction<IPiercing[]>) {
      state.piercings = action.payload;
    },
  },
  extraReducers: (builder) => {
    //#region Languages
    builder.addCase(getSiteLanguages.pending, (state) => {
      state.isLoading = true;
      state.status = "getSiteLanguages in process";
    });
    builder.addCase(getSiteLanguages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.siteLanguages = [];
      state.siteLanguages = action.payload as ISiteLanguage[];
      state.status = "getSiteLanguages success";
    });
    builder.addCase(getSiteLanguages.rejected, (state) => {
      state.isLoading = false;
      state.siteLanguages = [];
      state.status = "getSiteLanguages error";
    });
    //#endregion

    //#region Location
    builder.addCase(getCountries.pending, (state) => {
      state.isLoading = true;
      state.status = "getCountries in process";
    });
    builder.addCase(getCountries.fulfilled, (state, action) => {
      state.isLoading = false;
      state.countries = [];
      state.countries = action.payload as ICountry[];
      state.status = "getCountries success";
    });
    builder.addCase(getCountries.rejected, (state) => {
      state.isLoading = false;
      state.countries = [];
      state.status = "getCountries error";
    });

    builder.addCase(getCities.pending, (state) => {
      state.isLoading = true;
      state.status = "getCities in process";
    });
    builder.addCase(getCities.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cities = [];
      state.cities = action.payload as ICity[];
      state.status = "getCities success";
    });
    builder.addCase(getCities.rejected, (state) => {
      state.isLoading = false;
      state.cities = [];
      state.status = "getCities error";
    });

    builder.addCase(getDistricts.pending, (state) => {
      state.isLoading = true;
      state.status = "getDistricts in process";
    });
    builder.addCase(getDistricts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.districts = [];
      state.districts = action.payload as IDistrict[];
      state.status = "getDistricts success";
    });
    builder.addCase(getDistricts.rejected, (state) => {
      state.isLoading = false;
      state.districts = [];
      state.status = "getDistricts error";
    });
    
    builder.addCase(getLogins.pending, (state) => {
      state.isLoading = true;
      state.status = "getLogins in process";
    });
    builder.addCase(getLogins.fulfilled, (state, action) => {
      state.isLoading = false;
      state.logins = [];
      state.logins = action.payload as ILogin[];
      state.status = "getLogins success";
    });
    builder.addCase(getLogins.rejected, (state) => {
      state.isLoading = false;
      state.logins = [];
      state.status = "getLogins error";
    });
    
    builder.addCase(addDistrict.pending, (state) => {
      state.isLoading = true;
      state.status = "addDistrict in process";
    });
    builder.addCase(addDistrict.fulfilled, (state) => {
      state.isLoading = false;
      state.status = "addDistrict success";
    });
    builder.addCase(addDistrict.rejected, (state) => {
      state.isLoading = false;
      state.status = "addDistrict error";
    });

    
    builder.addCase(updateDistrict.pending, (state) => {
      state.isLoading = true;
      state.status = "updateDistrict in process";
    });
    builder.addCase(updateDistrict.fulfilled, (state) => {
      state.isLoading = false;
      state.status = "updateDistrict success";
    });
    builder.addCase(updateDistrict.rejected, (state) => {
      state.isLoading = false;
      state.status = "updateDistrict error";
    });

    
    builder.addCase(deleteDistrict.pending, (state) => {
      state.isLoading = true;
      state.status = "deleteDistrict in process";
    });
    builder.addCase(deleteDistrict.fulfilled, (state) => {
      state.isLoading = false;
      state.status = "deleteDistrict success";
    });
    builder.addCase(deleteDistrict.rejected, (state) => {
      state.isLoading = false;
      state.status = "deleteDistrict error";
    });

    builder.addCase(addLogin.pending, (state) => {
      state.isLoading = true;
      state.status = "addLogin in process";
    });
    builder.addCase(addLogin.fulfilled, (state) => {
      state.isLoading = false;
      state.status = "addLogin success";
    });
    builder.addCase(addLogin.rejected, (state) => {
      state.isLoading = false;
      state.status = "addLogin error";
    });
    
    builder.addCase(updateLogin.pending, (state) => {
      state.isLoading = true;
      state.status = "updateLogin in process";
    });
    builder.addCase(updateLogin.fulfilled, (state) => {
      state.isLoading = false;
      state.status = "updateLogin success";
    });
    builder.addCase(updateLogin.rejected, (state) => {
      state.isLoading = false;
      state.status = "updateLogin error";
    });
    
    builder.addCase(deleteLogin.pending, (state) => {
      state.isLoading = true;
      state.status = "deleteLogin in process";
    });
    builder.addCase(deleteLogin.fulfilled, (state) => {
      state.isLoading = false;
      state.status = "deleteLogin success";
    });
    builder.addCase(deleteLogin.rejected, (state) => {
      state.isLoading = false;
      state.status = "deleteLogin error";
    });
    

    builder.addCase(getUndergrounds.pending, (state) => {
      state.isLoading = true;
      state.status = "getUndergrounds in process";
    });
    builder.addCase(getUndergrounds.fulfilled, (state, action) => {
      state.isLoading = false;
      state.undergrounds = [];
      state.undergrounds = action.payload as IUnderground[];
      state.status = "getUndergrounds success";
    });
    builder.addCase(getUndergrounds.rejected, (state) => {
      state.isLoading = false;
      state.undergrounds = [];
      state.status = "getUndergrounds error";
    });
        
    builder.addCase(addUnderground.pending, (state) => {
      state.isLoading = true;
      state.status = "addUnderground in process";
    });
    builder.addCase(addUnderground.fulfilled, (state) => {
      state.isLoading = false;
      state.status = "addUnderground success";
    });
    builder.addCase(addUnderground.rejected, (state) => {
      state.isLoading = false;
      state.status = "addUnderground error";
    });

    
    builder.addCase(updateUnderground.pending, (state) => {
      state.isLoading = true;
      state.status = "updateUnderground in process";
    });
    builder.addCase(updateUnderground.fulfilled, (state) => {
      state.isLoading = false;
      state.status = "updateUnderground success";
    });
    builder.addCase(updateUnderground.rejected, (state) => {
      state.isLoading = false;
      state.status = "updateUnderground error";
    });

    
    builder.addCase(deleteUnderground.pending, (state) => {
      state.isLoading = true;
      state.status = "deleteUnderground in process";
    });
    builder.addCase(deleteUnderground.fulfilled, (state) => {
      state.isLoading = false;
      state.status = "deleteUnderground success";
    });
    builder.addCase(deleteUnderground.rejected, (state) => {
      state.isLoading = false;
      state.status = "deleteUnderground error";
    });

    //#endregion

    //#region ModelTypes
    builder.addCase(getModelTypes.pending, (state) => {
      state.isLoading = true;
      state.status = "getModelTypes in process";
    });
    builder.addCase(getModelTypes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.modelTypes = [];
      state.modelTypes = action.payload as IModelType[];
      state.status = "getModelTypes success";
    });
    builder.addCase(getModelTypes.rejected, (state) => {
      state.isLoading = false;
      state.modelTypes = [];
      state.status = "getModelTypes error";
    });
    //#endregion

    //#region Orientations
    builder.addCase(getOrientations.pending, (state) => {
      state.isLoading = true;
      state.status = "getOrientations in process";
    });
    builder.addCase(getOrientations.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orientations = [];
      state.orientations = action.payload as IOrientation[];
      state.status = "getOrientations success";
    });
    builder.addCase(getOrientations.rejected, (state) => {
      state.isLoading = false;
      state.orientations = [];
      state.status = "getOrientations error";
    });
    //#endregion

    //#region Meetings
    builder.addCase(getMeetings.pending, (state) => {
      state.isLoading = true;
      state.status = "getMeetings in process";
    });
    builder.addCase(getMeetings.fulfilled, (state, action) => {
      state.isLoading = false;
      state.meetings = [];
      state.meetings = action.payload as IMeeting[];
      state.status = "getMeetings success";
    });
    builder.addCase(getMeetings.rejected, (state) => {
      state.isLoading = false;
      state.meetings = [];
      state.status = "getMeetings error";
    });

    builder.addCase(getMeetingPlaces.pending, (state) => {
      state.isLoading = true;
      state.status = "getMeetingPlaces in process";
    });
    builder.addCase(getMeetingPlaces.fulfilled, (state, action) => {
      state.isLoading = false;
      state.meetingPlaces = [];
      state.meetingPlaces = action.payload as IMeetingPlace[];
      state.status = "getMeetingPlaces success";
    });
    builder.addCase(getMeetingPlaces.rejected, (state) => {
      state.isLoading = false;
      state.meetingPlaces = [];
      state.status = "getMeetingPlaces in process";
    });
    //#endregion

    //#region EthnicGroup
    builder.addCase(getEthnicGroups.pending, (state) => {
      state.isLoading = true;
      state.status = "getEthnicGroups in process";
    });
    builder.addCase(getEthnicGroups.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ethnicGroups = [];
      state.ethnicGroups = action.payload as IEthnicGroup[];
      state.status = "getEthnicGroups success";
    });
    builder.addCase(getEthnicGroups.rejected, (state) => {
      state.isLoading = false;
      state.ethnicGroups = [];
      state.status = "getEthnicGroups error";
    });
    //#endregion

    //#region Hair
    builder.addCase(getHairColors.pending, (state) => {
      state.isLoading = true;
      state.status = "getHairColors in process";
    });
    builder.addCase(getHairColors.fulfilled, (state, action) => {
      state.isLoading = false;
      state.hairColors = [];
      state.hairColors = action.payload as IHairColor[];
      state.status = "getHairColors success";
    });
    builder.addCase(getHairColors.rejected, (state) => {
      state.isLoading = false;
      state.hairColors = [];
      state.status = "getHairColors error";
    });

    builder.addCase(getHairSizes.pending, (state) => {
      state.isLoading = true;
      state.status = "getHairSizes in process";
    });
    builder.addCase(getHairSizes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.hairSizes = [];
      state.hairSizes = action.payload as IHairSize[];
      state.status = "getHairSizes success";
    });
    builder.addCase(getHairSizes.rejected, (state) => {
      state.isLoading = false;
      state.hairSizes = [];
      state.status = "getHairSizes error";
    });

    builder.addCase(getPubisHairs.pending, (state) => {
      state.isLoading = true;
      state.status = "getPubisHairs in process";
    });
    builder.addCase(getPubisHairs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pubisHairs = [];
      state.pubisHairs = action.payload as IPubisHair[];
      state.status = "getPubisHairs success";
    });
    builder.addCase(getPubisHairs.rejected, (state) => {
      state.isLoading = false;
      state.pubisHairs = [];
      state.status = "getPubisHairs error";
    });
    //#endregion

    //#region Breast
    builder.addCase(getBreastSizes.pending, (state) => {
      state.isLoading = true;
      state.status = "getBreastSizes in process";
    });
    builder.addCase(getBreastSizes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.breastSizes = [];
      state.breastSizes = action.payload as IBreastSize[];
      state.status = "getBreastSizes success";
    });
    builder.addCase(getBreastSizes.rejected, (state) => {
      state.isLoading = false;
      state.breastSizes = [];
      state.status = "getBreastSizes error";
    });

    builder.addCase(getBreastTypes.pending, (state) => {
      state.isLoading = true;
      state.status = "getBreastTypes in process";
    });
    builder.addCase(getBreastTypes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.breastTypes = [];
      state.breastTypes = action.payload as IBreastType[];
      state.status = "getBreastTypes success";
    });
    builder.addCase(getBreastTypes.rejected, (state) => {
      state.isLoading = false;
      state.breastTypes = [];
      state.status = "getBreastTypes error";
    });
    //#endregion

    //#region Nationalities
    builder.addCase(getNationalities.pending, (state) => {
      state.isLoading = true;
      state.status = "getNationalities in process";
    });
    builder.addCase(getNationalities.fulfilled, (state, action) => {
      state.isLoading = false;
      state.nationalities = [];
      state.nationalities = action.payload as INationality[];
      state.status = "getNationalities success";
    });
    builder.addCase(getNationalities.rejected, (state) => {
      state.isLoading = false;
      state.nationalities = [];
      state.status = "getNationalities error";
    });
    //#endregion

    //#region Trips
    builder.addCase(getTrips.pending, (state) => {
      state.isLoading = true;
      state.status = "getTrips in process";
    });
    builder.addCase(getTrips.fulfilled, (state, action) => {
      state.isLoading = false;
      state.trips = [];
      state.trips = action.payload as ITrip[];
      state.status = "getTrips success";
    });
    builder.addCase(getTrips.rejected, (state) => {
      state.isLoading = false;
      state.trips = [];
      state.status = "getTrips error";
    });
    //#region

    //#region languages
    builder.addCase(getlanguages.pending, (state) => {
      state.isLoading = true;
      state.status = "getlanguages in process";
    });
    builder.addCase(getlanguages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.languages = [];
      state.languages = action.payload as ILanguage[];
      state.status = "getlanguages success";
    });
    builder.addCase(getlanguages.rejected, (state) => {
      state.isLoading = false;
      state.languages = [];
      state.status = "getlanguages error";
    });
    //#endregion

    //#region Tatoos
    builder.addCase(getTatoos.pending, (state) => {
      state.isLoading = true;
      state.status = "getTatoos in process";
    });
    builder.addCase(getTatoos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tatoos = [];
      state.tatoos = action.payload as ITatoo[];
      state.status = "getTatoos success";
    });
    builder.addCase(getTatoos.rejected, (state) => {
      state.isLoading = false;
      state.tatoos = [];
      state.status = "getTatoos error";
    });
    //#endregion

    //#region Smookers
    builder.addCase(getSmookers.pending, (state) => {
      state.isLoading = true;
      state.status = "getSmookers in process";
    });
    builder.addCase(getSmookers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.smookers = [];
      state.smookers = action.payload as ISmooker[];
      state.status = "getSmookers success";
    });
    builder.addCase(getSmookers.rejected, (state) => {
      state.isLoading = false;
      state.smookers = [];
      state.status = "getSmookers error";
    });
    //#endregion

    //#region EyesColors
    builder.addCase(getEyesColors.pending, (state) => {
      state.isLoading = true;
      state.status = "getEyesColors in process";
    });
    builder.addCase(getEyesColors.fulfilled, (state, action) => {
      state.isLoading = false;
      state.eyesColors = [];
      state.eyesColors = action.payload as IEyesColor[];
      state.status = "getEyesColors success";
    });
    builder.addCase(getEyesColors.rejected, (state) => {
      state.isLoading = false;
      state.eyesColors = [];
      state.status = "getEyesColors error";
    });
    //#endregion

    //#region Currencies
    builder.addCase(getCurrencies.pending, (state) => {
      state.isLoading = true;
      state.status = "getCurrencies in process";
    });
    builder.addCase(getCurrencies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currencies = [];
      state.currencies = action.payload as ICurrency[];
      state.status = "getCurrencies success";
    });
    builder.addCase(getCurrencies.rejected, (state) => {
      state.isLoading = false;
      state.currencies = [];
      state.status = "getCurrencies error";
    });
    //#endregion

    //#region WorkDurations
    builder.addCase(getWorkDurations.pending, (state) => {
      state.isLoading = true;
      state.status = "getWorkDurations in process";
    });
    builder.addCase(getWorkDurations.fulfilled, (state, action) => {
      state.isLoading = false;
      state.workDurations = [];
      state.workDurations = action.payload as IWorkDuration[];
      state.status = "getWorkDurations success";
    });
    builder.addCase(getWorkDurations.rejected, (state) => {
      state.isLoading = false;
      state.workDurations = [];
      state.status = "getWorkDurations error";
    });
    //#endregion

    //#region DaysOfWeek
    builder.addCase(getDaysOfWeek.pending, (state) => {
      state.isLoading = true;
      state.status = "getDaysOfWeek in process";
    });
    builder.addCase(getDaysOfWeek.fulfilled, (state, action) => {
      state.isLoading = false;
      state.daysOfWeek = [];
      state.daysOfWeek = action.payload as IDayOfWeek[];
      state.status = "getDaysOfWeek success";
    });
    builder.addCase(getDaysOfWeek.rejected, (state) => {
      state.isLoading = false;
      state.daysOfWeek = [];
      state.status = "getDaysOfWeek error";
    });
    //#endregion

    //#region ServiceCategories
    builder.addCase(getServiceCategories.pending, (state) => {
      state.isLoading = true;
      state.status = "getServiceCategories in process";
    });
    builder.addCase(getServiceCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.serviceCategories = [];
      state.serviceCategories = action.payload as IServiceCategory[];
      state.status = "getServiceCategories success";
    });
    builder.addCase(getServiceCategories.rejected, (state) => {
      state.isLoading = false;
      state.serviceCategories = [];
      state.status = "getServiceCategories error";
    });
    //#endregion

    //#region Piercings
    builder.addCase(getPiercings.pending, (state) => {
      state.isLoading = true;
      state.status = "getPiercings in process";
    });
    builder.addCase(getPiercings.fulfilled, (state, action) => {
      state.isLoading = false;
      state.piercings = [];
      state.piercings = action.payload as IPiercing[];
      state.status = "getPiercings success";
    });
    builder.addCase(getPiercings.rejected, (state) => {
      state.isLoading = false;
      state.piercings = [];
      state.status = "getPiercings error";
    });
    //#endregion

    //#region ProposalPlaces
    builder.addCase(getProposalPlaces.pending, (state) => {
      state.isLoading = true;
      state.status = "getProposalPlaces in process";
    });
    builder.addCase(getProposalPlaces.fulfilled, (state, action) => {
      state.isLoading = false;
      state.proposalPlaces = [];
      state.proposalPlaces = action.payload as IProposalPlace[];
      state.status = "getProposalPlaces success";
    });
    builder.addCase(getProposalPlaces.rejected, (state) => {
      state.isLoading = false;
      state.proposalPlaces = [];
      state.status = "getProposalPlaces error";
    });
    //#endregion
  },
});

export const { actions, reducer } = coreSlice;
