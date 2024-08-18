import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../../features/layout/activities/dashboard/Activity/ActivityDashboard";
import ActivityForm from "../../features/layout/activities/form/ActivityForm";
import ActivityDetails from "../../features/layout/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/layout/users/LoginForm";
import MaterialForm from "../../features/layout/activities/form/MaterialForm";
import ProductForm from "../../features/layout/productLines/form/ProductForm";
import DashBoard from "../../features/layout/productLines/Dashboard/ProductLine/DashBoard";
import PurchaseOrderForm from "../../features/layout/PurchaseOrder/Form/PurchaseOrderForm";
import AddProduct from "../../features/layout/ProductionForm/AddProduct";
import CompanyForm from "../../features/layout/Companies/form/CompanyForm";
import Profile from "../../features/layout/users/Profile";
import AttendenceCheckForm from "../../features/layout/Admin/AttendenceCheckForm";
import Attendence from "../../features/layout/users/Attendence";
import ManageUsers from "../../features/layout/Admin/ManageUsers";
import Register from "../../features/layout/Admin/Register";

export const routes: RouteObject[] = [
    {
        path :'/',
        element: <App/>,
        children:[
            {path:'activities',element:<ActivityDashboard/>},
            {path:'attendenceCheckForm',element:<AttendenceCheckForm/>},
            {path:'editUser/:id',element:<Register/>},
            {path:'manageUsers',element:<ManageUsers/>},
            {path:'attendence',element:<Attendence/>},
            {path:'activities/:id',element:<ActivityDetails/>},
            {path:'productLineDashBoard',element:<DashBoard/>},
            {path:'createActivity',element:<ActivityForm key='create'/>},
            {path:'addProduct',element:<AddProduct/>},
            {path:'createCompany',element:<CompanyForm/>},
            {path:'manage/:id',element:<ActivityForm key='edit'/>},
            {path:'createMaterial',element:<MaterialForm key='create'/>},
            {path:'createProduct',element:<ProductForm key='create'/>},
            {path:'createPurchaseOrder',element:<PurchaseOrderForm key='create'/>},
            {path:'login',element:<LoginForm/>},
            {path:'profile/:username',element:<Profile/>},
            {path:'errors',element:<TestErrors/>},
            {path:'not-found',element:<NotFound/>},
            {path:'server-error',element:<ServerError/>},
            {path:'*',element:<Navigate replace to='not-found'/>},
        ]
    }
]

export const router = createBrowserRouter(routes)