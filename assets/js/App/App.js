import React, {Component} from 'react';
import Header from "./Header";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Project from "./Project";
import Article from "./Article";
import HireMe from "./HireMe";
import {getPublicPublishedPosts} from "../Api/api";
import Loader from "../Utils/Loader";
import ArticleShow from "./ArticleShow";
import ScrollToTop from "../Utils/ScrollToTop";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            isLoading: true,
            mobileNavExpand: false
        };

        this.handleMobileMenuClicked = this.handleMobileMenuClicked.bind(this);
        this.handleMobileMenuHidden = this.handleMobileMenuHidden.bind(this);
    }

    handleMobileMenuClicked() {
        this.setState((prevState) => {
            return {mobileNavExpand: !prevState.mobileNavExpand}
        })
    }

    handleMobileMenuHidden() {
        this.setState({
            mobileNavExpand: false
        })
    }

    componentDidMount() {
        getPublicPublishedPosts()
            .then((data) => {
                localStorage.setItem('articles', JSON.stringify(data['hydra:member']))

                this.setState({
                    articles: data['hydra:member'],
                    isLoading: false
                })
            });
    }

    render() {

        let component = this.state.isLoading ? <div><Loader /></div> :
            <Router>
                <ScrollToTop>
                    <div className={`font-sans antialiased`}>
                        <div className={`hidden md:block md:h-4 w-full bg-green`} />
                        <div className={`container`}>
                            <div className={`py-8 md:pt-16 md:pb-8 px-6 md:px-16 xl:pl-64`}>
                                <Header
                                    mobileNavExpand={this.state.mobileNavExpand}
                                    onMobileMenuClicked={this.handleMobileMenuClicked}
                                    onMobileMenuHidden={this.handleMobileMenuHidden}
                                />

                                <Route exact path="/articles" component={() => <Article articles={this.state.articles}/>} />
                                <Route path="/hire-me" component={HireMe} />
                                <Route path="/article/:slug" component={ArticleShow} />
                            </div>
                        </div>
                    </div>
                </ScrollToTop>
            </Router>

        return (component)
    }
}
