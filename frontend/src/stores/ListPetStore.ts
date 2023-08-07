import { makeAutoObservable } from 'mobx';
import axios from "axios";
import {PetType, UserType} from "./types";
import {API_URL} from './consts'

class ListPetStore {
  pets: PetType[] = [];
  users: UserType[] = [];

  constructor() {
    makeAutoObservable(this);
  }

   fetchData = async () => {
    try {
      const response = await axios.post(`${API_URL}/main`);
      console.log(response)
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    }
  }

  addTodo = (todo: string): void => {

  };

}


export default ListPetStore