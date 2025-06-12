export type FormValidationStatus<T extends Record<string, any>> = {
  isInputValid: boolean;
  values: T;
}