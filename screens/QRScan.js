import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button } from 'react-native-elements';
import { ConfirmDialog } from 'react-native-simple-dialogs';

//redux
import { connect } from 'react-redux';
import { updateEmail, updateScanned, updateQRData } from '../actions/configAction';

class QRScan extends React.Component {

    state = {
        hasCameraPermission: null,
        confirmVisible: false,
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
                    onBarCodeScanned={this.props.config.scanned ? undefined : this.handleBarcodeScanned}
                >

                </BarCodeScanner>

                {/* 外枠描画 */}
                <View style={{ flex: 1, width: "100%", backgroundColor: "#000", opacity: 0.5, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "#fff", fontSize: 18 }}
                        onPress={() => this.props.navigation.navigate("QRScanned", "12345")}
                    >QRを読取って下さい</Text>
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

                {/* dialogs */}
                <ConfirmDialog
                    title="QRを読取りました"
                    message={this.props.config.qrdata}
                    visible={this.state.confirmVisible}
                    onTouchOutside={() => this.setState({ confirmVisible: false })}
                    positiveButton={{
                        title: "転送画面へ",
                        onPress: async () => {

                            this.setState({
                                confirmVisible: false,
                            });

                            await this.props.navigation.navigate("QRScanned", this.props.config.qrdata)

                        }
                    }}
                    negativeButton={{
                        title: "再度読み取る",
                        onPress: () => {
                            this.setState({
                                confirmVisible: false,
                            });
                            this.props.updateScanned(false);
                        }
                    }}
                />

            </View>
        );
    }

    handleBarcodeScanned = async ({ type, data }) => {

        console.log("read!!");

        //set store
        await this.props.updateScanned(true);
        await this.props.updateQRData(data);

        //confirm on
        await this.setState({
            confirmVisible: true,
        });

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
        updateQRData: qrdata => dispatch(updateQRData(qrdata)),
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(QRScan);