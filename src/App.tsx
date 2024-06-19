import { useEffect, useLayoutEffect } from "react";
import { Route, Routes, useLocation, } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useActions } from "./hooks/useActions";
import { useTypedSelector } from "./hooks/useTypedSelector";

import styles from "./App.module.sass";

import Home from "./pages/Home/Home";
import Model from "./pages/Model/Model";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ContactUs from "./pages/ContactUs/ContactUs";
import ModelSettings from "./pages/ModelSettings/ModelSettings";
import RegisterConfirm from "./pages/RegisterConfirm/RegisterConfirm";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import Admin from "./pages/Admin/Admin";
import UserAgreement from "./pages/UserAgreement/UserAgreement";
import Confidentiality from "./pages/Confidentiality/Confidentiality";
import Proposal from "./pages/Proposal/Proposal";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ContactUsModal from "./components/Modals/ContactUsModal";
import RegisterModal from "./components/Modals/RegisterModal";
import LoginModal from "./components/Modals/LoginModal";

import { HomePageType } from "./enums/homePageType";
import { ICity } from "./types/core/city";
import { ICountry } from "./types/core/country";
import { IDistrict } from "./types/core/district";
import { IUnderground } from "./types/core/underground";
import PasswordChange from "./pages/PasswordChange/PasswordChange";

