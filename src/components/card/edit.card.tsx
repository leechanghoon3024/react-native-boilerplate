import React, { Dispatch, SetStateAction, useState } from 'react';
import { Box, Image, Pressable, Text } from 'native-base';
import { Image as RNImage } from 'react-native';
import { ImageSourcePropType } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ar18SbBlack } from '../../themes/font.style';
import ImageView from 'react-native-image-viewing';
import { textSizing } from '../../utils/gup';

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
    console.log('subtitme', title);
    console.log('subTitle', subTitle);

    const subTitleHandler = () => {
        if (subTitle === undefined) {
            return false;
        }
        if (subTitle === '') {
            return false;
        }

        if (subTitle === null) {
            return false;
        }

        return true;
    };
    const [isVisible, setIsVisible] = useState(false);
    console.log('dddddd', subTitleHandler());
    return (
        <>
            <Box mt={'20px'} flexDirection={'row'} w={'100%'} px={'28.5px'} justifyContent={'space-between'} alignItems={'center'}>
                <Box flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Box justifyContent={'center'} alignItems={'flex-start'} pb={'20px'}>
                        <Image source={source} alt={'title'} width={'38px'} height={'38px'} />
                    </Box>
                    <Box
                        pb={'20px'}
                        ml={'22px'}
                        flexDirection={'row'}
                        borderBottomWidth={1}
                        borderColor={'gray.100'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                    >
                        <Box flexDirection={'row'} justifyContent={'space-between'} w={'90%'}>
                            <Box justifyContent={'center'}>
                                <Box flexDirection={'row'} alignItems={'center'}>
                                    <Box flexDirection={'row'} alignItems={'center'} w={'90%'}>
                                        <Text {...Ar18SbBlack} color={type === 3 ? 'blue.200' : 'black.100'}>
                                            {`${title} `}
                                        </Text>

                                        {image && (
                                            <Pressable onPress={() => setIsVisible((p) => !p)}>
                                                <RNImage
                                                    source={{
                                                        uri: image.path,
                                                    }}
                                                    style={{
                                                        borderRadius: 8,
                                                        marginLeft: 5,
                                                        height: 55,
                                                        width: 80,
                                                        resizeMode: 'stretch',
                                                    }}
                                                />
                                            </Pressable>
                                        )}
                                    </Box>
                                </Box>
                                {subTitleHandler() && (
                                    <Text
                                        fontSize={'17px'}
                                        fontWeight={300}
                                        fontFamily={'Arch'}
                                        color={type === 4 ? 'blue.200' : 'gray.300'}
                                    >
                                        {subTitle}
                                    </Text>
                                )}
                            </Box>
                            {!disabled ? (
                                <Box>
                                    <TouchableOpacity
                                        onPress={() => (type === 6 ? anyHandler() : type === 7 ? anyHandler() : makeStep(step))}
                                    >
                                        <Text
                                            fontSize={'16px'}
                                            fontWeight={400}
                                            fontFamily={'Arch'}
                                            color={type === 7 ? 'blue.200' : 'gray.300'}
                                        >
                                            {type === 7 ? 'View' : 'Edit'}
                                        </Text>
                                    </TouchableOpacity>
                                </Box>
                            ) : (
                                <Box />
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <ImageView
                images={[{ uri: image?.path ?? '' }]}
                imageIndex={0}
                visible={isVisible}
                onRequestClose={() => setIsVisible(false)}
            />
        </>
    );
};

export default EditCard;
