import React from 'react';
import "./style/style.scss"
import {Provider} from 'mobx-react';
import ListPetStore from "./stores/ListPetStore";
import ListPets from "./components/ListPets";

const listPetStore = new ListPetStore();

class App extends React.Component {
  public render() {
    return (
      <Provider listPetStore={listPetStore}>
        <ListPets/>
      </Provider>
    );
  };
}

export default App;