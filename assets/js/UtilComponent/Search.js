import React from 'react';
import algoliasearch from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch-dom';
import { SearchBox } from 'react-instantsearch-dom';
import { Hits } from 'react-instantsearch-dom';

const algoliaClient = algoliasearch('57OYAZ5QGF', 'd24d74854fd96fc71666fa57cad0c60e', {
    _useRequestCache: true,
});

const searchClient = {
    search(requests) {
        const shouldSearch = requests.some(( query ) =>  query['params']['query'] !== '' );

        if (shouldSearch) {
            return algoliaClient.search(requests);
        }

        return Promise.resolve({
            results: [{ hits: [] }],
        });
    },
    searchForFacetValues: algoliaClient.searchForFacetValues,
};

const Hit = ({ hit }) => <a href={'/admin/posts/'+ hit.objectID +'/show'}>{hit.title}</a>;

const Search = () => (
    <InstantSearch
        indexName='dev_posts'
        searchClient={searchClient}
    >
        <SearchBox />
        <Hits hitComponent={Hit} />
    </InstantSearch>
);

export default Search;