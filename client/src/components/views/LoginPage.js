import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


export default function LoginPage() {

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
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
                    Sign in
                </Typography>
                <Box>
                    <TextField
                        label="Email Address"
                        required
                        fullWidth
                        name="email"
                        autoComplete="email"
                        autoFocus
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        required
                        fullWidth
                        name="password"
                        autoComplete="current-password"
                        margin="normal"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link>Forgot password?</Link>
                        </Grid>
                        <Grid item>
                            <Link>Sign Up</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}