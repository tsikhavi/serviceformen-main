import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";

import { ComponentType } from "../ComponentType";
import { IMeeting } from "../../../../types/core/meeting";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";

interface IMeetingSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const MeetingSelector: React.FC<IMeetingSelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const { t, i18n } = useTranslation();
  const { setModel } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);
  const meetings = useTypedSelector((state) => state.coreReducer.meetings);

  const handlerMeetingOnClick = (meeting: IMeeting) => {
    setModel({ ...model, meeting_id: meeting.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${globalStyles.dropdown} ${activeComponent === ComponentType.MeetingSelector ? globalStyles.active : ""}`}
    >
      <div className={globalStyles.main}>
        <div className={globalStyles.label}>{t("model.meeting_with")}</div>
        <div
          className={globalStyles.dropdown_button}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.MeetingSelector ? ComponentType.None : ComponentType.MeetingSelector
            )
          }
        >
          {model.meeting_id === -1
            ? ""
            : i18n.resolvedLanguage === "ru"
            ? meetings.find((meeting: IMeeting) => meeting.id === model.meeting_id)?.meeting
            : meetings.find((meeting: IMeeting) => meeting.id === model.meeting_id)?.meeting_eng}
          {activeComponent === ComponentType.MeetingSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
      </div>
      <div
        className={`${globalStyles.dropdown_container} ${
          activeComponent === ComponentType.MeetingSelector ? globalStyles.active : ""
        }`}
      >
        <div className={globalStyles.dropdown_list}>
          {meetings.map((meeting: IMeeting) => (
            <div className={globalStyles.dropdown_item} onClick={() => handlerMeetingOnClick(meeting)}>
              {i18n.resolvedLanguage === "ru" ? meeting.meeting : meeting.meeting_eng}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetingSelector;
