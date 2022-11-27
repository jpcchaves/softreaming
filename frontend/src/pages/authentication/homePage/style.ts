import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import BgImg from '../../../assets/bg_poster/netflix_poster.jpg';

export const EnterPageContainer = styled.header`
  height: 100vh;
  max-width: 100vw;
  background-image: url(${BgImg});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const EnterPageWrapper = styled.div`
  height: 100%;
  width: 100%;
  background: radial-gradient(
    ellipse,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.8) 90%
  );
  background-color: rgba(0, 0, 0, 0.2);
`;

export const LogoWrapper = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.img`
  height: 2.8125rem;
  width: 10.4375rem;
  margin-left: 60px;

  @media (max-width: 768px) {
    margin-left: 10px;
  }
`;

export const EnterLink = styled(Link)`
  ${({ theme }) => css`
    background-color: ${theme.colors.redColor};
    color: ${theme.colors.white};
    font-size: ${theme.fonts.size.mediumSize};
    font-weight: ${theme.fonts.weight.medium};
  `}
  padding: 7px 17px;
  cursor: pointer;
  border-radius: 3px;
  margin-right: 60px;
  text-decoration: none;

  @media (max-width: 768px) {
    margin-right: 10px;
  }

  &:hover {
    opacity: 0.9;
  }
`;

export const StoryCard = styled.div`
  margin: 8rem auto 0 auto;
  max-width: 950px;
  width: 100%;
  text-align: center;

  @media (max-width: 768px) {
    width: 92%;
  }
`;

export const StoryCardTitle = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.fonts.size.extraBig};

    @media (max-width: 768px) {
      font-size: ${theme.fonts.size.bigSize1};
    }
  `}
  text-shadow: 1px 1px #000;
  max-width: 680px;
  margin: 10px auto;
  width: 100%;
`;

export const StoryCardSubtitle = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.fonts.size.bigSize1};
    font-weight: ${theme.fonts.weight.medium};

    @media (max-width: 768px) {
      font-size: ${theme.fonts.size.mediumBigSize};
    }
  `}
  text-shadow: 1px 1px #000;
  margin: 0 auto 1rem auto;
  max-width: 680px;
  width: 100%;
`;

export const StoryCardText = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: ${theme.fonts.weight.medium};
  `}
  text-shadow: 1px 1px #000;
  margin: 0 auto;
  max-width: 730px;
  width: 100%;
`;
