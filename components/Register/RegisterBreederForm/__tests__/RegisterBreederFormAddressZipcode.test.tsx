import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18next from 'i18next';

import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';
import { createRegisterContextRenderer } from '@Utils/tests/registerContextRenderer';
import * as registerActions from '@Contexts/RegisterContext/registerActions';
import CepService from '@Services/CepService';

import RegisterBreederFormAddressZipcode from '../RegisterBreederFormAddressZipcode';

jest.useFakeTimers();

jest.mock('next/dynamic', () => () => {
  const DynamicComponent = ({ label, onChange, placeholder, value }: {
    label: string;
    onChange: (newValue: string) => void;
    placeholder: string;
    value: string;
  }) => (
    <>
      <label>{label}</label>
      <input value={value} type="text" onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </>
  );
  DynamicComponent.displayName = 'DynamicComponent';
  DynamicComponent.preload = jest.fn();
  return DynamicComponent;
});

describe('RegisterBreederFormAddressZipcode', () => {
  it('renders correctly', () => {
    const render = createRegisterContextRenderer();

    render(<RegisterBreederFormAddressZipcode />);

    expect(screen.getByText(String(i18next.t('breeder.fields.address.zipcode')))).toBeInTheDocument();
  });

  it('renders the address.zipcode value', () => {
    const mockStore = {
      ...INITIAL_STATE,
      breeder: {
        ...INITIAL_STATE.breeder,
        address: {
          ...INITIAL_STATE.breeder.address,
          zipcode: '123'
        }
      }
    };

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterBreederFormAddressZipcode />);

    expect(screen.getByDisplayValue(mockStore.breeder.address.zipcode)).toBeInTheDocument();
  });

  it('calls setBreederAddressField when input value changes', () => {
    const zipcode = '1';
    const mockSetBreederAddressField = jest.fn();

    jest.spyOn(registerActions, 'setBreederAddressField').mockImplementation(mockSetBreederAddressField);

    const render = createRegisterContextRenderer();

    render(<RegisterBreederFormAddressZipcode />);

    userEvent.type(screen.getByDisplayValue(''), zipcode);

    expect(mockSetBreederAddressField).toHaveBeenCalledWith('zipcode', zipcode);
  });

  it('calls setBreederAddressField three times when gets a valid response from viacep', async () => {
    const mockViaCepResponse =  {
      cep: '01001-000',
      logradouro: 'Praça da Sé',
      complemento: 'lado ímpar',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP',
      ibge: '3550308',
      gia: '1004',
      ddd: '11',
      siafi: '7107'
    };
    const mockSetBreederAddressField = jest.fn();
    const mockCepServiceGetInfo = jest.fn().mockResolvedValue(mockViaCepResponse);
    const mockStore = {
      ...INITIAL_STATE,
      breeder: {
        ...INITIAL_STATE.breeder,
        address: {
          ...INITIAL_STATE.breeder.address,
          zipcode: mockViaCepResponse.cep
        }
      }
    };

    jest.spyOn(CepService, 'getInfo').mockImplementation(mockCepServiceGetInfo);
    jest.spyOn(registerActions, 'setBreederAddressField').mockImplementation(mockSetBreederAddressField);

    const render = createRegisterContextRenderer(mockStore);

    await act(async () => {
      await render(<RegisterBreederFormAddressZipcode />);

      jest.runAllTimers();
    });

    expect(mockSetBreederAddressField).toHaveBeenCalledWith('city', mockViaCepResponse.localidade);
    expect(mockSetBreederAddressField).toHaveBeenCalledWith('province', mockViaCepResponse.uf);
    expect(mockSetBreederAddressField).toHaveBeenCalledWith('street', mockViaCepResponse.logradouro);
  });

  it('does not call setBreederAddressField when gets a invalid response from viacep', async () => {
    const mockSetBreederAddressField = jest.fn();
    const mockCepServiceGetInfo = jest.fn().mockResolvedValue({});

    jest.spyOn(CepService, 'getInfo').mockImplementation(mockCepServiceGetInfo);
    jest.spyOn(registerActions, 'setBreederAddressField').mockImplementation(mockSetBreederAddressField);

    const render = createRegisterContextRenderer();

    await act(async () => {
      await render(<RegisterBreederFormAddressZipcode />);

      jest.runAllTimers();
    });

    expect(mockSetBreederAddressField).not.toHaveBeenCalled();
  });
});
