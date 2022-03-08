import { PoultryGenderCategoryEnum, PoultryGenderEnum } from '@cig-platform/enums';
import { advertisingFactory, breederFactory, poultryFactory } from '@cig-platform/factories';
import { render, screen, waitFor } from '@testing-library/react';

import MarketplaceBffService from '@Services/MarketplaceBffService';

import HomeContainer from '../HomeContainer';

describe('<HomeContainer />', () => {
  it('renders correctly', async () => {
    const breeder = breederFactory();
    const advertising = advertisingFactory();
    const femalePoultry = poultryFactory({
      gender: PoultryGenderEnum.Female,
      genderCategory: PoultryGenderCategoryEnum.FemaleChicken,
    });
    const matrixPoultry = poultryFactory({
      gender: PoultryGenderEnum.Female,
      genderCategory: PoultryGenderCategoryEnum.Matrix
    });
    const reproductivePoultry = poultryFactory({
      gender: PoultryGenderEnum.Male,
      genderCategory: PoultryGenderCategoryEnum.Reproductive
    });
    const malePoultry = poultryFactory({
      gender: PoultryGenderEnum.Male,
      genderCategory: PoultryGenderCategoryEnum.MaleChicken
    });
    const defaultRegister = {
      metadata: {
        measurement: 150,
        weight: 150
      }
    };
    const mockGetHome = jest.fn().mockResolvedValue({
      femaleChickens: [{
        poultry: femalePoultry,
        advertising,
        breeder,
        measurementAndWeight: defaultRegister
      }],
      maleChickens: [{
        poultry: malePoultry,
        advertising,
        breeder,
        measurementAndWeight: defaultRegister
      }],
      matrixes: [{
        poultry: matrixPoultry,
        advertising,
        breeder,
        measurementAndWeight: defaultRegister
      }],
      reproductives: [{
        poultry: reproductivePoultry,
        advertising,
        breeder,
        measurementAndWeight: defaultRegister
      }]
    });

    jest.spyOn(MarketplaceBffService, 'getHome').mockImplementation(mockGetHome);

    render(<HomeContainer />);

    expect(mockGetHome).toHaveBeenCalledTimes(1);

    await waitFor(() => expect(screen.getByText('Matrizes')).toBeInTheDocument());

    expect(screen.getByText('Reprodutores')).toBeInTheDocument();
    expect(screen.getByText('Frangos')).toBeInTheDocument();
    expect(screen.getByText('Frangas')).toBeInTheDocument();
    expect(screen.getByText(`${new Intl.DateTimeFormat('pt-BR').format(new Date(femalePoultry.birthDate))} - ${defaultRegister.metadata.measurement} CM`)).toBeInTheDocument();
    expect(screen.getByText(`${new Intl.DateTimeFormat('pt-BR').format(new Date(malePoultry.birthDate))} - ${defaultRegister.metadata.measurement} CM`)).toBeInTheDocument();
    expect(screen.getByText(`${new Intl.DateTimeFormat('pt-BR').format(new Date(matrixPoultry.birthDate))} - ${defaultRegister.metadata.measurement} CM`)).toBeInTheDocument();
    expect(screen.getByText(`${new Intl.DateTimeFormat('pt-BR').format(new Date(reproductivePoultry.birthDate))} - ${defaultRegister.metadata.measurement} CM`)).toBeInTheDocument();
  });
});
