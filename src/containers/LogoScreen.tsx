import React from 'react';
import { ImageBackground } from 'react-native';
import { Center, Image } from 'native-base';

const Logo = require('../assets/logo/recan-colour-logo.png');

const LogoScreen = ({}) => {
    return (
        <Center flex={1} px="3">
            <Image source={Logo} alt="Alternate Text" width={210} height={60} />
        </Center>
    );
};

export default LogoScreen;
