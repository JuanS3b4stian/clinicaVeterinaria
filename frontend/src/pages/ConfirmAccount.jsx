import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosClient from '../config/axiosClient.js';
import Alert from '../components/Alert.jsx';

const ConfirmAccount = () => {
  const { token } = useParams();
  const [alert, setAlert] = useState({ type: 'info', message: 'Confirmando cuenta...' });

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const { data } = await axiosClient.get(`/veterinarios/confirm/${token}`);
        setAlert({ type: 'success', message: data.msg || 'Cuenta confirmada correctamente.' });
      } catch (error) {
        setAlert({
          type: 'error',
          message: error.response?.data?.msg || 'No fue posible confirmar la cuenta.'
        });
      }
    };

    confirmAccount();
  }, [token]);

  return (
    <div className="space-y-6 text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Confirmación</p>
        <h2 className="mt-2 text-3xl font-bold text-white">Verificación de cuenta</h2>
      </div>

      <Alert type={alert.type} message={alert.message} />

      <Link className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400" to="/">
        Volver al login
      </Link>
    </div>
  );
};

export default ConfirmAccount;