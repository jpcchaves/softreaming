import styled from "styled-components";
import { Link } from "react-router-dom";

export const ProfileBanner = styled.div`
  width: 200px;
`;

export const ProfileImageWrapper = styled.div`
  width: 100%;
`;

export const ProfileImage = styled.img`
  width: 100%;
`;

export const ProfileNameWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

export const ProfileName = styled.p`
  color: ${({ theme }) => theme.colors.midGray};
  font-size: ${({ theme }) => theme.fonts.size.mediumBigSize};
  margin: 0.5rem 0 1rem 0;
`;

export const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const EditButton = styled.button`
  text-decoration: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.midGray};
  font-size: ${({ theme }) => theme.fonts.size.mediumSize};
  font-family: ${({ theme }) => theme.fonts.family.default};
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
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

export const DeleteButton = styled.button`
  text-decoration: none;
  border: none;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  cursor: pointer;
  color: #000;
  border-radius: 5px;
  color: #721c24;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  font-size: ${({ theme }) => theme.fonts.size.mediumSize};
  padding: 10px;
  font-family: ${({ theme }) => theme.fonts.family.default};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

export const DeleteButtonText = styled.span``;
