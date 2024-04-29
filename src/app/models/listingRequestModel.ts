import { ListingFilter } from "./listingFilter"
import { SortingObject } from "./sortingObject";

export interface ListingRequestModel {
    filter: ListingFilter | null,
    sorting: SortingObject | null,
    pageNumber: number | null,
    pageSize: number  | null,
}