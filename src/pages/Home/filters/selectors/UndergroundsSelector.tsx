import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";
import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";
import { IUnderground } from "../../../../types/core/underground";
import { ICity } from "../../../../types/core/city";
import { ICountry } from "../../../../types/core/country";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";
import { Check as CheckIcon } from "../../../../assets/Check";
import { Search as SearchIcon } from "../../../../assets/Search";

interface IUndergroundsSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const UndergroundsSelector: React.FC<IUndergroundsSelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const { t, i18n } = useTranslation();
  const { setFilter } = useActions();
  const filter = useTypedSelector((state) => state.modelReducer.filter);
  const undergrounds = useTypedSelector((state) => state.coreReducer.undergrounds);
  const [filteredUndergrounds, setFilteredUndergrounds] = useState(undergrounds);
  const [searchedUnderground, setSearchedUnderground] = useState("");

  useEffect(() => {
    const usedName = i18n.resolvedLanguage === "ru" ? 'underground' : 'underground_eng'
    const undergroundsSorted = [...undergrounds].sort((a, b) => a[usedName].localeCompare(b[usedName]))
    setFilteredUndergrounds(
      undergroundsSorted.filter(
        (underground: IUnderground) =>
          (filter.cities.length === 0 ? true : filter.cities.includes(underground.city_id)) &&
          (searchedUnderground.trim() === ""
            ? true
            : underground[usedName].toLowerCase().startsWith(searchedUnderground.trim().toLowerCase()))
      )
    );
  }, [undergrounds, filter.countries, searchedUnderground]);

  return (
    <div
      className={`${styles.filters_group} ${activeComponent === ComponentType.UndergroundsSelector ? styles.active : ""}`}
    >
      <div
        className={styles.group_name}
        onClick={() =>
          setActiveComponent(
            activeComponent === ComponentType.UndergroundsSelector ? ComponentType.None : ComponentType.UndergroundsSelector
          )
        }
      >
        {t("global.underground")}
        {activeComponent === ComponentType.UndergroundsSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        {filter.undergrounds.length > 0 ? <div className={styles.group_count}>{filter.undergrounds.length}</div> : null}
      </div>
      <div className={styles.filters_list}>
        <div className={globalStyles.search_input}>
          <input
            type="name"
            placeholder={t("global.underground_search")}
            value={searchedUnderground}
            onChange={(event) => setSearchedUnderground(event.target.value)}
          />
          <SearchIcon fill="#98042D" />
        </div>
        {activeComponent === ComponentType.UndergroundsSelector &&
          filteredUndergrounds.map((underground: IUnderground) => (
            <div className={styles.filter_item}>
              <label className={globalStyles.checkbox}>
                <input type="checkbox" />
                <span
                  className={`${globalStyles.checkbox_mark} ${
                    filter.undergrounds.filter((item: number) => item === underground.id).length > 0
                      ? globalStyles.active
                      : ""
                  }`}
                  aria-hidden="true"
                  onClick={() => {
                    if (filter.undergrounds.filter((item: number) => item === underground.id).length > 0) {
                      setFilter({
                        ...filter,
                        undergrounds: filter.undergrounds.filter((item: number) => item !== underground.id),
                        selectedCity: { id: -1 } as ICity,
                        selectedCountry: { id: -1 } as ICountry,
                      });
                    } else {
                      setFilter({
                        ...filter,
                        undergrounds: [...filter.undergrounds, underground.id],
                        selectedCity: { id: -1 } as ICity,
                        selectedCountry: { id: -1 } as ICountry,
                      });
                    }
                  }}
                >
                  {filter.undergrounds.filter((item: number) => item === underground.id).length > 0 ? (
                    <CheckIcon fill="#98042D" />
                  ) : null}
                </span>
                <div className={globalStyles.text}>
                  {i18n.resolvedLanguage === "ru" ? underground.underground : underground.underground_eng}
                </div>
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UndergroundsSelector;
