/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

import styles from "./LocationSelector.module.sass";

import { ComponentType } from "../ComponentType";
import { ICountry } from "../../../types/core/country";
import { ICity } from "../../../types/core/city";

import { ArrowDown as ArrowDownIcon } from "../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../assets/ArrowUp";
import { Close as CloseIcon } from "../../../assets/Close";
import { Location as LocationIcon } from "../../../assets/Location";
import { Search as SearchIcon } from "../../../assets/Search";

interface ILocationSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const LocationSelector: React.FC<ILocationSelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const { t, i18n } = useTranslation();
  const { setFilter } = useActions();
  const countries = useTypedSelector((state) => state.coreReducer.countries);
  const cities = useTypedSelector((state) => state.coreReducer.cities);
  const filter = useTypedSelector((state) => state.modelReducer.filter);
  const [filteredCities, setFilteredCities] = useState(cities);
  const [isCountriesListActive, setIsCountriesListActive] = useState(filter.selectedCountry.id === -1);
  const [isCitiesListActive, setIsCitiesListActive] = useState(countries.length === 1);
  const [searchedCity, setSearchedCity] = useState("");

  useEffect(() => {
    if (filter.selectedCountry.id === -1) {
      setIsCountriesListActive(true);
      if (searchedCity.trim().length === 0) {
        setFilteredCities([] as ICity[]);
      } else {
        setFilteredCities(
          [...cities].filter(
            (city: ICity) =>
              city.city.toLowerCase().startsWith(searchedCity.toLowerCase()) ||
              city.city_eng.toLowerCase().startsWith(searchedCity.toLowerCase())
          )
        );
      }
    } else {
      if (searchedCity.trim().length > 0) {
        setFilteredCities(
          [...cities].filter(
            (city: ICity) =>
              (city.country_id === filter.selectedCountry.id &&
                city.city.toLowerCase().startsWith(searchedCity.toLowerCase())) ||
              city.city_eng.toLowerCase().startsWith(searchedCity.toLowerCase())
          )
        );
      } else {
        setFilteredCities([] as ICity[]);
      }
    }
  }, [filter.selectedCountry, searchedCity, cities]);

  useEffect(() => {
    setFilter({ ...filter, selectedCity: { id: -1 } as ICity });
  }, [filter.selectedCountry]);

  return (
    <div className={`${styles.location} ${activeComponent === ComponentType.LocationSelector ? styles.active : ""}`}>
      <LocationIcon fill="#FFFFFF" />
      <div
        className={styles.location_link}
        onClick={() =>
          setActiveComponent(
            activeComponent === ComponentType.LocationSelector ? ComponentType.None : ComponentType.LocationSelector
          )
        }
      >
        {t("global.country_and_city")}
      </div>
      <div className={`${styles.locations_list} ${activeComponent === ComponentType.LocationSelector ? styles.active : ""}`}>
        <div
          className={`${styles.countries_title} ${isCountriesListActive ? styles.active : ""}`}
          onClick={() => setIsCountriesListActive(!isCountriesListActive)}
        >
          {t("global.country")}:{" "}
          {filter.selectedCountry === null || filter.selectedCountry.id === -1
            ? t("global.not_selected")
            : i18n.resolvedLanguage === "ru"
            ? filter.selectedCountry.country
            : filter.selectedCountry.country_eng}
          {isCountriesListActive ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={`${styles.countries_list} ${isCountriesListActive ? styles.active : ""}`}>
          {countries.map((country: ICountry) => (
            <div
              className={styles.country}
              onClick={() => setFilter({ ...filter, selectedCountry: country, countries: [] as number[] })}
            >
              <img src={country.flag} alt="" />
              <div className={styles.country_link}>
                {i18n.resolvedLanguage === "ru" ? country.country : country.country_eng}
              </div>
            </div>
          ))}
        </div>
        <div
          className={`${styles.cities_title} ${isCitiesListActive ? styles.active : ""}`}
          onClick={() => setIsCitiesListActive(!isCitiesListActive)}
        >
          {t("global.city")}:{" "}
          {filter.selectedCity === null || filter.selectedCity.id === -1
            ? t("global.not_selected_m")
            : i18n.resolvedLanguage === "ru"
            ? filter.selectedCity.city
            : filter.selectedCity.city_eng}
          {isCitiesListActive ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={`${styles.cities_list} ${isCitiesListActive ? styles.active : ""}`}>
          <div className={styles.search_input}>
            <input
              type="name"
              placeholder={t("global.city_search")}
              value={searchedCity}
              onChange={(event) => setSearchedCity(event.target.value)}
            />
            <SearchIcon fill="#98042D" />
          </div>
          <div className={styles.cities_list_items}>
            {filteredCities
              .filter((city: ICity) =>
                filter.selectedCountry !== undefined && filter.selectedCountry.id > -1
                  ? city.country_id === filter.selectedCountry.id
                  : true
              )
              .map((city: ICity) => (
                <div
                  className={styles.city}
                  onClick={() =>
                    setFilter({
                      ...filter,
                      selectedCity: city,
                      cities: [] as number[],
                      districts: [] as number[],
                      undergrounds: [] as number[],
                    })
                  }
                >
                  <div className={styles.city_link}>{i18n.resolvedLanguage === "ru" ? city.city : city.city_eng}</div>
                </div>
              ))}
          </div>
        </div>
        <div className={styles.close} onClick={() => setActiveComponent(ComponentType.None)}>
          <CloseIcon fill="#1B1B1B" />
          {t("global.close")}
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;
