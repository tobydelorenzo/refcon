import { React } from "react";
import {
    Box,
    Flex,
  } from "@chakra-ui/react";

import AnchorLink from 'react-anchor-link-smooth-scroll';

import "./style.css";



  export default function Nav() {

  return (
    <>
        <Flex className="navContainer"
                py='2'
                px='9'
                gap='10'
            display={{xs:'none', sm:'flex'}}
            >
            <Box className="navLink"><AnchorLink href='#home'>Home</AnchorLink></Box>
            <Box className="navLink"><AnchorLink href='#projects' offset='50'>Projects</AnchorLink></Box>
            <Box className="navLink"><AnchorLink href='#about' offset='50'>Company</AnchorLink></Box>
            <Box className="navLink"><AnchorLink href='#contact' offset='50'>Contact</AnchorLink></Box>
        </Flex>
    </>
  );
}
