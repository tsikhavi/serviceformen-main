import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";
import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";
import { IHairColor } from "../../../../types/core/hairColor";
import { IHairSize } from "../../../../types/core/hairSize";
import { IPubisHair } from "../../../../types/core/pubisHair";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";
import { Check as CheckIcon } from "../../../../assets/Check";

interface IHairsSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const HairsSelector: React.FC<IHairsSelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const { t, i18n } = useTranslation();
  const { setFilter } = useActions();
  const filter = useTypedSelector((state) => state.modelReducer.filter);
  const hairSizes = useTypedSelector((state) => state.coreReducer.hairSizes);
  const hairColors = useTypedSelector((state) => state.coreReducer.hairColors);
  const pubisHairs = useTypedSelector((state) => state.coreReducer.pubisHairs);

  return (
    <div className={`${styles.filters_group} ${activeComponent === ComponentType.HairsSelector ? styles.active : ""}`}>
      <div
        className={styles.group_name}
        onClick={() =>
          setActiveComponent(
            activeComponent === ComponentType.HairsSelector ? ComponentType.None : ComponentType.HairsSelector
          )
        }
      >
        {t("model.hairs")}
        {activeComponent === ComponentType.HairsSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        {filter.hairSizes.length + filter.hairColors.length + filter.pubisHairs.length > 0 ? (
          <div className={styles.group_count}>
            {filter.hairSizes.length + filter.hairColors.length + filter.pubisHairs.length}
          </div>
        ) : null}
      </div>
      <div className={styles.filters_list}>
        <div style={{ width: "100%" }}>
          <div className={styles.group_sub_name}>{t("model.hair_color")}</div>
          <div className={styles.filters_list}>
            {activeComponent === ComponentType.HairsSelector &&
              hairColors.map((hairColor: IHairColor) => (
                <div className={styles.filter_item}>
                  <label className={globalStyles.checkbox}>
                    <input type="checkbox" />
                    <span
                      className={`${globalStyles.checkbox_mark} ${
                        filter.hairColors.filter((item: number) => item === hairColor.id).length > 0
                          ? globalStyles.active
                          : ""
                      }`}
                      aria-hidden="true"
                      onClick={() => {
                        if (filter.hairColors.filter((item: number) => item === hairColor.id).length > 0) {
                          setFilter({
                            ...filter,
                            hairColors: filter.hairColors.filter((item: number) => item !== hairColor.id),
                          });
                        } else {
                          setFilter({
                            ...filter,
                            hairColors: [...filter.hairColors, hairColor.id],
                          });
                        }
                      }}
                    >
                      {filter.hairColors.filter((item: number) => item === hairColor.id).length > 0 ? (
                        <CheckIcon fill="#98042D" />
                      ) : null}
                    </span>
                    <div className={globalStyles.text}>
                      {i18n.resolvedLanguage === "ru" ? hairColor.hair_color : hairColor.hair_color_eng}
                    </div>
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <div className={styles.group_sub_name}>{t("model.hair_size")}</div>
          <div className={styles.filters_list}>
            {activeComponent === ComponentType.HairsSelector &&
              hairSizes.map((hairSize: IHairSize) => (
                <div className={styles.filter_item}>
                  <label className={globalStyles.checkbox}>
                    <input type="checkbox" />
                    <span
                      className={`${globalStyles.checkbox_mark} ${
                        filter.hairSizes.filter((item: number) => item === hairSize.id).length > 0 ? globalStyles.active : ""
                      }`}
                      aria-hidden="true"
                      onClick={() => {
                        if (filter.hairSizes.filter((item: number) => item === hairSize.id).length > 0) {
                          setFilter({
                            ...filter,
                            hairSizes: filter.hairSizes.filter((item: number) => item !== hairSize.id),
                          });
                        } else {
                          setFilter({
                            ...filter,
                            hairSizes: [...filter.hairSizes, hairSize.id],
                          });
                        }
                      }}
                    >
                      {filter.hairSizes.filter((item: number) => item === hairSize.id).length > 0 ? (
                        <CheckIcon fill="#98042D" />
                      ) : null}
                    </span>
                    <div className={globalStyles.text}>
                      {i18n.resolvedLanguage === "ru" ? hairSize.hair_size : hairSize.hair_size_eng}
                    </div>
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <div className={styles.group_sub_name}>{t("model.pubic_hair")}</div>
          <div className={styles.filters_list}>
            {activeComponent === ComponentType.HairsSelector &&
              pubisHairs.map((pubisHair: IPubisHair) => (
                <div className={styles.filter_item}>
                  <label className={globalStyles.checkbox}>
                    <input type="checkbox" />
                    <span
                      className={`${globalStyles.checkbox_mark} ${
                        filter.pubisHairs.filter((item: number) => item === pubisHair.id).length > 0
                          ? globalStyles.active
                          : ""
                      }`}
                      aria-hidden="true"
                      onClick={() => {
                        if (filter.pubisHairs.filter((item: number) => item === pubisHair.id).length > 0) {
                          setFilter({
                            ...filter,
                            pubisHairs: filter.pubisHairs.filter((item: number) => item !== pubisHair.id),
                          });
                        } else {
                          setFilter({
                            ...filter,
                            pubisHairs: [...filter.pubisHairs, pubisHair.id],
                          });
                        }
                      }}
                    >
                      {filter.pubisHairs.filter((item: number) => item === pubisHair.id).length > 0 ? (
                        <CheckIcon fill="#98042D" />
                      ) : null}
                    </span>
                    <div className={globalStyles.text}>
                      {i18n.resolvedLanguage === "ru" ? pubisHair.pubis_hair : pubisHair.pubis_hair_eng}
                    </div>
                  </label>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HairsSelector;
