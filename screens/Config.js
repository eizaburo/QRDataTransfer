import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';

import { Formik } from 'formik';
import * as Yup from 'yup';

class Config extends React.Component {

    state = {
        email: '',
    }

    saveEmail = async (values) => {
        // alert(JSON.stringify(values));

        await AsyncStorage.setItem("email", values.email);
        alert("保存しました。");
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
                        email: Yup.string().email().required(),
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
                                />
                                <Button
                                    title="標準アドレスに設定"
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

export default Config;