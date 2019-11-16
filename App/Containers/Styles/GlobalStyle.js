import {StyleSheet, Layout} from 'react-native'
import colors from '../../Themes/Colors'

export default StyleSheet.create({

    input: {
        height: 50,
        width: '100%',
        padding: 10,
        backgroundColor: colors.darkBlack,
        color: colors.white,
        marginBottom: 1
    },
    button: {
        backgroundColor: colors.primary,
        padding: 10,
        margin: 10,
        borderRadius: 8,
        height: 50,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: colors.darkBlack,
        fontSize: 18,
    },
    containerLightDark: {
        flex: 1,
        backgroundColor: colors.lightBlack,
        justifyContent: 'space-between',
        flexDirection: 'column'

    },
    h1: {
        color: colors.white,
        fontSize: 30,
        padding: 10
    },
    p: {
        color: colors.white,
        fontSize: 15,
        padding: 5
    }

})
