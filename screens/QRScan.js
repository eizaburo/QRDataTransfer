import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button } from 'react-native-elements';

class QRScan extends React.Component {

    state = {
        hasCameraPermission: null,
        scanned: false,
    }

    getPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    }

    componentDidMount = () => {
        this.getPermission();
    }

    render() {

        if (this.state.hasCameraPermission === null) {
            return <Text>カメラのパーミッション取得中...</Text>
        }

        if (this.state.hasCameraPermission === false) {
            return <Text>機能を利用するためにはカメラの利用を許可してください。</Text>
        }

        return (
            <View style={{ flex: 1 }}>
                {/* 139%はAndroidにおけるレイアウトズレのためのハック */}
                <BarCodeScanner
                    style={[StyleSheet.absoluteFillObject, { height: "139%" }]}
                    onBarCodeScanned={this.state.scanned ? undefined : this.handleBarcodeScanned}
                >

                </BarCodeScanner>

                {/* 外枠描画 */}
                <View style={{ flex: 1, width: "100%", backgroundColor: "#000", opacity: 0.5, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "#fff", fontSize: 18 }}>QRを読取って下さい</Text>
                </View>
                <View style={{ flex: 1.5, width: "100%", flexDirection: "row" }}>
                    <View style={{ flex: 1, backgroundColor: "#000", opacity: 0.5 }}></View>
                    <View style={{ flex: 4 }}></View>
                    <View style={{ flex: 1, backgroundColor: "#000", opacity: 0.5 }}></View>
                </View>
                <View style={{ flex: 1, width: "100%", backgroundColor: "#000", opacity: 0.5, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <Button
                        title="キャンセル"
                        containerStyle={{ width: 240 }}
                        buttonStyle={{ height: 50, borderColor: "#fff", borderWidth: 1.2 }}
                        type="outline"
                        titleStyle={{ color: "#fff" }}
                        onPress={() => this.props.navigation.navigate("Home")}
                    />
                </View>

            </View>
        );
    }

    handleBarcodeScanned = ({ type, data }) => {
        this.setState({ scanned: true });
        alert(JSON.stringify(data));
    }

}

export default QRScan;