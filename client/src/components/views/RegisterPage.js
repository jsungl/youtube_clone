import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
//import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import GroupsIcon from '@mui/icons-material/Groups';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
//import styled from 'styled-components';
//import { useState } from 'react';
import Auth from '../../hoc/auth';
import { registerUser } from '../../_actions/user_actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// const InfoBox = styled.div`
//     color: #777;
// `;

function RegisterPage() {
    // const [idError, setIdError] = useState('');
    // const [emailError, setEmailError] = useState('');
    // const [passwordState, setPasswordState] = useState('');
    // const [passwordError, setPasswordError] = useState('');
    // const [nameError, setNameError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        if(data.get('password') !== data.get('confirmPassword')) {
            return alert('비밀번호를 다시 확인해주세요');
        }

        let body = {
            email: data.get('email'),
            name: data.get('nickname'),
            password: data.get('password'),
        };

        dispatch(registerUser(body)) // loginUser라는 action을 실행
        .then(res => {
            console.log(res);
            if(res.payload.success) {
                navigate('/login');
            }else {
                alert('회원가입 실패');
            }
        });
    }


    return(
        <Container maxWidth="md">
            <Box
                sx={{
                    mt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: '#78909c' }}>
                    <GroupsIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
                    Sign up
                </Typography>
                <Box component="form" onSubmit={onSubmitHandler}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell 
                                        align="center" 
                                        colSpan={2} 
                                        sx={{
                                            borderTop:"2px solid #444",
                                            borderBottom:"1px solid #888",
                                            fontWeight:"700"
                                        }}
                                    >
                                        기본 정보
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow>
                                    <TableCell sx={{ background:"#f9f9f9" }}>
                                        <Typography noWrap>이메일 주소</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField name="email" size="small" required/>
                                    </TableCell>
                                </TableRow>


                                <TableRow>
                                    <TableCell sx={{ background:"#f9f9f9" }}>
                                        <Typography>비밀번호</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField name="password" type="password" size="small" required/>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell component="th" scope="row" sx={{ background:"#f9f9f9" }}>
                                        <Typography noWrap>비밀번호 확인</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField name="confirmPassword" type="password" size="small" required/>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell sx={{ background:"#f9f9f9" }}>
                                        <Typography>닉네임</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField name="nickname" size="small" required/>
                                    </TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link>Already have an account? Sign in</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default Auth(RegisterPage, false)