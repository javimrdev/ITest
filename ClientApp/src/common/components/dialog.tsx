import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';

interface Props {
    open: string;
    title: string;
    onClose: (str: string) => void; 
}

export const DialogComponent: React.FC<Props> = (props) => {
    const { open, title, onClose, children } = props;
        
    return(
        <>
            <Dialog open={!!open} onClose={onClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
            </Dialog>
        </>
    )
}