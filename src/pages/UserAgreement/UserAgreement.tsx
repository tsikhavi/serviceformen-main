import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import styles from "./UserAgreement.module.sass";

import { IPage } from "../../types/page/page";

const UserAgreement = () => {
  const { t, i18n } = useTranslation();
  const { setActiveHeaderLink, getPages } = useActions();
  const pages = useTypedSelector((state) => state.pageReducer.pages);

  useEffect(() => {
    getPages();
    document.title = t("navigation.user_agreement");
    setActiveHeaderLink(-1);
  }, []);

  useEffect(() => {
    document.title = t("navigation.user_agreement");
  }, [i18n.resolvedLanguage]);

  return (
    <div className={styles.content}>
      <div className={styles.title}>{t("navigation.user_agreement")}</div>
      <div className={styles.description}>
        {Array.isArray(pages) && pages.filter((page: IPage) => page.title === "Пользовательское соглашение").length > 0
          ? i18n.resolvedLanguage === "ru"
            ? parse(pages.find((page: IPage) => page.title === "Пользовательское соглашение")?.content!)
            : parse(pages.find((page: IPage) => page.title === "Пользовательское соглашение")?.content_eng!)
          : null}
      </div>
    </div>
  );
};

export default UserAgreement;
