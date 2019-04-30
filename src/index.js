import { hello, tes } from './importme';

import './style.css';
import './style.scss';
import './style.sass';

hello();

async function run() {
  const value = await tes();
  console.log(value)
}

run();

async function lazyLoadExample() {
  const { lazyLoad } = await import('./lazy-load-example');
  lazyLoad().then(res => console.log(res));
};

document.querySelector("#lazy-load").addEventListener('click', lazyLoadExample);