import React from "react";
import { Button } from "@material-ui/core";

interface Props {
    onClickHandler: any;
    text: string;
    classes: string;
}

export const ButtonComponent: React.FC<Props> = (props) => {
    const { onClickHandler, text, classes } = props;
    return <Button className={classes} onClick={onClickHandler} variant="outlined">{text}</Button>
}