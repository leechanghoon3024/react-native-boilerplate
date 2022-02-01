import React from 'react';
import { VStack, Box, HStack, Text } from 'native-base';
import { Dimensions } from 'react-native';
import { collectionTypes } from '../../@types/collection.types';
import { BookStatusCase } from '../../etc/bookStatusCase';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');

interface Props {
    list?: collectionTypes[];
}
const TableDashboard = ({ list }: Props) => {
    const navigation = useNavigation();
    return (
        <Box mt={8}>
            <VStack space={2}>
                <HStack
                    borderBottomWidth={3}
                    borderColor={'blue.200'}
                    space={2}
                    p={2}
                    w="100%"
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    {['Status', 'ID', 'date', 'Bags'].map((v) => (
                        <Box alignItems={'center'} w={'25%'}>
                            <Text fontFamily={'Arch'} fontSize={15} fontWeight={900}>
                                {v}
                            </Text>
                        </Box>
                    ))}
                </HStack>

                {list
                    ? list.map((v, i) => (
                          <TouchableOpacity key={`didfj123g+${i}`} onPress={() => navigation.navigate('DetailScreen', { idx: v.idx })}>
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
                                          {BookStatusCase(v.status)}
                                      </Text>
                                  </Box>
                                  <Box alignItems={'center'} w={'25%'}>
                                      <Text fontFamily={'Arch'} fontSize={15} fontWeight={900}>
                                          {`${v.idx}`}
                                      </Text>
                                  </Box>
                                  <Box alignItems={'center'} w={'25%'}>
                                      <Text fontFamily={'Arch'} fontSize={15} fontWeight={900}>
                                          {v.pickDate}
                                      </Text>
                                  </Box>
                                  <Box alignItems={'center'} w={'25%'}>
                                      <Text fontFamily={'Arch'} fontSize={15} fontWeight={900}>
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
            </VStack>
        </Box>
    );
};

export default TableDashboard;
