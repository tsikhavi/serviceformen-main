import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import styles from "./ProfileNavigation.module.sass";

import LinksList from "./linksList";

import { IProfileLink } from "../../../../types/main/profileLink";
import { ProfileType } from "../../../../enums/profileType";
import { IModel } from "src/types/model/model/model";

const ProfileNavigation = () => {
  const { t } = useTranslation();
  const { setActiveProfileSection, setActiveModelSettingsSection } = useActions();
  const navigate = useNavigate();
  const activeSection = useTypedSelector((state) => state.profileReducer.activeProfileSection);
  const windowSize = useTypedSelector((state) => state.mainReducer.windowSize);
  const profile = useTypedSelector((state) => state.profileReducer.profile);
  const models = useTypedSelector((state) => state.modelReducer.models);

  const handleNavigateClick = (id: number) => {
    setActiveModelSettingsSection(-1);
    navigate("/");
    setActiveProfileSection(id);
  };

  return (
    <div className={styles.page_navigation}>
      <div className={styles.navigation_main}>
        {LinksList.map((group) => (
          <>
            {profile !== undefined &&
            (profile.type === ProfileType.Agency ||
              (profile.type === ProfileType.Guest &&
                group.links.filter((link: IProfileLink) => !link.is_only_for_agency).length > 0)) ? (
              <div className={`${styles.navigation_group} ${group.links.length === 1 ? styles.bordered : ""}`}>
                <div className={`${styles.name} ${group.links.length === 1 ? styles.bordered : ""}`}>
                  <div
                    className={`${styles.link} ${
                      group.links.filter((link) => link.id === activeSection).length === 1 ? styles.active : ""
                    }`}
                    onClick={() => {
                      if (!(windowSize.innerWidth > 1200 && group.links.length !== 1)) {
                        handleNavigateClick(group.links[0].id);
                      }
                    }}
                  >
                    {group.group !== "" ? (
                      t(`${group.group}`)
                    ) : (
                      <>
                        {t(`${group.links[0].link}`)}
                        <div className={styles.count}>
                          {models.filter((model: IModel) => model.agency_id === profile.id).length}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                {windowSize.innerWidth > 1200 && group.links.length > 1 && (
                  <div
                    className={`${styles.list} ${
                      group.links.filter((link) => link.id === activeSection).length === 1 ? styles.active : ""
                    }`}
                  >
                    {group.links.map((link, index) => (
                      <div
                        className={`${styles.link} ${link.id === activeSection ? styles.active : ""} ${
                          index === 1 ? styles.bordered : ""
                        }`}
                        onClick={() => handleNavigateClick(link.id)}
                      >
                        {t(`${link.link}`)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : null}
          </>
        ))}
      </div>
      {windowSize.innerWidth < 1201 &&
        LinksList.filter((group) => group.links.filter((link) => link.id === activeSection).length > 0)[0].links.length >
          1 && (
          <div className={styles.mobile_list}>
            {LinksList.filter((group) => group.links.filter((link) => link.id === activeSection).length > 0)[0].links.map(
              (link, index) => (
                <div
                  className={`${styles.link} ${link.id === activeSection ? styles.active : ""} ${
                    index === 1 ? styles.bordered : ""
                  }`}
                  onClick={() => handleNavigateClick(link.id)}
                >
                  {t(`${link.link}`)}
                </div>
              )
            )}
          </div>
        )}
    </div>
  );
};

export default ProfileNavigation;
