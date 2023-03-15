import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
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
import styled from 'styled-components';
import { useState } from 'react';

const InfoBox = styled.div`
    color: #777;
`;

export default function RegisterPage() {
    const [idError, setIdError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordState, setPasswordState] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');

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
                <Box component="form">
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
                                    <TableCell sx={{background:"#f9f9f9"}}>
                                        <Typography>아이디</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField name="userId" size="small" error={idError !== "" || false} required/>
                                        <FormHelperText error>{idError}</FormHelperText>
                                        <InfoBox>
                                            <span>사용자 ID는 5~20자 사이의 영문+숫자로 이루어져야 하며 영문으로 시작되어야 합니다.</span>
                                        </InfoBox>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{background:"#f9f9f9"}}>
                                        <Typography>비밀번호</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField name="password" type="password" size="small" error={passwordState !== "" || false} required/>
                                        <FormHelperText error>{passwordState}</FormHelperText>
                                        <InfoBox>
                                            <span>비밀번호는 8~12자 사이의 영문+숫자로 이루어져야 하며 특수문자(!@#$%*)를 반드시 포함하여야 합니다.</span>
                                        </InfoBox>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row" sx={{background:"#f9f9f9"}}>
                                        <Typography noWrap>비밀번호 확인</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField name="rePassword" type="password" size="small" error={passwordError !== "" || false} required/>
                                        <FormHelperText error>{passwordError}</FormHelperText>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{background:"#f9f9f9"}}>
                                        <Typography>닉네임</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField name="nickName" size="small" error={nameError !== "" || false} required/>
                                        <FormHelperText error>{nameError}</FormHelperText>
                                        <InfoBox>
                                            <span>닉네임은 2~8자 이내여야 합니다.</span>
                                        </InfoBox>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{background:"#f9f9f9",borderBottom:"1px solid #888"}}>
                                        <Typography noWrap>이메일 주소</Typography>
                                    </TableCell>
                                    <TableCell sx={{borderBottom:"1px solid #888"}}>
                                        <TextField name="email" size="small" error={emailError !== "" || false} required/>
                                        <FormHelperText error>{emailError}</FormHelperText>
                                        <InfoBox>
                                            <span>메일주소는 메일인증 후 비밀번호 변경이나 찾기 등에 사용됩니다.</span>
                                        </InfoBox>
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