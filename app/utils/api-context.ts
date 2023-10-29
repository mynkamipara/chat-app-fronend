import { createContext } from 'react'
import { ApiClient } from '../api/api-client'
export interface IApiContext {
    client: ApiClient | undefined
}
export const ApiContext = createContext<IApiContext>({
    client: undefined
})