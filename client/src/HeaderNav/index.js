// code snippet imported from the ant design framework
import React from 'react';
import { Row, Col, Nav } from 'antd';
import UserNav from './UserNav';
import logo from '../images/logo.jpg'
import './index.scss'
import LoginRegisterModal from './UserNav/LoginRegisterModal'
export default class HeaderNav extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            current: 'course',//to show the current clicked nav
            modalVisable: false, //indicate if the login/register component needs to show
            activeKey: '1' // set the Tabpane default tab is log in Tab
            // right now the activekey is not working
        };
    }
    //before mount, checkout localstorage
    //set login status to be true
    //show logout component
  componentWillMount() {
        //to show if user existed
    // if (localStorage.token && localStorage.token != '') {
    //   console.log(`localstorage.token existed ${localStorage.token}`)
    //     this.setState({
    //         auth_level: localStorage.authLevel,
    //         hasLogined: true
    //       });
    //   }
    }
  MenuItemClick(e) {
            //when the login/register MenuItem clicked，set current value，
            //  to show the modal
            console.log ('Menu item is clicked!')
            console.log(e.key);
            if (e.key === 'register') {
                //highlight the menu
                this.setState({current: 'register'});
                //to show the modal
                this.setModalVisible(true);
            } else {
                this.setState({current: e.key});
            }
            if (e.key === 'aboutUs') {
              this.props.setPortal('aboutUs');
            }
            if (e.key === "course") {
              this.props.setPortal('course');
            }
        }
    //set if the login/register modal to show
    //default state of modal is invisible
 setModalVisible(value) {
    this.setState({
      modalVisable: value,
    });
  }
  // add modal inside of return
render() {
  let modalVisable = this.state.modalVisable;
  return (
    <header>
      <Row>
        <Col span={2}></Col>
        <Col span={4}>
            <div className='logo' href='/'>
            <img src={logo} alt='logo'/>
            <span className="site-title">Bootcamp Startup</span>
            </div>
          </Col>
        <Col span={18}>
        <UserNav
             className="nav-bar"
             hasLogined={this.props.hasLogined}
             username={this.props.username}
             current={this.state.current}
             menuItemClick={this.MenuItemClick.bind(this)}
             logout={this.props.logout}
             portal={this.props.portal}
             />
          {  modalVisable ?
         <LoginRegisterModal
             setModalVisible={this.setModalVisible.bind(this)}
             activeKey={this.state.activeKey}
             login={this.props.login}
             visible={modalVisable}
             /> : null }
          </Col>
        </Row>
      </header>
        );
      }
    }
