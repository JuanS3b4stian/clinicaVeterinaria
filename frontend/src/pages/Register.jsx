import { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../config/axiosClient.js';
import Alert from '../components/Alert.jsx';

const initialState = {
  name: '',
  email: '',
  password: '',
  repeatPassword: '',
  phone: '',
  web: ''
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.repeatPassword) {
      return setAlert({ type: 'error', message: 'Nombre, email y contraseña son obligatorios.' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return setAlert({ type: 'error', message: 'El email no tiene un formato válido.' });
    }

    if (formData.password.length < 6) {
      return setAlert({ type: 'error', message: 'La contraseña debe tener al menos 6 caracteres.' });
    }

    if (formData.password !== formData.repeatPassword) {
      return setAlert({ type: 'error', message: 'Las contraseñas no coinciden.' });
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        web: formData.web
      };

      const { data } = await axiosClient.post('/veterinarios/register', payload);
      setAlert({ type: 'success', message: data.msg || 'Registro correcto. Revisa tu correo.' });
      setFormData(initialState);
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.msg || 'No fue posible registrar el usuario.'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Registro</p>
        <h2 className="mt-2 text-3xl font-bold text-white">Crear cuenta</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">Completa los datos básicos para activar tu acceso.</p>
      </div>

      <Alert type={alert.type} message={alert.message} />

      <form className="grid gap-4" onSubmit={handleSubmit}>
        <input className="input-field" name="name" type="text" placeholder="Nombre del veterinario" value={formData.name} onChange={handleChange} />
        <input className="input-field" name="email" type="email" placeholder="correo@clinica.com" value={formData.email} onChange={handleChange} />
        <input className="input-field" name="phone" type="tel" placeholder="Teléfono (opcional)" value={formData.phone} onChange={handleChange} />
        <input className="input-field" name="web" type="url" placeholder="Sitio web (opcional)" value={formData.web} onChange={handleChange} />
        <input className="input-field" name="password" type="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} />
        <input className="input-field" name="repeatPassword" type="password" placeholder="Repetir contraseña" value={formData.repeatPassword} onChange={handleChange} />

        <button type="submit" className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">
          Registrarme
        </button>
      </form>

      <p className="text-sm text-slate-400">
        ¿Ya tienes cuenta?{' '}
        <Link className="font-medium text-cyan-300 hover:text-cyan-200" to="/">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
};

export default Register;