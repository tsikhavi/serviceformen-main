import Slider from "react-slider";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import MessageModal from "../../components/Modals/MessageModal";

import globalStyles from "../../App.module.sass";
import styles from "./Proposal.module.sass";

import { ProfileType } from "../../enums/profileType";
import { initProposal } from "../../types/proposal/initProposal";
import { IProposalPlace } from "../../types/core/proposalPlace";
import { ServerStatusType } from "../../enums/serverStatusType";
import { initServerStatus } from "../../types/main/serverStatus";
import { ProposalStatus } from "../../enums/proposalStatus";
import { Helmet } from "react-helmet-async";

const Proposal = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { setActiveHeaderLink, addProposal, setProposalStatus } = useActions();
  const isAuth = useTypedSelector((state) => state.profileReducer.isAuth);
  const profileStatuses = useTypedSelector((state) => state.profileReducer.serverStatuses);
  const profile = useTypedSelector((state) => state.profileReducer.profile);
  const proposalPlaces = useTypedSelector((state) => state.coreReducer.proposalPlaces);
  const proposalStatus = useTypedSelector((state) => state.proposalReducer.serverStatus);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [isMessageModalShow, setIsMessageModalShow] = useState(false);
  const [proposal, setProposal] = useState(initProposal());
  const [selectedPlace, setSelectedPlace] = useState(1);

  useEffect(() => {
    document.title = t("global.make_an_order");
    setActiveHeaderLink(-1);
    if ((profileStatuses.authMe.status === ServerStatusType.Error && !isAuth) || profile.type !== ProfileType.Guest) {
      setInfoMessage(t("model.order_guest"));
      setIsMessageModalShow(true);
    }
  }, []);

  useEffect(() => {
    document.title = t("global.make_an_order");
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    setIsButtonEnabled(
      proposal.name.trim().length > 0 &&
        proposal.description.trim().length > 0 &&
        proposal.place.trim().length > 0 &&
        proposal.place.trim().length > 0
    );
  }, [proposal]);

  useEffect(() => {
    if (selectedPlace === 0) {
      setProposal({ ...proposal, place: "" });
    } else {
      setProposal({
        ...proposal,
        place:
          selectedPlace === 0
            ? ""
            : proposalPlaces.find((proposalPlace: IProposalPlace) => proposalPlace.id === selectedPlace)?.place!,
      });
    }
  }, [selectedPlace]);

  useEffect(() => {
    if (proposalStatus.status === ServerStatusType.Success) {
      setProposalStatus(initServerStatus());
      navigate("/");
    }
    if (proposalStatus.status === ServerStatusType.Error) {
      setInfoMessage(t(proposalStatus.error));
      setProposalStatus(initServerStatus());
      setIsMessageModalShow(true);
    }
  }, [proposalStatus]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      proposal.name.trim().length > 0 &&
      proposal.description.trim().length > 0 &&
      proposal.place.trim().length > 0 &&
      proposal.contact.trim().length > 0 &&
      proposal.place.trim().length > 0
    ) {
      addProposal({ proposal: { ...proposal, profile_id: profile.id, status: ProposalStatus.Applyed } });
    }
  };
  const metaTitle = i18n.language === 'ru' ? 'Главная страница - Мой сайт' : 'Home Page - My Site';
  const metaDescription = i18n.language === 'ru'
    ? 'Страница предложений sexavenueekaterinburg.'
    : 'Proposal page of sexavenueekaterinburg.';
  const metaKeywords = i18n.language === 'ru'
    ? 'модель, сайт эскорта, найдите свою собственную модель/эскорт в России'
    : 'model, proposal, escort site, find your own model/ escort in Russia';
  return (
    <>
    <Helmet>
        
        <html lang={i18n.language} />
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
      </Helmet>
    <div className={styles.content}>
      <div className={styles.title}>{t("global.make_an_order")}</div>
      <form onSubmit={handleSubmit}>
        <div className={styles.input_field}>
          <div className={styles.label}>{t("global.name")}</div>
          <input
            placeholder=""
            type="name"
            required
            onChange={(event) => setProposal({ ...proposal, name: event.target.value.trim() })}
            value={proposal.name}
          />
          <div className={globalStyles.required}>*</div>
        </div>
        <div className={styles.input_field}>
          <div className={styles.label}>{t("model.contact_for_communication")}</div>
          <input
            placeholder=""
            type="text"
            required
            onChange={(event) => setProposal({ ...proposal, contact: event.target.value.trim() })}
            value={proposal.contact}
          />
          <div className={globalStyles.required}>*</div>
        </div>
        <div className={styles.slider_field}>
          <div className={styles.label}>{`${t("model.price")} (${t("global.from")} ${proposal.min_price} ${t("global.to")} ${
            proposal.max_price
          })`}</div>
          <div className={globalStyles.range_slider}>
            <Slider
              className={globalStyles.slider}
              value={[proposal.min_price, proposal.max_price]}
              min={0}
              max={100000}
              onChange={(selectedRange) =>
                setProposal({ ...proposal, min_price: selectedRange[0], max_price: selectedRange[1] })
              }
            />
          </div>
        </div>
        <div className={styles.radio_group_container}>
          <div className={styles.label}>{t("model.meeting_place")}</div>
          <div className={styles.radio_group}>
            {proposalPlaces.map((proposalPlace: IProposalPlace) => (
              <div className={styles.item}>
                <div
                  className={`${styles.button} ${selectedPlace === proposalPlace.id ? styles.active : ""}`}
                  onClick={() => setSelectedPlace(proposalPlace.id)}
                />
                {i18n.resolvedLanguage === "ru" ? proposalPlace.place : proposalPlace.place_eng}
              </div>
            ))}
            <div className={styles.item}>
              <div
                className={`${styles.button} ${selectedPlace === 0 ? styles.active : ""}`}
                onClick={() => setSelectedPlace(0)}
              />
              {t("model.your_own_version")}
            </div>
          </div>
        </div>
        {selectedPlace === 0 ? (
          <div className={styles.input_field}>
            <div className={styles.label}>{t("model.meeting_place")}</div>
            <input
              placeholder=""
              type="text"
              required
              onChange={(event) => setProposal({ ...proposal, place: event.target.value.trim() })}
              value={proposal.place}
            />
            <div className={globalStyles.required}>*</div>
          </div>
        ) : null}
        <div className={styles.textarea_field}>
          <div className={styles.label}>{t("profile.description")}</div>
          <textarea
            placeholder=""
            required
            onChange={(event) => setProposal({ ...proposal, description: event.target.value.trim() })}
            value={proposal.description}
          />
          <div className={globalStyles.required}>*</div>
        </div>
        <button type="submit" disabled={!isButtonEnabled}>
          {t("global.save")}
        </button>
      </form>
      <MessageModal
        text={infoMessage}
        buttonText={t("global.ok")}
        handlerButtonClick={() => navigate("/")}
        isShow={isMessageModalShow}
      />
    </div>
    </>
  );
};

export default Proposal;
