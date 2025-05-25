export type DialogFormParams = {
  title: string;
  buttons?: {
    cancel?: {
      label: string;
      handler: () => void;
    },
    confirm?: {
      label: string;
      type?: 'submit' | 'button';
      handler: () => void;
    }
  };
}