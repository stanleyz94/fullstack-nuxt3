import { IUser } from '@/types/IUser'
export interface SubPostRes {
    url: string;
    user: IUser;
    shouldUpdateUser: boolean;
}