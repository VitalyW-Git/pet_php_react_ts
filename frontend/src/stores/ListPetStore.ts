import { makeAutoObservable } from 'mobx';
import axios from "axios";
import {PetType, UserType, ResponseData} from "./types";
import {API_URL} from './consts'

class ListPetStore {
  pets: PetType[] = [];
  users: UserType[]= [];
  error: string = '';

  constructor() {
    makeAutoObservable(this);
  }

   fetchData = async (): Promise<boolean> => {
    try {
      const response: { data: ResponseData } = await axios.get(`${API_URL}/get-all-pets`);
      if (response.data.status === 200 && response.data?.pets) {
        this.pets = response.data.pets
        return true
      }
      if (response.data.status === 400 && response.data?.error) {
        this.error = response.data.error
      }
      return false
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      return false
    }
  }

  addTodo = (todo: string): void => {
    console.log(todo)
  };

}


export default ListPetStore