import './css/App.css';
import Sidebar from './components/Navbar';
import { Button, ChakraProvider, extendTheme, Flex, useDisclosure } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Classes from './pages/Classes';
import ClubSports from './pages/ClubSports';
import Forms from './pages/Forms';
import Intramural from './pages/Intramural';
import Schedule from './pages/Schedule';
import Login from './pages/Login';
import Register from './pages/Register';


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
          borderRadius: "0px",
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
          borderRadius: "0px",
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
          borderRadius: "0px",
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
  
  return (
    <div className="App">
        <ChakraProvider theme={theme}>
          <Routes> {/* Add routes to pages below */}
            <Route path='/' element={<Dashboard isOpen={isOpen} onToggle={onToggle}/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/classes' element={<Classes isOpen={isOpen} onToggle={onToggle} />}/>
            <Route path='/intramural' element={<Intramural isOpen={isOpen} onToggle={onToggle} />}/>
            <Route path='/clubsports' element={<Clubsports isOpen={isOpen} onToggle={onToggle} />}/>
            <Route path='/forms' element={<Forms isOpen={isOpen} onToggle={onToggle} />}/>
            <Route path='/schedule' element={<Schedule isOpen={isOpen} onToggle={onToggle} />}/>
            <Route path='/register' element={<Register />}/>
          </Routes>
        </ChakraProvider>
    </div>
  );
}

export default App;
