/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

import Feedback from "../../../components/FeedbackItem/FeedbackItem";

import pageStyles from "../ModelSettings.module.sass";
import styles from "./Feedbacks.module.sass";

import { IModelFeedback } from "../../../types/model/modelFeedback/modelFeedback";
import { ModelFeedbackStatus } from "../../../enums/modelFeedbackStatus";
import { ServerStatusType } from "../../../enums/serverStatusType";
import { initServerStatus } from "../../../types/main/serverStatus";
import { initModelFeedback } from "../../../types/model/modelFeedback/initModelFeedback";

const Feedbacks = () => {
  const { t, i18n } = useTranslation();
  const { updateModelFeedbacksView, setModelFeedbackStatuses, getModels, addModelFeedback } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);
  const feedbackStatuses = useTypedSelector((state) => state.modelFeedbackReducer.serverStatuses);
  const [addFeedbackActive, setAddFeedbackActive] = useState(-1);
  const [feedback, setFeedback] = useState(initModelFeedback());

  useEffect(() => {
    document.title = `${t("model.model")} | ${t("model.feedbacks")}`;
  }, []);

  useEffect(() => {
    if (model.id > 0) {
      updateModelFeedbacksView({ model_id: model.id });
    }
  }, [model]);

  useEffect(() => {
    document.title = `${t("model.model")} | ${t("model.feedbacks")}`;
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    if (feedbackStatuses.deleteModelFeedback.status === ServerStatusType.Success) {
      setModelFeedbackStatuses({ ...feedbackStatuses, deleteModelFeedback: initServerStatus() });
      getModels({ profile_id: model.agency_id });
    }
    if (feedbackStatuses.addModelFeedback.status === ServerStatusType.Success) {
      setModelFeedbackStatuses({ ...feedbackStatuses, addModelFeedback: initServerStatus() });
      getModels({ profile_id: model.agency_id });
      setAddFeedbackActive(-1);
    }
  }, [feedbackStatuses]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (feedback.text.trim().length !== 0) {
      addModelFeedback({ model_feedback: { ...feedback, model_id: model.id, is_from_model: true, name: model.name } });
    }
  };

  const getFeedbackAnswer = (feedback: IModelFeedback) => {
    if (
      model.model_feedbacks.filter((modelFeedback: IModelFeedback) => modelFeedback.parent_id === feedback.id).length > 0
    ) {
      return model.model_feedbacks.find((modelFeedback: IModelFeedback) => modelFeedback.parent_id === feedback.id)!;
    } else {
      return null;
    }
  };

  return (
    <div className={pageStyles.content}>
      <div className={pageStyles.title}>{t("model.feedbacks")}</div>
      {model.model_feedbacks.filter((modelFeedback: IModelFeedback) => modelFeedback.status === ModelFeedbackStatus.Applyed)
        .length > 0 ? (
        <div className={styles.feedbacks_list}>
          {model.model_feedbacks
            .filter(
              (modelFeedback: IModelFeedback) =>
                modelFeedback.status === ModelFeedbackStatus.Applyed && modelFeedback.parent_id === -1
            )
            .map((modelFeedback: IModelFeedback, index: number) => (
              <>
                <Feedback modelFeedback={modelFeedback} isBordered={index !== 0} isModelSettings={true} />
                {getFeedbackAnswer(modelFeedback) !== null ? (
                  <Feedback
                    modelFeedback={getFeedbackAnswer(modelFeedback)!}
                    isBordered={index !== 0}
                    isModelSettings={true}
                  />
                ) : (
                  <>
                    {addFeedbackActive !== modelFeedback.id ? (
                      <button
                        type="button"
                        className={styles.add_feedback}
                        onClick={() => setAddFeedbackActive(modelFeedback.id)}
                      >
                        {t("model.add_a_feedback")}
                      </button>
                    ) : (
                      <form onSubmit={handleSubmit} className={styles.feedback_form}>
                        <textarea
                          placeholder={t("model.feedback_warning")}
                          onChange={(event) =>
                            setFeedback({ ...feedback, text: event.target.value, parent_id: modelFeedback.id })
                          }
                          value={feedback.text}
                        />
                        <div className={styles.buttons}>
                          <button className={styles.cancel} type="button" onClick={() => setAddFeedbackActive(-1)}>
                            {t("global.cancel")}
                          </button>
                          <button type="submit" disabled={feedback.text.trim().length === 0}>
                            {t("global.send")}
                          </button>
                        </div>
                      </form>
                    )}
                  </>
                )}
              </>
            ))}
        </div>
      ) : null}
    </div>
  );
};

export default Feedbacks;
