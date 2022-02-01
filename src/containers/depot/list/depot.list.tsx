import React, { useEffect, useState } from 'react';
import useAxiosServices from '../../../hooks/axiosHooks';
import { Box, HStack, Image, useToast, Text, VStack, ScrollView, Button } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BookDepotStatusCase, BookStatusCase } from '../../../etc/bookStatusCase';
import { codeDepotTypes } from '../../../@types/collection.types';
const LeftArrow = require('../../../assets/icons/LeftArrow.png');
const RightArrow = require('../../../assets/icons/back-gray.png');
const DepotList = () => {
    const toast = useToast();
    const [list, setList] = useState<codeDepotTypes[]>([]);
    const { axiosService } = useAxiosServices();
    const navigation = useNavigation();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const api = await axiosService.post('/pick/depot/list');
            const { list } = api.data;
            if (list) {
                setList([...list]);
            }
        } catch (e) {}
    };
    return (
        <Box flex={1} safeArea m={4}>
            <Box flex={1}>
                <HStack alignItems={'center'} justifyContent={'space-between'}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={LeftArrow} alt={'leftArrow'} />
                    </TouchableOpacity>
                    <Box flexDirection={'row'} alignItems={'center'}>
                        {/*{step === 5 && (*/}
                        {/*    <TouchableOpacity style={{ marginRight: 20 }} onPress={() => modalHandler('close')}>*/}
                        {/*        <Text fontFamily={'Arch'} fontWeight={500} fontSize={'14px'} color={'blue.200'}>*/}
                        {/*            Cancel*/}
                        {/*        </Text>*/}
                        {/*    </TouchableOpacity>*/}
                        {/*)}*/}
                        <Text fontFamily={'Arch'} fontWeight={'700'} fontSize={'20px'} color={'black.100'}>
                            List
                        </Text>
                    </Box>
                </HStack>
                <Box mt={8} flex={1}>
                    <ScrollView flex={1} width={'100%'} showsVerticalScrollIndicator={false}>
                        <VStack space={2}>
                            <HStack
                                borderBottomWidth={2}
                                borderColor={'black.100'}
                                space={2}
                                p={2}
                                w="100%"
                                alignItems={'center'}
                                justifyContent={'space-between'}
                            >
                                {['Status', 'ID', 'Date', ''].map((v) => (
                                    <Box alignItems={'flex-start'} w={'25%'}>
                                        <Text fontFamily={'Arch'} fontSize={15} fontWeight={900}>
                                            {v}
                                        </Text>
                                    </Box>
                                ))}
                            </HStack>

                            {list
                                ? list.map((v, i) => (
                                      <TouchableOpacity
                                          key={`didfj123g+${i}`}
                                          onPress={() => navigation.navigate('DetailScreen', { idx: v.idx })}
                                      >
                                          <HStack
                                              borderBottomWidth={0.5}
                                              borderColor={'gray.200'}
                                              p={2}
                                              py={4}
                                              space={2}
                                              w="100%"
                                              alignItems={'center'}
                                              justifyContent={'space-between'}
                                          >
                                              <Box alignItems={'center'} w={'25%'}>
                                                  <Text fontFamily={'Arch'} fontSize={15} fontWeight={900}>
                                                      {BookDepotStatusCase(v.pick.status)}
                                                  </Text>
                                              </Box>
                                              <Box alignItems={'center'} w={'25%'}>
                                                  <Text fontFamily={'Arch'} fontSize={15} fontWeight={900}>
                                                      {`${v.idx}`}
                                                  </Text>
                                              </Box>
                                              <Box alignItems={'center'} w={'25%'}>
                                                  <Text fontFamily={'Arch'} fontSize={15} fontWeight={900}>
                                                      {v.pick.pickDate}
                                                  </Text>
                                              </Box>
                                              <Box alignItems={'center'} w={'25%'}>
                                                  <TouchableOpacity onPress={() => navigation.navigate('DepotDetail', { code: v.code })}>
                                                      <Image source={RightArrow} alt={'RightArrow'} />
                                                  </TouchableOpacity>
                                              </Box>
                                          </HStack>
                                      </TouchableOpacity>
                                  ))
                                : ['Booked', 'EC-0168', '10 Mar 21', '3'].map((v) => (
                                      <Box alignItems={'center'} w={'25%'}>
                                          <Text fontFamily={'Arch'} fontSize={15} fontWeight={900}>
                                              {v}
                                          </Text>
                                      </Box>
                                  ))}
                        </VStack>
                    </ScrollView>

                    <Box flexDirection={'row'} w={'100%'} justifyContent={'space-between'} p={6}>
                        <Button
                            _disabled={{ bg: 'gray.100' }}
                            width={'100%'}
                            variant={'basicButton'}
                            bg={'blue.100'}
                            onPress={() => getData()}
                        >
                            <Text fontSize={'18px'} fontWeight={100} fontFamily={'Arch'} color={'white.100'}>
                                Load more
                            </Text>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default DepotList;
