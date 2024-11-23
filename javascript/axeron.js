class AxeronMain {
  exec(command, options = {}) {
    return new Promise((resolve, reject) => {
      const callbackFuncName = this.getUniqueCallbackName("exec");

      // Define the success callback function
      window[callbackFuncName] = (errno, stdout, stderr) => {
        resolve({ errno, stdout, stderr }); // Resolusi Promise dengan hasil dari Java
        cleanup(callbackFuncName); // Hapus callback setelah digunakan
      };

      // Membersihkan callback setelah digunakan
      function cleanup(callbackName) {
        delete window[callbackName];
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

  toast(titleOrMessage, messageOrDuration, duration = 3000) {
    let title = "";
    let message = "";

    // Jika hanya ada satu parameter, anggap itu sebagai "message"
    if (messageOrDuration === undefined) {
      message = titleOrMessage;
    } else if (typeof messageOrDuration === "number") {
      // Jika parameter kedua adalah angka, anggap itu sebagai "duration"
      message = titleOrMessage;
      duration = messageOrDuration;
    } else {
      // Jika parameter kedua adalah string, itu dianggap sebagai "message"
      title = titleOrMessage;
      message = messageOrDuration;
    }

    // Panggil Axeron.showToast dengan parameter yang telah ditentukan
    Axeron.showToast(title, message, duration);
  }

  optimizeApp(packageName = null) {
    Axeron.optimizeApp(packageName);
  }
}

const axeronInstance = new AxeronMain();

export function exec(command, options = {}) {
  return axeronInstance.exec(command, options);
}

export function toast(titleOrMessage, messageOrDuration, duration) {
  return axeronInstance.toast(titleOrMessage, messageOrDuration, duration);
}

export function optimizeApp(packageName = null) {
  return axeronInstance.optimizeApp(packageName);
}

export default axeronInstance;
