import React from 'react';
import { ScrollView } from 'native-base';
import DriverCard from './driver.card';
import { useNavigation } from '@react-navigation/native';
import { collectionTypes } from '../../../@types/collection.types';
interface Props {
    list: collectionTypes[];
}
const DriverPickList = ({ list }: Props) => {
    const navigation = useNavigation();
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {list.map((v, i) => (
                <DriverCard key={i} navigation={navigation} value={v} />
            ))}
        </ScrollView>
    );
};

export default DriverPickList;
