import React from 'react';
import { Box, Button, Center, Image, Modal, Text, VStack } from 'native-base';
import { Ar17RBlack, Ar18M, Ar25SbBlack } from '../../../themes/font.style';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import LabelInput from '../../../components/customInput/Label.input';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import useAxiosServices from '../../../hooks/axiosHooks';
import { payoutChange, profileSetting } from '../../../store/authReducer';
interface Props {
    open: boolean;
    image?: any;
    type: 1 | 2;
    onClose: any;
    title?: any;
    content?: any;
}

const PaypalSchema = Yup.object().shape({
    paypal: Yup.string().email('Please enter a valid email').min(4, `email Too short`).required(`Please enter your paypal`),
});

const AccountSchema = Yup.object().shape({
    bankName: Yup.string().required(`Please enter your bankname`),
    bankNumber: Yup.string().required(`Please enter your bank Number`),
});

const InputModal = ({ open, image, type, onClose, onHandler, title, content }: Props) => {
    const schema = type === 1 ? PaypalSchema : AccountSchema;
    const user = useSelector((state: RootState) => state.auth.user);
    const init =
        type === 1
            ? {
                  paypal: user?.paypal ?? '',
              }
            : {
                  bankName: user?.bankName ?? '',
                  bankNumber: user?.bankNumber ?? '',
              };

    const { handleChange, handleBlur, handleSubmit, errors, touched, initialValues, resetForm, values } = useFormik({
        validationSchema: schema,
        initialValues: init,
        onSubmit: async (value) => {
            await subMitAction();
        },
    });

    const { axiosService } = useAxiosServices();
    const dispatch = useDispatch();

    const subMitAction = async () => {
        try {
            if (type === 1) {
                await payPalUpdate();
            } else {
                await bankUpdate();
            }
        } catch (e) {
        } finally {
            onClose();
        }
    };

    const payPalUpdate = async () => {
        const api = await axiosService.post('/users/app/paypal/update', { id: values.paypal });
        const { status, data } = api.data;
        if (status) {
            dispatch(profileSetting({ user: data, userRole: data.userRole }));
        }
    };

    const bankUpdate = async () => {
        const api = await axiosService.post('/users/app/bank/update', { bankName: values.bankName, bankNumber: values.bankNumber });
        const { status, data } = api.data;
        if (status) {
            dispatch(profileSetting({ user: data, userRole: data.userRole }));
        }
    };

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
            <Modal.Content w={'358px'}>
                <Modal.Body>
                    <Box my={10}>
                        {image && <Image w={'131px'} h={'131px'} resizeMode={'contain'} source={image} alt={'modalImage'} />}
                        <VStack space={2} mt={4}>
                            {title && (
                                <Text {...Ar25SbBlack} mb={5} color={'blue.200'}>
                                    {title}
                                </Text>
                            )}
                            {type === 1 ? (
                                <LabelInput
                                    bg={'white.100'}
                                    label={'PayPal ID'}
                                    onBlur={handleBlur('paypal')}
                                    value={values.paypal}
                                    error={errors.paypal}
                                    touched={touched.paypal}
                                    onChangeText={handleChange('paypal')}
                                    placeholder="Paypal ID"
                                />
                            ) : (
                                <>
                                    <LabelInput
                                        bg={'white.100'}
                                        label={'Bank Name'}
                                        onBlur={handleBlur('bankName')}
                                        value={values.bankName}
                                        error={errors.bankName}
                                        touched={touched.bankName}
                                        onChangeText={handleChange('bankName')}
                                        placeholder="Bank Name"
                                    />
                                    <Box mb={5} />
                                    <LabelInput
                                        bg={'white.100'}
                                        label={'Bank Number'}
                                        onBlur={handleBlur('bankNumber')}
                                        value={values.bankNumber}
                                        error={errors.bankNumber}
                                        touched={touched.bankNumber}
                                        onChangeText={handleChange('bankNumber')}
                                        placeholder="Bank Number"
                                    />
                                </>
                            )}
                        </VStack>
                    </Box>
                </Modal.Body>
                <Modal.Footer p={0} bottom={-5}>
                    <Button.Group space={0}>
                        <Button
                            h={'74px'}
                            bg={'gray.200'}
                            borderRadius={0}
                            w={'50%'}
                            variant="basicButton"
                            colorScheme="blueGray"
                            onPress={() => {
                                onClose();
                            }}
                        >
                            <Text {...Ar25SbBlack} color={'white.100'}>
                                {'Cancel'}
                            </Text>
                        </Button>
                        <Button
                            h={'74px'}
                            bg={'blue.200'}
                            borderRadius={0}
                            w={'50%'}
                            variant="basicButton"
                            colorScheme="blueGray"
                            onPress={() => handleSubmit()}
                        >
                            <Text {...Ar25SbBlack} color={'white.100'}>
                                {'Change'}
                            </Text>
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
};

export default InputModal;
