import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    Alert,
    ToastAndroid
} from 'react-native'
import { useFonts } from 'expo-font';
import { useToast } from 'react-native-paper-toast';
import { RadioButton } from 'react-native-paper';
import Questions from '../../JSONS/Data/userInfo.json';
import BottomNavigation from '../../components/BottomNavigation';
import ArrowBack from '../../images/arrow-left.png';

export default function Info({ navigation }) {
    const [questions, setQuestions] = useState(Questions.questions);
    const [counter, setCounter] = useState(0);
    const [questionToDisplay, setQuestionDisplay] = useState(null);
    const [answers, setAnswers] = useState({
        language: '',
        name: '',
        age: '',
        profession: ''
    })
    const [isValidated, setIsValidated] = useState(null);

    const toaster = useToast();
    const [loaded] = useFonts({
        Jossins: require('../../../assets/Josefin_Sans/JosefinSans.ttf'),
        JossinsBold: require('../../../assets/Josefin_Sans/static/JosefinSans-Bold.ttf'),
        JossinsItalic: require('../../../assets/Josefin_Sans/static/JosefinSans-Italic.ttf'),
    });

    const styles = getStyles();

    useEffect(() => {
        if (counter <= questions.length - 1) {
            setQuestionDisplay(questions[counter]);
            console.log(questionToDisplay)
        }
    }, [counter])


    const onPressradio = (option) => {
        let updated = questionToDisplay.options.map((opt) => {
            if (opt.id === option.id) {
                return { ...opt, selected: true }
            } else {
                return { ...opt, selected: false }
            }
        });
        setQuestionDisplay({ ...questionToDisplay, options: updated });

        Object.keys(questionToDisplay).map((item) => {
            if (item == 'language')
                setAnswers({ ...answers, language: option.opt })
            if (item == 'age')
                setAnswers({ ...answers, age: option.opt })

        })
    }

    const onFilledTextInput = (questionToDisplay, input) => {

        let userInput = input

        Object.keys(questionToDisplay).map((item) => {
            if (item == 'name')
                setAnswers({ ...answers, name: userInput })
            if (item == 'profession')
                setAnswers({ ...answers, profession: userInput })

        })
    }

    const nextQuestion = () => {
        if (counter <= questions.length - 1) {

            setCounter(counter + 1)
        }

    }


    const previousQuestion = () => {
        if (counter !== 0) {
            setCounter(counter - 1)
        }
    }

    const submitInfo = () => {
        let isEmpty = false
        Object.keys(answers).map((item) => {
            if (answers[item] == "") {
                isEmpty = true
            }
        })

        setIsValidated(isEmpty);

        // isEmpty == true ? toaster.show({ message: 'Fill out All feilds to continue',type : 'info', position : 'top'}) : null
        if(isEmpty == true ){
            ToastAndroid.show("All feilds are mandatory", ToastAndroid.SHORT)
        }else{
            ToastAndroid.show("Thanks for fill out your info. We appreciate that you trust us", ToastAndroid.SHORT);
            navigation.navigate('questionere')
        }
    }

    const displayQuestion = () => {
        return <View>
            <View style={styles.questionNumber}>
                <Text style={styles.questionNumber_text}>
                    {counter}
                </Text>
            </View>
            <Text style={styles.Question}>{questionToDisplay.ques}</Text>
            {
                questionToDisplay.options !== null ? (
                    <View style={styles.OptionsHolder}>
                        {
                            questionToDisplay.options.map((item, index) => {
                                return <View style={styles.radioHolder} key={index}>
                                    <RadioButton
                                        color='#88CADA'
                                        uncheckedColor='white'
                                        status={item.selected ? "checked" : "unchecked"}
                                        onPress={() => onPressradio(item)}
                                    />
                                    <Text style={styles.Option1English}>{item.opt}</Text>
                                </View>
                            })
                        }
                        <View style={styles.NextButtonsHolder}>
                            {
                                counter == questions.length - 1 ? (
                                    <TouchableOpacity
                                        style={styles.nextButton}
                                    >
                                        <Text style={styles.nextButton__text}>Submit</Text>
                                    </TouchableOpacity>
                                ) : (
                                    counter > 0 ? (
                                        <View style={styles.buttons__Holder}>
                                            <TouchableOpacity
                                                style={styles.nextButton}
                                                onPress={() => previousQuestion()}
                                            >
                                                <Text style={styles.nextButton__text}>Previous</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={styles.nextButton}
                                                onPress={() => nextQuestion()}
                                            >
                                                <Text style={styles.nextButton__text}>Next</Text>
                                            </TouchableOpacity>
                                        </View>

                                    ) : (
                                        <TouchableOpacity
                                            style={styles.nextButton}
                                            onPress={() => nextQuestion()}
                                        >
                                            <Text style={styles.nextButton__text}>Next</Text>
                                        </TouchableOpacity>
                                    )
                                )
                            }
                        </View>
                    </View>
                ) : (
                    <View style={styles.OptionsHolder}>
                        <TextInput
                            style={styles.userInput}
                            placeholder='Your name'
                            placeholderTextColor='white'
                            onChangeText={input => onFilledTextInput(questionToDisplay, input)}
                            defaultValue={answers.name}
                        />
                        <View style={styles.NextButtonsHolder}>
                            {
                                counter == questions.length - 1 ? (
                                    <TouchableOpacity
                                        style={styles.nextButton}
                                        onPress={() => submitInfo()}
                                    >
                                        <Text style={styles.nextButton__text}>Submit</Text>
                                    </TouchableOpacity>
                                ) : (
                                    counter > 0 ? (
                                        <View style={styles.buttons__Holder}>
                                            <TouchableOpacity
                                                style={styles.nextButton}
                                                onPress={() => previousQuestion()}
                                            >
                                                <Text style={styles.nextButton__text}>Previous</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={styles.nextButton}
                                                onPress={() => nextQuestion()}
                                            >
                                                <Text style={styles.nextButton__text}>Next</Text>
                                            </TouchableOpacity>
                                        </View >

                                    ) : (
                                        <TouchableOpacity
                                            style={styles.nextButton}
                                            onPress={() => nextQuestion()}
                                        >
                                            <Text style={styles.nextButton__text}>Next</Text>
                                        </TouchableOpacity>
                                    )
                                )
                            }
                        </View>
                    </View>

                )
            }
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
            {
                displayQuestion()
            }
            <View>

            </View>
            <BottomNavigation
                navigation = {navigation}
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
    questionNumber: {
        backgroundColor: 'white',
        width: 25,
        height: 25,
        borderRadius: 100,
        marginBottom: 15,
        // position : 'relative'
    },
    questionNumber_text: {
        textAlign: 'center',
        backgroundColor: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: 'JossinsBold',
        width: 25,
        height: 25,
        borderRadius: 100
    },
    Question: {
        color: 'white',
        fontFamily: 'JossinsBold',
        fontSize: 32,
        textTransform: 'capitalize',
        lineHeight: 40,
        textAlign: 'left'
    },
    radioHolder: {
        flexDirection: 'row',
        marginTop: 15,
    },
    OptionsHolder: {
        marginTop: 10
    },
    Option1Urdu: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Jossins',
        // marginTop: 15,
        marginLeft: 15,
        textAlign: 'left'
    },
    Option1English: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Jossins',
        marginLeft: 15,
        textAlign: 'left'
    },
    userInput: {
        borderColor: 'white',
        borderBottomWidth: 2,
        paddingTop: 10,
        paddingBottom: 10,
        color: 'white',
        fontSize: 18,
        fontFamily: 'JossinsItalic'
    },
    buttons__Holder: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    NextButtonsHolder: {
        alignItems: 'flex-end',
        marginTop: 55
    },
    nextButton: {
        backgroundColor: 'white',
        width: '35%',
        padding: 15
    },
    nextButton__text: {
        textAlign: 'center',
        color: '#2A3072',
        fontSize: 18,
        fontFamily: 'JossinsBold',
        textDecorationColor: 'red',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid'
    },
})
