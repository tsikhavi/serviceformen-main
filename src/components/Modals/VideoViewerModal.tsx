import { useEffect } from "react";
import ReactPlayer from "react-player";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import styles from "./Modal.module.sass";

import { ModalType } from "../Modals/ModalType";

import { IVideo } from "../../types/model/video/video";

import { Close as CloseIcon } from "../../assets/Close";

interface IVideoViewerModalProps {
  video: IVideo;
  setVideo: React.Dispatch<React.SetStateAction<IVideo>>;
}

const VideoViewerModal: React.FC<IVideoViewerModalProps> = ({ video, setVideo }) => {
  const { setIsNoScroll, setIsModalShow, setModalType } = useActions();
  const windowSize = useTypedSelector((state) => state.mainReducer.windowSize);
  const isModalShow = useTypedSelector((state) => state.mainReducer.isModalShow);
  const modalType = useTypedSelector((state) => state.mainReducer.modalType);

  useEffect(() => {
    setIsNoScroll(isModalShow);
  }, [isModalShow]);

  useEffect(() => {
    if (video.id !== -1) {
      setIsModalShow(true);
    }
  }, [video]);

  const handleCloseOnClick = () => {
    setVideo({ id: -1 } as IVideo);
    setIsModalShow(false);
    setModalType(ModalType.None);
  };

  return (
    <div style={{ position: 'absolute' }}>
      <div
        className={`${styles.modal} ${isModalShow && modalType === ModalType.VideoViewer ? styles.active : ""} ${
          styles.video
        }`}
      >
        <div
          className={`${styles.overlay} ${isModalShow && modalType === ModalType.VideoViewer ? styles.active : ""}`}
          onClick={handleCloseOnClick}
        />
        <div className={`${styles.modal_content} ${styles.video_viewer}`}>
          <div className={styles.modal_close} onClick={handleCloseOnClick}>
            <CloseIcon fill="#FFFFFF" />
          </div>
          {video.id !== -1 ? (
            <div className={styles.video_viewer_container}>
              <ReactPlayer
                className={styles.video_player}
                url={`/uploads${video.video_url}`}
                controls
                playing={true}
                width={windowSize.innerHeight < windowSize.innerWidth ? "75vw" : "90vw"}
                height={windowSize.innerHeight < windowSize.innerWidth ? "75vh" : "45vh"}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default VideoViewerModal;
