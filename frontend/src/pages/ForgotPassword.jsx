import { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../config/axiosClient.js';
import Alert from '../components/Alert.jsx';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({ type: '', message: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      return setAlert({ type: 'error', message: 'Debes ingresar un email.' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setAlert({ type: 'error', message: 'El email no tiene un formato válido.' });
    }

    try {
      const { data } = await axiosClient.post('/veterinarios/forget-password', { email });
      setAlert({ type: 'success', message: data.msg || 'Revisa tu correo para continuar.' });
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.msg || 'No fue posible solicitar el restablecimiento.'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Recuperación</p>
        <h2 className="mt-2 text-3xl font-bold text-white">Olvidé mi password</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">Te enviaremos un enlace temporal para crear una nueva contraseña.</p>
      </div>

      <Alert type={alert.type} message={alert.message} />

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="email"
          placeholder="correo@clinica.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <button type="submit" className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">
          Enviar instrucciones
        </button>
      </form>

      <p className="text-sm text-slate-400">
        <Link className="font-medium text-cyan-300 hover:text-cyan-200" to="/">
          Volver al login
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;