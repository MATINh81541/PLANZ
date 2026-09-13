import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type FormInputProps = {
  label: string;
  type?: string;
  error?: string;
  autoComplete?: string;
  forceLtr?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, type = 'text', error, autoComplete, className = '', forceLtr, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;
    const isLtr = forceLtr || type === 'email' || type === 'url';

    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-ink-secondary mb-1.5 mr-1 text-right">
          {label}
        </label>
        <div
          className={`relative transition-all duration-300 ${
            focused ? 'shadow-[0_0_0_3px_rgba(217,255,106,0.15)]' : ''
          }`}
        >
          <input
            ref={ref}
            type={inputType}
            autoComplete={autoComplete}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            dir={isLtr ? 'ltr' : 'rtl'}
            className={`w-full rounded-2xl px-4 py-3 text-sm font-medium text-ink placeholder:text-ink-secondary/40 outline-none transition-all duration-300 glass-float-lime ${
              isLtr ? 'text-left' : 'text-right'
            } ${
              focused
                ? 'border-neon/40 bg-neon/8 shadow-[0_0_20px_rgba(217,255,106,0.1)]'
                : 'border-white/30'
            } ${error ? 'border-red-300/50' : ''} ${className}`}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-secondary/50 hover:text-ink-secondary transition-colors"
              tabIndex={-1}
              aria-label={showPassword ? 'پنهان کردن رمز' : 'نمایش رمز'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>
        {error && (
          <p className="mt-1.5 mr-1 text-xs font-medium text-red-400/80 text-right">{error}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
