import { operationClaims } from "./operationClaims";

export interface UserFull {
    id: number;    
    firstName: string;
    lastName: string;
    email: string;
    imagePath: string;
    status : boolean;
    operationClaims: operationClaims[];
    registerDate:Date;
}