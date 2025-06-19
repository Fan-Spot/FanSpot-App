import * as S from './style';
import {Back} from '../icons';

interface HeaderTitleProps {
  title: string;
}

export const Header = ({title}: HeaderTitleProps) => {
  return (
    <S.HeaderContainer>
      <S.BackWrapper>
        <Back />
      </S.BackWrapper>
      <S.TitleWrapper>
        <S.HeaderTitle>{title}</S.HeaderTitle>
      </S.TitleWrapper>
    </S.HeaderContainer>
  );
};
