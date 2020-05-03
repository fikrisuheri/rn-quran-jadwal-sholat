import React from 'react'
import { StatusBar } from 'react-native'
import { colorStatusBar } from '../../../assets/colors'

const index = () => {
    return (
        <StatusBar barStyle='light-content' backgroundColor={colorStatusBar} />
    )
}

export default index
