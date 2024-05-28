
// import React from "react";
// import { NavLink, Link, useLocation } from "react-router-dom";
// import * as PropTypes  from "prop-types";

// import PerfectScrollbar from "perfect-scrollbar";

// import { Nav, NavLink as ReactstrapNavLink } from "reactstrap";
// import {
//   BackgroundColorContext,
//   backgroundColors,
// } from "../../contexts/BackgroundColorContext";

// var ps :any;

// function Sidebar(props:any) {
//   const location = useLocation();
//   const sidebarRef = React.useRef<HTMLDivElement>(null);
//   const activeRoute = (routeName: string) => {
//     return location.pathname === routeName ? "active" : "";
//   };
  
//   React.useEffect(() => {
//     if (navigator.platform.indexOf("Win") > -1) {
//       ps = new PerfectScrollbar(sidebarRef.current, {
//         suppressScrollX: true,
//         suppressScrollY: false,
//       });
//     }
    
//     return function cleanup() {
//       if (navigator.platform.indexOf("Win") > -1) {
//         ps.destroy();
//       }
//     };
//   });
//   const linkOnClick = () => {
//     document.documentElement.classList.remove("nav-open");
//   };
//   const { routes, rtlActive, logo } = props;
//   let logoImg = null;
//   let logoText = null;
//   if (logo !== undefined) {
//     if (logo.outterLink !== undefined) {
//       logoImg = (
//         <a
//           href={logo.outterLink}
//           className="simple-text logo-mini"
//           target="_blank"
//           onClick={props.toggleSidebar}
//         >
//           <div className="logo-img">
//             <img src={logo.imgSrc} alt="react-logo" />
//           </div>
//         </a>
//       );
//       logoText = (
//         <a
//           href={logo.outterLink}
//           className="simple-text logo-normal"
//           target="_blank"
//           onClick={props.toggleSidebar}
//         >
//           {logo.text}
//         </a>
//       );
//     } else {
//       logoImg = (
//         <Link
//           to={logo.innerLink}
//           className="simple-text logo-mini"
//           onClick={props.toggleSidebar}
//         >
//           <div className="logo-img">
//             <img src={logo.imgSrc} alt="react-logo" />
//           </div>
//         </Link>
//       );
//       logoText = (
//         <Link
//           to={logo.innerLink}
//           className="simple-text logo-normal"
//           onClick={props.toggleSidebar}
//         >
//           {logo.text}
//         </Link>
//       );
//     }
//   }
//   return (
//     <BackgroundColorContext.Consumer>
//       {({ color }) => (
//         <div className="sidebar" data={color}>
//           <div className="sidebar-wrapper" ref={sidebarRef}>
//             {logoImg !== null || logoText !== null ? (
//               <div className="logo">
//                 {logoImg}
//                 {logoText}
//               </div>
//             ) : null}
//             <Nav>
//               {routes.map((prop, key) => {
//                 if (prop.redirect) return null;
//                 return (
//                   <li
//                     className={
//                       activeRoute(prop.path) + (prop.pro ? " active-pro" : "")
//                     }
//                     key={key}
//                   >
//                     <NavLink
//                       to={prop.layout + prop.path}
//                       className="nav-link"
//                       onClick={props.toggleSidebar}
//                     >
//                       <i className={prop.icon} />
//                       <p>{rtlActive ? prop.rtlName : prop.name}</p>
//                     </NavLink>
//                   </li>
//                 );
//               })}
//               <li className="active-pro">
//                 <ReactstrapNavLink href="https://www.creative-tim.com/product/black-dashboard-pro-react?ref=bdr-user-archive-sidebar-upgrade-pro">
//                   <i className="tim-icons icon-spaceship" />
//                   <p>Upgrade to PRO</p>
//                 </ReactstrapNavLink>
//               </li>
//             </Nav>
//           </div>
//         </div>
//       )}
//     </BackgroundColorContext.Consumer>
//   );
// }

// Sidebar.propTypes = {

//   rtlActive: PropTypes.bool,
//   routes: PropTypes.arrayOf(PropTypes.object),
//   logo: PropTypes.shape({

//     innerLink: PropTypes.string,

//     outterLink: PropTypes.string,
  
//     text: PropTypes.node,

//     imgSrc: PropTypes.string,
//   }),
// };

// export default Sidebar;
