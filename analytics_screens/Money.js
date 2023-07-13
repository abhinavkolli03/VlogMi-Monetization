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
import creatorinfo from "../data/creatorinfo"
import creatorcash from "../data/creatorcash.json"
import {LineChart} from 'react-native-wagmi-charts';

function calculateGraph(choice) {
    const DATA = [...creatorcash];

    var currentDateTime = new Date().toLocaleString().split(", ")[0].split("/")
    currentDateTime = ["02", "19", "2020"]

    var userContributions = {};
    var revenueCounter = {};
    var totalRevenue = 0.00;

        Object.keys(DATA).forEach(function(key) {
            var date = DATA[key].timestamp.split(" ")[0]
            var dateParts = date.split("-")
            if(userContributions[DATA[key].user] != null) {
                userContributions[DATA[key].user] += DATA[key].revenue
            }
            else {
                userContributions[DATA[key].user] = DATA[key].revenue

            }

            if(revenueCounter[date] != null) {
                revenueCounter[date] += DATA[key].revenue
            }
            else {
                revenueCounter[date] = DATA[key].revenue
            }

        });
    

    let sortUsers = [];
    for(var user in userContributions) {
        sortUsers.push([user, userContributions[user]])
    }
    sortUsers.sort(function(a, b) {
        return b[1] - a[1];
    });

    let sortDates = {};
    Object.keys(revenueCounter).sort(function(a, b) {
        return (dateConverter(b) - dateConverter(a));
    }).forEach(function(key) {
        sortDates[key] = revenueCounter[key];
    });

    function dateConverter(date) {
        var dateParts = date.split("-");
        var dateObject = new Date(+dateParts[0], dateParts[1] - 1, +dateParts[2]); 
        return dateObject
    }

    let orderedDates = [];
    var BreakException = {};
    try {
        Object.keys(sortDates).reverse().forEach(function(key) {
            var date = key.split("-")
            if(date[0] == currentDateTime[2] && 
                date[1] == currentDateTime[0] && 
                date[2] == currentDateTime[1]) {
                    orderedDates.push({'date': key, "revenue": sortDates[key]})
                    throw BreakException
                }
            orderedDates.push({'date': key, "revenue": sortDates[key]})
        })
    }
    catch (e) {
        console.log('done')
        if (e !== BreakException) throw e
    }


    for(var i = 0; i < orderedDates.length; i++) {
        totalRevenue += orderedDates[i]['revenue'];
        orderedDates[i]['revenue'] = totalRevenue
    }

    var dateIndex = {'day': null, 'week': null, 'month': null, 'year': null, 'whole': orderedDates.length - 1}
    try {
        for(var i = orderedDates.length - 1; i >= 0; i--) {
            var dateParts = orderedDates[i].date.split("-")
            if(dateParts[0] == currentDateTime[2] && dateParts[1] == currentDateTime[0] &&
                dateParts[2] != currentDateTime[1] && dateIndex['day'] == null){
                dateIndex['day'] = orderedDates.length - 1 - i
            }
            else if (dateParts[0] == currentDateTime[2] && dateParts[1] == currentDateTime[0] &&
                dateParts[2] <= currentDateTime[1] - 7 && dateIndex['week'] == null)
                dateIndex['week'] = orderedDates.length - 1 - i
            else if(dateParts[0] == currentDateTime[2] && dateParts[1] != currentDateTime[0] &&
                dateIndex['month'] == null)
                dateIndex['month'] = orderedDates.length - 1 - i
            else if(dateParts[0] != currentDateTime[2] && dateIndex['year'] == null)
                dateIndex['year'] = orderedDates.length - 1 - i
            if(dateIndex['year'] != null)
                throw BreakException;
        }
    }
    catch (e) {
        if(e !== BreakException) throw e;
    }
       




    var revenueDateList = []
    if(choice.props == "day") {
        
    }
    else {
        for(var i = 0; i < dateIndex[choice]; i++) {
            revenueDateList.push(orderedDates[orderedDates.length - 1 - i])
        }
    }

    for(var i in revenueDateList) {
        var currentDate = revenueDateList[i]['date'].split("-");
        revenueDateList[i]['date'] = new Date(currentDate[0], parseInt(currentDate[1], 10) - 1, currentDate[2], 10).getTime();
        revenueDateList[i]['timestamp'] = revenueDateList[i]['date']
        revenueDateList[i]['value'] = revenueDateList[i]['revenue']
        delete revenueDateList[i]['date']        
        delete revenueDateList[i]['revenue']
    }
    var calculations = [revenueDateList.reverse(), sortUsers, totalRevenue];

    return calculations
}

