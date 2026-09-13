import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Check, Loader2, ArrowLeft, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import FormInput from '@/components/FormInput';

type Tab = 'register' | 'login';

type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type LoginData = {
  email: string;
  password: string;
};

type RegisterErrors = Partial<Record<keyof RegisterData, string>>;
type LoginErrors = Partial<Record<keyof LoginData, string>>;

const initialRegister: RegisterData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const initialLogin: LoginData = {
  email: '',
  password: '',
};

const planDisplayNames: Record<string, string> = {
  starter: 'استارتر',
  basic: 'پایه',
  essential: 'ضروری',
  plus: 'پلاس',
  smart: 'هوشمند',
  pro: 'حرفه‌ای',
  advanced: 'پیشرفته',
  premium: 'پریمیوم',
  ultimate: 'آلتیمیت',
  'plnz-plus': 'PLNZ+',
};

export default function GetStarted() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reduceMotion = useReducedMotion();
  const [tab, setTab] = useState<Tab>('register');
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  const [registerData, setRegisterData] = useState<RegisterData>(initialRegister);
  const [registerErrors, setRegisterErrors] = useState<RegisterErrors>({});

  const [loginData, setLoginData] = useState<LoginData>(initialLogin);
  const [loginErrors, setLoginErrors] = useState<LoginErrors>({});

  const firstNameRef = useRef<HTMLInputElement>(null);
  const loginEmailRef = useRef<HTMLInputElement>(null);

  const planSlug = searchParams.get('plan');
  const planName = planSlug ? planDisplayNames[planSlug] || null : null;

  useEffect(() => {
    if (tab === 'register') {
      setTimeout(() => firstNameRef.current?.focus(), 50);
    } else {
      setTimeout(() => loginEmailRef.current?.focus(), 50);
    }
  }, [tab]);

  const updateRegisterField = (field: keyof RegisterData, value: string) => {
    setRegisterData((prev) => ({ ...prev, [field]: value }));
    if (registerErrors[field]) {
      setRegisterErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (serverError) setServerError('');
  };

  const updateLoginField = (field: keyof LoginData, value: string) => {
    setLoginData((prev) => ({ ...prev, [field]: value }));
    if (loginErrors[field]) {
      setLoginErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (serverError) setServerError('');
  };

  const validateRegister = (): boolean => {
    const next: RegisterErrors = {};
    if (!registerData.firstName.trim()) next.firstName = 'لطفاً نام خود را وارد کنید.';
    if (!registerData.lastName.trim()) next.lastName = 'لطفاً نام خانوادگی خود را وارد کنید.';
    if (!registerData.email.trim()) {
      next.email = 'لطفاً ایمیل خود را وارد کنید.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email.trim())) {
      next.email = 'لطفاً یک ایمیل معتبر وارد کنید.';
    }
    if (!registerData.password) {
      next.password = 'لطفاً رمز عبور را وارد کنید.';
    } else if (registerData.password.length < 6) {
      next.password = 'رمز عبور باید حداقل ۶ کاراکتر باشد.';
    }
    if (!registerData.confirmPassword) {
      next.confirmPassword = 'لطفاً رمز عبور را تکرار کنید.';
    } else if (registerData.password !== registerData.confirmPassword) {
      next.confirmPassword = 'رمزهای عبور با یکدیگر مطابقت ندارند.';
    }
    setRegisterErrors(next);
    return Object.keys(next).length === 0;
  };

  const validateLogin = (): boolean => {
    const next: LoginErrors = {};
    if (!loginData.email.trim()) {
      next.email = 'لطفاً ایمیل خود را وارد کنید.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email.trim())) {
      next.email = 'لطفاً یک ایمیل معتبر وارد کنید.';
    }
    if (!loginData.password) {
      next.password = 'لطفاً رمز عبور را وارد کنید.';
    }
    setLoginErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    if (!validateRegister()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: registerData.email.trim().toLowerCase(),
        password: registerData.password,
        options: {
          data: {
            first_name: registerData.firstName.trim(),
            last_name: registerData.lastName.trim(),
          },
        },
      });

      if (error) {
        if (error.message.toLowerCase().includes('already') || error.message.toLowerCase().includes('registered')) {
          setServerError('این ایمیل قبلاً ثبت شده است.');
        } else {
          setServerError('خطایی رخ داد. لطفاً دوباره تلاش کنید.');
        }
        return;
      }
      setSuccess(true);
    } catch {
      setServerError('خطای شبکه. لطفاً اتصال اینترنت خود را بررسی کنید.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    if (!validateLogin()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginData.email.trim().toLowerCase(),
        password: loginData.password,
      });

      if (error) {
        if (
          error.message.toLowerCase().includes('invalid') ||
          error.message.toLowerCase().includes('credentials')
        ) {
          setServerError('اطلاعات واردشده صحیح نیست.');
        } else {
          setServerError('خطایی رخ داد. لطفاً دوباره تلاش کنید.');
        }
        return;
      }
      navigate('/app');
    } catch {
      setServerError('خطای شبکه. لطفاً اتصال اینترنت خود را بررسی کنید.');
    } finally {
      setSubmitting(false);
    }
  };

  const cardVariants = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20, scale: 0.98 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
        },
      };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-12">
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="w-full max-w-md"
        >
          <div className="glass-lime glass-shadow-lime rounded-5xl p-8 md:p-10 flex flex-col items-center text-center">
            <motion.div
              initial={reduceMotion ? {} : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' as const, stiffness: 200, damping: 15, delay: 0.15 }}
              className="w-16 h-16 rounded-full bg-neon flex items-center justify-center mb-6 shadow-[0_8px_32px_rgba(217,255,106,0.4)]"
            >
              <Check size={28} strokeWidth={3} className="text-ink" />
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-ink mb-3">
              خوش آمدی به PLANZ.
            </h2>
            <p className="text-ink-secondary font-medium text-sm md:text-base max-w-xs leading-[2]">
              حساب شما با موفقیت ساخته شد.
            </p>
            <button
              onClick={() => navigate('/app')}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-neon text-ink font-semibold text-sm px-6 py-3 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-[0_4px_20px_rgba(217,255,106,0.35)] hover:shadow-[0_6px_28px_rgba(217,255,106,0.5)]"
            >
              <ArrowLeft size={16} className="ml-2" strokeWidth={2.5} />
              ادامه
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-12">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <div className="glass-lime glass-shadow-lime rounded-5xl p-7 md:p-9">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="font-planz text-2xl font-extrabold tracking-tight text-ink mb-1" style={{ direction: 'ltr' }}>
              PLANZ
            </h1>
            <p className="text-sm text-ink-secondary font-medium mt-1.5 leading-[2]">
              {tab === 'register'
                ? 'حساب خود را بساز و هوشمندانه‌تر برنامه‌ریزی کن.'
                : 'خوش آمدی. وارد فضای برنامه‌ریزی‌ات شو.'}
            </p>
          </div>

          {/* Selected plan indicator */}
          {planName && (
            <div className="mb-5 rounded-2xl glass-float-lime px-4 py-2.5 flex items-center justify-center gap-2">
              <Sparkles size={14} className="text-ink" strokeWidth={2.5} />
              <span className="text-sm font-medium text-ink">
                پلن انتخابی: <span className="font-bold">{planName}</span>
              </span>
            </div>
          )}

          {/* Tab switcher */}
          <div className="flex gap-1 p-1 rounded-full glass-float-lime mb-6">
            <button
              onClick={() => { setTab('login'); setServerError(''); }}
              className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                tab === 'login'
                  ? 'bg-neon text-ink shadow-[0_2px_12px_rgba(217,255,106,0.3)]'
                  : 'text-ink-secondary hover:text-ink'
              }`}
            >
              ورود
            </button>
            <button
              onClick={() => { setTab('register'); setServerError(''); }}
              className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                tab === 'register'
                  ? 'bg-neon text-ink shadow-[0_2px_12px_rgba(217,255,106,0.3)]'
                  : 'text-ink-secondary hover:text-ink'
              }`}
            >
              ایجاد حساب
            </button>
          </div>

          {serverError && (
            <div className="mb-5 rounded-2xl bg-red-50/80 border border-red-200/40 px-4 py-3 text-center">
              <p className="text-sm font-medium text-red-500/90">{serverError}</p>
            </div>
          )}

          <AnimatePresence mode="wait">
            {tab === 'register' ? (
              <motion.form
                key="register"
                onSubmit={handleRegister}
                className="flex flex-col gap-3.5"
                noValidate
                initial={reduceMotion ? {} : { opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? {} : { opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="grid grid-cols-2 gap-3">
                  <FormInput
                    label="نام خانوادگی"
                    value={registerData.lastName}
                    onChange={(e) => updateRegisterField('lastName', e.target.value)}
                    error={registerErrors.lastName}
                    autoComplete="family-name"
                    placeholder="احمدی"
                  />
                  <FormInput
                    ref={firstNameRef}
                    label="نام"
                    value={registerData.firstName}
                    onChange={(e) => updateRegisterField('firstName', e.target.value)}
                    error={registerErrors.firstName}
                    autoComplete="given-name"
                    placeholder="علی"
                  />
                </div>
                <FormInput
                  label="ایمیل"
                  type="email"
                  value={registerData.email}
                  onChange={(e) => updateRegisterField('email', e.target.value)}
                  error={registerErrors.email}
                  autoComplete="email"
                  placeholder="ali@example.com"
                />
                <FormInput
                  label="رمز عبور"
                  type="password"
                  value={registerData.password}
                  onChange={(e) => updateRegisterField('password', e.target.value)}
                  error={registerErrors.password}
                  autoComplete="new-password"
                  placeholder="حداقل ۶ کاراکتر"
                />
                <FormInput
                  label="تکرار رمز عبور"
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={(e) => updateRegisterField('confirmPassword', e.target.value)}
                  error={registerErrors.confirmPassword}
                  autoComplete="new-password"
                  placeholder="رمز عبور را دوباره وارد کنید"
                />
                <motion.button
                  type="submit"
                  disabled={submitting}
                  initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, type: 'spring' as const, stiffness: 300, damping: 20 }}
                  whileHover={reduceMotion || submitting ? undefined : { scale: 1.02, y: -2 }}
                  whileTap={reduceMotion || submitting ? undefined : { scale: 0.98 }}
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-neon text-ink font-semibold text-sm px-6 py-3.5 transition-all duration-300 shadow-[0_4px_20px_rgba(217,255,106,0.3)] hover:shadow-[0_6px_28px_rgba(217,255,106,0.45)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="ml-2 animate-spin" />
                      در حال ایجاد حساب...
                    </>
                  ) : (
                    'ایجاد حساب'
                  )}
                </motion.button>
              </motion.form>
            ) : (
              <motion.form
                key="login"
                onSubmit={handleLogin}
                className="flex flex-col gap-3.5"
                noValidate
                initial={reduceMotion ? {} : { opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? {} : { opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <FormInput
                  ref={loginEmailRef}
                  label="ایمیل"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => updateLoginField('email', e.target.value)}
                  error={loginErrors.email}
                  autoComplete="email"
                  placeholder="ali@example.com"
                />
                <FormInput
                  label="رمز عبور"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => updateLoginField('password', e.target.value)}
                  error={loginErrors.password}
                  autoComplete="current-password"
                  placeholder="رمز عبور خود را وارد کنید"
                />
                <motion.button
                  type="submit"
                  disabled={submitting}
                  initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, type: 'spring' as const, stiffness: 300, damping: 20 }}
                  whileHover={reduceMotion || submitting ? undefined : { scale: 1.02, y: -2 }}
                  whileTap={reduceMotion || submitting ? undefined : { scale: 0.98 }}
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-neon text-ink font-semibold text-sm px-6 py-3.5 transition-all duration-300 shadow-[0_4px_20px_rgba(217,255,106,0.3)] hover:shadow-[0_6px_28px_rgba(217,255,106,0.45)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="ml-2 animate-spin" />
                      در حال ورود...
                    </>
                  ) : (
                    'ورود به حساب'
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="mt-5 text-center text-xs text-ink-secondary/60 font-medium">
            {tab === 'register' ? 'قبلاً حساب داری؟ ' : 'حساب نداری؟ '}
            <button
              onClick={() => { setTab(tab === 'register' ? 'login' : 'register'); setServerError(''); }}
              className="text-ink-secondary font-semibold hover:text-ink transition-colors"
            >
              {tab === 'register' ? 'وارد شو' : 'ثبت‌نام کن'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
