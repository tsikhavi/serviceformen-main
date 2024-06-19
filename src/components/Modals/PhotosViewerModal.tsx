import { useEffect, useRef } from "react";
import Slider from "react-slick";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import styles from "./Modal.module.sass";

import { ModalType } from "../Modals/ModalType";

import { IPhoto } from "../../types/model/photo/photo";

import { Close as CloseIcon } from "../../assets/Close";
import { ArrowRight as ArrowRightIcon } from "../../assets/ArrowRight";
import { ArrowLeft as ArrowLeftIcon } from "../../assets/ArrowLeft";

interface IPhotosViewerModalProps {
  photos: IPhoto[];
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}

const PhotosViewerModal: React.FC<IPhotosViewerModalProps> = ({ photos, index, setIndex }) => {
  const { setIsNoScroll, setIsModalShow, setModalType } = useActions();
  const isModalShow = useTypedSelector((state) => state.mainReducer.isModalShow);
  const modalType = useTypedSelector((state) => state.mainReducer.modalType);
  const windowSize = useTypedSelector((state) => state.mainReducer.windowSize);
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
    initialSlide: index !== -1 ? index : 0,
    afterChange: (index) => {
      setIndex(index);
    },
  };

  useEffect(() => {
    setIsNoScroll(isModalShow);
  }, [isModalShow]);

  useEffect(() => {
    if (!isModalShow && index !== -1) {
      slider?.current?.slickGoTo(index);
      setIsModalShow(true);
    }
  }, [index]);

  const handleCloseOnClick = () => {
    setIndex(-1);
    setIsModalShow(false);
    setModalType(ModalType.None);
  };

  return (
    <div
      className={`${styles.modal} ${isModalShow && modalType === ModalType.PhotosViewer ? styles.active : ""} ${
        styles.photos
      }`}
    >
      <div
        className={`${styles.overlay} ${isModalShow && modalType === ModalType.PhotosViewer ? styles.active : ""}`}
        onClick={handleCloseOnClick}
      />
      <div className={`${styles.modal_content} ${styles.photos_viewer}`}>
        <div className={styles.modal_close} onClick={handleCloseOnClick}>
          <CloseIcon fill="#FFFFFF" />
        </div>
        {index !== -1 ? (
          <div className={styles.photos_viewer_container}>
            <div className={`${styles.button} ${styles.prev}`} onClick={() => slider?.current?.slickPrev()}>
              <ArrowLeftIcon />
            </div>
            <div
              className={styles.slider}
              style={{
                height: windowSize.innerWidth > windowSize.innerHeight / 1.333 ? "calc(100vh - 30px)" : "",
                width:
                  windowSize.innerWidth > windowSize.innerHeight / 1.333
                    ? "calc((100vh - 30px) * 0.65)"
                    : "calc(100vw - 30px)",
              }}
            >
              <Slider ref={slider} {...settings}>
                {photos.map((photo: IPhoto) => (
                  <div>
                    <img
                      src={`/uploads${photo.photo_url}`}
                      alt=""
                      style={{
                        height: windowSize.innerWidth > windowSize.innerHeight / 1.333 ? "calc(100vh - 30px)" : "auto",
                        width: windowSize.innerWidth > windowSize.innerHeight / 1.333 ? "auto" : "calc(100vw - 30px)",
                      }}
                    />
                  </div>
                ))}
              </Slider>
            </div>
            {/*photos.map((photo: IPhoto, mapIndex: number) => (
              <img
                src={photo.photo_url}
                className={mapIndex === index ? styles.active : ""}
                alt=""
                style={{
                  height: windowSize.innerWidth > windowSize.innerHeight / 1.333 ? "calc(100vh - 30px)" : "auto",
                  width: windowSize.innerWidth > windowSize.innerHeight / 1.333 ? "auto" : "calc(100vw - 30px)",
                }}
              />
              ))*/}
            <div className={`${styles.button} ${styles.next}`} onClick={() => slider?.current?.slickNext()}>
              <ArrowRightIcon />
            </div>
            <div className={styles.count}>{`${index + 1} / ${photos.length}`}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PhotosViewerModal;
