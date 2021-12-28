import { Typography } from "@material-ui/core";
import React from "react";

interface Props {
    title: string;
    value: string;
}

export const InfoComponent: React.FC<Props> = (props) => {
    const { title, value } = props;
    return (
        <>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="h5">{value}</Typography>
        </>
    )
}