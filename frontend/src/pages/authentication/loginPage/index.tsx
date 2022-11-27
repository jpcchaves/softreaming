// components
import ErrorMessageComponent from '../../../components/errorMessage';
import LoadingSpan from '../../../components/loadingSpan';
import {
  FormInput,
  FormInputSubmit,
  FormInputWrapper,
} from '../../../components/inputStyledComponent/style';
// hooks
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  SignUpLink,
  SignUpNow,
  SignUpText,
} from './style';
// logo
import LogoImage from '../../../assets/logo/logo.png';
// hook forms
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// yup schema validation
import { authSchemaValidation } from '../../../validations/authSchemaValidation';
// context
import { AuthContext } from '../../../contexts/auth/AuthContext';
import FormErrorMessage from '../../../components/formErrorMessage';

const LoginPage: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
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
          reset();
          navigate('/profiles');
        }
      }
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsLoading(true);
      if (error.response.data) {
        const { message } = error.response.data;
        setErrorMessage(message);
      } else {
        setErrorMessage('Ocorreu um erro... Tente novamente mais tarde!');
      }
      setTimeout(() => {
        setErrorMessage('');
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
              <FormInputWrapper>
                <FormInput
                  type="text"
                  placeholder="Digite seu email..."
                  {...register('email')}
                />
              </FormInputWrapper>
              {errors.email && (
                <FormErrorMessage message={errors.email?.message} />
              )}

              <FormInput
                type="password"
                placeholder="Digite sua senha..."
                {...register('password')}
              />

              {errors.password && (
                <FormErrorMessage message={errors.password?.message} />
              )}

              {errorMessage && (
                <ErrorMessageComponent errorMessage={errorMessage} />
              )}

              {isLoading && <LoadingSpan />}

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
