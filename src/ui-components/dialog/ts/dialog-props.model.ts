export interface IDialogProps {
    open: boolean;
    title: string;
    options: string[];
    selectedValue: string;
    onClose: (value: string) => void;
  }