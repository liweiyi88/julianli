import React, {Component} from "react";
import {createContact} from "../Api/api";
import ErrorBlock from "./ErrorBlock";
import SuccessBlock from "./SuccessBlock";
import ButtonDisabled from "./ButtonDisabled";
import ButtonSend from "./ButtonSend";

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
            success: false,
            clicked: false
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
            success: false,
            clicked: false
        })
    }

    handleContactSubmit() {
        this.setState({
            clicked:true
        });

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
        let button = this.state.clicked ? <ButtonDisabled /> : <ButtonSend onButtonClicked={this.handleContactSubmit}/>;

        return (
            <div className={`max-w-md`}>
                <div className={`text-lg text-grey-darker leading-normal`}>
                    <h1>Do you need a help?</h1>
                    <p>I am passionate about providing a tailored solution for you. Having said that, I am not just a developer who is able to deliver a high-quality application, what is more, I could refine your situation as your adviser and partner.</p>
                    <p>If it sounds good to you, why not get in touch with me for more details?</p>
                    <p>I will usually contact you within 48 hours.</p>
                </div>
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
                    {button}
                </div>
            </div>
        );
    }
}
