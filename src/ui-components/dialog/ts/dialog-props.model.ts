export interface IDialogProps {
    open: boolean;
    title: string;
    options: string[];
    defaultValue: string;
    selectedValue: string;
    onClose: (value: string) => void;
  }