import { action } from 'mobx';
import { send_after } from '../store';

export const timer = () => {
  const intervalId = setInterval(
    action(() => {
      if (send_after.get() === 0) {
        return clearInterval(intervalId);
      } else {
        send_after.set(send_after.get() - 1);
      }
    }),
    1000,
  );
};
