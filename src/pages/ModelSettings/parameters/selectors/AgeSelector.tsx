import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";

import { ComponentType } from "../ComponentType";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";

interface IAgeSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
}

const AgeSelector: React.FC<IAgeSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart }) => {
  const { t } = useTranslation();
  const { setModel } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);

  const handlerAgeOnClick = (age: number) => {
    setModel({ ...model, age: age });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${globalStyles.dropdown} ${activeComponent === ComponentType.AgeSelector ? globalStyles.active : ""} ${
        isCheckStart && model.age === 0 ? "wrong" : ""
      }`}
    >
      <div className={globalStyles.main}>
        <div className={globalStyles.label}>{t("model.age")}</div>
        <div
          className={`${globalStyles.dropdown_button} ${isCheckStart && model.age === 0 ? globalStyles.wrong : ""}`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.AgeSelector ? ComponentType.None : ComponentType.AgeSelector
            )
          }
        >
          {model.age === 0 ? "" : model.age}
          {activeComponent === ComponentType.AgeSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={globalStyles.required}>*</div>
      </div>
      <div
        className={`${globalStyles.dropdown_container} ${
          activeComponent === ComponentType.AgeSelector ? globalStyles.active : ""
        }`}
      >
        <div className={globalStyles.dropdown_list}>
          {Array(48)
            .fill(1)
            .map((_value, index: number) => (
              <div className={globalStyles.dropdown_item} onClick={() => handlerAgeOnClick(index + 18)}>
                {index + 18}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AgeSelector;
