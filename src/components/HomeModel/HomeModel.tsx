import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { useTypedSelector } from "../../hooks/useTypedSelector";

import styles from "./HomeModel.module.sass";

import { PhotoStatus } from "../../enums/photoStatus";
import { PhotoType } from "../../enums/photoType";
import { VideoStatus } from "../../enums/videoStatus";

import { ViewType } from "../../pages/Home/models/ViewType";
import { IModel } from "../../types/model/model/model";
import { IPhoto } from "../../types/model/photo/photo";
import { IVideo } from "../../types/model/video/video";
import { IBreastSize } from "../../types/core/breastSize";
import { IMeetingPlace } from "../../types/core/meetingPlace";
import { IDistrict } from "../../types/core/district";

import { Verifyed as VerifyedIcon } from "../../assets/Verifyed";
import { PhotoCamera as PhotoIcon } from "../../assets/PhotoCamera";
import { VideoCamera as VideoIcon } from "../../assets/VideoCamera";
import { Car as CarIcon } from "../../assets/Car";
import { Home as HomeIcon } from "../../assets/Home";
import { Phone as PhoneIcon } from "../../assets/Phone";
import { Telegram as TelegramIcon } from "../../assets/Telegram";
import { Whatsapp as WhatsappIcon } from "../../assets/Whatsapp";
import { Botim as BotimIcon } from "../../assets/Botim";
import { Wechat as WechatIcon } from "../../assets/Wechat";
import { Eye as EyeIcon } from "../../assets/Eye";
import { Location as LocationIcon } from "../../assets/Location";

interface IHomeModelProps {
  model: IModel;
  viewType: ViewType;
  forModerator: boolean;
}

