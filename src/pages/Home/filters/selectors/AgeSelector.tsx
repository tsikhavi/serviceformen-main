import Slider from "react-slider";
import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";
import styles from "../Filters.module.sass";

import { ComponentType } from "../ComponentType";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";

interface IAgeSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const AgeSelector: React.FC<IAgeSelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const { t } = useTranslation();
  const { setFilter } = useActions();
  const filter = useTypedSelector((state) => state.modelReducer.filter);

  return (
    <div className={`${styles.filters_group} ${activeComponent === ComponentType.AgeSelector ? styles.active : ""}`}>
      <div
        className={styles.group_name}
        onClick={() =>
          setActiveComponent(activeComponent === ComponentType.AgeSelector ? ComponentType.None : ComponentType.AgeSelector)
        }
      >
        {t("model.age")}
        {activeComponent === ComponentType.AgeSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        {filter.minAge > 18 || filter.maxAge < 65 ? <div className={styles.group_count} /> : null}
      </div>
      <div className={styles.filters_list}>
        <div className={globalStyles.range_slider}>
          <Slider
            className={globalStyles.slider}
            value={[filter.minAge, filter.maxAge]}
            min={18}
            max={65}
            onChange={(selectedRange) => setFilter({ ...filter, minAge: selectedRange[0], maxAge: selectedRange[1] })}
          />
        </div>
        <div className={styles.slider_value}>
          {`${t("global.from")} ${filter.minAge} ${t("global.to")} ${filter.maxAge}`}
        </div>
      </div>
    </div>
  );
};

export default AgeSelector;
