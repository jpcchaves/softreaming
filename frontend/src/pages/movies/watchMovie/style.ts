import styled from "styled-components";

export const WatchMoviePageContainer = styled.div`
  height: calc(100vh - 80px);
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MovieDetailsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 50px;
`;

export const MovieDetails = styled.div`
  max-width: 600px;
  margin: 1.2rem auto 0 auto;
  text-align: center;
`;

export const MovieTitle = styled.h1`
  margin-bottom: 0.2em;
`;

export const MovieCategory = styled.h2`
  margin-bottom: 0.5em;
`;

export const MovieInfo = styled.p`
  margin-bottom: 0.5em;
`;

export const MovieContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  position: relative;
`;

export const YoutubeIframe = styled.iframe`
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  width: 60%;
  height: 60%;

  @media (max-width: 768px) {
    width: 75%;
    height: 75%;
  }

  @media (max-width: 520px) {
    width: 90%;
    height: 90%;
  }
`;
