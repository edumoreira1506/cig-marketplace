import MarketplaceBffClient from '@cig-platform/marketplace-bff-client';

import { MARKETPLACE_BFF_URL } from '@Constants/urls';

const BackofficeBffService = new MarketplaceBffClient(MARKETPLACE_BFF_URL);

export default BackofficeBffService;
