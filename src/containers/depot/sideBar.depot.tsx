import React from 'react';
import { Button, View, Text } from 'native-base';
import { DepotStackParamList } from '../../@types/navigationTypes';

const SideBarDepot = ({ navigation }: DepotStackParamList<'HomeScreen'>) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()}>
                <Text>d</Text>
            </Button>
        </View>
    );
};

export default SideBarDepot;
