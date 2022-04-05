import { PoultryGenderCategoryEnum, PoultryGenderEnum, RegisterTypeEnum } from '@cig-platform/enums';
import { advertisingFactory, breederFactory, poultryFactory } from '@cig-platform/factories';
import { render, screen, waitFor } from '@testing-library/react';

import HomeContainer from '../HomeContainer';

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
    measurement: '150',
    weight: '150'
  },
  id: '',
  poultryId: '',
  description: '',
  date: new Date(),
  type: RegisterTypeEnum.MeasurementAndWeighing,
  files: []
};

const DEFAULT_PROPS = {
  advertisings: {
    femaleChickens: [{
      poultry: femalePoultry as any,
      advertising,
      breeder,
      measurementAndWeight: defaultRegister
    }],
    maleChickens: [{
      poultry: malePoultry  as any,
      advertising,
      breeder,
      measurementAndWeight: {
        ...defaultRegister,
        metadata: {
          measurement: '160',
          weight: '160'
        }
      }
    }],
    matrixes: [{
      poultry: matrixPoultry  as any,
      advertising,
      breeder,
      measurementAndWeight: {
        ...defaultRegister,
        metadata: {
          measurement: '170',
          weight: '170'
        }
      }
    }],
    reproductives: [{
      poultry: reproductivePoultry  as any,
      advertising,
      breeder,
      measurementAndWeight: {
        ...defaultRegister,
        metadata: {
          measurement: '180',
          weight: '180'
        }
      }
    }]
  }
};

describe('<HomeContainer />', () => {
  it('renders correctly', async () => {
    render(<HomeContainer {...DEFAULT_PROPS} />);

    await waitFor(() => expect(screen.getByText('Matrizes')).toBeInTheDocument());

    expect(screen.getByText('Reprodutores')).toBeInTheDocument();
    expect(screen.getByText('Frangos')).toBeInTheDocument();
    expect(screen.getByText('Frangas')).toBeInTheDocument();
    expect(screen.getByText(`${new Intl.DateTimeFormat('pt-BR').format(new Date(femalePoultry.birthDate))} - ${DEFAULT_PROPS.advertisings.femaleChickens[0].measurementAndWeight.metadata.measurement} CM`)).toBeInTheDocument();
    expect(screen.getByText(`${new Intl.DateTimeFormat('pt-BR').format(new Date(malePoultry.birthDate))} - ${DEFAULT_PROPS.advertisings.maleChickens[0].measurementAndWeight.metadata.measurement} CM`)).toBeInTheDocument();
    expect(screen.getByText(`${new Intl.DateTimeFormat('pt-BR').format(new Date(matrixPoultry.birthDate))} - ${DEFAULT_PROPS.advertisings.matrixes[0].measurementAndWeight.metadata.measurement} CM`)).toBeInTheDocument();
    expect(screen.getByText(`${new Intl.DateTimeFormat('pt-BR').format(new Date(reproductivePoultry.birthDate))} - ${DEFAULT_PROPS.advertisings.reproductives[0].measurementAndWeight.metadata.measurement} CM`)).toBeInTheDocument();
  });
});
