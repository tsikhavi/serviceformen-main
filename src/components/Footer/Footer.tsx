import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import styles from "./Footer.module.sass";

import { ModalType } from "../Modals/ModalType";

import { LinksList } from "./linksList";

import { INavigationLink } from "../../types/main/navigationLink";

import LogoRedIcon from "../../assets/logo.png";

const Footer = () => {
  const { t } = useTranslation();
  const { setIsNoScroll, setIsModalShow, setModalType, setActiveHeaderLink } = useActions();
  const navigate = useNavigate();
  const windowSize = useTypedSelector((state) => state.mainReducer.windowSize);
  const isNoScroll = useTypedSelector((state) => state.mainReducer.isNoScroll);
  const activeLink = useTypedSelector((state) => state.mainReducer.activeHeaderLink);

  const handleContactUsOnClick = (linkId: number) => {
    if (windowSize.innerWidth < 1201) {
      navigate("/contact");
      setActiveHeaderLink(linkId);
      setIsNoScroll(!isNoScroll);
    } else {
      setModalType(ModalType.ContactUs);
      setIsModalShow(true);
    }
  };

  return (
    <footer>
      <div className={styles.navigation_wrapper}>
        <img src={LogoRedIcon} alt="" />
        <ul className={styles.navigation}>
          {LinksList.map((link: INavigationLink) =>
            link.is_for_modal ? (
              <li
                className={`${activeLink === link.id ? styles.active : ""}`}
                onClick={() => handleContactUsOnClick(link.id)}
              >
                <div className={styles.item}>{t(`${link.link}`)}</div>
              </li>
            ) : (
              <Link
                className={`${activeLink === link.id ? styles.active : ""}`}
                to={link.link_url}
                onClick={() => setActiveHeaderLink(link.id)}
              >
                <div className={styles.item}>{t(`${link.link}`)}</div>
              </Link>
            )
          )}
        </ul>
      </div>
      <div className={styles.bottom_content}>
        <div className={styles.copyright}>{`©${new Date().getFullYear()} Copyright by ${process.env.REACT_APP_SITE_NAME}`}</div>
        <div className={styles.warning_info}>{t("navigation.footer_description")}</div>
      </div>
    </footer>
  );
};

export default Footer;
