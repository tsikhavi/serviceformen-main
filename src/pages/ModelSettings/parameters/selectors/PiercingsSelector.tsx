import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";

import { ComponentType } from "../ComponentType";
import { IPiercing } from "../../../../types/model/piercing/piercing";
import { IModelPiercing } from "../../../../types/model/piercing/modelPiercing";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";
import { Check as CheckIcon } from "../../../../assets/Check";

interface IPiercingsSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  isCheckStart: boolean;
}

const PiercingsSelector: React.FC<IPiercingsSelectorProps> = ({ activeComponent, setActiveComponent, isCheckStart }) => {
  const { t, i18n } = useTranslation();
  const { setModel } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);
  const piercings = useTypedSelector((state) => state.coreReducer.piercings);

  const handlerPiercingOnClick = (piercing: IPiercing) => {
    if (
      model.model_piercings.filter((modelPiercing: IModelPiercing) => modelPiercing.piercing_id === piercing.id).length > 0
    ) {
      setModel({
        ...model,
        model_piercings: model.model_piercings.filter(
          (modelPiercing: IModelPiercing) => modelPiercing.piercing_id !== piercing.id
        ),
      });
    } else {
      if (
        piercing.id === 1 ||
        model.model_piercings.filter((modelPiercing: IModelPiercing) => modelPiercing.piercing_id === 1).length > 0
      ) {
        setModel({
          ...model,
          model_piercings: [{ piercing_id: piercing.id, model_id: model.id } as IModelPiercing],
        });
      } else {
        setModel({
          ...model,
          model_piercings: [...model.model_piercings, { piercing_id: piercing.id, model_id: model.id } as IModelPiercing],
        });
      }
    }
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${globalStyles.dropdown} ${
        activeComponent === ComponentType.PiercingsSelector ? globalStyles.active : ""
      } ${isCheckStart && model.model_piercings.length === 0 ? "wrong" : ""}`}
    >
      <div className={globalStyles.main}>
        <div className={globalStyles.label}>{t("model.piercing")}</div>
        <div
          className={`${globalStyles.dropdown_button} ${
            isCheckStart && model.model_piercings.length === 0 ? globalStyles.wrong : ""
          }`}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.PiercingsSelector ? ComponentType.None : ComponentType.PiercingsSelector
            )
          }
        >
          {model.model_piercings.length === 0
            ? t("global.not_selected")
            : `${t("global.selected")}: ` + model.model_piercings.length}
          {activeComponent === ComponentType.PiercingsSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
        <div className={globalStyles.required}>*</div>
      </div>
      <div
        className={`${globalStyles.dropdown_container} ${
          activeComponent === ComponentType.PiercingsSelector ? globalStyles.active : ""
        }`}
      >
        <div className={globalStyles.dropdown_list}>
          {piercings.map((piercing: IPiercing) => (
            <label className={globalStyles.checkbox}>
              <input type="checkbox" />
              <span
                className={`${globalStyles.checkbox_mark} ${
                  model.model_piercings.filter((modelPiercing: IModelPiercing) => modelPiercing.piercing_id === piercing.id)
                    .length > 0
                    ? globalStyles.active
                    : ""
                }`}
                aria-hidden="true"
                onClick={() => handlerPiercingOnClick(piercing)}
              >
                {model.model_piercings.filter((modelPiercing: IModelPiercing) => modelPiercing.piercing_id === piercing.id)
                  .length > 0 ? (
                  <CheckIcon fill="#98042D" />
                ) : null}
              </span>
              <div className={globalStyles.text}>
                {i18n.resolvedLanguage === "ru" ? piercing.piercing : piercing.piercing_eng}
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PiercingsSelector;
