import React from 'react';
import Create from '../widgets/Create';
import FilesTree from '../widgets/FilesTree';
import SideMenuFooter from '../widgets/SideMenuFooter';
import {Layout} from "antd";
import Profile from "../widgets/Profile";

const SideMenu = () => {

    return (
        <div
            style={{
                height: '100%',
                width: '200px',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Layout style={{height: '10%', minHeight: '90px',}}>
                <Profile />
            </Layout>
            <Layout style={{height: '15%', minHeight: '100px',}}>
                <Create />
            </Layout>
            <Layout style={{height: '67%',}}>
                <FilesTree />
            </Layout>
            <Layout style={{height: '8%', minHeight: '65px',}}>
                <SideMenuFooter />
            </Layout>
        </div>
    );
};

export default SideMenu;
