import { useState } from "react";
import Input from "./Input";

export default function Form({
  fields,
  onSubmit,
  onCancel,
}: {
  fields: any;
  onSubmit?: Function;
  onCancel?: () => void;
}) {
  const [formValues, setFormValues] = useState({});

  const onInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return (
    <div className="main-form py-4">
      {fields &&
        fields?.map((field: any) => {
          return (
            <Input {...field} key={field?.name} onChange={onInputChange} />
          );
        })}
      {onCancel && (
        <button type="reset" onClick={onCancel}>
          Cancel
        </button>
      )}
      {onSubmit && (
        <button type="submit" onClick={() => onSubmit(formValues)}>
          Submit
        </button>
      )}
    </div>
  );
}
