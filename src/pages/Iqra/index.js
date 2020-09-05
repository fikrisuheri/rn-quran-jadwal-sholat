import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native'
import { iqro1, iqro2, iqro3, iqro4, iqro5, iqro6 } from '../../assets/img'
import { ScrollView, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import { iqra1,iqra2,iqra3, iqra4, iqra5, iqra6 } from '../../assets/pdf';
export default class index extends Component {
    render() {
        return (
            <ScrollView style={{ flex:1 }}>
                <View style={styles.container}>
                    <View style={styles.box}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('IqraDetail',{
                            pdf : iqra1,
                            title : 'Iqra 1'
                        })}>
                        <Image source={iqro1} style={styles.img} />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.box}>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('IqraDetail',{
                            pdf : iqra2,
                            title : 'Iqra 2'
                        })}>
                        <Image source={iqro2} style={styles.img} />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.box}>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('IqraDetail',{
                            pdf : iqra3,
                            title : 'Iqra 3'
                        })}>
                        <Image source={iqro3} style={styles.img} />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.box}>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('IqraDetail',{
                            pdf : iqra4,
                            title : 'Iqra 4'
                        })}>
                        <Image source={iqro4} style={styles.img} />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.box}>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('IqraDetail',{
                            pdf : iqra5,
                            title : 'Iqra 5'
                        })}>
                        <Image source={iqro5} style={styles.img} />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.box}>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('IqraDetail',{
                            pdf : iqra6,
                            title : 'Iqra 6'
                        })}>
                        <Image source={iqro6} style={styles.img} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        flexWrap:'wrap'
    },
    box: {
        width: Dimensions.get('window').width / 2,
        paddingVertical:20,
    },
    img: {
        width: Dimensions.get('window').width / 2,
        height: 220,
        resizeMode: 'contain'
    }
});