import React, { useContext, useEffect } from 'react';
import {
  Box,
  Flex,
  Icon,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { LuMessagesSquare, LuCompass } from "react-icons/lu";
import { IoIosPaperPlane } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import '../NavBar.css';
import { AuthContext } from './AuthContext';
import { useMediaQuery } from '@chakra-ui/react';
import { useLocation } from "react-router-dom";

const LinkItems = [
  { name: '/', icon: LuCompass },
  { name: 'Forum', icon: LuMessagesSquare },
  { name: 'Inbox', icon: IoIosPaperPlane },
  { name: 'Library', icon: FaRegHeart },
];


const iconStyle = { color: "black" };
const iconStyleHover = { color: "white" };
// const location = useLocation();


// React.useEffect(() => {
//   console.log('location ', location)
// }, [location]);
// const isActive = location.pathname === icon.name;

const NavItem = ({ icon, loc, ...rest }) => (

  <Link href={icon.name} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
    <Flex
      align="center"
      p="6"
      borderRadius="lg"
      role="group"
      className="nav-item"
      cursor="pointer"
      _hover={{
        bg: '#2B6361',
        color: 'white',
        borderRadius: '25px',
      }}
      backgroundColor={loc === icon.name ? '#2B6361' : 'white'}
      {...rest}>
      {icon.icon && (
        <Icon
          mr="3"
          ml="3"
          mt="2"
          fontSize="45"
          style={iconStyle}
          _groupHover={iconStyleHover}
          as={icon.icon}
        />
      )}
    </Flex>
  </Link>
);

const SideBarContent = ({ handleLogout, loc }) => (

  <Box
    bg={useColorModeValue('white', 'gray.900')}
    borderRight="1px"
    borderRightColor={useColorModeValue('gray.200', 'gray.700')}
    w={{ base: 'full', md: 60 }}
    paddingRight="5px"
    paddingLeft="5px"
    paddingTop="8px"
    pos="fixed"
    top="0"
    left="0"
    h="100vh"
    className="sidebar"
    display="flex"
    flexDirection="column"
  >
    <Box flex="1">
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link} loc={loc} />
      ))}
    </Box>
    {/*  TODO: ahbinav implement logout functionality */}
    <Box marginBottom={20} >
      <button className="logout-button" onClick={handleLogout}>Log out</button>
    </Box>
    <img className="logo" src="/spotifylogosmaller.png" alt="spotify logo"></img>
  </Box>
);


const BottomBarContent = () => (
  <Box
    bg={useColorModeValue('white', 'gray.900')}
    borderTop="1px"
    borderTopColor={useColorModeValue('gray.200', 'gray.700')}
    w="100%"
    paddingRight="5px"
    paddingLeft="5px"
    paddingTop="8px"
    position="fixed" // Use position: fixed
    bottom="0"
    left="0"
    zIndex="1000"
    display="flex"
    flexDirection="row"
    justifyContent="space-around"
    alignItems="center"
  >
    {LinkItems.map((link) => (
      <Link key={link.name} href={link.name} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          p="6"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: '#2B6361',
            color: 'white',
            borderRadius: '25px',
          }}
          mr="3"
          style={{ ...iconStyle }}
        >
          {link.icon && (
            <Icon
              fontSize="25"
              as={link.icon}
              mr="3"
              ml="3"
              mt="2"
            />
          )}
        </Flex>
      </Link>
    ))}
    <button style={{
      padding: '10px',
      backgroundColor: '#2B6361',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      textAlign: 'center',
      marginBottom: '6px',
    }}>
      Log out
    </button>
    <img class="spotifylogo" src="/spotifylogosmaller.png" alt="spotify logo"></img>
  </Box>
);


const NavBar = () => {
  const [isMobile] = useMediaQuery("(max-width: 600px)");
  const { handleLogout } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    console.log('location ', location)
  }, [location]);

  // const isActive = location.pathname === icon.name;

  return (
    <> 
      {isMobile ? <BottomBarContent /> : <SideBarContent handleLogout={handleLogout} loc={location.pathname}/>}
    </>
  );
};

export default NavBar;
