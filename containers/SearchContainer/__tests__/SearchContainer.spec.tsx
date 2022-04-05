import { advertisingFactory, breederFactory, poultryFactory } from '@cig-platform/factories';
import { render, screen, waitFor } from '@testing-library/react';
import * as NextRouter from 'next/router';
import userEvent from '@testing-library/user-event';

import ContentSearchService from '@Services/ContentSearchService';

import SearchContainer, {
  crestListItems,
  dewlapListItems,
  genderCategoryListItems,
  genderListItems,
  sortListItems,
  tailListItems,
  typeListItems,
} from '../SearchContainer';
import { createRouterWrapper } from '@Utils/tests/wrappers';

describe('<SearchContainer />', () => {
  it('renders correctly', async () => {
    const measurementAndWeight = {
      metadata: {
        weight: 150,
        measurement: 150
      }
    };
    const firstSearchItem = {
      advertising: advertisingFactory(),
      breeder: breederFactory(),
      poultry: poultryFactory(),
      measurementAndWeight
    };
    const secondSearchItem = {
      advertising: advertisingFactory(),
      breeder: breederFactory(),
      poultry: poultryFactory(),
      measurementAndWeight: {
        metadata: {}
      }
    };
    const advertisings = [firstSearchItem, secondSearchItem] as any[];
    const pages = 1;
    const mockGetSearch = jest.fn().mockResolvedValue({
      pages,
      advertisings
    });
    const RouterWrapper = createRouterWrapper('/', '/');

    jest.spyOn(ContentSearchService, 'getSearch').mockImplementation(mockGetSearch);

    render(
      <RouterWrapper>
        <SearchContainer advertisings={advertisings} />
      </RouterWrapper>
    );

    expect(screen.getByText('Ordenar')).toBeInTheDocument();
    expect(screen.getByText('Filtrar')).toBeInTheDocument();

    await waitFor(async () => 
      expect(screen.getByText(`${new Intl.DateTimeFormat('pt-BR').format(new Date(firstSearchItem.poultry.birthDate))} - ${measurementAndWeight.metadata.measurement} CM`)).toBeInTheDocument()
    );

    expect(screen.getByText(new Intl.DateTimeFormat('pt-BR').format(new Date(secondSearchItem.poultry.birthDate)))).toBeInTheDocument();
  });

  it('the sort modal works correctly', () => {
    const measurementAndWeight = {
      metadata: {
        weight: 150,
        measurement: 150
      }
    };
    const advertisingItem = {
      advertising: advertisingFactory(),
      breeder: breederFactory(),
      poultry: poultryFactory(),
      measurementAndWeight
    };
    const pages = 1;
    const mockGetSearch = jest.fn().mockResolvedValue({
      pages,
      advertisings: [advertisingItem]
    });
    const RouterWrapper = createRouterWrapper('/', '/');

    jest.spyOn(ContentSearchService, 'getSearch').mockImplementation(mockGetSearch);

    render(
      <RouterWrapper>
        <SearchContainer />
      </RouterWrapper>
    );

    userEvent.click(screen.getByText('Ordenar'));

    expect(screen.getByText('Ordenação')).toBeInTheDocument();
  });

  it('applies sort filter', async () => {
    const measurementAndWeight = {
      metadata: {
        weight: 150,
        measurement: 150
      }
    };
    const advertisingItem = {
      advertising: advertisingFactory(),
      breeder: breederFactory(),
      poultry: poultryFactory(),
      measurementAndWeight
    };
    const pages = 1;
    const mockGetSearch = jest.fn().mockResolvedValue({
      pages,
      advertisings: [advertisingItem]
    });
    const mockPush = jest.fn();
    const query = {};
    const mockUseRouter = jest.fn().mockReturnValue({
      push: mockPush,
      query
    });

    jest.spyOn(ContentSearchService, 'getSearch').mockImplementation(mockGetSearch);
    jest.spyOn(NextRouter, 'useRouter').mockImplementation(mockUseRouter);

    render(<SearchContainer />);

    const [sortOption] = sortListItems;

    userEvent.click(screen.getByText('Ordenar'));
    userEvent.click(screen.getByText(sortOption.label));
    
    await waitFor(async () => expect(screen.queryByText('Ordenação')).not.toBeInTheDocument());

    expect(mockPush).toHaveBeenCalledWith(`/search?${new URLSearchParams({ ...query, sort: sortOption.value }).toString()}`);
  });

  it('the filters modal works correctly', () => {
    const measurementAndWeight = {
      metadata: {
        weight: 150,
        measurement: 150
      }
    };
    const advertisingItem = {
      advertising: advertisingFactory(),
      breeder: breederFactory(),
      poultry: poultryFactory(),
      measurementAndWeight
    };
    const pages = 1;
    const mockGetSearch = jest.fn().mockResolvedValue({
      pages,
      advertisings: [advertisingItem]
    });
    const RouterWrapper = createRouterWrapper('/', '/');

    jest.spyOn(ContentSearchService, 'getSearch').mockImplementation(mockGetSearch);

    render(
      <RouterWrapper>
        <SearchContainer />
      </RouterWrapper>
    );

    userEvent.click(screen.getByText('Filtrar'));

    expect(screen.getByText('Filtros')).toBeInTheDocument();
  });

  it('applies the filters', async () => {
    const measurementAndWeight = {
      metadata: {
        weight: 150,
        measurement: 150
      }
    };
    const advertisingItem = {
      advertising: advertisingFactory(),
      breeder: breederFactory(),
      poultry: poultryFactory(),
      measurementAndWeight
    };
    const pages = 1;
    const mockGetSearch = jest.fn().mockResolvedValue({
      pages,
      advertisings: [advertisingItem]
    });
    const mockPush = jest.fn();
    const query = {
      token: 'fake-token'
    };
    const mockUseRouter = jest.fn().mockReturnValue({
      push: mockPush,
      query
    });

    jest.spyOn(ContentSearchService, 'getSearch').mockImplementation(mockGetSearch);
    jest.spyOn(NextRouter, 'useRouter').mockImplementation(mockUseRouter);

    render(<SearchContainer />);

    userEvent.click(screen.getByText('Filtrar'));
    userEvent.click(screen.getByText('Crista'));

    crestListItems.forEach(crest => {
      userEvent.click(screen.getByText(crest.label));
    });

    userEvent.click(screen.getByText('Barbela'));

    dewlapListItems.forEach(dewlap => {
      userEvent.click(screen.getByText(dewlap.label));
    });

    userEvent.click(screen.getByText('Sexo'));

    genderListItems.forEach(gender => {
      userEvent.click(screen.getByText(gender.label));
    });

    userEvent.click(screen.getByText('Sexagem'));

    genderCategoryListItems.forEach(genderCategory => {
      userEvent.click(screen.getByText(genderCategory.label));
    });

    userEvent.click(screen.getByText('Rabo'));

    tailListItems.forEach(tail => {
      userEvent.click(screen.getByText(tail.label));
    });

    userEvent.click(screen.getByText('Raça'));

    typeListItems.forEach(type => {
      userEvent.click(screen.getByText(type.label));
    });

    userEvent.click(screen.getByText('Favoritos'));
    userEvent.click(screen.getByText('Ativo'));

    userEvent.click(screen.getByText('Preços'));

    userEvent.type(screen.getByDisplayValue('R$ 1,00'), '000');
    userEvent.type(screen.getByDisplayValue('R$ 100.000,00'), '{backspace}'); 

    userEvent.click(screen.getByText('Confirmar'));

    await waitFor(async () => expect(screen.queryByText('Filtros')).not.toBeInTheDocument());

    expect(mockPush).toHaveBeenCalledWith(`/search?${new URLSearchParams({
      ...query,
      crest: crestListItems.map(c => c.value).join(','),
      dewlap: dewlapListItems.map(c => c.value).join(','),
      genderCategory: genderCategoryListItems.map(c => c.value).join(','),
      gender: genderListItems.map(c => c.value).join(','),
      sort:  '',
      tail: tailListItems.map(c => c.value).join(','),
      type: typeListItems.map(c => c.value).join(','),
      favorites: 'true',
      prices: JSON.stringify({ min: 100000, max: 1000000 })
    }).toString()}`);
  });

  it('does not render favorites filter', async () => {
    const pages = 1;
    const mockGetSearch = jest.fn().mockResolvedValue({
      pages,
      advertisings: []
    });
    const mockPush = jest.fn();
    const query = {};
    const mockUseRouter = jest.fn().mockReturnValue({
      push: mockPush,
      query
    });

    jest.spyOn(ContentSearchService, 'getSearch').mockImplementation(mockGetSearch);
    jest.spyOn(NextRouter, 'useRouter').mockImplementation(mockUseRouter);

    render(<SearchContainer />);

    userEvent.click(screen.getByText('Filtrar'));
    
    expect(screen.queryByText('Favoritos')).not.toBeInTheDocument();
  });
});
