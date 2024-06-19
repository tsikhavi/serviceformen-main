import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";
import styles from "../Filters.module.sass";

import { IModelType } from "../../../../types/core/modelType";

import { Check as CheckIcon } from "../../../../assets/Check";

const ModelTypesSelector = () => {
  const { i18n, t } = useTranslation();
  const { setFilter } = useActions();
  const filter = useTypedSelector((state) => state.modelReducer.filter);
  const modelTypes = useTypedSelector((state) => state.coreReducer.modelTypes);

  return (
    <div className={`${styles.filters_group} ${styles.active}`}>
      <div className={styles.filters_list}>
        <div className={styles.filter_item}>
          <label className={globalStyles.checkbox}>
            <input type="checkbox" />
            <span
              className={`${globalStyles.checkbox_mark} ${
                filter.modelTypes.filter((item: number) => item === modelTypes.length + 1).length > 0
                  ? globalStyles.active
                  : ""
              }`}
              aria-hidden="true"
              onClick={() => {
                if (filter.modelTypes.filter((item: number) => item === modelTypes.length + 1).length > 0) {
                  setFilter({
                    ...filter,
                    modelTypes: filter.modelTypes.filter((item: number) => item !== modelTypes.length + 1),
                  });
                } else {
                  setFilter({
                    ...filter,
                    modelTypes: [...filter.modelTypes, modelTypes.length + 1],
                  });
                }
              }}
            >
              {filter.modelTypes.filter((item: number) => item === modelTypes.length + 1).length > 0 ? (
                <CheckIcon fill="#98042D" />
              ) : null}
            </span>
            <div className={globalStyles.text}>{t("navigation.new")}</div>
          </label>
        </div>

        <div className={styles.filter_item}>
          <label className={globalStyles.checkbox}>
            <input type="checkbox" />
            <span
              className={`${globalStyles.checkbox_mark} ${
                filter.modelTypes.filter((item: number) => item === modelTypes.length + 2).length > 0
                  ? globalStyles.active
                  : ""
              }`}
              aria-hidden="true"
              onClick={() => {
                if (filter.modelTypes.filter((item: number) => item === modelTypes.length + 2).length > 0) {
                  setFilter({
                    ...filter,
                    modelTypes: filter.modelTypes.filter((item: number) => item !== modelTypes.length + 2),
                  });
                } else {
                  setFilter({
                    ...filter,
                    modelTypes: [...filter.modelTypes, modelTypes.length + 2],
                  });
                }
              }}
            >
              {filter.modelTypes.filter((item: number) => item === modelTypes.length + 2).length > 0 ? (
                <CheckIcon fill="#98042D" />
              ) : null}
            </span>
            <div className={globalStyles.text}>{t("navigation.verified")}</div>
          </label>
        </div>
        {modelTypes.map((modelType: IModelType) => (
          <div className={styles.filter_item}>
            <label className={globalStyles.checkbox}>
              <input type="checkbox" />
              <span
                className={`${globalStyles.checkbox_mark} ${
                  filter.modelTypes.filter((item: number) => item === modelType.id).length > 0 ? globalStyles.active : ""
                }`}
                aria-hidden="true"
                onClick={() => {
                  if (filter.modelTypes.filter((item: number) => item === modelType.id).length > 0) {
                    setFilter({
                      ...filter,
                      modelTypes: filter.modelTypes.filter((item: number) => item !== modelType.id),
                    });
                  } else {
                    setFilter({
                      ...filter,
                      modelTypes: [...filter.modelTypes, modelType.id],
                    });
                  }
                }}
              >
                {filter.modelTypes.filter((item: number) => item === modelType.id).length > 0 ? (
                  <CheckIcon fill="#98042D" />
                ) : null}
              </span>
              <div className={globalStyles.text}>{i18n.resolvedLanguage === "ru" ? modelType.type : modelType.type_eng}</div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelTypesSelector;
