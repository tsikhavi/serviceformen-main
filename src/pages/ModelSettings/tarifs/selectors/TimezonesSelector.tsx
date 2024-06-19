import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";

import { ComponentType } from "../ComponentType";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";

interface ITimezonesSelector {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  setActiveTimeSelector: React.Dispatch<React.SetStateAction<number>>;
}

const TimezonesSelector: React.FC<ITimezonesSelector> = ({ activeComponent, setActiveComponent, setActiveTimeSelector }) => {
  const { t } = useTranslation();
  const { setModel } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);

  const handlerDropdownButtonOnClick = () => {
    setActiveTimeSelector(-1);
    setActiveComponent(
      activeComponent === ComponentType.TimezonesSelector ? ComponentType.None : ComponentType.TimezonesSelector
    );
  };

  const handlerTimezoneOnClick = (timezone: number) => {
    setModel({ ...model, time_zone: timezone });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${globalStyles.dropdown} ${
        activeComponent === ComponentType.TimezonesSelector ? globalStyles.active : ""
      }`}
    >
      <div className={globalStyles.main}>
        <div className={globalStyles.label}>{t("model.time_zone")}</div>
        <div className={globalStyles.dropdown_button} onClick={handlerDropdownButtonOnClick}>
          {model.time_zone === -100
            ? ""
            : "UTC" +
              (model.time_zone < 0 ? "-" : "+") +
              String(model.time_zone).replace("-", "").trim().padStart(2, "0") +
              ":00"}
          {activeComponent === ComponentType.TimezonesSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={globalStyles.required}>*</div>
      </div>
      <div
        className={`${globalStyles.dropdown_container} ${
          activeComponent === ComponentType.TimezonesSelector ? globalStyles.active : ""
        }`}
      >
        <div className={globalStyles.dropdown_list}>
          {Array(27)
            .fill(1)
            .map((_value, index: number) => (
              <div className={globalStyles.dropdown_item} onClick={() => handlerTimezoneOnClick(index - 12)}>
                UTC {index - 12 < 0 ? "-" : "+"}
                {String(index - 12)
                  .replace("-", "")
                  .trim()
                  .padStart(2, "0")}
                :00
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TimezonesSelector;
