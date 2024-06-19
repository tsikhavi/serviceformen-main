import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";

import { ComponentType } from "../ComponentType";
import { ICurrency } from "../../../../types/core/currency";

import { ArrowDown as ArrowDownIcon } from "../../../../assets/ArrowDown";
import { ArrowUp as ArrowUpIcon } from "../../../../assets/ArrowUp";

interface ICurrenciesSelectorProps {
  activeComponent: ComponentType;
  setActiveComponent: React.Dispatch<React.SetStateAction<ComponentType>>;
  setActiveTimeSelector: React.Dispatch<React.SetStateAction<number>>;
}

const CurrenciesSelector: React.FC<ICurrenciesSelectorProps> = ({
  activeComponent,
  setActiveComponent,
  setActiveTimeSelector,
}) => {
  const { t } = useTranslation();
  const { setModel } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);
  const currencies = useTypedSelector((state) => state.coreReducer.currencies);

  const handlerDropdownButtonOnClick = () => {
    setActiveTimeSelector(-1);
    setActiveComponent(
      activeComponent === ComponentType.CurrenciesSelector ? ComponentType.None : ComponentType.CurrenciesSelector
    );
  };

  const handlerCurrencyOnClick = (currency: ICurrency) => {
    setModel({ ...model, currency_id: currency.id });
    setActiveComponent(ComponentType.None);
  };

  return (
    <div
      className={`${globalStyles.dropdown} ${
        activeComponent === ComponentType.CurrenciesSelector ? globalStyles.active : ""
      }`}
    >
      <div className={globalStyles.main}>
        <div className={globalStyles.label}>{t("model.currency")}</div>
        <div className={globalStyles.dropdown_button} onClick={handlerDropdownButtonOnClick}>
          {model.currency_id === -1
            ? ""
            : currencies.find((currency: ICurrency) => currency.id === model.currency_id)?.currency +
              " (" +
              currencies.find((currency: ICurrency) => currency.id === model.currency_id)?.symbol +
              ")"}
          {activeComponent === ComponentType.CurrenciesSelector ? <ArrowUpIcon /> : <ArrowDownIcon fill="#1B1B1B" />}
          <div className={globalStyles.required}>*</div>
        </div>
      </div>
      <div
        className={`${globalStyles.dropdown_container} ${
          activeComponent === ComponentType.CurrenciesSelector ? globalStyles.active : ""
        }`}
      >
        <div className={globalStyles.dropdown_list}>
          {currencies.map((currency: ICurrency) => (
            <div className={globalStyles.dropdown_item} onClick={() => handlerCurrencyOnClick(currency)}>
              {currency.currency + " (" + currency.symbol + ")"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrenciesSelector;
