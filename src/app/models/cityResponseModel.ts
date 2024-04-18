import { ResponseModel } from "./responseModel";
import { City } from "./city"

export interface CityResponseModel extends ResponseModel{
    data:City[]
}