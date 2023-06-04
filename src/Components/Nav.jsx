import { React } from "react";
import {
    Box,
    Flex,
  } from "@chakra-ui/react";


import AnchorLink from 'react-anchor-link-smooth-scroll';

const styles = {
    navLink: {
        color: "rgba(49, 53, 57, 1)",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "20px",
        lineHeight: "45px"
    },
};

  export default function Nav() {

  return (
    <>
        <Flex
            minWidth='min-content' 
            backgroundColor='rgba(242, 242, 242, 0.3)'
            opacity='0.6'
            backdropFilter='blur(6px)'
            borderRadius='16px'
            alignItems='center' 
            w= 'fit-content'
            gap='10'
            py='2'
            px='9'
            display={{xs:'none', sm:'flex'}}
            >
            <Box style={styles.navLink}><AnchorLink href='#home'>Home</AnchorLink></Box>
            <Box style={styles.navLink}><AnchorLink href='#projects'>Projects</AnchorLink></Box>
            <Box style={styles.navLink}><AnchorLink href='#about'>Company</AnchorLink></Box>
            <Box style={styles.navLink}><AnchorLink href='#contact'>Contact</AnchorLink></Box>
            
        </Flex>
    </>
  );
}
