import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Quran, Surat, Splash, Notif, Iqra, IqraDetail } from '../pages';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { colorPrimary, colorStatusBar, colorWhite } from '../assets/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MyTab = () => {
    return (
        <Tab.Navigator
            activeColor={colorPrimary}
            barStyle={{ backgroundColor: '#fff' }}
            initialRouteName="jadwal"
        >
            <Tab.Screen
                name="quran" component={Quran}
                options={{
                    tabBarLabel: 'Al-Quran',
                    tabBarIcon: ({ color }) => (
                        <Icon name="book-open-page-variant" size={25} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="jadwal" component={Home}
                options={{
                    tabBarLabel: 'Jadwal Sholat',
                    tabBarIcon: ({ color }) => (
                        <Icon name="clock" size={25} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="iqra" component={Iqra}
                options={{
                    tabBarLabel: 'Iqra',
                    tabBarIcon: ({ color }) => (
                        <Icon name="book-open" size={25} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const Route = () => {
    return (
        <Stack.Navigator
            initialRouteName="Splash"
        >
            <Stack.Screen name="Home" component={MyTab}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name="Splash" component={Splash}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen name="IqraDetail" component={IqraDetail}
               />
            <Stack.Screen name="Surat" component={Surat} />
        </Stack.Navigator>
    )
}

export default Route;