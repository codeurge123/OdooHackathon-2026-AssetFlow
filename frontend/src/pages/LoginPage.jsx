import { motion } from 'framer-motion'

function LoginPage({ onLogin }) {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 px-4">
      <motion.form
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-200/70"
        onSubmit={(event) => {
          event.preventDefault()
          onLogin()
        }}
      >
        <div className="border-b border-slate-200 px-6 py-4 text-center text-lg font-bold text-slate-950">AssetFlow - Login</div>
        <div className="space-y-5 p-6">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cyan-50 text-xl font-black text-cyan-700 ring-1 ring-cyan-200">AF</div>
          <label className="block text-left text-sm font-medium text-slate-700">
            Email
            <input className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100" defaultValue="name@company.com" type="email" />
          </label>
          <label className="block text-left text-sm font-medium text-slate-700">
            Password
            <input className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100" defaultValue="password" type="password" />
          </label>
          <button className="ml-auto block text-sm font-semibold text-cyan-700" type="button">Forgot password</button>
          <div className="border-t border-slate-200 pt-4 text-left">
            <p className="text-sm font-semibold text-slate-900">New here?</p>
            <p className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">Signup creates an employee account. Admin roles are assigned later from the employee directory.</p>
          </div>
          <button className="w-full rounded-lg bg-slate-950 px-4 py-3 font-semibold text-white transition hover:bg-cyan-800" type="submit">Create Account</button>
        </div>
      </motion.form>
    </main>
  )
}

export default LoginPage
