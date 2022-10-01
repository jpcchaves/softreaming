// styled components
import {
  ApiErrorMessageWrapper,
  EnterPageContainer,
  EnterPageWrapper,
  ErrorMessage,
  FormErrorMessageWrapper,
  FormInput,
  FormInputSubmit,
  SubmitButtonDisabled,
  FormTitle,
  LoginForm,
  LoginFormWrapper,
  Logo,
  LogoLink,
  LogoWrapper,
  SuccessMessageWrapper,
  SuccessMessage,
  LoaderSpan,
  SubmitButtonWrapper,
  LoadingMessage,
  ApiErrorMessage,
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
import { UserDataInterface } from "./userDataInterface";
// axios
import { api } from "../../../hooks/useApi";

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
            <FormTitle>Cadastrar</FormTitle>
            <LoginForm onSubmit={handleSubmit(submitForm)}>
              <FormInput
                type="text"
                placeholder="Digite seu nome..."
                {...register("userName")}
              />
              {errors.userName && (
                <FormErrorMessageWrapper>
                  <ErrorMessage>
                    <>{errors.userName?.message}</>
                  </ErrorMessage>
                </FormErrorMessageWrapper>
              )}
              <FormInput
                type="email"
                placeholder="Digite seu email..."
                {...register("email")}
              />
              {errors.email && (
                <FormErrorMessageWrapper>
                  <ErrorMessage>
                    <>{errors.email?.message}</>
                  </ErrorMessage>
                </FormErrorMessageWrapper>
              )}
              <FormInput
                type="password"
                placeholder="Digite sua senha..."
                {...register("password")}
              />
              {errors.password && (
                <FormErrorMessageWrapper>
                  <ErrorMessage>
                    <>{errors.password?.message}</>
                  </ErrorMessage>
                </FormErrorMessageWrapper>
              )}
              <FormInput
                type="password"
                placeholder="Digite novamente sua senha..."
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <FormErrorMessageWrapper>
                  <ErrorMessage>
                    {" "}
                    <>{errors.confirmPassword?.message}</>
                  </ErrorMessage>
                </FormErrorMessageWrapper>
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
          </LoginFormWrapper>
        </EnterPageWrapper>
      </EnterPageContainer>
    </>
  );
};

export default SignUpPage;
