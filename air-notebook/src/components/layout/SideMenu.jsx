import React from 'react';
import Create from '../common/Create';
import FilesTree from '../common/FilesTree';
import SideMenuFooter from '../common/SideMenuFooter';
import {Layout} from "antd";
import Header from "./Header";

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
                <Header />
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
