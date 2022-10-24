import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  useColorModeValue,
  SimpleGrid,
  Image,
  Grid,
  GridItem,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  useDisclosure
} from "@chakra-ui/react";

import PoolStore, { PoolsData } from "../stores/pools";
import { observer } from "mobx-react-lite"

const PoolsCard = observer((props: { poolsData: PoolsData[] }) => {
  return (
    <SimpleGrid columns={{ sm: 2, lg: 4 }} gap={4} mb={8}>
      {props.poolsData.map(
        ({
          id,
          token1,
          token2,
          poolLiquidity,
          apr,
          myLiquidity,
          myBoundedAmount,
          longestDaysUnbonding,
        }) => {
          return (
            <Box
              key={id}
              borderRadius="lg"
              border="1px solid"
              borderColor={
                longestDaysUnbonding
                  ? useColorModeValue("primary.500", "primary.300")
                  : "transparent"
              }
              boxShadow="md"
              _hover={{
                cursor: "pointer",
                borderColor: longestDaysUnbonding
                  ? useColorModeValue("primary.500", "primary.300")
                  : "orange.300",
              }}
              bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
              p={4}
            >
              <Flex align="center" mb={4}>
                <Flex
                  position="relative"
                  align="center"
                  pr={{ base: 10, sm: 14 }}
                >
                  <Box
                    w={{ base: 12, md: 14, lg: 16 }}
                    h={{ base: 12, md: 14, lg: 16 }}
                    bg="whiteAlpha.900"
                    borderRadius="full"
                    border="1px solid"
                    borderColor={useColorModeValue(
                      "primary.100",
                      "primary.900"
                    )}
                    overflow="hidden"
                    p={0.5}
                  >
                    <Image src={token1.imgSrc} />
                  </Box>
                  <Box
                    position="absolute"
                    left={{ base: 8, sm: 10 }}
                    w={{ base: 12, md: 14, lg: 16 }}
                    h={{ base: 12, md: 14, lg: 16 }}
                    bg="whiteAlpha.900"
                    borderRadius="full"
                    border="1px solid"
                    borderColor={useColorModeValue(
                      "primary.100",
                      "primary.900"
                    )}
                    overflow="hidden"
                    p={0.5}
                  >
                    <Image src={token2.imgSrc} />
                  </Box>
                </Flex>
                <Flex flexDirection="column" justify="center">
                  <Text fontSize="xl" fontWeight="extrabold">
                    Pools #{id}
                  </Text>
                  <Text
                    fontWeight="bold"
                    color={useColorModeValue(
                      "blackAlpha.600",
                      "whiteAlpha.600"
                    )}
                    wordBreak="break-word"
                  >
                    {token1.name}/{token2.name}
                  </Text>
                </Flex>
              </Flex>
              <Grid
                templateColumns={{ lg: "1fr 1fr" }}
                gap={{ base: 2, md: 4 }}
              >
                <GridItem>
                  <Text
                    fontWeight="semibold"
                    color={useColorModeValue(
                      "blackAlpha.600",
                      "whiteAlpha.600"
                    )}
                  >
                    Pool Liquidity
                  </Text>
                  <Text
                    fontSize={{ base: "lg", sm: "xl" }}
                    fontWeight="extrabold"
                    wordBreak="break-word"
                  >
                    ${poolLiquidity.toLocaleString()}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text
                    fontWeight="semibold"
                    color={useColorModeValue(
                      "blackAlpha.600",
                      "whiteAlpha.600"
                    )}
                  >
                    Apr
                  </Text>
                  <Text
                    fontSize={{ base: "lg", sm: "xl" }}
                    fontWeight="extrabold"
                  >
                    {apr}%
                  </Text>
                </GridItem>
                <GridItem colSpan={{ lg: 2 }}>
                  <Divider
                    borderColor={useColorModeValue(
                      "primary.300",
                      "primary.100"
                    )}
                  />
                </GridItem>
                <GridItem>
                  <Text
                    fontWeight="semibold"
                    color={useColorModeValue(
                      "blackAlpha.600",
                      "whiteAlpha.600"
                    )}
                  >
                    My Liquidity
                  </Text>
                  <Text
                    fontSize={{ base: "lg", sm: "xl" }}
                    fontWeight="extrabold"
                  >
                    ${myLiquidity}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text
                    fontWeight="semibold"
                    color={useColorModeValue(
                      "blackAlpha.600",
                      "whiteAlpha.600"
                    )}
                  >
                    My Bounded Amount
                  </Text>
                  <Text
                    fontSize={{ base: "lg", sm: "xl" }}
                    fontWeight="extrabold"
                  >
                    ${myBoundedAmount}
                  </Text>
                </GridItem>
              </Grid>
            </Box>
          );
        }
      )}
    </SimpleGrid>
  );
});

