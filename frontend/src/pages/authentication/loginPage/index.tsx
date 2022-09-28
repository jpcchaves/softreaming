import React from "react";
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
} from "./style";
// logo
import LogoImage from "../../../assets/logo/logo.png";
// hook forms
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// yup schema validation
import { authSchemaValidation } from "../../../validations/authSchemaValidation";

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(authSchemaValidation),
  });

  const submitForm = (data: Object) => {
    console.log({ data });
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
              <FormInputSubmit type="submit" value="Entrar" />
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
