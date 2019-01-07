import React, {Component} from 'react';
import algoliasearch from 'algoliasearch';
import { Hits, PoweredBy, SearchBox, InstantSearch, connectStateResults} from 'react-instantsearch-dom';
import Route from "../Constants/Route";

export default class AdminSearch extends Component{
    constructor(props) {
        super(props);

        this.node = null;

        this.state = {
            showHits: false,
        };

        this.handleSearchBoxType = this.handleSearchBoxType.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick, false);
    }

    handleClick(event) {
        if (this.node == null) {
            return;
        }

        if (this.node.contains(event.target)) {
            return;
        }

        this.setState({
            showHits: false
        });
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

        const Hit = ({ hit }) => <a href={Route.home + '/'+ hit.objectID +'/show'}>{hit.title}</a>;

        const IndexResults = connectStateResults(
            ({ searchState, searchResults, children }) =>
                searchResults && searchResults.nbHits !== 0 ? (
                    children
                ) : (
                    <div className={`py-4 text-grey-darker w-full bg-white border shadow rounded border-b-0 mt-1 rounded-b-none`}>
                        <div className={`pl-3 h-8 flex items-center`}>
                            No results has been found for &quot;<b>{searchState.query}</b>&quot;
                        </div>
                    </div>
                )
        );

        return (
            <InstantSearch
                indexName={process.env.NODE_ENV === 'production' ? 'prod_posts' : 'dev_posts'}
                searchClient={searchClient}
            >
                <SearchBox onChange={this.handleSearchBoxType}/>

                { this.state.showHits &&
                    <div ref={node => this.node = node}>
                        <IndexResults>
                            <Hits hitComponent={Hit} />
                        </IndexResults>
                    </div>
                }
                { this.state.showHits && <PoweredBy />}

            </InstantSearch>
        )
    }
}
