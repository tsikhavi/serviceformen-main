import Slider from "react-slider";
import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";
import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";

interface IWeightSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const WeightSelector: React.FC<IWeightSelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const { t } = useTranslation();
  const { setFilter } = useActions();
  const filter = useTypedSelector((state) => state.modelReducer.filter);

  return (
    <div className={`${styles.filters_group} ${activeComponent === ComponentType.WeightSelector ? styles.active : ""}`}>
      <div
        className={styles.group_name}
        onClick={() =>
          setActiveComponent(
            activeComponent === ComponentType.WeightSelector ? ComponentType.None : ComponentType.WeightSelector
          )
        }
      >
        {t("model.weight")}
        {activeComponent === ComponentType.WeightSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        {filter.minWeight > 40 || filter.maxWeight < 125 ? <div className={styles.group_count} /> : null}
      </div>
      <div className={styles.filters_list}>
        <div className={globalStyles.range_slider}>
          <Slider
            className={globalStyles.slider}
            value={[filter.minWeight, filter.maxWeight]}
            min={40}
            max={125}
            onChange={(selectedRange) => setFilter({ ...filter, minWeight: selectedRange[0], maxWeight: selectedRange[1] })}
          />
        </div>
        <div className={styles.slider_value}>
          {`${t("global.from")} ${filter.minWeight} ${t("global.to")} ${filter.maxWeight} ${t("model.kg")}`}
        </div>
      </div>
    </div>
  );
};

export default WeightSelector;
