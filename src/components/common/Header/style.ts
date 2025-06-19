import styled from 'styled-components/native';
import {theme} from '../../../styles';

export const HeaderContainer = styled.View`
  position: relative;
  width: 100%;
  height: 55px;
  background-color: ${theme.background};
  justify-content: center;
  align-items: center;
`;

export const BackWrapper = styled.View`
  position: absolute;
  left: 22px;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const TitleWrapper = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const HeaderTitle = styled.Text`
  color: ${theme.gray100};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0px;
`;
