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