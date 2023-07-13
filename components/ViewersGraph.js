import React from 'react';
import { Text, View, Easing, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import watchHistory from '../data/watchHistory.json';
import {LineChart} from 'react-native-wagmi-charts';

function calculateGraph(choice) {
    const DATA = [...watchHistory];

    var currentDateTime = new Date().toLocaleString().split(", ")[0].split("/")
    currentDateTime = ["02", "09", "2020"]

    var BreakException = {};
    var dataList = [];
    var dateIndex = {'day': null, 'week': null, 'month': null, 'year': null}
    try {
        Object.keys(DATA).forEach(function(key) {
            var timePieces = DATA[key].time.split("T")
            var dateParts = timePieces[0].split("-")
            if(dateParts[0] == currentDateTime[2] && dateParts[1] == currentDateTime[0] &&
                dateParts[2] != currentDateTime[1] && dateIndex['day'] == null)
                dateIndex['day'] = key
            else if (dateParts[0] == currentDateTime[2] && dateParts[1] == currentDateTime[0] &&
                dateParts[2] <= currentDateTime[1] - 7 && dateIndex['week'] == null)
                dateIndex['week'] = key
            else if(dateParts[0] == currentDateTime[2] && dateParts[1] != currentDateTime[0] &&
                dateIndex['month'] == null)
                dateIndex['month'] = key
            else if(dateParts[0] != currentDateTime[2] && dateIndex['year'] == null)
                dateIndex['year'] = key
            if(dateIndex['year'] != null)
                throw BreakException;
            dataList.push(DATA[key]);
        });
    }
    catch (e) {
        if (e !== BreakException) throw e;
    }
    
    var calculations = [];

    if(choice.props == "day") {
        var dayCalculations = [];
        dayCalculations[0] = {date: dataList[0].date, hour: dataList[0].time}
    }
    else {
        var dataListDate = dataList[0].time.split("T")[0]
        calculations[0] = {date: dataListDate, count: 1}
        var calculatorIndex = 0
        for(var i = 1; i < dateIndex[choice.props]; i++) {
            dataListDate = dataList[i].time.split("T")[0]
            if(calculations[calculatorIndex].date != dataListDate) {
                calculatorIndex += 1
                calculations[calculatorIndex] = {date: dataListDate, count: 1}
            }
            else {
                calculations[calculatorIndex].count += 1
            }
        }
    }
    for(var i = 0; i < calculations.length; i++) {
        var currentDate = calculations[i]['date'].split("-");
        calculations[i]['date'] = new Date(currentDate[0], parseInt(currentDate[1], 10) - 1, currentDate[2], 10).getTime();
        calculations[i]['timestamp'] = calculations[i]['date']
        calculations[i]['value'] = calculations[i]['count']
        delete calculations[i]['count']
        delete calculations[i]['date']
    }
    return calculations
}

const RenderLineChart = (props) => {
    return (
        <View>
            <LineChart.Provider data={calculateGraph(props).reverse()}>
                <LineChart height={200}>
                    <LineChart.Path color="hotpink">
                    <LineChart.Gradient color="violet"/>
                        </LineChart.Path>
                    <LineChart.CursorCrosshair color="hotpink">
                    <LineChart.HoverTrap />
                    <LineChart.Tooltip style={{
                        color: 'white',
                        fontSize: 20,
                        padding: 4,
                    }}>
                        <LineChart.PriceText style={{color: 'white'}} precision={0}/>
                    </LineChart.Tooltip>
                    </LineChart.CursorCrosshair>
                </LineChart>
                <LineChart.DatetimeText style={{color: 'white'}}
                options={{
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                }}/>
            </LineChart.Provider>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
    },
    buttonStyle: {
      marginRight: 20,
      backgroundColor: '#6231ff',
      paddingVertical: 5,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    textStyle: {
      color: 'white',
      fontSize: 20,
    },
  });

export default RenderLineChart;

// export default ({route}) => {
//     // const userInfo = route.params.user;

//     // return <Text>{JSON.stringify(userInfo,null,2)}</Text>
//     return (

//     );
// };
