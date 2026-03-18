import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'

import customTheme from "./utils/theme";
import "@fontsource/barlow";

import App from './App'


const rootElement = document.getElementById('root')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)


function doPost(e) {
  var row = [
    e.parameter.pair1,
    e.parameter.pair2,
    e.parameter.pair3,
    e.parameter.pair4,
    e.parameter.pair5,
  ]

  var sheet = SpreadsheetApp.openById('1LUGNJcsytqy7rLlQMxChm5sRqxdX-ec-RMop2tDuERQ');

  sheet.appendRow(row);


  return ContentService.createTextOutput('Done! Nice work AM Design');
}