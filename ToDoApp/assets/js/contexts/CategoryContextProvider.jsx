import React, {Component, createContext} from 'react';


export const CategoryContext = createContext();

export class CategoryContextProvider extends Component {

    constructor() {
        super();
        this.state = {
            todos: [
                {name: 'do something'},
                {name: 'do something 1'}
            ]
        }
    }

    //fetch
    createTodo(event,todo) {
        event.preventDefault();
        let data = [...this.state.todos];
        data.push(todo);
        this.setState({
            todos: data
        })
    }

    //read
    readToDo() {

    }

    //update
    updateToDo() {

    }

    //delete
    deleteTodo() {

    }

    render() {
        return (
            <CategoryContext.Provider value={{
                ...this.state,
                createTodo: this.createTodo.bind(this)
            }}>
                {this.props.children}
            </CategoryContext.Provider>
        )
            ;
    }
}

