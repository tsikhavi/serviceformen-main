import { useTranslation } from "react-i18next";

import { useTypedSelector } from "../../../hooks/useTypedSelector";

import styles from "./LanguageSelector.module.sass";

import { ComponentType } from "../ComponentType";
import { ISiteLanguage } from "../../../types/core/siteLanguage";

import { ArrowDown as ArrowDownIcon } from "../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../assets/ArrowUp";

interface ISiteLanguageSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const LanguageSelector: React.FC<ISiteLanguageSelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const { t, i18n } = useTranslation();
  const languages = useTypedSelector((state) => state.coreReducer.siteLanguages);

  const handleLanguageOnClick = (language: ISiteLanguage) => {
    i18n.changeLanguage(language.language.toLowerCase());
    setActiveComponent(ComponentType.None);
  };

  return (
    <div className={styles.language_selector}>
      <div
        className={`${styles.language} ${activeComponent === ComponentType.LanguageSelector ? styles.active : ""}`}
        onClick={() =>
          setActiveComponent(
            activeComponent === ComponentType.LanguageSelector ? ComponentType.None : ComponentType.LanguageSelector
          )
        }
      >
        {i18n.resolvedLanguage && i18n.resolvedLanguage !== "" ? (
          <>
            <img
              src={`/uploads${
                languages.find((language: ISiteLanguage) => language.language.toLowerCase() === i18n.resolvedLanguage)?.flag
              }`}
              alt=""
            />
            <div className={styles.language_link}>
              {
                languages.find((language: ISiteLanguage) => language.language.toLowerCase() === i18n.resolvedLanguage)
                  ?.language
              }
            </div>
          </>
        ) : null}

        {activeComponent === ComponentType.LanguageSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#FFFFFF" />}
      </div>
      <div className={`${styles.languages_list} ${activeComponent === ComponentType.LanguageSelector ? styles.active : ""}`}>
        <div className={styles.languages_title}>{t("global.language_selection")}</div>
        {languages
          .filter((language: ISiteLanguage) => language.is_enable)
          .map((language: ISiteLanguage) => (
            <div className={styles.language} onClick={() => handleLanguageOnClick(language)}>
              <img src={`/uploads${language.flag}`} alt="" />
              <div className={styles.language_link}>{language.language}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
