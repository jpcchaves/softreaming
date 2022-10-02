import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { ErrorMessageWrapper, ErrorMessage } from "./style";

const FormErrorMessage = ({
  message,
}: {
  message?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}) => {
  return (
    <ErrorMessageWrapper>
      <ErrorMessage>
        <>{message}</>
      </ErrorMessage>
    </ErrorMessageWrapper>
  );
};

export default FormErrorMessage;
