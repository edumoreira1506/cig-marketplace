import ContentSearchClient from '@cig-platform/content-search-client';

import { CONTENT_SEARCH_URL } from '@Constants/urls';

const ContentSearchService = new ContentSearchClient(CONTENT_SEARCH_URL);

export default ContentSearchService;
