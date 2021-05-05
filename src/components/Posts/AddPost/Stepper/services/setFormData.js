// global sessionStorage

import { STEPPER_FORM_DATA_KEY } from "./clearFormData";

export default function setKey(formData) {
  sessionStorage.setItem(STEPPER_FORM_DATA_KEY, JSON.stringify(formData));
}
