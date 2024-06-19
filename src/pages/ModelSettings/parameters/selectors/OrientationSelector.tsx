import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";

import { ComponentType } from "../ComponentType";
import { IOrientation } from "../../../../types/core/orientation";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";

interface IOrientationSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
}

const OrientationSelector: React.FC<IOrientationSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart }) => {
  const { t, i18n } = useTranslation();
  const { setModel } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);
  const orientations = useTypedSelector((state) => state.coreReducer.orientations);

  const handlerOrientationOnClick = (orientation: IOrientation) => {
    setModel({ ...model, orientation_id: orientation.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${globalStyles.dropdown} ${
        activeComponent === ComponentType.OrientationSelector ? globalStyles.active : ""
      } ${isCheckStart && model.orientation_id === -1 ? "wrong" : ""}`}
    >
      <div className={globalStyles.main}>
        <div className={globalStyles.label}>{t("model.orientation")}</div>
        <div
          className={`${globalStyles.dropdown_button} ${
            isCheckStart && model.orientation_id === -1 ? globalStyles.wrong : ""
          }`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.OrientationSelector ? ComponentType.None : ComponentType.OrientationSelector
            )
          }
        >
          {model.orientation_id === -1
            ? ""
            : i18n.resolvedLanguage === "ru"
            ? orientations.find((orientation: IOrientation) => orientation.id === model.orientation_id)?.orientation
            : orientations.find((orientation: IOrientation) => orientation.id === model.orientation_id)?.orientation_eng}
          {activeComponent === ComponentType.OrientationSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={globalStyles.required}>*</div>
      </div>
      <div
        className={`${globalStyles.dropdown_container} ${
          activeComponent === ComponentType.OrientationSelector ? globalStyles.active : ""
        }`}
      >
        <div className={globalStyles.dropdown_list}>
          {orientations.map((orientation: IOrientation) => (
            <div className={globalStyles.dropdown_item} onClick={() => handlerOrientationOnClick(orientation)}>
              {i18n.resolvedLanguage === "ru" ? orientation.orientation : orientation.orientation_eng}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrientationSelector;
