import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Link, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import { UsersPage } from './components/Users/UsersContainer';
import { connect, Provider } from 'react-redux';
import { initializeApp } from './redux/appReducer';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import { withSuspense } from './hoc/withSuspense';
import { BrowserRouter } from 'react-router-dom';
import store, { AppStateType } from './redux/reduxStore';
import { LoginPage } from './components/Login/Login';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Header } from './components/Header/Header';
import Profile from './components/Profile/Profile';

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ChatPage = React.lazy(() => import('./pages/chat/ChatPage'));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedChatPage = withSuspense(ChatPage);

class App extends Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    } 

    return (
      <Layout>
        <Header />
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            //defaultSelectedKeys={['1']}
            //defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="My Profile">
              <Menu.Item key="1"><Link to='/profile'>Profile</Link></Menu.Item>
              <Menu.Item key="2"><Link to='/dialogs'>Messages</Link></Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
              <Menu.Item key="5"><Link to='/developers'>Developers</Link></Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<NotificationOutlined />} title="Chat">
              <Menu.Item key="9"><Link to='/chat'>Chat</Link></Menu.Item>
              <Menu.Item key="10">option6</Menu.Item>
              <Menu.Item key="11">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
        <Switch>
            <Route exact path='/'
              render={() => <Redirect to={"/profile"} />} />
            <Route path='/dialogs'
              render={() => <SuspendedDialogs/>} />
            <Route path='/profile/:userId?'
              render={() => <Profile />} />
            <Route path='/developers'
              render={() => <UsersPage pageTitle={'Samurai'} />} />
            <Route path='/news' render={() => <News />} />
            <Route path='/music' render={() => <Music />} />
            <Route path='/settings' render={() => <Settings />} />
            <Route path='/login' render={() => <LoginPage />} />
            <Route path='/chat' render={() => <SuspendedChatPage />} />
            <Route path='*' render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Samurai Social Network</Footer>
  </Layout>
      /*
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Switch>
            <Route exact path='/'
              render={() => <Redirect to={"/profile"} />} />
            <Route path='/dialogs'
              render={() => <SuspendedDialogs/>} />
            <Route path='/profile/:userId?'
              render={() => <ProfileContainer />} />
            <Route path='/users'
              render={() => <UsersPage pageTitle={'Samurai'} />} />
            <Route path='/news' render={() => <News />} />
            <Route path='/music' render={() => <Music />} />
            <Route path='/settings' render={() => <Settings />} />
            <Route path='/login' render={() => <LoginPage />} />
            <Route path='*' render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </div>
      </div>
      */
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
})

const AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);

const SamuraiJSApp: React.FC = () => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer/>
    </Provider>
  </BrowserRouter>
}

export default SamuraiJSApp;
