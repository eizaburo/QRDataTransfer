import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { sendGridEmail } from 'react-native-sendgrid'
import { SENDGRID_API_KEY } from 'react-native-dotenv';

//redux
import { connect } from 'react-redux';
import { updateEmail, updateScanned, updateQRData } from '../actions/configAction';

//icon
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

//send grid
const apiKey = SENDGRID_API_KEY;

class QRScanned extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: "読取り結果",
        headerLeft: () => (<Icon name="chevron-left" size={24} onPress={() => {
            navigation.state.params.updateScanned(false);
            navigation.goBack();
        }} style={{ marginLeft: 10 }} />)
    });

    state = {
        qrData: '',
        email: '',
    }

    getQRData = () => {
        const qrData = this.props.navigation.state.params;
        this.setState({ qrData: qrData });
    }

    sendEmail = (values) => {
        // alert(JSON.stringify(values));
        sendGridEmail(apiKey, values.email, "info@eizaburo.com", "From QR Data Transfer", values.qrData)
            .then(res => {
                alert("メールを送信しました。");
            })
            .catch(e => {
                alert("送信に失敗しました。");
            })
    }

    getEmail = async () => {
        const email = await AsyncStorage.getItem("email");
        this.setState({ email: email });
    }

    componentDidMount = () => {
        this.getQRData();
        // this.getEmail();
        // this.props.updateScanned(false);
        this.props.navigation.setParams({
            updateScanned: this.props.updateScanned,
        });

    }

    render() {
        return (
            <View>
                <Formik
                    enableReinitialize
                    initialValues={{
                        qrData: this.state.qrData,
                        email: this.props.config.email,
                    }}
                    onSubmit={(values) => this.sendEmail(values)}
                    validationSchema={Yup.object().shape({
                        qrData: Yup.string().required(),
                        email: Yup.string().email().required(),
                    })}
                >
                    {
                        ({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                            <Card
                                title="読取りデータの転送"
                            >
                                <Input
                                    label="読取りデータ"
                                    containerStyle={{ marginTop: 20 }}
                                    value={values.qrData}
                                    editable={false}
                                />
                                <Input
                                    label="転送先Email"
                                    containerStyle={{ marginTop: 20 }}
                                    value={values.email}
                                    onChangeText={handleChange("email")}
                                    onBlur={handleBlur("email")}
                                    errorMessage={touched.email && errors.email ? errors.email : null}
                                />
                                <Button
                                    title="送信"
                                    containerStyle={{ marginTop: 20 }}
                                    buttonStyle={{ height: 60 }}
                                    onPress={handleSubmit}
                                />
                                <Button
                                    title="QR読取りに戻る"
                                    containerStyle={{ marginTop: 10 }}
                                    buttonStyle={{ backgroundColor: "#789" }}
                                    onPress={() => {
                                        this.props.updateScanned(false);
                                        this.props.navigation.navigate("QRScan");
                                    }}
                                />
                            </Card>
                        )
                    }
                </Formik>
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

export default connect(mapStateToProps, mapDispatchToProps)(QRScanned);