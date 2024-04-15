import { Listing } from "./listing";
import { ResponseModel } from "./responseModel";

export interface ListingResponseModel extends ResponseModel{
    data:Listing[]
}