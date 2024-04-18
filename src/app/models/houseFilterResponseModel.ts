import { HouseFilter } from "./houseFilter";
import { ResponseModel } from "./responseModel";

export interface HouseFilterResponseModel extends ResponseModel{
    isSuccess: any;
    data: HouseFilter
}