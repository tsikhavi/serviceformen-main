import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";

import { ComponentType } from "../ComponentType";
import { IModelType } from "../../../../types/core/modelType";

interface IModelTypeSelectorProps {
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const ModelTypeSelector: React.FC<IModelTypeSelectorProps> = ({ setActiveComponent }) => {
  const { t, i18n } = useTranslation();
  const { setModel } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);
  const modelTypes = useTypedSelector((state) => state.coreReducer.modelTypes);

  return (
    <div className={globalStyles.radio_group_container} onClick={() => setActiveComponent(ComponentType.None)}>
      <div className={globalStyles.label}>{t("model.model_type")}</div>
      {modelTypes !== null && modelTypes.length > 0 && (
        <div className={globalStyles.radio_group}>
          {modelTypes.map((modelType: IModelType) => (
            <div className={globalStyles.item}>
              <div
                className={`${globalStyles.button} ${modelType.id === model.type_id ? globalStyles.active : ""}`}
                onClick={() => setModel({ ...model, type_id: modelType.id })}
              />
              {i18n.resolvedLanguage === "ru" ? modelType.type : modelType.type_eng}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModelTypeSelector;
