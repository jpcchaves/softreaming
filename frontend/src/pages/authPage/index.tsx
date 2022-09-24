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
} from "./style";
// logo
import LogoImage from "../../assets/logo/logo.png";

const HomePage: React.FC = () => {
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            <LoginForm onSubmit={handleSubmit}>
              <FormInput
                type="email"
                placeholder="Digite seu email..."
                required
                minLength={5}
              />
              <FormInput
                type="password"
                placeholder="Digite sua senha..."
                required
              />
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

export default HomePage;
