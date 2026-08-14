import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error('Password နှစ်ခု ကိုက်ညီမှု မရှိပါ');
    }

    setLoading(true);
    try {
      await signup(email, password);
      toast.success('အကောင့်သစ် အောင်မြင်စွာ ဖွင့်လှစ်ပြီးပါပြီ 🎉');
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('ဒီ Email ဖြင့် အကောင့်ဖွင့်ပြီးသား ဖြစ်နေပါသည်');
      } else {
        toast.error('အကောင့်ဖွင့်ခြင်း မအောင်မြင်ပါ');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex h-[85vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-2 rounded-full bg-blue-50 p-3 text-blue-600">
            <UserPlus className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">အကောင့်သစ် ပြုလုပ်မည်</h2>
          <p className="text-xs text-gray-500 mt-1">အောက်ပါ အချက်အလက်များကို ဖြည့်စွက်ပါ</p>
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
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
              placeholder="အနည်းဆုံး ၆ လုံး"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-600">Confirm Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
              placeholder="Password အား ပြန်လည်ရိုက်ထည့်ပါ"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 active:scale-95 disabled:bg-blue-300"
          >
            {loading ? 'ပြုလုပ်နေပါသည်...' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-500">
          အကောင့် ရှိပြီးသားဖြစ်ပါက?{' '}
          <Link to="/login" className="font-semibold text-blue-600 hover:underline">
            အကောင့်ဝင်မည်
          </Link>
        </p>
      </div>
    </div>
  );
}