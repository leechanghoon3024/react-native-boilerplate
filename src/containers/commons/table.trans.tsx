import React from 'react';
import { VStack, Box, HStack, Text } from 'native-base';
import { Dimensions } from 'react-native';
import { collectionTypes } from '../../@types/collection.types';
import { BookStatusCase, TransactionStatusCase, TransactionTypeCase } from '../../etc/bookStatusCase';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TransactionListTypes } from '../../@types/transaction.types';
import { dateFormat } from '../../utils/times';
const { width, height } = Dimensions.get('window');

interface Props {
    list?: TransactionListTypes[];
}
const TableTrans = ({ list }: Props) => {
    console.log(list);
    return (
        <Box mt={8}>
            <VStack space={2}>
                <HStack
                    borderBottomWidth={3}
                    borderColor={'blue.200'}
                    space={2}
                    p={1}
                    w="100%"
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    {['Status', 'Amount', 'Date', 'Type'].map((v) => (
                        <Box alignItems={'center'} w={'25%'}>
                            <Text fontFamily={'Arch'} fontSize={12} fontWeight={900}>
                                {v}
                            </Text>
                        </Box>
                    ))}
                </HStack>

                {list
                    ? list.map((v, i) => (
                          <TouchableOpacity key={`didfj123g+${i}`}>
                              <HStack
                                  borderBottomWidth={0.5}
                                  borderColor={'gray.200'}
                                  p={1}
                                  py={4}
                                  space={2}
                                  w="100%"
                                  alignItems={'center'}
                                  justifyContent={'space-between'}
                              >
                                  <Box alignItems={'center'} w={'25%'}>
                                      <Text fontFamily={'Arch'} fontSize={12} fontWeight={900}>
                                          {TransactionStatusCase(v.status)}
                                      </Text>
                                  </Box>
                                  <Box alignItems={'center'} w={'25%'}>
                                      <Text fontFamily={'Arch'} fontSize={12} fontWeight={900}>
                                          {`$ ${v.amount}`}
                                      </Text>
                                  </Box>
                                  <Box alignItems={'center'} w={'25%'}>
                                      <Text fontFamily={'Arch'} fontSize={12} fontWeight={900}>
                                          {`${dateFormat(new Date(v.createdAt))}`}
                                      </Text>
                                  </Box>
                                  <Box alignItems={'center'} w={'25%'}>
                                      <Text fontFamily={'Arch'} fontSize={12} fontWeight={900}>
                                          {TransactionTypeCase(v.type)}
                                      </Text>
                                  </Box>
                              </HStack>
                          </TouchableOpacity>
                      ))
                    : ['Booked', 'EC-0168', '10 Mar 21', '3'].map((v) => (
                          <Box alignItems={'center'} w={'25%'}>
                              <Text fontFamily={'Arch'} fontSize={12} fontWeight={900}>
                                  {v}
                              </Text>
                          </Box>
                      ))}
            </VStack>
        </Box>
    );
};

export default TableTrans;
