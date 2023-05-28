import React, { useState, useEffect } from "react";
import { capsFirst } from "../utils";
import ReactDOM from "react-dom";
import theme from "../utils/theme";

import {
  ChakraProvider,
  extendTheme,
  Container,
  Heading,
  Button,
  VStack,
  Stack,
  Image,
  Text,
  Flex,
  Tag,
  Box,
  Center
} from "@chakra-ui/react";

import ChakraCarousel from "./ChakraCarousel"

function Carousel() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/src/assets/content.json")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  return (
    <ChakraProvider theme={extendTheme(theme)}>
      <Container
        py={16}
        px={{xs:'16px', md:'60px', xl: '10vw'}}
        mt={16}
        maxW={{
          base: "100vw",
          //sm: "35rem",
          //md: "43.75rem",
          //lg: "57.5rem",
          //xl: "75rem",
          //xxl: "87.5rem"
        }}
      >
        <ChakraCarousel 
          gap={32}
          
        >
          {data.slice(0, 5).map((post, index) => (
            <Flex
              key={index}
              justifyContent="space-between"
              flexDirection="column"
              overflow="hidden"
              color="gray.500"
              rounded={5}
              flex={1}
              gap='4'
            >
              
              <Flex
                flexDirection={{base:"row", xs:"column", md:"row"}}
                gap='2'
              >
                <Box 
                  flexBasis='60%'
                  alignContent="flex-start"
                  >
                  <Flex
                    gap='2'
                    align={{base:"center", xs:"baseline", sm:"center"}}
                  >
                    <Box
                      w={{base:"60px", xs:"32px", sm:"60px"}}
                      h={{base:"60px", xs:"32px", sm:"60px"}}
                      borderRadius='full'
                      background='#F94E24'
                      display={{base:"flex", xs:"none", sm:"flex"}}
                    ></Box>
                    <Heading
                        as="h2"
                        color="#313539"
                        fontWeight="bold"
                        fontSize="4xl"
                        w="max-content" 
                        textAlign="left"
                      >
                        {capsFirst(post.title)}
                    </Heading>
                  </Flex>
                    <Stack 
                      spacing={2}
                      gap='4'
                      pt='4'
                    >
                      <Stack 
                        direction={{base:'row', xs:'column', sm:'row' }}
                        spacing={2}
                        color='#0C2A36'
                        fontWeight={'medium'}
                        >
                        <Stack
                          direction='column'
                          flexBasis={'50%'} 
                        >
                          <Text>Project value: {(post.value)}</Text>
                          <Text>Project length: {(post.length)}</Text>
                        </Stack>
                        <Stack
                          direction='column'
                          flexBasis={'50%'}
                        >
                          <Text>{(post.duties1)}</Text>
                          <Text>{(post.duties2)}</Text>
                        </Stack>
                      </Stack>
                      
                      <Box 
                        size="sm" 
                        variant="solid" 
                        bg="rgba(105, 229, 229, 0.9);"
                        px="6"
                        py="2"
                        w="min-content"
                        borderRadius='full'
                        fontWeight='700'
                        color='#0C2A36'
                        >
                        {(post.tag)}
                      </Box>
                    </Stack>
                </Box>
                <Box 
                  background="red.500"
                  flexBasis='40%'
                  bg='#FAF7F7'
                  border='1px solid rgba(255, 255, 255, 0.1)'
                  boxShadow='0px 1.5px 10px rgba(0, 0, 0, 0.1)'
                  borderRadius='16px'
                  padding='8'
                  display={{base:"Flex", xs:"none", md:"Flex"}}
                  >
                    {capsFirst(post.body)}
                </Box>
              </Flex>
              <Flex>
                <Image src={post.projectimage}
                  borderRadius={10}
                ></Image>
              </Flex>
            </Flex>
          ))}
        </ChakraCarousel>
      </Container>
    </ChakraProvider>
  );
}

export default Carousel
