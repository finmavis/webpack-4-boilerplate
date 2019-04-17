import Image from './assets/bg-contact.png';

document.querySelector('.testing').src = Image;
console.log('Console.log from importme.js');

export const hello = hello => console.log('Import me Please!');

export const tes = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Some Data"), 1000);
  });
};
