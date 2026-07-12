import { useState } from 'react'
import { motion } from 'framer-motion'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function LoginPage({ onLogin, onCreateAccount, authError }) {
  const [mode, setMode] = useState('login')
  const [loginType, setLoginType] = useState('admin')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
  })

  const updateForm = (field, value) => setForm((current) => ({ ...current, [field]: value }))

  const validate = () => {
    if (!form.email || !form.password) return 'Email and password are required'
    if (!emailRegex.test(form.email)) return 'Enter a valid email address'
    if (mode === 'create' && !form.name) return 'Name is required'
    if (mode === 'create' && form.password.length < 6) return 'Password must be at least 6 characters'
    return ''
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setError('')
    if (mode === 'create') {
      await onCreateAccount(form)
      return
    }
    await onLogin({ email: form.email, password: form.password, loginType })
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-100 px-4 py-6 sm:px-6 lg:grid lg:place-items-center lg:p-8">
      <motion.section initial={{ opacity: 0, scale: 0.98, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.35, ease: 'easeOut' }} className="mx-auto grid min-h-[700px] w-full max-w-[1180px] overflow-hidden border border-slate-300 bg-white shadow-2xl shadow-slate-300/60 lg:grid-cols-[1.04fr_0.96fr]">
        <aside className="relative hidden overflow-hidden bg-[#1454ad] px-10 py-12 text-white lg:flex lg:flex-col xl:px-12">
          <div className="relative flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center border-2 border-white text-sm font-black">AF</div>
            <span className="text-lg font-bold tracking-tight">AssetFlow</span>
          </div>
          <div className="relative my-auto max-w-[470px] pt-12">
            <h1 className="text-4xl font-bold leading-[1.14] tracking-tight xl:text-5xl">Manage enterprise assets with clarity and control.</h1>
            <p className="mt-10 max-w-md text-base leading-7 text-blue-50 xl:text-lg">Admins control the ERP workspace. Employees can create accounts, request resources, and track their allocations.</p>
          </div>
        </aside>

        <div className="flex items-center justify-center px-6 py-12 sm:px-12 lg:px-16 xl:px-20">
          <motion.form initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay: 0.08 }} className="w-full max-w-[390px]" onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold tracking-tight text-slate-950">{mode === 'login' ? 'Welcome back' : 'Create employee account'}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{mode === 'login' ? 'Sign in to the correct AssetFlow workspace.' : 'Employee accounts can request resources and view allocations only.'}</p>

            {mode === 'login' && (
              <div className="mt-6 grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1">
                {['admin', 'employee'].map((type) => (
                  <button className={`rounded-md px-3 py-2 text-sm font-bold ${loginType === type ? 'bg-white text-[#1454ad] shadow-sm' : 'text-slate-600'}`} key={type} onClick={() => setLoginType(type)} type="button">
                    {type === 'admin' ? 'Admin Login' : 'Employee Login'}
                  </button>
                ))}
              </div>
            )}

            <div className="mt-7 space-y-5">
              {mode === 'create' && (
                <label className="block text-left text-xs font-bold uppercase tracking-[0.08em] text-slate-800">
                  Name
                  <input className="mt-2 w-full border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#1454ad] focus:bg-white focus:ring-2 focus:ring-blue-100" value={form.name} onChange={(event) => updateForm('name', event.target.value)} />
                </label>
              )}
              <label className="block text-left text-xs font-bold uppercase tracking-[0.08em] text-slate-800">
                Email
                <input className="mt-2 w-full border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#1454ad] focus:bg-white focus:ring-2 focus:ring-blue-100" placeholder={loginType === 'admin' ? 'admin@assetflow.com' : 'priya@assetflow.test'} type="email" value={form.email} onChange={(event) => updateForm('email', event.target.value)} />
              </label>
              <label className="block text-left text-xs font-bold uppercase tracking-[0.08em] text-slate-800">
                Password
                <div className="mt-2 flex border border-slate-300 bg-slate-50 focus-within:border-[#1454ad] focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">
                  <input className="w-full bg-transparent px-4 py-3 text-sm text-slate-900 outline-none" type={showPassword ? 'text' : 'password'} value={form.password} onChange={(event) => updateForm('password', event.target.value)} />
                  <button className="px-4 text-sm font-bold text-[#1454ad]" type="button" onClick={() => setShowPassword((value) => !value)}>{showPassword ? 'Hide' : 'Show'}</button>
                </div>
              </label>
              {mode === 'create' && (
                <label className="block text-left text-xs font-bold uppercase tracking-[0.08em] text-slate-800">
                  Department
                  <input className="mt-2 w-full border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#1454ad] focus:bg-white focus:ring-2 focus:ring-blue-100" value={form.department} onChange={(event) => updateForm('department', event.target.value)} />
                </label>
              )}
              {(error || authError) && <div className="border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error || authError}</div>}
              <button className="w-full bg-[#1454ad] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0f438d]" type="submit">{mode === 'login' ? 'Log In' : 'Create Account'}</button>
            </div>

            <p className="mt-6 text-sm font-medium text-slate-600">
              {mode === 'login' ? 'Employee new here?' : 'Already have an account?'}{' '}
              <button className="font-bold text-[#1454ad]" type="button" onClick={() => { setMode(mode === 'login' ? 'create' : 'login'); setError('') }}>
                {mode === 'login' ? 'Create Account' : 'Back to Login'}
              </button>
            </p>
            <p className="mt-4 text-xs text-slate-500">Demo admin: admin@assetflow.com / Admin@123. Demo employee: priya@assetflow.test / Employee@123.</p>
          </motion.form>
        </div>
      </motion.section>
    </main>
  )
}

export default LoginPage
