import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";

import { ComponentType } from "../ComponentType";
import { IBreastType } from "../../../../types/core/breastType";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";

interface IBreastTypeSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
}

const BreastTypeSelector: React.FC<IBreastTypeSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart }) => {
  const { t, i18n } = useTranslation();
  const { setModel } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);
  const breastTypes = useTypedSelector((state) => state.coreReducer.breastTypes);

  const handlerBreastTypeOnClick = (breastType: IBreastType) => {
    setModel({ ...model, breast_type_id: breastType.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${globalStyles.dropdown} ${
        activeComponent === ComponentType.BreastTypeSelector ? globalStyles.active : ""
      } ${isCheckStart && model.breast_type_id === -1 ? "wrong" : ""}`}
    >
      <div className={globalStyles.main}>
        <div className={globalStyles.label}>{t("model.breast_type")}</div>
        <div
          className={`${globalStyles.dropdown_button} ${
            isCheckStart && model.breast_type_id === -1 ? globalStyles.wrong : ""
          }`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.BreastTypeSelector ? ComponentType.None : ComponentType.BreastTypeSelector
            )
          }
        >
          {model.breast_type_id === -1
            ? ""
            : i18n.resolvedLanguage === "ru"
            ? breastTypes.find((breastType: IBreastType) => breastType.id === model.breast_type_id)?.breast_type
            : breastTypes.find((breastType: IBreastType) => breastType.id === model.breast_type_id)?.breast_type_eng}
          {activeComponent === ComponentType.BreastTypeSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={globalStyles.required}>*</div>
      </div>
      <div
        className={`${globalStyles.dropdown_container} ${
          activeComponent === ComponentType.BreastTypeSelector ? globalStyles.active : ""
        }`}
      >
        <div className={globalStyles.dropdown_list}>
          {breastTypes.map((breastType: IBreastType) => (
            <div className={globalStyles.dropdown_item} onClick={() => handlerBreastTypeOnClick(breastType)}>
              {i18n.resolvedLanguage === "ru" ? breastType.breast_type : breastType.breast_type_eng}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreastTypeSelector;
