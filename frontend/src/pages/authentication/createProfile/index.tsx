import LogoImage from "../../../assets/logo/logo.png";
import ErrorMessageComponent from "../../../components/errorMessage";
import FormErrorMessage from "../../../components/formErrorMessage";
import {
  FormInput,
  FormInputSubmit,
} from "../../../components/inputStyledComponent/style";
import LoadingSpan from "../../../components/loadingSpan";
import SuccessMessageComponent from "../../../components/successMessage";
import {
  CreateProfilePageContainer,
  CreateProfilePageWrapper,
  FormTitle,
  GoBackLink,
  GoBackLinkWrapper,
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
import { Navigate, useNavigate } from "react-router-dom";
// axios
import { api } from "../../../hooks/useApi";
// context
import { AuthContext } from "../../../contexts/auth/AuthContext";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

const CreateProfile = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // navigate hook
  const navigate = useNavigate();

  // context
  const auth = useContext(AuthContext);

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

      await api.post(`/user/${id}/profiles`, newProfileData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setIsLoading(false);

      navigate("/profiles");
    } catch (error: any) {
      setIsLoading(true);

      setError(true);

      setErrorMessage(
        "Ocorreu um erro ao criar o perfil! Tente novamente mais tarde..."
      );
      setIsLoading(false);

      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }

    reset();
  };

  return (
    <CreateProfilePageContainer>
      <CreateProfilePageWrapper>
        <LogoContainer>
          <LogoWrapper>
            <Logo src={LogoImage} alt="logotipo da softreaming" />
          </LogoWrapper>
        </LogoContainer>
        <LoginFormWrapper>
          <FormTitle>Criar Perfil</FormTitle>
          <LoginForm onSubmit={handleSubmit(submitForm)}>
            <FormInput
              type="text"
              placeholder="Digite o nome do perfil..."
              {...register("profileName")}
            />
            {errors.profileName && (
              <FormErrorMessage message={errors.profileName?.message} />
            )}
            <FormInput
              type="text"
              placeholder="Insira a URL da sua profile image..."
              {...register("profileUrlImage")}
            />
            {errors.profileUrlImage && (
              <FormErrorMessage message={errors.profileUrlImage?.message} />
            )}

            {successMessage && (
              <SuccessMessageComponent successMessage={successMessage} />
            )}

            {errorMessage && (
              <ErrorMessageComponent errorMessage={errorMessage} />
            )}

            {isLoading && <LoadingSpan />}

            {!isLoading && (
              <FormInputSubmit type="submit" value="Criar Perfil" />
            )}
          </LoginForm>
          <GoBackLinkWrapper>
            <GoBackLink to="/profiles">
              <BsFillArrowLeftCircleFill />
            </GoBackLink>
          </GoBackLinkWrapper>
        </LoginFormWrapper>
      </CreateProfilePageWrapper>
    </CreateProfilePageContainer>
  );
};

export default CreateProfile;
