import React from "react";
import { Link } from "react-router-dom";
import '../../App.css'

const Sidebar = () => {
    return (
        <div className="sidebar-container mt-3">
            <ul className="sidebar-ul-list">
                <li className="sidebar-list-item">
                    <Link to="/" className="sidebar-link">Create Task</Link>
                </li>
                <li className="sidebar-list-item">
                    <Link to="/updatetask" className="sidebar-link">Update Task Status</Link>
                </li>
                <li className="sidebar-list-item">
                    <Link to="/tasklist" className="sidebar-link">List Tasks</Link>
                </li>
                <li className="sidebar-list-item">
                    <Link to="/assigntask" className="sidebar-link">Assign Task</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
