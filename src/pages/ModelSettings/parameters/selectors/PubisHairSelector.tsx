import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";

import { ComponentType } from "../ComponentType";
import { IPubisHair } from "../../../../types/core/pubisHair";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";

interface IPubisHairSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
}

const PubisHairSelector: React.FC<IPubisHairSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart }) => {
  const { t, i18n } = useTranslation();
  const { setModel } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);
  const pubisHairs = useTypedSelector((state) => state.coreReducer.pubisHairs);

  const handlerPubisHairOnClick = (pubisHair: IPubisHair) => {
    setModel({ ...model, pubis_hair_id: pubisHair.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${globalStyles.dropdown} ${
        activeComponent === ComponentType.PubisHairSelector ? globalStyles.active : ""
      } ${isCheckStart && model.pubis_hair_id === -1 ? "wrong" : ""}`}
    >
      <div className={globalStyles.main}>
        <div className={globalStyles.label}>{t("model.pubic_hair")}</div>
        <div
          className={`${globalStyles.dropdown_button} ${
            isCheckStart && model.pubis_hair_id === -1 ? globalStyles.wrong : ""
          }`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.PubisHairSelector ? ComponentType.None : ComponentType.PubisHairSelector
            )
          }
        >
          {model.pubis_hair_id === -1
            ? ""
            : i18n.resolvedLanguage === "ru"
            ? pubisHairs.find((pubisHair: IPubisHair) => pubisHair.id === model.pubis_hair_id)?.pubis_hair
            : pubisHairs.find((pubisHair: IPubisHair) => pubisHair.id === model.pubis_hair_id)?.pubis_hair_eng}
          {activeComponent === ComponentType.PubisHairSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={globalStyles.required}>*</div>
      </div>
      <div
        className={`${globalStyles.dropdown_container} ${
          activeComponent === ComponentType.PubisHairSelector ? globalStyles.active : ""
        }`}
      >
        <div className={globalStyles.dropdown_list}>
          {pubisHairs.map((pubisHair: IPubisHair) => (
            <div className={globalStyles.dropdown_item} onClick={() => handlerPubisHairOnClick(pubisHair)}>
              {i18n.resolvedLanguage === "ru" ? pubisHair.pubis_hair : pubisHair.pubis_hair_eng}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PubisHairSelector;
