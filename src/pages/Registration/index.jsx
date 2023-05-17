import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, fetchRegistration, isAuthSelector } from "../../redux/slicers/auth";
import { Navigate } from "react-router-dom";

export const Registration = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(isAuthSelector)
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: "Polina",
      email: "test@test.by",
      password: "12345"
    },
    mode: "onChange"
  });
  const onSubmit = async(values) => {
    const data = await dispatch(fetchRegistration(values));

    if(!data.payload){
      alert('You are not registration')
    }
    if('token' in data.payload){
      window.localStorage.setItem('token', data.payload.token)
    }

  };
  if(isAuth){
    return <Navigate to={'/'}/>
  }

    return (
      <Paper classes={{ root: styles.root }}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Создание аккаунта
        </Typography>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>


          <TextField className={styles.field} label="Полное имя" fullWidth
                     error={Boolean(errors.fullName?.message)}
                     helperText={errors.fullName?.message}
                     {...register("fullName", { required: "Enter fullName" })} />
          <TextField className={styles.field} label="E-Mail" fullWidth
                     error={Boolean(errors.email?.message)}
                     helperText={errors.email?.message}
                     {...register("email", { required: "Enter email" })} />
          <TextField className={styles.field} label="Пароль" fullWidth
                     error={Boolean(errors.password?.message)}
                     helperText={errors.password?.message}
                     {...register("password", { required: "Enter password" })} />
          <Button size="large" variant="contained" fullWidth type="submit"
                  disabled={!isValid}>
            Зарегистрироваться
          </Button>
        </form>
      </Paper>
    );

};
