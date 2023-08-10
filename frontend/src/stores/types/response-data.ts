import {PetType} from "./pet-type";

export type ResponseData = {
  status: number;
  pets?: PetType[];
  error?: string;
}