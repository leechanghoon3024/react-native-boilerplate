import React from 'react';
import { Box, Image, ScrollView, Text } from 'native-base';
import { Image as RNImage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { CharityListTypes } from '../../../@types/charity.types';

interface Props {
    list: CharityListTypes[];
}

const CharityList = ({ list }: Props) => {
    const navigation = useNavigation();
    return (
        <ScrollView>
            <Box mt={2}>
                {list.map((item, index) => (
                    <TouchableOpacity onPress={() => navigation.navigate('CharityDetail', { idx: item.idx })}>
                        <Box my={2} bg={'white.100'} borderRadius={18} overflow={'hidden'}>
                            <RNImage style={{ width: '100%', height: 150 }} alt={'recanShop'} source={{ uri: item.mainImage }} />
                            <Box p={4}>
                                <Text fontWeight={500} fontSize={'25px'} fontFamily={'Arch'} color={'black.100'}>
                                    {item.title}
                                </Text>
                                <Text fontWeight={500} fontSize={'18px'} fontFamily={'Arch'} color={'black.100'}>
                                    {item.subTitle}
                                </Text>
                            </Box>
                            <Box
                                top={'50%'}
                                right={'10px'}
                                width={'50px'}
                                height={'50px'}
                                borderRadius={100}
                                position={'absolute'}
                                borderWidth={1}
                                borderColor={'black.100'}
                                overflow={'hidden'}
                            >
                                <Image
                                    source={{ uri: item.logoImage }}
                                    alt={'logoImage'}
                                    style={{ width: 50, height: 50 }}
                                    resizeMode={'stretch'}
                                />
                            </Box>
                        </Box>
                    </TouchableOpacity>
                ))}
            </Box>
        </ScrollView>
    );
};

export default CharityList;
