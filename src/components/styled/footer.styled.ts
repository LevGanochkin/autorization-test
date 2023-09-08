import { styled } from 'styled-components';

export const Footer = styled.label<{ font?: string }>`
  text-align: center;
  font-size: 14px;
  font-family: ${(props) => (props.font ? props.font : 'Noto Sans')};
  font-weight: 400;
  color: #a4a6a6;
  padding-bottom: 12px;
`;
