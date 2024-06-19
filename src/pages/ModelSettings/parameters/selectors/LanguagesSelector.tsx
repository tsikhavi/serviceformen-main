import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";

import { ComponentType } from "../ComponentType";
import { ILanguage } from "../../../../types/model/language/language";
import { IModelLanguage } from "../../../../types/model/language/modelLanguage";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";
import { Check as CheckIcon } from "../../../../assets/Check";

interface ILanguagesSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const languagesSelector: React.FC<ILanguagesSelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const { t, i18n } = useTranslation();
  const { setModel } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);
  const languages = useTypedSelector((state) => state.coreReducer.languages);

  const handlerlanguageOnClick = (language: ILanguage) => {
    if (
      model.model_languages.filter((modelLanguage: IModelLanguage) => modelLanguage.language_id === language.id).length > 0
    ) {
      setModel({
        ...model,
        model_languages: model.model_languages.filter(
          (modelLanguage: IModelLanguage) => modelLanguage.language_id !== language.id
        ),
      });
    } else {
      setModel({
        ...model,
        model_languages: [...model.model_languages, { language_id: language.id, model_id: model.id } as IModelLanguage],
      });
    }
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${globalStyles.dropdown} ${
        activeComponent === ComponentType.languagesSelector ? globalStyles.active : ""
      }`}
    >
      <div className={globalStyles.main}>
        <div className={globalStyles.label}>{t("model.languages")}</div>
        <div
          className={globalStyles.dropdown_button}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.languagesSelector ? ComponentType.None : ComponentType.languagesSelector
            )
          }
        >
          {model.model_languages.length === 0
            ? t("global.not_selected")
            : `${t("global.selected")}: ` + model.model_languages.length}
          {activeComponent === ComponentType.languagesSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
      </div>

      <div
        className={`${globalStyles.dropdown_container} ${
          activeComponent === ComponentType.languagesSelector ? globalStyles.active : ""
        }`}
      >
        <div className={globalStyles.dropdown_list}>
          {languages.map((language: ILanguage) => (
            <label className={globalStyles.checkbox}>
              <input type="checkbox" />
              <span
                className={`${globalStyles.checkbox_mark} ${
                  model.model_languages.filter((modelLanguage: IModelLanguage) => modelLanguage.language_id === language.id)
                    .length > 0
                    ? globalStyles.active
                    : ""
                }`}
                aria-hidden="true"
                onClick={() => handlerlanguageOnClick(language)}
              >
                {model.model_languages.filter((modelLanguage: IModelLanguage) => modelLanguage.language_id === language.id)
                  .length > 0 ? (
                  <CheckIcon fill="#98042D" />
                ) : null}
              </span>
              <div className={globalStyles.text}>
                {i18n.resolvedLanguage === "ru" ? language.language : language.language_eng}
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default languagesSelector;
