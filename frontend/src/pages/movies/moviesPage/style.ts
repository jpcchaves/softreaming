import styled from "styled-components";

export const MoviesHomePageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  min-height: calc(100vh - 80px);
  padding-bottom: 200px;
  text-align: center;
  color: white;
`;

export const MoviesPageErrorWrapper = styled.div`
  width: 50%;
  margin: 50px auto;
`;

export const MoviesPageTitle = styled.h2`
  color: white;
  font-size: ${({ theme }) => theme.fonts.size.bigSize2};
`;

export const MoviesWrapper = styled.div`
  width: 100%;
  max-width: 95%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;
  padding: 20px;
`;

export const MovieBannerWrapper = styled.div`
  width: 300px;
  max-width: 300px;
  height: 300px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
`;

export const MoviePosterWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  height: 160px;
  margin-bottom: 1rem;
`;

export const MoviePoster = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

export const MovieName = styled.h1`
  font-size: ${({ theme }) => theme.fonts.size.mediumSize};
  margin-bottom: 0.5rem;
`;

export const MovieCategory = styled.p`
  margin-bottom: 0.5rem;
`;

export const MovieReleaseDate = styled.p``;
