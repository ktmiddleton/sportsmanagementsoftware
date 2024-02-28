import React from 'react';
import {
  Box,
  Flex,
  IconButton,
  Image,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons';
import Sidebar from './Sidebar';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();//{defaultIsOpen: true});

  return (
    <Flex
      as="nav"
      align="center"
      justify="start"
      wrap="wrap"
      px="1rem"
      bg="brand.loyolaGreen"
      color="white"
    >
        {/* Hamburger button */}
        <div className='show-for-small-only'>
          <IconButton
            size="md"
            icon={<HamburgerIcon />}
            aria-label={'Open Menu'}
            onClick={onOpen}
          />
        </div>
        
        {/* Logo */}
        <Image src="/Loyola Fit Logo.png" alt="logo" height="5rem" mx="10px" />

        {/* Menu items - hidden on mobile, shown on larger screens */}
        {/* Add Flex/Box components with your navigation links here */}
        
        {/* Mobile Menu */}
        <Drawer isOpen={isOpen} placement="left" onClose={onClose} size={"xs"}>
        {/* <DrawerOverlay /> */}
        <DrawerContent>
            {/* <DrawerCloseButton zIndex={10} boxSize="3rem" color="black" background="white" /> */}
            <Sidebar mobile={true}/>
        </DrawerContent>
        </Drawer>
    </Flex>
  );
};

export default Navbar;
