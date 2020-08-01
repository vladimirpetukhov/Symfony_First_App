import React, {Component, Fragment, useContext, useState} from 'react';
import {CategoryContext, ToDoContext} from "../contexts/CategoryContextProvider";
import {Table, TableBody, TableRow, TableHead, TableCell} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from "@material-ui/core/TextField";
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import red from "@material-ui/core/colors/red";
import DeleteOrder from "./DeleteOrder";


function CategoryTable() {
    const context = useContext(CategoryContext);
    const [addTodo, setAddTodo] = useState('');
    const [editIsShown, setEditIsShown] = useState(false);
    const [editTodo, setEditTodo] = useState('');
    const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
    const [todoToBeDeleted, setToDoToBeDeleted] = useState(null);
    const [snackMessagge, setSnackMessagge]=useState({});

    return (
        <Fragment>
            <form onSubmit={(event) => {
                console.log(addTodo);
                context.createTodo(event, {name: addTodo});
                setAddTodo('');
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Task</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <TextField value={addTodo} onChange={(event) => {
                                    setAddTodo(event.target.value)
                                }} label="New Task" fullWidth={true}/>
                            </TableCell>
                            <TableCell>
                                <IconButton align="right" type="submit">
                                    <AddIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        {context.todos.slice().reverse().map((todo, index) => (
                            <TableRow key={'todo' + index}>
                                <TableCell>

                                    {editIsShown === todo.id ?

                                        <TextField
                                            fullWidth={true}
                                            value={editTodo}
                                            onChange={(event) => {
                                                setEditTodo(event.target.value);
                                            }}
                                            InputProps={{
                                                endAdornment: <Fragment>
                                                    <IconButton
                                                        onClick={() => {
                                                            context.updateTodo({id: todo.id, name: editTodo})
                                                            setEditIsShown(false)
                                                        }}
                                                        style={{color: 'green'}}>
                                                        <DoneIcon/>
                                                    </IconButton>
                                                    <IconButton onClick={() => {
                                                        setEditIsShown(false)
                                                    }} style={{color: 'red'}}><ClearIcon/></IconButton>
                                                </Fragment>
                                            }}
                                        />


                                        : todo.name
                                    }
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => {
                                        setEditIsShown(todo.id);
                                        setEditTodo(todo.name)
                                    }}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton onClick={() => {
                                        setDeleteConfirmationIsShown(true);
                                        setToDoToBeDeleted(todo);
                                    }}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </form>
            {deleteConfirmationIsShown && (<DeleteOrder
                todo={todoToBeDeleted}
                open={deleteConfirmationIsShown}
                setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}/>)}

        </Fragment>
    );

}

export default CategoryTable;

