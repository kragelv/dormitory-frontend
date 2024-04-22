import React, {useState} from 'react'
// @ts-ignore
import {
    IoMdBookmark,
    IoMdCall,
    IoMdChatboxes,
    IoMdClipboard,
    IoMdClose,
    IoMdHammer,
    IoMdHome,
    IoMdImage,
    IoMdMenu,
    IoMdPerson
} from 'react-icons/io'
import {Link, useNavigate} from "react-router-dom";
import './Header.css'

const Header = () => {

    const [active, setActive] = useState(false)

    const activateNav = () => {
        setActive(!active)
    }

    const navigate = useNavigate()

    return (
        <div className={active ? 'header' : 'header-mobile'}>

            <div className='menu-icon' onClick={activateNav}>

                {!active ? <IoMdMenu className='menu'/> : <IoMdClose className='menu'/>}

            </div>

            <nav>
                <ul className={active ? 'ul-item' : 'ul-item oicon'}>

                    <li onClick={() => navigate('/prof')}>
                        <IoMdImage className='icon'/>
                        <Link to='/prof'>Alumni</Link>
                    </li>


                    <li onClick={() => navigate('/')}>
                        <IoMdBookmark className='icon'/>
                        <Link to='/'>History</Link>
                    </li>


                    <li>
                        <IoMdPerson className='icon'/>
                        <Link to='/'>Testimonials</Link>
                    </li>


                    <li>
                        <IoMdHome className='icon'/>
                        <Link to='/'>Partners</Link>
                    </li>


                    <li>
                        <IoMdChatboxes className='icon'/>
                        <Link to='/'>About</Link>
                    </li>


                    <li>
                        <IoMdHammer className='icon'/>
                        <Link to='/'>Tutorials</Link>
                    </li>


                    <li>
                        <IoMdCall className='icon'/>
                        <Link to='/'>Contact</Link>
                    </li>


                    <li>
                        <IoMdClipboard className='icon'/>
                        <Link to='/'>FAQ</Link>
                    </li>

                </ul>
            </nav>

        </div>
    )
}

export default Header
