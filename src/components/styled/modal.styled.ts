import { styled } from 'styled-components';

export const ModalBack = styled.div<{ $active: boolean }>`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.$active ? 1 : 0)};
  pointer-events: ${(props) => (props.$active ? 'all' : 'none')};
  transition: 0.3s;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.form`
  width: min-content;
  height: auto;
  padding: 48px 24px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 14px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;
