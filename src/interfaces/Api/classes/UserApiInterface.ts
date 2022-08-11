import Response from '@/interfaces/Response';
import UserLocationResponse from '../UserLocationResponse';
import ApiInterface from './ApiInterface';

interface UserApiInterface extends ApiInterface {
    getUserLocation(): Promise<Response<UserLocationResponse>>
}

export default UserApiInterface;
