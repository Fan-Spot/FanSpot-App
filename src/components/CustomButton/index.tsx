import * as S from './style';

interface CustomButtonProps {
  onPress: () => void;
  inValid?: boolean;
}

export const CustomButton = ({onPress, inValid = false}: CustomButtonProps) => {
  return (
    <S.ButtonContainer
      disabled={inValid}
      active={!inValid}
      onPress={!inValid ? onPress : undefined}>
      <S.ButtonTitle>다음</S.ButtonTitle>
    </S.ButtonContainer>
  );
};
