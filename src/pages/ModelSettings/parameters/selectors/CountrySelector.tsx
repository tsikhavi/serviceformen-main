import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";

import { ComponentType } from "../ComponentType";
import { ICountry } from "../../../../types/core/country";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";

interface ICountrySelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const CountrySelector: React.FC<ICountrySelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const { t, i18n } = useTranslation();
  const { setModel } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);
  const countries = useTypedSelector((state) => state.coreReducer.countries);

  const handlerCountryOnClick = (country: ICountry) => {
    setModel({ ...model, country_id: country.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${globalStyles.dropdown} ${activeComponent === ComponentType.CountrySelector ? globalStyles.active : ""}`}
    >
      <div className={globalStyles.main}>
        <div className={globalStyles.label}>{t("global.country")}</div>
        <div
          className={globalStyles.dropdown_button}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.CountrySelector ? ComponentType.None : ComponentType.CountrySelector
            )
          }
        >
          {model.country_id === -1
            ? ""
            : i18n.resolvedLanguage === "ru"
            ? countries.find((country: ICountry) => country.id === model.country_id)?.country
            : countries.find((country: ICountry) => country.id === model.country_id)?.country_eng}
          {activeComponent === ComponentType.CountrySelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={globalStyles.required}>*</div>
      </div>
      <div
        className={`${globalStyles.dropdown_container} ${
          activeComponent === ComponentType.CountrySelector ? globalStyles.active : ""
        }`}
      >
        <div className={globalStyles.dropdown_list}>
          {countries.map((country: ICountry) => (
            <div className={globalStyles.dropdown_item} onClick={() => handlerCountryOnClick(country)}>
              {i18n.resolvedLanguage === "ru" ? country.country : country.country_eng}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountrySelector;
