import { useState, FormEvent } from "react";
import Input from "./Input";

interface Field {
  name: string;
  type?: string;
  placeholder?: string;
  label?: string;
}

interface FormProps {
  fields: Field[];
  onSubmit?: (values: { [key: string]: string }) => void;
  onCancel?: () => void;
}

export default function Form({ fields, onSubmit, onCancel }: FormProps) {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});

  const onInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return (
    <div className="main-form py-4">
      {fields &&
        fields?.map((field) => (
          <Input
            {...field}
            key={field.name}
            onChange={onInputChange}
            label={field.label || ""}
          />
        ))}

      {onSubmit && (
        <button
          type="submit"
          className="mt-2 bg-sky-700 text-white w-full p-2 rounded-full"
          onClick={() => onSubmit(formValues)}
        >
          Submit
        </button>
      )}

      {onCancel && (
        <button
          type="reset"
          className="mt-2 bg-red-700 text-white w-full p-2 rounded-full"
          onClick={onCancel}
        >
          Cancel
        </button>
      )}
    </div>
  );
}
