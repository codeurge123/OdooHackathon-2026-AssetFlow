import { motion } from 'framer-motion'

function LoginPage({ onLogin, onCreateAccount }) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-100 px-4 py-6 sm:px-6 lg:grid lg:place-items-center lg:p-8">
      <motion.section
        initial={{ opacity: 0, scale: 0.98, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="mx-auto grid min-h-[700px] w-full max-w-[1180px] overflow-hidden border border-slate-300 bg-white shadow-2xl shadow-slate-300/60 lg:grid-cols-[1.04fr_0.96fr]"
      >
        <aside className="relative hidden overflow-hidden bg-[#1454ad] px-10 py-12 text-white lg:flex lg:flex-col xl:px-12">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute -left-24 top-20 h-[430px] w-[620px] rotate-[-34deg] rounded-[42%] border-2 border-blue-300/40" />
            <div className="absolute -right-44 top-[-45px] h-[400px] w-[680px] rotate-[35deg] rounded-[42%] border-2 border-blue-300/40" />
            <div className="absolute -bottom-56 left-0 h-[520px] w-[620px] rotate-[20deg] rounded-[44%] border-2 border-blue-300/30" />
            <div className="absolute -bottom-20 right-[-120px] h-[360px] w-[530px] rotate-[-38deg] rounded-[42%] border-2 border-blue-300/30" />
          </div>

          <div className="relative flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center border-2 border-white text-sm font-black">
              AF
            </div>
            <span className="text-lg font-bold tracking-tight">AssetFlow</span>
          </div>

          <div className="relative my-auto max-w-[470px] pt-12">
            <h1 className="text-4xl font-bold leading-[1.14] tracking-tight xl:text-5xl">
              Manage enterprise assets with clarity and control.
            </h1>
            <p className="mt-10 max-w-md text-base leading-7 text-blue-50 xl:text-lg">
              Track, assign, and manage organizational assets through a secure
              and centralized enterprise platform.
            </p>
          </div>

          <div className="relative border border-blue-200/40 bg-blue-950/10 p-6">
            <p className="text-sm font-bold tracking-[0.12em]">
              ENTERPRISE ASSET MANAGEMENT
            </p>
            <p className="mt-3 max-w-md text-sm leading-6 text-blue-50">
              Secure asset tracking, role-based access, department management,
              and complete asset lifecycle visibility.
            </p>
          </div>
        </aside>

        <div className="flex items-center justify-center px-6 py-12 sm:px-12 lg:px-16 xl:px-20">
          <motion.form
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.08 }}
            className="w-full max-w-[365px]"
            onSubmit={(event) => {
              event.preventDefault()
              onLogin()
            }}
          >
            <div className="mb-9 lg:hidden">
              <div className="mb-6 flex items-center gap-3 text-[#1454ad]">
                <div className="grid h-10 w-10 place-items-center bg-[#1454ad] text-sm font-black text-white">
                  AF
                </div>
                <span className="text-lg font-bold text-slate-950">AssetFlow</span>
              </div>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-950">
              Welcome back
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Sign in to access your AssetFlow workspace.
            </p>

            <div className="mt-9 space-y-5">
              <label className="block text-left text-xs font-bold uppercase tracking-[0.08em] text-slate-800">
                Email
                <input
                  className="mt-2 w-full border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1454ad] focus:bg-white focus:ring-2 focus:ring-blue-100"
                  defaultValue="name@company.com"
                  type="email"
                />
              </label>

              <div>
                <label className="block text-left text-xs font-bold uppercase tracking-[0.08em] text-slate-800">
                  Password
                  <input
                    className="mt-2 w-full border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1454ad] focus:bg-white focus:ring-2 focus:ring-blue-100"
                    defaultValue="password"
                    type="password"
                  />
                </label>

                <button
                  className="mt-2 block text-sm font-semibold text-[#1454ad] transition hover:text-blue-800"
                  type="button"
                >
                  Forgot password?
                </button>
              </div>

              <button
                className="w-full bg-[#1454ad] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0f438d] focus:outline-none focus:ring-4 focus:ring-blue-200"
                type="submit"
              >
                Log In
              </button>
            </div>

            <p className="mt-6 text-sm font-medium text-slate-600">
              Need an account?{' '}
              <button
                className="font-bold text-[#1454ad] transition hover:text-blue-800"
                type="button"
                onClick={onCreateAccount}
              >
                Create Account
              </button>
            </p>
          </motion.form>
        </div>
      </motion.section>
    </main>
  )
}

export default LoginPage
