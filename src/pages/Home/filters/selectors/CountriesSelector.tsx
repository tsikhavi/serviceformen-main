import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";
import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";
import { ICountry } from "../../../../types/core/country";
import { ICity } from "../../../../types/core/city";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";
import { Check as CheckIcon } from "../../../../assets/Check";

interface ICountriesSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const CountriesSelector: React.FC<ICountriesSelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const { t, i18n } = useTranslation();
  const { setFilter } = useActions();
  const filter = useTypedSelector((state) => state.modelReducer.filter);
  const countries = useTypedSelector((state) => state.coreReducer.countries);

  return (
    <div className={`${styles.filters_group} ${activeComponent === ComponentType.CountriesSelector ? styles.active : ""}`}>
      <div
        className={styles.group_name}
        onClick={() =>
          setActiveComponent(
            activeComponent === ComponentType.CountriesSelector ? ComponentType.None : ComponentType.CountriesSelector
          )
        }
      >
        {t("global.country")}
        {activeComponent === ComponentType.CountriesSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        {filter.countries.length > 0 ? <div className={styles.group_count}>{filter.countries.length}</div> : null}
      </div>
      <div className={styles.filters_list}>
        {activeComponent === ComponentType.CountriesSelector &&
          countries.map((country: ICountry) => (
            <div className={styles.filter_item}>
              <label className={globalStyles.checkbox}>
                <input type="checkbox" />
                <span
                  className={`${globalStyles.checkbox_mark} ${
                    filter.countries.filter((item: number) => item === country.id).length > 0 ? globalStyles.active : ""
                  }`}
                  aria-hidden="true"
                  onClick={() => {
                    if (filter.countries.filter((item: number) => item === country.id).length > 0) {
                      setFilter({
                        ...filter,
                        countries: filter.countries.filter((item: number) => item !== country.id),
                        selectedCity: { id: -1 } as ICity,
                        selectedCountry: { id: -1 } as ICountry,
                      });
                    } else {
                      setFilter({
                        ...filter,
                        countries: [...filter.countries, country.id],
                        selectedCity: { id: -1 } as ICity,
                        selectedCountry: { id: -1 } as ICountry,
                      });
                    }
                  }}
                >
                  {filter.countries.filter((item: number) => item === country.id).length > 0 ? (
                    <CheckIcon fill="#98042D" />
                  ) : null}
                </span>
                <div className={globalStyles.text}>
                  {i18n.resolvedLanguage === "ru" ? country.country : country.country_eng}
                </div>
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CountriesSelector;
