class Axeron {
  exec(command, options = {}) {
    return new Promise((resolve, reject) => {
      const callbackFuncName = getUniqueCallbackName("exec");

      // Define the success callback function
      window[callbackFuncName] = (errno, stdout, stderr) => {
        resolve({ errno, stdout, stderr }); // Resolusi Promise dengan hasil dari Java
        cleanup(callbackFuncName); // Hapus callback setelah digunakan
      };

      // Membersihkan callback setelah digunakan
      function cleanup(successName) {
        delete window[successName];
      }

      try {
        // Memanggil fungsi Java melalui interface Android
        Axeron.exec(command, JSON.stringify(options), callbackFuncName);
      } catch (error) {
        reject(error);
        cleanup(callbackFuncName);
      }
    });
  }

  // Fungsi untuk menghasilkan nama callback unik
  getUniqueCallbackName(prefix) {
    return (
      prefix +
      "_" +
      new Date().getTime() +
      "_" +
      Math.floor(Math.random() * 1000)
    );
  }

  toast(message) {
    Axeron.showToast(message);
  }

  optimizeApp(packageName) {
    Axeron.optimizeApp(packageName);
  }
}

const axeronInstance = new Axeron();

export function exec(command, options = {}) {
  return axeronInstance.exec(command, options);
}

export function toast(message) {
  return axeronInstance.toast(message);
}

export function optimizeApp(packageName = null) {
  return axeronInstance.optimizeApp(packageName);
}

export default axeronInstance;
