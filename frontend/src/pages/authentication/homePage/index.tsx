import React from 'react';
// styled components
import {
  EnterLink,
  EnterPageContainer,
  EnterPageWrapper,
  Logo,
  LogoWrapper,
  StoryCard,
  StoryCardSubtitle,
  StoryCardText,
  StoryCardTitle,
} from './style';
// logo
import LogoImage from '../../../assets/logo/logo.png';

const HomePage: React.FC = () => {
  return (
    <>
      <EnterPageContainer>
        <EnterPageWrapper>
          <LogoWrapper>
            <Logo src={LogoImage} alt="logo da netflix" />
            <EnterLink to="/login">Entrar</EnterLink>
          </LogoWrapper>
          <StoryCard>
            <StoryCardTitle>
              Filmes, séries e muito mais. Sem limites.
            </StoryCardTitle>
            <StoryCardSubtitle>
              Assista onde quiser. Cancele quando quiser.
            </StoryCardSubtitle>
            <StoryCardText>
              Pronto para assistir? Clique no botão <strong>Entrar</strong> para
              acessar a sua conta ou realizar o seu cadatro!
            </StoryCardText>
          </StoryCard>
        </EnterPageWrapper>
      </EnterPageContainer>
    </>
  );
};

export default HomePage;
