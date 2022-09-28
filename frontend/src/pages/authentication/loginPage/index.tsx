import React, { useState } from "react";
// styled components
import {
  EnterPageContainer,
  EnterPageWrapper,
  FormInput,
  FormInputSubmit,
  FormTitle,
  LoginForm,
  LoginFormWrapper,
  Logo,
  LogoLink,
  LogoWrapper,
  SignUpLink,
  SignUpNow,
  SignUpText,
  ErrorMessageWrapper,
  ErrorMessage,
  SuccessMessageWrapper,
  SuccessMessage,
  ApiErrorMessageWrapper,
  ApiErrorMessage,
  SubmitButtonWrapper,
  SubmitButtonDisabled,
  LoaderSpan,
  LoadingMessage,
} from "./style";
// logo
import LogoImage from "../../../assets/logo/logo.png";
// hook forms
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// yup schema validation
import { authSchemaValidation } from "../../../validations/authSchemaValidation";
// interfaces
import { LoginData } from "./userLoginDataInterface";
import axios from "axios";

const LoginPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(authSchemaValidation),
  });

  const submitForm = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      const { email, password } = data;
      const currentUserData: LoginData = {
        email,
        password,
      };

      const baseUrl: string = "http://localhost:3001/login";

      const loggedUserData = await axios.post(baseUrl, currentUserData);

      const { token, user } = loggedUserData.data;

      setSuccessMessage(
        "Usuário logado com sucesso! Você será redirecionado para a página de perfis."
      );

      setIsLoading(false);

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error: any) {
      if (error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Ocorreu um erro... Tente novamente mais tade.");
      }

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);

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
            <FormTitle>Entrar</FormTitle>
            <LoginForm onSubmit={handleSubmit(submitForm)}>
              <FormInput
                type="text"
                placeholder="Digite seu email..."
                {...register("email")}
              />
              {errors.email?.message && (
                <ErrorMessageWrapper>
                  <ErrorMessage>
                    <>{errors.email?.message}</>
                  </ErrorMessage>
                </ErrorMessageWrapper>
              )}
              <FormInput
                type="password"
                placeholder="Digite sua senha..."
                {...register("password")}
              />
              {errors.password?.message && (
                <ErrorMessageWrapper>
                  <ErrorMessage>
                    <>{errors.password?.message}</>
                  </ErrorMessage>
                </ErrorMessageWrapper>
              )}
              {successMessage && (
                <SuccessMessageWrapper>
                  <SuccessMessage>{successMessage}</SuccessMessage>
                </SuccessMessageWrapper>
              )}
              {errorMessage && (
                <ApiErrorMessageWrapper>
                  <ApiErrorMessage>{errorMessage}</ApiErrorMessage>
                </ApiErrorMessageWrapper>
              )}
              {isLoading && (
                <SubmitButtonWrapper>
                  <SubmitButtonDisabled disabled>
                    <LoaderSpan></LoaderSpan>
                    <LoadingMessage>Carregando...</LoadingMessage>
                  </SubmitButtonDisabled>
                </SubmitButtonWrapper>
              )}
              {!isLoading && (
                <FormInputSubmit type="submit" value="Cadastrar" />
              )}
            </LoginForm>
            <SignUpNow>
              <SignUpText>
                Novo por aqui?
                <SignUpLink to="/signup"> Crie sua conta.</SignUpLink>
              </SignUpText>
            </SignUpNow>
          </LoginFormWrapper>
        </EnterPageWrapper>
      </EnterPageContainer>
    </>
  );
};

export default LoginPage;
