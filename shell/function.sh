pkglist() {
    pkgfile="packages.list"
    if [[ "$1" == "-F" || "$1" == "--full" ]]; then
        pkgfile="packages_full.list"
        shift
    fi

    pkgfilepath="$AX_MODULES_PATH/.config/$pkgfile"

    if [[ ! -f "$pkgfilepath" ]]; then
        echo "Error: File $pkgfilepath not found."
        return 1
    fi

    case "$1" in
        -L|--getLabel)
            if [[ -z "$2" ]]; then
                echo "Usage: pkglist $1 <package>"
                return 1
            fi
            grep "$2" "$pkgfilepath" | cut -d '|' -f 1
            ;;
        -P|--getPackage)
            if [[ -z "$2" ]]; then
                echo "Usage: pkglist $1 <appname>"
                return 1
            fi
            grep -i "$2" "$pkgfilepath" | cut -d '|' -f 2
            ;;
        *)
            cut -d '|' -f 2 "$pkgfilepath"
            ;;
    esac
}

toast() {
	case $# in
		1)
			title=""
			msg="$1"
			duration=3000
			;;
		2)
			case $2 in
				''|*[!0-9]*)
					title="$1"
					msg="$2"
					duration=0
					;;
				*)
					title=""
					msg="$1"
					duration="$2"
					;;
			esac
			;;
		3)
			title="$1"
			msg="$2"
			duration="$3"
			;;
		*)
			echo "Usage: toast <msg> | toast <title> <msg> | toast <msg> <duration> | toast <title> <msg> <duration>"
			return 1
			;;
	esac

	am broadcast -a gvr.service.TOAST --es title "$title" --es message "$msg" --ei duration "$duration" > /dev/null 2>&1
}
