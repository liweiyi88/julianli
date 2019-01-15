import React, {Component} from 'react';
import Header from "./Header";
import {HashRouter, Route} from "react-router-dom";
import Home from "./Home";
import Project from "./Project";
import Article from "./Article";
import HireMe from "./HireMe";
import {getPosts} from "../Api/api";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: []
        };
    }

    componentDidMount() {
        getPosts()
            .then((data) => {
                this.setState({
                    articles: data['hydra:member']
                })
            });
    }

    render() {
        return (
            <HashRouter>
                <div className={`font-sans antialiased`}>
                    <div className={`h-4 w-full bg-green`} />
                    <div className={`container`}>
                        <div className={`pt-16 pb-8 px-6 md:px-32 xl:px-64`}>
                            <Header />

                            <Route exact path="/" component={Home} />
                            <Route path="/projects" component={Project} />
                            <Route path="/articles" component={() => <Article articles={this.state.articles}/>} />
                            <Route path="/hire-me" component={HireMe} />
                        </div>
                    </div>
                </div>
            </HashRouter>
        )
    }
}
