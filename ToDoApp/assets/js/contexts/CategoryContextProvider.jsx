import React, {Component, createContext} from 'react';
import axios from 'axios';

export const CategoryContext = createContext();

export class CategoryContextProvider extends Component {

    constructor() {
        super();
        this.state = {
            todos: [],
            messagge: {}
        }
        this.readToDo();
    }

    //fetch
    createTodo(event, todo) {
        event.preventDefault();
        axios.post('api/categories/create', todo)
            .then(res => {
                let data = [...this.state.todos];
                if(res.data.message.level==='success'){
                    data.push(res.data.todo);
                    this.setState({
                        todos: data,
                        messagge:res.data.message
                    });
                }else {
                    this.setState({
                        messagge:res.data.message
                    });
                }


            })
            .catch(err => {
                console.log(err.message);
            });
    }

    //read
    readToDo() {
        axios.get('api/categories/read')
            .then(res => {
                this.setState({
                    todos: res.data
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    //update
    updateToDo(data) {
        console.log(data);
        axios.put('api/categories/update/' + data.id, data)
            .then((res) => {
                let todos = [...this.state.todos];
                let todo = todos.find(todo => {
                    return todo.id === data.id;
                })
                todo.name = data.name;
                this.setState({
                    todos: todos
                })
            })
            .catch((err) => {
                console.log(err.message);
            })

    }

    //delete
    deleteTodo(data) {
        axios.delete('api/categories/delete/' + data.id, data)
            .then((res) => {
                let todos = [...this.state.todos];
                let todo = todos.find(todo => {
                    return todo.id === data.id;
                });
                todos.splice(todos.indexOf(todo), 1);
                this.setState({
                    todos: todos
                });
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

    }

    render() {
        return (
            <CategoryContext.Provider value={{
                ...this.state,
                createTodo: this.createTodo.bind(this),
                updateTodo: this.updateToDo.bind(this),
                deleteTodo: this.deleteTodo.bind(this),
                setMessagge: (messagge) => {
                    this.setState({messagge: messagge})
                }
            }}>
                {this.props.children}
            </CategoryContext.Provider>
        )
            ;
    }
}

