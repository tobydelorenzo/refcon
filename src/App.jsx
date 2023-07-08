import React from "react";
import PropTypes from "prop-types";
import {
  Flex,
} from "@chakra-ui/react";

import SiteHeader from "./Components/Header";
import HeroImage from "./Components/HeroImage";
import Carousel from "./Components/Carousel";
import About from "./Components/About";
import Contact from "./Components/Contact";

import { useMatchMedia } from "./hooks/useMatchMedia";


export default function Hero({
  title,
  subtitle,
  image,
  ctaLink,
  ctaText,
  Abouttitle,
  Abouttext,
  ...rest
}) 
{

const isMobileResolution = useMatchMedia("(min-width:662px)", true);
  return (
    <>
        <Flex
          align="center"
          direction={{ base: "column" }}
          wrap="no-wrap"
          mb={16}
          {...rest}
        >
            <SiteHeader />
            
            {isMobileResolution && <HeroImage />}      
            <Carousel />  
            <About mb={{xs:"0", md:"16"}}/>
            <Contact mb={16}/>
        </Flex>
    </>
  );
}

Hero.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  image: PropTypes.string,
  ctaText: PropTypes.string,
  ctaLink: PropTypes.string
},
About.propTypes = {
  Abouttitle: PropTypes.string,
  Abouttext: PropTypes.string,
};

Hero.defaultProps = {
  title: "Excellence in construction from the ground up.",
  subtitle:
  "REF Construction offers top-quality services in the civil, industrial, and residential sectors, ensuring that all projects are done with professionalism and expertise. We build lasting relationships by providing exceptional customer service and ensuring that all projects are completed on time and within budget.",  
},
About.defaultProps = {
Abouttitle: "Company", 
Abouttext:
    "REF Construction is a privately owned construction company based out of Parkes NSW specialising in civil construction, earthworks, project management and labour hire. The team at REF Construction combine years of experience across the mining, renewable energies, civil, commercial and residential sectors to form a determined project company. REF Construction offers top-quality services in the civil, industrial, and residential sectors, ensuring that all projects are completed with professionalism and expertise. We are dedicated to delivering reliable to meet the needs of our clients. We build lasting relationships by providing exceptional customer service and ensuring that all projects are completed on time and within budget.",
};