import * as yup from "yup";
import "./yupTranslations";

export const authSchemaValidation = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).max(15).required(),
});

export const signUpSchemaValidation = yup.object().shape({
  userName: yup.string().min(3).required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      /^[a-zA-Z0-9äöüÄÖÜ]*$/,
      "A senha não pode conter caracteres especiais!"
    )
    .min(5)
    .max(15)
    .required(),
  confirmPassword: yup
    .string()
    .matches(
      /^[a-zA-Z0-9äöüÄÖÜ]*$/,
      "A senha não pode conter caracteres especiais!"
    )
    .min(5)
    .max(15)
    .oneOf([yup.ref("password")]),
});

export const createProfileValidation = yup.object().shape({
  profileName: yup.string().min(3).max(12).required(),
  profileUrlImage: yup.string().url().required(),
});

export const updateUserValidation = yup.object().shape({
  userName: yup.string().min(5).max(12).required(),
  password: yup.string().min(5).max(15).required(),
});
