// components
import ErrorMessageComponent from '../../../components/errorMessage';
import FormErrorMessage from '../../../components/formErrorMessage';
import LoadingSpan from '../../../components/loadingSpan';
import {
  FormInput,
  FormInputSubmit,
} from '../../../components/inputStyledComponent/style';
import SuccessMessageComponent from '../../../components/successMessage';
// hook forms
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// yup schema validation
import { updateUserValidation } from '../../../validations/authSchemaValidation';
// hooks
import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
// axios
import { api } from '../../../hooks/useApi';
// context
import { AuthContext } from '../../../contexts/auth/AuthContext';
import {
  FormTitle,
  EditForm,
  EditFormWrapper,
  UserDetailsPageWrapper,
} from './style';

const UserDetails: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const auth = useContext(AuthContext);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { userName: name } = auth.user!;

  if (!auth.user) return <Navigate to="/login" />;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(updateUserValidation),
  });

  const submitForm = async (data: FieldValues) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { id } = auth.user!;

    const { userName, password } = data;

    const newUserData = {
      userName,
      password,
    };

    try {
      setIsLoading(true);
      const getToken = () => {
        const token = localStorage.getItem('authToken');
        return token;
      };

      const authToken = getToken();

      await api.put(`/user/${id}`, newUserData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setIsLoading(false);

      setSuccessMessage('Usuário editado com sucesso!');

      reset();

      setTimeout(() => {
        setSuccessMessage('');
      }, 1500);
    } catch (error) {
      setIsLoading(true);
      setErrorMessage(
        'Ocorreu um erro ao editar o usuário. Tente novamente mais tarde...'
      );
      setTimeout(() => {
        setErrorMessage('');
      }, 1500);
    }
    setIsLoading(false);
  };

  return (
    <UserDetailsPageWrapper>
      <EditFormWrapper>
        <FormTitle>Editar Usuário</FormTitle>
        <EditForm onSubmit={handleSubmit(submitForm)}>
          <FormInput
            type="text"
            placeholder="Digite o novo nome de usuário..."
            {...register('userName')}
            defaultValue={name}
          />
          {errors.userName && (
            <FormErrorMessage message={errors.userName?.message} />
          )}
          <FormInput
            type="password"
            placeholder="Insira sua nova senha..."
            {...register('password')}
          />
          {errors.password && (
            <FormErrorMessage message={errors.password?.message} />
          )}

          {successMessage && (
            <SuccessMessageComponent successMessage={successMessage} />
          )}

          {errorMessage && (
            <ErrorMessageComponent errorMessage={errorMessage} />
          )}

          {isLoading && <LoadingSpan />}

          {!isLoading && (
            <FormInputSubmit type="submit" value="Editar Usuário" />
          )}
        </EditForm>
      </EditFormWrapper>
    </UserDetailsPageWrapper>
  );
};

export default UserDetails;
