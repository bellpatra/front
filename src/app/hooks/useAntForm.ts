// hooks/useAntForm.ts
import { useForm, UseFormProps, FieldValues, Path } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Custom hook to integrate React Hook Form with Ant Design
export function useAntForm<T extends FieldValues>(
  schema: yup.ObjectSchema<T>,
  options?: UseFormProps<T>
) {
  const form = useForm<T>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    ...options,
  });

  // Helper to get field status for Ant Design components
  const getFieldStatus = (fieldName: Path<T>) => {
    const error = form.formState.errors[fieldName];
    return error ? 'error' : '';
  };

  // Helper to get error message
  const getFieldError = (fieldName: Path<T>) => {
    const error = form.formState.errors[fieldName];
    return error?.message as string | undefined;
  };

  // Helper to check if field has error
  const hasFieldError = (fieldName: Path<T>) => {
    return !!form.formState.errors[fieldName];
  };

  return {
    ...form,
    getFieldStatus,
    getFieldError,
    hasFieldError,
  };
}

export default useAntForm;
