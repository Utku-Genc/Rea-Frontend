import { HouseFilter } from "./houseFilter";
import { SortingObject } from "./sortingObject";


export interface HouseListingRequestModel {
    filter: HouseFilter | null;
    sorting: SortingObject | null;
    pageNumber: number;
    pageSize: number;
}
