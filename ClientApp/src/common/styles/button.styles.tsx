import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles({
    btnRed: {
        backgroundColor: 'red',
        color: 'white',
        '&:hover': {
            color: 'black'
        }
    },
    btnBlue: {
        backgroundColor: 'blue',
        color: 'white',
        '&:hover': {
            color: 'black'
        }
    },
    btnGreen: {
        backgroundColor: 'green',
        color: 'white',
        '&:hover': {
            color: 'black'
        }
    }
})