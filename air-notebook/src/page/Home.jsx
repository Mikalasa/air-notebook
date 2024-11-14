import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Layout, theme } from 'antd';
import SideMenu from "../components/layout/SideMenu";
import ContentPanel from "../components/layout/ContentPanel";

const Home = () => {
    const selectedNoteId = useSelector((state) => state.notes.selectedNoteId);

    useEffect(() => {
        const handleContextMenu = (event) => {
            event.preventDefault();
        };

        document.addEventListener('contextmenu', handleContextMenu);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    return (
        <Layout className={"MVP"} style={{ height: '100vh'}}>
            <Layout style={{ display: 'flex', flexDirection: 'row', background: 'rgba(255, 0, 0, 0)'}}>
                <SideMenu />
                <ContentPanel selectedNoteId={selectedNoteId} />
            </Layout>
        </Layout>
    );
};

export default Home;
