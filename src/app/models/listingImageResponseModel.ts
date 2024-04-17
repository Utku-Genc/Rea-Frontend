import { ListingImage } from "./listingImage";
import { ResponseModel } from "./responseModel";

export interface ListingImageResponseModel extends ResponseModel{
    data:ListingImage[]
}