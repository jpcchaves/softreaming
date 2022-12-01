import LogoImage from '../../../assets/logo/logo.png';
import ErrorMessageComponent from '../../../components/errorMessage';
import FormErrorMessage from '../../../components/formErrorMessage';
import {
  AddPhotoIcon,
  FormInput,
  FormInputFile,
  FormInputFileLabel,
  FormInputSubmit,
} from '../../../components/inputStyledComponent/style';
import LoadingSpan from '../../../components/loadingSpan';
import {
  CreateProfilePageContainer,
  CreateProfilePageWrapper,
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
} from './style';
// hook forms
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// yup schema validation
import { createProfileValidation } from '../../../validations/authSchemaValidation';
// hooks
import { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
// axios
import { api } from '../../../hooks/useApi';
// context
import { AuthContext } from '../../../contexts/auth/AuthContext';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';

const CreateProfile: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileImageName, setProfileImageName] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  // navigate hook
  const navigate = useNavigate();

  // context
  const auth = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(createProfileValidation),
  });

  const covert2base64 = (file: Blob) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        setImagePreview(reader.result?.toString());
      }
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    watch('profileUrlImage');

    if (watch('profileUrlImage')[0]) {
      setProfileImageName(watch('profileUrlImage')[0].name);

      covert2base64(watch('profileUrlImage')[0]);
    }
  }, [watch('profileUrlImage')]);

  const submitForm = async (data: FieldValues) => {
    setIsLoading(true);

    const profileName = data.profileName;
    const profileUrlImage = data.profileUrlImage[0];

    const formData = new FormData();

    formData.append('profileName', profileName);
    formData.append('profileUrlImage', profileUrlImage);

    if (!auth.user) return <Navigate to="/login" />;

    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { id } = auth.user!;

      const getToken = () => {
        const token = localStorage.getItem('authToken');
        return token;
      };

      const authToken = getToken();

      await api.post(`/profiles/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setIsLoading(false);

      navigate('/profiles');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsLoading(true);

      setErrorMessage(
        'Ocorreu um erro ao criar o perfil! Tente novamente mais tarde...'
      );
      setIsLoading(false);

      setTimeout(() => {
        setErrorMessage('');
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
              {...register('profileName')}
            />
            {errors.profileName && (
              <FormErrorMessage message={errors.profileName?.message} />
            )}

            {imagePreview ? (
              <ImagePreviewWrapper>
                <ImagePreviewText>Sua imagem ficará assim:</ImagePreviewText>
                <ImageWrapper>
                  <ProfileImage
                    src={imagePreview}
                    alt="imagem de perfil do usuário"
                  />
                </ImageWrapper>
              </ImagePreviewWrapper>
            ) : null}
            <FormInputFile
              {...register('profileUrlImage')}
              accept=".png, .jpg, .jpeg"
              id="input-file"
            />
            <FormInputFileLabel htmlFor="input-file">
              <AddPhotoIcon />
              {profileImageName || 'Escolher foto de perfil'}
            </FormInputFileLabel>
            {errors.profileUrlImage && (
              <FormErrorMessage message={errors.profileUrlImage?.message} />
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
