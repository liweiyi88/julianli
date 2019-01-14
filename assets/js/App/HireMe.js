import React, {Component} from "react";
import {createContact} from "../Api/api";
import ErrorBlock from "./ErrorBlock";
import SuccessBlock from "./SuccessBlock";

export default class HireMe extends Component{
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            nameError: '',
            email: '',
            emailError: '',
            subject: '',
            subjectError: '',
            message: '',
            messageError: '',
            systemError: '',
            success: false
        };

        this.handleFormElementChange = this.handleFormElementChange.bind(this);
        this.handleContactSubmit = this.handleContactSubmit.bind(this);
        this.reset = this.reset.bind(this);
    }

    reset() {
        this.setState({
            nameError: '',
            emailError: '',
            subjectError: '',
            messageError: '',
            systemError: '',
            success: false
        })
    }

    handleContactSubmit() {
        createContact(this.state)
            .then(() => {
                this.reset();

                this.setState({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                    success:true
                })
            })
            .catch(error => {
            error.response.json().then(errorsData => {
                this.reset();

                if (errorsData['@type'] === "ConstraintViolationList") {
                    let violations = errorsData['violations'];

                    violations.forEach((value) => {
                        this.setState({
                            [value['propertyPath']+'Error']: value['message']
                        })
                    });

                    return;
                }

                this.setState({
                    systemError: 'System error occurs.'
                })
            })
        });
    }

    handleFormElementChange(event) {
        const target = event.target;

        this.setState({
            [target.name]: target.type === 'checkbox'
                ? target.checked
                : target.value
        });
    }

    render() {
        return (
            <div className={`w-full lg:w-3/4`}>
                {this.state.systemError.trim() !== '' &&
                    <div className={`mb-6`}>
                        <ErrorBlock message={this.state.systemError}/>
                    </div>
                }

                {this.state.success &&
                <div className={`mb-6`}>
                    <SuccessBlock message={`Thanks for reaching out to me, I will reply to you as soon as I can!`}/>
                </div>
                }
                <div className={`w-full mb-6`}>
                    <input
                        name={`name`}
                        value={this.state.name}
                        className={`appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey`}
                        id="your-name" onChange={this.handleFormElementChange} type="text" placeholder="Your Name" />

                    {this.state.nameError.trim() !== '' && <ErrorBlock message={this.state.nameError}/>}
                </div>
                <div className={`w-full mb-6`}>
                    <input
                        name={`email`}
                        value={this.state.email}
                        className={`appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey`}
                        id="email" type="text" onChange={this.handleFormElementChange} placeholder="Email" />
                    {this.state.emailError.trim() !== '' && <ErrorBlock message={this.state.emailError}/>}
                </div>
                <div className={`w-full mb-6`}>
                    <input
                        value={this.state.subject}
                        name={`subject`}
                        className={`appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey`}
                        id="subject" type="text" onChange={this.handleFormElementChange} placeholder="Subject" />
                    {this.state.subjectError.trim() !== '' && <ErrorBlock message={this.state.subjectError}/>}
                </div>
                <div className={`w-full mb-6`}>
                <textarea
                    value={this.state.message}
                    name={`message`}
                    className={`h-32 resize-none appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey`}
                    id="your-request" onChange={this.handleFormElementChange} placeholder="Your request..."
                />
                    {this.state.messageError.trim() !== '' && <ErrorBlock message={this.state.messageError}/>}
                </div>

                <div>
                    <button
                        onClick={this.handleContactSubmit}
                        className={`bg-grey hover:bg-grey-dark focus:outline-none text-white font-bold py-3 px-4 rounded inline-flex items-center`}>
                        <span>Send</span>
                        <svg transform="rotate(45)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-current ml-2">
                            <path className={`text-white`}
                                  d="M12 20.1L3.4 21.9a1 1 0 0 1-1.3-1.36l9-18a1 1 0 0 1 1.8 0l9 18a1 1 0 0 1-1.3 1.36L12 20.1z"/>
                            <path className={`text-green`} d="M12 2c.36 0 .71.18.9.55l9 18a1 1 0 0 1-1.3 1.36L12 20.1V2z"/>
                        </svg>
                    </button>
                </div>
            </div>
        );
    }
}
