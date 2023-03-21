//import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from 'axios';


export default function Header() {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    // console.log('header', user);

    const logoutHandler = () => {
        axios.get('/api/users/logout')
        .then(res => {
            if(res.data.success) {
                navigate('/login');
            }else {
                alert('로그아웃에 실패하였습니다.');
            }
        })
    }


    if (user.userData && !user.userData.isAuth) {
        // 비로그인
        return(
            <>
                <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Link href="/" underline="none" color="#fff" sx={{ px: "8px", "&:hover": { textDecoration: "none" } }}>
                        <img src={'http://localhost:5000/static/images/HappyTubeLogo.png'} alt="Logo" height="50" width="120"/>
                    </Link>
                    <Box sx={{ flex: 1 }}/>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <Button variant="text" onClick={() => navigate('/login')}>Signin</Button>
                    <Button variant="text" onClick={() => navigate('/register')}>Signup</Button>
                </Toolbar>
            </>
        )

    }else {
        // 로그인
        return (
            <>
                <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Link href="/" underline="none" color="#fff" sx={{ px: "8px", "&:hover": { textDecoration: "none" } }}>
                        <img src={'http://localhost:5000/static/images/HappyTubeLogo.png'} alt="Logo" height="50" width="120"/>
                    </Link>
                    <Button variant="text" onClick={()=> navigate('/subscription')}>Subscription</Button>
                    <Box sx={{ flex: 1 }}/>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton onClick={() => navigate('/video/upload')}>
                        <UploadIcon />
                    </IconButton>
                    <Button variant="text" onClick={logoutHandler}>Logout</Button>
                </Toolbar>
            </>
        )

    }

}