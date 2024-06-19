import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

import globalStyles from "../../../App.module.sass";
import pageStyles from "../ModelSettings.module.sass";
import styles from "./Services.module.sass";

import MessageModal from "../../../components/Modals/MessageModal";

import { IServiceCategory } from "../../../types/core/serviceCategory";
import { IService } from "../../../types/core/service";
import { ICurrency } from "../../../types/core/currency";
import { IModelService } from "../../../types/model/modelService/modelService";
import { ServerStatusType } from "../../../enums/serverStatusType";
import { initServerStatus } from "../../../types/main/serverStatus";

import { Check as CheckIcon } from "../../../assets/Check";

const Services = () => {
  const { t, i18n } = useTranslation();
  const { setModel, getModels, addModelServices, setModelServiceStatus } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);
  const profile = useTypedSelector((state) => state.profileReducer.profile);
  const modelServiceStatus = useTypedSelector((state) => state.modelServiceReducer.serverStatus);
  const currencies = useTypedSelector((state) => state.coreReducer.currencies);
  const serviceCategories = useTypedSelector((state) => state.coreReducer.serviceCategories);
  const [modelServices, setModelServices] = useState([] as IModelService[]);
  const [isMessageModalShow, setIsMessageModalShow] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    document.title = `${t("model.model")} | ${t("model.services")}`;
  }, []);

  useEffect(() => {
    document.title = `${t("model.model")} | ${t("model.services")}`;
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    var tmpServices = [] as IModelService[];
    serviceCategories.map((serviceCategory: IServiceCategory) =>
      serviceCategory.services.map((service: IService) =>
        tmpServices.push({
          id:
            model.model_services.filter((modelService: IModelService) => modelService.service_id === service.id).length > 0
              ? model.model_services.find((modelService: IModelService) => modelService.service_id === service.id)!.id
              : model.model_services.length === 0
              ? service.id
              : Math.max(...model.model_services.map((modelService: IModelService) => modelService.id)) + service.id,
          category_id: serviceCategory.id,
          service_id: service.id,
          model_id: model.id,
          price:
            model.model_services.filter((modelService: IModelService) => modelService.service_id === service.id).length > 0
              ? model.model_services.find((modelService: IModelService) => modelService.service_id === service.id)!.price
              : -1,
        } as IModelService)
      )
    );
    setModelServices(tmpServices);
  }, [model.model_services]);

  useEffect(() => {
    if (modelServiceStatus.status === ServerStatusType.Success) {
      setInfoMessage(t("global.data_successfully_updated"));
      setModelServiceStatus(initServerStatus());
      setIsMessageModalShow(true);
      window.scrollTo({ top: 0 });
      getModels({ profile_id: profile.id });
    }
    if (modelServiceStatus.status === ServerStatusType.Error) {
      setInfoMessage(modelServiceStatus.error);
      setModelServiceStatus(initServerStatus());
      setIsMessageModalShow(true);
    }
  }, [modelServiceStatus]);

  const handleChangeModelService = (modelService: IModelService) => {
    const tmpModelServices = modelServices.map((tmpModelService: IModelService) => {
      if (tmpModelService.id === modelService.id) {
        return {
          ...tmpModelService,
          price: modelService.price,
        } as IModelService;
      } else return tmpModelService;
    });
    setModelServices(tmpModelServices);
    setModel({
      ...model,
      model_services: tmpModelServices.filter((modelService: IModelService) => modelService.price > -1),
    });
  };

  const handleChangeModelServicePrice = (event, modelService: IModelService) => {
    handleChangeModelService({
      ...modelService,
      price:
        Number.isNaN(Number(event.target.value)) || Number(event.target.value) < 0
          ? modelService.price
          : Number(event.target.value),
    });
  };

  const handleSaveClick = () => {
    addModelServices({ model_id: model.id, model_services: model.model_services });
  };

  return (
    <div className={pageStyles.content}>
      <div className={pageStyles.title}>{t("model.services")}</div>
      <div className={styles.info}>
        {t("model.to_indicate_extra_charge")} <span>0</span>
      </div>
      <div className={styles.services_container}>
        {serviceCategories.map((serviceCategory: IServiceCategory) => (
          <div className={styles.services_group}>
            <div className={styles.services_category}>
              {i18n.resolvedLanguage === "ru" ? serviceCategory.service_category : serviceCategory.service_category_eng}
            </div>
            <div className={styles.services_list}>
              {modelServices
                .filter((modelService: IModelService) => modelService.category_id === serviceCategory.id)
                .map((modelService: IModelService) => (
                  <div className={styles.service}>
                    <div className={styles.check_part}>
                      <label className={globalStyles.checkbox}>
                        <input type="checkbox" />
                        <span
                          className={`${globalStyles.checkbox_mark} ${globalStyles.white} ${
                            modelService.price > -1 ? globalStyles.active : ""
                          }`}
                          aria-hidden="true"
                          onClick={() =>
                            handleChangeModelService({ ...modelService, price: modelService.price > -1 ? -1 : 0 })
                          }
                        >
                          {modelService.price > -1 && <CheckIcon fill="#98042D" />}
                        </span>
                        <div className={globalStyles.text}>
                          {i18n.resolvedLanguage === "ru"
                            ? serviceCategory.services.find((service: IService) => service.id === modelService.service_id)
                                ?.service
                            : serviceCategory.services.find((service: IService) => service.id === modelService.service_id)
                                ?.service_eng}
                        </div>
                      </label>
                    </div>
                    {modelService.price > -1 && (
                      <div className={styles.input_part}>
                        {
                          <input
                            type="text"
                            placeholder=""
                            value={modelService.price}
                            onChange={(event) => handleChangeModelServicePrice(event, modelService)}
                          />
                        }
                        {currencies.find((currency: ICurrency) => currency.id === model.currency_id)?.symbol}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <button type="button" onClick={handleSaveClick}>
        {t("global.save")}
      </button>
      <MessageModal
        text={infoMessage}
        buttonText={t("global.ok")}
        handlerButtonClick={() => setIsMessageModalShow(false)}
        isShow={isMessageModalShow}
      />
    </div>
  );
};

export default Services;
