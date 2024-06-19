import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";

import { ComponentType } from "../ComponentType";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";

interface IHeightSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
}

const HeightSelector: React.FC<IHeightSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart }) => {
  const { t } = useTranslation();
  const { setModel } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);

  const handlerHeightOnClick = (height: number) => {
    setModel({ ...model, height: height });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${globalStyles.dropdown} ${activeComponent === ComponentType.HeightSelector ? globalStyles.active : ""} ${
        isCheckStart && model.height === 0 ? "wrong" : ""
      }`}
    >
      <div className={globalStyles.main}>
        <div className={globalStyles.label}>
          {t("model.height")} ({t("model.cm")})
        </div>
        <div
          className={`${globalStyles.dropdown_button} ${isCheckStart && model.height === 0 ? globalStyles.wrong : ""}`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.HeightSelector ? ComponentType.None : ComponentType.HeightSelector
            )
          }
        >
          {model.height === 0 ? "" : model.height}
          {activeComponent === ComponentType.HeightSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={globalStyles.required}>*</div>
      </div>
      <div
        className={`${globalStyles.dropdown_container} ${
          activeComponent === ComponentType.HeightSelector ? globalStyles.active : ""
        }`}
      >
        <div className={globalStyles.dropdown_list}>
          {Array(71)
            .fill(1)
            .map((_value, index: number) => (
              <div className={globalStyles.dropdown_item} onClick={() => handlerHeightOnClick(index + 150)}>
                {index + 150}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HeightSelector;
