import { hello, tes } from './scripts/import-example';

import './styles/style.css';
import './styles/style.scss';
import './styles/style.sass';

hello();

async function run() {
  const value = await tes();
  console.log(value)
}

run();

async function lazyLoadExample() {
  const { lazyLoad } = await import('./scripts/lazy-load-example');
  lazyLoad().then(res => console.log(res));
};

document.querySelector("#lazy-load").addEventListener('click', lazyLoadExample);