import styled from 'styled-components/native';
import {theme} from '../../styles';

interface StyledProps {
  active: boolean;
}

export const ButtonContainer = styled.Pressable<StyledProps>`
  position: relative;
  width: 100%;
  height: 48px;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  background-color: ${({active}) => (active ? theme.gray700 : theme.primary3)};
`;

export const ButtonTitle = styled.Text`
  color: ${theme.white};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0px;
`;
