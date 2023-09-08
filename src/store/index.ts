import { observable } from 'mobx';

export const send_after = observable.box<number>(0);

export const tokenStore = observable.box<{ access_token: string; refresh_token: string }>({
  access_token: '',
  refresh_token: '',
});
