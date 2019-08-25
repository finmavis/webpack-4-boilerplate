export const hello = () => console.log('Hello from import example!');

export const tes = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Some Data"), 1000);
  });
};
