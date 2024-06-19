import { useTranslation } from "react-i18next";

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

import styles from "./ModelSettingsNavgation.module.sass";

import LinksList from "./linksList";

const ModelSettingsNavigation = () => {
  const { t } = useTranslation();
  const { setActiveModelSettingsSection } = useActions();
  const activeSection = useTypedSelector((state) => state.modelReducer.activeModelSettingsSection);
  const windowSize = useTypedSelector((state) => state.mainReducer.windowSize);
  const model = useTypedSelector((state) => state.modelReducer.model);

  return (
    <div className={styles.page_navigation}>
      {LinksList.map((link, index) => (
        <>
          {model.id !== -1 || index === 0 ? (
            <div
              className={`${styles.link} ${activeSection === link.id ? styles.active : ""} ${
                index && (windowSize.innerWidth > 600 || (windowSize.innerWidth < 601 && index !== 4)) ? styles.bordered : ""
              }`}
              onClick={() => setActiveModelSettingsSection(link.id)}
            >
              {t(`${link.link}`)}
            </div>
          ) : null}
        </>
      ))}
    </div>
  );
};

export default ModelSettingsNavigation;
