import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image as RNImage } from 'react-native';
import { Image, Box, Button, Center, Heading, Popover, Switch, Text, useToast, VStack, ScrollView, Modal } from 'native-base';
import CollectionHeader from '../../header/header.collection';
import NumberInput from '../../../components/customInput/number.input';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CalenderInput from '../../../components/customInput/calender.input';
import { bagType } from '../../../@types/collection.types';
import TimeInput from '../../../components/customInput/time.input';
import TextAreaInput from '../../../components/customInput/textarea.input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import GoogleMarker from '../../../components/map/google.marker';
import EditCard from '../../../components/card/edit.card';
import useAxiosServices, { baseUrl } from '../../../hooks/axiosHooks';
import { addressListType } from '../../../@types/userTypes';
import AddressSheet from '../../../components/bottomSheet/address.sheet';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadingAction } from '../../../store/commonReducer';
import { useDispatch } from 'react-redux';

const LibImage = require('../../../assets/icons/photo.png');
const CameraImage = require('../../../assets/icons/camera.png');

const reIcon = require('../../../assets/icons/recycle.png');
const dog = require('../../../assets/icons/dog.png');
const checked = require('../../../assets/icons/checked.png');
const unChecked = require('../../../assets/icons/unChecked.png');
const addressPin = require('../../../assets/icons/address-pin.png');
const calnerIcon = require('../../../assets/icons/datepicker.png');
const timerIcon = require('../../../assets/icons/Clock.png');
const pencel = require('../../../assets/icons/pen.png');
const cameraBlue = require('../../../assets/icons/photo-blue.png');
const petIcon = require('../../../assets/icons/pet.png');
const bagIcon = require('../../../assets/icons/recan-bag.png');
const houseCancel = require('../../../assets/icons/houseCancel.png');

