/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ReactCrop, { type Crop } from "react-image-crop";
import { useTranslation } from "react-i18next";

import { getCroppedImg } from "../../utils/croppedImage";
import { dataURIToBlob, resizeFile } from "../../utils/imageResizer";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import styles from "./Modal.module.sass";

import { ModalType } from "../Modals/ModalType";
import { ServerStatusType } from "../../enums/serverStatusType";
import { initServerStatus } from "../../types/main/serverStatus";

import { Close as CloseIcon } from "../../assets/Close";

interface IPhotoCropModalProps {
  filename: string;
}

const PhotoCropModal: React.FC<IPhotoCropModalProps> = ({ filename }) => {
  const { t } = useTranslation();
  const { setIsNoScroll, setIsModalShow, setModalType, uploadPublicPhoto, setFileStatuses, getModels } = useActions();
  const profile = useTypedSelector((state) => state.profileReducer.profile);
  const model = useTypedSelector((state) => state.modelReducer.model);
  const windowSize = useTypedSelector((state) => state.mainReducer.windowSize);
  const isModalShow = useTypedSelector((state) => state.mainReducer.isModalShow);
  const modalType = useTypedSelector((state) => state.mainReducer.modalType);
  const fileStatuses = useTypedSelector((state) => state.fileReducer.serverStatuses);
  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0, unit: "px", height: 80, width: 60 });
  const [imageSize, setImageSize] = useState([0, 0]);
  const [isButtonEnable, setIsButtonEnable] = useState(true);

  useEffect(() => {
    setIsNoScroll(isModalShow);
  }, [isModalShow]);

  useEffect(() => {
    if (fileStatuses.uploadPublicPhoto.status === ServerStatusType.Success) {
      setFileStatuses({ ...fileStatuses, uploadPublicPhoto: initServerStatus(), uploadTmpPublicPhoto: initServerStatus() });
      getModels({ profile_id: profile.id });
      setImageSize([0, 0]);
      setIsModalShow(false);
      setModalType(ModalType.None);
    }
    if (fileStatuses.uploadPublicPhoto.status !== ServerStatusType.InProgress) {
      setIsButtonEnable(true);
    }
  }, [fileStatuses]);

  const handleCloseOnClick = () => {
    setFileStatuses({ ...fileStatuses, uploadPublicPhoto: initServerStatus(), uploadTmpPublicPhoto: initServerStatus() });
    setImageSize([0, 0]);
    setIsModalShow(false);
    setModalType(ModalType.None);
  };

  async function handleUploadPhoto() {
    setIsButtonEnable(false);
    let image = document.getElementById("cropped-image");
    let file = (await getCroppedImg(image, crop, filename.replace("/media/photos/", ""))) as unknown as Blob;
    const tmpCompress = await resizeFile(file);
    const compressedFile = dataURIToBlob(tmpCompress);
    uploadPublicPhoto({ files: [file, compressedFile], filename: filename, model_id: model.id });
  }

  const handlerImageOnLoad = (event) => {
    var height = event.currentTarget.height;
    var width = event.currentTarget.width;
    var maxSize = windowSize.innerWidth < 650 ? windowSize.innerWidth - 90 : 500;
    if (height !== 0 && width !== 0) {
      setImageSize([height, width]);
      var cropHeight = 0;
      var cropWidth = 0;
      if (width < height) {
        if (width / height >= 0.75) {
          cropHeight = maxSize;
          cropWidth = maxSize * 0.75;
        } else {
          var scaleCoef = height / maxSize;
          cropWidth = width / scaleCoef;
          cropHeight = cropWidth / 0.75;
        }
      } else {
        var scaleCoef = width / maxSize;
        cropHeight = height / scaleCoef;
        cropWidth = cropHeight * 0.75;
      }
      setCrop({ x: 0, y: 0, unit: "px", height: cropHeight, width: cropWidth });
    } else {
      setCrop({ x: 0, y: 0, unit: "px", height: 80, width: 60 });
    }
  };

  return (
    <div className={`${styles.modal} ${isModalShow && modalType === ModalType.PhotoCrop ? styles.active : ""}`}>
      <div
        className={`${styles.overlay} ${isModalShow && modalType === ModalType.PhotoCrop ? styles.active : ""}`}
        onClick={handleCloseOnClick}
      />
      <div className={`${styles.modal_content} ${styles.photo_crop}`}>
        <div className={styles.modal_close} onClick={handleCloseOnClick}>
          <CloseIcon fill="#1B1B1B" />
        </div>
        <div className={styles.photo_crop_content}>
          <ReactCrop
            className={styles.image_crop}
            crop={crop}
            locked={true}
            keepSelection={true}
            onChange={(с) => setCrop(с)}
            style={{
              height:
                imageSize[0] > imageSize[1] ? `${windowSize.innerWidth < 650 ? windowSize.innerWidth - 90 : 500}px` : "auto",
              width:
                imageSize[1] >= imageSize[0]
                  ? `${windowSize.innerWidth < 650 ? windowSize.innerWidth - 90 : 500}px`
                  : "auto",
            }}
          >
            {fileStatuses.uploadTmpPublicPhoto.status === ServerStatusType.Success ? (
              <img
                className={styles.image_crop}
                src={`/uploads/media/photos/tmp/${filename}`}
                id="cropped-image"
                onLoad={handlerImageOnLoad}
                style={{
                  height:
                    imageSize[0] > imageSize[1]
                      ? `${windowSize.innerWidth < 650 ? windowSize.innerWidth - 90 : 500}px`
                      : "auto",
                  width:
                    imageSize[1] >= imageSize[0]
                      ? `${windowSize.innerWidth < 650 ? windowSize.innerWidth - 90 : 500}px`
                      : "auto",
                }}
              />
            ) : null}
          </ReactCrop>
          <button type="button" onClick={handleUploadPhoto} disabled={!isButtonEnable}>
            {t("global.save")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoCropModal;
