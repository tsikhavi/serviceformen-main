import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";

import { ComponentType } from "../ComponentType";
import { ISmooker } from "../../../../types/core/smooker";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";

interface ISmookerSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
}

const SmookerSelector: React.FC<ISmookerSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart }) => {
  const { t, i18n } = useTranslation();
  const { setModel } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);
  const smookers = useTypedSelector((state) => state.coreReducer.smookers);

  const handlerSmookerOnClick = (smooker: ISmooker) => {
    setModel({ ...model, smooker_id: smooker.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${globalStyles.dropdown} ${activeComponent === ComponentType.SmookerSelector ? globalStyles.active : ""} ${
        isCheckStart && model.smooker_id === -1 ? "wrong" : ""
      }`}
    >
      <div className={globalStyles.main}>
        <div className={globalStyles.label}>{t("model.smoker")}</div>
        <div
          className={`${globalStyles.dropdown_button} ${isCheckStart && model.smooker_id === -1 ? globalStyles.wrong : ""}`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.SmookerSelector ? ComponentType.None : ComponentType.SmookerSelector
            )
          }
        >
          {model.smooker_id === -1
            ? ""
            : i18n.resolvedLanguage === "ru"
            ? smookers.find((smooker: ISmooker) => smooker.id === model.smooker_id)?.smooker
            : smookers.find((smooker: ISmooker) => smooker.id === model.smooker_id)?.smooker_eng}
          {activeComponent === ComponentType.SmookerSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={globalStyles.required}>*</div>
      </div>
      <div
        className={`${globalStyles.dropdown_container} ${
          activeComponent === ComponentType.SmookerSelector ? globalStyles.active : ""
        }`}
      >
        <div className={globalStyles.dropdown_list}>
          {smookers.map((smooker: ISmooker) => (
            <div className={globalStyles.dropdown_item} onClick={() => handlerSmookerOnClick(smooker)}>
              {i18n.resolvedLanguage === "ru" ? smooker.smooker : smooker.smooker_eng}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmookerSelector;
