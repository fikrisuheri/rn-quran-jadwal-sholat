import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import Axios from 'axios';
import { ListItem } from 'react-native-elements';
export default class index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hasil: [],
            isLoading : true,
        }
    }

    async getAllSurat() {
        try {
            const response = await Axios.get('https://al-quran-8d642.firebaseio.com/data.json');
            this.setState({
                hasil: response.data,
                isLoading:false
            })
            console.log(this.state);
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        this.getAllSurat();
        console.log(this.props.navigation);
    }

    render() {
        return (
            <ScrollView style={{flex:1, backgroundColor: '#fff'}}>
                <SkeletonContent 
                    containerStyle={{flex:1}}
                    isLoading={this.state.isLoading}
                    layout={[
                        { key: "someId", width: 350, height: 60, marginVertical:5,marginHorizontal:5 },
                        { key: "someId2", width: 350, height: 60, marginVertical:5,marginHorizontal:5 },
                        { key: "someId3", width: 350, height: 60, marginVertical:5,marginHorizontal:5 },
                        { key: "someId4", width: 350, height: 60, marginVertical:5,marginHorizontal:5 },
                        { key: "someId5", width: 350, height: 60, marginVertical:5,marginHorizontal:5 },
                        { key: "someId6", width: 350, height: 60, marginVertical:5,marginHorizontal:5 },
                        { key: "someId7", width: 350, height: 60, marginVertical:5,marginHorizontal:5 },
                        { key: "someId8", width: 350, height: 60, marginVertical:5,marginHorizontal:5 },
                        { key: "someId9", width: 350, height: 60, marginVertical:5,marginHorizontal:5 },
                    ]}
                >
                    {
                        this.state.hasil.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.nama}
                                leftElement={item.nomor}
                                rightSubtitle={item.asma}
                                rightSubtitleStyle={{ fontSize: 18, fontWeight: 'bold' }}
                                subtitle={item.arti + ' (' + item.ayat + ')'}
                                bottomDivider
                                onPress={() => this.props.navigation.navigate('Surat',{
                                    noSurat : item.nomor,
                                    namaSurat : item.nama
                                })}
                            />
                        ))
                    }
                </SkeletonContent>
            </ScrollView>
        )
    }
}
