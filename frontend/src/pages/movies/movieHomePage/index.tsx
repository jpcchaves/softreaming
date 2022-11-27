import {
  BannerDescriptionWrapper,
  BannerFadeBotton,
  BannerTitle,
  MovieHomePageContainer,
  MovieHomePageWrapper,
  MoviePageBanner,
  MoviePageBannerButtons,
  MoviePageBannerButtonsWrapper,
  MoviePageBannerContents,
} from './style';

const MovieHomePage: React.FC = () => {
  return (
    <MovieHomePageWrapper>
      <MovieHomePageContainer>
        <MoviePageBanner>
          <MoviePageBannerContents>
            <BannerTitle>Bem vindo a Softreaming!</BannerTitle>
            <MoviePageBannerButtonsWrapper>
              <MoviePageBannerButtons to="/br/movies">
                Começar a assistir
              </MoviePageBannerButtons>
            </MoviePageBannerButtonsWrapper>
            <BannerDescriptionWrapper>
              Obrigado por acessar a Softreaming! Esse projeto foi desenvolvido
              com tecnologia de ponta (Vite + ReactJS + TypeScript + NodeJS +
              PostgreSQL), e é o meu primeiro projeto completamente Full Stack,
              desenvolvido do absoluto zero.
            </BannerDescriptionWrapper>
          </MoviePageBannerContents>
          <BannerFadeBotton></BannerFadeBotton>
        </MoviePageBanner>
      </MovieHomePageContainer>
    </MovieHomePageWrapper>
  );
};

export default MovieHomePage;
