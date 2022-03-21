import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, Image as RNImage } from 'react-native';
import { Image, Box, Button, Center, Heading, Popover, Switch, Text, useToast, VStack, ScrollView, Modal, StatusBar } from 'native-base';
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
import { useDispatch, useSelector } from 'react-redux';
import { Ar17M, Ar17N, Ar17RBlack, Ar18M, Ar18SbBlack, Ar21Sb, Ar22M, Ar25SbBlack, Ar36B } from '../../../themes/font.style';
import DefaultDown from '../../../components/dropdown/default.down';
import { RootState } from '../../../store';
import { TransactionBagCase, TransactionPickupCase } from '../../../etc/bookStatusCase';
import { dateFormatDays, dateFormatDays2 } from '../../../utils/times';
import ModalWrapper from '../../commons/modal/modal.wrapper';
import WebSheet from '../../../components/bottomSheet/web.sheet';
import { addressNullCheck } from '../../../utils/gup';

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
const limitImage = require('../../../assets/image/low.png');
const { width } = Dimensions.get('window');

const MainCollection = () => {
    const { userRole, isLogin, user } = useSelector((state: RootState) => state.auth);

    const dispatch = useDispatch();
    const toast = useToast();
    const navigation = useNavigation();
    const { axiosService } = useAxiosServices();
    const [address, setAddress] = useState<addressListType>({
        address: '',
        idx: 0,
        lat: 0,
        lot: 0,
        main: 0,
        addressMore: '',
        postcode: '',
        moreText: '',
    });
    const [step, setStep] = useState<number>(0);
    const [bagData, setBagData] = useState<bagType[]>([{ type: 5, value: 0 }]);
    const [needBag, setNeedBag] = useState<bagType[]>([{ type: 5, value: 0 }]);
    const [useBag, setUseBag] = useState<boolean>(false);
    const [bag, setBag] = useState<number>(0);
    const [pickDate, setPickDate] = useState<string | null>(null);
    const [pickTime, setPickTime] = useState<string | null>(null);
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

    const [weekNo, setWeekNo] = useState<string[]>([]);
    const [dateNo, setDateNo] = useState<string[]>([]);
    const [bagLimit, setBagLimit] = useState(0);

    const getUserMain = async () => {
        try {
            const api = await axiosService.post('/users/app/address/main');
            const { status, main, locationBags, weekDisabled, dateDisabled } = api.data;
            console.log('Data', api.data);
            if (status) {
                setAddress({ ...main });
                setWeekNo([...weekDisabled]);
                setDateNo([...dateDisabled]);
                setBagLimit(locationBags);
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

    const typeValueHandler = (index: number, typeValue) => {
        const initial = [...bagData];
        const target = bagData[index];
        console.log(target);
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
        const changeValue = { type: typeValue, value };
        initial[index] = changeValue;
        setBagData([...initial]);
    };

    const [pickType, setPickType] = useState(99);

    const typePickHandler = (index: number, typeValue: any) => {
        setPickType(typeValue);
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
            } else {
                if (bagData.length > 1) {
                    const filter = initial.filter((v, i) => i !== index);
                    setBagData([...filter]);
                }
            }
        }
    };

    const bagValueHandler2 = (index: number, amount) => {
        const amountBags = Number(amount);
        const initial = [...bagData];
        const target = bagData[index];
        if (!target) {
        }
        const { type, value } = target;
        const changeValue = { type, value: amountBags };
        initial[index] = changeValue;
        setBagData([...initial]);
    };

    const bagRemove = (index) => {
        const initial = [...bagData];
        const filter = initial.filter((v, i) => i !== index);
        setBagData([...filter]);
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

    const [limitModalOpen, setLimitModalOpen] = useState(false);

    const nextHandler = () => {
        if (nextDisabledHandler()) {
            return;
        } else {
            let number = 0;
            bagData.forEach((v) => {
                const { value, type } = v;
                number += value;
            });

            if (number < bagLimit) {
                setLimitModalOpen(true);
            } else {
                setStep((p) => p + 1);
            }
        }
    };

    const dotMove = (v: number) => {
        if (step > v) {
            setStep(v);
        }
    };

    const timeHandler = (time) => {
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

    const headerPadding = () => {
        switch (step) {
            case 0:
            case 1:
            case 2:
                return 4;
            case 3:
                return 4;
            case 4:
                return 4;
            case 5:
                return 8;
            default:
                return 4;
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
        console.log(v);
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
            pickType,
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
        form.append('file', imageData as any);
        form.append('idx', idx as any);
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
                setModalComplete(true);
            }
        } catch (e) {
            console.log(e);
        }
    };
    const addBag = () => {
        const temp = [...bagData, { type: 5, value: 0 }];
        if (temp.length < 5) {
            setBagData([...temp]);
        }
    };

    const bagDataView = () => {
        if (user?.userType === 1) {
            return step < 3;
        } else {
            return step === 0;
        }
    };

    const [webOpen, setWebOpen] = useState(false);

    return (
        <>
            <StatusBar barStyle={'dark-content'} />
            <CollectionHeader step={step} modalHandler={modalHandler} navigation={navigation} optional={backHandler} />
            <Box bg={'white.100'} safeAreaBottom={step !== 5} flex={1} alignItems={'center'}>
                <Box flex={1} px={step === 5 ? 0 : '28px'} py={4}>
                    <Box px={headerPadding()}>
                        <Heading my={4} {...Ar36B} fontSize={'34px'} color={'black.100'}>
                            {headerText()}
                        </Heading>
                        {step === 3 && (
                            <Text {...Ar18M} fontSize={'15px'} color={'blue.100'}>
                                {`Let us know your secure bags location\n`}(Please be specific)
                            </Text>
                        )}
                    </Box>
                    <Box top={step === 5 ? '0px' : '0px'} flex={1} alignItems={'center'} justifyContent={'center'}>
                        {step < 3 && (
                            <KeyboardAwareScrollView pt={4} p={2} flex={1} showsVerticalScrollIndicator={false}>
                                <VStack justifyContent={'center'} alignItems={'center'} space={4}>
                                    {bagDataView() && (
                                        <>
                                            <Box justifyContent={'center'} alignItems={'center'}>
                                                {bagData.map((v, i) => (
                                                    <>
                                                        {/*@ts-ignore*/}
                                                        <DefaultDown
                                                            value={v.type}
                                                            defaultButtonText={'Type of bags'}
                                                            data={[1, 2, 3, 4]}
                                                            index={i}
                                                            switchAction={TransactionBagCase}
                                                            bagValueHandler={typeValueHandler}
                                                        />
                                                        <NumberInput
                                                            bagValueHandler2={bagValueHandler2}
                                                            value={v.value}
                                                            index={i}
                                                            bagValueHandler={bagValueHandler}
                                                        />
                                                        {i > 0 && (
                                                            <Box
                                                                w={'100%'}
                                                                justifyContent={'flex-end'}
                                                                flexDirection={'row'}
                                                                alignItems={'center'}
                                                                right={3}
                                                                bottom={3}
                                                            >
                                                                <TouchableOpacity onPress={() => bagRemove(i)}>
                                                                    <Text {...Ar18SbBlack} color={'gray.200'}>
                                                                        Remove
                                                                    </Text>
                                                                </TouchableOpacity>
                                                            </Box>
                                                        )}
                                                    </>
                                                ))}
                                            </Box>
                                            {user?.userType !== 1 && bagData.length < 4 && (
                                                <Box w={'100%'} justifyContent={'center'} flexDirection={'row'} alignItems={'center'}>
                                                    <TouchableOpacity onPress={() => addBag()}>
                                                        <Text {...Ar21Sb} color={'blue.200'}>
                                                            Add
                                                        </Text>
                                                    </TouchableOpacity>
                                                </Box>
                                            )}
                                            {/*{step === 0 && (*/}
                                            {/*    <Box justifyContent={'center'} alignItems={'center'} mt={'31px'}>*/}
                                            {/*        <Popover*/}
                                            {/*            trigger={(triggerProps) => {*/}
                                            {/*                return (*/}
                                            {/*                    <Button*/}
                                            {/*                        onPress={() => setWebOpen(true)}*/}
                                            {/*                        bg={'#00ff0000'}*/}
                                            {/*                        _pressed={{ opacity: 0.5, bg: '#00ff0000' }}*/}
                                            {/*                    >*/}
                                            {/*                        <Text*/}
                                            {/*                            underline*/}
                                            {/*                            color={'black.100'}*/}
                                            {/*                            fontFamily={'Arch'}*/}
                                            {/*                            fontWeight={700}*/}
                                            {/*                            fontSize={'14px'}*/}
                                            {/*                        >*/}
                                            {/*                            What is RECAN bag?*/}
                                            {/*                        </Text>*/}
                                            {/*                    </Button>*/}
                                            {/*                );*/}
                                            {/*            }}*/}
                                            {/*        >*/}
                                            {/*            <Popover.Content accessibilityLabel="Delete Customerd" w="56">*/}
                                            {/*                <Popover.Arrow />*/}
                                            {/*                <Popover.CloseButton />*/}
                                            {/*                <Popover.Header>Recan Bag</Popover.Header>*/}
                                            {/*                <Popover.Body>*/}
                                            {/*                    It's a bag provided by Recan. If you're using this bag, please check it out.*/}
                                            {/*                </Popover.Body>*/}
                                            {/*                <Popover.Footer justifyContent="flex-end"></Popover.Footer>*/}
                                            {/*            </Popover.Content>*/}
                                            {/*        </Popover>*/}
                                            {/*    </Box>*/}
                                            {/*)}*/}
                                        </>
                                    )}

                                    {step > 0 && (
                                        <Box>
                                            <CalenderInput
                                                dateNo={dateNo}
                                                weekNo={weekNo}
                                                date={pickDate}
                                                calnderHandler={calnderHandler}
                                            />
                                        </Box>
                                    )}
                                    {step > 1 && (
                                        <Box>
                                            <TimeInput time={pickTime} timeHandler={timeHandler} />
                                            <Box marginTop={'16px'} />
                                            {/*@ts-ignore*/}
                                            {user?.userType === 2 && (
                                                <DefaultDown
                                                    defaultButtonText={'Regular pickup'}
                                                    defaultValueByIndex={pickType}
                                                    data={[1, 2, 3]}
                                                    index={pickType}
                                                    switchAction={TransactionPickupCase}
                                                    bagValueHandler={typePickHandler}
                                                />
                                            )}
                                        </Box>
                                    )}
                                </VStack>
                            </KeyboardAwareScrollView>
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
                                            <Heading textAlign={'left'} my={8} mb={0} {...Ar36B}>
                                                Upload photo
                                            </Heading>
                                            {photo && (
                                                <Box mt={4} justifyContent={'center'} alignItems={'center'} flexDirection={'row'}>
                                                    <RNImage
                                                        style={{ borderRadius: 12, width: 100, height: 100, resizeMode: 'contain' }}
                                                        source={{
                                                            uri: photo.path,
                                                        }}
                                                    />
                                                    <Box alignSelf={'flex-end'} ml={4}>
                                                        <TouchableOpacity onPress={() => setPhoto(null)}>
                                                            <Text {...Ar18M} color={'gray.300'}>
                                                                Remove
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </Box>
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
                                                    <RNImage
                                                        style={{ width: 33, height: 33, resizeMode: 'contain' }}
                                                        source={CameraImage}
                                                    />
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
                                                    <Image
                                                        style={{ width: 30, height: 30, resizeMode: 'contain' }}
                                                        source={LibImage}
                                                        alt={'LibImage'}
                                                    />
                                                </Button>
                                            </Box>
                                        </Box>
                                    </VStack>
                                </Box>
                            </KeyboardAwareScrollView>
                        )}
                        {step === 4 && (
                            <Box pt={2} p={2} flex={1} w={'100%'}>
                                <VStack w={'100%'} justifyContent={'center'} alignItems={'center'} space={4}>
                                    <Box
                                        p={4}
                                        py={6}
                                        alignItems={'center'}
                                        justifyContent={'space-between'}
                                        flexDirection={'row'}
                                        w={'100%'}
                                        maxW={'400px'}
                                        borderWidth={1}
                                        borderColor={'black.100'}
                                        borderRadius={18}
                                    >
                                        <Box>
                                            <Image w={'50px'} h={'50px'} resizeMode={'contain'} source={dog} alt={'dog'} />
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
                                                    <RNImage style={{ height: 30, width: 30, resizeMode: 'contain' }} source={unChecked} />
                                                </TouchableOpacity>
                                            )}
                                        </Box>
                                    </Box>
                                    {/*<Box w={'100%'}>*/}
                                    {/*    <Heading*/}
                                    {/*        textAlign={'left'}*/}
                                    {/*        mt={20}*/}
                                    {/*        my={8}*/}
                                    {/*        mb={4}*/}
                                    {/*        fontFamily={'Arch'}*/}
                                    {/*        fontWeight={900}*/}
                                    {/*        fontSize={'30px'}*/}
                                    {/*    >*/}
                                    {/*        {'Do you need\n' + 'RECAN bags?'}*/}
                                    {/*    </Heading>*/}
                                    {/*    <Text {...Ar18M} color={'blue.100'}>*/}
                                    {/*        {'Order extra RECAN bags for your next\n' + 'collection'}*/}
                                    {/*    </Text>*/}
                                    {/*</Box>*/}
                                    {/*<Box justifyContent={'center'} alignItems={'center'}>*/}
                                    {/*    {needBag.map((v, i) => (*/}
                                    {/*        <NumberInput value={v.value} index={i} bagValueHandler={needBagValueHandler} />*/}
                                    {/*    ))}*/}
                                    {/*</Box>*/}
                                </VStack>
                            </Box>
                        )}
                        {step === 5 && (
                            <Box flex={1} w={'100%'}>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <Box px={-10} alignSelf={'stretch'} zIndex={1} flex={1} maxH={'300px'} h={'176px'}>
                                        <GoogleMarker marker={[{ lat: address.lat, lot: address.lot }]} />
                                    </Box>
                                    <VStack w={'100%'} justifyContent={'center'} alignItems={'center'} p={2}>
                                        <EditCard
                                            source={addressPin}
                                            step={0}
                                            makeStep={setStep}
                                            type={6}
                                            anyHandler={() => setAddressOpen(true)}
                                            title={address.address}
                                            subTitle={`${address.addressMore}${addressNullCheck(address.postcode)}`}
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
                                        <EditCard
                                            source={calnerIcon}
                                            step={2}
                                            makeStep={setStep}
                                            type={pickType !== 99 ? 4 : 2}
                                            title={dateFormatDays2(pickDate)}
                                            subTitle={TransactionPickupCase(pickType)}
                                        />
                                        {pickTime && pickTime !== '' && (
                                            <EditCard source={timerIcon} step={2} makeStep={setStep} type={2} title={pickTime ?? 'Time'} />
                                        )}

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
                                        {/*{needBag.map((v) => (*/}
                                        {/*    <EditCard*/}
                                        {/*        step={4}*/}
                                        {/*        source={bagIcon}*/}
                                        {/*        makeStep={setStep}*/}
                                        {/*        type={4}*/}
                                        {/*        title={'RECAN bag order'}*/}
                                        {/*        subTitle={`${v.value} ${' '}Bags`}*/}
                                        {/*    />*/}
                                        {/*))}*/}
                                    </VStack>
                                    <Box mb={'100px'} />
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

                        <Box
                            position={step === 5 ? 'absolute' : 'relative'}
                            bottom={step === 5 ? '0px' : '0px'}
                            mb={step !== 5 ? '0px' : '0px'}
                            flexDirection={'row'}
                            w={'100%'}
                            justifyContent={'center'}
                        >
                            {step < 5 ? (
                                <Button
                                    width={'338px'}
                                    onPress={() => nextHandler()}
                                    disabled={nextDisabledHandler()}
                                    _disabled={{ bg: 'gray.100' }}
                                    variant={'basicButton'}
                                    shadow={8}
                                    bg={nextDisabledHandler() ? 'gray.200' : 'blue.200'}
                                >
                                    <Text {...Ar22M} color={'white.100'}>
                                        Next
                                    </Text>
                                </Button>
                            ) : (
                                <Button
                                    width={'358px'}
                                    onPress={() => modalHandler('complete')}
                                    disabled={nextDisabledHandler()}
                                    _disabled={{ bg: 'gray.100' }}
                                    shadow={8}
                                    variant={'basicButton'}
                                    bg={nextDisabledHandler() ? 'gray.200' : 'blue.200'}
                                >
                                    <Text {...Ar22M} color={'white.100'}>
                                        Submit
                                    </Text>
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <ModalWrapper
                open={modalCancel}
                onClose={() => modalHandler('close')}
                image={houseCancel}
                title={'Cancel your Pickup?'}
                content={'Cancellation is allowed up to one\n' + 'day before scheduled pickup'}
                onHandler={[
                    {
                        text: 'No',
                        onPress: () => {
                            modalHandler('close');
                        },
                        color: 'blue.200',
                    },
                    {
                        text: 'Yes',
                        onPress: () => {
                            setModalCancel(false);
                            modalHandler('ok');
                        },
                        color: 'gray.200',
                    },
                ]}
            />
            <ModalWrapper
                open={modalOk}
                onClose={() => modalHandler('ok')}
                image={checked}
                title={'The pickup has been\n' + 'cancelled'}
                onHandler={[
                    {
                        text: 'Got it!',
                        onPress: () => {
                            setModalComplete(false);
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Main' } as any],
                            });
                        },
                        color: 'blue.200',
                    },
                ]}
            />
            <ModalWrapper
                open={modalComplete}
                onClose={() => {
                    setModalComplete(false);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Main' } as any],
                    });
                }}
                image={checked}
                title={'Congrats!'}
                content={'Your order will be confirmed\n' + 'from or of your driver'}
                onHandler={[
                    {
                        text: 'Got it!',
                        onPress: () => {
                            setModalComplete(false);
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Main' } as any],
                            });
                        },
                        color: 'blue.200',
                    },
                ]}
            />
            <ModalWrapper
                open={limitModalOpen}
                onClose={() => {
                    setLimitModalOpen(false);
                }}
                image={limitImage}
                title={'Low volume'}
                content={`Your volume is under the minimum ${bagLimit}. Please check about the Minimum volume to pick up.`}
                onHandler={[
                    {
                        text: 'Got it!',
                        onPress: () => {
                            setLimitModalOpen(false);
                        },
                        color: 'blue.200',
                    },
                ]}
            />
            <AddressSheet open={addressOpen} setOpen={setAddressOpen} addressChange={addressSelect} />
            <WebSheet open={webOpen} setOpen={setWebOpen} url={'https://recan.co'} />
        </>
    );
};

export default MainCollection;
