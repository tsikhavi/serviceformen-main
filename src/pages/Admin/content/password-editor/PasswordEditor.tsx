import { useEffect, useState } from "react";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import styles from "./PasswordEditor.module.sass";

import { Delete as DeleteIcon } from "../../../../assets/Delete";
import { Save as SaveIcon } from "../../../../assets/Save";
import ConfirmMessageModal from "../../../../components/Modals/ConfirmMessageModal";

const PasswordEditor = () => {
  const {
    addLogin,
    updateLogin,
    deleteLogin,
    getLogins,
  } = useActions();
  const logins = useTypedSelector((state) => state.coreReducer.logins);
  const [editedLogins, setEditedLogins] = useState([] as any[]);
  const [newLogin, setNewLogin] = useState({ login: '', password: '' });
  const [isConfirmLoginModalShow, setIsConfirmLoginModalShow] = useState(false as any);

  const handleLoginChange = (index, event) => {
    const { name, value } = event.target;
    let editedLoginsCopy = JSON.parse(JSON.stringify(editedLogins));
    editedLoginsCopy[index][name] = value;
    editedLoginsCopy[index]['edited'] = true;
    setEditedLogins(editedLoginsCopy);
  };

  const handleNewLoginChange = (event) => {
    const { name, value } = event.target;
    const tempLogin = newLogin
    tempLogin[name] = value;
    setNewLogin(tempLogin);
  };

  const handleSaveChangedLogin = async (index) => {
    let editedLoginsCopy = JSON.parse(JSON.stringify(editedLogins));
    editedLoginsCopy[index]['edited'] = false;
    await updateLogin(editedLoginsCopy[index]);
    getLogins();
  };

  const handleAddLogin = async () => {
    await addLogin(newLogin);
    getLogins();
    setNewLogin({ login: '', password: '' });
  };

  useEffect(() => {
    setEditedLogins([...logins].sort((a, b) => a.login.localeCompare(b.login)))
  }, [logins]);

  const handleConfirmDeleteLogin = async () => {
    await deleteLogin({ id: isConfirmLoginModalShow });
    getLogins();
    setIsConfirmLoginModalShow(false);
  };

  return (
    <div className={styles.main_content}>
      <div className={styles.title}>Редактирование логинов</div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Login</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {editedLogins.map((login, index) => (
              <tr key={index}>
                <td><input type="text" name="login" value={login.login} onChange={e => handleLoginChange(index, e)} disabled/></td>
                <td><input type="text" name="password" value={login.password} onChange={e => handleLoginChange(index, e)} /></td>
                <div className={styles.buttons}>
                  <button disabled={!login.edited} type="button" onClick={() => handleSaveChangedLogin(index)}>
                    <SaveIcon />
                  </button>
                  <button className={styles.delete_button} type="button" onClick={() => setIsConfirmLoginModalShow(login.id)}>
                    <DeleteIcon />
                  </button>
                </div>
              </tr>
            ))}
            <tr>
              <td><input type="text" name="login" value={newLogin.login} onChange={e => handleNewLoginChange(e)} /></td>
              <td><input type="text" name="password" value={newLogin.password} onChange={e => handleNewLoginChange(e)} /></td>
            </tr>
          </tbody>
        </table>
        <button onClick={handleAddLogin}>Сохранить новый логин</button>
      </div>
      <ConfirmMessageModal
        text={'Вы действительно хотите удалить логин?'}
        okButtonText={'Удалить'}
        handlerOkOnClick={handleConfirmDeleteLogin}
        cancelButtonText={'Отменить'}
        isShow={!!isConfirmLoginModalShow}
        setIsShow={setIsConfirmLoginModalShow}
      />
    </div>
  );
};

export default PasswordEditor;
