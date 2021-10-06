import Swal from 'sweetalert2';
import { TFunction } from 'i18next';

export const error = (message: string, t: TFunction) => Swal.fire(
  t('common.ops'),
  message,
  'error'
);

export const success = (message: string, t: TFunction, callback?: () => void) => Swal.fire(
  t('common.success'),
  message,
  'success'
).then(() => {
  if (callback) {
    callback();
  }
});

export const withInput = async (message: string, callback: (value: string) => void, t: TFunction) => {
  const { value } = await Swal.fire({
    title: message,
    input: 'text',
    inputValue: '',
    showCancelButton: true,
    inputValidator: (string) => {
      if (!string) return t('common.empty-error', { field: t('user.fields.email') });

      return null;
    },
  });

  if (value) return callback(value);
};
