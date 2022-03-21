import React, { useState } from 'react';
import { VStack, Box, HStack, Text, ScrollView } from 'native-base';
import { Dimensions, RefreshControl } from 'react-native';
import { collectionTypes } from '../../@types/collection.types';
import { BookStatusCase } from '../../etc/bookStatusCase';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { dateFormatDays } from '../../utils/times';
import LinearGradient from 'react-native-linear-gradient';
import { Ar15B } from '../../themes/font.style';
const { width, height } = Dimensions.get('window');

interface Props {
    list?: collectionTypes[];
    onRefresh: () => void;
    refreshing: boolean;
}
const TableDashboard = ({ list, refreshing, onRefresh }: Props) => {
    const navigation = useNavigation();
    return (
        <>
            <Box mt={4}>
                <VStack>
                    <HStack
                        borderBottomWidth={1.52}
                        borderRadius={1}
                        borderColor={'blue.200'}
                        py={2}
                        w="100%"
                        alignItems={'center'}
                        justifyContent={'space-between'}
                    >
                        {['Status'].map((v) => (
                            <Box alignItems={'flex-start'} w={'25%'}>
                                <Text {...Ar15B} color={'black.100'}>
                                    {v}
                                </Text>
                            </Box>
                        ))}
                        <Box alignItems={'flex-start'} w={'25%'} left={3}>
                            <Text {...Ar15B} color={'black.100'}>
                                ID
                            </Text>
                        </Box>
                        <Box alignItems={'flex-start'} w={'30%'} left={3}>
                            <Text {...Ar15B} color={'black.100'}>
                                Pick up date
                            </Text>
                        </Box>
                        <Box alignItems={'flex-end'} w={'20%'}>
                            <Text {...Ar15B} color={'black.100'}>
                                Bags
                            </Text>
                        </Box>
                    </HStack>
                    <ScrollView
                        refreshControl={<RefreshControl progressViewOffset={10} refreshing={refreshing} onRefresh={onRefresh} />}
                        pb={20}
                        showsVerticalScrollIndicator={false}
                    >
                        {list
                            ? list.map((v, i) => (
                                  <TouchableOpacity
                                      key={`didfj123g+${i}`}
                                      onPress={() => navigation.navigate('DetailScreen' as never, { idx: v.idx } as never)}
                                  >
                                      <HStack
                                          borderBottomWidth={0.5}
                                          borderColor={'gray.200'}
                                          py={4}
                                          w="100%"
                                          alignItems={'center'}
                                          justifyContent={'space-between'}
                                      >
                                          <Box alignItems={'flex-start'} w={'25%'}>
                                              <Text {...Ar15B} color={'black.100'}>
                                                  {BookStatusCase(v.status)}
                                              </Text>
                                          </Box>
                                          <Box alignItems={'flex-start'} w={'25%'} left={3}>
                                              <Text {...Ar15B} color={'black.100'}>
                                                  {`AC-0${v.idx}`}
                                              </Text>
                                          </Box>
                                          <Box alignItems={'flex-end'} w={'30%'} left={2}>
                                              <Text {...Ar15B} color={'black.100'}>
                                                  {dateFormatDays(v.pickDate)}
                                              </Text>
                                          </Box>
                                          <Box alignItems={'flex-end'} w={'20%'}>
                                              <Text {...Ar15B} color={'black.100'}>
                                                  {v.bag}
                                              </Text>
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
                        <Box my={40} />
                    </ScrollView>
                </VStack>
            </Box>
        </>
    );
};

export default TableDashboard;
