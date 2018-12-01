export default (delay: number) =>
  new Promise((resolve, reject) => {
    if (0 <= delay && delay <= 1000) {
      setTimeout(() => {
        resolve();
      }, delay);
    } else {
      setTimeout(() => {
        reject(Error("Alert from the service. Too long or invalid!"));
      }, 1000);
    }
  });
