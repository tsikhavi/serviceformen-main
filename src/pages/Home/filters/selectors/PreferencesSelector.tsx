import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";
import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";
import { ISmooker } from "../../../../types/core/smooker";
import { IPiercing } from "../../../../types/model/piercing/piercing";
import { ITatoo } from "../../../../types/core/tatoo";
import { IEyesColor } from "../../../../types/core/eyesColor";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";
import { Check as CheckIcon } from "../../../../assets/Check";

interface IPreferencesSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const PreferencesSelector: React.FC<IPreferencesSelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const { t, i18n } = useTranslation();
  const { setFilter } = useActions();
  const filter = useTypedSelector((state) => state.modelReducer.filter);
  const smookers = useTypedSelector((state) => state.coreReducer.smookers);
  const piercings = useTypedSelector((state) => state.coreReducer.piercings);
  const tatoos = useTypedSelector((state) => state.coreReducer.tatoos);
  const eyesColors = useTypedSelector((state) => state.coreReducer.eyesColors);

  return (
    <div className={`${styles.filters_group} ${activeComponent === ComponentType.PreferencesSelector ? styles.active : ""}`}>
      <div
        className={styles.group_name}
        onClick={() =>
          setActiveComponent(
            activeComponent === ComponentType.PreferencesSelector ? ComponentType.None : ComponentType.PreferencesSelector
          )
        }
      >
        {t("model.preferences")}
        {activeComponent === ComponentType.PreferencesSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        {filter.smookers.length + filter.piercings.length + filter.tatoos.length + filter.eyesColors.length > 0 ? (
          <div className={styles.group_count}>
            {filter.smookers.length + filter.piercings.length + filter.tatoos.length + filter.eyesColors.length}
          </div>
        ) : null}
      </div>
      <div className={styles.filters_list}>
        <div style={{ width: "100%" }}>
          <div className={styles.group_sub_name}>{t("model.smoker")}</div>
          <div className={styles.filters_list}>
            {activeComponent === ComponentType.PreferencesSelector &&
              smookers.map((smooker: ISmooker) => (
                <div className={styles.filter_item}>
                  <label className={globalStyles.checkbox}>
                    <input type="checkbox" />
                    <span
                      className={`${globalStyles.checkbox_mark} ${
                        filter.smookers.filter((item: number) => item === smooker.id).length > 0 ? globalStyles.active : ""
                      }`}
                      aria-hidden="true"
                      onClick={() => {
                        if (filter.smookers.filter((item: number) => item === smooker.id).length > 0) {
                          setFilter({
                            ...filter,
                            smookers: filter.smookers.filter((item: number) => item !== smooker.id),
                          });
                        } else {
                          setFilter({
                            ...filter,
                            smookers: [...filter.smookers, smooker.id],
                          });
                        }
                      }}
                    >
                      {filter.smookers.filter((item: number) => item === smooker.id).length > 0 ? (
                        <CheckIcon fill="#98042D" />
                      ) : null}
                    </span>
                    <div className={globalStyles.text}>
                      {i18n.resolvedLanguage === "ru" ? smooker.smooker : smooker.smooker_eng}
                    </div>
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <div className={styles.group_sub_name}>{t("model.piercing")}</div>
          <div className={styles.filters_list}>
            {activeComponent === ComponentType.PreferencesSelector &&
              piercings.map((piercing: IPiercing) => (
                <div className={styles.filter_item}>
                  <label className={globalStyles.checkbox}>
                    <input type="checkbox" />
                    <span
                      className={`${globalStyles.checkbox_mark} ${
                        filter.piercings.filter((item: number) => item === piercing.id).length > 0 ? globalStyles.active : ""
                      }`}
                      aria-hidden="true"
                      onClick={() => {
                        if (filter.piercings.filter((item: number) => item === piercing.id).length > 0) {
                          setFilter({
                            ...filter,
                            piercings: filter.piercings.filter((item: number) => item !== piercing.id),
                          });
                        } else {
                          setFilter({
                            ...filter,
                            piercings: [...filter.piercings, piercing.id],
                          });
                        }
                      }}
                    >
                      {filter.piercings.filter((item: number) => item === piercing.id).length > 0 ? (
                        <CheckIcon fill="#98042D" />
                      ) : null}
                    </span>
                    <div className={globalStyles.text}>
                      {i18n.resolvedLanguage === "ru" ? piercing.piercing : piercing.piercing_eng}
                    </div>
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <div className={styles.group_sub_name}>{t("model.tattoo")}</div>
          <div className={styles.filters_list}>
            {activeComponent === ComponentType.PreferencesSelector &&
              tatoos.map((tatoo: ITatoo) => (
                <div className={styles.filter_item}>
                  <label className={globalStyles.checkbox}>
                    <input type="checkbox" />
                    <span
                      className={`${globalStyles.checkbox_mark} ${
                        filter.tatoos.filter((item: number) => item === tatoo.id).length > 0 ? globalStyles.active : ""
                      }`}
                      aria-hidden="true"
                      onClick={() => {
                        if (filter.tatoos.filter((item: number) => item === tatoo.id).length > 0) {
                          setFilter({
                            ...filter,
                            tatoos: filter.tatoos.filter((item: number) => item !== tatoo.id),
                          });
                        } else {
                          setFilter({
                            ...filter,
                            tatoos: [...filter.tatoos, tatoo.id],
                          });
                        }
                      }}
                    >
                      {filter.tatoos.filter((item: number) => item === tatoo.id).length > 0 ? (
                        <CheckIcon fill="#98042D" />
                      ) : null}
                    </span>
                    <div className={globalStyles.text}>{i18n.resolvedLanguage === "ru" ? tatoo.tatoo : tatoo.tatoo_eng}</div>
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <div className={styles.group_sub_name}>{t("model.eyes_color")}</div>
          <div className={styles.filters_list}>
            {activeComponent === ComponentType.PreferencesSelector &&
              eyesColors.map((eyesColor: IEyesColor) => (
                <div className={styles.filter_item}>
                  <label className={globalStyles.checkbox}>
                    <input type="checkbox" />
                    <span
                      className={`${globalStyles.checkbox_mark} ${
                        filter.eyesColors.filter((item: number) => item === eyesColor.id).length > 0
                          ? globalStyles.active
                          : ""
                      }`}
                      aria-hidden="true"
                      onClick={() => {
                        if (filter.eyesColors.filter((item: number) => item === eyesColor.id).length > 0) {
                          setFilter({
                            ...filter,
                            eyesColors: filter.eyesColors.filter((item: number) => item !== eyesColor.id),
                          });
                        } else {
                          setFilter({
                            ...filter,
                            eyesColors: [...filter.eyesColors, eyesColor.id],
                          });
                        }
                      }}
                    >
                      {filter.eyesColors.filter((item: number) => item === eyesColor.id).length > 0 ? (
                        <CheckIcon fill="#98042D" />
                      ) : null}
                    </span>
                    <div className={globalStyles.text}>
                      {i18n.resolvedLanguage === "ru" ? eyesColor.eyes_color : eyesColor.eyes_color_eng}
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

export default PreferencesSelector;
