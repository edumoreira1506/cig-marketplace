import { PoultryGenderCategoryEnum, PoultryGenderEnum, RegisterTypeEnum } from '@cig-platform/enums';
import { advertisingFactory, breederFactory, poultryFactory } from '@cig-platform/factories';
import { screen, waitFor } from '@testing-library/react';
import { render } from '@Utils/tests/rtl';
import { QueryClient, QueryClientProvider } from 'react-query';

import HomeContainer from '../HomeContainer';

const breeder = breederFactory();
const advertising = advertisingFactory();
const femalePoultry = poultryFactory({
  gender: PoultryGenderEnum.Female,
  genderCategory: PoultryGenderCategoryEnum.FemaleChicken,
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
  carousels: [
    {
      title: 'Título teste',
      identifier: 'something',
      advertisings: [
        {
          poultry: femalePoultry as any,
          advertising,
          breeder,
          measurementAndWeight: {
            ...defaultRegister,
            metadata: {
              measurement: '160',
              weight: '160'
            }
          }
        }
      ]
    }
  ]
};

const queryClient = new QueryClient();

describe('<HomeContainer />', () => {
  it('renders correctly', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <HomeContainer {...DEFAULT_PROPS} />
      </QueryClientProvider>
    );

    await waitFor(() => expect(screen.getByText(DEFAULT_PROPS.carousels[0].title)).toBeInTheDocument());

    expect(screen.getByText(`${new Intl.DateTimeFormat('pt-BR').format(new Date(femalePoultry.birthDate))} - ${DEFAULT_PROPS.carousels[0].advertisings[0].measurementAndWeight.metadata.measurement} CM`)).toBeInTheDocument();
  });
});
