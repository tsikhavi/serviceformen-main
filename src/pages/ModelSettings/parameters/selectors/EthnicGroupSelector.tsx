import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";

import { ComponentType } from "../ComponentType";
import { IEthnicGroup } from "../../../../types/core/ethnicGroup";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";

interface IEthnicGroupSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
}

const EthnicGroupSelector: React.FC<IEthnicGroupSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart }) => {
  const { t, i18n } = useTranslation();
  const { setModel } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);
  const ethnicGroups = useTypedSelector((state) => state.coreReducer.ethnicGroups);

  const handlerEthnicGroupOnClick = (ethnicGroup: IEthnicGroup) => {
    setModel({ ...model, ethnic_group_id: ethnicGroup.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${globalStyles.dropdown} ${
        activeComponent === ComponentType.EthnicGroupSelector ? globalStyles.active : ""
      } ${isCheckStart && model.ethnic_group_id === -1 ? "wrong" : ""}`}
    >
      <div className={globalStyles.main}>
        <div className={globalStyles.label}>{t("model.ethnic_group")}</div>
        <div
          className={`${globalStyles.dropdown_button} ${
            isCheckStart && model.ethnic_group_id === -1 ? globalStyles.wrong : ""
          }`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.EthnicGroupSelector ? ComponentType.None : ComponentType.EthnicGroupSelector
            )
          }
        >
          {model.ethnic_group_id === -1
            ? ""
            : i18n.resolvedLanguage === "ru"
            ? ethnicGroups.find((ethnicGroup: IEthnicGroup) => ethnicGroup.id === model.ethnic_group_id)?.ethnic_group
            : ethnicGroups.find((ethnicGroup: IEthnicGroup) => ethnicGroup.id === model.ethnic_group_id)?.ethnic_group_eng}
          {activeComponent === ComponentType.EthnicGroupSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={globalStyles.required}>*</div>
      </div>
      <div
        className={`${globalStyles.dropdown_container} ${
          activeComponent === ComponentType.EthnicGroupSelector ? globalStyles.active : ""
        }`}
      >
        <div className={globalStyles.dropdown_list}>
          {ethnicGroups.map((ethnicGroup: IEthnicGroup) => (
            <div className={globalStyles.dropdown_item} onClick={() => handlerEthnicGroupOnClick(ethnicGroup)}>
              {i18n.resolvedLanguage === "ru" ? ethnicGroup.ethnic_group : ethnicGroup.ethnic_group_eng}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EthnicGroupSelector;
