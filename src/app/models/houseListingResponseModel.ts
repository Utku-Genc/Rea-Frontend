import { HouseListing } from "./houseListing";
import { ResponseModel } from "./responseModel";

export interface HouseListingResponseModel extends ResponseModel{
    data:HouseListing[]
}