import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";

import { ComponentType } from "../ComponentType";
import { ITatoo } from "../../../../types/core/tatoo";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";

interface ITatooSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
}

const TatooSelector: React.FC<ITatooSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart }) => {
  const { t, i18n } = useTranslation();
  const { setModel } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);
  const tatoos = useTypedSelector((state) => state.coreReducer.tatoos);

  const handlerTatooOnClick = (tatoo: ITatoo) => {
    setModel({ ...model, tatoo_id: tatoo.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${globalStyles.dropdown} ${activeComponent === ComponentType.TatooSelector ? globalStyles.active : ""} ${
        isCheckStart && model.tatoo_id === -1 ? "wrong" : ""
      }`}
    >
      <div className={globalStyles.main}>
        <div className={globalStyles.label}>{t("model.tattoo")}</div>
        <div
          className={`${globalStyles.dropdown_button} ${isCheckStart && model.tatoo_id === -1 ? globalStyles.wrong : ""}`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.TatooSelector ? ComponentType.None : ComponentType.TatooSelector
            )
          }
        >
          {model.tatoo_id === -1
            ? ""
            : i18n.resolvedLanguage === "ru"
            ? tatoos.find((tatoo: ITatoo) => tatoo.id === model.tatoo_id)?.tatoo
            : tatoos.find((tatoo: ITatoo) => tatoo.id === model.tatoo_id)?.tatoo_eng}
          {activeComponent === ComponentType.TatooSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={globalStyles.required}>*</div>
      </div>
      <div
        className={`${globalStyles.dropdown_container} ${
          activeComponent === ComponentType.TatooSelector ? globalStyles.active : ""
        }`}
      >
        <div className={globalStyles.dropdown_list}>
          {tatoos.map((tatoo: ITatoo) => (
            <div className={globalStyles.dropdown_item} onClick={() => handlerTatooOnClick(tatoo)}>
              {i18n.resolvedLanguage === "ru" ? tatoo.tatoo : tatoo.tatoo_eng}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TatooSelector;
