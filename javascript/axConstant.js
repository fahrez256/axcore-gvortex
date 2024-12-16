class AxConstant {
  constructor() {
    this.AX_PKG = "!axPkg";
    this.AX_ID = "!axId";
    this.AX_VNAME = "!axVName";
    this.AX_VCODE = "!axVCode";
    this.GVR_PKG = "!gvrPkg";
    this.GVR_VNAME = "!gvrVName";
    this.GVR_VCODE = "!gvrVCode";
    this.AX_MODULES_PATH = "!axModulePath";

    this.MODULE_PKG = "!modulePkg";
    this.MODULE_PKG_VNAME = "!pkgVName";
    this.MODULE_PKG_VCODE = "!pkgVCode";
    this.MODULE_NAME = "!moduleName";
    this.MODULE_VNAME = "!moduleVName";
    this.MODULE_VCODE = "!moduleVCode";
    this.MODULE_PATH = `${this.AX_MODULES_PATH}/${this.MODULE_NAME}`;
    this.MODULE_PATH_WEB = `${this.AX_MODULES_PATH}/${this.MODULE_NAME}/webroot`;
    this.MODULE_PATH_ICON = `/${this.MODULE_NAME}/vmods.png`;
  }

  getPackageIcon(packageName) {
    return `/.icon/${packageName}.png`;
  }
}

export default new AxConstant();
