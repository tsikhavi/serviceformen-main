import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";

import { ComponentType } from "../ComponentType";
import { ICountry } from "../../../../types/core/country";
import { IBlockedCountry } from "../../../../types/model/blockedCountry/blockedCountry";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";
import { Check as CheckIcon } from "../../../../assets/Check";

interface IBlockedCountriesSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const BlockedCountriesSelector: React.FC<IBlockedCountriesSelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const { t, i18n } = useTranslation();
  const { setModel } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);
  const countries = useTypedSelector((state) => state.coreReducer.countries);

  const handlerCountryOnClick = (country: ICountry) => {
    if (
      model.blocked_countries.filter((blockedCountry: IBlockedCountry) => blockedCountry.country_id === country.id).length >
      0
    ) {
      setModel({
        ...model,
        blocked_countries: model.blocked_countries.filter(
          (blockedCountry: IBlockedCountry) => blockedCountry.country_id !== country.id
        ),
      });
    } else {
      setModel({
        ...model,
        blocked_countries: [...model.blocked_countries, { country_id: country.id, model_id: model.id } as IBlockedCountry],
      });
    }
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${globalStyles.dropdown} ${
        activeComponent === ComponentType.BlockedCountriesSelector ? globalStyles.active : ""
      }`}
    >
      <div className={`${globalStyles.main} ${globalStyles.column}`}>
        <div className={globalStyles.label}>{t("model.block_the_country")}</div>
        <div
          className={`${globalStyles.dropdown_button} ${globalStyles.full_width}`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.BlockedCountriesSelector
                ? ComponentType.None
                : ComponentType.BlockedCountriesSelector
            )
          }
        >
          {model.blocked_countries.length === 0
            ? t("global.not_selected")
            : `${t("global.selected")}: ` + model.blocked_countries.length}
          {activeComponent === ComponentType.BlockedCountriesSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={globalStyles.description}>{t("model.block_the_country_description")}</div>
      </div>
      <div
        className={`${globalStyles.dropdown_container} ${globalStyles.full_width} ${globalStyles.column} ${
          activeComponent === ComponentType.BlockedCountriesSelector ? globalStyles.active : ""
        }`}
      >
        <div className={globalStyles.dropdown_list}>
          {countries.map((country: ICountry) => (
            <label className={globalStyles.checkbox}>
              <input type="checkbox" />
              <span
                className={`${globalStyles.checkbox_mark} ${
                  model.blocked_countries.filter(
                    (blockedCountry: IBlockedCountry) => blockedCountry.country_id === country.id
                  ).length > 0
                    ? globalStyles.active
                    : ""
                }`}
                aria-hidden="true"
                onClick={() => handlerCountryOnClick(country)}
              >
                {model.blocked_countries.filter(
                  (blockedCountry: IBlockedCountry) => blockedCountry.country_id === country.id
                ).length > 0 ? (
                  <CheckIcon fill="#98042D" />
                ) : null}
              </span>
              <div className={globalStyles.text}>
                {i18n.resolvedLanguage === "ru" ? country.country : country.country_eng}
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockedCountriesSelector;
