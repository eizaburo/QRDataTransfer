import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

class Home extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>QR Data Transfer</Text>
                <Button
                    title="QRコードを読み取る"
                    containerStyle={{ marginTop: 10 }}
                    buttonStyle={{ height: 60, width: 240 }}
                    onPress={() => this.props.navigation.navigate("QRScan")}
                />
            </View>
        );
    }
}

export default Home;