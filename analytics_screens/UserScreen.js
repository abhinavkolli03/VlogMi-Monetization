import React, {useState} from 'react';
import image from '../assets/filter.png'
import {
  Container,
  ScreenContainer,
  withTheme,
} from '@draftbit/ui';
import { TouchableOpacity, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import RenderLineChart from '../components/ViewersGraph';
import { Ionicons } from "@expo/vector-icons";

function CreateButton({value, title, header, handler}) {
    return (
        <TouchableOpacity 
            style={{marginRight: 20,
                paddingVertical: 5,
                paddingHorizontal: 20,
                borderRadius: 10,  
                underline: { textDecoration: 'underline' },
                backgroundColor: value === title?"pink":"white"
            }}
            onPress={() => {handler(title)}}>
            <Text style={{fontSize: 20}}>{header}</Text>
        </TouchableOpacity>
    )
}

const UserScreen = (props) => {
    const userInfo = props.route.params.user;
    const [choice, setChoice] = useState("week")

    const handleSelected = (value) => {
        setChoice(value);
    }

    const { theme } = props;
    return (
    <ScreenContainer
        style={styles.screenContainerJb}
        scrollable={true}
        hasSafeArea={false}
    >
        <ImageBackground
            style={styles.imageBackgroundNb}
            source={image}
            resizeMode="cover"
        >
            <View style={styles.left}>
                <TouchableOpacity onPress={() => props.navigation.push("ViewersScreen")}>
                    <Ionicons name="ios-arrow-back" color="#666" size={40} />
                </TouchableOpacity>
            </View>
        </ImageBackground>
        <Container
            style={styles.containerEA}
            elevation={0}
            useThemeGutterPadding={true}
        >
            <Image
                style={StyleSheet.flatten([
                styles.imageA3,
                { borderRadius: 100 },
                ])}
                resizeMode="cover"
                source={{uri: userInfo['picture']['large']}}
            />
            
            <Container
                style={{alignItems: "flex-end"}}
                elevation={0}
                useThemeGutterPadding={true}
            >
                <Text
                    style={StyleSheet.flatten([
                    styles.textPr,
                    theme.typography.headline3,
                    ])}
                >
                    {userInfo['name']['first']} {userInfo['name']['last']}
                </Text>
                <Text
                    style={StyleSheet.flatten([
                    styles.textPr,
                    theme.typography.headline5,
                    ])}
                >
                    @{userInfo['login']['username']}
                </Text>
            </Container>
        </Container>
        <View style={styles.container}>
            <View style={{alignItems: 'center', width: '100%'}}>
                <Text style={styles.titleContainer}>User's Watch History</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <CreateButton value={choice} title={"week"} header = {"Weekly"} handler={handleSelected}/>
                <CreateButton value={choice} title={"month"} header = {"Monthly"} handler={handleSelected}/>
                <CreateButton value={choice} title={"year"} header = {"Yearly"} handler={handleSelected}/>
            </View>
        </View>
        <Container>
            <RenderLineChart props={choice}/>
        </Container>
    </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    screenContainerJb: {
        backgroundColor: '#0d0906'
    },
    imageBackgroundNb: {
        width: '100%',
        height: 180,
    },
    imageA3: {
        flex: 1,
        height: 120,
        width: 120,
        borderRadius: 100
    },
    containerEA: {
        marginTop: -100
    },
    textPr: {
        marginTop: 10,
        width: '100%',
        textAlign: 'center',
        color: 'white'
    },
    container: {
        alignItems: 'center',
        margin: 50,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    textStyle: {
        color: 'white',
        fontSize: 30,
    },
    titleContainer: {
        marginTop: 0,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: "center",
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white'
    },    
    left: {
        alignItems: "flex-start",
        padding: 20,
    }
});

export default withTheme(UserScreen);