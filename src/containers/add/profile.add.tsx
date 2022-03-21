import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import ProfileAddUser from './profileAdd.user';
import ProfileAddBusiness from './profileAdd.business';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'native-base';
const ProfileAdd = () => {
    const { userType, addressCheck } = useSelector((state: RootState) => state.auth.user);
    const navigation = useNavigation();
    return (
        <>
            <StatusBar barStyle={'dark-content'} />
            {userType && userType === 1 ? <ProfileAddUser /> : <ProfileAddBusiness />}
        </>
    );
};

export default ProfileAdd;
