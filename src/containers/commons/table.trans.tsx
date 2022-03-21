import React from 'react';
import { VStack, Box, HStack, Text, ScrollView } from 'native-base';
import { Dimensions } from 'react-native';
import { collectionTypes } from '../../@types/collection.types';
import { BookStatusCase, TransactionStatusCase, TransactionTypeCase } from '../../etc/bookStatusCase';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TransactionListTypes } from '../../@types/transaction.types';
import { dateFormat, dateFormatDays } from '../../utils/times';
import { Ar15B } from '../../themes/font.style';
const { width, height } = Dimensions.get('window');

interface Props {
    list?: TransactionListTypes[];
}
const TableTrans = ({ list }: Props) => {
    return (
        <Box mt={4} px={4}>
            <VStack>
                <HStack
                    borderBottomWidth={1}
                    borderColor={'blue.200'}
                    p={1}
                    pb={2}
                    w="100%"
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <Box alignItems={'flex-start'} w={'25%'}>
                        <Text {...Ar15B} color={'black.100'}>
                            {'Status'}
                        </Text>
                    </Box>
                    <Box alignItems={'center'} w={'25%'}>
                        <Text {...Ar15B} color={'black.100'}>
                            {'Amount'}
                        </Text>
                    </Box>
                    <Box alignItems={'flex-end'} w={'25%'} pr={4}>
                        <Text {...Ar15B} color={'black.100'}>
                            {'Date'}
                        </Text>
                    </Box>
                    <Box alignItems={'flex-end'} w={'25%'}>
                        <Text {...Ar15B} color={'black.100'}>
                            {'Type'}
                        </Text>
                    </Box>
                </HStack>
                <ScrollView height={'100%'} showsVerticalScrollIndicator={false}>
                    {list
                        ? list.map((v, i) => (
                              <Box key={`didfj123g+${i}`}>
                                  <HStack
                                      borderBottomWidth={0.5}
                                      borderColor={'gray.200'}
                                      p={1}
                                      py={4}
                                      w="100%"
                                      alignItems={'center'}
                                      justifyContent={'space-between'}
                                  >
                                      <Box alignItems={'flex-start'} w={'25%'}>
                                          <Text {...Ar15B} color={'black.100'}>
                                              {TransactionStatusCase(v.status)}
                                          </Text>
                                      </Box>
                                      <Box alignItems={'flex-start'} left={4} w={'25%'}>
                                          <Text {...Ar15B} color={'black.100'}>
                                              {`$ ${v.amount}`}
                                          </Text>
                                      </Box>
                                      <Box alignItems={'center'} w={'25%'}>
                                          <Text {...Ar15B} color={'black.100'}>
                                              {`${dateFormatDays(new Date(v.createdAt))}`}
                                          </Text>
                                      </Box>
                                      <Box alignItems={'flex-end'} w={'25%'}>
                                          <Text {...Ar15B} color={'black.100'}>
                                              {TransactionTypeCase(v.type)}
                                          </Text>
                                      </Box>
                                  </HStack>
                              </Box>
                          ))
                        : ['Booked', 'EC-0168', '10 Mar 21', '3'].map((v) => (
                              <Box alignItems={'center'} w={'25%'}>
                                  <Text fontFamily={'Arch'} fontSize={12} fontWeight={900}>
                                      {v}
                                  </Text>
                              </Box>
                          ))}
                </ScrollView>
            </VStack>
        </Box>
    );
};

export default TableTrans;
