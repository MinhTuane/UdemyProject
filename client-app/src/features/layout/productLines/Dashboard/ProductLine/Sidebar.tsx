import React, { Fragment, useState, useEffect, useRef } from "react";
import * as PropTypes from "prop-types";
import PerfectScrollbar from "perfect-scrollbar";
import { BackgroundColorContext } from "../../../../../contexts/BackgroundColorContext";
import { useStore } from "../../../../../app/stores/store";
import LoadingComponent from "../../../../../app/layout/loadingComponent";
import { List, Menu, MenuItem } from "@mui/material";
import { ProductLine } from "../../../../../app/models/productLine";
import { statusOption } from "../../../../../app/common/options/statusOptions";
import { observer } from "mobx-react-lite";
import { Header } from "semantic-ui-react";
import ProductLineListItem from "./ListItem";

let ps: PerfectScrollbar | null = null;

function Sidebar() {
  const { productLineStore ,productStore} = useStore();
  const { groupedLineStatus, productLines, loadingInitial, choosingLine, setChoosingLine,getStatusColor,mapToSemanticColor,updateProductLine } = productLineStore;
  const {updateProduct,getProduct,loadProducts,products} = productStore;

  const sidebarRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1 && sidebarRef.current) {
      ps = new PerfectScrollbar(sidebarRef.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return () => {
      if (ps) {
        ps.destroy();
      }
    };
  }, []);

  useEffect(()=> {
    if(products.size <=1) {
      loadProducts
    }
  },[products,loadProducts])

  const handleChoosingLine = (productLine: ProductLine) => {
    if (anchorEl) {
      setAnchorEl(null);
    }
    setChoosingLine(productLine);
  };

  const handleStatusClick = (event: React.MouseEvent<HTMLElement>, productLine: ProductLine) => {
    setAnchorEl(event.currentTarget);
    setChoosingLine(productLine);
    console.log(choosingLine?.title);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (newStatus: string) => {
    if(choosingLine!.status!='Idle') {
      if (choosingLine) {
        choosingLine.status = newStatus;
        if(newStatus === 'Idle') {       
          var product = getProduct(choosingLine.productId!);
          choosingLine.productId =undefined;
          product ={
            ...product!,
            isProducing : false
          }
          updateProduct(product);
        }
        productLines.set(choosingLine.id, choosingLine);
        setAnchorEl(null);
        updateProductLine(choosingLine).then(()=> console.log("Success")).catch(error=> console.log(error));
              
      }
    }
  };

  if (loadingInitial) return <LoadingComponent content="loading..." />;

  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
        <div className="sidebar" style={{ backgroundColor: color }}>
          <div className="sidebar-wrapper" ref={sidebarRef}>
            <List>
              {groupedLineStatus.map(([group, productLines]) => (
                <Fragment key={group}>
                  <Header sub color={mapToSemanticColor(getStatusColor(group))}>
                    {group}
                  </Header>
                  {productLines.map((productLine) => (
                    <ProductLineListItem
                      key={productLine.id}
                      handleChoosingLine={handleChoosingLine}
                      getStatusColor={getStatusColor}
                      productLine={productLine}
                      handleStatusClick={handleStatusClick}
                    />
                  ))}
                </Fragment>
              ))}
            </List>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              {statusOption.map((option) => (
                <MenuItem key={option.text} onClick={() => handleStatusChange(option.text)}>
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
  rtlActive: PropTypes.bool,
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    innerLink: PropTypes.string,
    outterLink: PropTypes.string,
    text: PropTypes.node,
    imgSrc: PropTypes.string,
  }),
};

export default observer(Sidebar);
