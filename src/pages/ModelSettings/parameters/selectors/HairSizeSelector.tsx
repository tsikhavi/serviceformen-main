import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";

import { ComponentType } from "../ComponentType";
import { IHairSize } from "../../../../types/core/hairSize";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";

interface IHairSizeSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
}

const HairSizeSelector: React.FC<IHairSizeSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart }) => {
  const { t, i18n } = useTranslation();
  const { setModel } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);
  const hairSizes = useTypedSelector((state) => state.coreReducer.hairSizes);

  const handlerHairSizeOnClick = (hairSize: IHairSize) => {
    setModel({ ...model, hair_size_id: hairSize.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${globalStyles.dropdown} ${
        activeComponent === ComponentType.HairSizeSelector ? globalStyles.active : ""
      } ${isCheckStart && model.hair_size_id === -1 ? "wrong" : ""}`}
    >
      <div className={globalStyles.main}>
        <div className={globalStyles.label}>{t("model.hair_size")}</div>
        <div
          className={`${globalStyles.dropdown_button} ${
            isCheckStart && model.hair_size_id === -1 ? globalStyles.wrong : ""
          }`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.HairSizeSelector ? ComponentType.None : ComponentType.HairSizeSelector
            )
          }
        >
          {model.hair_size_id === -1
            ? ""
            : i18n.resolvedLanguage === "ru"
            ? hairSizes.find((hairSize: IHairSize) => hairSize.id === model.hair_size_id)?.hair_size
            : hairSizes.find((hairSize: IHairSize) => hairSize.id === model.hair_size_id)?.hair_size_eng}
          {activeComponent === ComponentType.HairSizeSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={globalStyles.required}>*</div>
      </div>
      <div
        className={`${globalStyles.dropdown_container} ${
          activeComponent === ComponentType.HairSizeSelector ? globalStyles.active : ""
        }`}
      >
        <div className={globalStyles.dropdown_list}>
          {hairSizes.map((hairSize: IHairSize) => (
            <div className={globalStyles.dropdown_item} onClick={() => handlerHairSizeOnClick(hairSize)}>
              {i18n.resolvedLanguage === "ru" ? hairSize.hair_size : hairSize.hair_size_eng}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HairSizeSelector;
