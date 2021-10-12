import { TextField } from '@mui/material';
import { useField, FieldConfig } from 'formik';

interface Props extends FieldConfig {
  label: string;
}

const InputField = ({ label, ...props }: Props) => {
  const [field, meta] = useField(props);

  return (
    <TextField
      fullWidth
      style={{ marginTop: 30 }}
      label={label}
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
};

export default InputField;
