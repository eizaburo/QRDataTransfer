import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

//redux
import { connect } from 'react-redux';
import { updateEmail, updateScanned, updateQRData } from '../actions/configAction';

class Home extends React.Component {

    getEmail = async () => {
        const email = await AsyncStorage.getItem("email");
        this.props.updateEmail(email);
    }

    componentDidMount = () => {
        this.getEmail();
    }

    render() {
        // console.log(this.props.config);
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ marginTop: 30, alignSelf: "center", fontSize: 20 }}>QR Data Transfer</Text>
                <Button
                    title="QRコードを読み取る"
                    containerStyle={{ marginTop: 10, alignSelf: "center" }}
                    buttonStyle={{ height: 60, width: 240, marginTop: 20 }}
                    onPress={() => {
                        this.props.updateScanned(false);
                        this.props.navigation.navigate("QRScan");
                    }}
                />
            </View>
        );
    }
}

const mapStateToProps = state => (
    {
        config: state.config,
    }
);

const mapDispatchToProps = dispatch => (
    {
        updateEmail: email => dispatch(updateEmail(email)),
        updateScanned: scanned => dispatch(updateScanned(scanned)),
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);