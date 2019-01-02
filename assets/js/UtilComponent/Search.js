import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';
import { SearchBox } from 'react-instantsearch-dom';
import { Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch(
    '57OYAZ5QGF',
    'd24d74854fd96fc71666fa57cad0c60e'
);

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