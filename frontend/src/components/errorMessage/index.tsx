import { ApiErrorMessageWrapper, ApiErrorMessage } from "./style";

const ErrorMessageComponent = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <ApiErrorMessageWrapper>
      <ApiErrorMessage>{errorMessage}</ApiErrorMessage>
    </ApiErrorMessageWrapper>
  );
};

export default ErrorMessageComponent;
