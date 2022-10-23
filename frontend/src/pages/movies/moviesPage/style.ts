import { Link } from "react-router-dom";
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
  padding: 2rem 0;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fonts.size.bigSize1};
  }
`;

export const MoviesWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;
  padding: 20px;
`;

export const MovieBannerWrapper = styled.div`
  width: 400px;
  max-width: 400px;
  height: auto;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding-bottom: 20px;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    box-shadow: rgba(255, 255, 255, 0.1) 0px 3px 12px;
  }
`;

export const MoviePosterWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  height: 220px;
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

export const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin-top: 10px;
`;

export const WatchMovieButton = styled(Link)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.midGray};
  font-size: ${({ theme }) => theme.fonts.size.mediumSize};
  font-family: ${({ theme }) => theme.fonts.family.default};
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  transition: 0.2s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.midGray};
    color: #000;
  }
`;

export const EditButton = styled(WatchMovieButton)``;

export const DeleteButton = styled.button`
  border: none;
  background-color: #f8d7da;
  cursor: pointer;
  color: #000;
  border-radius: 5px;
  color: #721c24;
  font-size: ${({ theme }) => theme.fonts.size.mediumSize};
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;
