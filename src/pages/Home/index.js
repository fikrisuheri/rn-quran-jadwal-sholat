import React, { Component } from 'react'
import { Text, View, StatusBar, Image, StyleSheet, ScrollView, PermissionsAndroid } from 'react-native'
import { colorPrimary, colorStatusBar, colorWhite } from '../../assets/colors'
import { icMasjid } from '../../assets/img';
import { GreenStatusBar } from '../../component'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, ListItem, Button } from 'react-native-elements';
import axios from 'axios';
import moment from 'moment';
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import Geolocation from 'react-native-geolocation-service';


const JadwalComponent = ({ title = 'default', time = '00:00' }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
            <Text>{title}</Text>
            <Text>{time} WIB</Text>
        </View>
    )
}

export default class index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            namasurat: '',
            quranAr: [],
            quranId: [],
            jadwal: {},
            dateNow: '',
            isLoading: true,
            placeName: '',
        }
    }

    async getQuranAcak() {
        try {
            const response = await axios.get('https://api.banghasan.com/quran/format/json/acak');
            this.setState({
                namasurat: response.data.surat.nama,
                quranAr: response.data.acak.ar,
                quranId: response.data.acak.id,
            })
        } catch (error) {
            console.log(error);
        }
    }

    async getJadwalSholat() {
        try {
            const tgl = moment().unix();
            const response = await axios.get(
                'http://api.aladhan.com/v1/timings/'+ tgl.toString() +
                '?latitude='+ this.state.lat +
                '&longitude='+ this.state.long +'&method=2');
            this.setState({
                jadwal: response.data.data.timings,
                dateNow: response.data.data.date.readable,
                isLoading: false
            })
        } catch (error) {
            console.error(error);
        }
    }

    async requestPermissions() {
        if (Platform.OS === 'ios') {
            Geolocation.requestAuthorization();
            Geolocation.setRNConfiguration({
                skipPermissionRequests: false,
                authorizationLevel: 'whenInUse',
            });
        }
      
        if (Platform.OS === 'android') {
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
        }

        this.getCurrentLocation();
    }

    getCurrentLocation() {
        Geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                });
                this.getCurrentAddress();
            },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    async getCurrentAddress() {
        const accessToken = "pk.eyJ1IjoiaXJmYW5wdWxlIiwiYSI6ImNqdnpxbHFvbzAzM3UzeWxrcWtkbTVhamIifQ.TJM77G3WOEIOIYzk_IiWKQ";
        try {
            const response = await axios.get(
                'https://api.mapbox.com/geocoding/v5/mapbox.places/'
                + this.state.long + ',' + this.state.lat + '.json?types=place&access_token=' + accessToken
            );
            this.setState({
                placeName: response.data.features[0].place_name,
            });

            this.getJadwalSholat();
        } catch (error) {
            console.error(error);
        }
    }

    componentDidMount() {
        this.getQuranAcak();
        this.requestPermissions();
    }
    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, paddingBottom: 20 }}>

                    <GreenStatusBar />

                    <View style={{ height: 175, backgroundColor: colorPrimary }}>
                        <Image source={icMasjid} style={{ position: 'absolute', height: 175, width: '100%', resizeMode: 'stretch' }} />
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <View style={styles.containerAdzan}>
                                {
                                    this.state.isLoading ? <Text style={styles.textAdzan}>- - - -</Text> : <Text style={styles.textAdzan}>Waktu Imsak Hari Ini</Text>
                                }
                                {
                                    this.state.isLoading ? <Text style={styles.waktuAdzan}>--:--</Text> : <Text style={styles.waktuAdzan}>{this.state.jadwal.Imsak}</Text>
                                }
                            </View>
                            <View style={styles.containerLokasi}>
                                <View style={styles.flexRow}>
                                    <Icon name='map-marker' size={20} color={colorWhite} />
                                {
                                    this.state.isLoading ? <Text style={styles.textBottom}>---, ---</Text> : <Text style={styles.textBottom}>{this.state.placeName}</Text>
                                }
                                </View>
                                <View style={styles.flexRow}>
                                    <Icon name='calendar' size={20} color={colorWhite} />
                                    {this.state.isLoading ? <Text style={{ color: colorWhite }}>-- -- -- --</Text> : <Text style={styles.textBottom}>{this.state.dateNow}</Text>}
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Card title="JADWAL SHOLAT HARI INI" containerStyle={styles.styleCard}>
                            <SkeletonContent
                                containerStyle={{ flex: 1 }}
                                isLoading={this.state.isLoading}
                                layout={[
                                    { key: "someId", width: 300, height: 20, marginBottom: 6 },
                                    { key: "someId2", width: 300, height: 20, marginBottom: 6 },
                                    { key: "someId3", width: 300, height: 20, marginBottom: 6 },
                                    { key: "someId4", width: 300, height: 20, marginBottom: 6 },
                                    { key: "someId5", width: 300, height: 20, marginBottom: 6 },
                                    { key: "someId6", width: 300, height: 20, marginBottom: 6 },
                                ]}
                            >
                                <JadwalComponent title='Imsak' time={this.state.jadwal.Imsak} />
                                <JadwalComponent title='Shubuh' time={this.state.jadwal.Fajr} />
                                <JadwalComponent title='Dzuhur' time={this.state.jadwal.Dhuhr} />
                                <JadwalComponent title='Ashar' time={this.state.jadwal.Asr} />
                                <JadwalComponent title='Maghrib' time={this.state.jadwal.Maghrib} />
                                <JadwalComponent title='Isya' time={this.state.jadwal.Isha} />
                            </SkeletonContent>
                        </Card>
                    </View>
                    <View>
                        <Card containerStyle={styles.styleCard} >
                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 4, }}>Ayat Hari Ini</Text>
                                <SkeletonContent
                                    containerStyle={{ flex: 1 }}
                                    isLoading={this.state.isLoading}
                                    layout={[
                                        { key: 'id1', width: 100, height: 20, marginBottom: 6 },
                                        { key: 'id2', width: 300, height: 100, marginBottom: 6 },
                                    ]}
                                >
                                    <Text style={{ fontSize: 12, marginBottom: 10 }}>{this.state.namasurat} {this.state.quranAr.ayat}</Text>
                                    <Text style={{ fontSize: 18, marginBottom: 10 }}>{this.state.quranAr.teks}</Text>
                                    <Text style={{ fontSize: 12 }}>{this.state.quranId.teks}</Text>
                                </SkeletonContent>
                            </View>
                        </Card>
                    </View>
                </View>
            </ScrollView>
        )
    }
}



const styles = StyleSheet.create({
    containerAdzan: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40
    },
    textAdzan: {
        color: colorWhite,
        fontSize: 18,
    },
    waktuAdzan: {
        color: colorWhite,
        fontSize: 36,
        fontWeight: 'bold'
    },
    containerLokasi: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: 5
    },
    textBottom: {
        fontSize: 10,
        alignSelf: 'center',
        fontWeight: 'bold',
        color: colorWhite
    },
    flexRow: {
        flexDirection: 'row'
    },
    styleCard: {
        elevation: 3,
        borderWidth: 0,
        borderRadius: 15
    }
})
