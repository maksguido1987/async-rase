import './scss/style.scss';
import './index.html';
import { App } from './components/app';
import { Api } from './components/api';

window.onload = () => {
  new App(document.body);
  new Api();
};
