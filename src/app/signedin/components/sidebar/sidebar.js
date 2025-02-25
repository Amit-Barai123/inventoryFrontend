import React, { Component, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { FaSquarePollVertical } from "react-icons/fa6";
import { BiSolidFoodMenu } from "react-icons/bi";
import { FaUsersViewfinder } from "react-icons/fa6";



export default class Sidebar extends Component {
  render() {
    const { sidebar, toggleSidebar, isOperator, isAdmin, isOwner } = this.props;

    return (
      <>
        {sidebar && <div
          className="overlay"
          onClick={toggleSidebar}></div>}

        <IconContext.Provider value={{ color: '#fff' }}>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}
            style={{
              maxHeight: '100vh',
              overflowY: 'auto',
            }}
          >
            <ul className='nav-menu-items mt-80 ps-0' onClick={toggleSidebar}>
              <li className='d-flex justify-content-end pe-4'>
                <Link to='#' className='menu-bars'>
                  <FaIcons.FaTimes style={{ fontSize: '25px' }} />
                </Link>
              </li>
              <li className='nav-text'>
                <Link to="/">
                  <FaIcons.FaHome />
                  <span className="ms-2">Home</span>
                </Link>
              </li>
              {(isOperator || isOwner) && (
                <li className='nav-text'>
                  <Link to="/vendors">
                    <FaIcons.FaUsers />
                    <span className="ms-2">Vendors</span>
                  </Link>
                </li>
              )}
              {(isOperator || isOwner) && (
                <li className='nav-text'>
                  <Link to="/invoices">
                    <FaIcons.FaFileInvoice />
                    <span className="ms-2">Invoices</span>
                  </Link>
                </li>
              )}
              {(isOperator || isOwner) && (
                <li className='nav-text'>
                  <Link to="/inventory">
                    <FaIcons.FaClipboardList />
                    <span className="ms-2">Inventory</span>
                  </Link>
                </li>
              )}
              {(isOwner) && (
                <li className='nav-text'>
                  <Link to="/items">
                    <FaIcons.FaBox />
                    <span className="ms-2">Items</span>
                  </Link>
                </li>
              )}
              {(isOwner) && (
                <li className='nav-text'>
                  <Link to="/uoms">
                    <FaIcons.FaWeight />
                    <span className="ms-2">Uoms</span>
                  </Link>
                </li>
              )}
              {(isAdmin) && (
                <li className='nav-text'>
                  <Link to="/users">
                    <FaIcons.FaUser />
                    <span className="ms-2">Users</span>
                  </Link>
                </li>
              )}
                <li className='nav-text'>
                <Link to="/User-status">
                <FaUsersViewfinder />
                  <span className="ms-2">User Status</span>
                </Link>
              </li>
              <li className='nav-text'>
                  <Link to="/users">
                    <FaIcons.FaUser />
                    <span className="ms-2">Users</span>
                  </Link>
                </li>
              <li className='nav-text'>
                <Link to="/recipe">
                <BiSolidFoodMenu />
                  <span className="ms-2">Recipe</span>
                </Link>
              </li>
              <li className='nav-text'>
                <Link to="/ingridents">
                  <FaIcons.FaMixer />
                  <span className="ms-2">Ingridents</span>
                </Link>
              </li>
              <li className='nav-text'>
                <Link to="/Consuption_days">
                  <FaIcons.FaCalendarDay />
                  <span className="ms-2">ConsumptionDay</span>
                </Link>
              </li>
              <li className='nav-text'>
                <Link to="/store">
                  <FaIcons.FaStore />
                  <span className="ms-2">Store</span>
                </Link>
              </li>
              <li className='nav-text'>
                <Link to="/transcation">
                <FaSquarePollVertical />
                  <span className="ms-2">Transcation</span>
                </Link>
              </li>
              <li className='nav-text'>
                <Link to="/DailyConsumptionPage">
                  <FaIcons.FaClock />
                  <span className="ms-2">DailyConsumption</span>
                </Link>
              </li>
              <li className='nav-text'>
                <Link to="/category">
                  <FaIcons.FaList />
                  <span className="ms-2">Category</span>
                </Link>
              </li>
              

            </ul>
          </nav>
        </IconContext.Provider>
      </>
    );
  }

}

