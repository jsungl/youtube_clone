//import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';
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
                    {/* <Button variant="text">Subscription</Button> */}
                    <Typography
                        component="h2"
                        variant="h5"
                        color="inherit"
                        align="center"
                        noWrap
                        sx={{ flex: 1 }}
                    >
                        JStube
                    </Typography>
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
                    <Button variant="text" onClick={()=> navigate('/subscription')}>Subscription</Button>
                    <Typography
                        component="h2"
                        variant="h5"
                        color="inherit"
                        align="center"
                        noWrap
                        sx={{ flex: 1 }}
                    >
                        JStube
                    </Typography>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <Button variant="text" onClick={() => navigate('/video/upload')}>Upload</Button>
                    <Button variant="text" onClick={logoutHandler}>Logout</Button>
                </Toolbar>
            </>
        )

    }

}