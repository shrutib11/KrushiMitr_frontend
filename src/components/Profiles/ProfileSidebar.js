import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from "antd";
import { QuestionCircleOutlined, CheckCircleOutlined, ExclamationCircleOutlined, MedicineBoxOutlined } from '@ant-design/icons';

export default function ProfileSidebar() {
    const role = localStorage.getItem("role");

    return (
        <>
            <Menu
                mode="inline"
                theme="light"
                className="menu-bar"
                style={{
                    height: '100%',
                    flexDirection: 'column',
                    gap: '60px',
                    fontSize: '0.9rem',
                    position: 'absolute',
                    backgroundColor: '#f0f2f5',
                    width: '170px',
                    fontWeight: 'bold',
                    maxWidth: window.innerWidth < 768 ? '70%' : '100%',
                    overflowX: 'hidden',
                }}
            >
                {
                    role === "Farmer" && (
                        <>
                            <Menu.Item
                                key='/profile/myquestions'
                                icon={<QuestionCircleOutlined style={{ fontSize: '24px' }} />}
                                className='custom-menu-item'
                            >
                                <Link to='/profile/myquestions'>Questions</Link>
                            </Menu.Item>

                        </>
                    )
                }

                <Menu.Item
                    key='/profile/myanswers'
                    icon={<CheckCircleOutlined style={{ fontSize: '24px' }} />}
                    className='custom-menu-item'
                >
                    <Link to='/profile/myanswers'>Answers</Link>
                </Menu.Item>

                {
                    role === "Farmer" && (
                        <>
                            <Menu.Item
                                key='/profile/mycomplaints'
                                icon={<ExclamationCircleOutlined style={{ fontSize: '24px' }} />}
                                className='custom-menu-item'
                            >
                                <Link to='/profile/mycomplaints'>Complaints</Link>
                            </Menu.Item>

                            <Menu.Item
                                key='/profile/myimages'
                                icon={<MedicineBoxOutlined style={{ fontSize: '24px' }} />}
                                className='custom-menu-item'
                            >
                                <Link to='/profile/myimages'>Crop Disease</Link>
                            </Menu.Item>
                        </>
                    )
                }
            </Menu >
        </>
    );
}