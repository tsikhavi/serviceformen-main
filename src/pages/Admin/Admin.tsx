/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation  } from "react-router-dom";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import styles from "./Admin.module.sass";

import Faq from "./content/faq/Faq";
import Pages from "./content/pages/Pages";

import PhotosViewerModal from "../../components/Modals/PhotosViewerModal";
import VideoViewerModal from "../../components/Modals/VideoViewerModal";
import MessageModal from "../../components/Modals/MessageModal";
import Search from "../../components/Header/search/Search";

import { ModalType } from "../../components/Modals/ModalType";

import { ServerStatusType } from "../../enums/serverStatusType";
import { initServerStatus } from "../../types/main/serverStatus";
import { IPhoto } from "../../types/model/photo/photo";
import { PhotoType } from "../../enums/photoType";
import { PhotoStatus } from "../../enums/photoStatus";
import { IVideo } from "../../types/model/video/video";
import { VideoStatus } from "../../enums/videoStatus";
import { IModel } from "../../types/model/model/model";
import { IModelFeedback } from "../../types/model/modelFeedback/modelFeedback";
import { ModelFeedbackStatus } from "../../enums/modelFeedbackStatus";
import { HomePageType } from "../../enums/homePageType";
import { ComponentType } from "../../components/Header/ComponentType";

import { Logout as LogoutIcon } from "../../assets/Logout";
import { Rate as RateIcon } from "../../assets/Rate";
import { Like as LikeIcon } from "../../assets/Like";
import { Dislike as DislikeIcon } from "../../assets/Dislike";
import { IModelType } from "src/types/core/modelType";
import { IBreastSize } from "src/types/core/breastSize";
import { IHairColor } from "src/types/core/hairColor";
import { IHairSize } from "src/types/core/hairSize";
import { IEthnicGroup } from "src/types/core/ethnicGroup";
import { INationality } from "src/types/core/nationality";
import { ITatoo } from "src/types/core/tatoo";
import { IPiercing } from "src/types/model/piercing/piercing";
import { IModelPiercing } from "src/types/model/piercing/modelPiercing";
import { IEyesColor } from "src/types/core/eyesColor";
import { IBreastType } from "src/types/core/breastType";
import Home from "../Home/Home";
import Editor from "./content/editor/Editor";
import PasswordEditor from "./content/password-editor/PasswordEditor";

