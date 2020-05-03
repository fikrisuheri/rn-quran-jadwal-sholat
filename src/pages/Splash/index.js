import React from 'react'
import { View, Text } from 'react-native'

const index = ({navigation}) => {
    setTimeout(() => {
        navigation.navigate('Home');
    },3000);
    
    return (
        <View>
            <Text> Splash Screen</Text>
        </View>
    )
}

export default index
