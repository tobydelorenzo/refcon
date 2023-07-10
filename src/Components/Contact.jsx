
import React from "react";
import {
  Flex,
  Grid, 
  Heading,
  Stack,
  Text,
  Link
} from "@chakra-ui/react";

import { ExternalLinkIcon } from '@chakra-ui/icons'

export default function Contact({}) 

{
  return (
    <>
      <Flex
        id='contact'
        align="center"
        direction={{ base: "column" }}
        >
        <Grid
          w = '100vw'
          templateRows='repeat(2)'
          gap={4}
          pt={14}
          px= {{xs:'16px', md:'60px', xl: '10vw'}}
          >
          <Flex
            align="start"
            direction={'column'}
            gap='4'
            >
              <Heading
                as="h1"
                color="#313539"
                fontWeight="bold"
                textAlign={["left"]}
                fontSize="4xl"
                w="max-content"  
                >
                  Contact
              </Heading>
              <Flex
                h={{xs: 'auto', sm:'350px'}}
                w='100%'
                bg={'rgba(250, 247, 247, 0.4)'}
                border={'1px solid rgba(242, 242, 242, 0.3)'}
                boxShadow={'0px 1.5px 10px rgba(0, 0, 0, 0.1)'}
                borderRadius={' 16px'}
                p={8}
              >
                <Stack
                  justify={["space-between"]}
                  w={'100%'}
                >
                  <Flex 
                    direction="row"
                    justify="space-between"
                    >
                    <Flex direction="column">
                      <Heading
                        as="h2"
                        size="lg"
                        color="rgba(249, 78, 36, 1)"
                        opacity="0.8"
                        fontWeight="700"
                        lineHeight={1.5}
                      >
                        Excellence in construction
                      </Heading>
                      <Heading
                        as="h2"
                        size="lg"
                        color="rgba(249, 78, 36, 1)"
                        opacity="0.8"
                        fontWeight="700"
                        lineHeight={1.5}
                        >
                        from the ground up.
                      </Heading>      
                    </Flex>
                    <Image 
                      display= {{xs:'none', sm:'flex'}}
                      src={footerIcon} 
                      />
                  </Flex>
                  <Flex direction="column">
                    <Stack 
                      direction={{md:'row', xs: 'column', sm: 'row', lg: 'row'}} 
                      spacing='24px'
                      align='stretch'
                      >
                        <Flex flexBasis={'15%'} alignItems='baseline' gap='2'>
                            <ExternalLinkIcon color="#F94E24" />
                            <Text>
                              By email  <br /><Link href='mailto:refconstruction7@gmail.com' isExternal>refconstruction7@gmail.com</Link>
                            </Text>
                        </Flex>
                        <Flex flexBasis={'15%'} alignItems='baseline' gap='2'>
                            <ExternalLinkIcon color="#F94E24" />
                            <Text>
                            By Phone  <br /><Link href='tel:+61427167474' isExternal>0427 167 474</Link>
                            </Text>
                        </Flex>
                        {/*
                        <Flex flexBasis={'15%'} alignItems='baseline' gap='2'>
                            <ExternalLinkIcon color="#F94E24" />
                            
                            <Text>
                                LinkedIn
                            </Text>
                            
                        </Flex>
                        */}
                        <Flex flexGrow={'4'} justify={{xs:"flex-start", sm:"flex-end"}}>                        
                          <Text>
                            © Ref Construction 2023 
                          </Text>
                        </Flex>
                    </Stack>    
                  </Flex>

                </Stack>
              </Flex>

          </Flex>
        </Grid>
      </Flex>  
    </>
  );
}

SiteHeader.propTypes = {
  footerIcon: PropTypes.string,
};

SiteHeader.defaultProps = {
  footerIcon: "/refcon.svg" 
}