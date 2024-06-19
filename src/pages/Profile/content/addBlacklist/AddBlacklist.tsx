/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InputMask from "react-input-mask";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";
import styles from "../../Profile.module.sass";

import MessageModal from "../../../../components/Modals/MessageModal";

import { ComponentType } from "./ComponentType";
import { ICountry } from "../../../../types/core/country";
import { ICity } from "../../../../types/core/city";
import { ServerStatusType } from "../../../../enums/serverStatusType";
import { initServerStatus } from "../../../../types/main/serverStatus";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";
import { Search as SearchIcon } from "../../../../assets/Search";

const AddBlacklist = () => {
  const { t, i18n } = useTranslation();
  const { addBlacklist, setBlacklistItem, setBlacklistStatuses, getBlacklist } = useActions();
  const profile = useTypedSelector((state) => state.profileReducer.profile);
  const blacklistItem = useTypedSelector((state) => state.blacklistReducer.blacklistItem);
  const emptyBlacklistItem = useTypedSelector((state) => state.blacklistReducer.emptyBlacklistItem);
  const blacklistStatuses = useTypedSelector((state) => state.blacklistReducer.serverStatuses);
  const countries = useTypedSelector((state) => state.coreReducer.countries);
  const cities = useTypedSelector((state) => state.coreReducer.cities);
  const [filteredCities, setFilteredCities] = useState(cities);
  const [searchedCity, setSearchedCity] = useState("");
  const [activeComponent, setActiveComponent] = useState(ComponentType.None);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isMessageModalShow, setIsMessageModalShow] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    if (blacklistStatuses.addBlacklist.status === ServerStatusType.Success) {
      setBlacklistItem(emptyBlacklistItem);
      setInfoMessage(t("profile.client_added_to_blacklist"));
      setIsMessageModalShow(true);
      setBlacklistStatuses({ ...blacklistStatuses, addBlacklist: initServerStatus() });
      getBlacklist();
    }
    if (blacklistStatuses.addBlacklist.status === ServerStatusType.Error) {
      setInfoMessage(blacklistStatuses.addBlacklist.error);
      setIsMessageModalShow(true);
      setBlacklistStatuses({ ...blacklistStatuses, addBlacklistAccess: initServerStatus() });
    }
  }, [blacklistStatuses]);

  useEffect(() => {
    if (blacklistItem && blacklistItem.phone_number !== undefined) {
      setIsButtonEnabled(blacklistItem.phone_number.length === 18 && blacklistItem.description.trim() !== "");
    }
  }, [blacklistItem]);

  useEffect(() => {
    document.title = `${t("profile.profile")} | ${t("profile.add_to_blacklist")}`;
    setBlacklistItem(emptyBlacklistItem);
  }, []);

  useEffect(() => {
    document.title = `${t("profile.profile")} | ${t("profile.add_to_blacklist")}`;
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    setFilteredCities(cities);
  }, [cities]);

  useEffect(() => {
    setBlacklistItem({ ...blacklistItem, city_id: -1 });
  }, [blacklistItem.country_id]);

  useEffect(() => {
    if (activeComponent !== ComponentType.CitiesSelector) {
      setSearchedCity("");
    }
  }, [activeComponent]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (blacklistItem.phone_number !== "" && blacklistItem.description !== "") {
      addBlacklist({ blacklist: { ...blacklistItem, agency_id: profile.id } });
    }
  };

  const handlerCountryOnClick = (country: ICountry) => {
    setBlacklistItem({ ...blacklistItem, country_id: country.id, city_id: country.id === -1 ? -1 : blacklistItem.city_id });
    setActiveComponent(ComponentType.None);
  };

  const handlerCityOnClick = (city: ICity) => {
    setBlacklistItem({ ...blacklistItem, city_id: city.id });
    setActiveComponent(ComponentType.None);
  };

  const handleMessageOnClick = () => {
    setIsMessageModalShow(false);
    window.scroll({ top: 0 });
  };

  return (
    <div className={styles.content}>
      <div className={styles.title}>{t("profile.informing_about_blacklisting")}</div>
      <div className={styles.main_info}>
        <form onSubmit={handleSubmit}>
          <div
            className={`${globalStyles.dropdown} ${
              activeComponent === ComponentType.CountriesSelector ? globalStyles.active : ""
            }`}
          >
            <div className={globalStyles.main}>
              <div className={globalStyles.label}>{t("global.country")}</div>
              <div
                className={globalStyles.dropdown_button}
                onClick={() =>
                  setActiveComponent(
                    activeComponent === ComponentType.CountriesSelector
                      ? ComponentType.None
                      : ComponentType.CountriesSelector
                  )
                }
              >
                {blacklistItem.country_id === -1
                  ? ""
                  : i18n.resolvedLanguage === "ru"
                  ? countries.find((country: ICountry) => country.id === blacklistItem.country_id)?.country
                  : countries.find((country: ICountry) => country.id === blacklistItem.country_id)?.country_eng}
                {activeComponent === ComponentType.CountriesSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
              </div>
            </div>
            <div
              className={`${globalStyles.dropdown_container} ${
                activeComponent === ComponentType.CountriesSelector ? globalStyles.active : ""
              }`}
            >
              <div className={globalStyles.dropdown_list}>
                <div className={globalStyles.dropdown_item} onClick={() => handlerCountryOnClick({ id: -1 } as ICountry)}>
                  {t("global.not_selected")}
                </div>
                {countries.map((country: ICountry) => (
                  <div className={globalStyles.dropdown_item} onClick={() => handlerCountryOnClick(country)}>
                    {i18n.resolvedLanguage === "ru" ? country.country : country.country_eng}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className={`${globalStyles.dropdown} ${
              activeComponent === ComponentType.CitiesSelector ? globalStyles.active : ""
            }`}
          >
            <div className={globalStyles.main}>
              <div className={globalStyles.label}>{t("global.city")}</div>
              <div
                className={globalStyles.dropdown_button}
                onClick={() => {
                  if (filteredCities.filter((city: ICity) => city.country_id === blacklistItem.country_id).length > 0)
                    setActiveComponent(
                      activeComponent === ComponentType.CitiesSelector ? ComponentType.None : ComponentType.CitiesSelector
                    );
                }}
              >
                {blacklistItem.city_id === -1
                  ? ""
                  : i18n.resolvedLanguage === "ru"
                  ? cities.find((city: ICity) => city.id === blacklistItem.city_id)?.city
                  : cities.find((city: ICity) => city.id === blacklistItem.city_id)?.city_eng}
                {activeComponent === ComponentType.CitiesSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
              </div>
            </div>
            <div
              className={
                globalStyles.dropdown_container +
                " " +
                (activeComponent === ComponentType.CitiesSelector ? globalStyles.active : "")
              }
            >
              <div className={globalStyles.search_input}>
                <input
                  type="name"
                  placeholder={t("global.city_search")}
                  value={searchedCity}
                  onChange={(event) => setSearchedCity(event.target.value)}
                />
                <SearchIcon fill="#98042D" />
              </div>
              <div className={globalStyles.dropdown_list}>
                <div className={globalStyles.dropdown_item} onClick={() => handlerCityOnClick({ id: -1 } as ICity)}>
                  {t("global.not_selected_m")}
                </div>
                {cities
                  .filter(
                    (city: ICity) =>
                      city.country_id === blacklistItem.country_id &&
                      (searchedCity.trim().length !== 0
                        ? city.city.toLowerCase().startsWith(searchedCity.toLowerCase()) ||
                          city.city_eng.toLowerCase().startsWith(searchedCity.toLowerCase())
                        : true)
                  )
                  .map((city: ICity) => (
                    <div className={globalStyles.dropdown_item} onClick={() => handlerCityOnClick(city)}>
                      {i18n.resolvedLanguage === "ru" ? city.city : city.city_eng}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className={styles.input_field}>
            <div className={styles.label}>{t("profile.client_phone_number")}</div>
            <InputMask
              placeholder=""
              type="text"
              required
              mask="+7 (999) 999-99-99"
              maskPlaceholder="0"
              maskChar={""}
              onChange={(event) => setBlacklistItem({ ...blacklistItem, phone_number: event.target.value.trim() })}
              value={blacklistItem.phone_number}
              onClick={() => setActiveComponent(ComponentType.None)}
            />
            <div className={globalStyles.required}>*</div>
          </div>
          <div className={styles.textarea_field}>
            <div className={styles.label}>{t("profile.description_of_the_event")}</div>
            <textarea
              required
              onChange={(event) => setBlacklistItem({ ...blacklistItem, description: event.target.value.trim() })}
              value={blacklistItem.description}
              onClick={() => setActiveComponent(ComponentType.None)}
            />
            <div className={globalStyles.required}>*</div>
          </div>
          <button type="submit" disabled={!isButtonEnabled}>
            {t("global.send")}
          </button>
        </form>
      </div>
      <MessageModal
        text={infoMessage}
        buttonText={t("global.ok")}
        handlerButtonClick={handleMessageOnClick}
        isShow={isMessageModalShow}
      />
    </div>
  );
};

export default AddBlacklist;

//TODO: Выбор города (поиск, отображение)
