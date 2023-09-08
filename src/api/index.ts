import axios from 'axios';
import { tokenStore } from '../store';
import { action } from 'mobx';

export async function authorize(payload: { phone: string }) {
  const response = await axios
    .post<{ phone: string; send_after: number }>(
      'http://identity.goodcom.ru/api/v1/authorize/',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
    .then((result) => result.data)
    .catch((error) => {
      console.log(error);
    });
  return response;
}
export async function authorizeCheck(payload: { phone: string; code: string }) {
  const response = await axios
    .post<{ access_token: string; refresh_token: string }>(
      'http://identity.goodcom.ru/api/v1/authorize/check',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
    .then(
      action((result) => {
        if (tokenStore.get().access_token == '' || tokenStore.get().refresh_token == '') {
          tokenStore.set({ access_token: 'mock', refresh_token: 'mock' });
        }
        tokenStore.set(result.data);
      }),
    )
    .catch((error) => {
      console.log(error);
    });

  return response;
}
