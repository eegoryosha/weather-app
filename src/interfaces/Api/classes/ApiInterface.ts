import RequestType from '@/enums/RequestType';
import Json from '../../Json';
import { AxiosRequestConfig } from 'axios';
import Response from '../../Response';

interface ApiInterface {
    request<T extends Json | Json[]>(url: string, type: RequestType, config: AxiosRequestConfig, data: unknown): Promise<Response<T>>
}


export default ApiInterface;
