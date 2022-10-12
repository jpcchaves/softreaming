// logo
import LogoImage from "../../../assets/logo/logo.png";
// components
import ErrorMessageComponent from "../../../components/errorMessage";
import FormErrorMessage from "../../../components/formErrorMessage";
import LoadingSpan from "../../../components/loadingSpan";
import {
  FormInput,
  FormInputSubmit,
} from "../../../components/inputStyledComponent/style";
import SuccessMessageComponent from "../../../components/successMessage";
import {
  EditProfilePageContainer,
  EditProfilePageWrapper,
  FormTitle,
  LoginForm,
  LoginFormWrapper,
  Logo,
  LogoContainer,
  LogoWrapper,
} from "./style";
// hook forms
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// yup schema validation
import { createProfileValidation } from "../../../validations/authSchemaValidation";
// hooks
import { useContext, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
// axios
import { api } from "../../../hooks/useApi";
// context
import { AuthContext } from "../../../contexts/auth/AuthContext";

const CreateProfile = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // navigate hook
  const navigate = useNavigate();

  // context
  const auth = useContext(AuthContext);

  // profile id URL param
  const { profileId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(createProfileValidation),
  });

  const submitForm = async (data: FieldValues) => {
    setIsLoading(true);

    const { profileName, profileUrlImage } = data;

    const newProfileData = {
      profileName,
      profileUrlImage,
    };

    if (!auth.user) return <Navigate to="/login" />;

    try {
      const { id } = auth.user!;

      const getToken = () => {
        const token = localStorage.getItem("authToken");
        return token;
      };

      const authToken = getToken();

      await api.put(`/profiles/${id}/${profileId}`, newProfileData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setIsLoading(false);

      navigate("/profiles");
    } catch (error: any) {
      setIsLoading(true);

      setErrorMessage(
        "Ocorreu um erro ao editar o perfil! Tente novamente mais tarde..."
      );
      setIsLoading(false);

      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }

    reset();
  };

  return (
    <EditProfilePageContainer>
      <EditProfilePageWrapper>
        <LogoContainer>
          <LogoWrapper>
            <Logo src={LogoImage} alt="logotipo da softreaming" />
          </LogoWrapper>
        </LogoContainer>
        <LoginFormWrapper>
          <FormTitle>Editar Perfil</FormTitle>
          <LoginForm onSubmit={handleSubmit(submitForm)}>
            <FormInput
              type="text"
              placeholder="Digite o novo nome do perfil..."
              {...register("profileName")}
            />
            {errors.profileName && (
              <FormErrorMessage message={errors.profileName?.message} />
            )}
            <FormInput
              type="text"
              placeholder="Insira a nova URL da sua profile image..."
              {...register("profileUrlImage")}
            />
            {errors.profileUrlImage && (
              <FormErrorMessage message={errors.profileUrlImage?.message} />
            )}

            {errorMessage && (
              <ErrorMessageComponent errorMessage={errorMessage} />
            )}

            {isLoading && <LoadingSpan />}

            {!isLoading && (
              <FormInputSubmit type="submit" value="Editar Perfil" />
            )}
          </LoginForm>
        </LoginFormWrapper>
      </EditProfilePageWrapper>
    </EditProfilePageContainer>
  );
};

export default CreateProfile;
