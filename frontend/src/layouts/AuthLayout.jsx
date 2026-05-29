import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute inset-0 opacity-60">
        <div className="absolute left-[-10%] top-[-15%] h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute right-[-10%] top-[20%] h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="absolute bottom-[-15%] left-[35%] h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <section className="relative grid w-full max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-center rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-glow sm:p-10 lg:p-12">
          <span className="mb-4 inline-flex w-fit items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
            Clínica Veterinaria
          </span>
          <h1 className="max-w-xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Gestión clínica con un flujo de autenticación claro y seguro.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Registra veterinarios, confirma cuentas por token, inicia sesión y restablece contraseñas desde una interfaz pública limpia y responsiva.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <article className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-sm font-semibold text-white">Confirmación</p>
              <p className="mt-1 text-sm text-slate-400">Tokens únicos para activar cuentas.</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-sm font-semibold text-white">Acceso</p>
              <p className="mt-1 text-sm text-slate-400">JWT para mantener la sesión segura.</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-sm font-semibold text-white">Responsive</p>
              <p className="mt-1 text-sm text-slate-400">Diseño centrado y adaptable a móvil.</p>
            </article>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 shadow-glow backdrop-blur-xl sm:p-6">
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;