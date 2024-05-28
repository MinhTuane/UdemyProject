import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/dashboard/Activity/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";
import MaterialForm from "../../features/activities/form/MaterialForm";
import ProductForm from "../../features/productLines/form/ProductForm";
import ProductLineDashBoard from "../../features/productLines/Dashboard/ProductLine/ProductLineDashBoard";

export const routes: RouteObject[] = [
    {
        path :'/',
        element: <App/>,
        children:[
            {path:'activities',element:<ActivityDashboard/>},
            {path:'productLine',element:<ProductLineDashBoard/>},
            {path:'activities/:id',element:<ActivityDetails/>},
            {path:'createActivity',element:<ActivityForm key='create'/>},
            {path:'manage/:id',element:<ActivityForm key='edit'/>},
            {path:'createMaterial',element:<MaterialForm key='create'/>},
            {path:'createProduct',element:<ProductForm key='create'/>},
            {path:'login',element:<LoginForm/>},
            {path:'errors',element:<TestErrors/>},
            {path:'not-found',element:<NotFound/>},
            {path:'server-error',element:<ServerError/>},
            {path:'*',element:<Navigate replace to='not-found'/>},
        ]
    }
]

export const router = createBrowserRouter(routes)