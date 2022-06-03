import {
  AspectRatio,
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {timeSince} from '../utils/date-helper';

export interface CardProps {
  images?: string[];
  bannerUri?: string | null;
  cardTitle?: string;
  cardSubtitle?: string;
  cardDesc?: string;
  createdAt?: Date;
}

const Card = ({
  cardProps,
  onPress = undefined,
  isCropped = true,
}: {
  cardProps: CardProps;
  onPress?: () => void;
  isCropped: boolean;
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <Box
        w={'100%'}
        mb={5}
        rounded="lg"
        overflow="hidden"
        borderColor={useColorModeValue('coolGray.200', 'coolGray.600')}
        borderWidth="1"
        backgroundColor={useColorModeValue('gray.50', 'gray.700')}>
        <Box w="100%">
          {cardProps?.bannerUri && (
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{
                  uri: cardProps.bannerUri,
                }}
                alt="image"
                resizeMode={'stretch'}
              />
            </AspectRatio>
          )}

          {/* <Center
          bg="violet.500"
          _dark={{
            bg: 'violet.400',
          }}
          _text={{
            color: 'warmGray.50',
            fontWeight: '700',
            fontSize: 'xs',
          }}
          position="absolute"
          bottom="0"
          px="3"
          py="1.5">
          PHOTOS
        </Center> */}
        </Box>
        <Stack w="100%" p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {cardProps.cardTitle}
            </Heading>
            {cardProps?.cardSubtitle && (
              <Text
                fontSize="xs"
                color={useColorModeValue('violet.500', 'violet.400')}
                fontWeight="500"
                ml="-0.5"
                mt="-1">
                {cardProps?.cardSubtitle && cardProps.cardSubtitle}
              </Text>
            )}
          </Stack>
          <Text fontWeight="400">
            {cardProps?.cardDesc &&
              (isCropped
                ? cardProps.cardDesc.length > 90
                  ? cardProps.cardDesc.substring(0, 90) + '...'
                  : cardProps.cardDesc
                : cardProps.cardDesc)}
          </Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text
                color={useColorModeValue('coolGray.600', 'warmGray.200')}
                fontWeight="400">
                {cardProps.createdAt && timeSince(cardProps.createdAt)} önce
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </TouchableOpacity>
  );
};

export default Card;
