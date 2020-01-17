import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
// import sgMail from '@sendgrid/mail';
import { sendGridEmail } from 'react-native-sendgrid'

const apiKey = "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";

class QRScanned extends React.Component {

    state = {
        qrData: '',
    }

    getQRData = () => {
        const qrData = this.props.navigation.state.params;
        this.setState({ qrData: qrData });
    }

    sendEmail = (values) => {
        // alert(JSON.stringify(values));
        sendGridEmail(apiKey, values.email, "info@eizaburo.com", "From QR Data Transfer", values.qrData)
            .then(res => {
                alert("送信しました。");
            })
            .catch(e => {
                alert("送信に失敗しました。");
            })
    }

    componentDidMount = () => {
        this.getQRData();
    }

    render() {
        return (
            <View>
                <Formik
                    enableReinitialize
                    initialValues={{
                        qrData: this.state.qrData,
                        email: 'eizaburo.tamaki@gmail.com'
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
                                    editable={false}
                                />
                                <Button
                                    title="送信"
                                    containerStyle={{ marginTop: 30 }}
                                    buttonStyle={{ height: 60 }}
                                    onPress={handleSubmit}
                                />
                            </Card>
                        )
                    }
                </Formik>
            </View>
        );
    }
}

export default QRScanned;