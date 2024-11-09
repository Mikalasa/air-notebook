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
            <Layout style={{height: '10%', marginBottom: '1rem'}}>
                <Header />
            </Layout>
            <Layout style={{height: '10%', marginBottom: '1rem'}}>
                <Create />
            </Layout>
            <Layout style={{height: '75%', marginBottom: '1rem'}}>
                <FilesTree />
            </Layout>
            <Layout style={{height: '5%', marginBottom: '1rem'}}>
                <SideMenuFooter />
            </Layout>
        </div>
    );
};

export default SideMenu;
