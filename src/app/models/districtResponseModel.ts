import { ResponseModel } from "./responseModel";
import { District } from "./district";

export interface DistrictResponseModel extends ResponseModel{
    data:District[]
}