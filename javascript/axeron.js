class AxeronMain {
  exec(command, options = {}) {
    return new Promise((resolve, reject) => {
      const callbackFuncName = this.getUniqueCallbackName("exec");

      // Define the success callback function
      window[callbackFuncName] = (errno, stdout, stderr) => {
        resolve({ errno, stdout, stderr }); // Resolusi Promise dengan hasil dari Java
        //cleanup(callbackFuncName); // Hapus callback setelah digunakan
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
        //cleanup(callbackFuncName);
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

class StormDownload {
	constructor(tag) {
		this.tag = tag;

		// Nama callback yang didaftarkan
		this.onStartName = null;
		this.onProgressName = null;
		this.onSuccessName = null;
		this.onFailureName = null;
	}

	// Fungsi untuk memulai proses download
	download(url, path) {
		if (typeof Axeron !== "undefined" && Axeron.downloadService) {
			if (this.onStartName && this.onProgressName && this.onSuccessName && this.onFailureName) {
				Axeron.downloadService(
					url,
					path,
					this.onStartName,
					this.onProgressName,
					this.onSuccessName,
					this.onFailureName
				); // Kirim data ke Android
			} else {
				console.error("Not all callbacks have been registered.");
			}
		} else {
			console.error("Axeron interface is not defined.");
		}
	}

	// Fungsi untuk menangani callback "onStart"
	onStart(callback) {
		this.registerCallback(callback, "onStart");
	}

	// Fungsi untuk menangani callback "onProgress"
	onProgress(callback) {
		this.registerCallback(callback, "onProgress");
	}

	// Fungsi untuk menangani callback "onSuccess"
	onSuccess(callback) {
		this.registerCallback(callback, "onSuccess");
	}

	// Fungsi untuk menangani callback "onFailure"
	onFailure(callback) {
		this.registerCallback(callback, "onFailure");
	}

	// Helper function untuk mendaftarkan callback ke window
	registerCallback(callback, type) {
		if (typeof callback === "function") {
			// Buat nama unik berdasarkan tag dan tipe callback
			const callbackName = `${type}_${this.tag}`;
			this[`${type}Name`] = callbackName;

			// Daftarkan callback ke window agar Android dapat mengaksesnya
			window[callbackName] = (message) => {
				callback(message);
				// Opsional: Hapus jika tidak ingin menyimpan callback setelah dipanggil
				// delete window[callbackName];
			};
		} else {
			console.error(`${type} callback must be a function.`);
		}
	}
}

const axeronInstance = new AxeronMain();

axeronInstance.StormDownload = StormDownload;

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
