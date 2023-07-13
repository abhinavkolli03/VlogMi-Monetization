import {Modal, Dimensions, TouchableWithoutFeedback, FlatList,
StyleSheet, View, Text, Pressable} from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons"


const deviceHeight = Dimensions.get("window").height
export class AnalyticsPopup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }

    show = () => {
        this.setState({show: true})
    }

    close = () => {
        this.setState({show: false})
    }
    
    renderOutsideTouchable(onTouch) {
        const view = <View style={{flex: 1, width: '100%'}}/>
        if(!onTouch) return view
        return (
            <TouchableWithoutFeedback onPress={onTouch} style={{flex: 1, width: '100%'}}>
                {view}
            </TouchableWithoutFeedback>
        )
    }

    renderTitle = () => {
        const {title} = this.props
        return (
            <View style={{alignItems: 'center'}}>
                <Text style={{
                    color: '#182E44',
                    fontSize: 25,
                    fontWeight: '500',
                    marginTop: 15,
                    marginBottom: 30
                }}>
                    {title}
                </Text>
            </View>
        )
    }

    renderContent = () => {
        const {data} = this.props
        return (
            <View>
                <FlatList 
                    style={{marginBottom: 20}}
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={this.renderItem}
                    extraData={data}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    contentContainerStyle={{paddingBottom: 40}}
                />
            </View>
        )
    }

    renderItem = ({item}) => {
        return (
            <View style={{height:100, flex: 1, alignItems: 'flex-start'}}>
                <Pressable style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 12,
                paddingHorizontal: 32, borderRadius: 3, borderColor: 'gray', elevation: 10, backgroundColor: '#4649FF', margin: 2, flexDirection: 'row', flex: 1}}>
                    <Text style={{fontSize: 18, fontWeight: 'normal', color: '#C47AFF'}}>{item.name}</Text>
                </Pressable>
            </View>
        )
    }

    renderSeparator = () => {
        <View 
            style={{
                opacity: 0.4,
                height: 1,
                backgroundColor: "#909433"
            }}
        />
    }

    render() {
        let {show} = this.state
        const {onTouchOutside, onTouchButtons, title} = this.props
        return (
            <Modal amimationType={'slide'}
                transparent={true}
                visible={show}
                onRequestClose={this.close}
                animationInTiming={1}
                animationOutTiming={1}
                backdropTransitionInTiming={1}
                backdropTransitionOutTiming={1}>
                    <View style={{flex: 1, 
                        backgroundColor: "#000000AA",
                        justifyContent: "flex-end"}}>
                            {this.renderOutsideTouchable(onTouchOutside)}
                            <View style={{
                                backgroundColor: '#7978FF',
                                width: '100%',
                                borderTopRightRadius: 10,
                                borderTopLeftRadius: 10,
                                paddingHorizontal: 10,
                                maxHeight: deviceHeight * 0.4
                            }}>
                            {this.renderTitle()}
                            {this.renderContent()}
                            </View>
                    </View>
            </Modal>
        )
    }
}