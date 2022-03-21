import React from 'react';
import { Box, Button, Center, Image, Modal, Text, VStack } from 'native-base';
import { Ar17RBlack, Ar18M, Ar25SbBlack } from '../../../themes/font.style';

interface Props {
    open: boolean;
    image?: any;
    onClose: any;
    onHandler: { text: string; onPress: any; color: any }[];
    title?: any;
    content?: any;
}

const ModalWrapper = ({ open, image, onClose, onHandler, title, content }: Props) => {
    const modalButtonWidth = () => {
        const value = onHandler.length;
        switch (value) {
            case 1:
                return '100%';
            case 2:
                return '50%';
            default:
                return '100%';
        }
    };

    return (
        <Modal
            isOpen={open}
            onClose={() => {
                onClose();
            }}
        >
            <Modal.Content maxWidth="400px">
                <Modal.Body>
                    <Center my={'30px'}>
                        {image && <Image w={'131px'} h={'131px'} resizeMode={'contain'} source={image} alt={'modalImage'} />}
                        <VStack space={2} mt={4} alignItems={'center'}>
                            {title && (
                                <Text textAlign={'center'} {...Ar25SbBlack} mb={'10px'}>
                                    {title}
                                </Text>
                            )}
                            {content && (
                                <Text textAlign={'center'} {...Ar17RBlack}>
                                    {content}
                                </Text>
                            )}
                        </VStack>
                    </Center>
                </Modal.Body>
                <Modal.Footer p={0} bottom={-5}>
                    <Button.Group space={0}>
                        {onHandler.map((v, i) => (
                            <Button
                                h={'74px'}
                                bg={v.color}
                                borderRadius={0}
                                w={modalButtonWidth()}
                                variant="basicButton"
                                colorScheme="blueGray"
                                onPress={() => {
                                    v.onPress();
                                }}
                            >
                                <Text {...Ar25SbBlack} color={'white.100'}>
                                    {v.text}
                                </Text>
                            </Button>
                        ))}
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
};

export default ModalWrapper;
