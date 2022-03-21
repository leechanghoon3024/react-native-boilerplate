import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import UserProfile from './user.profile';
import BusinessProfile from './profile.business';
import { StatusBar } from 'native-base';

const ProfileWrapper = () => {
    const { userType } = useSelector((state: RootState) => state.auth.user);

    return (
        <>
            <StatusBar barStyle={'dark-content'} />
            {userType && userType === 1 ? <UserProfile /> : <BusinessProfile />}
        </>
    );
};

export default ProfileWrapper;
