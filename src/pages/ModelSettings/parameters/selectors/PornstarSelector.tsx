import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";

import { ComponentType } from "../ComponentType";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";

interface IPornstarSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
}

const PornstarSelector: React.FC<IPornstarSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart }) => {
  const { t } = useTranslation();
  const { setModel } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);

  const handlerPornstarOnClick = (isPornstar: boolean) => {
    setModel({ ...model, is_pornstar: isPornstar ? 1 : 0 });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${globalStyles.dropdown} ${
        activeComponent === ComponentType.PornstarSelector ? globalStyles.active : ""
      } ${isCheckStart && model.is_pornstar === -1 ? "wrong" : ""}`}
    >
      <div className={globalStyles.main}>
        <div className={globalStyles.label}>{t("model.are_you_pornstar")}</div>
        <div
          className={`${globalStyles.dropdown_button} ${isCheckStart && model.is_pornstar === -1 ? globalStyles.wrong : ""}`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.PornstarSelector ? ComponentType.None : ComponentType.PornstarSelector
            )
          }
        >
          {model.is_pornstar === 0 && t("global.no")}
          {model.is_pornstar === 1 && t("global.yes")}
          {activeComponent === ComponentType.PornstarSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={globalStyles.required}>*</div>
      </div>
      <div
        className={`${globalStyles.dropdown_container} ${
          activeComponent === ComponentType.PornstarSelector ? globalStyles.active : ""
        }`}
      >
        <div className={globalStyles.dropdown_list}>
          <div className={globalStyles.dropdown_item} onClick={() => handlerPornstarOnClick(false)}>
            {t("global.no")}
          </div>
          <div className={globalStyles.dropdown_item} onClick={() => handlerPornstarOnClick(true)}>
            {t("global.yes")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PornstarSelector;
