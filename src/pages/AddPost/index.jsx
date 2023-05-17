import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { useSelector } from "react-redux";
import { isAuthSelector } from "../../redux/slicers/auth";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { instance } from "../../axios";

export const AddPost = () => {
  const { id } = useParams();
  const isAuth = useSelector(isAuthSelector);
  const navigate = useNavigate();
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputFileRef = useRef();
  const imageUrl = imgUrl;
const isEditMode = Boolean(id)

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await instance.post("/upload", formData);
      setImgUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert("Image not load");
    }
  };

  const onClickRemoveImage = () => {
    setImgUrl("");
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000
      }
    }),
    []
  );
  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const fields = {
        title, tags, text, imageUrl: imgUrl
      };

      const { data } = isEditMode?
        instance.patch(`/posts/${id}`, fields):
        instance.post("/posts", fields);

      const _id = isEditMode?id:data._id;
      navigate(`/posts/${_id}`);
    } catch (err) {
      console.warn(err);
      alert("Post not created");
    }
  };
  React.useEffect(() => {
    if (id) {
      instance.get(`posts/${id}`)
        .then(data => {
          console.log(data);
          setText(data.data.text),
            setTitle(data.data.title),
            setTags(data.data.tags.join(',')),
            setImgUrl(data.data.imageUrl)
          ;
        });
    }
  },[]);
  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to={"/auth/login"} />;
  }


  return (
    <Paper style={{ padding: 30 }}>
      <Button variant="outlined" size="large" onClick={() => {
        inputFileRef.current.click();
      }}>
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {imageUrl && (
        <img className={styles.image} src={`process.env.REACT_APP_API_URL${imageUrl}`}
             alt="Uploaded" />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <TextField classes={{ root: styles.tags }} variant="standard" placeholder="Тэги"
                 fullWidth
                 value={tags}
                 onChange={e => setTags(e.target.value)} />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange}
                 options={options} />
      <div className={styles.buttons}>
        <Button size="large" variant="contained" onClick={onSubmit}>
          {isEditMode?'Сохранить':'Опубликовать'}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
