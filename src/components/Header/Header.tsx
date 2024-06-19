/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import styles from "./Header.module.sass";

import LanguageSelector from "./languageSelector/LanguageSelector";
import Search from "./search/Search";

import { INavigationLink } from "../../types/main/navigationLink";
import { ICountry } from "../../types/core/country";
import { ICity } from "../../types/core/city";
import ConfirmMessageModal from "../Modals/ConfirmMessageModal";

import { LinksList } from "./linksList";
import { ModalType } from "../Modals/ModalType";
import { ComponentType } from "./ComponentType";

import { Menu as MenuIcon } from "../../assets/Menu";
import { Close as CloseIcon } from "../../assets/Close";
import { User as UserIcon } from "../../assets/User";
import { Logout as LogoutIcon } from "../../assets/Logout";
import LogoIcon from "../../assets/logo_white.png";
import LogoRedIcon from "../../assets/logo.png";

const Header = () => {
  const { t, i18n } = useTranslation();
  const { setIsNoScroll, setIsModalShow, setModalType, setFilter, setActiveHeaderLink, logout, authMe } = useActions();
  const navigate = useNavigate();
  const windowSize = useTypedSelector((state) => state.mainReducer.windowSize);
  const isNoScroll = useTypedSelector((state) => state.mainReducer.isNoScroll);
  const activeLink = useTypedSelector((state) => state.mainReducer.activeHeaderLink);
  const isAuth = useTypedSelector((state) => state.profileReducer.isAuth);
  const filter = useTypedSelector((state) => state.modelReducer.filter);
  const isModalShow = useTypedSelector((state) => state.mainReducer.isModalShow);
  const [activeComponent, setActiveComponent] = useState(ComponentType.None);
  const [isNavigationMobileActive, setIsNavigationMobileActive] = useState(false);
  const [isConfirmModalShow, setIsConfirmModalShow] = useState(false);

  useEffect(() => {
    if (isModalShow) {
      setActiveComponent(ComponentType.None);
    }
  }, [isModalShow]);

  const handleContactUsOnClick = (linkId: number) => {
    if (windowSize.innerWidth < 1201) {
      navigate("/contact");
      setActiveHeaderLink(linkId);
      setIsNoScroll(!isNoScroll);
      setIsNavigationMobileActive(!isNavigationMobileActive);
    } else {
      setModalType(ModalType.ContactUs);
      setIsModalShow(true);
    }
  };

  const handleMenuOnClick = () => {
    setIsNoScroll(!isNoScroll);
    setIsNavigationMobileActive(!isNavigationMobileActive);
  };

  const handleMobileLinkOnClick = (linkId: number) => {
    setActiveHeaderLink(linkId);
    if (windowSize.innerWidth < 1201) {
      handleMenuOnClick();
    }
  };

  const handleProfileOnClick = () => {
    if (isAuth) {
      setActiveHeaderLink(-1);
      navigate("/profile");
    } else {
      if (windowSize.innerWidth < 1201) {
        setActiveHeaderLink(-1);
        navigate("/login");
      } else {
        setModalType(ModalType.Authorization);
        setIsModalShow(true);
      }
    }
  };

  const handleConfirmLogoutOnClick = () => {
    logout();
    authMe();
    setIsConfirmModalShow(false);
  };

  return (
    <header>
      <div className={styles.main_navigation}>
        {windowSize.innerWidth < 1201 && (
          <div className={styles.menu_button} onClick={handleMenuOnClick}>
            {!isNavigationMobileActive ? <MenuIcon /> : <CloseIcon fill="#FFFFFF" />}
            {!isNavigationMobileActive ? t("global.menu") : t("global.close")}
          </div>
        )}
        <div className={styles.logo}>
          <img src={LogoIcon} alt="" />
        </div>
        <ul
          className={`${windowSize.innerWidth > 1200 ? styles.navigation : styles.navigation_mobile} ${
            isNavigationMobileActive ? styles.active : ""
          }`}
        >
          {LinksList.map((link: INavigationLink) =>
            link.is_for_modal ? (
              <li
                className={`${activeLink === link.id ? styles.active : ""}`}
                onClick={() => handleContactUsOnClick(link.id)}
              >
                {t(`${link.link}`)}
              </li>
            ) : (
              <Link
                className={`${activeLink === link.id ? styles.active : ""}`}
                to={link.link_url}
                onClick={() => handleMobileLinkOnClick(link.id)}
              >
                {t(`${link.link}`)}
              </Link>
            )
          )}
          {windowSize.innerWidth < 1201 && <img src={LogoRedIcon} alt="" />}
        </ul>
        <div className={styles.user}>
          <UserIcon />
          <div className={styles.user_name} onClick={handleProfileOnClick}>
            {isAuth ? t("global.my_profile") : t("global.authorization")}
          </div>
          {isAuth && (
            <button className={styles.logout} onClick={() => setIsConfirmModalShow(true)}>
              <LogoutIcon />
            </button>
          )}
        </div>
      </div>
      <div className={styles.sub_navigation}>
        {activeLink < 4 && activeLink !== -1 ? (
          <Search activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
        ) : (
          <div></div>
        )}
        {/*windowSize.innerWidth > 1200 && activeLink < 4 && activeLink !== -1 && (
          <LocationSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
        )*/}
        {/*windowSize.innerWidth < 1201 && activeComponent !== ComponentType.Search && activeLink < 4 && activeLink !== -1 && (
          <LocationSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
        )*/}
        {activeLink >= 4 && <div></div>}
        {windowSize.innerWidth > 1200 && (
          <LanguageSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
        )}
        {windowSize.innerWidth < 1201 && activeComponent !== ComponentType.Search && (
          <LanguageSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
        )}
      </div>
      {activeLink < 4 &&
        activeLink !== -1 &&
        ((filter.selectedCountry !== null && filter.selectedCountry.id > -1) ||
          (filter.selectedCity !== null && filter.selectedCity.id > -1)) && (
          <div className={styles.location_navigation}>
            <div className={styles.selected_location}>
              {filter.selectedCountry.id > -1 ? <img src={filter.selectedCountry.flag} alt="" /> : null}
              {`${
                filter.selectedCountry.id > -1
                  ? i18n.resolvedLanguage === "ru"
                    ? filter.selectedCountry.country
                    : filter.selectedCountry.country_eng
                  : ""
              }${filter.selectedCountry.id > -1 && filter.selectedCity.id > -1 ? " | " : ""}${
                filter.selectedCity.id > -1
                  ? i18n.resolvedLanguage === "ru"
                    ? filter.selectedCity.city
                    : filter.selectedCity.city_eng
                  : ""
              }`}

              <div
                className={styles.close}
                onClick={() =>
                  setFilter({ ...filter, selectedCountry: { id: -1 } as ICountry, selectedCity: { id: -1 } as ICity })
                }
              >
                <CloseIcon fill="#1B1B1B" />
              </div>
            </div>
          </div>
        )}
      <ConfirmMessageModal
        text={t("global.logout_question")}
        okButtonText={t("global.logout")}
        handlerOkOnClick={handleConfirmLogoutOnClick}
        cancelButtonText={t("global.cancel")}
        isShow={isConfirmModalShow}
        setIsShow={setIsConfirmModalShow}
      />
    </header>
  );
};

export default Header;
