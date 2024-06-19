import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";
import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";
import { IDistrict } from "../../../../types/core/district";
import { ICity } from "../../../../types/core/city";
import { ICountry } from "../../../../types/core/country";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";
import { Check as CheckIcon } from "../../../../assets/Check";
import { Search as SearchIcon } from "../../../../assets/Search";

interface IDistrictsSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const DistrictsSelector: React.FC<IDistrictsSelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const { t, i18n } = useTranslation();
  const { setFilter } = useActions();
  const filter = useTypedSelector((state) => state.modelReducer.filter);
  const districts = useTypedSelector((state) => state.coreReducer.districts);
  const [filteredDistricts, setFilteredDistricts] = useState(districts);
  const [searchedDistrict, setSearchedDistrict] = useState("");

  useEffect(() => {
    const usedName = i18n.resolvedLanguage === "ru" ? 'district' : 'district_eng'
    const districtsSorted = [...districts].sort((a, b) => a[usedName].localeCompare(b[usedName]))
    setFilteredDistricts(
      districtsSorted.filter(
        (district: IDistrict) =>
          (filter.cities.length === 0 ? true : filter.cities.includes(district.city_id)) &&
          (searchedDistrict.trim() === ""
            ? true
            : district[usedName].toLowerCase().startsWith(searchedDistrict.trim().toLowerCase()))
      )
    );
  }, [districts, filter.countries, searchedDistrict]);

  return (
    <div className={`${styles.filters_group} ${activeComponent === ComponentType.DistrictsSelector ? styles.active : ""}`}>
      <div
        className={styles.group_name}
        onClick={() =>
          setActiveComponent(
            activeComponent === ComponentType.DistrictsSelector ? ComponentType.None : ComponentType.DistrictsSelector
          )
        }
      >
        {t("global.district")}
        {activeComponent === ComponentType.DistrictsSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        {filter.districts.length > 0 ? <div className={styles.group_count}>{filter.districts.length}</div> : null}
      </div>
      <div className={styles.filters_list}>
        <div className={globalStyles.search_input}>
          <input
            type="name"
            placeholder={t("global.district_search")}
            value={searchedDistrict}
            onChange={(event) => setSearchedDistrict(event.target.value)}
          />
          <SearchIcon fill="#98042D" />
        </div>
        {activeComponent === ComponentType.DistrictsSelector &&
          filteredDistricts.map((district: IDistrict) => (
            <div className={styles.filter_item}>
              <label className={globalStyles.checkbox}>
                <input type="checkbox" />
                <span
                  className={`${globalStyles.checkbox_mark} ${
                    filter.districts.filter((item: number) => item === district.id).length > 0 ? globalStyles.active : ""
                  }`}
                  aria-hidden="true"
                  onClick={() => {
                    if (filter.districts.filter((item: number) => item === district.id).length > 0) {
                      setFilter({
                        ...filter,
                        districts: filter.districts.filter((item: number) => item !== district.id),
                        selectedCity: { id: -1 } as ICity,
                        selectedCountry: { id: -1 } as ICountry,
                      });
                    } else {
                      setFilter({
                        ...filter,
                        districts: [...filter.districts, district.id],
                        selectedCity: { id: -1 } as ICity,
                        selectedCountry: { id: -1 } as ICountry,
                      });
                    }
                  }}
                >
                  {filter.districts.filter((item: number) => item === district.id).length > 0 ? (
                    <CheckIcon fill="#98042D" />
                  ) : null}
                </span>
                <div className={globalStyles.text}>
                  {i18n.resolvedLanguage === "ru" ? district.district : district.district_eng}
                </div>
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DistrictsSelector;
