import { Dispatch, FC, SetStateAction, SyntheticEvent, useState } from 'react';
import { ModalBack, ModalContent } from '../styled/modal.styled';
import { InputBody, MaskInput } from '../styled/body.styled';
import { Footer } from '../styled/footer.styled';
import CustomButton from '../button';
import { CustomText, UnderlineWithAnim } from '../styled/custom-text.styled';
import { Header, HeaderText, SubHeader } from '../styled/header.styled';
import { InputMaskChangeEvent } from 'primereact/inputmask';
import { Link } from '../styled/link-styled';
import { authorize, authorizeCheck } from '../../api';
import { timer } from '../../utils/timer';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';
import { unmaskPhone } from '../../utils/unmask-phone';
import { send_after } from '../../store';

interface ModalProps {
  stage: 0 | 1 | 2;
  setStage: Dispatch<SetStateAction<0 | 1 | 2>>;
}

const Modal: FC<ModalProps> = observer(({ stage, setStage }) => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');

  const handleClickOutside = (): void => {
    setStage(0);
    setPhone('');
    setCode('');
  };

  const handleChange = (e: InputMaskChangeEvent): void => {
    if (stage === 1) {
      setPhone(e.value!);
    } else {
      setCode(e.value!);
    }
  };

  const handleStageOne = action((e: SyntheticEvent): void => {
    if (send_after.get() !== 0) {
      alert(
        `Пожалуйста, подождите окончания отсчета времени задержки. Осталось еще ${send_after.get()} секунд.`,
      );
      return;
    }

    const unmasked = unmaskPhone(phone);

    if (unmasked.length < 11) {
      alert('Ошибка! Введите корректный номер телефона!');
      e.preventDefault();
    } else {
      const response = authorize({ phone: unmasked })
        .then(
          action((result) => {
            if (result == undefined) {
              send_after.set(60);
            } else send_after.set(result.send_after);
          }),
        )
        .finally(
          action(() => {
            timer();
          }),
        );
      setStage(2);
    }
  });

  const handleResendCode = (e: SyntheticEvent): void => {
    handleStageOne(e);
  };

  const handleStageTwo = (e: SyntheticEvent<Element, Event>): void => {
    if (code.length < 4) {
      alert('Ошибка! Неправильный код телефона!');
      e.preventDefault();
    } else {
      const response = authorizeCheck({ phone: unmaskPhone(phone), code: code }).finally(() =>
        handleClickOutside(),
      );
    }
  };

  const handleBackStageOne = (): void => {
    setStage(1);
    setPhone('');
  };

  return (
    <ModalBack $active={stage !== 0} onClick={handleClickOutside}>
      {stage === 1 ? (
        <ModalContent onClick={(e) => e.stopPropagation()} onSubmit={handleStageOne}>
          <Header>
            <HeaderText>приветствуем вас</HeaderText>
          </Header>
          <CustomText $size="16px" $font="Noto Sans" $weight={500} $color="#6A6B6B">
            Авторизируйтесь в личный кабинет по номеру телефона:
          </CustomText>
          <InputBody>
            <MaskInput
              mask="+7 (999) 999-99-99"
              placeholder="+7 (___) ___-__-__"
              onChange={handleChange}
            />
            <CustomButton type="submit" title="продолжить" />
          </InputBody>
          <Footer>
            Нажимая кнопку "Продолжить", вы принимаете{' '}
            <Link href="#">Соглашение об условиях доставки</Link> и{' '}
            <Link href="#">Политику обработки персональных данных</Link>
          </Footer>
        </ModalContent>
      ) : stage === 2 ? (
        <ModalContent onClick={(e) => e.stopPropagation()} onSubmit={handleStageTwo}>
          <Header>
            <HeaderText>введите код из СМС</HeaderText>
            <SubHeader>
              <CustomText $color="#414141" $font="'Roboto'" $size="20px" $weight={400}>
                {phone}
              </CustomText>
              <UnderlineWithAnim
                $color="#A4A6A6"
                $size="16px"
                $font="Roboto"
                $weight={500}
                onClick={handleBackStageOne}>
                изменить номер
              </UnderlineWithAnim>
            </SubHeader>
          </Header>
          <CustomText $size="18px" $font="Roboto" $weight={500} $color="#6A6B6B">
            Введите 4-х значный код из СМС
          </CustomText>
          <InputBody>
            <MaskInput placeholder="XXXX" mask="9999" slotChar="X" onChange={handleChange} />
            <CustomButton type="submit" title="войти" />
          </InputBody>
          <Footer>
            <UnderlineWithAnim
              $size="18px"
              $weight={500}
              $font="Roboto"
              $color="#A4A6A6"
              onClick={handleResendCode}>
              {send_after.get() !== 0
                ? `отправить код еще раз через ${send_after} сек.`
                : `отправить код еще раз`}
            </UnderlineWithAnim>
          </Footer>
        </ModalContent>
      ) : (
        <></>
      )}
      ;
    </ModalBack>
  );
});

export default Modal;
