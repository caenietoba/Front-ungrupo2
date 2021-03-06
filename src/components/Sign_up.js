import React, { Component } from 'react';
import { connect } from 'react-redux';

import Footer from './Footer.js';
import UpdatePhoto from './UpdatePhoto.js';

import {testPassword} from '../scripts/testPassword.js';
import confirmEmail from '../scripts/confirmEmail.js';

import userActions from '../_actions/actions-user.js';

import '../styles/Titles.css';
import '../styles/Form.css';
import '../styles/Log-in.css';

class Sign_up extends Component {
  
  constructor(props){
        super(props);
        
        this.props.dispatch(userActions.logout());
        
        this.state = {
          securityPassword: 'None',
          isEmailValid: false,
          password: '',
          confirmPassword: '',
          name: '',
          username: '',
          email: '', 
          submitted: false, 
          matchPasswords: true,
          photo: ''
        };
        
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
  async handleSubmit(e){
    
    e.preventDefault();
    
    const username = e.target.elements.username.value;
    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const confirmPassword = e.target.elements.confirmPassword.value;
    const isEmailValid = confirmEmail( email );
    const { photo } = this.state;
    
    if( confirmPassword !== password ){
      this.setState({
        submitted: true,
        matchPasswords: false
      });
      return;
    } 
    
    this.setState({
      submitted: true,
      isEmailValid
    });
  
    const newUser = {
      name,
      email,
      usern: username,
      password,
      level: 1,
      reputation: 'Bronze V',
      role: 'student',
      'number-of-followers': 0,
      photo: null
    };
    
    const {dispatch} = this.props;
    
    if( username && email && name && password && confirmPassword && isEmailValid )
      await dispatch( userActions.signUp( newUser ) );
  }
  
  handleChange(e){
    
    const {name, value} = e.target;
    
    this.setState({
      [name]: value, 
      submitted: false
    });
  }
  
  handlePassword(e){
    const password = e.target.value;
    
    this.setState({
      securityPassword: testPassword(password),
      password, 
      submitted: false
    });
  }
  
  handleConfirmPassword(e){
    const password = e.target.value;
    
    this.setState( {
      confirmPassword: password,
      matchPasswords: true, 
      submitted: false
    } );
  }

  getPhoto(photo, context){
    context.setState({photo});
  }
  
  render() {
    
    const {submitted, matchPasswords, confirmPassword, password, username, name, email, isEmailValid, photo} = this.state;
    let emailError = '', nameError = '', usernError = '';
    if( this.props.authentication.data.data ){
      emailError = this.props.authentication.data.data.email;
      nameError = this.props.authentication.data.data.name;
      usernError = this.props.authentication.data.data.usern;
    }
    
    if( this.props.authentication.logged_in )
      window.location.href = '/home';
    
    console.log(photo);

    return (
      <div>
        <h1 className='title-proyect deepshadow'>Proyecto ungrupo</h1>
        
        <div className='container'>
          <div className='form-container-margin form-container p-4'>
            <h1 className='title-form'>Sign up</h1>
            <form name='sign-up-form' onSubmit={this.handleSubmit}>
              <div className={'form-group pt-2' + (submitted && (!username || usernError) ? ' has-error': '')}>
                <label htmlFor='username'>Username:</label>
                <input type='text' placeholder='username' className='form-control' id='username' name='username' value={username} onChange={this.handleChange}/>
                { submitted && !username && <div><small>Username is required</small></div> }
                { submitted && usernError && <div><small>{ usernError }</small></div> }
              </div>
              <div className={'form-group' + (submitted && (!name || nameError) ? ' has-error': '')}>
                <label htmlFor='name'>Name:</label>
                <input type='text' placeholder='First and second name' className='form-control' id='name' name='name' value={name} onChange={this.handleChange}/>
                { submitted && !name && <div><small>Name is required</small></div> }
                { submitted && nameError && <div><small>{ nameError }</small></div> }
              </div>
              <div className={'form-group' + (submitted && (!email || emailError || !isEmailValid) ? ' has-error': '')}>
                <label htmlFor='email'>Email:</label>
                <input type='text' placeholder='example@unal.edu.co' className='form-control' id='email' name='email' value={email} onChange={this.handleChange}/>
                { submitted && !email && <div><small>Email is required</small></div> }
                { submitted && emailError && <div><small>{ emailError }</small></div> }
                { submitted && !isEmailValid && <div><small>The email cant have that form</small></div> }
              </div>
              <div className={'form-group' + (submitted && !password ? ' has-error': '')}>
                <label htmlFor='password'>Password:</label>
                <input type='password' placeholder='password' className='form-control' id='password' name='password' value={password} onChange={this.handlePassword}/>
                { submitted && !password && <div><small>Password is required</small></div> }
                <small className='form-text text-muted'>{'Security: ' + this.state.securityPassword}</small>
              </div>
              <div className={'form-group' + (submitted && (!matchPasswords || !confirmPassword) ? ' has-error': '')}>
                <label htmlFor='confirmPassword'>Confirm your password:</label>
                <input type='password' placeholder='password' className='form-control' id='confirmPassword' name='confirmPassword' value={confirmPassword} onChange={this.handleConfirmPassword}/>
                { submitted && !matchPasswords && <div><small>Passwords doesnt match</small></div> }
                { submitted && !confirmPassword && <div><small>Confirm password is required</small></div> }
              </div>
              <div className={'form-group custom-file' + (submitted && (!photo) ? ' has-error': '')}>
                <UpdatePhoto callback={this.getPhoto} context={this} buttonText='Upload a photo' css='custom-file-input' id="customFileLang"/>
                <label class="custom-file-label" for="customFileLang">{(!photo ? 'No selected photo' : photo)}</label>
              </div>
              <div className='pt-4'>
                <input type='submit' className='btn btn-success btn-block button-log' value='Sign me up!' />
              </div>
              <div className='pt-4 text-center'>
                <a href='/log_in'>Want to log in?</a>
              </div>
            </form>
          </div>

        </div>

        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
    const { authentication } = state;
    return {
        authentication
    };
}

export default connect(mapStateToProps)(Sign_up);