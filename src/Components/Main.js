import React from "react";
import { Box,  } from "@mui/material";
import './Home.css';
import HeaderBox from "./HeaderBox";
import NavigationBox from "./NavigationBox";
import ContentBox from "./ContentBox";

const Main = () => {
  return (
    <div>
      <Box class="main"> 
        <HeaderBox/>
      
        <Box class='footerBox'>
          <NavigationBox/>
          <ContentBox/>
        </Box>
      </Box>
   
     
    </div>
  );
}
export default Main;