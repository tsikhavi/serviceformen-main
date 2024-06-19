import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "../../../../../quill.css";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import styles from "./Pages.module.sass";

import MessageModal from "../../../../components/Modals/MessageModal";

import { IPage } from "../../../../types/page/page";
import { ServerStatusType } from "../../../../enums/serverStatusType";
import { initServerStatus } from "../../../../types/main/serverStatus";

import { Close as CloseIcon } from "../../../../assets/Close";

const Pages = () => {
  const { updatePage, getPages, setPageStatuses } = useActions();
  const pages = useTypedSelector((state) => state.pageReducer.pages);
  const [selectedPage, setSelectedPage] = useState({} as IPage);
  const [content, setContent] = useState("");
  const [contentEng, setContentEng] = useState("");
  const pageStatus = useTypedSelector((state) => state.pageReducer.updatePageStatus);
  const [isMessageModalShow, setIsMessageModalShow] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const quillRefContent = useRef<ReactQuill>(null);
  const quillRefContentEng = useRef<ReactQuill>(null);

  useEffect(() => {
    setSelectedPage({} as IPage);
  }, [pages]);

  useEffect(() => {
    var element = document.getElementById("content");
    element?.scrollTo({ top: 0 });
  }, [selectedPage]);

  useEffect(() => {
    if (pageStatus.status === ServerStatusType.Success) {
      setInfoMessage("Страница обновлена");
      setSelectedPage({} as IPage);
      setIsMessageModalShow(true);
      setPageStatuses(initServerStatus());
      getPages();
    }
    if (pageStatus.status === ServerStatusType.Error) {
      setInfoMessage("Ошибка при обновлении страницы");
      setIsMessageModalShow(true);
      setPageStatuses(initServerStatus());
    }
  }, [pageStatus]);

  useEffect(() => {
    if (selectedPage.id !== undefined) {
      setIsButtonEnabled(
        content.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").trim().length > 0 &&
          contentEng.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").trim().length > 0
      );
    }
  }, [selectedPage, content, contentEng]);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["clean"],
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (content.trim().length > 0 && contentEng.trim().length > 0) {
      updatePage({ page: { ...selectedPage, content: content, content_eng: contentEng } });
    }
  };

  const handleMessageOnClick = () => {
    setIsMessageModalShow(false);
    window.scroll({ top: 0 });
  };

  return (
    <div className={styles.page_container}>
      <div className={styles.page_list}>
        <div className={styles.title}>Второстепенные страницы</div>
        {Array.isArray(pages) && pages.length > 0
          ? pages.map((pageItem: IPage) => (
              <div className={styles.page_item_container}>
                <div
                  className={`${styles.page_item} ${selectedPage.id === pageItem.id ? styles.active : ""}`}
                  onClick={() => {
                    setSelectedPage(pageItem);
                    setContent(pageItem.content);
                    setContentEng(pageItem.content_eng);
                  }}
                >
                  {pageItem.title}
                </div>
              </div>
            ))
          : null}
      </div>
      {selectedPage.id !== undefined ? (
        <div className={styles.content} id="content">
          <div className={styles.content_title}>{selectedPage.title}</div>
          <form onSubmit={handleSubmit}>
            <div className={styles.form_row}>
              <div className={styles.part_title}></div>
              <div className={styles.part}>Русский язык</div>
              <div className={styles.part}>Английский язык</div>
            </div>
            <div className={styles.form_row}>
              <div className={styles.part_title}>Содержание страницы</div>
              <div className={styles.part}>
                <ReactQuill
                  ref={quillRefContent}
                  className={`${styles.quill} ${
                    content.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").length === 0
                      ? styles.wrong
                      : ""
                  }`}
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={{ toolbar: toolbarOptions }}
                  onKeyUp={() => setContent(`${quillRefContent.current?.getEditorContents()}`)}
                />
                <div
                  className={`${styles.close} ${
                    content !== undefined &&
                    content.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").length > 0
                      ? styles.active
                      : ""
                  }`}
                  onClick={() => {
                    setContent("");
                    setSelectedPage({ ...selectedPage, content: "" });
                  }}
                  title="Очистить поле"
                >
                  <CloseIcon fill="#444444" />
                </div>
              </div>
              <div className={styles.part}>
                <ReactQuill
                  ref={quillRefContentEng}
                  className={`${styles.quill} ${
                    contentEng.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").length === 0
                      ? styles.wrong
                      : ""
                  }`}
                  theme="snow"
                  value={contentEng}
                  onChange={setContentEng}
                  modules={{ toolbar: toolbarOptions }}
                  onKeyUp={() => setContentEng(`${quillRefContentEng.current?.getEditorContents()}`)}
                />
                <div
                  className={`${styles.close} ${
                    contentEng !== undefined &&
                    contentEng.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<br>", "").length > 0
                      ? styles.active
                      : ""
                  }`}
                  onClick={() => {
                    setContentEng("");
                    setSelectedPage({ ...selectedPage, content_eng: "" });
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
    </div>
  );
};

export default Pages;
