import { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../config/axiosClient.js';
import Alert from '../components/Alert.jsx';
import useAuth from '../hooks/useAuth.js';

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [alert, setAlert] = useState({ type: '', message: '' });

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      return setAlert({ type: 'error', message: 'Completa email y contraseña.' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return setAlert({ type: 'error', message: 'El email no tiene un formato válido.' });
    }

    try {
      const { data } = await axiosClient.post('/veterinarios/login', formData);
      login(data);
      setAlert({ type: 'success', message: 'Inicio de sesión correcto.' });
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.msg || 'No fue posible iniciar sesión.'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Acceso</p>
        <h2 className="mt-2 text-3xl font-bold text-white">Inicia sesión</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">Ingresa con el correo confirmado de tu cuenta veterinaria.</p>
      </div>

      <Alert type={alert.type} message={alert.message} />

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="correo@clinica.com"
            className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Entrar
        </button>
      </form>

      <div className="flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <Link className="font-medium text-cyan-300 hover:text-cyan-200" to="/forgot-password">
          Olvidé mi password
        </Link>
        <Link className="font-medium text-cyan-300 hover:text-cyan-200" to="/register">
          Crear cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;