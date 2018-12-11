// some code snippet imported from ant design
import React from 'react';
import { Tabs, Modal } from 'antd';
import WrapStudentRegisterForm from './StudentRegisterForm';
import WrapInstructorRegisterForm from './InstructorRegisterForm';
import WrappedLoginForm from './LoginForm'

export default class LoginRegisterModal extends React.Component {
    // function to close the modal
    handleCancel(){
        this.props.setModalVisible(false);
    }
    render(){
        return(
            <Modal title="User"
                   visible={this.props.visible}
                   onCancel={this.handleCancel.bind(this)}
                   onOk={this.handleCancel.bind(this)}>
               <Tabs type="card">
                    <Tabs.TabPane
                      tab='Login'
                      key='1'>
                        <WrappedLoginForm
                          login={this.props.login}
                          setModalVisible={this.props.setModalVisible}
                          />
                    </Tabs.TabPane>
                    <Tabs.TabPane
                       tab='Student Signup'
                       key='2'>
                        <WrapStudentRegisterForm
                           setModalVisible={this.props.setModalVisible}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane
                      tab='Instructor Signup'
                      key='3'>
                      <WrapInstructorRegisterForm
                         setModalVisible={this.props.setModalVisible}
                      />
                    </Tabs.TabPane>
                </Tabs>
            </Modal>
        );
    }
}