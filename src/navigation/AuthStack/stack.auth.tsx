import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardUser from '../../containers/user/dashboard.user';
import LogoScreen from '../../containers/LogoScreen';
import LoginAuth from '../../containers/auth/login.auth';
import LoginSelectScreen from '../../containers/auth/login.select';
import LoginSingUp from '../../containers/auth/login.signUp';
import LoginSignIn from '../../containers/auth/login.signIn';
import { AuthParamList } from '../../@types/navigationTypes';
import EmailValidate from '../../containers/auth/email.validate';
import EmailComplete from '../../containers/auth/email.complete';
import ProfilePage from '../../containers/auth/profile.page';
import MapTest from '../../containers/driver/map.test';
import PasswordFind from '../../containers/auth/password.find';
import PasswordValidate from '../../containers/auth/password.validatae';
import PasswordChange from '../../containers/auth/password.change';

const Stack = createNativeStackNavigator<AuthParamList>();

const StackAuth = () => {
    return (
        <Stack.Navigator initialRouteName={'LoginSelect'}>
            <Stack.Screen name={'LoginSelect'} component={LoginSelectScreen} options={{ headerShown: false }} />
            <Stack.Screen name={'SingUpScreen'} component={LoginSingUp} options={{ headerShown: false }} />
            <Stack.Screen name={'SingInScreen'} component={LoginSignIn} options={{ headerShown: false }} />
            <Stack.Screen name={'LogoScreen'} component={LogoScreen} options={{ headerShown: false }} />
            <Stack.Screen name={'EmailValidate'} component={EmailValidate} options={{ headerShown: false }} />
            <Stack.Screen name={'EmailComplete'} component={EmailComplete} options={{ headerShown: false }} />
            <Stack.Screen name={'ProfilePage'} component={ProfilePage} options={{ headerShown: false }} />
            <Stack.Screen name={'PassWordFind'} component={PasswordFind} options={{ headerShown: false }} />
            <Stack.Screen name={'PasswordValidate'} component={PasswordValidate} options={{ headerShown: false }} />
            <Stack.Screen name={'PasswordChange'} component={PasswordChange} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default StackAuth;
