//global sessionStorage

import { STEPPER_FORM_DATA_KEY } from "./clearFormData";

export default function getKey() {
  const rawFormData = sessionStorage.getItem(STEPPER_FORM_DATA_KEY);

  if (!rawFormData) {
    return [];
  }

  return JSON.parse(rawFormData);
}
