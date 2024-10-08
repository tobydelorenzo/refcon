
import React from "react";
import PropTypes from "prop-types";
import {
  Flex,
  Heading,
} from "@chakra-ui/react";

const styles = {
aboutCard: {
    alignItems: "center",
    display: "flex",
    justifyContent: "flex-end",
    width: "100%"
  },
};


export default function About({
  Abouttitle,
  Abouttext1,
  Abouttext2,
  ...rest
}) 

{
  return (
    <>  
    <Flex
        id='about'
        align="center"
        mb={16}
      >
        <Flex
          w = '100vw'
          gap={4}
          px= {{xs:'16px', md:'60px', xl: '10vw'}}
          pt={14}
          direction={{ base: "column" }}
        >
            <Flex>
              <Heading
                as="h1"
                color="#313539"
                fontWeight="bold"
                fontSize="4xl"
                w="max-content"  
                >
                {Abouttitle}
              </Heading>
            </Flex>
          <Flex 
            gap={6}
            display={'flex'}
            direction={{ base: "row", xs: "column", md: "row"  }}
            >
                <Flex 
                  bg={'rgba(250, 247, 247, 0.4)'}
                  border={'1px solid rgba(242, 242, 242, 0.3)'}
                  boxShadow={'0px 1.5px 10px rgba(0, 0, 0, 0.1)'}
                  borderRadius={' 16px'}
                  flex={'fit-content'}
                  >
                  <Flex p={8}>
                        <Heading
                          as="h2"
                          size="md"
                          color="#313539"
                          opacity="0.8"
                          fontWeight="normal"
                          lineHeight={1.5}
                          textAlign={["left"]}
                        >
                          {Abouttext1} 
                          <br />
                          {Abouttext2} 
                        </Heading>
                    </Flex>
                </Flex>
            
                <Flex
                  bg={'rgba(105, 229, 229, 1)'}
                  border={'1px solid rgba(255, 255, 255, 0.2)'}
                  boxShadow={'0px 1.5px 10px rgba(0, 0, 0, 0.1)'}
                  borderRadius={' 16px'} 
                  flexBasis={'35%'}
                  >
                    <Flex p={8}>
                      <Heading
                        as="h2"
                        size="md"
                        color="#313539"
                        opacity="0.8"
                        fontWeight="700"
                        lineHeight={1.5}
                        textAlign={["left"]}
                        maxH="220px"
                      >
                        <div>CIVIL  //</div> 
                        <div>RESIDENTIAL //</div>  
                      </Heading>
                    </Flex>
                </Flex>
            </Flex>
            
        </Flex>
      </Flex>
    </>
  );
}

About.propTypes = {
  Abouttitle: PropTypes.string,
  Abouttext1: PropTypes.string,
  Abouttext2: PropTypes.string
};

