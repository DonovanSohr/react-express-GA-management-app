import React, { Component } from 'react';
import './App.css';
import AdminPortal from './AdminPortal';
import InstructorPortal from './InstructorPortal';
import StudentPortal from './StudentPortal';
import Login from './Login';
import Signup from './Signup';
import SignupInstructor from './SignupInstructor';
import LandingPage from './LandingPage';
import {
  userStudentSignup,
  userInstructorSignup,
  userLogin
} from './services/userAPIService.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portal: 'landing',
      token: null,
      loginFormData: {
        username: '',
        password: ''
      },
      signupFormData: {
        username: '',
        password: '',
        auth_level: 'student'
      },
      signupInsFormData: {
        username: '',
        password: '',
        auth_level: 'instructor',
        authcode: '',
        email: ''
      }
    }
    this.changeRegistration=this.changeRegistration.bind(this);
  }

  async componentDidMount() {


  }



  changeRegistration(){

    this.setState({
      process: 'Signed In'
    })
  }

  setPortal(view) {
    this.setState({
      portal: view
    })
  }

  returnToLanding() {
    this.setState({
      portal: 'landing'
    })
  }
  async userLoginAttemp(userData) {
    const response = await userLogin(userData);

    this.setState({
      portal: response['auth_level'],
      token: response.token
    });


  }
  async userSignupAttemp(userData) {
    const response = await userStudentSignup(userData);
    // this.setState({
    //   portal: 'student'
    // });
  }
  async instructorSignupAttemp(userData) {
    const response = await userInstructorSignup(userData);
    // this.setState({
    //   portal: 'instructor'
    // })
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(prevState => {
      return {
        loginFormData: {
          ...prevState.loginFormData,
          [name]: value
        }
      }
    });
  }
  handleSubmit = async e => {
    e.preventDefault();
    await this.userLoginAttemp(this.state.loginFormData);

  }
  handleSignupChange = e => {
    const { name, value } = e.target;
    this.setState( prevState => {
      return {
        signupFormData: {
          ...prevState.signupFormData,
          [name]: value
        }
      }
    });
  }
  handleSingupSubmit = async e => {
    e.preventDefault();
    await this.userSignupAttemp(this.state.signupFormData);

  }
  handleSignupInsChange = e => {
    const { name, value } = e.target;
    this.setState( prevState => {
      return {
        signupInsFormData: {
          ...prevState.signupInsFormData,
          [name]: value
        }
      }
    });
  }
  handleSignupInsSubmit = async e => {
    e.preventDefault();
    await this.instructorSignupAttemp(this.state.signupInsFormData);
  }
  render() {
    let contentView;
    switch (this.state.portal) {
      case 'admin':
        contentView = (<AdminPortal returnToLanding={this.returnToLanding.bind(this)}/>);
        break;
      case 'landing':
        contentView=(<LandingPage
          info={this.state.process}
          changeRegistration={this.changeRegistration}

          />
        );
        break;
      case 'instructor':
        contentView = (<InstructorPortal />);
        break;
      case 'student':
        contentView = (<StudentPortal />);
        break;
      default:
        contentView = (<LandingPage />);
    }
    const landingNavBar = <div className="navbar">
              <img className="Logo" src="https://lh3.googleusercontent.com/-AlEjJmP0ofE/VOVDme9hxKI/AAAAAAAAABE/LXO0f_WTqMY/s530-p/bs.png" alt="logo"/>
              <h1>BootCamp Startup</h1>
              <button className='btn btn-primary'
                      onClick={() => {this.setPortal('admin')}}
                >Admin</button>
              <button className='btn btn-success'
                      onClick={() => {this.setPortal('instructor')}}
                >Instructor</button>
              <button className='btn btn-default'
                      onClick={() => {this.setPortal('student')}}
                >Student</button>

              <Login onChange={this.handleChange}
                     onSubmit={this.handleSubmit}
                     username={this.state.loginFormData.username}
                     password={this.state.loginFormData.password}

                />
              <Signup onSignupChange={this.handleSignupChange}
                      onSignupSubmit={this.handleSingupSubmit}
                      username={this.state.signupFormData.username}
                      password={this.state.signupFormData.password}

                />
              <SignupInstructor
                      onSignupInsChange={this.handleSignupInsChange}
                      onSignupInsSubmit={this.handleSignupInsSubmit}
                      username={this.state.signupInsFormData.username}
                      password={this.state.signupInsFormData.password}
                      authcode={this.state.signupInsFormData.authcode}
                      email={this.state.signupInsFormData.email}
                />
            </div>
    let isLandingPortal = this.state.portal === 'landing';
    return (
      <div className="App">
        { isLandingPortal ? (landingNavBar) : null }
      { contentView }
      </div>
    );
  }
}

export default App;
