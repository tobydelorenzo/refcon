import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Flex,
  Grid, 
  GridItem,
  Image,
  Heading,
  Stack,
} from "@chakra-ui/react";

import Nav from "./Nav";

const styles = {
navalign: {
    alignItems: "center",
    display: "flex",
    justifyContent: "flex-end"
  },
};


export default function SiteHeader({
  titleLineOne,
  titleLineTwo,
  subtitle,
  image,
  logo,
  logoMob,
  logoLink,
  ...rest
}) 

{
  return (
    <>  
    <Flex
        id='home'
        align="center"
        bg="#F94E24"
      >
        <Grid className="section"
            gridTemplateRows={'60px 1fr'}
            gridTemplateColumns={{base:'150px 1fr', xs:'1fr', sm:'150px 1fr'}}
            gap={4}
            height={{base: '80vh', xs: 'Auto', sm: '80vh' }}
            width='100vw'
            px={{xs:'16px', md:'60px', xl: '10vw'}}
            pt={14}
            >
            <GridItem 
              rowSpan={3} 
              colSpan={1}
              >
                <Image 
                  display= {{xs:'none', sm:'flex'}}
                  src={logo} 
                   />
                  <Image 
                  display= {{xs:'flex', sm:'none'}}
                  src={logoMob} 
                  width={{xs:'60vw', sm:'40vw'}}
                  rounded="1rem" />
            </GridItem>
            <GridItem colSpan={1} style={styles.navalign}>
                <Nav />
            </GridItem>
            <GridItem colSpan={1}>
              <Stack
              spacing={4}
              py= {16}
              h={"100%"}
              w={{xs:'100%', sm:'80%'}}
              align={["flex-start"]}
              justify={["space-between"]}
              >
                <Box>
                    <Heading
                    as="h1"
                    fontWeight="bold"
                    lineHeight={{xs:"1", sm:"1.33"}}
                    textAlign="left"
                    fontSize={{xs:"6xl", sm:"5xl",md:"7xl"}}
                    w="100%"  
                    >
                    {titleLineOne}
                    </Heading>
                    <Heading
                    as="h1"
                    fontWeight="bold"
                    textAlign="left"
                    fontSize={{xs:"6xl", sm:"5xl",md:"7xl"}}
                    w="100%"  
                    >
                    {titleLineTwo}
                    </Heading>
                </Box>
                <Heading
                  as="h2"
                  size="md"
                  color="primary.800"
                  opacity="0.8"
                  fontWeight="normal"
                  lineHeight={1.5}
                  textAlign={"left"}
                >
                  {subtitle}
                </Heading>
              </Stack>
            </GridItem>
          </Grid>
      </Flex>
    </>
  );
}

SiteHeader.propTypes = {
  titleLineOne: PropTypes.string,
  titleLineTwo: PropTypes.string,
  subtitle: PropTypes.string,
  image: PropTypes.string,
  logo: PropTypes.string,
  logoMob: PropTypes.string,
  logoLink: PropTypes.string
};

SiteHeader.defaultProps = {
  titleLineOne: "Excellence in construction", 
  titleLineTwo: "from the ground up.",
  subtitle:
    "REF Construction offers top-quality services in the civil, industrial, and residential sectors, ensuring that all projects are done with professionalism and expertise. We build lasting relationships by providing exceptional customer service and ensuring that all projects are completed on time and within budget.",
  image: "https://source.unsplash.com/collection/404339/800x600",
  logo: "/refcon/white_v_logo.svg",
  logoMob: "/refcon/REFlogo.svg",
};