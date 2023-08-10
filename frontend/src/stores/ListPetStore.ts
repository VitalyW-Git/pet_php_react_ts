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
      // axios({
      //   method: 'options',
      //   url: `${API_URL}/main`,
      //   headers: {
      //     'Access-Control-Request-Method': 'OPTIONS'
      //   }
      // })
      //   .then(response => {
      //     // Обработка ответа
      //   })
      //   .catch(error => {
      //     // Обработка ошибки
      //   });
      const response = await axios.post(`${API_URL}`,
        {
          int: 5,
          string: 'string'
        },
      );
      console.log(response)
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    }
  }

  addTodo = (todo: string): void => {
    console.log(todo)
  };

}


export default ListPetStore