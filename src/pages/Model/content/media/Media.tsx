import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";

import { useActions } from "../../../../hooks/useActions";

import styles from "../../Model.module.sass";

import PhotosViewerModal from "../../../../components/Modals/PhotosViewerModal";
import VideoViewerModal from "../../../../components/Modals/VideoViewerModal";

import { ModalType } from "../../../../components/Modals/ModalType";

import { PhotoType } from "../../../../enums/photoType";
import { PhotoStatus } from "../../../../enums/photoStatus";
import { VideoStatus } from "../../../../enums/videoStatus";
import { IModel } from "../../../../types/model/model/model";
import { IPhoto } from "../../../../types/model/photo/photo";
import { IVideo } from "../../../../types/model/video/video";

import { Verifyed as VerifyedIcon } from "../../../../assets/Verifyed";
import { ArrowRight as ArrowRightIcon } from "../../../../assets/ArrowRight";
import { ArrowLeft as ArrowLeftIcon } from "../../../../assets/ArrowLeft";

interface IMediaProps {
  model: IModel;
}

const Media: React.FC<IMediaProps> = ({ model }) => {
  const { t } = useTranslation();
  const { setModalType } = useActions();
  const [photosLength, setPhotosLenght] = useState(0);
  const [videosLenght, setVideosLength] = useState(0);
  const [activePhoto, setActivePhoto] = useState(-1);
  const [activeVideo, setActiveVideo] = useState({ id: -1 } as IVideo);
  const slider = useRef(null as Slider);
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "50px",
    slidesToShow: 1,
    swipeToSlide: true,
    autoplay: false,
    autoplaySpeed: 5000,
    arrows: false,
  };

  useEffect(() => {
    setModalType(ModalType.None);
  }, []);

  useEffect(() => {
    setModalType(ModalType.None);
    setPhotosLenght(
      model.photos.filter((photo: IPhoto) => photo.type === PhotoType.PublicPhoto && photo.status === PhotoStatus.Applyed)
        .length
    );
    setVideosLength(model.videos.filter((video: IVideo) => video.status === VideoStatus.Applyed).length);
  }, [model]);

  const handlerViewPhotoOnClick = (index: number) => {
    setModalType(ModalType.PhotosViewer);
    setActivePhoto(index);
  };

  const handlerViewVideoOnClick = (video: IVideo) => {
    setModalType(ModalType.VideoViewer);
    setActiveVideo(video);
  };

  const getThumbUrl = (photoUrl: string) => {
    return photoUrl.replace("photos", "photos/thumbs");
  };

  return (
    <div className={styles.media}>
      <div className={styles.slider}>
        <div
          className={`${styles.action} ${styles.prev}`}
          onClick={(event) => {
            event.stopPropagation();
            slider?.current?.slickPrev();
          }}
        >
          <ArrowLeftIcon />
        </div>
        <Slider ref={slider} {...settings}>
          {model.photos
            .filter((photo: IPhoto) => photo.type === PhotoType.PublicPhoto && photo.status === PhotoStatus.Applyed)
            .map((photo: IPhoto, index: number) => (
              <div className={styles.photo_container}>
                <img src={`/uploads${photo.photo_url}`} alt="" onClick={() => handlerViewPhotoOnClick(index)} />
              </div>
            ))}
        </Slider>
        {model.is_verified &&
        model.photos.filter((photo: IPhoto) => photo.type === PhotoType.CheckPhoto && photo.status === PhotoStatus.Applyed)
          .length > 0 ? (
          <div className={styles.photo_verified}>{`${t("model.photo_verified")} ${new Date(
            model.photos
              .filter((photo: IPhoto) => photo.type === PhotoType.CheckPhoto && photo.status === PhotoStatus.Applyed)
              .sort((photoOne: IPhoto, photoTwo: IPhoto) =>
                Number(photoOne.id) < Number(photoTwo.id) ? 1 : -1
              )[0].update_date
          ).toLocaleDateString()}`}</div>
        ) : null}
        <div
          className={`${styles.action} ${styles.next}`}
          onClick={(event) => {
            event.stopPropagation();
            slider?.current?.slickNext();
          }}
        >
          <ArrowRightIcon />
        </div>
      </div>
      {model.is_verified ? (
        <div className={styles.verified}>
          <VerifyedIcon />
        </div>
      ) : null}
      <div className={styles.media_content}>
        {t("model.photos_sub")}: {photosLength}
        {photosLength > 4 && (
          <div className={styles.content}>
            {model.photos
              .filter((photo: IPhoto) => photo.type === PhotoType.PublicPhoto && photo.status === PhotoStatus.Applyed)
              .slice(0, 3)
              .map((photo: IPhoto, index: number) => (
                <img
                  className={styles.content_item}
                  src={`/uploads${getThumbUrl(photo.photo_url)}`}
                  alt=""
                  onClick={() => handlerViewPhotoOnClick(index)}
                />
              ))}
            <div className={styles.more_content_item} onClick={() => handlerViewPhotoOnClick(3)}>
              <img
                className={styles.content_item}
                src={`/uploads${getThumbUrl(
                  model.photos.filter(
                    (photo: IPhoto) => photo.type === PhotoType.PublicPhoto && photo.status === PhotoStatus.Applyed
                  )[3].photo_url
                )}`}
                alt=""
              />
              <div className={styles.more_content}>
                {t("model.still")} {photosLength - 3}
              </div>
            </div>
          </div>
        )}
        {photosLength < 5 && (
          <div className={styles.content}>
            {model.photos
              .filter((photo: IPhoto) => photo.type === PhotoType.PublicPhoto && photo.status === PhotoStatus.Applyed)
              .map((photo: IPhoto, index: number) => (
                <img
                  className={styles.content_item}
                  src={`/uploads${getThumbUrl(photo.photo_url)}`}
                  alt=""
                  onClick={() => handlerViewPhotoOnClick(index)}
                />
              ))}
          </div>
        )}
      </div>
      {model.videos.length > 0 && (
        <div className={styles.media_content}>
          {t("model.videos")}: {videosLenght}
          <div className={styles.content}>
            {model.videos
              .filter((video: IVideo) => video.status === VideoStatus.Applyed)
              .map((video: IVideo) => (
                <video
                  className={`${styles.content_item} ${styles.video}`}
                  src={`/uploads${video.video_url}`}
                  autoPlay={false}
                  onClick={() => handlerViewVideoOnClick(video)}
                />
              ))}
          </div>
        </div>
      )}
      {photosLength > 0 && (
        <PhotosViewerModal
          photos={model.photos.filter(
            (photo: IPhoto) => photo.type === PhotoType.PublicPhoto && photo.status === PhotoStatus.Applyed
          )}
          index={activePhoto}
          setIndex={setActivePhoto}
        />
      )}
      {videosLenght > 0 && <VideoViewerModal video={activeVideo} setVideo={setActiveVideo} />}
    </div>
  );
};

export default Media;