function CreateButton({value, title, header, handler}) {
    return (
        <TouchableOpacity 
            style={{marginRight: 10,
                paddingVertical: 5,
                paddingHorizontal: 20,
                borderRadius: 10,  
                underline: { textDecoration: 'underline' },
                backgroundColor: value === title?"pink":"white"
            }}
            onPress={() => {handler(title)}}>
            <Text style={{fontSize: 16}}>{header}</Text>
        </TouchableOpacity>
    )
}

function DisplayMoney({LineChart}) {
    <View>
        <LineChart.PriceText style={{color: 'white', fontSize: 20}} />
    </View>
}

const MoneyScreen = (props) => {
    var userinfo = creatorinfo[0]
    const [choice, setChoice] = useState("week")

    const handleSelected = (value) => {
        setChoice(value);
    }

    var retrievedData = calculateGraph(choice)

    var dateData = retrievedData[0]
    var userData = retrievedData[1]
    var total = retrievedData[2]

    console.log(userData)

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
                <TouchableOpacity onPress={() => props.navigation.push("SettingsPopup")}>
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
                source={{uri: userinfo['picture']['large']}}
            />
            <Container
                style={{alignItems: "flex-end"}}
                elevation={0}
                useThemeGutterPadding={true}
            >
                <Text
                    style={StyleSheet.flatten([
                    styles.textBig,
                    ])}
                >
                    {userinfo['name']['first']} {userinfo['name']['last']}
                </Text>
                <Text
                    style={StyleSheet.flatten([
                    styles.textPr,
                    ])}
                >
                    @{userinfo['login']['username']}
                </Text>
            </Container>
        </Container>
        <Container style={{alignItems: 'flex-start', padding: 20}}>
            <Text
                    style={StyleSheet.flatten([
                    styles.textBig,
                    {color: 'pink'},
                    {fontSize: 35}
                    ])}
                >
                    ${total.toFixed(2)}
            </Text>
            <Text
                    style={StyleSheet.flatten([
                    styles.textBig,
                    {color: 'hotpink'},
                    {fontSize: 25}
                    ])}
                >
                    TOTAL REVENUE
            </Text>
        </Container>
        <View style={styles.container}>
            <View style={{alignItems: 'center', width: '100%'}}>
                <Text style={styles.titleContainer}>Overview</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <CreateButton value={choice} title={"week"} header = {"Weekly"} handler={handleSelected}/>
                <CreateButton value={choice} title={"month"} header = {"Monthly"} handler={handleSelected}/>
                <CreateButton value={choice} title={"year"} header = {"Yearly"} handler={handleSelected}/>
                <CreateButton value={choice} title={"whole"} header = {"All Time"} handler={handleSelected}/>
            </View>
        </View>
        <View>
            <LineChart.Provider data={dateData}>
                <LineChart height={200}>
                    <LineChart.Path color="hotpink">
                    <LineChart.Gradient color="white"/>
                        </LineChart.Path>
                    <LineChart.CursorCrosshair color="hotpink">
                    <LineChart.HoverTrap />
                    <LineChart.Tooltip style={{
                        color: 'white',
                        fontSize: 20,
                        padding: 4,
                    }}>
                        <LineChart.PriceText style={{color: 'white'}} precision={2}/>
                    </LineChart.Tooltip>
                    </LineChart.CursorCrosshair>
                </LineChart>
                <Container style={{flexDirection: 'row', marginTop: 10}}>
                    <Text style={{color: 'white', fontSize: 20}}>Date: </Text>
                    <LineChart.DatetimeText style={{color: 'white', fontSize: 20}}
                    options={{
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                    }}/>
                </Container>
                <Container style={{flexDirection: 'row'}}>
                    <Text style={{color: 'white', fontSize: 20}}>Revenue: </Text>
                    <LineChart.PriceText style={{color: 'white', fontSize: 20}} />
                </Container>
            </LineChart.Provider>
        </View>
        <Container style={{alignItems: 'flex-start', padding: 20}}>
            <Text
                    style={StyleSheet.flatten([
                    styles.textBig,
                    {color: 'hotpink'},
                    {fontSize: 25}
                    ])}
                >
                    TOP FOLLOWERS
            </Text>
            <Container style={{display: 'flex', flex: 1, alignItems: 'center'}}>
            <Container style={{ justifyContent: 'space-between', flexDirection: 'row', borderColor: 'white'}}>
                <View style={{ paddingLeft: 5 }}>
                    <Text
                            style={StyleSheet.flatten([
                            styles.textBig,
                            {color: 'hotpink'},
                            {fontSize: 20},
                            ])}
                        >
                            {userData[0][0]}
                    </Text>
                </View>
                <View style={{paddingRight: 5 }}>
                    <Text
                            style={StyleSheet.flatten([
                            styles.textBig,
                            {color: 'hotpink'},
                            {fontSize: 20},
                            ])}
                        >
                            ${userData[0][1].toFixed(2)}
                    </Text>
                </View>
            </Container>
            <Container style={{justifyContent: 'space-between', flexDirection: 'row', borderColor: 'white'}}>
                <View style={{ paddingLeft: 5 }}>
                    <Text
                            style={StyleSheet.flatten([
                            styles.textBig,
                            {color: 'hotpink'},
                            {fontSize: 20},
                            ])}
                        >
                            {userData[1][0]}
                    </Text>
                </View>
                <View style={{ paddingRight: 5 }}>
                    <Text
                            style={StyleSheet.flatten([
                            styles.textBig,
                            {color: 'hotpink'},
                            {fontSize: 20},
                            ])}
                        >
                            ${userData[1][1].toFixed(2)}
                    </Text>
                </View>
            </Container>
            <Container style={{justifyContent: 'space-between', flexDirection: 'row', borderColor: 'white'}}>
                <View style={{ paddingLeft: 5 }}>
                    <Text
                            style={StyleSheet.flatten([
                            styles.textBig,
                            {color: 'hotpink'},
                            {fontSize: 20},
                            ])}
                        >
                            {userData[2][0]}
                    </Text>
                </View>
                <View style={{paddingRight: 5 }}>
                    <Text
                            style={StyleSheet.flatten([
                            styles.textBig,
                            {color: 'hotpink'},
                            {fontSize: 20},
                            ])}
                        >
                            ${userData[2][1].toFixed(2)}
                    </Text>
                </View>
            </Container>
            <Container style={{justifyContent: 'space-between', flexDirection: 'row', borderColor: 'white'}}>
                <View style={{paddingLeft: 5 }}>
                    <Text
                            style={StyleSheet.flatten([
                            styles.textBig,
                            {color: 'hotpink'},
                            {fontSize: 20},
                            ])}
                        >
                            {userData[3][0]}
                    </Text>
                </View>
                <View style={{paddingRight: 5 }}>
                    <Text
                            style={StyleSheet.flatten([
                            styles.textBig,
                            {color: 'hotpink'},
                            {fontSize: 20},
                            ])}
                        >
                            ${userData[3][1].toFixed(2)}
                    </Text>
                </View>
            </Container>
            <Container style={{justifyContent: 'space-between', flexDirection: 'row', borderColor: 'white'}}>
                <View style={{paddingLeft: 5 }}>
                    <Text
                            style={StyleSheet.flatten([
                            styles.textBig,
                            {color: 'hotpink'},
                            {fontSize: 20},
                            ])}
                        >
                            {userData[4][0]}
                    </Text>
                </View>
                <View style={{paddingRight: 5 }}>
                    <Text
                            style={StyleSheet.flatten([
                            styles.textBig,
                            {color: 'hotpink'},
                            {fontSize: 20},
                            ])}
                        >
                            ${userData[4][1].toFixed(2)}
                    </Text>
                </View>
            </Container>
            </Container>
        </Container>
    </ScreenContainer>
    );
}

export default MoneyScreen

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
    textBig: {
        marginTop: 10,
        width: '100%',
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
    },
    container: {
        alignItems: 'center',
        margin: 0,
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