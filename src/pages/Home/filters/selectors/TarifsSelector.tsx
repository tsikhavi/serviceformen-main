import Slider from "react-slider";
import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";
import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";
import { IWorkDuration } from "../../../../types/core/workDuration";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";
import { Check as CheckIcon } from "../../../../assets/Check";

interface ITarifsSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const TarifsSelector: React.FC<ITarifsSelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const { t, i18n } = useTranslation();
  const { setFilter } = useActions();
  const filter = useTypedSelector((state) => state.modelReducer.filter);
  const workDutations = useTypedSelector((state) => state.coreReducer.workDurations);

  return (
    <div className={`${styles.filters_group} ${activeComponent === ComponentType.TarifsSelector ? styles.active : ""}`}>
      <div
        className={styles.group_name}
        onClick={() =>
          setActiveComponent(
            activeComponent === ComponentType.TarifsSelector ? ComponentType.None : ComponentType.TarifsSelector
          )
        }
      >
        {t("model.tariffs")}
        {activeComponent === ComponentType.TarifsSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        {filter.tarifs.length > 0 ? <div className={styles.group_count}>{filter.tarifs.length}</div> : null}
      </div>
      <div className={styles.filters_list}>
        {activeComponent === ComponentType.TarifsSelector &&
          workDutations.slice(0, 2).map((workDuration: IWorkDuration) => (
            <div style={{ width: "100%" }}>
              <div className={styles.group_sub_name}>
                <label className={globalStyles.checkbox}>
                  <input type="checkbox" />
                  <span
                    className={`${globalStyles.checkbox_mark} ${
                      filter.tarifs.filter((tarif: number[]) => tarif !== undefined && tarif[0] === workDuration.id).length >
                      0
                        ? globalStyles.active
                        : ""
                    }`}
                    aria-hidden="true"
                    onClick={() => {
                      if (
                        filter.tarifs.filter((tarif: number[]) => tarif !== undefined && tarif[0] === workDuration.id)
                          .length > 0
                      ) {
                        setFilter({
                          ...filter,
                          tarifs: filter.tarifs.filter((tarif: number[]) => tarif[0] !== workDuration.id),
                        });
                      } else {
                        setFilter({
                          ...filter,
                          tarifs: [...filter.tarifs, [workDuration.id, 0, 50000]],
                        });
                      }
                    }}
                  >
                    {filter.tarifs.filter((tarif: number[]) => tarif !== undefined && tarif[0] === workDuration.id).length >
                    0 ? (
                      <CheckIcon fill="#98042D" />
                    ) : null}
                  </span>
                  <div className={globalStyles.text}>
                    {i18n.resolvedLanguage === "ru" ? workDuration.work_duration : workDuration.work_duration_eng}
                  </div>
                </label>
              </div>
              {filter.tarifs.filter((tarif: number[]) => tarif !== undefined && tarif[0] === workDuration.id).length > 0 && (
                <div className={styles.filters_list}>
                  <div className={globalStyles.range_slider}>
                    <Slider
                      className={globalStyles.slider}
                      value={[
                        filter.tarifs.find((tarif: number[]) => tarif[0] === workDuration.id)![1],
                        filter.tarifs.find((tarif: number[]) => tarif[0] === workDuration.id)![2],
                      ]}
                      min={0}
                      max={50000}
                      onChange={(selectedRange) => {
                        const tmpTarifs = filter.tarifs.map((tarif: number[]) => {
                          if (tarif[0] === workDuration.id) {
                            return [workDuration.id, selectedRange[0], selectedRange[1]];
                          } else {
                            return tarif;
                          }
                        }) as number[][];
                        setFilter({ ...filter, tarifs: tmpTarifs });
                      }}
                    />
                  </div>
                  <div className={styles.slider_value}>
                    {`${t("global.from")} ${filter.tarifs.find((tarif: number[]) => tarif[0] === workDuration.id)![1]} ${t(
                      "global.to"
                    )} ${filter.tarifs.find((tarif: number[]) => tarif[0] === workDuration.id)![2]}`}
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TarifsSelector;
