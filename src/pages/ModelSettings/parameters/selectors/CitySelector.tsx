/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";

import { ComponentType } from "../ComponentType";
import { ICity } from "../../../../types/core/city";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";
import { Search as SearchIcon } from "../../../../assets/Search";

interface ICitySelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const CitySelector: React.FC<ICitySelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const { t, i18n } = useTranslation();
  const { setModel } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);
  const cities = useTypedSelector((state) => state.coreReducer.cities);
  const [filteredCities, setFilteredCities] = useState(cities);
  const [searchedCity, setSearchedCity] = useState("");

  useEffect(() => {
    if (searchedCity.trim().length === 0) {
      setFilteredCities(cities);
    } else {
      setFilteredCities(
        cities.filter(
          (city: ICity) =>
            city.city.toLowerCase().startsWith(searchedCity.toLowerCase()) ||
            city.city_eng.toLowerCase().startsWith(searchedCity.toLowerCase())
        )
      );
    }
  }, [searchedCity]);

  useEffect(() => {
    setFilteredCities(cities);
  }, [cities]);

  const handlerDropdownButtonOnClick = () => {
    if (filteredCities.filter((city: ICity) => city.country_id === model.country_id).length > 0)
      setActiveComponent(activeComponent === ComponentType.CitySelector ? ComponentType.None : ComponentType.CitySelector);
  };

  const handlerCityOnClick = (city: ICity) => {
    setModel({ ...model, city_id: city.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div className={`${globalStyles.dropdown} ${activeComponent === ComponentType.CitySelector ? globalStyles.active : ""}`}>
      <div className={globalStyles.main}>
        <div className={globalStyles.label}>{t("global.city")}</div>
        <div className={globalStyles.dropdown_button} onClick={handlerDropdownButtonOnClick}>
          {model.city_id === -1
            ? ""
            : i18n.resolvedLanguage === "ru"
            ? cities.find((city: ICity) => city.id === model.city_id)?.city
            : cities.find((city: ICity) => city.id === model.city_id)?.city_eng}
          {activeComponent === ComponentType.CitySelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
          <div className={globalStyles.required}>*</div>
        </div>
      </div>
      <div
        className={`${globalStyles.dropdown_container} ${
          activeComponent === ComponentType.CitySelector ? globalStyles.active : ""
        }`}
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
          {filteredCities
            .filter((city: ICity) => city.country_id === model.country_id)
            .map((city: ICity) => (
              <div className={globalStyles.dropdown_item} onClick={() => handlerCityOnClick(city)}>
                {i18n.resolvedLanguage === "ru" ? city.city : city.city_eng}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CitySelector;
