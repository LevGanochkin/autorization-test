import { styled } from 'styled-components';

interface CustomTextStyles {
  $size?: string;
  $weight?: number;
  $font?: string;
  $color?: string;
}

export const CustomText = styled.label<CustomTextStyles>`
  color: ${(props) => props.$color};
  font-size: ${(props) => props.$size};
  font-family: ${(props) => props.$font};
  font-weight: ${(props) => props.$weight};
`;

export const UnderlineWithAnim = styled(CustomText)`
  text-decoration: underline;

  &:hover {
    cursor: pointer;
    opacity: 0.85;
  }
`;
