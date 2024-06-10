import axios, { AxiosError, AxiosResponse } from "axios";
import { Activity } from "../models/activity";
import { toast } from "react-toastify";
import { router } from "../router/route";
import { store } from "../stores/store";
import { User, UserFormValues } from "../models/user";
import { Material } from "../models/material";
import { ProductLine } from "../models/productLine";
import { Product } from "../models/product";
import { PurchaseOrder } from "../models/purchaseOrder";
import { Company } from "../models/company";
import { ProductionRecord } from "../models/productionRecord";


const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

// axios.interceptors.request.use(
//     config => {
//       config.headers['Content-Type'] = "application/json";
//           return config;
//       },
//       error => {
//           return Promise.reject(error);
//       }
//   );
axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    
        await sleep(1000);
        return response; 
},(error: AxiosError) => {
    const { data,status,config} = error.response! as AxiosResponse;
    switch (status) {
        case 400:
            if((config.method === 'get' || config.method === 'post') && data.errors.hasOwnProperty('id')) {
                router.navigate('/not-found');
            }
            if(data.errors) {
                const modalStateErrors =[];
                for(const key in data.errors) {
                    if(data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorised')
            break;
        case 403:
            toast.error('forbidden')
            break;
        case 404:
            router.navigate('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error')
            break;
    }
    return Promise.reject(error)
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body:{}) => axios.post<T>(url, body,{headers:{"content-type":"application/json"}}).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Activities = {
    list: () => request.get<Activity[]>('/activities'),
    details: (id: string) => request.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => axios.post<void>('/activities', activity),
    update: (activity: Activity) => axios.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => axios.delete<void>(`/activities/${id}`)
}

const Account = {
    current : () => request.get<User>('/account'),
    login: (user: UserFormValues) => request.post<User>('/account/login',user),
    register: (user: UserFormValues) => request.post<User>('/account/register',user),
}

const Materials = {
    list: () => request.get<Material[]>('/material'),
    details:(id:string) => request.get<Material>(`/material/${id}`),
    create: (material:Material) => axios.post<void>('/material',material),
    update: (material:Material) => axios.put<void>(`/material/${material.id}`,material),
    delete: (id:string) => axios.delete<void>(`/material/${id}`)
}

const ProductLines = {
    list: () => request.get<ProductLine[]>('/productlines'),
    details:(id:string) => request.get<ProductLine>(`/productlines/${id}`),
    create: (productLine:ProductLine) => axios.post<void>('/productlines',productLine),
    update: (productLine:ProductLine) => axios.put<void>(`/productlines/${productLine.id}`,productLine),
    delete: (id:string) => axios.delete<void>(`/productlines/${id}`)
}

const Products = {
    list: () => request.get<Product[]>('/products'),
    details: (id: string) => request.get<Product>(`/products/${id}`),
    create: (product: Product) => axios.post<void>('/products', product),
    update: (product: Product) => axios.put<void>(`/products/${product.id}`, product),
    delete: (id: string) => axios.delete<void>(`/products/${id}`),
    productionByDay: (id: string) => request.get<ProductionRecord[]>(`/products/${id}/production/byday`),
    productionByMonth: (id: string) => request.get<ProductionRecord[]>(`/products/${id}/production/bymonth`),
    productionByYear: (id: string) => request.get<ProductionRecord[]>(`/products/${id}/production/byyear`)
};


const PurchaseOrders = {
    list: () => request.get<PurchaseOrder[]>('/purchaseOrders'),
    details:(id:string) => request.get<PurchaseOrder>(`/purchaseOrders/${id}`),
    create: (purchaseOrder:PurchaseOrder) => axios.post<void>('/purchaseOrders',purchaseOrder),
    update: (purchaseOrder:PurchaseOrder) => axios.put<void>(`/purchaseOrders/${purchaseOrder.id}`,purchaseOrder),
    delete: (id:string) => axios.delete<void>(`/purchaseOrders/${id}`)
}

const Companies = {
    list: () => request.get<Company[]>('/companies'),
    details:(id:string) => request.get<Company>(`/companies/${id}`),
    create: (company:Company) => axios.post<void>('/companies',company),
    update: (company:Company) => axios.put<void>(`/companies/${company.id}`,company),
    delete: (id:string) => axios.delete<void>(`/companies/${id}`)
}

const CountryNames = {
    list : ()=> request.get<String[]>('/country'),
}

const agent = {
    Activities,
    Account,
    Materials,
    ProductLines,
    Products,
    PurchaseOrders,
    CountryNames,
    Companies
}

export default agent;