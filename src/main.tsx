//import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import { HelmetProvider } from 'react-helmet-async';

{/**import { useLocation } from "react-router-dom";
import ym from "react-yandex-metrika";
import ReactGA from 'react-ga'*/}
import { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";


import App from './App';
import { store } from './store/store';
import './utils/i18n';


{/**
ReactGA.initialize(googleAnalyticsId);

const yandexMetricaIdString = process.env.REACT_APP_YANDEX_METRICA_ID;

if (!yandexMetricaIdString) {
  throw new Error("REACT_APP_YANDEX_METRICA_ID is not defined");
}

const yandexMetricaId = parseInt(yandexMetricaIdString, 10);

if (isNaN(yandexMetricaId)) {
  throw new Error("REACT_APP_YANDEX_METRICA_ID must be a valid number");
}

const TrackPageView = () => {
  const location = useLocation();

  React.useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
    ym('hit', location.pathname + location.search);
  }, [location]);

  return null;
};
 */}
// Get the root container element
//const rootContainer = document.getElementById('root');

{/**if (!rootContainer) {
  throw new Error("Root container element 'root' not found in the document");
}*/}

// Use createRoot to render your application
//const root = createRoot(rootContainer);



ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback="...loading">
      <HelmetProvider>
        <App />
        </HelmetProvider>
      </Suspense>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

