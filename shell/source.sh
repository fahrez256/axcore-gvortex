export CORE="d8a97692ad1e71b1"
export AX_PKG="!axPkg"
export AX_CORE=$(dumpsys package "$AX_PKG" | grep "signatures" | cut -d '[' -f 2 | cut -d ']' -f 1)
export AX_ID="!axId"
export AX_VNAME="!axVName"
export AX_VCODE=!axVCode
export GVR_PKG="!gvrPkg"
export GVR_CORE=$(dumpsys package "$GVR_PKG" | grep "signatures" | cut -d '[' -f 2 | cut -d ']' -f 1)
export GVR_VNAME="!gvrVName"
export GVR_VCODE=!gvrVCode
export AX_MODULES_PATH="!axModulePath"
export MODULE_PKG="!modulePkg"
export MODULE_PKG_VNAME="!pkgVName"
export MODULE_PKG_VCODE="!pkgVCode"
export MODULE_NAME="!moduleName"
export MODULE_VNAME="!moduleVName"
export MODULE_VCODE="!moduleVCode"
export MODULE_PATH="$AX_MODULES_PATH/$MODULE_NAME"
export MODULE_PATH_WEB="$AX_MODULES_PATH/$MODULE_NAME/webroot"
export AXFUN=". $AX_MODULES_PATH/.config/function.sh"
if ! echo "$CORE" | grep -q "$GVR_CORE"; then pm uninstall "$GVR_PKG"; fi
$AXFUN
