// hooks
import { api } from '../../../hooks/useApi';
import { FieldValues, useForm } from 'react-hook-form';
import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
// styled components
import {
  FormInput,
  FormInputSubmit,
} from '../../../components/inputStyledComponent/style';
import {
  AddMovieForm,
  AddMovieFormWrapper,
  AddMoviePageWrapper,
  FormTitle,
} from './style';
import LoadingSpan from '../../../components/loadingSpan';
import ErrorMessageComponent from '../../../components/errorMessage';
import SuccessMessageComponent from '../../../components/successMessage';
import FormErrorMessage from '../../../components/formErrorMessage';
// context
import { AuthContext } from '../../../contexts/auth/AuthContext';
// yup validation
import { movieSchemaValidation } from '../../../validations/movieSchemaValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Movie } from '../../../types/Movie';

const AddMovie: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const auth = useContext(AuthContext);
  if (!auth.user) return <Navigate to="/login" />;

  const getToken = () => {
    const token = localStorage.getItem('authToken');
    return token;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(movieSchemaValidation),
  });

  const submitForm = async (data: FieldValues) => {
    setIsLoading(true);
    const {
      movieName,
      category,
      description,
      duration,
      releaseDate,
      movie_url,
      poster_url,
    } = data;

    const newMovieData: Movie = {
      movieName,
      category,
      description,
      duration,
      releaseDate,
      movie_url,
      poster_url,
    };

    const authToken = getToken();

    try {
      await api.post('/movie', newMovieData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setSuccessMessage('Filme criado com sucesso!');

      setTimeout(() => {
        setSuccessMessage('');
      }, 2000);

      reset();

      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsLoading(true);
      if (error) {
        setErrorMessage('Ocorreu um erro ao criar o filme...');
      }
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      setIsLoading(false);
    }
  };

  return (
    <AddMoviePageWrapper>
      <AddMovieFormWrapper>
        <FormTitle>Adicionar Filme</FormTitle>
        <AddMovieForm onSubmit={handleSubmit(submitForm)}>
          <FormInput
            type="text"
            placeholder="Digite o nome do filme..."
            {...register('movieName')}
          />
          {errors.movieName && (
            <FormErrorMessage message={errors.movieName?.message} />
          )}
          <FormInput
            type="text"
            placeholder="Digite a categoria do filme..."
            {...register('category')}
          />
          {errors.category && (
            <FormErrorMessage message={errors.category?.message} />
          )}
          <FormInput
            type="text"
            placeholder="Digite a descrição do filme..."
            {...register('description')}
          />
          {errors.description && (
            <FormErrorMessage message={errors.description?.message} />
          )}
          <FormInput
            type="text"
            placeholder="Digite a duração do filme..."
            {...register('duration')}
          />
          {errors.duration && (
            <FormErrorMessage message={errors.duration?.message} />
          )}
          <FormInput
            type="text"
            placeholder="Digite a data de lançamento do filme..."
            {...register('releaseDate')}
          />
          {errors.releaseDate && (
            <FormErrorMessage message={errors.releaseDate?.message} />
          )}
          <FormInput
            type="text"
            placeholder="Insira a URL do filme..."
            {...register('movie_url')}
          />
          {errors.movie_url && (
            <FormErrorMessage message={errors.movie_url?.message} />
          )}
          <FormInput
            type="text"
            placeholder="Insira a URL do poster do filme..."
            {...register('poster_url')}
          />
          {errors.poster_url && (
            <FormErrorMessage message={errors.poster_url?.message} />
          )}

          {successMessage && (
            <SuccessMessageComponent successMessage={successMessage} />
          )}

          {errorMessage && (
            <ErrorMessageComponent errorMessage={errorMessage} />
          )}

          {isLoading && <LoadingSpan />}

          {!isLoading && (
            <FormInputSubmit type="submit" value="Adicionar Filme" />
          )}
        </AddMovieForm>
      </AddMovieFormWrapper>
    </AddMoviePageWrapper>
  );
};

export default AddMovie;
