import React, {
    useEffect,
    useState
} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Alert
} from 'react-native'
import { useFonts } from 'expo-font';
import YoutubePlayer from 'react-native-youtube-iframe'
import climatequestions from '../../JSONS/Data/climatequestions.json';
import BottomNavigation from '../../components/BottomNavigation'
import ArrowBack from '../../images/arrow-left.png';

export default function Questionere({ navigation }) {
    const [questions, setQuestions] = useState(climatequestions.questions);
    const styles = getStyles()
    const [loaded] = useFonts({
        Jossins: require('../../../assets/Josefin_Sans/JosefinSans.ttf'),
        JossinsBold: require('../../../assets/Josefin_Sans/static/JosefinSans-Bold.ttf'),
        JossinsItalic: require('../../../assets/Josefin_Sans/static/JosefinSans-Italic.ttf'),
    });

    const submitAnswer = (item, opt, optID) => {
        let quest = questions;



        let updatedQuestions = quest.map((q, i) => {
            if (q.quesId == item.quesId) {
                let options = q.options.map((op, ind) => {
                    if (op.id === optID) {
                        return { ...op, selected: true }
                    } else {
                        return { ...op, selected: false }
                    }
                })

                return { ...q, options: options }
            } else {
                return q
            }
        })

        setQuestions(updatedQuestions)

    }

    const renderQuestions = ({ item, index }) => {
        return <View style={styles.questions}>
            <View>
                <View>
                    <View style={styles.questionIndicatorHolder}>
                        <Text style={styles.questionIndicator}>Question-{index + 1}</Text>
                    </View>
                    <View>
                        <Text style={styles.questionText}>
                            {item.ques} ?
                        </Text>
                    </View>
                </View>
                <View style={styles.optionsHolder}>
                    {
                        item.options.map((options, i) => {
                            if (options.selected == true) {
                                return <TouchableOpacity
                                    style={styles.radioWithTextSelected}
                                    key={i}
                                    onPress={() => submitAnswer(item, options.opt, options.id)}
                                >
                                    <Text style={styles.radioText}>{options.opt}</Text>
                                </TouchableOpacity>
                            } else {
                                return <TouchableOpacity
                                    style={styles.radioWithText}
                                    key={i}
                                    onPress={() => submitAnswer(item, options.opt, options.id)}
                                >
                                    <Text style={styles.radioText}>{options.opt}</Text>
                                </TouchableOpacity>
                            }
                        })
                    }
                </View>
                {
                    item.options.map((opt, key) => {
                        if (((opt.opt == "No") && (opt.selected == true)) || ((opt.opt == "Maybe") && (opt.selected == true))) {
                            return <View style={styles.player} key={key}>
                                <YoutubePlayer
                                    height={300}
                                    play={false}
                                    videoId={'84WIaK3bl_s'}
                                />
                            </View>
                        }
                    })
                }
            </View>
        </View>
    }

    if (!loaded) {
        return null
    }


    return (
        <View style={styles.container}>
            <View style={styles.headerBackNavigate}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}>
                    <Image
                        resizeMode='contain'
                        source={ArrowBack}
                        style={{ flex: 1, width: undefined, height: undefined }}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.questionHolder}>
                <FlatList
                    data={questions}
                    renderItem={renderQuestions}
                    extraData={true}
                    keyExtractor={item => item.quesId}
                    ListHeaderComponent={() => (
                        <Text style={styles.listHeader}>
                            Climate Change Questionere
                        </Text>
                    )}
                    stickyHeaderIndices={[0]}
                    ListFooterComponentStyle={{ flex: 1, justifyContent: 'flex-end' }}
                    ListFooterComponent={() => {
                        return <View style={styles.footerStyle}>
                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={()=>Alert.alert('Feed Back SuccessFully Recorded')}
                            >
                                <Text style={styles.submitButtonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    }}
                />
            </View>
            <View>
            </View>
            <BottomNavigation
                navigation={navigation}
            />
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
    backButton: {
        width: 30,
        height: 30
    },
    listHeader: {
        color: 'white',
        backgroundColor : '#2A3072',
        fontFamily: 'JossinsBold',
        textAlign: 'center',
        fontSize: 32,
        paddingBottom: 30
    },
    questionHolder: {
        width: '100%',
        height: '70%',
        marginTop: -30
    },
    questions: {
        backgroundColor: 'white',
        // height: 400,
        borderBottomWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        padding: 10
    },
    questionText: {
        color: '#2A3072',
        fontSize: 22,
        fontFamily: 'JossinsBold',
        paddingTop: 10
    },
    questionIndicatorHolder: {
        backgroundColor: '#2A3072',
        borderRadius: 10,
        padding: 10
    },
    questionIndicator: {
        color: 'white',
        fontSize: 22,
        fontFamily: 'JossinsBold',
        textAlign: 'center'
    },
    optionsHolder: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    radioWithText: {
        backgroundColor: '#2A3072',
        padding: 10
    },
    radioWithTextSelected: {
        backgroundColor: '#2A3072',
        padding: 10,
        borderColor: '#88CADA',
        borderBottomWidth: 5
    },
    radioText: {
        color: 'white',
        fontFamily: 'JossinsBold',
        // paddingTop: 6,
        fontSize: 16
    },
    player: {
        // backgroundColor : 'red',
        height: 200,
        paddingTop: 20
    },
    footerStyle: {
        marginTop : 30,
        flexDirection : 'row',
        justifyContent : 'center'
    },
    submitButton: {
        backgroundColor: 'white',
        width: '35%',
        padding: 15
    },
    submitButtonText : {
        textAlign: 'center',
        color: '#2A3072',
        fontSize: 18,
        fontFamily: 'JossinsBold',
        textDecorationColor: 'red',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid'
    }
})
