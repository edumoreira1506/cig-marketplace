import { IAdvertisingFavorite } from '@cig-platform/types';
import { PoultryData } from '@Hooks/useSearchAdvertisings';

export const poultryDataToSearchAdvertising = (poultryData: PoultryData, favorites: IAdvertisingFavorite[] = []) => ({
  title: poultryData.poultry.name,
  price: poultryData.advertising.price,
  description: `${[
    poultryData.poultry.birthDate ? new Intl.DateTimeFormat('pt-BR').format(new Date(poultryData.poultry.birthDate)) : '',
    poultryData?.measurementAndWeight?.metadata?.measurement ? `${poultryData.measurementAndWeight.metadata.measurement} CM` : ''
  ].filter(Boolean).join(' - ')}`,
  image: poultryData.poultry.mainImage ? `https://cig-maketplace.s3.sa-east-1.amazonaws.com/poultries/images/${poultryData.poultry.mainImage}` : undefined,
  id: poultryData.advertising.id,
  breederId: poultryData.breeder.id,
  poultryId: poultryData.poultry.id,
  favorited: favorites.some(f => f.advertisingId === poultryData.advertising.id),
  breederImage: poultryData.breeder.profileImageUrl ? `https://cig-maketplace.s3.sa-east-1.amazonaws.com/breeders/profile/${poultryData.breeder.profileImageUrl}` : undefined
});
