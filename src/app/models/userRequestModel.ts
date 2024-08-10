import { SortingObject } from "./sortingObject";
import { UserFilter } from "./userFilter";

export interface UserRequestModel {
    filter: UserFilter | null,
    sorting: SortingObject | null,
    pageNumber: number ,
    pageSize: number ,
}