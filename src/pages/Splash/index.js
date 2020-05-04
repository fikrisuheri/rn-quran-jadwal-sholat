import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { colorWhite, colorPrimary } from '../../assets/colors';
import { icQuran, icMasjid2 } from '../../assets/img';
import { BallIndicator, BarIndicator } from 'react-native-indicators';

const index = ({ navigation }) => {
    setTimeout(() => {
        navigation.navigate('Home');
    },3000);

    return (
        <View style={styles.container}>
            <View style={{ flex: 3, justifyContent: 'center', alignItems: "center", paddingTop: 50 }}>
                <Image source={icMasjid2} style={styles.img} />
                <Text style={{ color: colorWhite, marginTop: 10, fontSize: 18 }}>Quran Mobile App</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: "center"}}>
                <BarIndicator color='white' size={30} />
                <Text style={{ color: colorWhite, marginTop: 10, fontSize: 12,marginBottom:25 }}>Versi 1.0</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: colorPrimary,
        flex: 1,
    },
    img: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    }
});
export default index
