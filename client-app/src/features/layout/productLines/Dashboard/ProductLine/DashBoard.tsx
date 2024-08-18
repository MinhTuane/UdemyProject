
import React, { useEffect } from "react";

import Sidebar from "./Sidebar";
import Detail from "./Detail";



import { BackgroundColorContext } from "../../../../../contexts/BackgroundColorContext";
import { useStore } from "../../../../../app/stores/store";
import LoadingComponent from "../../../../../app/layout/loadingComponent";
import { observer } from "mobx-react-lite";
import IdlingLine from "./IdlingLine";


export default observer(function DashBoard() {
  
  const{productLineStore} = useStore();
  const {loadProductLines,productLines,choosingLine} = productLineStore;
  useEffect(()=>{
    if(productLines.size <1){
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
            <div className="main-panel"  ref={mainPanelRef} datatype={color}>
              {choosingLine?.status == "Idle" ?
              <IdlingLine/>
              :
              <Detail/>
              }     
            </div>
            
          </div>
        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer>
  );
})

