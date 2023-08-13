import {makeAutoObservable} from 'mobx';
import axios from "axios";
import {PetType, UserType, ResponseData} from "./types";
import {API_URL} from './consts'

class ListPetStore {
  pets: PetType[] = [];
  users: UserType[] = [];
  form: Omit<PetType, "oid" | "otype"> = {
    birthday: "",
    home: false,
    name: "",
    user_name: "",
    user_id: 0,
    id: 0,
  };
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

  saveFormUpdatePet = async (): Promise<boolean> => {
    let formData = new FormData()
    formData.set('name', this.form.name)
    formData.set('birthday', this.form.birthday)
    formData.set('user_id', this.form.user_id.toString())
    formData.set('home', Number(this.form.home).toString())
    formData.set('id', this.form.id.toString())
    const response = await axios.post(`${API_URL}/update-pet`, formData)
    if (response.data.success) {
      this.pets.forEach(item => {
        if (item.id == this.form.id) {
          item.name = this.form.name
          item.birthday = this.form.birthday
          item.home = this.form.home
          item.user_name = this.form.user_name
          item.user_id = +this.form.user_id
        }
      })
      return response.data.success
    }
    return response.data.success
  }

  fillFormData = async (pet: Omit<PetType, "oid" | "otype">): Promise<void> => {
    this.form = pet
  }

  setDate = (date: string) => {
    this.form.birthday = date
  }
  setIsHome = (isHome: boolean) => {
    this.form.home = isHome
  }
  setNikeName = (nikeName: string) => {
    this.form.name = nikeName
  }
  setUserName = (user: {value: string, label: string}) => {
    this.form.user_name = user.label
    this.form.user_id = +user.value
    console.log(this.form)
  }

  addTodo = (todo: string): void => {
    console.log(todo)
  };

}


export default ListPetStore