import axios, { AxiosHeaders, AxiosInstance } from 'axios';
import { ILoginParams, ISignupParams } from '../Interfaces/user.interface';

export interface ApiClientOption {
    baseUrl: string;
}

const getToken = () => {
    let token;
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token');
    }
    return token;
}

export class ApiClient {
    constructor(option: ApiClientOption) {
        this.baseUrl = option.baseUrl;
        this.http = axios.create({
            baseURL: this.baseUrl,
            headers: {
                token: getToken()
            }
        })
        // Request interceptor
        this.http.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("token");
                if (token) {
                    if (config.headers) config.headers['authorization'] = token;
                } else {
                    delete config.headers['authorization'];
                }
                return config;
            },
        );
        this.http.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            if(error.response.status == 401){
                localStorage.removeItem('token');
                localStorage.removeItem('userInfo');
            }
        });
        // End of Request interceptor
    }

    private baseUrl: string;
    private http: AxiosInstance;

    async userLogin(data: ILoginParams) {
        const res = await this.http.post('/user/login', data);
        return res.data;
    }

    async userSignup(data: ISignupParams) {
        const res = await this.http.post('/user/signup', data);
        return res.data;
    }

    async userConnection(search:string) {
        const res = await this.http.get(`/user/connection?search=${search}`);
        return res.data.result;
    }

    async userConversation(receiverId:string) {
        const res = await this.http.get(`/conversation?receiverId=${receiverId}`);
        return res.data.result;
    }
}