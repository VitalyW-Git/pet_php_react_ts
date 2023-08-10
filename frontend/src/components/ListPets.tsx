import React from "react";
import {inject, observer} from "mobx-react";
import ListPetStore from "../stores/ListPetStore";
import {Button, Image} from 'antd';
import {
  UserOutlined,
} from '@ant-design/icons';
import CustomForm from "./CustomForm";

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
    this.setState({ isModalOpen: false });
  };

  onShowModal = (): void => {
    this.setState({isModalOpen: true});
  };

  async componentDidMount() {
      if (this.props.listPetStore) {
        const response: boolean = await this.props.listPetStore.fetchData();
        if (response) {
          this.setState({ loaderPets: true });
        }
      }
  }

  public render() {
    const {isModalOpen, loaderPets}: ListPetsState = this.state;
    const { listPetStore} = this.props;

    const listPets = listPetStore?.pets.map(item => {
      return (
        <div className="cards" key={item.id}>
          <div className="cards__item">
            <div className="info">
              <div className="info__wrapper">
                <div className="icon">
                  <Image src="https://cdn-icons-png.flaticon.com/512/1050/1050915.png" width={37}/>
                </div>
                <div className="nickname">
                  <span>{item.name}</span>
                  <span>Питомец</span>
                </div>
              </div>
              <div className="info__birthday">
                <div className="title">
                  <span>Дата рождения:</span>
                </div>
                <span className="date">{item.birthday}</span>
              </div>
              <div className="info__owner">
                <div className="title">
                  <span>Хозяин:</span>
                </div>
                <span className="name">
                  <UserOutlined twoToneColor="#1677ff"/>
                  Джеки Чан
                </span>
              </div>
            </div>
            <div className="buttons">
              <Button type="primary">Покормить морковкой</Button>
              <Button type="primary" onClick={this.onShowModal}>Редактировать</Button>
              <Button type="primary">Выключить</Button>
            </div>
          </div>
        </div>
      )
    })

    return (
      <div className='layout'>
        {listPets}
        <CustomForm onHiddenModal={this.onHiddenModal}
                    isModalOpen={isModalOpen}
        />
      </div>
    )
  }
}

export default ListPets