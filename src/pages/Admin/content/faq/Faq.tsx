import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "../../../../../quill.css";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";
import styles from "./Faq.module.sass";

import MessageModal from "../../../../components/Modals/MessageModal";
import ConfirmMessageModal from "../../../../components/Modals/ConfirmMessageModal";

import { IFaq } from "../../../../types/faq/faq";
import { initFaq } from "../../../../types/faq/initFaq";
import { ServerStatusType } from "../../../../enums/serverStatusType";
import { initServerStatus } from "../../../../types/main/serverStatus";

import { Close as CloseIcon } from "../../../../assets/Close";

const Faq = () => {
  const { addFaq, updateFaq, deleteFaq, getFaqs, setFaqStatuses } = useActions();
  const faqs = useTypedSelector((state) => state.faqReducer.faqs);
  const [selectedFaq, setSelectedFaq] = useState({} as IFaq);
  const [answer, setAnswer] = useState("");
  const [answerEng, setAnswerEng] = useState("");
  const faqStatuses = useTypedSelector((state) => state.faqReducer.serverStatuses);
  const [isMessageModalShow, setIsMessageModalShow] = useState(false);
  const [isConfirmModalShow, setIsConfirmModalShow] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [deletedFaq, setDeletedFaq] = useState(0);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const quillRefAnswer = useRef<ReactQuill>(null);
  const quillRefAnswerEng = useRef<ReactQuill>(null);

  useEffect(() => {
    setSelectedFaq({} as IFaq);
  }, [faqs]);

  useEffect(() => {
    var element = document.getElementById("content");
    element?.scrollTo({ top: 0 });
  }, [selectedFaq]);

  useEffect(() => {
    if (faqStatuses.addFaq.status === ServerStatusType.Success) {
      setInfoMessage("Вопрос добавлен");
      setSelectedFaq({} as IFaq);
      setIsMessageModalShow(true);
      setFaqStatuses({ ...faqStatuses, addFaq: initServerStatus() });
      getFaqs();
    }
    if (faqStatuses.addFaq.status === ServerStatusType.Error) {
      setInfoMessage("Ошибка при добавлении вопроса");
      setIsMessageModalShow(true);
      setFaqStatuses({ ...faqStatuses, addFaq: initServerStatus() });
    }
    if (faqStatuses.updateFaq.status === ServerStatusType.Success) {
      setInfoMessage("Вопрос обновлен");
      setSelectedFaq({} as IFaq);
      setIsMessageModalShow(true);
      setFaqStatuses({ ...faqStatuses, updateFaq: initServerStatus() });
      getFaqs();
    }
    if (faqStatuses.updateFaq.status === ServerStatusType.Error) {
      setInfoMessage("Ошибка при обновлении вопроса");
      setIsMessageModalShow(true);
      setFaqStatuses({ ...faqStatuses, updateFaq: initServerStatus() });
    }
    if (faqStatuses.deleteFaq.status === ServerStatusType.Success) {
      setFaqStatuses({ ...faqStatuses, deleteFaq: initServerStatus() });
      setIsConfirmModalShow(false);
      setAnswer("");
      setAnswerEng("");
      getFaqs();
    }
    if (faqStatuses.deleteFaq.status === ServerStatusType.Error) {
      setInfoMessage("Ошибка при удалении вопроса");
      setIsConfirmModalShow(false);
      setIsMessageModalShow(true);
      setFaqStatuses({ ...faqStatuses, deleteFaq: initServerStatus() });
    }
  }, [faqStatuses]);

  useEffect(() => {
    if (selectedFaq.id !== undefined) {
      setIsButtonEnabled(
        selectedFaq.question.trim().length > 0 &&
          selectedFaq.question_eng.trim().length > 0 &&
          answer.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").trim().length > 0 &&
          answerEng.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").trim().length > 0
      );
    }
  }, [selectedFaq, answer, answerEng]);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["clean"],
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      selectedFaq.question.trim().length > 0 &&
      selectedFaq.question_eng.trim().length > 0 &&
      answer.trim().length > 0 &&
      answerEng.trim().length > 0
    ) {
      if (selectedFaq.id > 0) {
        updateFaq({ faq: { ...selectedFaq, answer: answer, answer_eng: answerEng } });
      } else {
        addFaq({ faq: { ...selectedFaq, answer: answer, answer_eng: answerEng } });
      }
    }
  };

  const handleMessageOnClick = () => {
    setIsMessageModalShow(false);
    window.scroll({ top: 0 });
  };

  const handleDeleteOnClick = (faqId: number) => {
    setDeletedFaq(faqId);
    setIsConfirmModalShow(true);
  };

  return (
    <div className={styles.faq_container}>
      <div className={styles.faq_list}>
        <div className={styles.title}>Часто задаваемые вопросы</div>
        {faqs.map((faqItem: IFaq) => (
          <div className={styles.faq_item_container}>
            <div
              className={`${styles.faq_item} ${selectedFaq.id === faqItem.id ? styles.active : ""}`}
              onClick={() => {
                setSelectedFaq(faqItem);
                setAnswer(faqItem.answer);
                setAnswerEng(faqItem.answer_eng);
              }}
            >
              {faqItem.question}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            setSelectedFaq(initFaq());
            setAnswer("");
            setAnswerEng("");
          }}
        >
          Добавить вопрос
        </button>
      </div>
      {selectedFaq.id !== undefined ? (
        <div className={styles.content} id="content">
          <div className={styles.content_title}>
            {selectedFaq.id === -1 ? "Добавление вопроса" : "Редактирование вопроса"}
            {selectedFaq.id > 0 ? (
              <button type="button" onClick={() => handleDeleteOnClick(selectedFaq.id)}>
                Удалить вопрос
              </button>
            ) : null}
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.form_row}>
              <div className={styles.part_title}></div>
              <div className={styles.part}>Русский язык</div>
              <div className={styles.part}>Английский язык</div>
            </div>
            <div className={styles.form_row}>
              <div className={styles.part_title}>Вопрос</div>
              <div className={styles.part}>
                <input
                  placeholder=""
                  type="text"
                  required
                  onChange={(event) =>
                    setSelectedFaq({ ...selectedFaq, question: event.target.value, answer: answer, answer_eng: answerEng })
                  }
                  value={selectedFaq.question}
                  className={selectedFaq.question.trim() === "" ? globalStyles.wrong : ""}
                />
                <div
                  className={`${styles.close} ${selectedFaq.question.length > 0 ? styles.active : ""}`}
                  onClick={() => setSelectedFaq({ ...selectedFaq, question: "" })}
                  title="Очистить поле"
                >
                  <CloseIcon fill="#444444" />
                </div>
              </div>
              <div className={styles.part}>
                <input
                  placeholder=""
                  type="text"
                  required
                  onChange={(event) =>
                    setSelectedFaq({
                      ...selectedFaq,
                      question_eng: event.target.value,
                      answer: answer,
                      answer_eng: answerEng,
                    })
                  }
                  value={selectedFaq.question_eng}
                  className={selectedFaq.question_eng.trim() === "" ? globalStyles.wrong : ""}
                />
                <div
                  className={`${styles.close} ${selectedFaq.question_eng.length > 0 ? styles.active : ""}`}
                  onClick={() => setSelectedFaq({ ...selectedFaq, question_eng: "" })}
                  title="Очистить поле"
                >
                  <CloseIcon fill="#444444" />
                </div>
              </div>
            </div>
            <div className={styles.form_row}>
              <div className={styles.part_title}>Ответ</div>
              <div className={styles.part}>
                <ReactQuill
                  ref={quillRefAnswer}
                  className={`${styles.quill} ${
                    answer.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").length === 0
                      ? styles.wrong
                      : ""
                  }`}
                  theme="snow"
                  value={answer}
                  onChange={setAnswer}
                  modules={{ toolbar: toolbarOptions }}
                  onKeyUp={() => setAnswer(`${quillRefAnswer.current?.getEditorContents()}`)}
                />
                <div
                  className={`${styles.close} ${
                    answer !== undefined &&
                    answer.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").length > 0
                      ? styles.active
                      : ""
                  }`}
                  onClick={() => {
                    setAnswer("");
                    setSelectedFaq({ ...selectedFaq, answer: "" });
                  }}
                  title="Очистить поле"
                >
                  <CloseIcon fill="#444444" />
                </div>
              </div>
              <div className={styles.part}>
                <ReactQuill
                  ref={quillRefAnswerEng}
                  className={`${styles.quill} ${
                    answerEng.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").length === 0
                      ? styles.wrong
                      : ""
                  }`}
                  theme="snow"
                  value={answerEng}
                  onChange={setAnswerEng}
                  modules={{ toolbar: toolbarOptions }}
                  onKeyUp={() => setAnswerEng(`${quillRefAnswerEng.current?.getEditorContents()}`)}
                />
                <div
                  className={`${styles.close} ${
                    answerEng !== undefined &&
                    answerEng.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").length > 0
                      ? styles.active
                      : ""
                  }`}
                  onClick={() => {
                    setAnswerEng("");
                    setSelectedFaq({ ...selectedFaq, answer_eng: "" });
                    console.log(answerEng);
                  }}
                  title="Очистить поле"
                >
                  <CloseIcon fill="#444444" />
                </div>
              </div>
            </div>
            <button type="submit" disabled={!isButtonEnabled}>
              Сохранить
            </button>
          </form>
        </div>
      ) : null}
      <MessageModal
        text={infoMessage}
        buttonText="Ok"
        handlerButtonClick={handleMessageOnClick}
        isShow={isMessageModalShow}
      />
      <ConfirmMessageModal
        text="Вы действительно хотите удалить вопрос?"
        okButtonText="Удалить"
        handlerOkOnClick={() => deleteFaq({ id: deletedFaq })}
        cancelButtonText="Отмена"
        isShow={isConfirmModalShow}
        setIsShow={setIsConfirmModalShow}
      />
    </div>
  );
};

export default Faq;
