import {FormValidationStatus} from "./FormValidationStatus.ts";
import {APIResponse} from "./APIResponse.ts";

export type DialogFormParams = {
  title: string;
  buttons?: {
    cancel?: {
      label: string;
      handler: () => FormValidationStatus | void;
    },
    confirm?: {
      label: string;
      type?: 'submit' | 'button';
      handler: () => Promise<FormValidationStatus>;
    }
  };
  className?: string;
  onSubmit?: (data: Record<string, any>) => Promise<APIResponse>;
}