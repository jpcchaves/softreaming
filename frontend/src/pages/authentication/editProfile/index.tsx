// logo
import LogoImage from "../../../assets/logo/logo.png";
// components
import ErrorMessageComponent from "../../../components/errorMessage";
import FormErrorMessage from "../../../components/formErrorMessage";
import LoadingSpan from "../../../components/loadingSpan";
import {
  AddPhotoIcon,
  FormInput,
  FormInputFile,
  FormInputFileLabel,
  FormInputSubmit,
} from "../../../components/inputStyledComponent/style";
import {
  CurrentProfileImage,
  CurrentProfileImagePreviewWrapper,
  CurrentProfileImageText,
  CurrentProfileImageWrapper,
  EditProfilePageContainer,
  EditProfilePageWrapper,
  FormTitle,
  GoBackLink,
  GoBackLinkWrapper,
  ImagePreviewText,
  ImagePreviewWrapper,
  ImageWrapper,
  LoginForm,
  LoginFormWrapper,
  Logo,
  LogoContainer,
  LogoWrapper,
  ProfileImage,
} from "./style";
// hook forms
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// yup schema validation
import { createProfileValidation } from "../../../validations/authSchemaValidation";
// hooks
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
// axios
import { api } from "../../../hooks/useApi";
// context
import { AuthContext } from "../../../contexts/auth/AuthContext";
import { Profiles } from "../../../types/ProfilesEditPage";
// icon
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

const CreateProfile: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userProfiles, setUserProfiles] = useState<Profiles[]>([]);
  const [profileImageName, setProfileImageName] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  // navigate hook
  const navigate = useNavigate();

  // context
  const auth = useContext(AuthContext);

  // profile id URL param
  const { profileId } = useParams();

  // user id
  const { id } = auth.user!;

  const getToken = () => {
    const token = localStorage.getItem("authToken");
    return token;
  };

  useEffect(() => {
    const getUserProfiles = async () => {
      const authToken = getToken();

      const profiles = await api.get(`/user/${id}/profiles`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUserProfiles(profiles.data.profiles);
    };
    getUserProfiles();
  }, []);

  const profileBeingEdited = userProfiles.filter((profile) => {
    return profile.id == profileId;
  });

  const {
    profileName: profileNamePlaceholder,
    profileUrlImage: profileUrlImagePlaceholder,
  } = profileBeingEdited[0] || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setFocus,
  } = useForm({
    resolver: yupResolver(createProfileValidation),
  });

  const covert2base64 = (file: any) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        setImagePreview(reader.result?.toString());
      }
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    watch("profileUrlImage");

    if (watch("profileUrlImage")[0]) {
      setProfileImageName(watch("profileUrlImage")[0].name);

      covert2base64(watch("profileUrlImage")[0]);
    }
  }, [watch("profileUrlImage")]);

  setTimeout(() => {
    setFocus("profileName", {
      shouldSelect: false,
    });
  }, 100);

  setTimeout(() => {
    setFocus("profileUrlImage", {
      shouldSelect: false,
    });
  }, 120);

  const submitForm = async (data: FieldValues) => {
    setIsLoading(true);

    const profileName = data.profileName;
    const profileUrlImage = data.profileUrlImage[0];

    const formData = new FormData();

    formData.append("profileName", profileName);
    formData.append("profileUrlImage", profileUrlImage);

    if (!auth.user) return <Navigate to="/login" />;

    try {
      const authToken = getToken();

      await api.put(`/profiles/${id}/${profileId}`, formData, {
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
            {profileUrlImagePlaceholder && (
              <CurrentProfileImagePreviewWrapper>
                <CurrentProfileImageText>
                  Imagem de perfil atual:
                </CurrentProfileImageText>
                <CurrentProfileImageWrapper>
                  <CurrentProfileImage
                    src={profileUrlImagePlaceholder}
                    alt={`${profileNamePlaceholder}`}
                  />
                </CurrentProfileImageWrapper>
              </CurrentProfileImagePreviewWrapper>
            )}
            <FormInput
              type="text"
              placeholder={profileNamePlaceholder || "Buscando dados..."}
              defaultValue={profileNamePlaceholder}
              {...register("profileName")}
            />
            {errors.profileName && (
              <FormErrorMessage message={errors.profileName?.message} />
            )}

            <FormInputFile
              {...register("profileUrlImage")}
              accept=".png, .jpg, .jpeg"
              id="input-file"
            />
            <FormInputFileLabel htmlFor="input-file">
              <AddPhotoIcon />
              {profileImageName || "Escolher nova foto de perfil"}
            </FormInputFileLabel>

            {imagePreview ? (
              <ImagePreviewWrapper>
                <ImagePreviewText>
                  Sua nova imagem ficará assim:
                </ImagePreviewText>
                <ImageWrapper>
                  <ProfileImage
                    src={imagePreview}
                    alt="imagem de perfil do usuário"
                  />
                </ImageWrapper>
              </ImagePreviewWrapper>
            ) : null}

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
          <GoBackLinkWrapper>
            <GoBackLink to="/profiles">
              <BsFillArrowLeftCircleFill />
            </GoBackLink>
          </GoBackLinkWrapper>
        </LoginFormWrapper>
      </EditProfilePageWrapper>
    </EditProfilePageContainer>
  );
};

export default CreateProfile;
