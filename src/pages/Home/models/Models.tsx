import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

import styles from "./Models.module.sass";

import HomeModel from "../../../components/HomeModel/HomeModel";

import { ViewType } from "./ViewType";

import { IModel } from "../../../types/model/model/model";
import { initFilter } from "../../../types/model/filter/initFilter";
import { IModelService } from "../../../types/model/modelService/modelService";
import { IModelPiercing } from "../../../types/model/piercing/modelPiercing";
import { IMeetingPlace } from "../../../types/core/meetingPlace";
import { ITarif } from "../../../types/model/tarif/tarif";
import { IModelLanguage } from "../../../types/model/language/modelLanguage";

import { Filter as FilterIcon } from "../../../assets/Filter";
import { Grid as GridIcon } from "../../../assets/Grid";
import { List as ListIcon } from "../../../assets/List";
import { Close as CloseIcon } from "../../../assets/Close";

interface IModelsProps {
  isFiltersActive: boolean;
  setIsFiltersActive: React.Dispatch<React.SetStateAction<boolean>>;
  forModerator: boolean;
}

const Models: React.FC<IModelsProps> = ({ isFiltersActive, setIsFiltersActive, forModerator = false }) => {
  const { t } = useTranslation();
  const { setFilter } = useActions();
  const filteredModels = useTypedSelector((state) => state.modelReducer.filteredModels);
  const filter = useTypedSelector((state) => state.modelReducer.filter);
  const modelTypes = useTypedSelector((state) => state.coreReducer.modelTypes);
  const windowSize = useTypedSelector((state) => state.mainReducer.windowSize);
  const meetingPlaces = useTypedSelector((state) => state.coreReducer.meetingPlaces);
  const [viewType, setViewType] = useState(ViewType.ListView);
  const [modelsList, setModelsList] = useState(filteredModels);
  const [isFiltersSet, setIsFiltersSet] = useState(false);
  const countModelsOnPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

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
        filter.undergrounds.length;
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

  useEffect(() => {
    if (filteredModels !== undefined && filter !== undefined) {
      setModelsList(
        filteredModels.filter(
          (model: IModel) =>
            (forModerator ? true : model.is_enable_by_moderator) &&
            (forModerator ? true : model.photos.length && model.photos.length > 0) &&
            (forModerator ? true : model.is_enable_by_moderator) &&
            model.name.toLowerCase().startsWith(filter.searchedModel.toLowerCase()) &&
            model.age >= filter.minAge &&
            model.age <= filter.maxAge &&
            model.weight >= filter.minWeight &&
            model.weight <= filter.maxWeight &&
            model.height >= filter.minHeight &&
            model.height <= filter.maxHeight &&
            (filter.countries !== undefined && filter.countries.length > 0
              ? filter.countries.includes(model.country_id)
              : true) &&
            (filter.selectedCountry !== undefined && filter.selectedCountry.id > -1
              ? model.country_id === filter.selectedCountry.id
              : true) &&
            (filter.cities !== undefined && filter.cities.length > 0 ? filter.cities.includes(model.city_id) : true) &&
            (filter.selectedCity !== undefined && filter.selectedCity.id > -1
              ? model.city_id === filter.selectedCity.id
              : true) &&
            (filter.districts !== undefined && filter.districts.length > 0
              ? filter.districts.includes(model.district_id)
              : true) &&
            (filter.undergrounds !== undefined && filter.undergrounds.length > 0
              ? filter.undergrounds.includes(model.underground_id)
              : true) &&
            (filter.modelTypes !== undefined &&
            filter.modelTypes.filter((value: number) => value !== modelTypes.length + 1 && value !== modelTypes.length + 2)
              .length > 0
              ? filter.modelTypes
                  .filter((value: number) => value !== modelTypes.length + 1 && value !== modelTypes.length + 2)
                  .includes(model.type_id)
              : true) &&
            (filter.hairColors !== undefined && filter.hairColors.length > 0
              ? filter.hairColors.includes(model.hair_color_id)
              : true) &&
            (filter.hairSizes !== undefined && filter.hairSizes.length > 0
              ? filter.hairSizes.includes(model.hair_size_id)
              : true) &&
            (filter.pubisHairs !== undefined && filter.pubisHairs.length > 0
              ? filter.pubisHairs.includes(model.pubis_hair_id)
              : true) &&
            (filter.breastSizes !== undefined && filter.breastSizes.length > 0
              ? filter.breastSizes.includes(model.breast_size_id)
              : true) &&
            (filter.breastTypes !== undefined && filter.breastTypes.length > 0
              ? filter.breastTypes.includes(model.breast_type_id)
              : true) &&
            (filter.trips !== undefined && filter.trips.length > 0 ? filter.trips.includes(model.trip_id) : true) && //meetingPlaces piercings tarifs
            (filter.ethnicGroups !== undefined && filter.ethnicGroups.length > 0
              ? filter.ethnicGroups.includes(model.ethnic_group_id)
              : true) &&
            (filter.nationalities !== undefined && filter.nationalities.length > 0
              ? filter.nationalities.includes(model.nationality_id)
              : true) &&
            (filter.smookers !== undefined && filter.smookers.length > 0
              ? filter.smookers.includes(model.smooker_id)
              : true) &&
            (filter.tatoos !== undefined && filter.tatoos.length > 0 ? filter.tatoos.includes(model.tatoo_id) : true) &&
            (filter.eyesColors !== undefined && filter.eyesColors.length > 0
              ? filter.eyesColors.includes(model.eyes_color_id)
              : true) &&
            (filter.orientations !== undefined && filter.orientations.length > 0
              ? filter.orientations.includes(model.orientation_id)
              : true) &&
            (filter.services !== undefined && filter.services.length > 0
              ? filter.services.every((service) =>
                  model.model_services.map((modelService: IModelService) => modelService.service_id).includes(service)
                )
              : true) &&
            (filter.piercings !== undefined && filter.piercings.length > 0
              ? filter.piercings.every((piercing) =>
                  model.model_piercings.map((modelPiercing: IModelPiercing) => modelPiercing.piercing_id).includes(piercing)
                )
              : true) &&
            (filter.languages !== undefined && filter.languages.length > 0
              ? filter.languages.every((language) =>
                  model.model_languages.map((modelLanguage: IModelLanguage) => modelLanguage.language_id).includes(language)
                )
              : true) &&
            (filter.meetingPlaces === undefined ||
            filter.orientations.length === 0 ||
            meetingPlaces.find((meetingPlace: IMeetingPlace) => meetingPlace.id === model.meeting_place_id)!
              .meeting_place === "Аппартаменты + Выезд"
              ? true
              : filter.meetingPlaces.includes(model.meeting_place_id)) &&
            (filter.tarifs !== undefined && filter.tarifs.length > 0
              ? filter.tarifs.filter(
                  (tarif: number[]) =>
                    model.tarifs.map((modelTarif: ITarif) => modelTarif.work_duration_id).includes(tarif[0]) &&
                    model.tarifs.find((modelTarif: ITarif) => modelTarif.work_duration_id === tarif[0])!.price >= tarif[1] &&
                    model.tarifs.find((modelTarif: ITarif) => modelTarif.work_duration_id === tarif[0])!.price <= tarif[2]
                ).length === filter.tarifs.length
              : true) &&
            (filter.modelTypes !== undefined &&
            filter.modelTypes.length > 0 &&
            filter.modelTypes.includes(modelTypes.length + 1)
              ? calcIsNew(model.create_date)
              : true) &&
            (filter.modelTypes !== undefined &&
            filter.modelTypes.length > 0 &&
            filter.modelTypes.includes(modelTypes.length + 2)
              ? model.is_verified
              : true)
        )
      );
    }
  }, [filter]);

  useEffect(() => {
    setModelsList(filteredModels);
    setFilter(initFilter());
  }, [filteredModels]);

  const calcIsNew = (create_date: Date) => {
    var now = new Date();
    var createDate = new Date(create_date);
    var difference = Math.abs(now.getTime() - createDate.getTime()) / (1000 * 60 * 60 * 24);
    return difference <= 7;
  };

  return (
    <div className={styles.models_wrapper}>
      <div className={styles.toggles}>
        <div
          className={styles.toggle}
          onClick={() => setViewType(viewType === ViewType.ListView ? ViewType.GridView : ViewType.ListView)}
        >
          {viewType === ViewType.GridView ? <GridIcon /> : <ListIcon />}
          {windowSize.innerWidth > 1200 && (viewType === ViewType.ListView ? t("global.list_view") : t("global.grid_view"))}
        </div>
        {windowSize.innerWidth < 1201 && (
          <>
            <div className={styles.toggle} onClick={() => setIsFiltersActive(!isFiltersActive)}>
              <FilterIcon />
              {t("global.filter")}
            </div>
            {isFiltersSet ? (
              <button type="button" className={styles.close} onClick={() => setFilter(initFilter())}>
                <CloseIcon fill="#FFFFFF" />
              </button>
            ) : null}
          </>
        )}
      </div>
      <div className={`${styles.models} ${viewType === ViewType.ListView ? styles.list : styles.grid}`}>
        {modelsList
          .slice((currentPage - 1) * countModelsOnPage, (currentPage - 1) * countModelsOnPage + countModelsOnPage)
          .map((model: IModel) => (
            <HomeModel model={model} viewType={viewType} forModerator={forModerator} />
          ))}
      </div>
      {modelsList.length > countModelsOnPage ? (
        <>
          {Math.ceil(modelsList.length / countModelsOnPage) > 7 ? (
            <div className={styles.pagination}>
              <div className={`${styles.page} ${currentPage === 1 ? styles.active : ""}`} onClick={() => setCurrentPage(1)}>
                1
              </div>
              {currentPage < 4 ? (
                <div
                  className={`${styles.page} ${currentPage === 2 ? styles.active : ""}`}
                  onClick={() => setCurrentPage(2)}
                >
                  2
                </div>
              ) : (
                <div className={styles.separator}>...</div>
              )}
              <>
                {currentPage < 4
                  ? Array(3)
                      .fill(1)
                      .map((_value, index: number) => (
                        <div
                          className={`${styles.page} ${currentPage === 3 + index ? styles.active : ""}`}
                          onClick={() => setCurrentPage(3 + index)}
                        >
                          {3 + index}
                        </div>
                      ))
                  : null}
                {currentPage > Math.ceil(modelsList.length / countModelsOnPage) - 3
                  ? Array(3)
                      .fill(1)
                      .map((_value, index: number) => (
                        <div
                          className={`${styles.page} ${
                            currentPage === Math.ceil(modelsList.length / countModelsOnPage) - 4 + index ? styles.active : ""
                          }`}
                          onClick={() => setCurrentPage(modelsList.length / countModelsOnPage - 4 + index)}
                        >
                          {modelsList.length / countModelsOnPage - 4 + index}
                        </div>
                      ))
                  : null}
                {currentPage > 3 && currentPage < Math.ceil(modelsList.length / countModelsOnPage) - 2
                  ? Array(3)
                      .fill(1)
                      .map((_value, index: number) => (
                        <div
                          className={`${styles.page} ${currentPage === currentPage - 1 + index ? styles.active : ""}`}
                          onClick={() => setCurrentPage(currentPage - 1 + index)}
                        >
                          {currentPage - 1 + index}
                        </div>
                      ))
                  : null}
              </>
              {currentPage > Math.ceil(modelsList.length / countModelsOnPage) - 3 ? (
                <div
                  className={`${styles.page} ${
                    currentPage === Math.ceil(modelsList.length / countModelsOnPage) - 1 ? styles.active : ""
                  }`}
                  onClick={() => setCurrentPage(modelsList.length / countModelsOnPage - 1)}
                >
                  {modelsList.length / countModelsOnPage - 1}
                </div>
              ) : (
                <div className={styles.separator}>...</div>
              )}
              <div
                className={`${styles.page} ${
                  currentPage === Math.ceil(modelsList.length / countModelsOnPage) ? styles.active : ""
                }`}
                onClick={() => setCurrentPage(modelsList.length / countModelsOnPage)}
              >
                {modelsList.length / countModelsOnPage}
              </div>
            </div>
          ) : (
            <div className={styles.pagination}>
              {Array(Math.ceil(modelsList.length / countModelsOnPage))
                .fill(1)
                .map((_value, index: number) => (
                  <div
                    className={`${styles.page} ${currentPage === index + 1 ? styles.active : ""}`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </div>
                ))}
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default Models;
