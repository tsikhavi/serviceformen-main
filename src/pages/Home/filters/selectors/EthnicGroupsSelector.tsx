import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";
import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";
import { IEthnicGroup } from "../../../../types/core/ethnicGroup";
import { INationality } from "../../../../types/core/nationality";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";
import { Check as CheckIcon } from "../../../../assets/Check";

interface IEthnicGroupsSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const EthnicGroupsSelector: React.FC<IEthnicGroupsSelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const { t, i18n } = useTranslation();
  const { setFilter } = useActions();
  const filter = useTypedSelector((state) => state.modelReducer.filter);
  const ethnicGroups = useTypedSelector((state) => state.coreReducer.ethnicGroups);
  const nationalities = useTypedSelector((state) => state.coreReducer.nationalities);

  return (
    <div
      className={`${styles.filters_group} ${activeComponent === ComponentType.EthnicGroupsSelector ? styles.active : ""}`}
    >
      <div
        className={styles.group_name}
        onClick={() =>
          setActiveComponent(
            activeComponent === ComponentType.EthnicGroupsSelector ? ComponentType.None : ComponentType.EthnicGroupsSelector
          )
        }
      >
        {`${t("model.ethnic_group")}/${t("model.nationality")}`}
        {activeComponent === ComponentType.EthnicGroupsSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        {filter.ethnicGroups.length + filter.nationalities.length > 0 ? (
          <div className={styles.group_count}>{filter.ethnicGroups.length + filter.nationalities.length}</div>
        ) : null}
      </div>
      <div className={styles.filters_list}>
        <div style={{ width: "100%" }}>
          <div className={styles.group_sub_name}>{t("model.ethnic_group")}</div>
          <div className={styles.filters_list}>
            {activeComponent === ComponentType.EthnicGroupsSelector &&
              ethnicGroups.map((ethnicGroup: IEthnicGroup) => (
                <div className={styles.filter_item}>
                  <label className={globalStyles.checkbox}>
                    <input type="checkbox" />
                    <span
                      className={`${globalStyles.checkbox_mark} ${
                        filter.ethnicGroups.filter((item: number) => item === ethnicGroup.id).length > 0
                          ? globalStyles.active
                          : ""
                      }`}
                      aria-hidden="true"
                      onClick={() => {
                        if (filter.ethnicGroups.filter((item: number) => item === ethnicGroup.id).length > 0) {
                          setFilter({
                            ...filter,
                            ethnicGroups: filter.ethnicGroups.filter((item: number) => item !== ethnicGroup.id),
                          });
                        } else {
                          setFilter({
                            ...filter,
                            ethnicGroups: [...filter.ethnicGroups, ethnicGroup.id],
                          });
                        }
                      }}
                    >
                      {filter.ethnicGroups.filter((item: number) => item === ethnicGroup.id).length > 0 ? (
                        <CheckIcon fill="#98042D" />
                      ) : null}
                    </span>
                    <div className={globalStyles.text}>
                      {i18n.resolvedLanguage === "ru" ? ethnicGroup.ethnic_group : ethnicGroup.ethnic_group_eng}
                    </div>
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <div className={styles.group_sub_name}>{t("model.nationality")}</div>
          <div className={styles.filters_list}>
            {activeComponent === ComponentType.EthnicGroupsSelector &&
              nationalities.map((nationality: INationality) => (
                <div className={styles.filter_item}>
                  <label className={globalStyles.checkbox}>
                    <input type="checkbox" />
                    <span
                      className={`${globalStyles.checkbox_mark} ${
                        filter.nationalities.filter((item: number) => item === nationality.id).length > 0
                          ? globalStyles.active
                          : ""
                      }`}
                      aria-hidden="true"
                      onClick={() => {
                        if (filter.nationalities.filter((item: number) => item === nationality.id).length > 0) {
                          setFilter({
                            ...filter,
                            nationalities: filter.nationalities.filter((item: number) => item !== nationality.id),
                          });
                        } else {
                          setFilter({
                            ...filter,
                            nationalities: [...filter.nationalities, nationality.id],
                          });
                        }
                      }}
                    >
                      {filter.nationalities.filter((item: number) => item === nationality.id).length > 0 ? (
                        <CheckIcon fill="#98042D" />
                      ) : null}
                    </span>
                    <div className={globalStyles.text}>
                      {i18n.resolvedLanguage === "ru" ? nationality.nationality : nationality.nationality_eng}
                    </div>
                  </label>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EthnicGroupsSelector;
