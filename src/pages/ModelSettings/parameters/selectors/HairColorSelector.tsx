import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";

import { ComponentType } from "../ComponentType";
import { IHairColor } from "../../../../types/core/hairColor";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";

interface IHairColorSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
}

const HairColorSelector: React.FC<IHairColorSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart }) => {
  const { t, i18n } = useTranslation();
  const { setModel } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);
  const hairColors = useTypedSelector((state) => state.coreReducer.hairColors);

  const handlerHairColorOnClick = (hairColor: IHairColor) => {
    setModel({ ...model, hair_color_id: hairColor.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${globalStyles.dropdown} ${
        activeComponent === ComponentType.HairColorSelector ? globalStyles.active : ""
      } ${isCheckStart && model.hair_color_id === -1 ? "wrong" : ""}`}
    >
      <div className={globalStyles.main}>
        <div className={globalStyles.label}>{t("model.hair_color")}</div>
        <div
          className={`${globalStyles.dropdown_button} ${
            isCheckStart && model.hair_color_id === -1 ? globalStyles.wrong : ""
          }`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.HairColorSelector ? ComponentType.None : ComponentType.HairColorSelector
            )
          }
        >
          {model.hair_color_id === -1
            ? ""
            : i18n.resolvedLanguage === "ru"
            ? hairColors.find((hairColor: IHairColor) => hairColor.id === model.hair_color_id)?.hair_color
            : hairColors.find((hairColor: IHairColor) => hairColor.id === model.hair_color_id)?.hair_color_eng}
          {activeComponent === ComponentType.HairColorSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={globalStyles.required}>*</div>
      </div>
      <div
        className={`${globalStyles.dropdown_container} ${
          activeComponent === ComponentType.HairColorSelector ? globalStyles.active : ""
        }`}
      >
        <div className={globalStyles.dropdown_list}>
          {hairColors.map((hairColor: IHairColor) => (
            <div className={globalStyles.dropdown_item} onClick={() => handlerHairColorOnClick(hairColor)}>
              {i18n.resolvedLanguage === "ru" ? hairColor.hair_color : hairColor.hair_color_eng}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HairColorSelector;
