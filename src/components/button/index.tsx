import { FC } from 'react';
import { ButtonLayout } from '../styled/button.styled';
import arrow from '../../assets/right_arrow.png';
import { Icon } from '../styled/Icon.styled';
interface CustomButtonProps {
  title: string;
  type: 'submit' | 'button';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const CustomButton: FC<CustomButtonProps> = ({ title, type, onClick }) => {
  return (
    <ButtonLayout type={type} onClick={onClick}>
      {title}
      <Icon hidden={type === 'button'} src={arrow} alt="Arrow sign" />
    </ButtonLayout>
  );
};

export default CustomButton;
