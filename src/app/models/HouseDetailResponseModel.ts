import { HouseDetail } from "./houseDetail";
import { ResponseModel } from "./responseModel";

export interface HouseDetailResponseModel extends ResponseModel{
    data:HouseDetail
}