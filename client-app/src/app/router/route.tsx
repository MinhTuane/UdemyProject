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

export const routes: RouteObject[] = [
    {
        path :'/',
        element: <App/>,
        children:[
            {path:'activities',element:<ActivityDashboard/>},
            {path:'activities/:id',element:<ActivityDetails/>},
            {path:'productLineDashBoard',element:<DashBoard/>},
            {path:'createActivity',element:<ActivityForm key='create'/>},
            {path:'manage/:id',element:<ActivityForm key='edit'/>},
            {path:'createMaterial',element:<MaterialForm key='create'/>},
            {path:'createProduct',element:<ProductForm key='create'/>},
            {path:'createPurchaseOrder',element:<PurchaseOrderForm key='create'/>},
            {path:'login',element:<LoginForm/>},
            {path:'errors',element:<TestErrors/>},
            {path:'not-found',element:<NotFound/>},
            {path:'server-error',element:<ServerError/>},
            {path:'*',element:<Navigate replace to='not-found'/>},
        ]
    }
]

export const router = createBrowserRouter(routes)