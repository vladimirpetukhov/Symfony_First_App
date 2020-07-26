import React, {Component, useContext, useState} from 'react';
import {CategoryContext, ToDoContext} from "../contexts/CategoryContextProvider";
import {Table, TableBody, TableRow, TableHead, TableCell} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from "@material-ui/core/TextField";
import AddIcon from '@material-ui/icons/Add';


function CategoryTable() {
    const context = useContext(CategoryContext);
    const [addTodo, setAddTodo] = useState('');

    return (
        <form onSubmit={(event)=> {context.createTodo(event,{name:addTodo})}}>
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
                            <TextField value={addTodo} onChange={(event)=>{setAddTodo(event.target.value)}} label="New Task" fullWidth={true}/>
                        </TableCell>
                        <TableCell>
                            <IconButton align="right" type="submit">
                                <AddIcon/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    {context.todos.slice().reverse().map((todo, index) => (
                        <TableRow key={'todo'+index}>
                            <TableCell>{todo.name}</TableCell>
                            <TableCell align="right">
                                <IconButton>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton>
                                    <DeleteIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </form>
    );

}

export default CategoryTable;

