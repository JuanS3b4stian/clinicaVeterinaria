import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../config/axiosClient.js';
import Alert from '../components/Alert.jsx';

const NewPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ type: 'info', message: 'Validando token...' });
  const [formData, setFormData] = useState({ password: '', repeatPassword: '' });
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const { data } = await axiosClient.get(`/veterinarios/forget-password/${token}`);
        setAlert({ type: 'success', message: data.msg || 'Token válido. Crea tu nueva contraseña.' });
        setTokenValid(true);
      } catch (error) {
        setAlert({
          type: 'error',
          message: error.response?.data?.msg || 'Token no válido o expirado.'
        });
      }
    };

    checkToken();
  }, [token]);

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!tokenValid) {
      return setAlert({ type: 'error', message: 'El token todavía no es válido.' });
    }

    if (!formData.password || !formData.repeatPassword) {
      return setAlert({ type: 'error', message: 'Completa ambos campos de contraseña.' });
    }

    if (formData.password.length < 6) {
      return setAlert({ type: 'error', message: 'La contraseña debe tener al menos 6 caracteres.' });
    }

    if (formData.password !== formData.repeatPassword) {
      return setAlert({ type: 'error', message: 'Las contraseñas no coinciden.' });
    }

    try {
      const { data } = await axiosClient.post(`/veterinarios/forget-password/${token}`, {
        password: formData.password
      });

      setAlert({ type: 'success', message: data.msg || 'Contraseña actualizada.' });
      setFormData({ password: '', repeatPassword: '' });
      setTimeout(() => navigate('/'), 1200);
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.msg || 'No fue posible cambiar la contraseña.'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Nueva contraseña</p>
        <h2 className="mt-2 text-3xl font-bold text-white">Restablecer acceso</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">Define una nueva contraseña segura para tu cuenta.</p>
      </div>

      <Alert type={alert.type} message={alert.message} />

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="password"
          name="password"
          placeholder="Nueva contraseña"
          value={formData.password}
          onChange={handleChange}
          disabled={!tokenValid}
        />
        <input
          className="input-field"
          type="password"
          name="repeatPassword"
          placeholder="Repetir contraseña"
          value={formData.repeatPassword}
          onChange={handleChange}
          disabled={!tokenValid}
        />

        <button
          type="submit"
          disabled={!tokenValid}
          className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300"
        >
          Guardar contraseña
        </button>
      </form>

      <p className="text-sm text-slate-400">
        <Link className="font-medium text-cyan-300 hover:text-cyan-200" to="/">
          Regresar al login
        </Link>
      </p>
    </div>
  );
};

export default NewPassword;