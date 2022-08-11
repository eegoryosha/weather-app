import RequestType from '@/enums/RequestType';
import type Json from '@/interfaces/Json';
import type Response from '@/interfaces/Response';
import { DefaultApiInstance } from './Instances/DefaultApiInstance';
import type { AxiosRequestConfig } from 'axios';
import type ApiInterface from '@/interfaces/Api/classes/ApiInterface';

export default class BaseApi implements ApiInterface {
    request<T extends Json | Json[]>(url: string, type: RequestType = RequestType.GET, config: AxiosRequestConfig = {}, data: unknown = undefined): Promise<Response<T>> {
        const startTime = new Date().getTime();

        return new Promise(resolve => {
            DefaultApiInstance({
                method: type,
                url: url,
                data: data,
                ...config
            }).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    resolve({
                        success: true,
                        data: response.data,
                        time: (new Date().getTime() - startTime) / 1000
                    });
                } else {
                    const error = new Error(response?.statusText ?? 'Неизвестная ошибка', );
                    throw Object.assign(error , { response });
                }
            }).catch((error) => {
                resolve({
                    success: false,
                    error: {
                        message: error.response?.data?.error?.message || error.message || 'Неизвестная ошибка',
                        status: error.response?.status ?? 520,
                    },
                    time: (new Date().getTime() - startTime) / 1000
                });
            });
        });
    }
}
