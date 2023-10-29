'use client';
import { PropsWithChildren } from "react";
import { ApiClient } from "../api/api-client";
import { ApiContext } from '../utils/api-context';

export interface ApiProviderProps {
    client:ApiClient
}
export function ApiProvider({
    client,
    children
}: PropsWithChildren<ApiProviderProps>){
return (
    <ApiContext.Provider value={{client}}>{children}</ApiContext.Provider>
)
}