import { useState } from 'react';
import {
    IoIosCalendar,
    IoMdBookmark,
    IoMdCall,
    IoMdChatboxes,
    IoMdClipboard,
    IoMdClose,
    IoMdHammer,
    IoMdHome, IoMdMenu,
    IoMdPerson
} from 'react-icons/io';
import { NavLink } from "react-router-dom";
import './Header.css';

const Header = () => {
    const [active, setActive] = useState(false);
    const activateNav = () => {
        setActive(!active);
    };
    return (
        <div className={
            [
                'side-header',
                active ? '' : 'sh-collapsed'
            ].join(' ')
        }>

            <div className='side-menu-icon' onClick={activateNav}>
                {!active ? <IoMdMenu className='menu' /> : <IoMdClose className='menu' />}
            </div>

            <nav className="side-nav">
                <ul className={active ? '' : 'only-icon'}>
                    <NavLink to='/leisures'>
                        <li>
                            <IoIosCalendar className='icon' />
                            <span>Кружки</span>
                        </li>
                    </NavLink>
                    <NavLink to='/'>
                        <li>
                            <IoMdBookmark className='icon' />
                            <span>History</span>
                        </li>
                    </NavLink>
                    <NavLink to='/'>
                        <li>
                            <IoMdPerson className='icon' />
                            <span>Testimonials</span>
                        </li>
                    </NavLink>
                    <NavLink to='/'>
                        <li>
                            <IoMdHome className='icon' />
                            <span>Partners</span>
                        </li>
                    </NavLink>
                    <NavLink to='/'>
                        <li>
                            <IoMdChatboxes className='icon' />
                            <span>About</span>
                        </li>
                    </NavLink>
                    <NavLink to='/'>
                        <li>
                            <IoMdHammer className='icon' />
                            <span>Tutorials</span>
                        </li>
                    </NavLink>
                    <NavLink to='/'>
                        <li>
                            <IoMdCall className='icon' />
                            <span>Contact</span>
                        </li>
                    </NavLink>
                    <NavLink to='/'>
                        <li>
                            <IoMdClipboard className='icon' />
                            <span>FAQ</span>
                        </li>
                    </NavLink>
                </ul>
            </nav>

        </div>
    );
};

export default Header;
