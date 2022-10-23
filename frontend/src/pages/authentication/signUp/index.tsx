// components
import SuccessMessageComponent from "../../../components/successMessage";
import ErrorMessageComponent from "../../../components/errorMessage";
import LoadingSpan from "../../../components/loadingSpan";
import {
  FormInput,
  FormInputSubmit,
} from "../../../components/inputStyledComponent/style";
// styled components
import {
  EnterPageContainer,
  EnterPageWrapper,
  FormTitle,
  LoginForm,
  LoginFormWrapper,
  Logo,
  LogoLink,
  LogoWrapper,
} from "./style";
// logo
import LogoImage from "../../../assets/logo/logo.png";
// hook forms
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// yup schema validation
import { signUpSchemaValidation } from "../../../validations/authSchemaValidation";
// hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// userDataInterface
import { UserDataInterface } from "../../../types/userDataInterface";
// axios
import { api } from "../../../hooks/useApi";
import FormErrorMessage from "../../../components/formErrorMessage";

const SignUpPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // navigate hook
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(signUpSchemaValidation),
  });

  const submitForm = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      const { userName, email, password, confirmPassword } = data;

      const newUserData: UserDataInterface = {
        userName,
        email,
        password,
        confirmPassword,
      };

      await api.post("/user", newUserData);

      setSuccessMessage(
        "Usuário criado com sucesso! Aguarde... você será redirecionado para a tela de Login"
      );

      setIsLoading(false);

      setTimeout(() => {
        navigate("/login");
        setSuccessMessage("");
      }, 1500);
    } catch (error: any) {
      if (error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Ocorreu um erro... Tente novamente mais tarde.");
      }

      setTimeout(() => {
        setErrorMessage("");
      }, 1500);

      setIsLoading(false);

      return;
    }

    reset();
  };

  return (
    <>
      <EnterPageContainer>
        <EnterPageWrapper>
          <LogoWrapper>
            <LogoLink to="/">
              <Logo src={LogoImage} alt="logo da netflix" />
            </LogoLink>
          </LogoWrapper>
          <LoginFormWrapper>
            <FormTitle>Cadastrar</FormTitle>
            <LoginForm onSubmit={handleSubmit(submitForm)}>
              <FormInput
                type="text"
                placeholder="Digite seu nome..."
                {...register("userName")}
              />
              {errors.userName && (
                <FormErrorMessage message={errors.userName?.message} />
              )}

              <FormInput
                type="email"
                placeholder="Digite seu email..."
                {...register("email")}
              />

              {errors.email && (
                <FormErrorMessage message={errors.email?.message} />
              )}

              <FormInput
                type="password"
                placeholder="Digite sua senha..."
                {...register("password")}
              />

              {errors.password && (
                <FormErrorMessage message={errors.password?.message} />
              )}

              <FormInput
                type="password"
                placeholder="Digite novamente sua senha..."
                {...register("confirmPassword")}
              />

              {errors.confirmPassword && (
                <FormErrorMessage message={errors.confirmPassword?.message} />
              )}

              {successMessage && (
                <SuccessMessageComponent successMessage={successMessage} />
              )}

              {errorMessage && (
                <ErrorMessageComponent errorMessage={errorMessage} />
              )}

              {isLoading && <LoadingSpan />}

              {!isLoading && (
                <FormInputSubmit type="submit" value="Cadastrar" />
              )}
            </LoginForm>
          </LoginFormWrapper>
        </EnterPageWrapper>
      </EnterPageContainer>
    </>
  );
};

export default SignUpPage;
