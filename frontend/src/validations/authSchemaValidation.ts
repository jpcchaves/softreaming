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
  profilePic: yup
    .mixed()
    .test("hasImage", "A imagem é obrigatória!", (value) => {
      return value && value[0];
    })
    .test(
      "fileSize",
      "O arquivo é muito grande! Tente utilizar um arquivo menor. (Limite: 100 Kb)",
      (value) => {
        return value && value[0]?.size <= 100000;
      }
    )
    .test(
      "fileType",
      "Os formatos suportados são: JPG, JPEG e PNG.",
      (value) => {
        const fileType = value[0]?.type;

        const isValidType = fileType && fileType.toLowerCase();

        if (isValidType === "image/jpg") {
          return value && isValidType;
        } else if (isValidType === "image/jpeg") {
          return value && isValidType;
        } else if (isValidType === "image/png") {
          return value && isValidType;
        }
      }
    ),
});

export const updateUserValidation = yup.object().shape({
  userName: yup.string().min(5).max(12).required(),
  password: yup.string().min(5).max(15).required(),
});
