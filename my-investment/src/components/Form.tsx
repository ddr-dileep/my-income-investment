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