const Admin = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { hash } = useLocation();
  const {
    setAdminStatuses,
    setPhotoStatuses,
    loginAdmin,
    authMeAdmin,
    logout,
    getPhotos,
    setModalType,
    updatePhotoStatus,
    logoutAdmin,
    getVideos,
    updateVideoStatus,
    setVideoStatuses,
    getModelFeedbacks,
    updateModelFeedbackStatus,
    setModelFeedbackStatuses,
    getFaqs,
    getPages,
    getModelsAdmin,
    setFilteredModels,
    updateModel,
  } = useActions();
  const isAuth = useTypedSelector((state) => state.adminReducer.isAuth);
  const admin = useTypedSelector((state) => state.adminReducer.user);
  const adminStatuses = useTypedSelector((state) => state.adminReducer.serverStatuses);
  const photoStatuses = useTypedSelector((state) => state.photoReducer.serverStatuses);
  const photos = useTypedSelector((state) => state.photoReducer.photos);
  const videoStatuses = useTypedSelector((state) => state.videoReducer.serverStatuses);
  const videos = useTypedSelector((state) => state.videoReducer.videos);
  const feedbackStatuses = useTypedSelector((state) => state.modelFeedbackReducer.serverStatuses);
  const feedbacks = useTypedSelector((state) => state.modelFeedbackReducer.modelFeedbacks);
  const models = useTypedSelector((state) => state.modelReducer.models);
  const model = useTypedSelector((state) => state.modelReducer.filteredModels);
  const [loginStr, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [errorForm, setErrorForm] = useState("");
  const [activeHeaderLink, setActiveHeaderLink] = useState(-1);
  const [verificationPhoto, setVerificationPhoto] = useState([] as IPhoto[]);
  const [publicPhoto, setPublicPhoto] = useState([] as IPhoto[]);
  const [modelPhotos, setModelPhotos] = useState([] as IPhoto[][]);
  const [activeModel, setActiveModel] = useState(-1);
  const [activePhoto, setActivePhoto] = useState(-1);
  const [activeVideo, setActiveVideo] = useState({ id: -1 } as IVideo);
  const [publicVideo, setPublicVideo] = useState([] as IVideo[]);
  const [feedback, setFeedback] = useState([] as IModelFeedback[]);
  const [isMessageModalShow, setIsMessageModalShow] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [activeComponent, setActiveComponent] = useState(ComponentType.None);

  useLayoutEffect(() => {
    document.title = "Панель Управления";
    i18n.changeLanguage("ru");
    if (hash) {
      setActiveHeaderLink(parseInt(hash.substring(1, 2)))
    }
  }, []);

  useEffect(() => {
    setIsButtonEnabled(loginStr !== "" && password.length > 5);
    setErrorForm("");
  }, [loginStr, password]);

  useEffect(() => {
    if (adminStatuses.login.status === ServerStatusType.Error) {
      if (adminStatuses.login.error === "global.invalid_username") {
        setErrorForm(adminStatuses.login.error);
        setAdminStatuses({ ...adminStatuses, login: initServerStatus() });
      }
    }
  }, [adminStatuses]);

  useLayoutEffect(() => {
    logout();
    if (isAuth) {
      if (adminStatuses.authMe.status === ServerStatusType.None) {
        authMeAdmin();
      }
      if (admin.type === 0) {
        getModelsAdmin({ profile_id: admin.id });
        getPhotos();
        getVideos();
        getModelFeedbacks();
        setActiveHeaderLink(hash ? parseInt(hash.substring(1, 2)) : 0);
      }
      if (admin.type === 1) {
        getFaqs();
        getPages();
        setActiveHeaderLink(hash ? parseInt(hash.substring(1, 2)) : 10);
      }
    }
  }, [isAuth]);

  useEffect(() => {
    if (activeHeaderLink === 0) {
      if (
        Array.isArray(photos) &&
        photos.filter((photo: IPhoto) => photo.type === PhotoType.CheckPhoto && photo.status === PhotoStatus.OnCheck)
          .length > 0
      ) {
        var photoTmp = photos.filter(
          (photo: IPhoto) => photo.type === PhotoType.CheckPhoto && photo.status === PhotoStatus.OnCheck
        );
        setVerificationPhoto(photoTmp);
        setModelPhotos(
          photoTmp.map((tmp) => 
            photos.filter(
              (photo: IPhoto) =>
                photo.model_id === tmp.model_id &&
                photo.status === PhotoStatus.Applyed &&
                photo.type === PhotoType.PublicPhoto
            )
          )
        );
        setFilteredModels(photoTmp.map((tmp) => models.find((model: IModel) => model.id === tmp.model_id)) as IModel[]);
      } else {
        setVerificationPhoto([]);
      }
    }
    if (activeHeaderLink === 1) {
      if (
        Array.isArray(photos) &&
        photos.filter((photo: IPhoto) => photo.type === PhotoType.PublicPhoto && photo.status === PhotoStatus.OnCheck)
          .length > 0
      ) {
        var photoTmp = photos.filter(
          (photo: IPhoto) => photo.type === PhotoType.PublicPhoto && photo.status === PhotoStatus.OnCheck
        );
        setPublicPhoto(photoTmp);
        setModelPhotos(
          photoTmp.map((tmp) => 
            photos.filter(
              (photo: IPhoto) =>
                photo.model_id === tmp.model_id &&
                photo.status === PhotoStatus.Applyed &&
                photo.type === PhotoType.PublicPhoto
            )
          )
        );
        setFilteredModels(photoTmp.map((tmp) => models.find((model: IModel) => model.id === tmp.model_id)) as IModel[]);
      } else {
        setPublicPhoto([]);
      }
    }
  }, [photos, activeHeaderLink]);

  useEffect(() => {
    if (activeHeaderLink === 2) {
      if (Array.isArray(videos) && videos.filter((video: IVideo) => video.status === VideoStatus.OnCheck).length > 0) {
        var videoTmp = videos.filter((video: IVideo) => video.status === VideoStatus.OnCheck);
        setPublicVideo(videoTmp);
        setModelPhotos(
          videoTmp.map((tmp) => 
            photos.filter(
              (photo: IPhoto) =>
                photo.model_id === tmp.model_id &&
                photo.status === PhotoStatus.Applyed &&
                photo.type === PhotoType.PublicPhoto
            )
          )
        );
      } else {
        setPublicVideo([]);
      }
    }
  }, [videos, activeHeaderLink]);

  useEffect(() => {
    if (activeHeaderLink === 3) {
      if (
        Array.isArray(feedbacks) &&
        feedbacks.filter((modelFeedback: IModelFeedback) => modelFeedback.status === ModelFeedbackStatus.OnCheck).length > 0
      ) {
        var feedbackTmp = feedbacks.filter(
          (modelFeedback: IModelFeedback) => modelFeedback.status === ModelFeedbackStatus.OnCheck
        );
        setFeedback(feedbackTmp);
      } else {
        setFeedback([]);
      }
    }
  }, [feedbacks, activeHeaderLink]);

  useEffect(() => {
    if (photoStatuses.updatePhotoStatus.status === ServerStatusType.Success) {
      setPhotoStatuses({ ...photoStatuses, updatePhotoStatus: initServerStatus() });
      getPhotos();
    }
    if (photoStatuses.updatePhotoStatus.status === ServerStatusType.Error) {
      setInfoMessage(t(photoStatuses.updatePhotoStatus.error));
      setPhotoStatuses({ ...photoStatuses, updatePhotoStatus: initServerStatus() });
      setIsMessageModalShow(true);
    }
  }, [photoStatuses]);

  useEffect(() => {
    if (videoStatuses.updateVideoStatus.status === ServerStatusType.Success) {
      setVideoStatuses({ ...videoStatuses, updateVideoStatus: initServerStatus() });
      getVideos();
    }
    if (videoStatuses.updateVideoStatus.status === ServerStatusType.Error) {
      setInfoMessage(t(videoStatuses.updateVideoStatus.error));
      setVideoStatuses({ ...videoStatuses, updateVideoStatus: initServerStatus() });
      setIsMessageModalShow(true);
    }
  }, [videoStatuses]);

  useEffect(() => {
    if (feedbackStatuses.updateModelFeedbackStatus.status === ServerStatusType.Success) {
      setModelFeedbackStatuses({ ...feedbackStatuses, updateModelFeedbackStatus: initServerStatus() });
      getModelFeedbacks();
    }
    if (feedbackStatuses.updateModelFeedbackStatus.status === ServerStatusType.Error) {
      setInfoMessage(t(feedbackStatuses.updateModelFeedbackStatus.error));
      setModelFeedbackStatuses({ ...feedbackStatuses, updateModelFeedbackStatus: initServerStatus() });
      setIsMessageModalShow(true);
    }
  }, [feedbackStatuses]);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (loginStr !== "" && password.length > 5) {
      setAdminStatuses({ ...adminStatuses, login: initServerStatus() });
      loginAdmin({ login: loginStr, password: password });
    }
  };

  const getThumbUrl = (photoUrl: string) => {
    return photoUrl.replace("photos", "photos/thumbs");
  };

  const handlerViewPhotoOnClick = (index: number) => {
    setModalType(ModalType.PhotosViewer);
    setActivePhoto(index);
  };

  const handlerViewVideoOnClick = () => {
    setModalType(ModalType.VideoViewer);
    if (publicVideo[activeModel]) {
      setActiveVideo(publicVideo[activeModel]);
    }
  };

  const handleLogoutOnClick = () => {
    logoutAdmin();
    navigate("/");
  };

  return (
    <div style={{ overflow: 'hidden' }}>
      {adminStatuses.authMe.status !== ServerStatusType.None &&
      adminStatuses.authMe.status !== ServerStatusType.InProgress ? (
        <div className={styles.wrapper_content}>
          {!isAuth && adminStatuses.authMe.status === ServerStatusType.Error ? (
            <div className={styles.content}>
              <div className={styles.title}>Авторизация</div>
              <form onSubmit={handleOnSubmit}>
                <input
                  placeholder={t("global.login")}
                  type="login"
                  required
                  onChange={(event) => setLogin(event.target.value.trim())}
                  value={loginStr}
                />
                <input
                  placeholder={t("global.password")}
                  type="password"
                  required
                  onChange={(event) => setPassword(event.target.value.trim())}
                  value={password}
                  minLength={6}
                />
                {errorForm !== "" ? <div className={styles.error}>{t(errorForm)}</div> : null}
                <button type="submit" disabled={!isButtonEnabled}>
                  {t("global.enter")}
                </button>
              </form>
            </div>
          ) : null}
          {isAuth && adminStatuses.authMe.status === ServerStatusType.Success ? (
            <>
              {admin.type === 0 ? (
                <header>
                  <div className={styles.navigation}>
                    <div
                      className={`${styles.navigation_item} ${activeHeaderLink === 0 ? styles.active : ""}`}
                      onClick={() => {setActiveHeaderLink(0); history.pushState(null, '', '#0')}}
                    >
                      Верификация
                    </div>
                    {/* <div
                      className={`${styles.navigation_item} ${activeHeaderLink === 1 ? styles.active : ""}`}
                      onClick={() => {setActiveHeaderLink(1); history.pushState(null, '', '#1')}}
                    >
                      Проверка фото
                    </div>
                    <div
                      className={`${styles.navigation_item} ${activeHeaderLink === 2 ? styles.active : ""}`}
                      onClick={() => {setActiveHeaderLink(2); history.pushState(null, '', '#2')}}
                    >
                      Проверка видео
                    </div> */}
                    <div
                      className={`${styles.navigation_item} ${activeHeaderLink === 3 ? styles.active : ""}`}
                      onClick={() => {setActiveHeaderLink(3); history.pushState(null, '', '#3')}}
                    >
                      Проверка отзывов
                    </div>
                    <div
                      className={`${styles.navigation_item} ${activeHeaderLink === 4 ? styles.active : ""}`}
                      onClick={() => {setActiveHeaderLink(4); history.pushState(null, '', '#4')}}
                    >
                      Все анкеты
                    </div>
                    <div
                      className={`${styles.navigation_item} ${activeHeaderLink === 5 ? styles.active : ""}`}
                      onClick={() => {setActiveHeaderLink(5); history.pushState(null, '', '#5')}}
                    >
                      Редактирование конфигурации
                    </div>
                    <div
                      className={`${styles.navigation_item} ${activeHeaderLink === 6 ? styles.active : ""}`}
                      onClick={() => {setActiveHeaderLink(6); history.pushState(null, '', '#6')}}
                    >
                      Редактирование пароля
                    </div>
                  </div>
                  <button className={styles.logout} onClick={() => handleLogoutOnClick()}>
                    <LogoutIcon />
                  </button>
                </header>
              ) : (
                <header>
                  <div className={styles.navigation}>
                    <div
                      className={`${styles.navigation_item} ${activeHeaderLink === 10 ? styles.active : ""}`}
                      onClick={() => setActiveHeaderLink(10)}
                    >
                      FAQ
                    </div>
                    <div
                      className={`${styles.navigation_item} ${activeHeaderLink === 11 ? styles.active : ""}`}
                      onClick={() => setActiveHeaderLink(11)}
                    >
                      Страницы
                    </div>
                  </div>
                  <button className={styles.logout} onClick={() => handleLogoutOnClick()}>
                    <LogoutIcon />
                  </button>
                </header>
              )}
              {activeHeaderLink === 0 ? (
                <div className={styles.main_content}>
                  <div className={styles.title}>Верификация</div>
                  {verificationPhoto.map((data, idx) =>
                    <div className={styles.container}>
                      <div className={styles.photo_container}>
                        <img src={`/uploads${data.photo_url}`} alt="" />
                        <div className={styles.buttons}>
                          <button
                            type="button"
                            onClick={() => {
                              updatePhotoStatus({ status: PhotoStatus.Rejected, photo: data });
                              updateModel({ model: model[idx] });
                            }}
                          >
                            Отказ
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              updatePhotoStatus({ status: PhotoStatus.Applyed, photo: data });
                              updateModel({ model: model[idx] });
                            }}
                          >
                            Проверено
                          </button>
                        </div>
                      </div>
                      <div className={styles.model_photos_container}>
                        О себе
                        {model[idx] !== undefined && model[idx].about_self !== undefined ? (
                          <>
                            <textarea
                              placeholder=""
                              // onChange={(event) => setFilteredModels({ ...model, about_self: event.target.value })}
                              value={model[idx].about_self}
                            />
                            <ModelInfo data={model[idx]}></ModelInfo>
                          </>
                        ) : null}
                        Другие фото анкеты
                        <div className={styles.photos}>
                          {modelPhotos[idx] && modelPhotos[idx].length > 0 && modelPhotos[idx].map((photo: IPhoto, index: number) => (
                            <img
                              src={`/uploads${getThumbUrl(photo.photo_url)}`}
                              alt=""
                              onClick={() => {handlerViewPhotoOnClick(index); setActiveModel(idx)}}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
              {activeHeaderLink === 1 ? (
                <div className={styles.main_content}>
                  <div className={styles.title}>Проверка фото</div>
                  {publicPhoto.map((data, idx) =>
                    <div className={styles.container}>
                      <div className={styles.photo_container}>
                        <img src={`/uploads${data.photo_url}`} alt="" />
                        <div className={styles.buttons}>
                          <button
                            type="button"
                            onClick={() => {
                              updatePhotoStatus({ status: PhotoStatus.Rejected, photo: data });
                              updateModel({ model: model[idx] });
                            }}
                          >
                            Отказ
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              updatePhotoStatus({ status: PhotoStatus.Applyed, photo: data });
                              updateModel({ model: model[idx] });
                            }}
                          >
                            Проверено
                          </button>
                        </div>
                      </div>
                      <div className={styles.model_photos_container}>
                        О себе
                        {model[idx] !== undefined && model[idx].about_self !== undefined ? (
                          <>
                            <textarea
                              placeholder=""
                              // onChange={(event) => setFilteredModels({ ...model, about_self: event.target.value })}
                              value={model[idx].about_self}
                            />
                            <ModelInfo data={model[idx]}></ModelInfo>
                          </>
                        ) : null}
                        Другие фото анкеты
                        <div className={styles.photos}>
                          {modelPhotos[idx] && modelPhotos[idx].length && modelPhotos[idx].map((photo: IPhoto, index: number) => (
                            <img
                              src={`/uploads${getThumbUrl(photo.photo_url)}`}
                              alt=""
                              onClick={() => {handlerViewPhotoOnClick(index); setActiveModel(idx)}}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
              {activeHeaderLink === 2 ? (
                <div className={styles.main_content}>
                  <div className={styles.title}>Проверка видео</div>
                  {publicVideo.map((data, idx) =>
                    <div className={styles.container}>
                      <div className={styles.video_container}>
                        <video src={data.video_url} autoPlay={false} onClick={handlerViewVideoOnClick} />
                        <div className={styles.buttons}>
                          <button
                            type="button"
                            onClick={() => {
                              updateVideoStatus({ status: VideoStatus.Rejected, video: data });
                              updateModel({ model: model[idx] });
                            }}
                          >
                            Отказ
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              updateVideoStatus({ status: VideoStatus.Applyed, video: data });
                              updateModel({ model: model[idx] });
                            }}
                          >
                            Проверено
                          </button>
                        </div>
                      </div>
                      <div className={styles.model_photos_container}>
                        О себе
                        {model[idx] !== undefined && model[idx].about_self !== undefined ? (
                          <>
                            <textarea
                              placeholder=""
                              // onChange={(event) => setFilteredModels({ ...model, about_self: event.target.value })}
                              value={model[idx].about_self}
                            />
                            <ModelInfo data={model[idx]}></ModelInfo>
                          </>
                        ) : null}
                        Фото анкеты
                        <div className={styles.photos}>
                          {modelPhotos[idx] && modelPhotos[idx].length && modelPhotos[idx].map((photo: IPhoto, index: number) => (
                            <img
                              src={getThumbUrl(photo.photo_url)}
                              alt=""
                              onClick={() => {handlerViewPhotoOnClick(index); setActiveModel(idx)}}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
              {activeHeaderLink === 3 ? (
                <div className={styles.main_content}>
                  <div className={styles.title}>Проверка отзывов</div>
                  {feedback.map((data) => 
                    <div className={styles.container}>
                      <div className={styles.feedback_container}>
                        {data.parent_id === -1 ? (
                          <div className={styles.feedback_item}>
                            <div className={styles.head}>
                              <div className={styles.avatar}>{data.name.substring(0, 1).toUpperCase()}</div>
                              <div className={styles.head_info}>
                                <div className={styles.main_info}>
                                  <div>{data.name}</div>
                                  <div>{new Date(data.create_date).toLocaleDateString()}</div>
                                </div>
                                <div className={styles.statuses}>
                                  <div className={styles.feedback_rate}>
                                    {Array(data.rate)
                                      .fill(0)
                                      .map((_value) => (
                                        <RateIcon fill="#ffb237" />
                                      ))}
                                  </div>
                                  {data.is_photo_real === 0 ? (
                                    <div className={styles.dislike}>
                                      <DislikeIcon />
                                      {t("model.the_photo_is_not_hers")}
                                    </div>
                                  ) : null}
                                  {data.is_photo_real === 1 ? (
                                    <div className={styles.like}>
                                      <LikeIcon />
                                      {t("model.a_photo_of_her")}
                                    </div>
                                  ) : null}
                                  {data.is_only_one === 0 ? (
                                    <div className={styles.accepts}>{t("model.accepts_more_than_one")}</div>
                                  ) : null}
                                  {data.is_only_one === 1 ? (
                                    <div className={styles.accepts}>{t("model.accepts_one")}</div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                            <div className={styles.feedback_content}>{data.text}</div>
                            <div className={styles.divider}/>
                            {
                              data.user_data && JSON.parse(data.user_data) && Object.keys(JSON.parse(data.user_data)).map((key) => 
                                <div className={styles.feedback_content}>{key}: {JSON.parse(data.user_data)[key]}</div>
                              )
                            }
                          </div>
                        ) : (
                          <div className={`${styles.feedback_item} ${styles.feedback_answer}`}>
                            <div className={styles.head}>
                              <div className={styles.avatar}>{data.name.substring(0, 1).toUpperCase()}</div>
                              <div className={styles.head_info}>
                                <div className={styles.main_info}>
                                  <div>{data!.name}</div>
                                  <div>{new Date(data!.create_date).toLocaleDateString()}</div>
                                </div>
                              </div>
                            </div>
                            <div className={styles.feedback_content}>{data!.text}</div>
                          </div>
                        )}
                        <div className={styles.buttons}>
                          <button
                            type="button"
                            onClick={() =>
                              updateModelFeedbackStatus({ status: ModelFeedbackStatus.Rejected, model_feedback: data })
                            }
                          >
                            Отказ
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              updateModelFeedbackStatus({ status: ModelFeedbackStatus.Applyed, model_feedback: data })
                            }
                          >
                            Проверено
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
              {activeHeaderLink === 4 ? (
                <div className={styles.main_content}>
                  <div className={styles.title}>Все анкеты</div>
                  <div className={styles.sub_navigation}>
                    <Search activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
                  </div>
                  <Home type={HomePageType.AllModels} forModerator={true} />
                </div>
              ) : null}
              {activeHeaderLink === 6 ? <PasswordEditor />: null}
              {activeHeaderLink === 5 ? <Editor /> : null}
              {activeHeaderLink === 10 ? <Faq /> : null}
              {activeHeaderLink === 11 ? <Pages /> : null}
            </>
          ) : null}
          <MessageModal
            text={infoMessage}
            buttonText={t("global.ok")}
            handlerButtonClick={() => setIsMessageModalShow(false)}
            isShow={isMessageModalShow}
          />
        </div>
      ) : null}
      {modelPhotos[activeModel] && modelPhotos[activeModel].length > 0 && (
        <PhotosViewerModal photos={modelPhotos[activeModel]} index={activePhoto} setIndex={setActivePhoto} />
      )}
      {publicVideo && publicVideo[activeModel] && <VideoViewerModal video={activeVideo} setVideo={setActiveVideo} />}
    </div>
  );
};

const ModelInfo = ({ data }) => {
  const { t, i18n } = useTranslation();
  const modelTypes = useTypedSelector((state) => state.coreReducer.modelTypes);
  const breastSizes = useTypedSelector((state) => state.coreReducer.breastSizes);
  const breastTypes = useTypedSelector((state) => state.coreReducer.breastTypes);
  const hairColors = useTypedSelector((state) => state.coreReducer.hairColors);
  const hairSizes = useTypedSelector((state) => state.coreReducer.hairSizes);
  const ethnicGroups = useTypedSelector((state) => state.coreReducer.ethnicGroups);
  const nationalities = useTypedSelector((state) => state.coreReducer.nationalities);
  const tatoos = useTypedSelector((state) => state.coreReducer.tatoos);
  const piercings = useTypedSelector((state) => state.coreReducer.piercings);
  const eyesColors = useTypedSelector((state) => state.coreReducer.eyesColors);

  return <div className={styles.content}>
    <div className={styles.parameters}>
      <div className={styles.parameter}>
        {t("model.age")}:<div className={styles.value}>{data.age}</div>
      </div>
      <div className={styles.parameter}>
        {t("model.weight")}:
        <div className={styles.value}>
          {data.weight} {t("model.kg")}
        </div>
      </div>
      <div className={styles.parameter}>
        {t("model.height")}:
        <div className={styles.value}>
          {data.height} {t("model.cm")}
        </div>
      </div>
      <div className={styles.parameter}>
        {t("model.model_type")}:
        <div className={styles.value}>
          {i18n.resolvedLanguage === "ru"
            ? modelTypes.find((modelType: IModelType) => modelType.id === data.type_id)?.type
            : modelTypes.find((modelType: IModelType) => modelType.id === data.type_id)?.type_eng}
        </div>
      </div>
      <div className={styles.parameter}>
        {t("model.breast")}:
        <div className={styles.value}>
          {`${
            breastSizes.find((breasSize: IBreastSize) => breasSize.id === data.breast_size_id)?.breast_size
          } ${
            i18n.resolvedLanguage === "ru"
              ? breastTypes.find((breastType: IBreastType) => breastType.id === data.breast_type_id)
                  ?.breast_type
              : breastTypes.find((breastType: IBreastType) => breastType.id === data.breast_type_id)
                  ?.breast_type_eng
          }`}
        </div>
      </div>
      <div className={styles.parameter}>
        {t("model.hair_color")}:
        <div className={styles.value}>
          {i18n.resolvedLanguage === "ru"
            ? hairColors.find((hairColor: IHairColor) => hairColor.id === data.hair_color_id)?.hair_color
            : hairColors.find((hairColor: IHairColor) => hairColor.id === data.hair_color_id)?.hair_color_eng}
        </div>
      </div>
      <div className={styles.parameter}>
        {t("model.hair_size")}:
        <div className={styles.value}>
          {i18n.resolvedLanguage === "ru"
            ? hairSizes.find((hairSize: IHairSize) => hairSize.id === data.hair_size_id)?.hair_size
            : hairSizes.find((hairSize: IHairSize) => hairSize.id === data.hair_size_id)?.hair_size_eng}
        </div>
      </div>
      <div className={styles.parameter}>
        {t("model.ethnic_group")}:
        <div className={styles.value}>
          {i18n.resolvedLanguage === "ru"
            ? ethnicGroups.find((ethnicGroup: IEthnicGroup) => ethnicGroup.id === data.ethnic_group_id)
                ?.ethnic_group
            : ethnicGroups.find((ethnicGroup: IEthnicGroup) => ethnicGroup.id === data.ethnic_group_id)
                ?.ethnic_group_eng}
        </div>
      </div>
      <div className={styles.parameter}>
        {t("model.nationality")}:
        <div className={styles.value}>
          {i18n.resolvedLanguage === "ru"
            ? nationalities.find((nationality: INationality) => nationality.id === data.nationality_id)
                ?.nationality
            : nationalities.find((nationality: INationality) => nationality.id === data.nationality_id)
                ?.nationality_eng}
        </div>
      </div>
      <div className={styles.parameter}>
        {t("model.tattoo")}:
        <div className={styles.value}>
          {i18n.resolvedLanguage === "ru"
            ? tatoos.find((tatoo: ITatoo) => tatoo.id === data.tatoo_id)?.tatoo
            : tatoos.find((tatoo: ITatoo) => tatoo.id === data.tatoo_id)?.tatoo_eng}
        </div>
      </div>
      <div className={styles.parameter}>
        {t("model.piercing")}:
        <div className={styles.value}>
          {data.model_piercings.map(
            (modelPiercing: IModelPiercing, index: number) =>
              `${index ? " | " : ""} ${
                i18n.resolvedLanguage === "ru"
                  ? piercings.find((piercing: IPiercing) => piercing.id === modelPiercing.piercing_id)
                      ?.piercing
                  : piercings.find((piercing: IPiercing) => piercing.id === modelPiercing.piercing_id)
                      ?.piercing_eng
              }`
          )}
        </div>
      </div>
      <div className={styles.parameter}>
        {t("model.eyes_color")}:
        <div className={styles.value}>
          {i18n.resolvedLanguage === "ru"
            ? eyesColors.find((eyesColor: IEyesColor) => eyesColor.id === data.eyes_color_id)?.eyes_color
            : eyesColors.find((eyesColor: IEyesColor) => eyesColor.id === data.eyes_color_id)?.eyes_color_eng}
        </div>
      </div>
    </div>
  </div>
}

export default Admin;
