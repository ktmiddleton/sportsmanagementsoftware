import React from 'react'
import { useNavigate } from 'react-router-dom';
import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuList
} from '@chakra-ui/react'

export default function NavItem({ icon, title, active, navSize, navigationSuffix}) {
    const navigate = useNavigate();

    function handleNavigate(path) 
    {
        return () => navigate(path);
    }
    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
        >
            <Menu placement="right">
                <Link
                    backgroundColor={active == "True" ? "brand.active.darkGreen" : "none"}
                    p={3}
                    borderRadius={8}
                    _hover={{ textDecor: 'none', backgroundColor: "brand.hover.loyolaGreen"}}
                    w={navSize == "large" && "100%"}
                    onClick={handleNavigate(navigationSuffix)}
                >
                    <MenuButton w="100%">
                        <Flex>
                            <Icon as={icon} boxSize={9} color={"brand.white"} />
                            <Text ml={5} display={navSize == "small" ? "none" : "flex"} color={"brand.white"} fontSize='18px'>{title} </Text>
                        </Flex>
                    </MenuButton>
                </Link>
                <MenuList
                    py={0}
                    border="none"
                    w={200}
                    h={200}
                    ml={5}
                >
                </MenuList>
            </Menu>
        </Flex>
    )
}