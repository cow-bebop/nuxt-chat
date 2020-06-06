import { app } from "firebase";

export default ({ auth }, inject) => {
  inject("auth", () => {
    return new Promise(resolve => {
      app.$fireAuth.onAuthStateChanged(auth => {
        resolve(auth || null);
      });
    });
  });
};
