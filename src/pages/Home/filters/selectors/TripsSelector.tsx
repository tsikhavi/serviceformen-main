import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";
import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";
import { ITrip } from "../../../../types/core/trip";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";
import { Check as CheckIcon } from "../../../../assets/Check";

interface ITripsSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const TripsSelector: React.FC<ITripsSelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const { t, i18n } = useTranslation();
  const { setFilter } = useActions();
  const filter = useTypedSelector((state) => state.modelReducer.filter);
  const trips = useTypedSelector((state) => state.coreReducer.trips);

  return (
    <div className={`${styles.filters_group} ${activeComponent === ComponentType.TripsSelector ? styles.active : ""}`}>
      <div
        className={styles.group_name}
        onClick={() =>
          setActiveComponent(
            activeComponent === ComponentType.TripsSelector ? ComponentType.None : ComponentType.TripsSelector
          )
        }
      >
        {t("model.trips")}
        {activeComponent === ComponentType.TripsSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        {filter.trips.length > 0 ? <div className={styles.group_count}>{filter.trips.length}</div> : null}
      </div>
      <div className={styles.filters_list}>
        {activeComponent === ComponentType.TripsSelector &&
          trips.map((trip: ITrip) => (
            <div className={styles.filter_item}>
              <label className={globalStyles.checkbox}>
                <input type="checkbox" />
                <span
                  className={`${globalStyles.checkbox_mark} ${
                    filter.trips.filter((item: number) => item === trip.id).length > 0 ? globalStyles.active : ""
                  }`}
                  aria-hidden="true"
                  onClick={() => {
                    if (filter.trips.filter((item: number) => item === trip.id).length > 0) {
                      setFilter({
                        ...filter,
                        trips: filter.trips.filter((item: number) => item !== trip.id),
                      });
                    } else {
                      setFilter({
                        ...filter,
                        trips: [...filter.trips, trip.id],
                      });
                    }
                  }}
                >
                  {filter.trips.filter((item: number) => item === trip.id).length > 0 ? <CheckIcon fill="#98042D" /> : null}
                </span>
                <div className={globalStyles.text}>{i18n.resolvedLanguage === "ru" ? trip.trip : trip.trip_eng}</div>
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TripsSelector;
