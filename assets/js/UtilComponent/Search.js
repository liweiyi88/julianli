import React, {Component} from 'react';
import algoliasearch from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch-dom';
import { SearchBox } from 'react-instantsearch-dom';
import { Hits } from 'react-instantsearch-dom';

export default class Search extends Component{
    constructor(props) {
        super(props);

        this.state = {
            showHits: false,
        };

        this.handleSearchBoxType = this.handleSearchBoxType.bind(this);
    }

    handleSearchBoxType(event) {
        if (event.target.value.trim() !== '') {
            this.setState({
                showHits: true
            });

            return;
        }

        this.setState({
            showHits: false
        });
    }

    render() {
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

        const Hit = ({ hit }) => <a href={'/admin/posts/'+ hit.objectID +'/show'}>{hit.title}</a>

        return (
            <InstantSearch
                indexName='dev_posts'
                searchClient={searchClient}
            >
                <SearchBox onChange={this.handleSearchBoxType}/>

                { this.state.showHits && <Hits hitComponent={Hit} />}
            </InstantSearch>
        )
    }
}
