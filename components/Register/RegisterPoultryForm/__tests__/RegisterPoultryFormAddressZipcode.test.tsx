import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18next from 'i18next';

import { INITIAL_STATE } from '@Contexts/RegisterContext/registerReducer';
import { createRegisterContextRenderer } from '@Utils/tests/registerContextRenderer';
import * as registerActions from '@Contexts/RegisterContext/registerActions';
import CepService from '@Services/CepService';

import RegisterPoultryFormAddressZipcode from '../RegisterPoultryFormAddressZipcode';

jest.useFakeTimers();

describe('RegisterPoultryFormAddressZipcode', () => {
  it('renders correctly', () => {
    const render = createRegisterContextRenderer();

    render(<RegisterPoultryFormAddressZipcode />);

    expect(screen.getByText(String(i18next.t('poultry.fields.address.zipcode')))).toBeInTheDocument();
  });

  it('renders the address.zipcode value', () => {
    const mockStore = {
      ...INITIAL_STATE,
      poultry: {
        ...INITIAL_STATE.poultry,
        address: {
          ...INITIAL_STATE.poultry.address,
          zipcode: '123'
        }
      }
    };

    const render = createRegisterContextRenderer(mockStore);

    render(<RegisterPoultryFormAddressZipcode />);

    expect(screen.getByDisplayValue(mockStore.poultry.address.zipcode)).toBeInTheDocument();
  });

  it('calls setPoultryAddressField when input value changes', () => {
    const zipcode = '1';
    const mockSetPoultryAddressField = jest.fn();

    jest.spyOn(registerActions, 'setPoultryAddressField').mockImplementation(mockSetPoultryAddressField);

    const render = createRegisterContextRenderer();

    render(<RegisterPoultryFormAddressZipcode />);

    userEvent.type(screen.getByDisplayValue(''), zipcode);

    expect(mockSetPoultryAddressField).toHaveBeenCalledWith('zipcode', zipcode);
  });

  it('calls setPoultryAddressField three times when gets a valid response from viacep', async () => {
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
    const mockSetPoultryAddressField = jest.fn();
    const mockCepServiceGetInfo = jest.fn().mockResolvedValue(mockViaCepResponse);
    const mockStore = {
      ...INITIAL_STATE,
      poultry: {
        ...INITIAL_STATE.poultry,
        address: {
          ...INITIAL_STATE.poultry.address,
          zipcode: mockViaCepResponse.cep
        }
      }
    };

    jest.spyOn(CepService, 'getInfo').mockImplementation(mockCepServiceGetInfo);
    jest.spyOn(registerActions, 'setPoultryAddressField').mockImplementation(mockSetPoultryAddressField);

    const render = createRegisterContextRenderer(mockStore);

    await act(async () => {
      await render(<RegisterPoultryFormAddressZipcode />);

      jest.runAllTimers();
    });

    expect(mockSetPoultryAddressField).toHaveBeenCalledWith('city', mockViaCepResponse.localidade);
    expect(mockSetPoultryAddressField).toHaveBeenCalledWith('province', mockViaCepResponse.uf);
    expect(mockSetPoultryAddressField).toHaveBeenCalledWith('street', mockViaCepResponse.logradouro);
  });

  it('does not call setPoultryAddressField when gets a invalid response from viacep', async () => {
    const mockSetPoultryAddressField = jest.fn();
    const mockCepServiceGetInfo = jest.fn().mockResolvedValue({});

    jest.spyOn(CepService, 'getInfo').mockImplementation(mockCepServiceGetInfo);
    jest.spyOn(registerActions, 'setPoultryAddressField').mockImplementation(mockSetPoultryAddressField);

    const render = createRegisterContextRenderer();

    await act(async () => {
      await render(<RegisterPoultryFormAddressZipcode />);

      jest.runAllTimers();
    });

    expect(mockSetPoultryAddressField).not.toHaveBeenCalled();
  });
});
