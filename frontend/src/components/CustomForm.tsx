import React from "react";
import {inject, observer} from "mobx-react";
import {Modal, Button, Form, Input, Space, Checkbox, DatePicker, message} from 'antd';
import ListPetStore from "../stores/ListPetStore";
import moment from 'moment';
import SelectSearchUser from "../widget/select-search/SelectSearchUser";
import {CheckboxChangeEvent} from 'antd/lib/checkbox';

interface ListPetsState {
  onHiddenModal: () => void;
  isModalOpen: boolean;
  listPetStore?: ListPetStore
}

const dateFormat = 'YYYY-MM-DD';

@inject("listPetStore")
@observer
class CustomForm extends React.Component<ListPetsState> {
  constructor(props: ListPetsState) {
    super(props);
  }

  onSaveForm = async () => {
    if (this.props.listPetStore?.form.name.length && this.props.listPetStore?.form.birthday.length) {
      const successs: any = await this.props.listPetStore?.saveFormUpdatePet()
      if (successs) {
        this.props.onHiddenModal()
        message.success('Данные успешно сохранены!');
        return
      }
      message.error('Данные не сохранены!');
    }
  };

  /** set|clear */
  onSelectedDate = (_: any, dateString: string) => {
    this.props.listPetStore?.setDate(dateString)
  };
  onSetNikeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.listPetStore?.setNikeName(e.target.value)
  };
  onSetIsHome = (e: CheckboxChangeEvent) => {
    this.props.listPetStore?.setIsHome(e.target.checked)
  };
  onSelectUser = (option: { value: string, label: string }) => {
    console.log(option)
    this.props.listPetStore?.setUserName(option)
  }

  public render() {
    const {listPetStore} = this.props;
    return (
      <Modal title="Редактирование питомца"
             className="modal-form"
             open={this.props.isModalOpen}
             footer={[]}
      >
        <Form
          className="form"
          layout="vertical"
          name="basic"
          autoComplete="off"
          initialValues={{
            name: listPetStore?.form.name,
            birthday: moment(listPetStore?.form.birthday),
            user_name: listPetStore?.form.user_name,
          }}
        >
          <Form.Item
            className="form__nikeName"
            name="name"
            label="Кличка"
            rules={[{required: true, message: 'Имя питомца обязательно для заполнения!'}, {type: 'string'}]}
          >
            <Input placeholder="Кличка питомца"
                   onChange={this.onSetNikeName}/>
          </Form.Item>

          <Checkbox name="home"
                    className="form__home"
                    checked={Boolean(listPetStore?.form.home)}
                    onChange={(e) => this.onSetIsHome(e)}
          >
            Домашнее животное
          </Checkbox>

          <Form.Item className="form__date"
                     name="birthday"
                     label="Дата рождения"
                     rules={[{required: true, message: 'Дата рождения питомца'}]}>
            <DatePicker
              style={{width: '100%'}}
              format={dateFormat}
              onChange={this.onSelectedDate}
            />
          </Form.Item>

          <Form.Item className="form__owner"
                     name="user_name"
                     label="Хозяин"
                     rules={[{required: true, message: 'Имя хозяина обязательно для заполнения!'}]}
          >
            <SelectSearchUser
              onSelect={(option) => this.onSelectUser(option as { value: string, label: string })}
              value={listPetStore?.form.user_name as string}
              isModalOpen={true}
            />
          </Form.Item>
          <div style={{textAlign: 'right'}}>
            <Form.Item shouldUpdate>
              {() => (
                <Space>
                  <Button type="primary"
                          htmlType="submit"
                          onClick={() => this.onSaveForm()}
                  >
                    Сохранить
                  </Button>
                  <Button htmlType="button" onClick={() => this.props.onHiddenModal()}>
                    Отмена
                  </Button>
                </Space>
              )}
            </Form.Item>
          </div>
        </Form>
      </Modal>
    )
  }
}

export default CustomForm