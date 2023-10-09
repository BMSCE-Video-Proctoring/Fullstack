import React from 'react'
import './test.css';

class Test extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            org_name: '',
            test_name: '',
            link: '',
            candidates: '',
            start_time: '',
            duration: ''

        }
        this.changeHandler = this.changeHandler.bind(this);
        this.submitForm = this.submitForm.bind(this);
    };

    // Input Change Handler
    changeHandler(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // Submit Form
    submitForm() {
        fetch('http://127.0.0.1:8000/createTest/', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then(response => response.json())
            // .then((data) => console.log(data));
            .then((data) => {console.log(data); window.location.replace('/');});

        this.setState({
            email: '',
            org_name: '',
            test_name: '',
            link: '',
            candidates: '',
            start_time: '',
            duration: ''
        });
    }


    render() {
        return (
            <div className='container'>
                <div className="header">
                    <div className="text">Create a test</div>
                    {/* <div className="underline"></div> */}
                </div>
                <div className="inputs">
                    {/* email */}
                    <div className="input">
                        <input value={this.state.email} type="email"
                            name='email'
                            onChange={this.changeHandler}
                            placeholder='Email Id' />
                    </div>
                    {/* organization name */}
                    <div className="input">
                        <input value={this.state.org_name}
                            type="text"
                            name='org_name'
                            onChange={this.changeHandler}
                            placeholder='Organization Name' />
                    </div>
                    {/* test name */}
                    <div className="input">
                        <input value={this.state.test_name}
                            type="text"
                            name='test_name'
                            onChange={this.changeHandler}
                            placeholder='Test Name' />
                    </div>
                    {/* question paper link */}
                    <div className="input">
                        <input value={this.state.link}
                            type="url"
                            name='link'
                            onChange={this.changeHandler}
                            placeholder='Question Paper Link' />
                    </div>
                    {/* total expected candidates */}
                    <div className="input">
                        <input value={this.state.candidates}
                            type="number"
                            name='candidates'
                            onChange={this.changeHandler}
                            placeholder='Total Expected Candidates' />
                    </div>
                    {/* start date time format */}
                    <div className="input">
                        <input value={this.state.start_time}
                            type="datetime-local"
                            name='start_time'
                            onChange={this.changeHandler}
                            placeholder='Start date time format' />
                    </div>
                    {/* duration */}
                    <div className="input">
                        <input value={this.state.duration}
                            type="number"  /*number*/
                            name='duration'
                            onChange={this.changeHandler}
                            placeholder='Duration' />
                    </div>

                </div>
                <div className="submit-container">
                    <div onClick={this.submitForm} type="submit" className="submit">Create</div>
                </div>
            </div>
        );
    }

}
export default Test