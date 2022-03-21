import React, { useEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Image as RNImage } from 'react-native';
import {
    Image,
    Box,
    Button,
    Center,
    Heading,
    Popover,
    Switch,
    Text,
    TextArea,
    useToast,
    VStack,
    ScrollView,
    Modal,
    HStack,
    StatusBar,
} from 'native-base';
import CollectionHeader from '../../header/header.collection';
import NumberInput from '../../../components/customInput/number.input';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CalenderInput from '../../../components/customInput/calender.input';
import { bagType, codeListTypes } from '../../../@types/collection.types';
import TimeInput from '../../../components/customInput/time.input';
import TextAreaInput from '../../../components/customInput/textarea.input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker, { PossibleArray } from 'react-native-image-crop-picker';
import { ImageSourcePropType } from 'react-native';
import GoogleMarker from '../../../components/map/google.marker';
import EditCard from '../../../components/card/edit.card';
import useAxiosServices, { baseUrl } from '../../../hooks/axiosHooks';
import { addressListType } from '../../../@types/userTypes';
import AddressSheet from '../../../components/bottomSheet/address.sheet';
import { addressChange } from '../../../store/authReducer';
import { UserParamList } from '../../../@types/navigationTypes';
import { loadingAction } from '../../../store/commonReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { BookStatusCase, TransactionBagCase, TransactionPickupCase } from '../../../etc/bookStatusCase';
import BackIcon from '../../../assets/icons/back.icon';
import CloseIcon from '../../../assets/icons/close.icon';
import { Ar17M, Ar17RBlack, Ar18M, Ar18SbBlack, Ar21B, Ar21Sb, Ar22M, Ar25SbBlack, Ar36B } from '../../../themes/font.style';
import DefaultDown from '../../../components/dropdown/default.down';
import { RootState } from '../../../store';
import { dateFormatDays2 } from '../../../utils/times';
import ModalWrapper from '../../commons/modal/modal.wrapper';
import { addressNullCheck } from '../../../utils/gup';
import Toast from 'react-native-toast-message';
import { addHours, format, getUnixTime, subHours } from 'date-fns';

const limitImage = require('../../../assets/image/low.png');

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
const taskBlueIcon = require('../../../assets/icons/task_blue.png');
const LeftArrow = require('../../../assets/icons/LeftArrow.png');
const Close = require('../../../assets/icons/Close.png');