const MainCollection = () => {
    const dispatch = useDispatch();
    const toast = useToast();
    const navigation = useNavigation();
    const { axiosService } = useAxiosServices();
    const [address, setAddress] = useState<addressListType>({ address: '', idx: 0, lat: 0, lot: 0, main: 0 });
    const [step, setStep] = useState<number>(0);
    const [bagData, setBagData] = useState<bagType[]>([{ type: 0, value: 0 }]);
    const [needBag, setNeedBag] = useState<bagType[]>([{ type: 0, value: 0 }]);
    const [useBag, setUseBag] = useState<boolean>(false);
    const [bag, setBag] = useState<number>(0);
    const [pickDate, setPickDate] = useState<string | null>(null);
    const [pickTime, setPickTime] = useState<{ time: string; ap: string; hour: string } | null>(null);
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState<any>(null);
    const [dogCheck, setDogCheck] = useState<boolean>(false);
    const [pick, setPick] = useState(false);
    const [modalCancel, setModalCancel] = useState(false);
    const [modalOk, setModalOk] = useState(false);
    const [modalComplete, setModalComplete] = useState(false);
    useEffect(() => {
        getUserMain();
    }, []);
    console.log(address);

    const getUserMain = async () => {
        try {
            const api = await axiosService.post('/users/app/address/main');
            const { status, main } = api.data;
            if (status) {
                setAddress({ ...main });
            }
        } catch (e) {
            console.log(e);
        }
    };
    const photoHandler = async (type: 'pick' | 'camera') => {
        if (type === 'pick') {
            await ImagePicker.openPicker({
                width: 600,
                height: 600,
                cropping: true,
                compressImageQuality: 0.5,
            }).then((image) => {
                setPhoto(image);
                console.log(image);
            });
        } else {
            await ImagePicker.openCamera({
                width: 600,
                height: 600,
                compressImageQuality: 0.5,
            }).then((image) => {
                setPhoto(image);
            });
        }
    };

    const calnderHandler = (date: string) => {
        setPickDate(date);
    };

    const backHandler = () => {
        if (step === 0) {
            navigation.goBack();
        } else {
            setStep((p) => p - 1);
        }
    };

    const bagValueHandler = (index: number, amount: 'up' | 'minus') => {
        const initial = [...bagData];
        const target = bagData[index];
        if (!target) {
            toast.show({
                placement: 'top',
                description: 'Complete',
                render: () => {
                    return (
                        <Box justifyContent={'center'} alignContent={'center'} w={'200px'} bg="blue.200" px="2" py="2" rounded="sm" mb={5}>
                            <Text color={'white.100'} textAlign={'center'}>
                                Sorry, Error!
                            </Text>
                        </Box>
                    );
                },
            });
        }
        const { type, value } = target;
        if (amount === 'up') {
            const changeValue = { type, value: value + 1 };
            initial[index] = changeValue;
            setBagData([...initial]);
        } else {
            if (value > 0) {
                const changeValue = { type, value: value - 1 };
                initial[index] = changeValue;
                setBagData([...initial]);
            }
        }
    };
    const needBagValueHandler = (index: number, amount: 'up' | 'minus') => {
        const initial = [...needBag];
        const target = needBag[index];
        if (!target) {
            toast.show({
                placement: 'top',
                description: 'Complete',
                render: () => {
                    return (
                        <Box justifyContent={'center'} alignContent={'center'} w={'200px'} bg="blue.200" px="2" py="2" rounded="sm" mb={5}>
                            <Text color={'white.100'} textAlign={'center'}>
                                Sorry, Error!
                            </Text>
                        </Box>
                    );
                },
            });
        }
        const { type, value } = target;
        if (amount === 'up') {
            const changeValue = { type, value: value + 1 };
            initial[index] = changeValue;
            setNeedBag([...initial]);
        } else {
            if (value > 0) {
                const changeValue = { type, value: value - 1 };
                initial[index] = changeValue;
                setNeedBag([...initial]);
            }
        }
    };
    const nextDisabledHandler = () => {
        let check = false;

        if (step === 1) {
            check = !pickDate;
        }
        if (step === 2) {
            check = !pickDate;
        }
        if (step === 3) {
            check = description === '';
        }
        bagData.forEach((v) => {
            const { value, type } = v;
            if (value <= 0) {
                check = true;
            }
        });
        return check;
    };

    const nextHandler = () => {
        if (nextDisabledHandler()) {
            return;
        } else {
            setStep((p) => p + 1);
        }
    };

    const dotMove = (v) => {
        if (step > v) {
            setStep(v);
        }
    };

    const timeHandler = (time: { time: string; ap: string; hour: string }) => {
        setPickTime(time);
    };

    const headerText = () => {
        switch (step) {
            case 0:
            case 1:
            case 2:
                return 'Collection Details';
            case 3:
                return 'Description';
            case 4:
                return 'Select options';
            case 5:
                return 'Your Pickup';
            default:
                return '';
        }
    };

    const modalHandler = async (type: 'close' | 'ok' | 'complete') => {
        if (type === 'close') {
            setModalCancel((p) => !p);
        } else if (type === 'ok') {
            setModalOk((p) => !p);
        } else {
            await dataSave();
        }
    };

    const addressSelect = (v: addressListType) => {
        setAddress({ ...v });
    };

    const [addressOpen, setAddressOpen] = useState(false);

    const dataGenerator = () => {
        const data = {
            address,
            bagData,
            needBag,
            useBag,
            pickTime,
            pickDate,
            description,
            dogCheck,
            pickImage: photo,
        };
        const form = new FormData();
        for (const [key, value] of Object.entries(data)) {
            form.append(key, value);
        }
        return data;
    };

    const imageSave = async (idx: number) => {
        if (!photo.hasOwnProperty('width')) {
            return true;
        }
        dispatch(loadingAction());
        const accessToken = await AsyncStorage.getItem('accessToken');
        const form = new FormData();
        const { path, mime } = photo;
        const type = mime.split('/')[1] ? mime.split('/')[1] : 'jpg';
        const imageData = {
            uri: path,
            type: mime,
            name: `collection_image_${idx}.` + type,
        };
        form.append('file', imageData);
        form.append('idx', idx);
        const api = await fetch(`${baseUrl}/pick/upload/image`, {
            method: 'POST',
            body: form,
            headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${accessToken}` },
        });
        const result = await api.json();
        dispatch(loadingAction());
        return result.status;
    };

    const dataSave = async () => {
        try {
            const api = await axiosService.post('/pick/user/insert', dataGenerator());
            const { status, idx } = api.data;
            if (status) {
                photo && (await imageSave(idx));
                toast.show({
                    placement: 'top',
                    description: 'Complete',
                    render: () => {
                        return (
                            <Box
                                justifyContent={'center'}
                                alignContent={'center'}
                                w={'200px'}
                                bg="blue.200"
                                px="2"
                                py="2"
                                rounded="sm"
                                mb={5}
                            >
                                <Text color={'white.100'} textAlign={'center'}>
                                    Complete!
                                </Text>
                            </Box>
                        );
                    },
                });
                setModalComplete((p) => !p);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' }],
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    console.log(dataGenerator());

    return (
        <>
            <Box flex={1} alignItems={'center'}>
                <Box flex={1} maxW={'400px'} safeArea px={step === 5 ? 0 : 4} py={4}>
                    <Box px={step === 5 ? 4 : 0}>
                        <CollectionHeader step={step} modalHandler={modalHandler} navigation={navigation} optional={backHandler} />
                    </Box>
                    <Box px={step === 5 ? 4 : 0}>
                        <Heading my={4} fontFamily={'Arch'} fontWeight={900} fontSize={'30px'}>
                            {headerText()}
                        </Heading>
                        {step === 3 && (
                            <Text fontFamily={'Arch'} fontWeight={500} fontSize={'14px'} color={'blue.100'}>
                                Let us know your secure bags location (Please be specific)
                            </Text>
                        )}
                    </Box>

                    <Box p={2} flex={1} alignItems={'center'} justifyContent={'center'}>
                        {step < 3 && (
                            <Box pt={4} p={2} flex={1}>
                                <VStack justifyContent={'center'} alignItems={'center'} space={4}>
                                    <Box justifyContent={'center'} alignItems={'center'}>
                                        {bagData.map((v, i) => (
                                            <NumberInput value={v.value} index={i} bagValueHandler={bagValueHandler} />
                                        ))}
                                    </Box>
                                    <Box w={'100%'} justifyContent={'flex-start'} flexDirection={'row'} alignItems={'center'}>
                                        <Switch
                                            onToggle={() => setUseBag((p) => !p)}
                                            isChecked={useBag}
                                            offTrackColor="gray.100"
                                            onTrackColor="#65C466"
                                            onThumbColor="white.100"
                                            offThumbColor="white.100"
                                        />
                                        <Text ml={2} color={'gray.300'} fontFamily={'Arch'} fontWeight={300} fontSize={'14px'}>
                                            I use Recan Bag
                                        </Text>
                                    </Box>
                                    {step === 0 && (
                                        <Box justifyContent={'center'} alignItems={'center'}>
                                            <Popover
                                                trigger={(triggerProps) => {
                                                    return (
                                                        <Button
                                                            {...triggerProps}
                                                            bg={'#00ff0000'}
                                                            _pressed={{ opacity: 0.5, bg: '#00ff0000' }}
                                                        >
                                                            <Text
                                                                underline
                                                                color={'black.100'}
                                                                fontFamily={'Arch'}
                                                                fontWeight={700}
                                                                fontSize={'14px'}
                                                            >
                                                                What is RECAN bag?
                                                            </Text>
                                                        </Button>
                                                    );
                                                }}
                                            >
                                                <Popover.Content accessibilityLabel="Delete Customerd" w="56">
                                                    <Popover.Arrow />
                                                    <Popover.CloseButton />
                                                    <Popover.Header>Recan Bag</Popover.Header>
                                                    <Popover.Body>
                                                        It's a bag provided by Recan. If you're using this bag, please check it out.
                                                    </Popover.Body>
                                                    <Popover.Footer justifyContent="flex-end"></Popover.Footer>
                                                </Popover.Content>
                                            </Popover>
                                        </Box>
                                    )}
                                    {step > 0 && (
                                        <Box>
                                            <CalenderInput date={pickDate} calnderHandler={calnderHandler} />
                                        </Box>
                                    )}
                                    {step > 1 && (
                                        <Box>
                                            <TimeInput time={pickTime} timeHandler={timeHandler} />
                                        </Box>
                                    )}
                                </VStack>
                            </Box>
                        )}
                        {step === 3 && (
                            <KeyboardAwareScrollView
                                showsVerticalScrollIndicator={false}
                                keyboardDismissMode={'interactive'}
                                style={{ marginBottom: 2 }}
                            >
                                <Box pt={4} p={2} flex={1}>
                                    <VStack justifyContent={'center'} alignItems={'center'} space={4}>
                                        <TextAreaInput
                                            onChangeText={setDescription}
                                            placeholder={'e.g. Outside the front door / garage door\n'}
                                            value={description}
                                        />
                                        <Box w={'100%'} alignItems={'flex-start'}>
                                            <Heading textAlign={'left'} my={8} fontFamily={'Arch'} fontWeight={900} fontSize={'30px'}>
                                                Upload photo
                                            </Heading>
                                            {photo && (
                                                <Box justifyContent={'center'} alignItems={'center'}>
                                                    <RNImage
                                                        style={{ width: 100, height: 100, resizeMode: 'contain' }}
                                                        source={{
                                                            uri: photo.path,
                                                        }}
                                                    />
                                                </Box>
                                            )}
                                            <Box flexDirection={'row'} my={4}>
                                                <Button
                                                    onPress={() => photoHandler('camera')}
                                                    variant={'basicButton'}
                                                    w={'100px'}
                                                    h={'50px'}
                                                    borderColor={'black.100'}
                                                    borderWidth={'1'}
                                                >
                                                    <RNImage source={CameraImage} alt={'LibImage'} />
                                                </Button>
                                                <Button
                                                    onPress={() => photoHandler('pick')}
                                                    ml={3}
                                                    variant={'basicButton'}
                                                    w={'100px'}
                                                    h={'50px'}
                                                    borderColor={'black.100'}
                                                    borderWidth={'1'}
                                                >
                                                    <Image source={LibImage} alt={'LibImage'} />
                                                </Button>
                                            </Box>
                                        </Box>
                                    </VStack>
                                </Box>
                            </KeyboardAwareScrollView>
                        )}
                        {step === 4 && (
                            <Box pt={4} p={2} flex={1} w={'100%'}>
                                <VStack w={'100%'} justifyContent={'center'} alignItems={'center'} space={4}>
                                    <Box
                                        p={4}
                                        py={6}
                                        alignItems={'center'}
                                        justifyContent={'space-between'}
                                        flexDirection={'row'}
                                        w={'100%'}
                                        borderWidth={1}
                                        borderColor={'black.100'}
                                        borderRadius={18}
                                    >
                                        <Box>
                                            <Image source={dog} alt={'dog'} />
                                        </Box>
                                        <Box>
                                            <Text fontFamily={'Arch'} fontWeight={800} fontSize={'16px'}>
                                                Be aware of Dog
                                            </Text>
                                            <Text fontFamily={'Arch'} fontWeight={500} fontSize={'16px'}>
                                                Pet on premise
                                            </Text>
                                        </Box>
                                        <Box>
                                            {dogCheck ? (
                                                <TouchableOpacity onPress={() => setDogCheck(false)}>
                                                    <RNImage style={{ height: 30, width: 30 }} source={checked} />
                                                </TouchableOpacity>
                                            ) : (
                                                <TouchableOpacity onPress={() => setDogCheck(true)}>
                                                    <RNImage style={{ height: 30, width: 30 }} source={unChecked} />
                                                </TouchableOpacity>
                                            )}
                                        </Box>
                                    </Box>
                                    <Box w={'100%'}>
                                        <Heading textAlign={'left'} my={8} fontFamily={'Arch'} fontWeight={900} fontSize={'30px'}>
                                            {'Do you need\n' + 'RECAN bags?'}
                                        </Heading>
                                        <Text fontFamily={'Arch'} fontWeight={500} fontSize={'14px'} color={'blue.100'}>
                                            Order extra RECAN bags for your next collection
                                        </Text>
                                    </Box>
                                    <Box justifyContent={'center'} alignItems={'center'}>
                                        {needBag.map((v, i) => (
                                            <NumberInput value={v.value} index={i} bagValueHandler={needBagValueHandler} />
                                        ))}
                                    </Box>
                                </VStack>
                            </Box>
                        )}
                        {step === 5 && (
                            <Box flex={1} w={'100%'}>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <Box flex={1} maxH={'300px'} h={'250px'}>
                                        <GoogleMarker marker={[{ lat: address.lat, lot: address.lot }]} />
                                    </Box>
                                    <VStack w={'100%'} justifyContent={'center'} alignItems={'center'} space={4} p={2}>
                                        <EditCard
                                            source={addressPin}
                                            step={0}
                                            makeStep={setStep}
                                            type={6}
                                            anyHandler={() => setAddressOpen(true)}
                                            title={address.address}
                                            subTitle={address.moreText}
                                        />
                                        {bagData.map((v) => (
                                            <EditCard
                                                source={reIcon}
                                                step={1}
                                                makeStep={setStep}
                                                type={2}
                                                title={`${v.value} ${' '}Bags`}
                                            />
                                        ))}
                                        <EditCard source={calnerIcon} step={3} makeStep={setStep} type={2} title={`${pickDate}`} />
                                        <EditCard
                                            source={timerIcon}
                                            step={2}
                                            makeStep={setStep}
                                            type={2}
                                            title={`${pickTime?.time ?? ''} ${pickTime?.ap ?? ''}`}
                                        />
                                        <EditCard source={pencel} step={3} makeStep={setStep} type={3} title={`${description}`} />
                                        <EditCard source={cameraBlue} step={3} makeStep={setStep} type={2} title={'Photo'} image={photo} />
                                        <EditCard
                                            step={4}
                                            source={petIcon}
                                            makeStep={setStep}
                                            type={4}
                                            title={'Pet on premise'}
                                            subTitle={dogCheck ? 'Checked' : 'UnChecked'}
                                        />
                                        {needBag.map((v) => (
                                            <EditCard
                                                step={4}
                                                source={bagIcon}
                                                makeStep={setStep}
                                                type={4}
                                                title={'RECAN bag order'}
                                                subTitle={`${v.value} ${' '}Bags`}
                                            />
                                        ))}
                                    </VStack>
                                </ScrollView>
                            </Box>
                        )}
                        {step < 5 && (
                            <Box flexDirection={'row'} mb={4}>
                                {[0, 1, 2, 3, 4].map((v) => (
                                    <TouchableOpacity
                                        onPress={() => dotMove(v)}
                                        style={{
                                            backgroundColor: v === step ? '#222' : 'rgba(0,0,0,.2)',
                                            width: 8,
                                            height: 8,
                                            borderRadius: 4,
                                            marginLeft: 3,
                                            marginRight: 3,
                                            marginTop: 3,
                                            marginBottom: 3,
                                        }}
                                    />
                                ))}
                            </Box>
                        )}

                        <Box flexDirection={'row'} w={'100%'} justifyContent={'center'}>
                            {step < 5 ? (
                                <Button
                                    onPress={() => nextHandler()}
                                    disabled={nextDisabledHandler()}
                                    _disabled={{ bg: 'gray.100' }}
                                    width={'100%'}
                                    variant={'basicButton'}
                                    bg={nextDisabledHandler() ? 'gray.200' : 'blue.200'}
                                >
                                    <Text fontSize={'18px'} fontWeight={100} fontFamily={'Arch'} color={'white.100'}>
                                        Next
                                    </Text>
                                </Button>
                            ) : (
                                <Button
                                    onPress={() => modalHandler('complete')}
                                    disabled={nextDisabledHandler()}
                                    _disabled={{ bg: 'gray.100' }}
                                    width={'100%'}
                                    variant={'basicButton'}
                                    bg={nextDisabledHandler() ? 'gray.200' : 'blue.200'}
                                >
                                    <Text fontSize={'18px'} fontWeight={100} fontFamily={'Arch'} color={'white.100'}>
                                        Submit
                                    </Text>
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Modal isOpen={modalCancel} onClose={() => modalHandler('close')}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Collections</Modal.Header>
                    <Modal.Body>
                        <Center>
                            <Image w={'100px'} h={'100px'} resizeMode={'contain'} source={houseCancel} alt={'houseimage'} />
                            <VStack space={2} mt={4} alignItems={'center'}>
                                <Text fontFamily={'Arch'} fontWeight={700} fontSize={'16px'}>
                                    Cancel your Pickup?
                                </Text>
                                <Text textAlign={'center'} fontFamily={'Arch'} fontWeight={700} fontSize={'12px'}>
                                    {'Cancellation is allowed up to one\n' + 'day before scheduled pickup'}
                                </Text>
                            </VStack>
                        </Center>
                    </Modal.Body>
                    <Modal.Footer p={0}>
                        <Button.Group space={0}>
                            <Button
                                bg={'blue.200'}
                                borderRadius={0}
                                w={'50%'}
                                variant="basicButton"
                                colorScheme="blueGray"
                                onPress={() => {
                                    modalHandler('close');
                                }}
                            >
                                <Text fontFamily={'Arch'} fontWeight={700} fontSize={'16px'} color={'white.100'}>
                                    No
                                </Text>
                            </Button>
                            <Button
                                borderRadius={0}
                                bg={'gray.200'}
                                w={'50%'}
                                variant="basicButton"
                                onPress={() => {
                                    setModalCancel(false);
                                    modalHandler('ok');
                                }}
                            >
                                <Text fontFamily={'Arch'} fontWeight={700} fontSize={'16px'} color={'white.100'}>
                                    Yes
                                </Text>
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <Modal isOpen={modalOk} onClose={() => modalHandler('ok')}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Collections</Modal.Header>
                    <Modal.Body>
                        <Center>
                            <Image w={'100px'} h={'100px'} resizeMode={'contain'} source={checked} alt={'houseimage'} />
                            <VStack space={2} mt={4} alignItems={'center'}>
                                <Text textAlign={'center'} fontFamily={'Arch'} fontWeight={700} fontSize={'16px'}>
                                    {'The pickup has been\n' + 'cancelled'}
                                </Text>
                            </VStack>
                        </Center>
                    </Modal.Body>
                    <Modal.Footer p={0}>
                        <Button.Group space={0}>
                            <Button
                                borderRadius={0}
                                bg={'blue.200'}
                                w={'100%'}
                                variant="basicButton"
                                onPress={() => {
                                    setModalComplete(false);
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'Main' }],
                                    });
                                }}
                            >
                                <Text fontFamily={'Arch'} fontWeight={700} fontSize={'16px'} color={'white.100'}>
                                    Got it!
                                </Text>
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <Modal isOpen={modalComplete} onClose={() => modalHandler('complete')}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Collections</Modal.Header>
                    <Modal.Body>
                        <Center>
                            <Image w={'100px'} h={'100px'} resizeMode={'contain'} source={checked} alt={'houseimage'} />
                            <VStack space={2} mt={4} alignItems={'center'}>
                                <Text fontFamily={'Arch'} fontWeight={700} fontSize={'16px'}>
                                    Congrats!
                                </Text>
                                <Text textAlign={'center'} fontFamily={'Arch'} fontWeight={700} fontSize={'12px'}>
                                    {'Your order will be confirmed\n' + 'from or of your driver'}
                                </Text>
                            </VStack>
                        </Center>
                    </Modal.Body>
                    <Modal.Footer p={0}>
                        <Button.Group space={0}>
                            <Button
                                borderRadius={0}
                                bg={'blue.200'}
                                w={'100%'}
                                variant="basicButton"
                                onPress={() => {
                                    setModalOk(false);
                                }}
                            >
                                <Text textAlign={'center'} fontFamily={'Arch'} fontWeight={700} fontSize={'16px'} color={'white.100'}>
                                    Got it!
                                </Text>
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <AddressSheet open={addressOpen} setOpen={setAddressOpen} addressChange={addressSelect} />
        </>
    );
};

export default MainCollection;
