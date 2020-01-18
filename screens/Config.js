import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';

import { Formik } from 'formik';
import * as Yup from 'yup';

//redux
import { connect } from 'react-redux';
import { updateEmail, updateScanned, updateQRData } from '../actions/configAction';

class Config extends React.Component {

    state = {
        email: '',
    }

    saveEmail = async (values) => {
        // alert(JSON.stringify(values));

        await AsyncStorage.setItem("email", values.email);
        this.props.updateEmail(values.email);
        alert("Emailアドレスを保存しました。");
    }

    componentDidMount = async () => {
        const email = await AsyncStorage.getItem("email");
        this.setState({
            email: email,
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Formik
                    enableReinitialize
                    initialValues={{ email: this.state.email }}
                    onSubmit={(values) => this.saveEmail(values)}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().email('Emailの形式ではないようです。').required('Emailは必須です。'),
                    })}
                >
                    {
                        ({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                            <Card
                                title="送信先メール設定"
                            >
                                <Input
                                    label="Email"
                                    autoCapitalize="none"
                                    value={values.email}
                                    onChangeText={handleChange("email")}
                                    onBlur={handleBlur("email")}
                                    errorMessage={touched.email && errors.email ? errors.email : null}
                                />
                                <Button
                                    title="標準送信先アドレスに設定"
                                    containerStyle={{ marginTop: 20 }}
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

export default connect(mapStateToProps, mapDispatchToProps)(Config);