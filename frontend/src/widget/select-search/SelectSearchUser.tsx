import React from "react";
import axios from 'axios';
import {AutoComplete, Input} from "antd";
import {API_URL} from "../../stores/consts";
import ListPetStore from "../../stores/ListPetStore";
import {inject, observer} from "mobx-react";

interface CustomFormState {
  listPetStore?: ListPetStore
  onSelect: (option?: {value: string, label: string}) => void;
  isModalOpen: boolean;
  value: string;
}

interface SelectSearchUserState {
  loader: boolean;
  search: string;
  options: {label: string, value: string}[];
}

@inject("listPetStore")
@observer
class SelectSearchUser extends React.Component<CustomFormState, SelectSearchUserState> {
  constructor(props: CustomFormState) {
    super(props);
    this.state = {
      loader: false,
      search: this.props.value || '',
      options: [],
    };
  }

  handleSearch = (value: string) => {
    this.setState({
      search: value,
      loader: true,
    });
  };

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.search !== this.state.search) {
      this.fetchData();
    }
  };
  onSelect = (_: string, option: { value: string, label: string }) => {
    this.setState({search: option.label});
    this.props.onSelect(option)
  };

  fetchData() {
    const {search} = this.state;
    if (search.length > 2) {
      const url = `${API_URL}/search-user?search=${search}`;
      axios.get(url)
        .then((res) => {
          if (res.data.status == 200) {
            const users = res.data.users.map((item: {id: number, name: string}) => ({
                label: item.name,
                value: item.id.toString(),
              }))
            this.setState({options: users});
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    this.setState({
      loader: false,
    });
  }

  public render() {
    const {loader, options, search}: SelectSearchUserState = this.state;
    return (
      <AutoComplete
        value={search}
        options={options}
        onSelect={this.onSelect}
        onSearch={this.handleSearch}
        style={{width: '100%'}}
      >
        <Input.Search
          loading={loader}
          placeholder="Заполните поле"
          enterButton
        />
      </AutoComplete>
    )
  }
}

export default SelectSearchUser