import './index.scss';
import App from './App';
import React from 'react';
import i18next from "i18next";
import ReactDOM from 'react-dom';
import store from './store/index';
import { Provider } from 'react-redux';
import 'fontsource-nunito-sans/latin.css';
import { I18nextProvider } from "react-i18next";
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import { Language } from './ts/enums/language.enum';
import englishTranslations from "./translations/en/index.json";
import serbianTranslations from "./translations/srb/index.json";
import * as mainUtil from './utils/main-util';

i18next.init({
  interpolation: { escapeValue: false },
  lng: mainUtil.getStoredLanguage(),
  resources: {
      [Language.ENGLISH]: {
          index: englishTranslations
      },
      [Language.SERBIAN]: {
        index: serbianTranslations
      }
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <I18nextProvider i18n={i18next}>
            <App/>
        </I18nextProvider>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
