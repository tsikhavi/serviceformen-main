import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

import styles from "./Search.module.sass";

import { ComponentType } from "../ComponentType";

import { Search as SearchIcon } from "../../../assets/Search";
import { Close as CloseIcon } from "../../../assets/Close";
import { useTranslation } from "react-i18next";

interface ISearchProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const Search: React.FC<ISearchProps> = ({ activeComponent, setActiveComponent }) => {
  const { t } = useTranslation();
  const { setFilter } = useActions();
  const windowSize = useTypedSelector((state) => state.mainReducer.windowSize);
  const filter = useTypedSelector((state) => state.modelReducer.filter);

  const handlerCloseOnClick = () => {
    setActiveComponent(activeComponent === ComponentType.Search ? ComponentType.None : ComponentType.Search);
    setFilter({ ...filter, searchedModel: "" });
  };

  return (
    <div className={`${styles.search} ${activeComponent === ComponentType.Search ? styles.active : ""}`}>
      <div className={styles.search_input}>
        <input
          type="name"
          placeholder={t("global.search")}
          value={filter.searchedModel}
          onChange={(event) =>
            setFilter({ ...filter, searchedModel: event.target.value.trim().length === 0 ? "" : event.target.value })
          }
        />
        <div className={styles.search_icon}>
          <SearchIcon fill="#98042D" />
        </div>
        <div
          className={styles.close}
          onClick={() =>
            setActiveComponent(activeComponent === ComponentType.Search ? ComponentType.None : ComponentType.Search)
          }
        >
          <CloseIcon fill="#FFFFFF" />
        </div>
      </div>
      <div className={styles.search_label} onClick={handlerCloseOnClick}>
        <SearchIcon fill="#FFFFFF" />
        {windowSize.innerWidth > 1200 && <div className={styles.search_link}>{t("global.search")}</div>}
      </div>
    </div>
  );
};

export default Search;
