import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    CategoryContext,
    CategoryContextProvider
} from "./contexts/CategoryContextProvider";
import ToDoTable from "./components/CategoryTable";
import CategoryTable from "./components/CategoryTable";

class App extends Component {

    render() {

        return (
            <CategoryContextProvider>
                <CategoryTable></CategoryTable>
            </CategoryContextProvider>
        )
    }
}

ReactDOM.render(< App/>, document.getElementById('root'));


