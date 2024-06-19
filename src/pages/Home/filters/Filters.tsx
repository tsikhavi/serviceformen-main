import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

import styles from "./Filters.module.sass";

import ModelTypesSelector from "./selectors/ModelTypesSelector";
import DistrictsSelector from "./selectors/DistrictsSelector";
import UndergroundsSelector from "./selectors/UndergroundsSelector";
import HairsSelector from "./selectors/HairsSelector";
import BreastsSelector from "./selectors/BreastsSelector";
import TripsSelector from "./selectors/TripsSelector";
import WeightSelector from "./selectors/WeightSelector";
import HeightSelector from "./selectors/HeightSelector";
import ServicesSelector from "./selectors/ServicesSelector";
import EthnicGroupsSelector from "./selectors/EthnicGroupsSelector";
import LanguagesSelector from "./selectors/LanguagesSelector";
import PreferencesSelector from "./selectors/PreferencesSelector";
import AgeSelector from "./selectors/AgeSelector";
import TarifsSelector from "./selectors/TarifsSelector";
import OrientationsSelector from "./selectors/OrientationSelector";

import { ComponentType } from "./ComponentType";

import { initFilter } from "../../../types/model/filter/initFilter";

import { Filter as FilterIcon } from "../../../assets/Filter";
import { Close as CloseIcon } from "../../../assets/Close";

interface IFiltersProps {
  isFiltersActive: boolean;
  setIsFiltersActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Filters: React.FC<IFiltersProps> = ({ isFiltersActive, setIsFiltersActive }) => {
  const { t } = useTranslation();
  const { setFilter } = useActions();
  const filter = useTypedSelector((state) => state.modelReducer.filter);
  const windowSize = useTypedSelector((state) => state.mainReducer.windowSize);
  const [activeComponent, setActiveComponent] = useState(ComponentType.None);
  const [isFiltersSet, setIsFiltersSet] = useState(false);

  useEffect(() => {
    if (filter.countries !== undefined) {
      var count =
        filter.breastSizes.length +
        filter.breastTypes.length +
        filter.cities.length +
        filter.countries.length +
        filter.districts.length +
        filter.ethnicGroups.length +
        filter.eyesColors.length +
        filter.hairColors.length +
        filter.hairSizes.length +
        filter.meetingPlaces.length +
        filter.languages.length +
        filter.modelTypes.length +
        filter.nationalities.length +
        filter.orientations.length +
        filter.piercings.length +
        filter.piercings.length +
        filter.pubisHairs.length +
        filter.tatoos.length +
        filter.trips.length +
        filter.undergrounds.length +
        filter.tarifs.length;
      setIsFiltersSet(
        count > 0 ||
          filter.minAge !== 18 ||
          filter.maxAge !== 65 ||
          filter.minHeight !== 150 ||
          filter.maxHeight !== 220 ||
          filter.minWeight !== 40 ||
          filter.maxWeight !== 125
      );
    }
  }, [filter]);

  return (
    <div className={styles.filters_wrapper + " " + (isFiltersActive ? styles.active : styles.mobile)}>
      <div className={styles.filters_header}>
        <FilterIcon />
        {t("global.filter")}
        {isFiltersSet ? (
          <button type="button" onClick={() => setFilter(initFilter())}>
            {t("global.clear")}
          </button>
        ) : null}
      </div>
      <ModelTypesSelector />
      <OrientationsSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      {/*<CountriesSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <CitiesSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />*/}
      <DistrictsSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <UndergroundsSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <AgeSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <HairsSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <TarifsSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <BreastsSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <TripsSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <WeightSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <HeightSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <ServicesSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <EthnicGroupsSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <LanguagesSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <PreferencesSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      {isFiltersActive && windowSize.innerWidth < 1201 && (
        <div className={styles.close} onClick={() => setIsFiltersActive(false)}>
          <CloseIcon fill="#1B1B1B" />
          {t("global.close")}
        </div>
      )}
    </div>
  );
};

export default Filters;
