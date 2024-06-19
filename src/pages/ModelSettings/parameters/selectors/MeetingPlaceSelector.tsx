import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";

import { ComponentType } from "../ComponentType";
import { IMeetingPlace } from "../../../../types/core/meetingPlace";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";

interface IMeetingPlaceSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
}

const MeetingPlaceSelector: React.FC<IMeetingPlaceSelectorProps> = ({
  activeComponent,
  setActiveComponent,
  isCheckStart,
}) => {
  const { t, i18n } = useTranslation();
  const { setModel } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);
  const meetingPlaces = useTypedSelector((state) => state.coreReducer.meetingPlaces);

  const handlerMeetingPlaceOnClick = (meetingPlace: IMeetingPlace) => {
    setModel({ ...model, meeting_place_id: meetingPlace.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${globalStyles.dropdown} ${
        activeComponent === ComponentType.MeetingPlaceSelector ? globalStyles.active : ""
      } ${isCheckStart && model.meeting_place_id === -1 ? "wrong" : ""}`}
    >
      <div className={globalStyles.main}>
        <div className={globalStyles.label}>
          {t("model.incall")}-{t("model.outcall")}
        </div>
        <div
          className={`${globalStyles.dropdown_button} ${
            isCheckStart && model.meeting_place_id === -1 ? globalStyles.wrong : ""
          }`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.MeetingPlaceSelector
                ? ComponentType.None
                : ComponentType.MeetingPlaceSelector
            )
          }
        >
          {model.meeting_place_id === -1
            ? ""
            : i18n.resolvedLanguage === "ru"
            ? meetingPlaces.find((meetingPlace: IMeetingPlace) => meetingPlace.id === model.meeting_place_id)?.meeting_place
            : meetingPlaces.find((meetingPlace: IMeetingPlace) => meetingPlace.id === model.meeting_place_id)
                ?.meeting_place_eng}
          {activeComponent === ComponentType.MeetingPlaceSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={globalStyles.required}>*</div>
      </div>
      <div
        className={`${globalStyles.dropdown_container} ${
          activeComponent === ComponentType.MeetingPlaceSelector ? globalStyles.active : ""
        }`}
      >
        <div className={globalStyles.dropdown_list}>
          {meetingPlaces.map((meetingPlace: IMeetingPlace) => (
            <div className={globalStyles.dropdown_item} onClick={() => handlerMeetingPlaceOnClick(meetingPlace)}>
              {i18n.resolvedLanguage === "ru" ? meetingPlace.meeting_place : meetingPlace.meeting_place_eng}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetingPlaceSelector;
