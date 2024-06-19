/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

import pageStyles from "../ModelSettings.module.sass";
import styles from "./Videos.module.sass";

import ConfirmMessageModal from "../../../components/Modals/ConfirmMessageModal";
import MessageModal from "../../../components/Modals/MessageModal";

import { IVideo } from "../../../types/model/video/video";
import { VideoStatus } from "../../../enums/videoStatus";

import { Delete as DeleteIcon } from "../../../assets/Delete";
import { Video as VideoIcon } from "../../../assets/Video";
import { ServerStatusType } from "../../../enums/serverStatusType";
import { initServerStatus } from "../../../types/main/serverStatus";

const Videos = () => {
  const { t, i18n } = useTranslation();
  const { uploadPublicVideo, setVideoProgress, setFileStatuses, getModels, deleteVideo, setVideoStatuses } = useActions();
  const publicVideoPicker = useRef<HTMLInputElement>(null);
  const model = useTypedSelector((state) => state.modelReducer.model);
  const profile = useTypedSelector((state) => state.profileReducer.profile);
  const progress = useTypedSelector((state) => state.fileReducer.videoProgress);
  const fileStatuses = useTypedSelector((state) => state.fileReducer.serverStatuses);
  const videoStatuses = useTypedSelector((state) => state.videoReducer.serverStatuses);
  const [deletedVideo, setDeletedVideo] = useState({ id: -1 } as IVideo);
  const [isConfirmModalShow, setIsConfirmModalShow] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [isMessageModalShow, setIsMessageModalShow] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);

  useEffect(() => {
    document.title = `${t("model.model")} | ${t("model.videos")}`;
  }, []);

  useEffect(() => {
    document.title = `${t("model.model")} | ${t("model.videos")}`;
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    if (
      fileStatuses.uploadPublicVideo.status === ServerStatusType.Success ||
      videoStatuses.deleteVideo.status === ServerStatusType.Success
    ) {
      setVideoProgress(-1);
      setFileStatuses({ ...fileStatuses, uploadPublicVideo: initServerStatus() });
      setVideoStatuses({ ...videoStatuses, deleteVideo: initServerStatus() });
      getModels({ profile_id: profile.id });
    }
    if (
      fileStatuses.uploadPublicVideo.status === ServerStatusType.Error ||
      videoStatuses.deleteVideo.status === ServerStatusType.Error
    ) {
      console.log(fileStatuses.uploadPublicVideo.status);
      setVideoProgress(-1);
      setInfoMessage(
        fileStatuses.uploadPublicVideo.status === ServerStatusType.Error
          ? t(fileStatuses.uploadPublicVideo.error)
          : t(videoStatuses.deleteVideo.error)
      );
      setFileStatuses({ ...fileStatuses, uploadPublicVideo: initServerStatus() });
      setVideoStatuses({ ...videoStatuses, deleteVideo: initServerStatus() });
      setIsMessageModalShow(true);
    }
  }, [fileStatuses, videoStatuses]);

  const handlePublicVideoOnChange = async (event) => {
    var video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = function () {
      window.URL.revokeObjectURL(video.src);
      setVideoDuration(video.duration);
    };
    console.log(videoDuration);
    video.src = URL.createObjectURL(event.target.files[0]);
    if (event.target.files[0].size / 1024 / 1024 > 100) {
      setInfoMessage(t("model.video_not_accepted"));
      setIsMessageModalShow(true);
    } else {
      const fileNameArr = event.target.files[0].name.split(".");
      const fileNameStr = String(model.id) + "mvb" + String(Date.now()) + "." + fileNameArr[fileNameArr.length - 1];
      uploadPublicVideo({
        filename: fileNameStr,
        file: event.target.files[0],
        model_id: model.id,
        onUploadProgress: (data) => {
          setVideoProgress(Math.round(100 * (data.loaded / data.total!)));
        },
      });
    }
    event.target.value = "";
  };

  const handleDeleteOnClick = (video: IVideo) => {
    setDeletedVideo(video);
    setIsConfirmModalShow(true);
  };

  const handleConfirmDeleteOnClick = () => {
    deleteVideo({ video: deletedVideo });
    setIsConfirmModalShow(false);
  };

  return (
    <div className={pageStyles.content}>
      <div className={`${pageStyles.title} ${pageStyles.media}`}>{t("model.videos")}</div>
      <div className={styles.info}>
        <div className={styles.info_item}>
          {`${t("model.accepted_video_formats")}: `}
          <span>.mkv, .mp4, .mov</span>
        </div>
        <div className={styles.info_item}>
          {`${t("model.maximum_video_size")}: `} <span>100{t("model.mb")}</span>
        </div>
        <div className={styles.info_item}>
          {`${t("model.maximum_video_duration")}: `} <span>5 {t("model.minutes")}</span>
        </div>
        <div className={styles.info_item}>
          {`${t("model.minimum_video_duration")}: `} <span>10 {t("model.seconds")}</span>
        </div>
      </div>
      <div className={styles.videos_container}>
        <div className={styles.videos_wrapper}>
          {model.videos.map((video: IVideo) => (
            <div
              className={`${styles.video_item} ${video.status === VideoStatus.OnCheck ? styles.on_check : ""} ${
                video.status === VideoStatus.Rejected ? styles.rejected : ""
              }`}
            >
              <video src={`/uploads${video.video_url}`} autoPlay={false} />
              {video.status === VideoStatus.OnCheck ? (
                <div className={styles.check_video}>{t("model.awaiting_verification")}</div>
              ) : null}
              {video.status === VideoStatus.Rejected ? (
                <div className={styles.rejected_video}>{t("model.rejected_media")}</div>
              ) : null}
              <button className={styles.delete_button} type="button" onClick={() => handleDeleteOnClick(video)}>
                <DeleteIcon />
              </button>
            </div>
          ))}
          {model.videos.filter((video: IVideo) => video.status > VideoStatus.Rejected).length > 29 ? null : (
            <>
              <input
                type="file"
                id="file"
                onChange={handlePublicVideoOnChange}
                accept="video/mp4, video/mov, video/mkv, video/avi"
                ref={publicVideoPicker}
              />
              <div
                className={styles.add}
                onClick={() => {
                  if (publicVideoPicker.current !== null && progress === -1) {
                    publicVideoPicker.current!.click();
                  }
                }}
              >
                <VideoIcon />
                {progress === -1 ? t("model.select_a_video") : `${t("model.loading")}... (${progress}%)`}
              </div>
            </>
          )}
        </div>
      </div>
      <ConfirmMessageModal
        text={t("global.delete_video_question")}
        okButtonText={t("global.delete")}
        handlerOkOnClick={handleConfirmDeleteOnClick}
        cancelButtonText={t("global.cancel")}
        isShow={isConfirmModalShow}
        setIsShow={setIsConfirmModalShow}
      />
      <MessageModal
        text={infoMessage}
        buttonText={t("global.ok")}
        handlerButtonClick={() => setIsMessageModalShow(false)}
        isShow={isMessageModalShow}
      />
    </div>
  );
};

export default Videos;
