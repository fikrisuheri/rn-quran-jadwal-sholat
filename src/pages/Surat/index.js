import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Axios from 'axios'
import { ListItem } from 'react-native-elements';
import { colorPrimary } from '../../assets/colors';
import { ScrollView } from 'react-native-gesture-handler';
export default class index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            noSurat: this.props.route.params.noSurat,
            ayat: [],
            isLoading: true,
        }
    }

    async getSuratByNo() {
        try {
            const response = await Axios.get('https://al-quran-8d642.firebaseio.com/surat/' + this.state.noSurat + '.json')
            this.setState({
                ayat: response.data,
                isLoading: false,
            });
            console.log(this.state.ayat);
        } catch (error) {
            console.error();
        }
    }

    componentDidMount() {
        this.getSuratByNo();
        console.log(this.props);
        this.props.navigation.setOptions({
            title: this.props.route.params.namaSurat
        })
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                {
                    this.state.isLoading ? <Text style={styles.textAmbilData}>Sedang Mengambil Data</Text> : this.state.ayat.map((item, i) => (
                        <ListItem
                            key={i}
                            title={item.ar}
                            leftElement={'( ' + item.nomor.toString() + ' )'}
                            titleStyle={{ color: '#000', fontSize: 25 }}
                            subtitle={item.nomor + ' ' + item.id}
                            subtitleStyle={{ color: colorPrimary, fontSize: 12 }}
                            bottomDivider
                        />
                    ))
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    textAmbilData: {
        fontSize: 12,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop:20
    }
})