const HomeModel: React.FC<IHomeModelProps> = ({ model, viewType, forModerator = false }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const breastSizes = useTypedSelector((state) => state.coreReducer.breastSizes);
  const meetingPlaces = useTypedSelector((state) => state.coreReducer.meetingPlaces);
  const districts = useTypedSelector((state) => state.coreReducer.districts);
  const [isPhoneShowed, setIsPhoneShowed] = useState(false);

  const calcIsOnline = () => {
    const now = new Date();
    const lastOnline = new Date(model.last_online);
    const difference = Math.abs(now.getTime() - lastOnline.getTime()) / (1000 * 60);
    return difference < 3;
  };
  const isOnline = useMemo(() => calcIsOnline(), [model]);
    
  const makeHiddenPhoneNumber = (phoneNumber: string) => {
    var replacedStr = phoneNumber.substring(9, 15);
    return phoneNumber.replace(replacedStr, "XXX-XX");
  };
  const changePhoneNumber = (phoneNumber: string) => {
    return phoneNumber
      .trim()
      .replaceAll(" ", "")
      .replaceAll("(", "")
      .replaceAll(")", "")
      .replaceAll("-", "")
      .replaceAll("+", "");
  };

  const getThumbUrl = (photoUrl: string) => {
    return photoUrl.replace("photos", "photos/thumbs");
  };

  return (
    <div
      className={`${styles.model} ${viewType === ViewType.GridView ? styles.grid_model : styles.list_model}`}
      onClick={() => {
        navigate((forModerator ? '/admin-moderator' : '') + `/model/${String(model.id).padStart(8, "0")}`);
      }}
    >
      {model.photos.filter((photo: IPhoto) => photo.is_main).length > 0 && (
        <div className={styles.photo}>
          <img
            className={styles.photo}
            src={`/uploads${getThumbUrl(model.photos.find((photo: IPhoto) => photo.is_main)!.photo_url)}`}
            alt=""
            onClick={() => navigate((forModerator ? '/admin-moderator' : '') + `/model/${String(model.id).padStart(8, "0")}`)}
          />
        </div>
      )}
      {model.is_verified ? (
        <div className={styles.verified}>
          <VerifyedIcon />
        </div>
      ) : null}
      <div className={styles.info}>
        <div className={styles.main}>
          <Link className={styles.name} to={(forModerator ? '/admin-moderator' : '') + `/model/${String(model.id).padStart(8, "0")}`}>
            {model.name}
          </Link>
          <div className={styles.statuses}>
            {model.is_vip ? <div className={styles.vip}>VIP</div> : null}
            <div
              className={`${isOnline ? styles.online : styles.offline}`}
              title={isOnline ? t("model.online") : t("model.offline")}
            />
          </div>
        </div>
        {viewType === ViewType.ListView && (
          <div className={styles.contacts}>
            {!isPhoneShowed ? (
              <div className={`${styles.phone}`}>
                <PhoneIcon />
                {makeHiddenPhoneNumber(model.contacts[0].phone_number)}
                <div
                  className={styles.phone_show}
                  onClick={() => {
                    // event.stopPropagation();
                    setIsPhoneShowed(true);
                  }}
                  title={t("model.show_the_number")}
                >
                  <EyeIcon />
                </div>
              </div>
            ) : (
              <a
                className={`${styles.phone}`}
                href={`tel:+${changePhoneNumber(model.contacts[0].phone_number)}`}
                onClick={(event) => event?.stopPropagation()}
              >
                <PhoneIcon />
                {model.contacts[0].phone_number}
              </a>
            )}

            <div className={styles.messengers}>
              {model.contacts[0].is_telegram_enable ? (
                <div title={t("model.has_a_telegram")}>
                  <TelegramIcon isGray={false} />
                </div>
              ) : null}
              {model.contacts[0].is_whatsapp_enable ? (
                <div title={t("model.has_a_whatsapp")}>
                  <WhatsappIcon isGray={false} />
                </div>
              ) : null}
              {model.contacts[0].is_wechat_enable ? (
                <div title={t("model.has_a_wechat")}>
                  <WechatIcon isGray={false} />
                </div>
              ) : null}
              {model.contacts[0].is_botim_enable ? (
                <div title={t("model.has_a_botim")}>
                  <BotimIcon isGray={false} />
                </div>
              ) : null}
            </div>
          </div>
        )}
        {
          <div className={styles.location}>
            <LocationIcon fill="#98042D" />
            {model.district_id === -1
              ? t("global.not_specified_m")
              : i18n.resolvedLanguage === "ru"
              ? districts.find((district: IDistrict) => district.id === model.district_id)?.district
              : districts.find((district: IDistrict) => district.id === model.district_id)?.district_eng}
          </div>
        }
        {viewType === ViewType.ListView && (
          <div className={styles.parameters}>
            <div className={styles.parameter}>
              {t("model.age")}:<div className={styles.value}>{model.age}</div>
            </div>
            <div className={styles.parameter}>
              {t("model.weight")}:
              <div className={styles.value}>
                {model.weight} {t("model.kg")}
              </div>
            </div>
            <div className={styles.parameter}>
              {t("model.height")}:
              <div className={styles.value}>
                {model.height} {t("model.cm")}
              </div>
            </div>
            <div className={styles.parameter}>
              {t("model.breast")}:
              <div className={styles.value}>
                {breastSizes.find((breastSize: IBreastSize) => breastSize.id === model.breast_size_id)?.breast_size}
              </div>
            </div>
          </div>
        )}
        <div className={`${styles.bottom_info} ${viewType === ViewType.GridView ? styles.grid : ""}`}>
          <div className={styles.photos_videos}>
            <div className={styles.parameter}>
              {model.photos.filter(
                (photo: IPhoto) => photo.type === PhotoType.PublicPhoto && photo.status === PhotoStatus.Applyed
              ).length > 0 ? (
                <>
                  <PhotoIcon />
                  {
                    model.photos.filter(
                      (photo: IPhoto) => photo.type === PhotoType.PublicPhoto && photo.status === PhotoStatus.Applyed
                    ).length
                  }
                </>
              ) : null}
            </div>
            <div className={styles.parameter}>
              {model.videos.filter((video: IVideo) => video.status === VideoStatus.Applyed).length > 0 ? (
                <>
                  <VideoIcon />
                  {model.videos.filter((video: IVideo) => video.status === VideoStatus.Applyed).length}
                </>
              ) : null}
            </div>
          </div>
          <div className={styles.services}>
            {meetingPlaces
              .find((meetingPlace: IMeetingPlace) => meetingPlace.id === model.meeting_place_id)
              ?.meeting_place.includes("Аппартаменты") && (
              <div title={t("model.incall")}>
                <HomeIcon />
              </div>
            )}
            {meetingPlaces
              .find((meetingPlace: IMeetingPlace) => meetingPlace.id === model.meeting_place_id)
              ?.meeting_place.includes("Выезд") && (
              <div title={t("model.outcall")}>
                <CarIcon />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeModel;
