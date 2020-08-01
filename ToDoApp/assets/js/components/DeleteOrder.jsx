import React, {Component, createContext, useContext} from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from '@material-ui/icons/Done';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {CategoryContext, CategoryContextProvider} from "../contexts/CategoryContextProvider";

export function DeleteOrder(props) {
    const context = useContext(CategoryContext);
    const hide = () => {
        props.setDeleteConfirmationIsShown(false);
    }
    return (

        <Dialog onClose={hide} open={props.open} maxWidth={"sm"}>
            <DialogTitle>Are you sure you want to delete???</DialogTitle>
            <DialogContent>
            </DialogContent>
            <DialogActions>
                <IconButton onClick={() => {
                    context.deleteTodo({id:props.todo.id,name:props.todo.name});
                    hide()
                }}>
                    Delete
                </IconButton>
                <IconButton onClick={hide}>
                    Cansel
                </IconButton>
            </DialogActions>
        </Dialog>

    );

}

DeleteOrder.propTypes = {
    open: PropTypes.bool.isRequired,
    setDeleteConfirmationIsShown: PropTypes.func.isRequired
}

export default DeleteOrder;