import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';

class Config extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Card
                    title="送信先メール設定"
                >
                    <Input
                        label="Email"
                    />
                    <Button
                        title="アドレスを保存"
                        containerStyle={{ marginTop: 20 }}
                        buttonStyle={{ height: 60 }}
                    />
                </Card>
            </View>
        );
    }
}

export default Config;