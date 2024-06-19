import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";

import { ComponentType } from "../ComponentType";
import { IProposalPlace } from "../../../../types/core/proposalPlace";
import { IModelProposalPlace } from "../../../../types/model/modelProposalPlace/modelProposalPlace";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";
import { Check as CheckIcon } from "../../../../assets/Check";

interface IProposalPlacesSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
}

const ProposalPlacesSelector: React.FC<IProposalPlacesSelectorProps> = ({ activeComponent, setActiveComponent }) => {
  const { t, i18n } = useTranslation();
  const { setModel } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);
  const proposalPlaces = useTypedSelector((state) => state.coreReducer.proposalPlaces);

  const handlerProposalPlaceOnClick = (proposalPlace: IProposalPlace) => {
    if (
      model.model_proposal_places.filter(
        (modelProposalPlace: IModelProposalPlace) => modelProposalPlace.place_id === proposalPlace.id
      ).length > 0
    ) {
      setModel({
        ...model,
        model_proposal_places: model.model_proposal_places.filter(
          (modelProposalPlace: IModelProposalPlace) => modelProposalPlace.place_id !== proposalPlace.id
        ),
      });
    } else {
      setModel({
        ...model,
        model_proposal_places: [
          ...model.model_proposal_places,
          { place_id: proposalPlace.id, model_id: model.id } as IModelProposalPlace,
        ],
      });
    }
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${globalStyles.dropdown} ${
        activeComponent === ComponentType.ProposalPlacesSelector ? globalStyles.active : ""
      }`}
    >
      <div className={`${globalStyles.main}`}>
        <div className={globalStyles.label}>{t("model.departure_to")}</div>
        <div
          className={globalStyles.dropdown_button}
          onClick={() =>
            setActiveComponent(
              activeComponent === ComponentType.ProposalPlacesSelector
                ? ComponentType.None
                : ComponentType.ProposalPlacesSelector
            )
          }
        >
          {model.model_proposal_places.length === 0
            ? t("global.not_selected_s")
            : `${t("global.selected")}: ` + model.model_proposal_places.length}
          {activeComponent === ComponentType.ProposalPlacesSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
        </div>
      </div>
      <div
        className={`${globalStyles.dropdown_container} ${
          activeComponent === ComponentType.ProposalPlacesSelector ? globalStyles.active : ""
        }`}
      >
        <div className={globalStyles.dropdown_list}>
          {proposalPlaces.map((proposalPlace: IProposalPlace) => (
            <label className={globalStyles.checkbox}>
              <input type="checkbox" />
              <span
                className={`${globalStyles.checkbox_mark} ${
                  model.model_proposal_places.filter(
                    (modelProposalPlace: IModelProposalPlace) => modelProposalPlace.place_id === proposalPlace.id
                  ).length > 0
                    ? globalStyles.active
                    : ""
                }`}
                aria-hidden="true"
                onClick={() => handlerProposalPlaceOnClick(proposalPlace)}
              >
                {model.model_proposal_places.filter(
                  (modelProposalPlace: IModelProposalPlace) => modelProposalPlace.place_id === proposalPlace.id
                ).length > 0 ? (
                  <CheckIcon fill="#98042D" />
                ) : null}
              </span>
              <div className={globalStyles.text}>
                {i18n.resolvedLanguage === "ru" ? proposalPlace.place : proposalPlace.place_eng}
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProposalPlacesSelector;
