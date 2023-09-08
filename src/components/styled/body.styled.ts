import { InputMask } from 'primereact/inputmask';
import { styled } from 'styled-components';

export const InputBody = styled.div`
  justify-content: flex-start;
  align-items: center;
  display: inline-flex;
`;

export const MaskInput = styled(InputMask)`
  height: 50px;
  border: none;
  color: #414141;
  font-size: 24px;
  font-family: 'Noto Sans';
  font-weight: 500;
  padding: 0 0 0 24px;
  background-color: #a4a6a61a;

  $ > [class~='p-inputtext'] {
    color: #414141;
  }

  $ > [class~='p-inputmask'] {
    color: #a4a6a6;
  }
`;
