/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";

import { ComponentType } from "../ComponentType";
import { IDistrict } from "../../../../types/core/district";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";
import { Search as SearchIcon } from "../../../../assets/Search";

interface IDistrictSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const DistrictSelector: React.FC<IDistrictSelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const { t, i18n } = useTranslation();
  const { setModel } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);
  const districts = useTypedSelector((state) => state.coreReducer.districts);
  const [filteredDistricts, setFilteredDistricts] = useState(districts);
  const [searchedDistrict, setSearchedDistrict] = useState("");

  useEffect(() => {
    if (searchedDistrict.trim().length === 0) {
      setFilteredDistricts(districts);
    } else {
      setFilteredDistricts(
        districts.filter(
          (district: IDistrict) =>
            district.district.toLowerCase().startsWith(searchedDistrict.toLowerCase()) ||
            district.district_eng.toLowerCase().startsWith(searchedDistrict.toLowerCase())
        )
      );
    }
  }, [searchedDistrict]);

  useEffect(() => {
    const usedName = i18n.resolvedLanguage === "ru" ? 'district' : 'district_eng'
    const districtsSorted = [...districts].sort((a, b) => a[usedName].localeCompare(b[usedName]))
    setFilteredDistricts(districtsSorted);
  }, [districts]);

  const handlerDropdownButtonOnClick = () => {
    if (filteredDistricts.length > 0)
      setActiveComponent(
        activeComponent === ComponentType.DistrictSelector ? ComponentType.None : ComponentType.DistrictSelector
      );
  };

  const handlerDistrictOnClick = (district: IDistrict) => {
    setModel({ ...model, district_id: district.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${globalStyles.dropdown} ${activeComponent === ComponentType.DistrictSelector ? globalStyles.active : ""}`}
    >
      <div className={globalStyles.main}>
        <div className={globalStyles.label}>{t("global.district")}</div>
        <div className={globalStyles.dropdown_button} onClick={handlerDropdownButtonOnClick}>
          {model.district_id === -1
            ? ""
            : i18n.resolvedLanguage === "ru"
            ? districts.find((district: IDistrict) => district.id === model.district_id)?.district
            : districts.find((district: IDistrict) => district.id === model.district_id)?.district_eng}
          {activeComponent === ComponentType.DistrictSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
      </div>
      <div
        className={`${globalStyles.dropdown_container} ${
          activeComponent === ComponentType.DistrictSelector ? globalStyles.active : ""
        }`}
      >
        <div className={globalStyles.search_input}>
          <input
            type="name"
            placeholder={t("global.district_search")}
            value={searchedDistrict}
            onChange={(event) => setSearchedDistrict(event.target.value)}
          />
          <SearchIcon fill="#98042D" />
        </div>
        <div className={globalStyles.dropdown_list}>
          {filteredDistricts.map((district: IDistrict) => (
              <div className={globalStyles.dropdown_item} onClick={() => handlerDistrictOnClick(district)}>
                {i18n.resolvedLanguage === "ru" ? district.district : district.district_eng}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DistrictSelector;
