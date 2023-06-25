import * as React from 'react';
import {
    Flex, 
    Center
    } from '@chakra-ui/react';

import Plx from 'react-plx';

const styles = {
    bgGrad: {
        background: 'linear-gradient(0deg, rgba(255,255,255,1) 69%, rgba(249,78,36,1) 69%)',
        width: '100%'
    },
    navalign: {
        alignItems: "center",
        display: "flex",
        justifyContent: "flex-end"
      },
      heroImageWidthStyles: {
        borderRadius: '24px',
        width: '100%',
        px: '60px',
        maxW: '100vw',
        height: '650px',
        color: 'white', 
        position: 'relative',
        objectFit: 'fil',
        backgroundImage: 'url("/refcon/hero.png")',
        backgroundPosition: '50%',
        backgroundRepeat:'no-repeat',
        backgroundSize: '100%',
        paddingTop: '60px',
        },
    
    };

const removePadding = [
    {
        start: 0,
        end: 500,
        properties: [
        {
            startValue: 60,
            endValue: 0,
            unit: 'px',
            property: "paddingTop"
        }
        ]
    }
];

const heroImageWidth = [
    {
        start: 0,
        end: 500,
        properties: [
        {
            startValue: 100,
            endValue: 120,
            unit: '%',
            property: "backgroundSize"
        },
        {
            startValue: 40,
            endValue: 60,
            property: "backgroundPosition"
        },
        {
            startValue: 92,
            endValue: 100,
            unit: 'vw',
            property: 'width',
        },
        {
            startValue: 72,
            endValue: 0,
            property: "borderRadius"
        }
        ]
    }
];

export default function HeroImage() {
    return (
        <div style={styles.bgGrad}>
        <Center>
            <Plx parallaxData={removePadding}>
            <Flex>
                <Plx parallaxData={heroImageWidth} style={styles.heroImageWidthStyles}>
                </Plx>
            </Flex>
            </Plx>
        </Center>
        </div> 
    );
  }



   