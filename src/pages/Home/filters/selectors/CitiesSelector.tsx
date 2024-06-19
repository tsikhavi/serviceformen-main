import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";
import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";
import { ICity } from "../../../../types/core/city";
import { ICountry } from "../../../../types/core/country";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";
import { Check as CheckIcon } from "../../../../assets/Check";
import { Search as SearchIcon } from "../../../../assets/Search";

interface ICitiesSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const CitiesSelector: React.FC<ICitiesSelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const { t, i18n } = useTranslation();
  const { setFilter } = useActions();
  const filter = useTypedSelector((state) => state.modelReducer.filter);
  const cities = useTypedSelector((state) => state.coreReducer.cities);
  const [filteredCities, setFilteredCities] = useState(cities);
  const [searchedCity, setSearchedCity] = useState("");

  useEffect(() => {
    if (searchedCity.trim().length === 0) {
      setFilteredCities([] as ICity[]);
    } else {
      setFilteredCities(
        cities.filter(
          (city: ICity) =>
            (filter.countries.length === 0 ? true : filter.countries.includes(city.country_id)) &&
            (searchedCity.trim() === ""
              ? true
              : city.city.toLowerCase().startsWith(searchedCity.trim().toLowerCase()) ||
                city.city_eng.toLowerCase().startsWith(searchedCity.trim().toLowerCase()))
        )
      );
    }
  }, [cities, filter.countries, searchedCity]);

  return (
    <div className={`${styles.filters_group} ${activeComponent === ComponentType.CitiesSelector ? styles.active : ""}`}>
      <div
        className={styles.group_name}
        onClick={() =>
          setActiveComponent(
            activeComponent === ComponentType.CitiesSelector ? ComponentType.None : ComponentType.CitiesSelector
          )
        }
      >
        {t("global.city")}
        {activeComponent === ComponentType.CitiesSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        {filter.cities.length > 0 ? <div className={styles.group_count}>{filter.cities.length}</div> : null}
      </div>
      <div className={styles.filters_list}>
        <div className={globalStyles.search_input}>
          <input
            type="name"
            placeholder={t("global.city_search")}
            value={searchedCity}
            onChange={(event) => setSearchedCity(event.target.value)}
          />
          <SearchIcon fill="#98042D" />
        </div>
        {activeComponent === ComponentType.CitiesSelector &&
          filteredCities.map((city: ICity) => (
            <div className={styles.filter_item}>
              <label className={globalStyles.checkbox}>
                <input type="checkbox" />
                <span
                  className={`${globalStyles.checkbox_mark} ${
                    filter.cities.filter((item: number) => item === city.id).length > 0 ? globalStyles.active : ""
                  }`}
                  aria-hidden="true"
                  onClick={() => {
                    if (filter.cities.filter((item: number) => item === city.id).length > 0) {
                      setFilter({
                        ...filter,
                        cities: filter.cities.filter((item: number) => item !== city.id),
                        selectedCity: { id: -1 } as ICity,
                        selectedCountry: { id: -1 } as ICountry,
                      });
                    } else {
                      setFilter({
                        ...filter,
                        cities: [...filter.cities, city.id],
                        selectedCity: { id: -1 } as ICity,
                        selectedCountry: { id: -1 } as ICountry,
                      });
                    }
                  }}
                >
                  {filter.cities.filter((item: number) => item === city.id).length > 0 ? <CheckIcon fill="#98042D" /> : null}
                </span>
                <div className={globalStyles.text}>{i18n.resolvedLanguage === "ru" ? city.city : city.city_eng}</div>
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CitiesSelector;
