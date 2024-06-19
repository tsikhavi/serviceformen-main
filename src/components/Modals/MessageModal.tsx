import parse from "html-react-parser";

import styles from "./Modal.module.sass";

import { Close as CloseIcon } from "../../assets/Close";

interface IMessageModalProps {
  isShow: boolean;
  text: string;
  buttonText: string;
  handlerButtonClick: Function;
}

const MessageModal: React.FC<IMessageModalProps> = ({ text, buttonText, handlerButtonClick, isShow }) => {
  return (
    <div className={`${styles.modal} ${styles.info} ${isShow ? styles.active : ""}`}>
      <div className={`${styles.overlay} ${isShow ? styles.active : ""}`} onClick={() => handlerButtonClick()} />
      <div className={styles.modal_content}>
        <div className={styles.modal_close} onClick={() => handlerButtonClick()}>
          <CloseIcon fill="#1B1B1B" />
        </div>
        <div className={styles.content}>
          <div className={styles.message}>{parse(text)}</div>
          <button type="button" onClick={() => handlerButtonClick()}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
