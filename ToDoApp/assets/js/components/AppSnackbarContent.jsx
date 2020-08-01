import React, {Component, createContext, useContext} from 'react';
import { Snackbar } from '@material-ui/core';
import { SnackbarContent } from '@material-ui/icons';

import {CategoryContext, CategoryContextProvider} from "../contexts/CategoryContextProvider";

export function AppSnackbarContent(props) {
    const context = useContext(CategoryContext);

    return (
        <Snackbar open={}>
            <SnackbarContent/>
        </Snackbar>
    );

}


