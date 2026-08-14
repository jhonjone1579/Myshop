import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login,loginWithGoogle } = useAuth();
  const navigate = useNavigate();
// Email/Password ဖြင့် Login ဝင်ခြင်း
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('အကောင့်ဝင်ရောက်ခြင်း အောင်မြင်ပါသည် 🔑');
      navigate('/');
    } catch (error) {
      toast.error('Email သို့မဟုတ် Password မှားယွင်းနေပါသည်');
    } finally {
      setLoading(false);
    }
  };
// Google ဖြင့် 1-Click Login ဝင်ခြင်း
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success('Google အကောင့်ဖြင့် အောင်မြင်စွာ ဝင်ရောက်ပြီးပါပြီ 🚀');
      navigate('/');
    } catch (error) {
      toast.error('Google ဖြင့် အကောင့်ဝင်ခြင်း မအောင်မြင်ပါ');
    }
  };
  return (
    <div className="container mx-auto flex h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-2 rounded-full bg-blue-50 p-3 text-blue-600">
            <LogIn className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">အကောင့်သို့ ဝင်ရောက်မည်</h2>
          <p className="text-xs text-gray-500 mt-1">ကျေးဇူးပြု၍ မိမိ အကောင့်အချက်အလက်များကို ဖြည့်သွင်းပါ</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-600">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
              placeholder="example@mail.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-600">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 active:scale-95 disabled:bg-blue-300"
          >
            {loading ? 'ဝင်ရောက်နေပါသည်...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-500">
          အကောင့် မရှိသေးပါက?{' '}
          <Link to="/register" className="font-semibold text-blue-600 hover:underline">
            အကောင့်သစ်ဖွင့်မည်
          </Link>
        </p>
      </div>
    </div>
  );
}