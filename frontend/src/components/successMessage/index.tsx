import { SuccessMessageWrapper, SuccessMessage } from './style';

const SuccessMessageComponent = ({
  successMessage,
}: {
  successMessage: string;
}) => {
  return (
    <SuccessMessageWrapper>
      <SuccessMessage>{successMessage}</SuccessMessage>
    </SuccessMessageWrapper>
  );
};

export default SuccessMessageComponent;
