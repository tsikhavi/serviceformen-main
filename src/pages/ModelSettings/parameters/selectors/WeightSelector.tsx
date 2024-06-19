import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";

import { ComponentType } from "../ComponentType";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";

interface IWeightSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
}

const WeightSelector: React.FC<IWeightSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart }) => {
  const { t } = useTranslation();
  const { setModel } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);

  const handlerWeightOnClick = (weight: number) => {
    setModel({ ...model, weight: weight });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${globalStyles.dropdown} ${activeComponent === ComponentType.WeightSelector ? globalStyles.active : ""} ${
        isCheckStart && model.weight === 0 ? "wrong" : ""
      }`}
    >
      <div className={globalStyles.main}>
        <div className={globalStyles.label}>
          {t("model.weight")} ({t("model.kg")})
        </div>
        <div
          className={`${globalStyles.dropdown_button} ${isCheckStart && model.weight === 0 ? globalStyles.wrong : ""}`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.WeightSelector ? ComponentType.None : ComponentType.WeightSelector
            )
          }
        >
          {model.weight === 0 ? "" : model.weight}
          {activeComponent === ComponentType.WeightSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={globalStyles.required}>*</div>
      </div>
      <div
        className={`${globalStyles.dropdown_container} ${
          activeComponent === ComponentType.WeightSelector ? globalStyles.active : ""
        }`}
      >
        <div className={globalStyles.dropdown_list}>
          {Array(86)
            .fill(1)
            .map((_value, index: number) => (
              <div className={globalStyles.dropdown_item} onClick={() => handlerWeightOnClick(index + 40)}>
                {index + 40}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WeightSelector;
