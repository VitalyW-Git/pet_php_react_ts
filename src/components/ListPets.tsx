import React from "react";
import {inject, observer} from "mobx-react";
import ListPetStore from "../stores/ListPetStore";

interface TodoListProps {
  listPetStore?: ListPetStore
}

@inject("listPetStore")
@observer
class ListPets extends React.Component<TodoListProps> {
  public render() {
    // const { listPetStore } = this.props;
    // useEffect(() => {
    //   if (listPetStore) {
    //     const response: any = listPetStore.fetchData();
    //     console.log(response)
    //   }
    // }, []);
    return (
      <>
        "ListPets"
      </>
    )
  }
}

export default ListPets