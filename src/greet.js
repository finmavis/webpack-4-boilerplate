export function greet(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Hello ${name}!`);
    }, 1000);
  });
}