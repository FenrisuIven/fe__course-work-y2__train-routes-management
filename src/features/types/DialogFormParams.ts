import {RefObject} from "react";

export type DialogFormParams = {
  title: string;
  buttons?: {
    cancel?: {
      label: string;
      handler: () => Promise<void>;
    },
    confirm?: {
      label: string;
      type?: 'submit' | 'button';
      handler: () => Promise<void>;
    }
  };
  className?: string;
  onSubmit?: (props?: any) => any;
  dialogRef: RefObject<Record<string, any> & { close: () => void } | null>
}

