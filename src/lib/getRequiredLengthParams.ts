const getRequiredLengthParams = (label: string, length: number) => ({
  required: true,
  minLength: {
    value: length,
    message: `${label} must be at least ${length} characters long`
  },
});

export default getRequiredLengthParams;