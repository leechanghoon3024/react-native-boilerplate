import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigation } from '@react-navigation/native';
import { Box } from 'native-base';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';

const FcmUser = () => {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log('알림 내역2', remoteMessage);
    });
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
        console.log('백그라운드', remoteMessage);
    });
    // {"data": {}, "from": "834335995654", "messageId": "1646661374995530", "mutableContent": true, "notification": {"body": "dfdf", "title": "dfdf"}, "sentTime": "1646661374"}

    React.useEffect(() => {
        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
            // @ts-ignore
            const { notification, data } = remoteMessage;
            // @ts-ignore
            const { title, body } = notification;
            // @ts-ignore
            Toast.show({
                type: 'info',
                // @ts-ignore
                text1: String(title),
                text2: String(body),
            });
        });
        messaging()
            .getInitialNotification()
            .then(async (remoteMessage) => {
                //remoteMessage --> is now filled
                console.log('remoteMessage', remoteMessage);
            });

        return unsubscribe;
    });
    return <Box />;
};

export default FcmUser;
