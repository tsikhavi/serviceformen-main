import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";

import { ComponentType } from "../ComponentType";
import { IBreastSize } from "../../../../types/core/breastSize";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";

interface IBreastSizeSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
}

const BreastSizeSelector: React.FC<IBreastSizeSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart }) => {
  const { t } = useTranslation();
  const { setModel } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);
  const breastSizes = useTypedSelector((state) => state.coreReducer.breastSizes);

  const handlerBreastSizeOnClick = (breastSize: IBreastSize) => {
    setModel({ ...model, breast_size_id: breastSize.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${globalStyles.dropdown} ${
        activeComponent === ComponentType.BreastSizeSelector ? globalStyles.active : ""
      } ${isCheckStart && model.breast_size_id === -1 ? "wrong" : ""}`}
    >
      <div className={globalStyles.main}>
        <div className={globalStyles.label}>{t("model.breast_size")}</div>
        <div
          className={`${globalStyles.dropdown_button} ${
            isCheckStart && model.breast_size_id === -1 ? globalStyles.wrong : ""
          }`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.BreastSizeSelector ? ComponentType.None : ComponentType.BreastSizeSelector
            )
          }
        >
          {model.breast_size_id === -1
            ? ""
            : breastSizes.find((breastSize: IBreastSize) => breastSize.id === model.breast_size_id)?.breast_size}
          {activeComponent === ComponentType.BreastSizeSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={globalStyles.required}>*</div>
      </div>
      <div
        className={`${globalStyles.dropdown_container} ${
          activeComponent === ComponentType.BreastSizeSelector ? globalStyles.active : ""
        }`}
      >
        <div className={globalStyles.dropdown_list}>
          {breastSizes.map((breastSize: IBreastSize) => (
            <div className={globalStyles.dropdown_item} onClick={() => handlerBreastSizeOnClick(breastSize)}>
              {breastSize.breast_size}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreastSizeSelector;
