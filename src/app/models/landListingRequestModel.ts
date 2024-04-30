import { LandFilter } from "./landFilter";
import { SortingObject } from "./sortingObject";


export interface LandListingRequestModel {
    filter: LandFilter | null;
    sorting: SortingObject | null;
    pageNumber: number;
    pageSize: number;
}
