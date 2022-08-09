import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsAuth,
  fetchAuth,
  fetchRegistration,
} from "../../redux/slices/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";

export const Registration = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegistration(values));
    if (!data.payload) {
      return alert("Не удалось зарегристрироваться");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    } else {
      alert("Не удалось зарегистрироваться");
    }
  };
  if (isAuth) {
    navigate("/");
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
        <TextField
          className={styles.field}
          label="Полное имя"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register("fullName", { required: "Укажите ваше имя" })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Укажите почту" })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Укажите пароль" })}
          fullWidth
        />
        <Button
          disabled={!isValid}
          size="large"
          variant="contained"
          fullWidth
          type="submit"
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
