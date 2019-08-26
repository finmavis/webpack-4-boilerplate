export const lazyLoad = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Hello from lazy load!"), 1000);
  });
};
