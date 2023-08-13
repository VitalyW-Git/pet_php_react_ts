import React from "react";
import {inject, observer} from "mobx-react";
import ListPetStore from "../stores/ListPetStore";
import {Button, Image, Collapse, Spin} from 'antd';
import {
  UserOutlined,
} from '@ant-design/icons';
import CustomForm from "./CustomForm";
import {PetType} from "../stores/types";

interface ListPetsProps {
  listPetStore?: ListPetStore
}

interface ListPetsState {
  isModalOpen: boolean;
  loaderPets: boolean;
}

@inject("listPetStore")
@observer
class ListPets extends React.Component<ListPetsProps, ListPetsState> {
  constructor(props: ListPetsProps) {
    super(props);
    this.state = {
      isModalOpen: false,
      loaderPets: false,
    };
  }

  onHiddenModal = (): void => {
    this.setState({isModalOpen: false});
  };

  onShowModal = async (pet: PetType): Promise<void> => {
    const {name, home, user_name, birthday, user_id, id} = pet
    await this.props.listPetStore?.fillFormData({name, home, user_name, birthday, user_id, id})
    this.setState({isModalOpen: true});
  };

  componentDidMount = async (): Promise<void> => {
    if (this.props.listPetStore) {
      const response: boolean = await this.props.listPetStore.fetchData();
      setTimeout(() => {
        if (response) {
          this.setState({loaderPets: true});
        }
      }, 1000)
    }
  }

  public render() {
    const {isModalOpen, loaderPets}: ListPetsState = this.state;
    const {listPetStore} = this.props;

    const listPets = loaderPets
      ? listPetStore?.pets.map(item => {
        return (
          <div className="cards" key={item.id}>
            <Collapse
              className="cards__item"
              items={[{
                key: item.id, label:
                  <div className="info">
                    <div className="info__wrapper">
                      <div className="icon">
                        <Image src="https://cdn-icons-png.flaticon.com/512/1050/1050915.png" width={37}/>
                      </div>
                      <div className="nickname">
                        <span>{item.name}</span>
                        {item.home && <span>Питомец</span>}
                      </div>
                    </div>
                  </div>,
                children:
                  <>
                    <div className="info-hidden">
                      <div className="info-hidden__birthday">
                        <div className="title">
                          <span>Дата рождения:</span>
                        </div>
                        <span className="date">{item.birthday}</span>
                      </div>
                      <div className="info-hidden__owner">
                        <div className="title">
                          <span>Хозяин:</span>
                        </div>
                        <span className="name">
                  <UserOutlined twoToneColor="#1677ff"/>
                          {item.user_name}
                </span>
                      </div>
                    </div>
                    <div className="buttons">
                      <Button type="primary">Покормить морковкой</Button>
                      <Button type="primary" onClick={() => this.onShowModal(item)}>Редактировать</Button>
                      <Button type="primary">Выключить</Button>
                    </div>
                  </>,
                showArrow: false,
              }]}
            />
          </div>
        )
      })
      : <Spin className="loading" size="large"></Spin>

    return (
      <div className='layout'>
        <span className='layout__title'>Список домашних животных</span>
        {listPets}
        <CustomForm onHiddenModal={this.onHiddenModal}
                    isModalOpen={isModalOpen}
        />
      </div>
    )
  }
}

export default ListPets