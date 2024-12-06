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
    
    this.MODULE_PATH = `${this.AX_MODULES_PATH}/${this.MODULE_NAME}`;
    this.MODULE_PATH_WEB = `${this.AX_MODULES_PATH}/${this.MODULE_NAME}/webroot`;
    this.MODULE_PKG = "!modulePkg";
    this.MODULE_NAME = "!moduleName";
    this.MODULE_ICON = `${this.MODULE_PATH}/vmods.png`;
  }
}

export default new AxConstant();
