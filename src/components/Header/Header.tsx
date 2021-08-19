import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Menu, Row, Layout, Button } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, selectLogin } from '../../redux/authSelectors';
import { logout } from '../../redux/authReducer';

export type MapPropsType = {}

export const Header: React.FC<MapPropsType> = (props) => {
    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectLogin)

    const dispatch = useDispatch()
    
    const logoutCallBack = () => {
        dispatch(logout())
    }
    
    const { Header } = Layout;

    return (
        <Header className="header">
      <Row>
        <Col span={18}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1"><Link to='/developers'>Developers</Link></Menu.Item>
          </Menu>    
        </Col>
        {isAuth 
            ? <> <Col span={1}>
                    <Avatar alt={login || ''} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                </Col>
                <Col span={5}>
                    <Button onClick={logoutCallBack}>Log out</Button> 
                </Col>
            </>
            : <Col span={6}> 
                <Button>
                    <Link to={'/login'}>Login</Link>
                </Button>
            </Col>}
      </Row>
    </Header>
    )
}
