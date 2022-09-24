import * as yup from "yup";
import "./yupTranslations"

export const authSchemaValidation = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).max(15).required(),
});

export const signUpSchemaValidation = yup.object().shape({
  userName: yup.string().min(3).required(),
  email: yup.string().email().required(),
  password: yup.string().min(5).max(15).required(),
  confirmPassword: yup
    .string()
    .min(5)
    .max(15)
    .oneOf([yup.ref("password")]),
});
