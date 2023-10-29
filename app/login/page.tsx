'use client';
import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import FormikError from '../component/Formik';
import { userLoginAPI } from '../api/user';
import { useRouter } from 'next/navigation';
import { useSession } from '../component/SessionProvider';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is Required'),
    password: Yup.string().required('Password is Required'),
});

export default function LogIn() {
    const router = useRouter()
    const session = useSession();

    const { mutate, error, data } = userLoginAPI();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values) => {
            mutate({
                email: values.email,
                password: values.password
            })
        },
        validationSchema: LoginSchema,
    });

    useEffect(() => {
        if (error) {
            toast.error(error?.response?.data.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                theme: "light",
            });
        }
        if (data) {
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', data.result.token);
                delete data.result.token;
                localStorage.setItem('userInfo', JSON.stringify(data.result));

                toast.success(data.message, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    theme: "light",
                })

                window.location.reload();
            }
        }
    }, [error, data])

    useEffect(()=>{
        if(session){
            router.push('/chat');
        }
    },[session])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box width={400}>
                    <form className="w-50" onSubmit={formik.handleSubmit}>
                        <Grid>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            <FormikError keyName={'email'} formik={formik} />
                        </Grid>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        <FormikError keyName={'password'} formik={formik} />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </form>

                    <Grid container>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}