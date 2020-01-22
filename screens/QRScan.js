import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

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
            <View style={{ flex: 1, backgroundColor: "#000" }}>

                {/* 139%はAndroidにおけるレイアウトズレのためのハック */}
                <BarCodeScanner
                    // style={[StyleSheet.absoluteFillObject, { height: "139%" }]}
                    style={[StyleSheet.absoluteFillObject]}
                    onBarCodeScanned={this.props.config.scanned ? undefined : this.handleBarcodeScanned}
                >

                </BarCodeScanner>

                {/* ガイド描画 */}
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", opacity: 0.7 }}>
                    <Text style={{ marginBottom: 40, fontSize: 18, color: "#fff" }}>QRを読取って下さい</Text>
                    <Image
                        source={require('../assets/waku.png')}
                        style={{ width: 200, height: 200 }}
                    />
                    <View>
                        <Button
                            title="キャンセル"
                            containerStyle={{ marginTop: 40 }}
                            buttonStyle={{ width: 200, height: 50 }}
                            onPress={() => this.props.navigation.navigate("Home")}
                        />
                    </View>
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