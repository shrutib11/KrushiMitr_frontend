import React, { useState, useEffect } from 'react';
import { Layout } from "antd";
import ProfileSidebar from './ProfileSidebar';

const { Sider } = Layout;

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setCollapsed(true); // Set collapsed state for smaller screens
            } else {
                setCollapsed(false); // Set expanded state for larger screens
            }
        };

        // Initial state setup
        handleResize();

        // Add event listener for resize
        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array to run the effect only once after initial render

    const handleMouseEnter = () => {
        if (window.innerWidth >= 768 && collapsed) {
            setCollapsed(false); // Expand sidebar on mouse enter for larger screens and when it's collapsed
        }
    };

    const handleMouseLeave = () => {
        if (window.innerWidth >= 768) {
            setCollapsed(true); // Collapse sidebar on mouse leave for larger screens
        }
    };

    return (
        <Layout>
            {/* Sidebar */}
            <Sider
                className='ant-layout-sider sidebar'
                style={{
                    transition: '0.9s',
                    position: 'fixed',
                    height: '100vh',
                    zIndex: '1',
                    backgroundColor: 'transparent',
                }}
                collapsed={collapsed}
                collapsible
                trigger={null}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <ProfileSidebar />
            </Sider>
        </Layout>
    );
}

export default Sidebar;
