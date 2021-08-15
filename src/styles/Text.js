import { COLOR_BLACK } from "./Colors"
import { scaleFont } from "./Scaler"
import { useTheme } from 'react-native-paper';

// FONT SIZE
export const FONT_SIZE_24 = scaleFont(24)
export const FONT_SIZE_18 = scaleFont(18)
export const FONT_SIZE_16 = scaleFont(16)
export const FONT_SIZE_14 = scaleFont(14)
export const FONT_SIZE_12 = scaleFont(12)
export const FONT_SIZE_10 = scaleFont(10)

export const TEXT_STYLE = (size = 'normal', weight = 'normal', styles = {}) => {
    const { colors } = useTheme();

    function _GET_SIZE() {
        switch (size) {
            case 'extrasmall':
                return FONT_SIZE_10
                break;
            case 'small':
                return FONT_SIZE_12
                break;
            case 'normal':
                return FONT_SIZE_14
                break;
            case 'medium':
                return FONT_SIZE_16
                break;
            case 'large':
                return FONT_SIZE_18
                break;
            case 'extralarge':
                return FONT_SIZE_24
                break;
            default:
                return FONT_SIZE_14
                break;
        }
    }

    function _GET_WEIGHT() {
        switch (weight) {
            case 'normal':
                return 'normal'
                break;
            case 'medium':
                return '700'
                break;
            case 'bold':
                return 'bold'
                break;
            default:
                return 'normal'
                break;
        }
    }

    return ({
        fontSize: _GET_SIZE(),
        color: colors.text,
        fontWeight: _GET_WEIGHT(),
        ...styles
    })
}