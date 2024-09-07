// Import atau definisikan fungsi exec
export function exec(command, options) {
  if (typeof options === "undefined") {
    options = {};
  }

  return new Promise((resolve, reject) => {
    const callbackFuncName = getUniqueCallbackName("exec");

    // Define the success callback function
    window[callbackFuncName] = (errno, stdout, stderr) => {
      resolve({ errno, stdout, stderr });  // Resolusi Promise dengan hasil dari Java
      cleanup(callbackFuncName);  // Hapus callback setelah digunakan
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
function getUniqueCallbackName(prefix) {
  return prefix + "_" + new Date().getTime() + "_" + Math.floor(Math.random() * 1000);
}

export function toast(message) {
	Axeron.showToast(message);
}

export function optimizeApp(package) {
	Axeron.optimizeApp(package);
}
