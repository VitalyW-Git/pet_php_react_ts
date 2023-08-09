import React from "react";
import {inject, observer} from "mobx-react";
import {Modal, Button, Form, Input, Space, Checkbox, DatePicker, Select, Spin} from 'antd';
import type { SelectProps } from 'antd';
import ListPetStore from "../stores/ListPetStore";

interface ListPetsState {
  onHiddenModal: () => void;
  isModalOpen: boolean;
  listPetStore?: ListPetStore
}

interface CustomFormState {
  loading: boolean;
  options: SelectProps['options'];
}

@inject("listPetStore")
@observer
class CustomForm extends React.Component<ListPetsState, CustomFormState> {
  constructor(props: ListPetsState) {
    super(props);
    this.state = {
      loading: false,
      options: [
        {label: 'Вася', value: '1'},
        {label: 'Петя', value: '2'},
        {label: 'Гриша', value: '3'}
      ],
    };
  }
  onHandleChange = (value: string, option: any) => {};
  onSaveForm = () => {
    this.props.listPetStore?.fetchData()
  };
  public render() {
    const {loading, options}: CustomFormState = this.state;
    return (
      <>
      <Modal title="Редактирование питомца"
             open={this.props.isModalOpen}
             footer={[]}
      >
        <Form
          className="form"
          layout="vertical"
          name="basic"
          autoComplete="off"
        >
          <Form.Item
            className="form__nikeName"
            name="nikeName"
            label="Кличка"
            rules={[{required: true}, {type: "string", min: 3, max: 20},]}
          >
            <Input placeholder="name pet"/>
          </Form.Item>
          <Checkbox className="form__home">Домашнее животное</Checkbox>
          <Form.Item className="form__date"
                     name="date-picker"
                     label="Дата рождения"
                     rules={[{type: 'object' as const, required: true, message: 'birthday pet'}]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item className="form__owner"
                     name="owner"
                     label="Хозяин"
                     rules={[{required: true, message: 'Выберите хозяина!'}]}
          >
            <Select placeholder="Хозяин"
                    mode="multiple"
                    labelInValue
                    filterOption={false}
                    notFoundContent={loading ? <Spin size="small"/> : null}
                    onChange={this.onHandleChange}
                    options={options}>
            </Select>
          </Form.Item>
          <div style={{ textAlign: 'right' }}>
          <Form.Item>
            <Space>
              <Button type="primary"
                      htmlType="submit"
                      onClick={() => this.onSaveForm}
              >
                Сохранить
              </Button>
              <Button htmlType="button" onClick={() => this.props.isModalOpen}>
                Отмена
              </Button>
            </Space>
          </Form.Item>
          </div>
        </Form>
      </Modal>
      <Button type="primary"
              htmlType="submit"
              onClick={() => this.onSaveForm()}
      >
        fetchData
      </Button>
      </>
    )
  }
}

export default CustomForm