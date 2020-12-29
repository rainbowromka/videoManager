import React from 'react'
import {Field, reduxForm} from 'redux-form'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import asyncValidate from './asyncValidate'
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const validate = values => {
    const errors = {}
    const requiredFields = [
        'login',
        'password',
        // 'lastName',
        // 'email',
        // 'favoriteColor',
        // 'notes'
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
        if (
            values.login &&
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.login)
        ) {
            errors.login = 'Invalid email address'
        }
    })
    return errors
}

const renderTextField = ({
                             label,
                             input,
                             meta: {touched, invalid, error},
                             ...custom
                         }) => (
    <TextField
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
)

const renderTextFieldPass = ({
                             label,
                             input,
                             meta: {touched, invalid, error},
                             ...custom
                         }) => (
    <TextField
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        type="password"
        {...input}
        {...custom}
    />
)

const renderCheckbox = ({input, label}) => (
    <div>
        <FormControlLabel
            control={
                <Checkbox
                    checked={input.value ? true : false}
                    onChange={input.onChange}
                />
            }
            label={label}
        />
    </div>
)

const MaterialUiForm = props => {
    const {handleSubmit, pristine, reset, submitting, classes} = props

    const s = useStyles();

    return (
        <form onSubmit={handleSubmit}>
            <Grid container className={s.root}>
                <Grid xs sm={1} md={2} lg={3} xl={4} item/>
                <Grid item container direction="column"
                      xs={12} sm={10} md={8} lg={6} xl={4}>
                    <Field
                        name="login"
                        component={renderTextField}
                        label="Ваша почта"
                    />
                    <Field name="password" component={renderTextFieldPass}
                           label="Пароль"/>
                    <Field name="remember" component={renderCheckbox}
                           label="Запомнить"/>
                </Grid>
                <Grid xs sm={1} md={2} lg={3} xl={4} item/>
                <Button type="submit" variant="contained" color="primary"
                        disabled={pristine || submitting}>
                    Войти
                </Button>
            </Grid>
        </form>
    )
}

export default reduxForm({
    form: 'MaterialUiForm', // a unique identifier for this form
    validate,
    asyncValidate
})(MaterialUiForm)

/**
 * Старое сделанное мной.
 */
//
//
// const LoginForm = (props) => {
//     const classes = useStyles();
//
//     const [state, setState] = React.useState({
//         checkedA: true,
//         checkedB: true,
//         checkedF: true,
//         checkedG: true,
//     });
//
//     const handleChange = (event) => {
//         setState({...state, [event.target.name]: event.target.checked});
//     };
//
//     // <TextField id="username" label="Имя пользователя"/>
//     return <form noValidate autoComplete="off">
//         <Grid container className={classes.root}>
//             <Grid xs sm={1} md={2} lg={3} xl={4} item/>
//             <Grid item container direction="column"
//                   xs={12} sm={10} md={8} lg={6} xl={4}>
//                 <Field name="login" component={renderTextField} label="Имя пользователя"/>
//
//                 <TextField id="password" label="Пароль" type="password"/>
//                 {/*<FormControlLabel*/}
//                 {/*    control={*/}
//                 {/*        <Checkbox*/}
//                 {/*            checked={state.checkedB}*/}
//                 {/*            onChange={handleChange}*/}
//                 {/*            name="checkedB"*/}
//                 {/*            color="primary"*/}
//                 {/*        />*/}
//                 {/*    }*/}
//                 {/*    label="Запомнить"*/}
//                 {/*/>*/}
//             </Grid>
//             <Grid xs sm={1} md={2} lg={3} xl={4} item/>
//             <Button variant="contained" color="primary">
//                 Войти
//             </Button>
//
//         </Grid>
//     </form>
// }
//
// const LoginReduxForm = reduxForm({
//     form: 'login',
// })(LoginForm);
//
// const Login = (props) => {
//
//     const onSubmit = (formData) => {
//         console.log(formData)
//         // AuthApi.login({
//         //     email: formData.login,
//         //     password: formData.password,
//         //     rememberMe: formData.rememberMe,
//         // }).then(response => {
//         //     console.log(response);
//         // })
//     }
//
//     return <LoginReduxForm onSubmit={onSubmit}/>
// }
//
// export default Login;