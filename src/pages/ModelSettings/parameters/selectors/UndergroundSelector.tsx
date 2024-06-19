/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";

import { ComponentType } from "../ComponentType";
import { IUnderground } from "../../../../types/core/underground";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";
import { Search as SearchIcon } from "../../../../assets/Search";

interface IUndergroundSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const UndergroundSelector: React.FC<IUndergroundSelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const { t, i18n } = useTranslation();
  const { setModel } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);
  const undergrounds = useTypedSelector((state) => state.coreReducer.undergrounds);
  const [filteredUndergrounds, setFilteredUndergrounds] = useState(undergrounds);
  const [searchedDistrict, setsearchedDistrict] = useState("");

  useEffect(() => {
    if (searchedDistrict.trim().length === 0) {
      setFilteredUndergrounds(undergrounds);
    } else {
      setFilteredUndergrounds(
        undergrounds.filter(
          (underground: IUnderground) =>
            underground.underground.toLowerCase().startsWith(searchedDistrict.toLowerCase()) ||
            underground.underground_eng.toLowerCase().startsWith(searchedDistrict.toLowerCase())
        )
      );
    }
  }, [searchedDistrict]);

  useEffect(() => {
    const usedName = i18n.resolvedLanguage === "ru" ? 'underground' : 'underground_eng'
    const undergroundsSorted = [...undergrounds].sort((a, b) => a[usedName].localeCompare(b[usedName]))
    setFilteredUndergrounds(undergroundsSorted);
  }, [undergrounds]);

  const handlerDropdownButtonOnClick = () => {
    if (filteredUndergrounds.length > 0)
      setActiveComponent(
        activeComponent === ComponentType.UndergroundSelector ? ComponentType.None : ComponentType.UndergroundSelector
      );
  };

  const handlerUndergroundOnClick = (underground: IUnderground) => {
    setModel({ ...model, underground_id: underground.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${globalStyles.dropdown} ${
        activeComponent === ComponentType.UndergroundSelector ? globalStyles.active : ""
      }`}
    >
      <div className={globalStyles.main}>
        <div className={globalStyles.label}>{t("global.underground")}</div>
        <div className={globalStyles.dropdown_button} onClick={handlerDropdownButtonOnClick}>
          {model.underground_id === -1
            ? ""
            : i18n.resolvedLanguage === "ru"
            ? undergrounds.find((underground: IUnderground) => underground.id === model.underground_id)?.underground
            : undergrounds.find((underground: IUnderground) => underground.id === model.underground_id)?.underground_eng}
          {activeComponent === ComponentType.UndergroundSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
      </div>
      <div
        className={`${globalStyles.dropdown_container} ${
          activeComponent === ComponentType.UndergroundSelector ? globalStyles.active : ""
        }`}
      >
        <div className={globalStyles.search_input}>
          <input
            type="name"
            placeholder={t("global.underground_search")}
            value={searchedDistrict}
            onChange={(event) => setsearchedDistrict(event.target.value)}
          />
          <SearchIcon fill="#98042D" />
        </div>
        <div className={globalStyles.dropdown_list}>
          {filteredUndergrounds.map((underground: IUnderground) => (
              <div className={globalStyles.dropdown_item} onClick={() => handlerUndergroundOnClick(underground)}>
                {i18n.resolvedLanguage === "ru" ? underground.underground : underground.underground_eng}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UndergroundSelector;
