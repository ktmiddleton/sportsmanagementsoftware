import './css/App.css';
import Sidebar from './components/Navbar';
import { Button, ChakraProvider, extendTheme, Flex, useDisclosure } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Classes from './pages/Classes';
import ClubSports from './pages/Clubsports';
import Forms from './pages/Forms';
import Intramural from './pages/Intramural';
import Schedule from './pages/Schedule';
import Login from './pages/Login';
import Register from './pages/Register';
import ClubSportTeamPage from './pages/ClubSportTeamPage';
import IntramuralSportTeamPage from './pages/IntramuralSportTeamPage';
import Admin from './pages/Admin';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserProvider } from './components/UserContext';
import ClassPage from './pages/ClassPage';


// --loyola-green:#005a3c;
//   --hounds-grey:#d2d2d2;
//   --black:#000000;
//   --dark-green:#002d1e;
//   --dark-grey:#4c4c4c;
//   --bright-green:#0aa776;

const theme = extendTheme({
  colors: {
    brand: {
      red: "#f72828",
      yellow: "#f7db74",
      white: "#FFFFFF",
      loyolaGreen: "#005a3c",
      houndsGrey: "#d2d2d2",
      black: "#000000",
      darkGreen: "#002d1e",
      darkGrey: "#4c4c4c",
      brightGreen: "#0aa776",
      hover: { // Lightest
        loyolaGreen: "#337b63",
        houndsGrey: "#ededed",
        black: "#333333",
        darkGreen: "#33574b",
        darkGrey: "#707070",
        brightGreen: "#3bb991",
      },
      active: { // could also use for "focus" pseudoclass, Same as base color
        loyolaGreen: "#005a3c",
        houndsGrey: "#d2d2d2",
        black: "#000000",
        darkGreen: "#002d1e",
        darkGrey: "#4c4c4c",
        brightGreen: "#0aa776",
      },
    },
  },
  components: {
    Button: {
      variants: {
        submit: 
        {
          bg: "brand.brightGreen",
          color: "brand.white",
          fontSize: "1.3rem",
          borderRadius: "6px",
          _active: 
          {
            bg: "brand.active.brightGreen",
          },
          _hover: 
          {
            bg: "brand.hover.brightGreen",
          },
        },
        sidebar: {
          width: "100%",
          height: "6rem",
          bg: "brand.darkGrey",
          color: "white",
          fontSize: "1.7rem",
          textAlign: "start",
          borderRadius: "0px",
          _hover: {
            bg: "brand.loyolaGreen",
          },
          _active: {
            bg: "brand.hover.loyolaGreen",
          },
          _focus: {
            border: "2px solid white",
          },
        },
        activeSidebar: {
          width: "100%",
          height: "6rem",
          bg: "brand.darkGrey",
          color: "white",
          fontSize: "1.7rem",
          borderRadius: "0px",
          _hover: {
            bg: "brand.loyolaGreen",
          },
          _before: {
            content: `"|"`
          },
          _active: {
            bg: "brand.active.loyolaGreen",
          },
          _focus: {
            border: "2px solid white",
          },
        },
        Register: 
        {
          bg: "brand.brightGreen",
          color: "brand.white",
          fontSize: "1.3rem",
          borderRadius: "6px",
          _active: 
          {
            color: "brand.black",
          },
          _hover: 
          {
            color: "brand.black",
          },
          _focus: 
          {
            border: "2px solid black",
          },
        },
        Waitlist: 
        {
          bg: "brand.yellow",
          color: "brand.white",
          fontSize: "1.3rem",
          borderRadius: "6px",
          _active: 
          {
            color: "brand.black",
          },
          _hover: 
          {
            color:"brand.black",
          },
          _focus: 
          {
            color: "brand.black",
            border: "2px solid black",
          },
        },
        Full: 
        {
          bg: "brand.houndsGrey",
          color: "brand.black",
          fontSize: "1.3rem",
          borderRadius: "6px",
        }
      },
    },
  },
  // breakpoints: {
  //   base: "0em", // 0px
  //   sm: "30em", // ~480px. em is a relative unit and is dependant on the font-size.
  //   md: "48em", // ~768px
  //   // md: "49em", // ~784px
  //   lg: "62em", // ~992px
  //   xl: "80em", // ~1280px
  //   "2xl": "96em", // ~1536px
  // }
})

function App() {
  const { isOpen, onToggle } = useDisclosure({defaultIsOpen: true})

  // useEffect(() => {
  //   // axios.get(`http://localhost:8000/user/getuserusername/?username=${localStorage.getItem("username")}`)
  //   // .then((response) => {
  //   //   console.log(response);
  //   // })
  //   // .catch((error) => {
  //   //   console.log(error);
  //   // });

  //   // function handleChangeStorage() {
  //   //   console.log("CHANGED STORAGE")
  //   //   setUsername(localStorage.getItem("username"));
  //   // }

  //   // window.addEventListener('storage', handleChangeStorage);
  //   // return () => window.removeEventListener('storage', handleChangeStorage);
  // }, [])
  
  
  return (
    <div className="App">
      <UserProvider>
        <ChakraProvider theme={theme}>
          <Routes> {/* Add routes to pages below */}
            <Route path='/' element={<Dashboard isOpen={isOpen} onToggle={onToggle}/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/classes' element={<Classes isOpen={isOpen} onToggle={onToggle} />}/>
            <Route path='/intramural' element={<Intramural isOpen={isOpen} onToggle={onToggle} />}/>
            <Route path='/clubsports' element={<ClubSports isOpen={isOpen} onToggle={onToggle} />}/>
            <Route path='/clubsportteam/:teamId' element={<ClubSportTeamPage isOpen={isOpen} onToggle={onToggle} />}/>
            <Route path='/intramuralsportteam/:teamId' element={<IntramuralSportTeamPage isOpen={isOpen} onToggle={onToggle} />}/>
            <Route path='/class/:classId' element={<ClassPage isOpen={isOpen} onToggle={onToggle} />}/>
            <Route path='/forms' element={<Forms isOpen={isOpen} onToggle={onToggle} />}/>
            <Route path='/schedule' element={<Schedule isOpen={isOpen} onToggle={onToggle} />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/admin' element={<Admin openState={isOpen} onToggle={onToggle} />}/>
          </Routes>
        </ChakraProvider>
      </UserProvider>
    </div>
  );
}

export default App;
