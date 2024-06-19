import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";

import { ComponentType } from "../ComponentType";
import { IEyesColor } from "../../../../types/core/eyesColor";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";

interface IEyesColorSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
}

const EyesColorSelector: React.FC<IEyesColorSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart }) => {
  const { t, i18n } = useTranslation();
  const { setModel } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);
  const eyesColors = useTypedSelector((state) => state.coreReducer.eyesColors);

  const handlerEyesColorOnClick = (eyesColor: IEyesColor) => {
    setModel({ ...model, eyes_color_id: eyesColor.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${globalStyles.dropdown} ${
        activeComponent === ComponentType.EyesColorSelector ? globalStyles.active : ""
      } ${isCheckStart && model.eyes_color_id === -1 ? "wrong" : ""}`}
    >
      <div className={globalStyles.main}>
        <div className={globalStyles.label}>{t("model.eyes_color")}</div>
        <div
          className={`${globalStyles.dropdown_button} ${
            isCheckStart && model.eyes_color_id === -1 ? globalStyles.wrong : ""
          }`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.EyesColorSelector ? ComponentType.None : ComponentType.EyesColorSelector
            )
          }
        >
          {model.eyes_color_id === -1
            ? ""
            : i18n.resolvedLanguage === "ru"
            ? eyesColors.find((eyesColor: IEyesColor) => eyesColor.id === model.eyes_color_id)?.eyes_color
            : eyesColors.find((eyesColor: IEyesColor) => eyesColor.id === model.eyes_color_id)?.eyes_color_eng}
          {activeComponent === ComponentType.EyesColorSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={globalStyles.required}>*</div>
      </div>
      <div
        className={`${globalStyles.dropdown_container} ${
          activeComponent === ComponentType.EyesColorSelector ? globalStyles.active : ""
        }`}
      >
        <div className={globalStyles.dropdown_list}>
          {eyesColors.map((eyesColor: IEyesColor) => (
            <div className={globalStyles.dropdown_item} onClick={() => handlerEyesColorOnClick(eyesColor)}>
              {i18n.resolvedLanguage === "ru" ? eyesColor.eyes_color : eyesColor.eyes_color_eng}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EyesColorSelector;
