'use client';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ApiClient } from './api/api-client';
import { ApiProvider } from './component/api-provider';
import { ToastContainer } from 'react-toastify';
import Header from './component/Header';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const queryClient = new QueryClient();

const baseUrl:string = process.env.NEXT_PUBLIC_API_URL || '';

const apiClient = new ApiClient({
    baseUrl
})


export function Providers({children}:Props){
    return (
        <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <ApiProvider client={apiClient}>
            <Header/>
            {children}
        </ApiProvider>
      </QueryClientProvider>
    )
}