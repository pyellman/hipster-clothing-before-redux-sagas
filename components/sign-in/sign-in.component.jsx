import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './sign-in.styles.scss';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component {
  // bag the constructor and this.state, don't need to access this.props here
  state = {
    email: '',
    password: ''
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: '', password: '' });
    } catch (error) {
      console.log(error);
    }

    this.setState({
      email: '',
      password: ''
    }
    )
  }

  handleChange = (event) => {
    // handles updating the state to whatever the user types for ALL fields;
    // the [name] syntax handles both name and password by extracting the
    // 'name' attribute, which could be either 'name' or 'password' and
    // setting state for that state field
    const { value, name } = event.target;
    this.setState({ [name]: value })
  }

  render() {
    return (
      <div className='sign-in'>
        <h2 className='title'>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='email'
            type='email'
            handleChange={this.handleChange}
            value={this.state.email}
            // jsx label inline tag creates an html label tag on the fly
            label='email'
            required />
          <FormInput
            name='password'
            type='password'
            handleChange={this.handleChange}
            value={this.state.password}
            label='password'
            required />

          <div className='buttons'>
            <CustomButton type='submit'>Sign in</CustomButton>
            {/* isGoogleSignin without any value will simply be bool 'true' */}
            <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignIn>Sign in With Google</CustomButton>
          </div>
        </form>
      </div >
    );
  }
}

export default SignIn;