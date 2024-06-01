
import React, { useState } from "react";
// nodejs library to set properties for components
import * as PropTypes from "prop-types";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Button, Nav, NavLink as ReactstrapNavLink } from "reactstrap";
import {
  BackgroundColorContext,
  backgroundColors,
} from "../../../../contexts/BackgroundColorContext";
import { useStore } from "../../../../app/stores/store";
import LoadingComponent from "../../../../app/layout/loadingComponent";
import { List, ListItem, Menu, MenuItem } from "@mui/material";
import { ProductLine } from "../../../../app/models/productLine";
import { statusOption } from "../../../../app/common/options/statusOptions";
import { observer } from "mobx-react-lite";

var ps: any;

function Sidebar() {
  const { productLineStore } = useStore();

  const { productLines, loadingInitial,choosingLine,setChoosingLine} = productLineStore;

  const sidebarRef = React.useRef(null);

  const [anchorEl,setAnchorEl] = useState<null | HTMLElement>(null);

  function handleChoosingLine(productLine: ProductLine) {
    if(anchorEl!=null) {
      setAnchorEl(null);
    }
    setChoosingLine(productLine);
  }
  // verifies if routeName is the one active (in browser input)
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebarRef.current!, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });

  const handleStatusClick = (event: React.MouseEvent<HTMLElement>, productLine: ProductLine) => {
    setAnchorEl(event.currentTarget);
    setChoosingLine(productLine);
    console.log(choosingLine?.title);
    
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange=(newStatus : string)=> {
      choosingLine!.status = newStatus;
      productLines.set(choosingLine!.id,choosingLine!)
      setAnchorEl(null);
  }

  const getStatusColor = (status: string) => {
    const option = statusOption.find(opt => opt.text === status);
    return option ? option.value : 'black';
  };

  if (loadingInitial) return <LoadingComponent content="loading..." />
  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
        <div className="sidebar" >
          <div className="sidebar-wrapper" ref={sidebarRef}>
            <List>
              {Array.from(productLines.values()).map(productLine => (
                <ListItem key={productLine.id}>
                  <Button
                    variant="contained"
                    color={productLine.id === choosingLine!.id ? 'primary' : 'default'}
                    onClick={() => handleChoosingLine(productLine)}
                    style={{ width: 500 }}
                    fullWidth
                  >
                    {productLine.title}<br />
                    <span style={{ color: getStatusColor(productLine.status) ,cursor:"pointer",display:'inline'}}
                      onClick={(e) => handleStatusClick(e,productLine)}
                    >
                      {productLine.status}
                    </span>
                  </Button>
                </ListItem>
              ))}
            </List>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
                {statusOption.map((option)=>(
                  <MenuItem
                    key={option.text}
                    onClick={()=>handleStatusChange(option.text)}
                  >
                    {option.text}
                  </MenuItem>
                ))}
            </Menu>
          </div>
        </div>
      )}
    </BackgroundColorContext.Consumer>
  );
}

Sidebar.propTypes = {
  // if true, then instead of the routes[i].name, routes[i].rtlName will be rendered
  // insde the links of this component
  rtlActive: PropTypes.bool,
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the text of the logo
    text: PropTypes.node,
    // the image src of the logo
    imgSrc: PropTypes.string,
  }),
};

export default observer(Sidebar);
