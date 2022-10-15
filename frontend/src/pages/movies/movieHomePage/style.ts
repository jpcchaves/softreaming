import { Link } from "react-router-dom";
import styled from "styled-components";
import Bgimg from "../../../assets/movie_page_bg/movie_hp_bg.jpg";

export const MovieHomePageWrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 80px);
  background: rgba(0, 0, 0, 0.5) url(${Bgimg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  background-blend-mode: darken;
  color: white;
`;

export const MovieHomePageContainer = styled.div`
  height: 100%;
  width: 100%;
`;

export const MoviePageBanner = styled.div`
  height: 100%;
  width: 100%;
`;

export const MoviePageBannerContents = styled.div`
  width: 90%;
  margin-left: 30px;
  padding-top: 140px;
  height: 190px;
`;

export const BannerTitle = styled.h1`
  font-size: ${({ theme }) => theme.fonts.size.extraBig};
  font-weight: ${({ theme }) => theme.fonts.weight.extraBold};
  padding-bottom: 1rem;
  width: 100%;
`;

export const MoviePageBannerButtonsWrapper = styled.div`
  margin-bottom: 0.7rem;
`;

export const MoviePageBannerButtons = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  background-color: rgba(51, 51, 51, 0.5);
  border-radius: 5px;
  padding: 0.5rem 1rem;
  transition: 0.2s ease-in-out;

  &:hover {
    color: #000;
    background-color: ${({ theme }) => theme.colors.smokeWhite};
  }
`;

export const BannerDescriptionWrapper = styled.div`
  width: 100%;
  line-height: 1.3;
  padding-top: 1rem;
  font-size: ${({ theme }) => theme.fonts.size.regularSize};
  max-width: 450px;
  height: 180px;
  font-weight: 500;
`;

export const BannerFadeBotton = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 3rem;
  background-image: linear-gradient(
    180deg,
    transparent,
    rgba(37, 37, 37, 0.61),
    #111
  );
`;
