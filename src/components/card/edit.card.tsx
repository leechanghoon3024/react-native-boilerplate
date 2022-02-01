import React, { Dispatch, SetStateAction, useState } from 'react';
import { Box, Image, Text } from 'native-base';
import { Image as RNImage } from 'react-native';
import { ImageSourcePropType } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
interface Props {
    source: ImageSourcePropType;
    makeStep: Dispatch<SetStateAction<number>>;
    type: number;
    title: string;
    subTitle?: string;
    image?: any;
    step: number;
    anyHandler?: any;
    disabled?: boolean;
}
const EditCard = ({ anyHandler, step, source, title, type, makeStep, subTitle, image, disabled }: Props) => {
    console.log(image);
    return (
        <Box
            borderBottomWidth={0.5}
            borderColor={'gray.200'}
            flexDirection={'row'}
            p={3}
            w={'100%'}
            px={6}
            justifyContent={'space-between'}
            alignItems={'center'}
        >
            <Box flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Image source={source} alt={'title'} width={'30px'} height={'30px'} />
                <Box ml={4}>
                    <Box w={'100%'} flexDirection={'row'} alignItems={'center'}>
                        <Text
                            numberOfLines={2}
                            w={'80%'}
                            fontSize={'16px'}
                            fontWeight={700}
                            fontFamily={'Arch'}
                            color={type === 3 ? 'blue.200' : 'black.100'}
                        >
                            {`${title + ' '} `}
                            {image && (
                                <RNImage
                                    source={{
                                        uri: image.path,
                                    }}
                                    style={{ marginLeft: 5, borderRadius: 4, height: 40, width: 40, resizeMode: 'contain' }}
                                />
                            )}
                        </Text>
                    </Box>

                    {subTitle && (
                        <Text fontSize={'16px'} fontWeight={300} fontFamily={'Arch'} color={type === 4 ? 'blue.200' : 'black.100'}>
                            {subTitle}
                        </Text>
                    )}
                </Box>
            </Box>
            {!disabled && (
                <Box>
                    <TouchableOpacity onPress={() => (type === 6 ? anyHandler() : makeStep(step))}>
                        <Text fontSize={'16px'} fontWeight={400} fontFamily={'Arch'} color={'gray.300'}>
                            Edit
                        </Text>
                    </TouchableOpacity>
                </Box>
            )}
        </Box>
    );
};

export default EditCard;
