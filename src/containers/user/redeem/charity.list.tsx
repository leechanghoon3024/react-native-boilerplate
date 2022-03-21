import React from 'react';
import { Box, Center, Image, ScrollView, Text } from 'native-base';
import { Image as RNImage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { CharityListTypes } from '../../../@types/charity.types';
import { Ar15R, Ar25SbBlack, La15Sb } from '../../../themes/font.style';

interface Props {
    list: CharityListTypes[];
    my?: boolean;
}

const CharityList = ({ list, my }: Props) => {
    const navigation = useNavigation();
    return (
        <ScrollView showsVerticalScrollIndicator={false} px={4}>
            <Box mt={4}>
                {my && list.length === 0 && (
                    <Box h={'400px'} justifyContent={'center'} alignItems={'center'} flex={1}>
                        <Text {...Ar25SbBlack}>Choose your campaigns</Text>
                    </Box>
                )}
                {list.map((item, index) => (
                    <TouchableOpacity
                        style={{
                            marginBottom: 5,
                            shadowColor: '#00000026',
                            shadowOffset: {
                                width: 6,
                                height: 6,
                            },
                            shadowOpacity: 0.3,
                            shadowRadius: 4.65,

                            elevation: 8,
                        }}
                        onPress={() => navigation.navigate('CharityDetail' as never, { idx: item.idx } as never)}
                    >
                        <Box h={'220px'} my={2} bg={'white.100'} borderRadius={18} overflow={'hidden'}>
                            <RNImage
                                style={{ width: '100%', height: 120 }}
                                source={{ uri: item.mainImage }}
                                loadingIndicatorSource={require('../../../assets/icons/CplaceHolder.png')}
                            />
                            <Box p={4}>
                                <Text fontWeight={500} fontSize={'25px'} fontFamily={'Arch'} color={'black.100'}>
                                    {item.title}
                                </Text>
                                <Text {...La15Sb} color={'gray.300'}>
                                    {item.subTitle}
                                </Text>
                            </Box>
                            <Box
                                top={'45%'}
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
