import List from '@mui/material/List';
import styles from "./Dialog.module.scss";
import Dialog from '@mui/material/Dialog';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemText from '@mui/material/ListItemText';
import { IDialogProps } from "./ts/dialog-props.model";

const DialogContainer = (props: IDialogProps) => {
  const { onClose, selectedValue, open, title, options } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog fullWidth={true} maxWidth={'xs'} onClose={handleClose} open={open}>
      <DialogTitle><b>{title}</b></DialogTitle>
      <List sx={{ pt: 0 }}>
        {options.map(option => (
          <div className={option === props.defaultValue ? styles.active : ''} key={option}>
            <ListItem button onClick={() => handleListItemClick(option)}>
              <ListItemText primary={option} />
            </ListItem>
          </div>
        ))}
      </List>
    </Dialog>
  );
}

export default DialogContainer;
