import React, { Component } from 'react'
import { Text, View } from 'react-native'
import PDFView from 'react-native-view-pdf'
import { iqra1 } from '../../assets/pdf'

const resources = {
    file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : '/sdcard/Download/downloadedDocument.pdf',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    base64: iqra1,
};


export default class index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pdfnya: this.props.route.params.pdf,
            isLoading: true,
        }
    }

    componentDidMount(){
        this.props.navigation.setOptions({
            title: this.props.route.params.title
        })
    }

    render() {
        
        const resourceType = 'base64';

        return (
            <View style={{ flex: 1 }}>
                <PDFView
                    fadeInDuration={250.0}
                    style={{ flex: 1 }}
                    resource={this.state.pdfnya}
                    resourceType={resourceType}
                    onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
                    onError={(error) => console.log('Cannot render PDF', error)}
                />
            </View>
        )
    }
}
