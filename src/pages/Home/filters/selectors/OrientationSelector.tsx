import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";
import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";
import { IOrientation } from "../../../../types/core/orientation";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";
import { Check as CheckIcon } from "../../../../assets/Check";

interface IOrientationsSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const OrientationsSelector: React.FC<IOrientationsSelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const { t, i18n } = useTranslation();
  const { setFilter } = useActions();
  const filter = useTypedSelector((state) => state.modelReducer.filter);
  const orientations = useTypedSelector((state) => state.coreReducer.orientations);

  return (
    <div
      className={`${styles.filters_group} ${activeComponent === ComponentType.OrientationsSelector ? styles.active : ""}`}
    >
      <div
        className={styles.group_name}
        onClick={() =>
          setActiveComponent(
            activeComponent === ComponentType.OrientationsSelector ? ComponentType.None : ComponentType.OrientationsSelector
          )
        }
      >
        {t("model.orientation")}
        {activeComponent === ComponentType.OrientationsSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        {filter.orientations.length > 0 ? <div className={styles.group_count}>{filter.orientations.length}</div> : null}
      </div>
      <div className={styles.filters_list}>
        {activeComponent === ComponentType.OrientationsSelector &&
          orientations.map((orientation: IOrientation) => (
            <div className={styles.filter_item}>
              <label className={globalStyles.checkbox}>
                <input type="checkbox" />
                <span
                  className={`${globalStyles.checkbox_mark} ${
                    filter.orientations.filter((item: number) => item === orientation.id).length > 0
                      ? globalStyles.active
                      : ""
                  }`}
                  aria-hidden="true"
                  onClick={() => {
                    if (filter.orientations.filter((item: number) => item === orientation.id).length > 0) {
                      setFilter({
                        ...filter,
                        orientations: filter.orientations.filter((item: number) => item !== orientation.id),
                      });
                    } else {
                      setFilter({
                        ...filter,
                        orientations: [...filter.orientations, orientation.id],
                      });
                    }
                  }}
                >
                  {filter.orientations.filter((item: number) => item === orientation.id).length > 0 ? (
                    <CheckIcon fill="#98042D" />
                  ) : null}
                </span>
                <div className={globalStyles.text}>
                  {i18n.resolvedLanguage === "ru" ? orientation.orientation : orientation.orientation_eng}
                </div>
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrientationsSelector;
