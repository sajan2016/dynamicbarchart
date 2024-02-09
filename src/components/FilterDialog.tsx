import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function FilterDialog(props:any) {
  const {open, setOpen,setmetrics,metrics} = props;
  const [options,setoptions]=React.useState({...metrics})

  const handleClose = () => {
    setOpen(false);
    setmetrics(options)
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>{
            setOpen(false);
            setoptions({...metrics})
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Check metrics that you want on the Graph, Uncheck if you dont want them"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <FormGroup>
          <FormControlLabel control={<Checkbox checked={options.calories}  onClick={(event:any)=>{
            let temp={...options};
            temp.calories=event.target.checked;
            setoptions(temp);
          }}/>} label="Calories" />
          <FormControlLabel control={<Checkbox checked={options.fat} onClick={(event:any)=>{
            let temp={...options};
            temp.fat=event.target.checked;
            setoptions(temp);
          }}/>} label="Fat (g)" />
          <FormControlLabel control={<Checkbox checked={options.carbs} onClick={(event:any)=>{
            let temp={...options};
            temp.carbs=event.target.checked;
            setoptions(temp);
          }}/>} label="Carbs (g)" />
          <FormControlLabel control={<Checkbox checked={options.protein} onClick={(event:any)=>{
            let temp={...options};
            temp.protein=event.target.checked;
            setoptions(temp);
          }}/>} label="Protein (g)" />
        </FormGroup>          
        </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Apply</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}