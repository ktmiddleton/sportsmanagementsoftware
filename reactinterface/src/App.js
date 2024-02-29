import './css/App.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Button, ChakraProvider, extendTheme, Flex } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
// --loyola-green:#005a3c;
//   --hounds-grey:#d2d2d2;
//   --black:#000000;
//   --dark-green:#002d1e;
//   --dark-grey:#4c4c4c;
//   --bright-green:#0aa776;

const theme = extendTheme({
  colors: {
    brand: {
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
          height: "4rem",
          bg: "brand.darkGrey",
          color: "white",
          fontSize: "1.3rem",
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
          height: "4rem",
          bg: "brand.loyolaGreen",
          color: "white",
          fontSize: "1.3rem",
          borderRadius: "0px",
          // _hover: {
          //   bg: "brand.hover.loyolaGreen",
          // },
          _active: {
            bg: "brand.active.loyolaGreen",
          },
          _focus: {
            border: "2px solid white",
          },
        },
      },
    },
  },
})

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <Navbar />
          <Flex
            direction="row"
          >
            <div className='Sidebar hide-for-small-only'>
              <Sidebar />
            </div>
            <Dashboard />
          </Flex>
        </ChakraProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
