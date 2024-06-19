import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";
import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";
import { ILanguage } from "../../../../types/model/language/language";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";
import { Check as CheckIcon } from "../../../../assets/Check";

interface ILanguagesSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const languagesSelector: React.FC<ILanguagesSelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const { t, i18n } = useTranslation();
  const { setFilter } = useActions();
  const filter = useTypedSelector((state) => state.modelReducer.filter);
  const languages = useTypedSelector((state) => state.coreReducer.languages);

  return (
    <div className={`${styles.filters_group} ${activeComponent === ComponentType.LanguagesSelector ? styles.active : ""}`}>
      <div
        className={styles.group_name}
        onClick={() =>
          setActiveComponent(
            activeComponent === ComponentType.LanguagesSelector ? ComponentType.None : ComponentType.LanguagesSelector
          )
        }
      >
        {t("model.languages")}
        {activeComponent === ComponentType.LanguagesSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        {filter.languages.length > 0 ? <div className={styles.group_count}>{filter.languages.length}</div> : null}
      </div>
      <div className={styles.filters_list}>
        {activeComponent === ComponentType.LanguagesSelector &&
          languages.map((language: ILanguage) => (
            <div className={styles.filter_item}>
              <label className={globalStyles.checkbox}>
                <input type="checkbox" />
                <span
                  className={`${globalStyles.checkbox_mark} ${
                    filter.languages.filter((item: number) => item === language.id).length > 0 ? globalStyles.active : ""
                  }`}
                  aria-hidden="true"
                  onClick={() => {
                    if (filter.languages.filter((item: number) => item === language.id).length > 0) {
                      setFilter({
                        ...filter,
                        languages: filter.languages.filter((item: number) => item !== language.id),
                      });
                    } else {
                      setFilter({
                        ...filter,
                        languages: [...filter.languages, language.id],
                      });
                    }
                  }}
                >
                  {filter.languages.filter((item: number) => item === language.id).length > 0 ? (
                    <CheckIcon fill="#98042D" />
                  ) : null}
                </span>
                <div className={globalStyles.text}>
                  {i18n.resolvedLanguage === "ru" ? language.language : language.language_eng}
                </div>
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};

export default languagesSelector;
