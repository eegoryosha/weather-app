import BaseApi from './BaseApi';
import type UserLocationResponse from '@/interfaces/Api/UserLocationResponse';
import type UserApiInterface from '@/interfaces/Api/classes/UserApiInterface';
import type Response from '@/interfaces/Response';

export default class UserApi extends BaseApi implements UserApiInterface {
    async getUserLocation(): Promise<Response<UserLocationResponse>>  {
        return this.request<UserLocationResponse>('https://ipapi.co/json/');
    }
}
