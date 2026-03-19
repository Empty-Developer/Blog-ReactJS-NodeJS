import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux';
import { isAuthSelect } from '../../redux/slices/auth';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from '../../axios';

export const AddPost = () => {
  const navigate = useNavigate()
  const isAuth = useSelector(isAuthSelect)
  const [imageUrl, setImageUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const inputFileRef = React.useRef(null)

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData()
      const file = event.target.files[0]
      formData.append('image', file)

      const { data }  = await axios.post('/upload', formData)
      
      console.log('Ответ сервера:', data)
      setImageUrl(data.url)

    } catch (error) {
      alert('Ошибка при загрузке файла')
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('')
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      const fields = {
        title,
        imageUrl,
        tags: tags.split(','), 
        text
      };

      const { data } = await axios.post('/posts', fields);
      const id = data._id;

      navigate(`/posts/${id}`);
    } catch (error) {
      console.warn(error);
      alert('Ошибка при создании статьи');
    } finally {
      setIsLoading(false); 
    }
  };

  const onChange = React.useCallback((text) => {
    setText(text);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: 'add-post-editor',
      },
    }),
    [],
  );

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/"/>
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>

      <input 
        ref={inputFileRef} 
        type="file" 
        onChange={handleChangeFile}
        hidden 
      />

      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img className={styles.image} src={imageUrl.startsWith('http') ? imageUrl : `http://localhost:4444${imageUrl}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }} 
        variant="standard" 
        placeholder="Тэги" 
        value={tags}
        onChange={e => setTags(e.target.value)}
        fullWidth 
      />

      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          Опубликовать
        </Button>
        <Button onClick={() => navigate('/')} size="large">Отмена</Button>
      </div>
    </Paper>
  );
};
