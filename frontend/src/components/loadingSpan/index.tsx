import {
  LoaderSpan,
  LoadingMessage,
  SubmitButtonDisabled,
  SubmitButtonWrapper,
} from "./style";

const LoadingSpan: React.FC = () => {
  return (
    <SubmitButtonWrapper>
      <SubmitButtonDisabled disabled>
        <LoaderSpan></LoaderSpan>
        <LoadingMessage>Carregando...</LoadingMessage>
      </SubmitButtonDisabled>
    </SubmitButtonWrapper>
  );
};

export default LoadingSpan;