function App() {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();
  const {
    authMe,
    authMeAdmin,
    logoutAdmin,
    setWindowSize,
    getSiteLanguages,
    getCountries,
    getCities,
    getDistricts,
    getUndergrounds,
    getModelTypes,
    getOrientations,
    getMeetings,
    getEthnicGroups,
    getHairColors,
    getHairSizes,
    getBreastSizes,
    getBreastTypes,
    getMeetingPlaces,
    getNationalities,
    getTrips,
    getlanguages,
    getTatoos,
    getPiercings,
    getSmookers,
    getEyesColors,
    getPubisHairs,
    getCurrencies,
    getWorkDurations,
    getDaysOfWeek,
    getServiceCategories,
    getModels,
    getProposalPlaces,
    setCountries,
    setCities,
    setDistricts,
    setUndergrounds,
  } = useActions();

  
    
  const profile = useTypedSelector((state) => state.profileReducer.profile);
  const isAuth = useTypedSelector((state) => state.profileReducer.profile);
  const isNoScroll = useTypedSelector((state) => state.mainReducer.isNoScroll);
  const siteLanguages = useTypedSelector((state) => state.coreReducer.siteLanguages);
  const countries = useTypedSelector((state) => state.coreReducer.countries);
  const cities = useTypedSelector((state) => state.coreReducer.cities);
  const districts = useTypedSelector((state) => state.coreReducer.districts);
  const undergrounds = useTypedSelector((state) => state.coreReducer.undergrounds);
  const modelTypes = useTypedSelector((state) => state.coreReducer.modelTypes);
  const orientations = useTypedSelector((state) => state.coreReducer.orientations);
  const meetings = useTypedSelector((state) => state.coreReducer.meetings);
  const meetingPlaces = useTypedSelector((state) => state.coreReducer.meetingPlaces);
  const ethnicGroups = useTypedSelector((state) => state.coreReducer.ethnicGroups);
  const hairColors = useTypedSelector((state) => state.coreReducer.hairColors);
  const hairSizes = useTypedSelector((state) => state.coreReducer.hairSizes);
  const pubisHairs = useTypedSelector((state) => state.coreReducer.pubisHairs);
  const breastSizes = useTypedSelector((state) => state.coreReducer.breastSizes);
  const breastTypes = useTypedSelector((state) => state.coreReducer.breastTypes);
  const nationalities = useTypedSelector((state) => state.coreReducer.nationalities);
  const trips = useTypedSelector((state) => state.coreReducer.trips);
  const languages = useTypedSelector((state) => state.coreReducer.languages);
  const smookers = useTypedSelector((state) => state.coreReducer.smookers);
  const tatoos = useTypedSelector((state) => state.coreReducer.tatoos);
  const eyesColors = useTypedSelector((state) => state.coreReducer.eyesColors);
  const currencies = useTypedSelector((state) => state.coreReducer.currencies);
  const workDurations = useTypedSelector((state) => state.coreReducer.workDurations);
  const daysOfWeek = useTypedSelector((state) => state.coreReducer.daysOfWeek);
  const serviceCategories = useTypedSelector((state) => state.coreReducer.serviceCategories);
  const piercings = useTypedSelector((state) => state.coreReducer.piercings);
  const proposalPlaces = useTypedSelector((state) => state.coreReducer.proposalPlaces);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  useLayoutEffect(() => {
    setWindowSize(getWindowSize());
    if (!Array.isArray(siteLanguages) || siteLanguages === undefined || siteLanguages.length === 0) {
      getSiteLanguages();
    }
    if (!Array.isArray(countries) || countries === undefined || countries.length === 0) {
      getCountries();
    }
    if (!Array.isArray(cities) || cities === undefined || cities.length === 0) {
      getCities();
    }
    if (!Array.isArray(districts) || districts === undefined || districts.length === 0) {
      getDistricts();
    }
    if (!Array.isArray(undergrounds) || undergrounds === undefined || undergrounds.length === 0) {
      getUndergrounds();
    }
    if (!Array.isArray(modelTypes) || modelTypes === undefined || modelTypes.length === 0) {
      getModelTypes();
    }
    if (!Array.isArray(orientations) || orientations === undefined || orientations.length === 0) {
      getOrientations();
    }
    if (!Array.isArray(meetings) || meetings === undefined || meetings.length === 0) {
      getMeetings();
    }
    if (!Array.isArray(ethnicGroups) || ethnicGroups === undefined || ethnicGroups.length === 0) {
      getEthnicGroups();
    }
    if (!Array.isArray(hairColors) || hairColors === undefined || hairColors.length === 0) {
      getHairColors();
    }
    if (!Array.isArray(hairSizes) || hairSizes === undefined || hairSizes.length === 0) {
      getHairSizes();
    }
    if (!Array.isArray(breastSizes) || breastSizes === undefined || breastSizes.length === 0) {
      getBreastSizes();
    }
    if (!Array.isArray(breastTypes) || breastTypes === undefined || breastTypes.length === 0) {
      getBreastTypes();
    }
    if (!Array.isArray(meetingPlaces) || meetingPlaces === undefined || meetingPlaces.length === 0) {
      getMeetingPlaces();
    }
    if (!Array.isArray(nationalities) || nationalities === undefined || nationalities.length === 0) {
      getNationalities();
    }
    if (!Array.isArray(trips) || trips === undefined || trips.length === 0) {
      getTrips();
    }
    if (!Array.isArray(languages) || languages === undefined || languages.length === 0) {
      getlanguages();
    }
    if (!Array.isArray(tatoos) || tatoos === undefined || tatoos.length === 0) {
      getTatoos();
    }
    if (!Array.isArray(piercings) || piercings === undefined || piercings.length === 0) {
      getPiercings();
    }
    if (!Array.isArray(smookers) || smookers === undefined || smookers.length === 0) {
      getSmookers();
    }
    if (!Array.isArray(eyesColors) || eyesColors === undefined || eyesColors.length === 0) {
      getEyesColors();
    }
    if (!Array.isArray(pubisHairs) || pubisHairs === undefined || pubisHairs.length === 0) {
      getPubisHairs();
    }
    if (!Array.isArray(currencies) || currencies === undefined || currencies.length === 0) {
      getCurrencies();
    }
    if (!Array.isArray(workDurations) || workDurations === undefined || workDurations.length === 0) {
      getWorkDurations();
    }
    if (!Array.isArray(daysOfWeek) || daysOfWeek === undefined || daysOfWeek.length === 0) {
      getDaysOfWeek();
    }
    if (!Array.isArray(serviceCategories) || serviceCategories === undefined || serviceCategories.length === 0) {
      getServiceCategories();
    }
    if (!Array.isArray(proposalPlaces) || proposalPlaces === undefined || proposalPlaces.length === 0) {
      getProposalPlaces();
    }
    pathname.startsWith("/admin-moderator") ? authMeAdmin() : authMe();
  }, []);

  useEffect(() => {
    if (Array.isArray(cities) && cities.length > 0) {
      setCities(
        [...cities].sort((cityOne: ICity, cityTwo: ICity) =>
          (i18n.resolvedLanguage === "ru" ? cityOne.city > cityTwo.city : cityOne.city_eng > cityTwo.city_eng) ? 1 : -1
        )
      );
    } else {
      getCities();
    }
  }, [i18n.resolvedLanguage, cities]);

  useEffect(() => {
    if (Array.isArray(countries) && countries.length > 0) {
      setCountries(
        [...countries].sort((countryOne: ICountry, countryTwo: ICountry) =>
          (
            i18n.resolvedLanguage === "ru"
              ? countryOne.country > countryTwo.country
              : countryOne.country_eng > countryTwo.country_eng
          )
            ? 1
            : -1
        )
      );
    } else {
      getCountries();
    }
  }, [i18n.resolvedLanguage, countries]);

  useEffect(() => {
    if (Array.isArray(districts) && districts.length > 0) {
      setDistricts(
        [...districts].sort((districtOne: IDistrict, districtTwo: IDistrict) =>
          (
            i18n.resolvedLanguage === "ru"
              ? districtOne.district > districtTwo.district
              : districtOne.district_eng > districtTwo.district_eng
          )
            ? 1
            : -1
        )
      );
    } else {
      getDistricts();
    }
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    if (Array.isArray(undergrounds) && undergrounds.length > 0) {
      setUndergrounds(
        [...undergrounds].sort((undergroundOne: IUnderground, undergroundTwo: IUnderground) =>
          (
            i18n.resolvedLanguage === "ru"
              ? undergroundOne.underground > undergroundTwo.underground
              : undergroundOne.underground_eng > undergroundTwo.underground_eng
          )
            ? 1
            : -1
        )
      );
    } else {
      getUndergrounds();
    }
  }, [i18n.resolvedLanguage]);

  useLayoutEffect(() => {
    getModels({ profile_id: profile.id });
    logoutAdmin;
  }, [isAuth]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
    getModels({ profile_id: profile.id });
  }, [pathname]);

  return (
    <div className={styles.wrapper + " " + (isNoScroll ? styles.no_scroll : "")}>
      {!pathname.startsWith("/admin-moderator") ? <Header /> : null}
      <Routes>

        <Route path="/" element={<Home type={HomePageType.AllModels} />} />
        <Route path="/new" element={<Home type={HomePageType.New} />} />
        <Route path="/verified" element={<Home type={HomePageType.Verified} />} />
        <Route path="/with_video" element={<Home type={HomePageType.WithVideo} />} />
        <Route path="/model/:id" element={<Model />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/model_settings/:id" element={<ModelSettings />} />
        <Route path="/confirm/:token/:login" element={<RegisterConfirm />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/change_password/:token/:login" element={<ChangePassword />} />
        <Route path="/confidentiality" element={<Confidentiality />} />
        <Route path="/user_agreement" element={<UserAgreement />} />
        <Route path="/proposal" element={<Proposal />} />
        <Route path="/passwordchange" element={<PasswordChange />} />
        <Route path="/admin-moderator" element={<Admin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-moderator/model/:id" element={<Model forModerator={true} />} />
        <Route path="*" element={<Home type={HomePageType.AllModels} />} />
      </Routes>
      <ContactUsModal />
      <RegisterModal />
      <LoginModal />
      {!pathname.startsWith("/admin-moderator") ? <Footer /> : null}
    </div>
  );
}

export default App;
