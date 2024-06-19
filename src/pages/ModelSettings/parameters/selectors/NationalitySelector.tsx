import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";

import { ComponentType } from "../ComponentType";
import { INationality } from "../../../../types/core/nationality";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";

interface INationalitySelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
}

const NationalitySelector: React.FC<INationalitySelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart }) => {
  const { t, i18n } = useTranslation();
  const { setModel } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);
  const nationalities = useTypedSelector((state) => state.coreReducer.nationalities);

  const handlerNationalityOnClick = (nationality: INationality) => {
    setModel({ ...model, nationality_id: nationality.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${globalStyles.dropdown} ${
        activeComponent === ComponentType.NationalitySelector ? globalStyles.active : ""
      } ${isCheckStart && model.nationality_id === -1 ? "wrong" : ""}`}
    >
      <div className={globalStyles.main}>
        <div className={globalStyles.label}>{t("model.nationality")}</div>
        <div
          className={`${globalStyles.dropdown_button} ${
            isCheckStart && model.nationality_id === -1 ? globalStyles.wrong : ""
          }`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.NationalitySelector ? ComponentType.None : ComponentType.NationalitySelector
            )
          }
        >
          {model.nationality_id === -1
            ? ""
            : i18n.resolvedLanguage === "ru"
            ? nationalities.find((nationality: INationality) => nationality.id === model.nationality_id)?.nationality
            : nationalities.find((nationality: INationality) => nationality.id === model.nationality_id)?.nationality_eng}
          {activeComponent === ComponentType.NationalitySelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={globalStyles.required}>*</div>
      </div>
      <div
        className={`${globalStyles.dropdown_container} ${
          activeComponent === ComponentType.NationalitySelector ? globalStyles.active : ""
        }`}
      >
        <div className={globalStyles.dropdown_list}>
          {nationalities.map((nationality: INationality) => (
            <div className={globalStyles.dropdown_item} onClick={() => handlerNationalityOnClick(nationality)}>
              {i18n.resolvedLanguage === "ru" ? nationality.nationality : nationality.nationality_eng}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NationalitySelector;
