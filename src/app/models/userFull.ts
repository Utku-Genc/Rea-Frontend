export interface UserFull {
    searchText: string;      
    firstName: string;
    lastName: string;
    email: string;
    userId: number;
    status : boolean;
    roleIds: number[];
    minRegisterDate: number; 
    maxRegisterDate: number;
}