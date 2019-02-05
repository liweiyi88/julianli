import React, {Component} from 'react';
import Header from "./Header";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
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

    render() {
        return (
            <div className={`font-sans antialiased`}>
                <div className={`hidden md:block md:h-4 w-full bg-green`} />
                <div className={`container`}>
                    <div className={`py-8 md:pt-16 md:pb-8 px-6 md:px-16 xl:pl-64`}>
                        <Header
                            mobileNavExpand={this.state.mobileNavExpand}
                            onMobileMenuClicked={this.handleMobileMenuClicked}
                            onMobileMenuHidden={this.handleMobileMenuHidden}
                        />

                        {this.props.children}
                    </div>
                </div>
            </div>
            )
    }
}
