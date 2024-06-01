
import React, { useEffect } from "react";
import {useLocation } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";


import Sidebar from "./Sidebar";
import Detail from "./Detail";



import { BackgroundColorContext } from "../../../../contexts/BackgroundColorContext";
import { useStore } from "../../../../app/stores/store";
import LoadingComponent from "../../../../app/layout/loadingComponent";
import { observer } from "mobx-react-lite";


export default observer(function DashBoard() {
  
  const{productLineStore} = useStore();
  const {loadProductLines,productLines} = productLineStore;
  useEffect(()=>{
    if(productLines.size <=1){
        loadProductLines()
    }
  },[productLines.size,productLineStore])


  const mainPanelRef = React.useRef<HTMLDivElement>(null);
 
  // this function opens and closes the sidebar on small devices
  if(productLineStore.loadingInitial) return <LoadingComponent content="loading ..."/>
  return (
    <BackgroundColorContext.Consumer>
      {({color}) => (
        <React.Fragment>
          <div className="wrapper">
            <Sidebar
            />
            <div style={{paddingLeft:100}}  ref={mainPanelRef} datatype={color}>
              
              <Detail/>
              
            </div>
            
          </div>
        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer>
  );
})

