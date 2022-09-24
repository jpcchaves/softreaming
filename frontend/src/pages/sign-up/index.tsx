// styled components
import {
  EnterPageContainer,
  EnterPageWrapper,
  ErrorMessage,
  ErrorMessageWrapper,
  FormInput,
  FormInputSubmit,
  FormTitle,
  LoginForm,
  LoginFormWrapper,
  Logo,
  LogoLink,
  LogoWrapper,
} from "./style";
// logo
import LogoImage from "../../assets/logo/logo.png";
// hook forms
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// yup schema validation
import { signUpSchemaValidation } from "../../validations/authSchemaValidation";

const SignUpPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(signUpSchemaValidation),
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
            <FormTitle>Cadastrar</FormTitle>
            <LoginForm onSubmit={handleSubmit(submitForm)}>
              <FormInput
                type="text"
                placeholder="Digite seu nome..."
                {...register("userName")}
              />
              {errors.userName && (
                <ErrorMessageWrapper>
                  <ErrorMessage>
                    <>{errors.userName?.message}</>
                  </ErrorMessage>
                </ErrorMessageWrapper>
              )}
              <FormInput
                type="email"
                placeholder="Digite seu email..."
                {...register("email")}
              />
              {errors.email && (
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
              {errors.password && (
                <ErrorMessageWrapper>
                  <ErrorMessage>
                    <>{errors.password?.message}</>
                  </ErrorMessage>
                </ErrorMessageWrapper>
              )}
              <FormInput
                type="password"
                placeholder="Digite novamente sua senha..."
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <ErrorMessageWrapper>
                  <ErrorMessage>Passwords should match!</ErrorMessage>
                </ErrorMessageWrapper>
              )}
              <FormInputSubmit type="submit" value="Entrar" />
            </LoginForm>
          </LoginFormWrapper>
        </EnterPageWrapper>
      </EnterPageContainer>
    </>
  );
};

export default SignUpPage;
