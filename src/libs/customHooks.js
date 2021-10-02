import { useState } from "react";

export default function useForm(initialState, callback) {
  const [inputs, setInputs] = useState(initialState);

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  return { inputs, handleInputChange, handleSubmit };
}
