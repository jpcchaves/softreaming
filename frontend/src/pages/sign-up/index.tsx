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
} from "./style";

import LogoImage from "../../assets/logo/logo.png";

const SignUpPage: React.FC = () => {
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
            <LoginForm>
              <FormInput
                type="text"
                placeholder="Digite seu nome..."
                required
                minLength={5}
              />
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
              <FormInput
                type="password"
                placeholder="Digite novamente sua senha..."
                required
              />
              <FormInputSubmit type="submit" value="Entrar" />
            </LoginForm>
          </LoginFormWrapper>
        </EnterPageWrapper>
      </EnterPageContainer>
    </>
  );
};

export default SignUpPage;
