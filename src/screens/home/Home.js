import React, {
    useEffect,
    useState
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';


export default function Home({ navigation }) {
    const [toggle, setToggle] = useState(false);
    const [loaded] = useFonts({
        Jossins: require('../../../assets/Josefin_Sans/JosefinSans.ttf'),
        JossinsBold: require('../../../assets/Josefin_Sans/static/JosefinSans-Bold.ttf'),
        JossinsItalic: require('../../../assets/Josefin_Sans/static/JosefinSans-Italic.ttf'),
    });

    const styles = getStyles();


    const toggler = () => {
        toggle == false ? setToggle(true) : setToggle(false);
    }


    if (!loaded) {
        return null
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.dot}>&#9679;</Text>
                <Text style={styles.header__text}>Powered By : syslab.ai</Text>
                <Text style={styles.header__text}>Sponsored By : FAST-NUCES</Text>
            </View>
            <View>
                <Text style={styles.brand__text}>ClimateParhai</Text>
                <Text style={styles.tagLine__text}>Study about the climate changes</Text>
                <View style={styles.switch__bg}>
                    <TouchableOpacity
                        onPress={toggler}
                        style={toggle ? styles.switch_toggleOnn : styles.switch_toggleOff}
                    >
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('info')}
                    style={styles.start__button}>
                    <Text style={styles.startbutton__text}>Start</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" backgroundColor='white' />
        </View>
    )
}

const getStyles = () => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2A3072',
        justifyContent: 'space-around',
        padding: 24
    },
    dot: {
        color: 'white',
        fontSize: 16,
    },
    header__text: {
        color: 'white',
        marginTop: 2,
        fontFamily: 'Jossins',
        fontSize: 18
    },
    brand__text: {
        color: 'white',
        fontFamily: 'JossinsBold',
        fontSize: 38,
        letterSpacing: 3
    },
    tagLine__text: {
        color: 'white',
        fontFamily: 'JossinsItalic',
        fontSize: 16
    },
    switch__holder: {
        marginTop: 15
    },
    switch__bg: {
        position: 'relative',
        backgroundColor: 'white',
        width: 150,
        height: 70,
        borderRadius: 50,
        marginTop: 15,
    },
    switch_toggleOff: {
        backgroundColor: '#88CADA',
        borderRadius: 50,
        width: '60%',
        height: '100%'
    },
    switch_toggleOnn: {
        backgroundColor: 'red',
        borderRadius: 50,
        width: '60%',
        height: '100%',
        position: 'absolute',
        right: 0,
    },
    start__button: {
        backgroundColor: 'white',
        height: 50,
        justifyContent: 'center'
    },
    startbutton__text: {
        color: '#2A3072',
        fontFamily: 'JossinsBold',
        textAlign: 'center',
        fontSize: 20
    }

});

