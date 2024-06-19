import styles from "./Modal.module.sass";

import { Close as CloseIcon } from "../../assets/Close";

interface IConfirmMessageModalProps {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  okButtonText: string;
  cancelButtonText: string;
  handlerOkOnClick: Function;
}

const ConfirmMessageModal: React.FC<IConfirmMessageModalProps> = ({
  isShow,
  setIsShow,
  text,
  okButtonText,
  cancelButtonText,
  handlerOkOnClick,
}) => {
  return (
    <div className={`${styles.modal} ${styles.info} ${isShow ? styles.active : ""}`}>
      <div className={`${styles.overlay} ${isShow ? styles.active : ""}`} onClick={() => setIsShow(false)} />
      <div className={styles.modal_content}>
        <div className={styles.modal_close} onClick={() => setIsShow(false)}>
          <CloseIcon fill="#1B1B1B" />
        </div>
        <div className={styles.content}>
          <div className={styles.message}>{text}</div>
          <div className={styles.buttons}>
            <button className={styles.cancel} type="button" onClick={() => setIsShow(false)}>
              {cancelButtonText}
            </button>
            <button type="button" onClick={() => handlerOkOnClick()}>
              {okButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmMessageModal;
