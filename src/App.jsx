import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Flex,
} from "@chakra-ui/react";

import SiteHeader from "./Components/Header";
import HeroImage from "./Components/HeroImage";
import Carousel from "./Components/Carousel";
import About from "./Components/About";
import Contact from "./Components/Contact";


export default function Hero({
  title,
  subtitle,
  image,
  ctaLink,
  ctaText,
  Abouttitle,
  Abouttext,
  ...rest
}) {
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
            <HeroImage 
            />      
            <Box>
              <Carousel />  
            </Box>
            <About mb={16}/>
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
  image: "https://source.unsplash.com/collection/404339/800x600",
  ctaText: "Create your account now",
  ctaLink: "/signup"
},
About.defaultProps = {
Abouttitle: "Company", 
Abouttext:
  "Lorem ipsum dolor sit amet consectetur. Commodo tristique viverra et cras suscipit sed elementum turpis. Fames dui commodo libero suspendisse turpis vitae at vitae. Leo molestie cursus amet lacus arcu elementum cras. Eget orci lorem in mi id pellentesque fringilla placerat.",
};