const ListPools = observer((props: { poolStore: PoolStore }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [asset1Name, setAsset1Name] = useState('')
  const [asset2Name, setAsset2Name] = useState('')

  const isError = !asset1Name || !asset2Name

  const addPool = () => {
    props.poolStore.addPoolWithAssetNames(asset1Name, asset2Name)
    closeModal()
  }

  const closeModal = () => {
    setAsset1Name('')
    setAsset2Name('')
    onClose()
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Pool</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired isInvalid={isError}>
              <FormLabel>First Asset</FormLabel>
              <Select placeholder='Choose First Asset'
                onChange={e => { setAsset1Name(e.target.value) }}>
                {props.poolStore.assetStore.assets.map((a, i) =>
                  <option value={a.name} key={a.name + i}>{a.name}</option>
                )}
              </Select>
            </FormControl>
            <FormControl isRequired isInvalid={isError}>
              <FormLabel>Second Asset</FormLabel>
              <Select placeholder='Choose Second Asset'
                onChange={e => { setAsset2Name(e.target.value); console.log('dd') }}>
                {props.poolStore.assetStore.assets.map((a, i) =>
                  <option value={a.name} key={a.name + i}>{a.name}</option>
                )}
              </Select>
              {isError && (<FormErrorMessage>Both assets are required.</FormErrorMessage>)}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={closeModal}>
              Cancel
            </Button>
            <Button variant='ghost' isDisabled={isError} onClick={addPool}>Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box p={4}>
        <Flex align="center" mb={6}>
          <Heading as="h2" fontSize="2xl" mr={4}>
            Active Pools
          </Heading>
          <Button onClick={onOpen} display={{ base: "none", sm: "block" }}>Create New Pool</Button>
        </Flex>
        <SimpleGrid columns={{ sm: 2 }} gap={4} maxW={{ sm: "md" }} mb={8}>
          <Box>
            <Text
              fontWeight="semibold"
              color={useColorModeValue("blackAlpha.600", "whiteAlpha.600")}
              mb={1}
            >
              OSMO Price
            </Text>
            <Text fontSize="3xl" fontWeight="bold" py={2}>
              $4.41
            </Text>
          </Box>
          <Box>
            <Text
              fontWeight="semibold"
              color={useColorModeValue("blackAlpha.600", "whiteAlpha.600")}
              mb={2}
            >
              Reward distribution on
            </Text>
            <Flex align="center">
              <Text fontSize="3xl" fontWeight="bold">
                12
              </Text>
              <Box
                borderRadius="lg"
                bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
                px={3}
                mx={1}
              >
                <Text fontSize="2xl" fontWeight="bold">
                  H
                </Text>
              </Box>
              <Text fontSize="3xl" fontWeight="bold">
                19
              </Text>
              <Box
                borderRadius="lg"
                bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
                px={3}
                mx={1}
              >
                <Text fontSize="2xl" fontWeight="bold">
                  M
                </Text>
              </Box>
            </Flex>
          </Box>
        </SimpleGrid>
        <Box
          bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
          m={-4}
          px={4}
          py={6}
        >
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            My Pools
          </Text>
          <PoolsCard poolsData={props.poolStore.poolsDataList} />
        </Box>
      </Box>
    </>
  );
})

export default ListPools;
