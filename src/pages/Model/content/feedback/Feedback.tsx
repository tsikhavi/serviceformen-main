import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";

import FeedbackItem from "../../../../components/FeedbackItem/FeedbackItem";

import globalStyles from "../../../../App.module.sass";
import styles from "./Feedback.module.sass";

import MessageModal from "../../../../components/Modals/MessageModal";

import { IModel } from "../../../../types/model/model/model";
import { IModelFeedback } from "../../../../types/model/modelFeedback/modelFeedback";
import { ModelFeedbackStatus } from "../../../../enums/modelFeedbackStatus";
import { initModelFeedback } from "../../../../types/model/modelFeedback/initModelFeedback";
import { ComponentType } from "./ComponentType";
import { ServerStatusType } from "../../../../enums/serverStatusType";
import { initServerStatus } from "../../../../types/main/serverStatus";
import { ProfileType } from "../../../../enums/profileType";

import { Rate as RateIcon } from "../../../../assets/Rate";
import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";

interface IFeedbackProps {
  model: IModel;
}

const Feedback: React.FC<IFeedbackProps> = ({ model }) => {
  const { t } = useTranslation();
  const { addModelFeedback, setModelFeedbackStatuses } = useActions();
  const feedbackStatuses = useTypedSelector((state) => state.modelFeedbackReducer.serverStatuses);
  const isAuth = useTypedSelector((state) => state.profileReducer.isAuth);
  const profile = useTypedSelector((state) => state.profileReducer.profile);
  const [feedback, setFeedback] = useState(initModelFeedback());
  const [activeComponent, setActiveComponent] = useState(ComponentType.None);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isMessageModalShow, setIsMessageModalShow] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [isFormActive, setIsFormActive] = useState(false);

  useEffect(() => {
    setIsButtonEnabled(feedback.name.trim().length !== 0 && feedback.text.trim().length !== 0 && feedback.rate > 0);
  }, [feedback]);

  useEffect(() => {
    if (feedbackStatuses.addModelFeedback.status === ServerStatusType.Success) {
      setFeedback(initModelFeedback());
      setInfoMessage(t("model.thanks_for_feedback"));
      setIsMessageModalShow(true);
      setModelFeedbackStatuses({ ...feedbackStatuses, addModelFeedback: initServerStatus() });
      setIsFormActive(false);
    }
    if (feedbackStatuses.addModelFeedback.status === ServerStatusType.Error) {
      setInfoMessage(feedbackStatuses.addModelFeedback.error);
      setIsMessageModalShow(true);
      setModelFeedbackStatuses({ ...feedbackStatuses, addModelFeedback: initServerStatus() });
    }
  }, [feedbackStatuses]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (feedback.name.trim().length !== 0 && feedback.text.trim().length !== 0 && feedback.rate > 0) {
      addModelFeedback({ model_feedback: { ...feedback, model_id: model.id } });
    }
  };

  const getFeedbackAnswer = (feedback: IModelFeedback) => {
    if (
      model.model_feedbacks.filter(
        (modelFeedback: IModelFeedback) =>
          modelFeedback.parent_id === feedback.id && modelFeedback.status === ModelFeedbackStatus.Applyed
      ).length > 0
    ) {
      return model.model_feedbacks.find(
        (modelFeedback: IModelFeedback) =>
          modelFeedback.parent_id === feedback.id && modelFeedback.status === ModelFeedbackStatus.Applyed
      )!;
    } else {
      return null;
    }
  };

  const rateOnClick = (rate: number) => {
    setActiveComponent(ComponentType.None);
    setFeedback({ ...feedback, rate: rate });
  };

  const handlerPhotoRealOnClick = (value: number) => {
    setFeedback({ ...feedback, is_photo_real: value });
    setActiveComponent(ComponentType.None);
  };

  const handlerOnlyOneOnClick = (value: number) => {
    setFeedback({ ...feedback, is_only_one: value });
    setActiveComponent(ComponentType.None);
  };

  const handlerAddFeedbackOnClick = () => {
    if (!isAuth || profile.type !== ProfileType.Guest) {
      setInfoMessage(t("model.feedback_guest"));
      setIsMessageModalShow(true);
    } else {
      setIsFormActive(true);
    }
  };

  return (
    <div className={styles.feedbacks}>
      {`${t("model.feedbacks")} (${
        model.model_feedbacks.filter(
          (modelFeedback: IModelFeedback) =>
            modelFeedback.status === ModelFeedbackStatus.Applyed && !modelFeedback.is_from_model
        ).length
      })`}
      <div className={styles.feedbacks_wrapper}>
        <div
          className={`${styles.feedbacks_info} ${
            model.model_feedbacks.filter(
              (modelFeedback: IModelFeedback) => modelFeedback.status === ModelFeedbackStatus.Applyed
            ).length > 0
              ? styles.bordered
              : ""
          }`}
        >
          {model.model_feedbacks.filter(
            (modelFeedback: IModelFeedback) => modelFeedback.status === ModelFeedbackStatus.Applyed
          ).length === 0 ? (
            t("model.there_are_not_feedbacks")
          ) : (
            <div className={styles.feedbacks_rate}>
              <RateIcon fill="#ffb237" />
              {`${t("model.average_rating")}: ${(
                model.model_feedbacks
                  .filter(
                    (modelFeedback: IModelFeedback) =>
                      modelFeedback.status === ModelFeedbackStatus.Applyed && !modelFeedback.is_from_model
                  )
                  .reduce((accumulator, current) => accumulator + current.rate, 0) /
                model.model_feedbacks.filter(
                  (modelFeedback: IModelFeedback) =>
                    modelFeedback.status === ModelFeedbackStatus.Applyed && !modelFeedback.is_from_model
                ).length
              ).toFixed(2)}`}
            </div>
          )}
          {!isFormActive ? <button onClick={handlerAddFeedbackOnClick}>{t("model.add_a_feedback")}</button> : null}
          <form onSubmit={handleSubmit} className={isFormActive ? styles.active : ""}>
            <div className={styles.input_field}>
              <div className={styles.label}>{t("global.name")}</div>
              <input
                placeholder=""
                type="name"
                required
                onChange={(event) => setFeedback({ ...feedback, name: event.target.value.trim() })}
                value={feedback.name}
                onClick={() => setActiveComponent(ComponentType.None)}
              />
              <div className={globalStyles.required}>*</div>
            </div>
            <div className={styles.rate_field}>
              <div className={styles.label}>{t("model.rate")}</div>
              <div className={styles.rate}>
                {Array(5)
                  .fill(0)
                  .map((_value, index) => (
                    <div className={styles.rate_item} onClick={() => rateOnClick(index + 1)}>
                      <RateIcon fill={feedback.rate > index ? "#98042D" : "#E1E2E7"} />
                    </div>
                  ))}
              </div>
            </div>
            <div
              className={`${globalStyles.dropdown} ${
                activeComponent === ComponentType.PhotoRealSelector ? globalStyles.active : ""
              }`}
            >
              <div className={globalStyles.main}>
                <div className={globalStyles.label}>{t("model.a_photo_of_her")}?</div>
                <div
                  className={`${globalStyles.dropdown_button} ${styles.dropdown_button}`}
                  onClick={() =>
                    setActiveComponent(
                      activeComponent === ComponentType.PhotoRealSelector
                        ? ComponentType.None
                        : ComponentType.PhotoRealSelector
                    )
                  }
                >
                  {feedback.is_photo_real === -1
                    ? ""
                    : feedback.is_photo_real === 0
                    ? t("model.the_photo_is_not_hers")
                    : t("model.a_photo_of_her")}
                  {activeComponent === ComponentType.PhotoRealSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
                </div>
              </div>
              <div
                className={`${globalStyles.dropdown_container} ${
                  activeComponent === ComponentType.PhotoRealSelector ? globalStyles.active : ""
                } ${styles.dropdown_container}`}
              >
                <div className={globalStyles.dropdown_list}>
                  <div className={globalStyles.dropdown_item} onClick={() => handlerPhotoRealOnClick(-1)}>
                    {t("global.not_selected_s")}
                  </div>
                  <div className={globalStyles.dropdown_item} onClick={() => handlerPhotoRealOnClick(0)}>
                    {t("model.the_photo_is_not_hers")}
                  </div>
                  <div className={globalStyles.dropdown_item} onClick={() => handlerPhotoRealOnClick(1)}>
                    {t("model.a_photo_of_her")}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`${globalStyles.dropdown} ${
                activeComponent === ComponentType.OnlyOneSelector ? globalStyles.active : ""
              }`}
            >
              <div className={globalStyles.main}>
                <div className={globalStyles.label}>{t("model.accepts_one")}?</div>
                <div
                  className={`${globalStyles.dropdown_button} ${styles.dropdown_button}`}
                  onClick={() =>
                    setActiveComponent(
                      activeComponent === ComponentType.OnlyOneSelector ? ComponentType.None : ComponentType.OnlyOneSelector
                    )
                  }
                >
                  {feedback.is_only_one === -1
                    ? ""
                    : feedback.is_only_one === 0
                    ? t("model.accepts_more_than_one")
                    : t("model.accepts_one")}
                  {activeComponent === ComponentType.OnlyOneSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
                </div>
              </div>
              <div
                className={`${globalStyles.dropdown_container} ${
                  activeComponent === ComponentType.OnlyOneSelector ? globalStyles.active : ""
                } ${styles.dropdown_container}`}
              >
                <div className={globalStyles.dropdown_list}>
                  <div className={globalStyles.dropdown_item} onClick={() => handlerOnlyOneOnClick(-1)}>
                    {t("global.not_selected_s")}
                  </div>
                  <div className={globalStyles.dropdown_item} onClick={() => handlerOnlyOneOnClick(0)}>
                    {t("model.accepts_more_than_one")}
                  </div>
                  <div className={globalStyles.dropdown_item} onClick={() => handlerOnlyOneOnClick(1)}>
                    {t("model.accepts_one")}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.textarea_field}>
              <div className={styles.label}>{t("model.feedback")}</div>
              <textarea
                placeholder={t("model.feedback_warning")}
                onChange={(event) => setFeedback({ ...feedback, text: event.target.value })}
                value={feedback.text}
                onClick={() => setActiveComponent(ComponentType.None)}
              />
              <div className={globalStyles.required}>*</div>
            </div>
            <div className={styles.buttons}>
              <button className={styles.cancel} type="button" onClick={() => setIsFormActive(false)}>
                {t("global.cancel")}
              </button>
              <button type="submit" disabled={!isButtonEnabled}>
                {t("global.send")}
              </button>
            </div>
          </form>
        </div>
        {model.model_feedbacks.filter(
          (modelFeedback: IModelFeedback) => modelFeedback.status === ModelFeedbackStatus.Applyed
        ).length > 0 ? (
          <div className={styles.feedbacks_list}>
            {model.model_feedbacks
              .filter(
                (modelFeedback: IModelFeedback) =>
                  modelFeedback.status === ModelFeedbackStatus.Applyed && modelFeedback.parent_id === -1
              )
              .map((modelFeedback: IModelFeedback, index: number) => (
                <>
                  <FeedbackItem modelFeedback={modelFeedback} isBordered={index !== 0} isModelSettings={false} />
                  {getFeedbackAnswer(modelFeedback) !== null ? (
                    <FeedbackItem
                      modelFeedback={getFeedbackAnswer(modelFeedback)!}
                      isBordered={index !== 0}
                      isModelSettings={false}
                    />
                  ) : null}
                </>
              ))}
          </div>
        ) : null}
      </div>
      <MessageModal
        text={infoMessage}
        buttonText={t("global.ok")}
        handlerButtonClick={() => setIsMessageModalShow(false)}
        isShow={isMessageModalShow}
      />
    </div>
  );
};

export default Feedback;
