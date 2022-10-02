// components
import SuccessMessageComponent from "../../../components/successMessage";
// hooks
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
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
// context
import { AuthContext } from "../../../contexts/auth/AuthContext";

const LoginPage: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
    try {
      setIsLoading(true);
      const { email, password } = data;
      if (email && password) {
        const isLogged = await auth.signin(email, password);
        if (isLogged) {
          setSuccessMessage("Usuário logado com sucesso");
          reset();
          setTimeout(() => {
            navigate("/profiles");
          }, 1000);
        }
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(true);
      if (error.response.data) {
        const { message } = error.response.data;
        setErrorMessage(message);
      } else {
        setErrorMessage("Ocorreu um erro... Tente novamente mais tarde!");
      }
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
    setIsLoading(false);
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
                <SuccessMessageComponent successMessage={successMessage} />
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
              {!isLoading && <FormInputSubmit type="submit" value="Entrar" />}
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
