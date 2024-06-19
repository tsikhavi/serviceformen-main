import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";

import { ComponentType } from "../ComponentType";
import { ITrip } from "../../../../types/core/trip";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";

interface ITripSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
}

const TripSelector: React.FC<ITripSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart }) => {
  const { t, i18n } = useTranslation();
  const { setModel } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);
  const trips = useTypedSelector((state) => state.coreReducer.trips);

  const handlerTripOnClick = (trip: ITrip) => {
    setModel({ ...model, trip_id: trip.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${globalStyles.dropdown} ${activeComponent === ComponentType.TripSelector ? globalStyles.active : ""} ${
        isCheckStart && model.trip_id === -1 ? "wrong" : ""
      }`}
    >
      <div className={globalStyles.main}>
        <div className={globalStyles.label}>{t("model.trips")}</div>
        <div
          className={`${globalStyles.dropdown_button} ${isCheckStart && model.trip_id === -1 ? globalStyles.wrong : ""}`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.TripSelector ? ComponentType.None : ComponentType.TripSelector
            )
          }
        >
          {model.trip_id === -1
            ? ""
            : i18n.resolvedLanguage === "ru"
            ? trips.find((trip: ITrip) => trip.id === model.trip_id)?.trip
            : trips.find((trip: ITrip) => trip.id === model.trip_id)?.trip_eng}
          {activeComponent === ComponentType.TripSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={globalStyles.required}>*</div>
      </div>
      <div
        className={`${globalStyles.dropdown_container} ${
          activeComponent === ComponentType.TripSelector ? globalStyles.active : ""
        }`}
      >
        <div className={globalStyles.dropdown_list}>
          {trips.map((trip: ITrip) => (
            <div className={globalStyles.dropdown_item} onClick={() => handlerTripOnClick(trip)}>
              {i18n.resolvedLanguage === "ru" ? trip.trip : trip.trip_eng}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripSelector;
