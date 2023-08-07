import React from "react";
import {inject, observer} from "mobx-react";
import ListPetStore from "../stores/ListPetStore";
import {Button, Image, Modal} from 'antd';
import {
  UserOutlined,
} from '@ant-design/icons';

interface ListPetsProps {
  listPetStore?: ListPetStore
}

interface ListPetsState {
  isModalOpen: boolean;
}

@inject("listPetStore")
@observer
class ListPets extends React.Component<ListPetsProps, ListPetsState> {
  constructor(props: ListPetsProps) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  showModal = (): void => {
    this.setState({isModalOpen: true});
  };

  handleOk = (): void => {
    this.setState({isModalOpen: false});
  };

  handleCancel = (): void => {
    this.setState({isModalOpen: false});
  };

  public render() {
    const {isModalOpen}: any = this.state;
    // const { listPetStore } = this.props;
    // useEffect(() => {
    //   if (listPetStore) {
    //     const response: any = listPetStore.fetchData();
    //     console.log(response)
    //   }
    // }, []);
    return (
      <div className='layout'>
        <div className="cards">
          <div className="cards__item">
            <div className="info">
              <div className="info__wrapper">
                <div className="icon">
                  <Image src="https://cdn-icons-png.flaticon.com/512/1050/1050915.png" width={37}/>
                </div>
                <div className="nickname">
                  <span>Гаврюша</span>
                  <span>Питомец</span>
                </div>
              </div>
              <div className="info__birthday">
                <div className="title">
                  <span>Дата рождения:</span>
                </div>
                <span className="date">12.03.2007</span>
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
              <Button type="primary" onClick={this.showModal}>Редактировать</Button>
              <Button type="primary">Выключить</Button>
            </div>
          </div>
        </div>
        <Modal title="Basic Modal"
               open={isModalOpen}
               onOk={this.handleOk}
               onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    )
  }
}

export default ListPets