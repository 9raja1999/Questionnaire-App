import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native'
import HomeIcon from '../images/home.png'
import StatsIcon from '../images/stats.png'

export default function BottomNavigation({navigation}) {
    const styles = getStyles()
    return (
        <View style={styles.bottomNavigationContainer}>
            <View style={styles.bottomNavigation}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    style={styles.NavigationIcon}>
                    <Image
                        resizeMode='contain'
                        source={HomeIcon}
                        style={{ flex: 1, width: undefined, height: undefined }}
                    />
                </TouchableOpacity>
                <View style={styles.NavigationIcon}>
                    <Image
                        resizeMode='contain'
                        source={StatsIcon}
                        style={{ flex: 1, width: undefined, height: undefined }}
                    />
                </View>
            </View>
        </View>
    )
}


const getStyles = () => StyleSheet.create({
    bottomNavigationContainer: {
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 24,
        left: 24,
        padding: 12,
        borderRadius: 15
    },
    bottomNavigation: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    NavigationIcon: {
        width: 30,
        height: 30

    }
})
