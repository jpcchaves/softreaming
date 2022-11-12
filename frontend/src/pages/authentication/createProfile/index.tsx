import LogoImage from "../../../assets/logo/logo.png";
import ErrorMessageComponent from "../../../components/errorMessage";
import FormErrorMessage from "../../../components/formErrorMessage";
import {
  AddPhotoIcon,
  FormInput,
  FormInputFile,
  FormInputFileLabel,
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
// icon
import { MdAddPhotoAlternate } from "react-icons/md";

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

const CreateProfile: React.FC = () => {
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

    const profileName = data.profileName;
    const profileUrlImage = data.profileUrlImage[0];

    const formData = new FormData();

    formData.append("profileName", profileName);
    formData.append("profileUrlImage", profileUrlImage);

    // console.log(newProfileData);

    if (!auth.user) return <Navigate to="/login" />;

    try {
      const { id } = auth.user!;

      const getToken = () => {
        const token = localStorage.getItem("authToken");
        return token;
      };

      const authToken = getToken();

      await api.post(`/user/${id}/profiles`, formData, {
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
            <FormInputFileLabel>
              <AddPhotoIcon />
              Escolher foto de perfil
              <FormInputFile
                {...register("profileUrlImage")}
                accept=".png, .jpg, .jpeg"

              />
            </FormInputFileLabel>
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
