import {StyleSheet, Layout} from 'react-native'
import colors from '../../Themes/Colors'

export default StyleSheet.create({

    input: {
        height: 50,
        width: '90%',
        padding: 10,
        borderRadius:20,
        backgroundColor: colors.white,
        color: colors.white,
        marginBottom: 10,
        borderColor: 'rgba(170, 187, 197, 0.5)'
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
        color: colors.white,
        fontSize: 18,
    },
    containerLightDark: {
        flex: 1,
        backgroundColor: colors.lightBlack,
        justifyContent: 'space-between',
        flexDirection: 'column'

    },
    h1: {
        color: colors.gray,
        fontSize: 30,
        padding: 10
    },
    p: {
        color: colors.gray,
        fontSize: 15,
        padding: 5
    }

})