const DetailCollection = () => {
    const { userRole, isLogin, user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const route = useRoute<RouteProp<UserParamList, 'DetailScreen'>>();
    const idx = route.params?.idx;
    const toast = useToast();
    const navigation = useNavigation();
    const { axiosService } = useAxiosServices();
    const [status, setStatus] = useState<number>(0);
    const [address, setAddress] = useState<addressListType>({
        address: '',
        addressMore: '',
        idx: 0,
        lat: 0,
        lot: 0,
        main: 0,
        moreText: '',
        postcode: '',
    });
    const [step, setStep] = useState<number>(5);
    const [bagData, setBagData] = useState<bagType[]>([{ type: 0, value: 0 }]);
    const [needBag, setNeedBag] = useState<bagType[]>([{ type: 0, value: 0 }]);
    const [useBag, setUseBag] = useState<boolean>(false);
    const [bag, setBag] = useState<number>(0);
    const [pickDate, setPickDate] = useState<string | null>(null);
    const [pickTime, setPickTime] = useState<any>(null);
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState<any>(null);
    const [dogCheck, setDogCheck] = useState<boolean>(false);
    const [pick, setPick] = useState(0);
    const [modalCancel, setModalCancel] = useState(false);
    const [modalNotDelete, setModalNotDelete] = useState(false);
    const [modalOk, setModalOk] = useState(false);
    const [modalComplete, setModalComplete] = useState(false);
    const [codeList, setCodeList] = useState<codeListTypes[]>([]);
    const [createdTime, setCreatedTime] = useState(getUnixTime(new Date()));

    const bagDataExport = () => {
        let number = 0;
        bagData.forEach((v) => {
            number = v.value;
        });
        return number;
    };

    useEffect(() => {
        getUserMain();
    }, []);

    const [weekNo, setWeekNo] = useState([]);
    const [dateNo, setDateNo] = useState([]);
    const [bagLimit, setBagLimit] = useState(0);

    const getUserMain = async () => {
        try {
            const api = await axiosService.post('/pick/app/detail', { idx });
            const { status, detail, locationBags, weekDisabled, dateDisabled } = api.data;
            if (status) {
                console.log(detail);
                setAddress({ ...detail.address });
                setBagData([...detail.bagData]);
                setDescription(detail.description ?? '');
                setDogCheck(detail.dogCheck);
                setNeedBag([...detail.needBag]);
                setPickDate(detail.pickDate);
                setPickTime(detail.pickTime);
                setUseBag(detail.useBag);
                setStatus(detail.status);
                setPhoto({ path: detail.pickImage });
                setPick(detail.status);
                setCodeList([...detail.codeList]);
                setCreatedTime(detail.createdTime);
                setWeekNo([...weekDisabled]);
                setDateNo([...dateDisabled]);
                setBagLimit(locationBags);
            }
        } catch (e) {
            console.log(e);
        }
    };

    console.log('detail.pickTime', createdTime);
    const photoHandler = async (type: 'pick' | 'camera') => {
        if (type === 'pick') {
            await ImagePicker.openPicker({
                width: 600,
                height: 600,
            }).then((image) => {
                setPhoto(image);
                console.log(image);
            });
        } else {
            await ImagePicker.openCamera({
                width: 600,
                height: 600,
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

    const dotMove = (v: any) => {
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
        return {
            idx,
            address,
            bagData,
            needBag,
            useBag,
            pickTime,
            pickDate,
            description,
            dogCheck,
        };
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
            const api = await axiosService.post('/pick/user/update', dataGenerator());
            const { status } = api.data;
            if (status) {
                photo && (await imageSave(idx));
                Toast.show({
                    type: 'info',
                    // @ts-ignore
                    text1: 'Update Completed!',
                });
                await getUserMain();
            }
        } catch (e) {
            console.log(e);
        }
    };

    const openDeleteModal = () => {
        const today = getUnixTime(new Date());
        if (today > createdTime) {
            setModalNotDelete(true);
        } else {
            setModalCancel(true);
        }
    };

    const deletePick = async () => {
        try {
            const api = await axiosService.post('/pick/app/delete', { idx });
            const { status } = api;
            if (status) {
                Toast.show({
                    type: 'info',
                    // @ts-ignore
                    text1: 'Delete Completed!',
                });
                setModalComplete(true);
            }
        } catch (e) {
            console.log(e);
            Toast.show({
                type: 'error',
                // @ts-ignore
                text1: 'Sorry, error',
            });
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
    return (
        <>
            <StatusBar barStyle={'dark-content'} />
            <Box bg={'white.100'} px={'18px'}>
                <HStack mt={'10px'} safeAreaTop alignItems={'center'} justifyContent={'space-between'}>
                    {status === 1 && (
                        <TouchableOpacity onPress={() => backHandler()} hitSlop={{ top: 20, left: 20, right: 30, bottom: 20 }}>
                            <BackIcon />
                        </TouchableOpacity>
                    )}

                    <Box flexDirection={'row'} alignItems={'center'}>
                        {status === 1 && (
                            <TouchableOpacity
                                hitSlop={{ top: 20, left: 20, right: 30, bottom: 20 }}
                                style={{ marginRight: 20 }}
                                onPress={() => openDeleteModal()}
                            >
                                <Text {...Ar18SbBlack} color={'blue.200'}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity hitSlop={{ top: 20, left: 20, right: 30, bottom: 20 }} onPress={() => navigation.goBack()}>
                            <CloseIcon />
                        </TouchableOpacity>
                    </Box>
                </HStack>
            </Box>
            <Box bg={'white.100'} flex={1} alignItems={step === 5 ? 'stretch' : 'center'}>
                <Box flex={1} px={step === 5 ? '0px' : '28px'} mx={'0px'}>
                    <Box px={headerPadding()}>
                        <Heading mt={'33px'} mb={step === 5 ? '13px' : 0} {...Ar36B} fontSize={'34px'} color={'black.100'}>
                            {headerText()}
                        </Heading>
                        {step === 5 && (
                            <Text {...Ar21B} color={'blue.200'} mt={'10px'} mb={'30px'} bottom={'15px'}>
                                {`#A-${idx}`}
                            </Text>
                        )}

                        {step === 3 && (
                            <Text {...Ar18M} color={'blue.100'}>
                                Let us know your secure bags location (Please be specific)
                            </Text>
                        )}
                    </Box>
                    <Box top={step === 5 ? '-30px' : '0px'} flex={1} alignItems={'center'} justifyContent={'center'}>
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
                                                            defaultButtonText={TransactionBagCase(v.type)}
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
                                                    </>
                                                ))}
                                            </Box>
                                            {user?.userType === 1 && (
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
                                            {/*                        {...triggerProps}*/}
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
                                            <Heading textAlign={'left'} my={8} {...Ar36B}>
                                                Upload photo
                                            </Heading>
                                            {photo?.path && (
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
                                                        style={{ width: 33, height: 33, resizeMode: 'contain' }}
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
                            <Box pt={4} p={2} flex={1} w={'100%'}>
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
                                    {/*    <Heading textAlign={'left'} my={8} fontFamily={'Arch'} fontWeight={900} fontSize={'30px'}>*/}
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
                                {pick > 1 && (
                                    <Text
                                        m={2}
                                        mt={0}
                                        px={'28px'}
                                        fontFamily={'Arch'}
                                        fontWeight={500}
                                        fontSize={'14px'}
                                        color={'blue.100'}
                                    >
                                        {BookStatusCase(pick)}
                                    </Text>
                                )}
                                <ScrollView flex={1} showsVerticalScrollIndicator={false}>
                                    <Box flex={1} maxH={'300px'} h={'176px'}>
                                        <GoogleMarker marker={[{ lat: address.lat, lot: address.lot }]} />
                                    </Box>
                                    <VStack pt={'20px'} w={'100%'} justifyContent={'center'} alignItems={'center'}>
                                        {status === 5 && (
                                            <EditCard
                                                disabled={false}
                                                source={taskBlueIcon}
                                                step={0}
                                                makeStep={setStep}
                                                type={7}
                                                anyHandler={() => navigation.navigate('ReportCollection' as never, { idx } as never)}
                                                title={'Pickup report'}
                                            />
                                        )}
                                        <EditCard
                                            disabled={pick > 1}
                                            source={addressPin}
                                            step={0}
                                            makeStep={setStep}
                                            type={6}
                                            anyHandler={() => setAddressOpen(true)}
                                            title={address.address}
                                            subTitle={`${address.addressMore}${addressNullCheck(address.postcode)}`}
                                        />
                                        {/*{bagData.map((v) => (*/}
                                        {/*    <EditCard*/}
                                        {/*        disabled={pick > 1}*/}
                                        {/*        source={reIcon}*/}
                                        {/*        step={1}*/}
                                        {/*        makeStep={setStep}*/}
                                        {/*        type={2}*/}
                                        {/*        title={`${bagData.length} ${' '}Bags`}*/}
                                        {/*    />*/}
                                        {/*))}*/}

                                        <EditCard
                                            disabled={pick > 1}
                                            source={reIcon}
                                            step={1}
                                            makeStep={setStep}
                                            type={2}
                                            title={`${bagDataExport()} ${' '}Bags`}
                                        />

                                        <EditCard
                                            disabled={pick > 1}
                                            source={calnerIcon}
                                            step={2}
                                            makeStep={setStep}
                                            type={pickType !== 99 ? 4 : 2}
                                            title={dateFormatDays2(pickDate)}
                                            subTitle={TransactionPickupCase(pickType)}
                                        />
                                        {pickTime && pickTime !== '' && (
                                            <EditCard
                                                disabled={pick > 1}
                                                source={timerIcon}
                                                step={2}
                                                makeStep={setStep}
                                                type={2}
                                                title={`${pickTime}`}
                                            />
                                        )}

                                        <EditCard
                                            disabled={pick > 1}
                                            source={pencel}
                                            step={3}
                                            makeStep={setStep}
                                            type={3}
                                            title={`${description}`}
                                        />
                                        <EditCard
                                            disabled={pick > 1}
                                            source={cameraBlue}
                                            step={3}
                                            makeStep={setStep}
                                            type={2}
                                            title={'Photo'}
                                            image={photo}
                                        />
                                        <EditCard
                                            disabled={pick > 1}
                                            step={4}
                                            source={petIcon}
                                            makeStep={setStep}
                                            type={4}
                                            title={'Pet on premise'}
                                            subTitle={dogCheck ? 'Checked' : 'UnChecked'}
                                        />
                                        {/*{needBag.map((v) => (*/}
                                        {/*    <EditCard*/}
                                        {/*        disabled={pick > 1}*/}
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
                        {pick === 1 && (
                            <Box
                                position={step === 5 ? 'absolute' : 'relative'}
                                bottom={step === 5 ? '20px' : '0px'}
                                mb={step !== 5 ? '30px' : '0px'}
                                flexDirection={'row'}
                                w={'100%'}
                                justifyContent={'center'}
                            >
                                {step < 5 ? (
                                    <Button
                                        onPress={() => nextHandler()}
                                        disabled={nextDisabledHandler()}
                                        _disabled={{ bg: 'gray.100' }}
                                        width={'358px'}
                                        shadow={8}
                                        variant={'basicButton'}
                                        bg={nextDisabledHandler() ? 'gray.200' : 'blue.200'}
                                    >
                                        <Text {...Ar22M} color={'white.100'}>
                                            Next
                                        </Text>
                                    </Button>
                                ) : (
                                    <Button
                                        onPress={() => modalHandler('complete')}
                                        disabled={nextDisabledHandler()}
                                        _disabled={{ bg: 'gray.100' }}
                                        width={'358px'}
                                        shadow={8}
                                        variant={'basicButton'}
                                        bg={nextDisabledHandler() ? 'gray.200' : 'blue.200'}
                                    >
                                        <Text {...Ar22M} color={'white.100'}>
                                            Update
                                        </Text>
                                    </Button>
                                )}
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
            <ModalWrapper
                open={modalCancel}
                onClose={() => modalHandler('close')}
                image={houseCancel}
                title={'Delete your Pickup?'}
                content={'Cancellation is allowed up to one\n day before scheduled pickup.'}
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
                            deletePick();
                        },
                        color: 'gray.200',
                    },
                ]}
            />
            <ModalWrapper
                open={modalNotDelete}
                onClose={() => setModalNotDelete(false)}
                title={'Delete your Pickup'}
                content={'You cannot change or cancel the pickup. if it is already within the scheduled pickup time: Please contact us.'}
                onHandler={[
                    {
                        text: 'Yes',
                        onPress: () => {
                            setModalNotDelete(false);
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
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Main' } as never],
                    });
                    modalHandler('complete');
                }}
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
        </>
    );
};

export default DetailCollection;
