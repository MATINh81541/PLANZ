import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

type Plan = {
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
};

const plans: Plan[] = [
  {
    name: 'استارتر',
    description: 'برای کسانی که تازه شروع می‌کنند.',
    price: 'رایگان',
    period: 'برای همیشه',
    features: ['تا ۱۰ برنامه', 'سازمان‌دهی پایه', '۱ فضای کاری'],
  },
  {
    name: 'پایه',
    description: 'برای مرتب نگه داشتن زندگی روزمره.',
    price: '۴۹,۰۰۰',
    period: 'تومان / ماه',
    features: ['تا ۵۰ برنامه', 'نمای هفتگی', '۲ فضای کاری', 'یادآوری'],
  },
  {
    name: 'ضروری',
    description: 'برای ساختن یک عادت منظم.',
    price: '۷۹,۰۰۰',
    period: 'تومان / ماه',
    features: ['برنامه‌های نامحدود', 'نمای هفتگی و ماهانه', '۳ فضای کاری', 'پشتیبانی اولویت‌دار'],
  },
  {
    name: 'پلاس',
    description: 'برای برنامه‌ریزی در بیشتر جنبه‌های زندگی.',
    price: '۱۰۹,۰۰۰',
    period: 'تومان / ماه',
    features: ['همه چیز ضروری', '۵ فضای کاری', 'برچسب‌های سفارشی', 'همگام‌سازی تقویم'],
    popular: true,
  },
  {
    name: 'هوشمند',
    description: 'برای کسانی که می‌خواهند پیشنهاد هوشمند دریافت کنند.',
    price: '۱۳۹,۰۰۰',
    period: 'تومان / ماه',
    features: ['همه چیز پلاس', 'پیشنهاد هوشمند', 'اولویت‌بندی خودکار', '۱۰ فضای کاری'],
  },
  {
    name: 'حرفه‌ای',
    description: 'برای برنامه‌ریزان جدی.',
    price: '۱۷۹,۰۰۰',
    period: 'تومان / ماه',
    features: ['همه چیز هوشمند', 'آنالیز پیشرفته', 'فضاهای نامحدود', 'خروجی و API'],
  },
  {
    name: 'پیشرفته',
    description: 'برای کاربران قدرتمند با کنترل کامل.',
    price: '۲۲۹,۰۰۰',
    period: 'تومان / ماه',
    features: ['همه چیز حرفه‌ای', 'اتوماسیون گردش کار', 'یکپارچه‌سازی‌ها', 'اشتراک‌گذاری تیمی'],
  },
  {
    name: 'پریمیوم',
    description: 'برای کسانی که بهترین تجربه PLANZ را می‌خواهند.',
    price: '۲۸۹,۰۰۰',
    period: 'تومان / ماه',
    features: ['همه چیز پیشرفته', 'همکاری تیمی', 'ویرایش مشترک', 'تاریخچه نسخه'],
  },
  {
    name: 'آلتیمیت',
    description: 'برای نیازهای برنامه‌ریزی حرفه‌ای‌ترین کاربران.',
    price: '۳۵۹,۰۰۰',
    period: 'تومان / ماه',
    features: ['همه چیز پریمیوم', 'پشتیبانی اختصاصی', 'برندینگ سفارشی', 'آماده SSO'],
  },
  {
    name: 'PLNZ+',
    description: 'تمام تجربه PLANZ، بدون هیچ محدودیتی.',
    price: '۴۵۹,۰۰۰',
    period: 'تومان / ماه',
    features: ['همه چیز آلتیمیت', 'آنبوردینگ اختصاصی', 'دسترسی زودهنگام', 'به‌روزرسانی مادام‌العمر'],
    popular: true,
  },
];

const planSlugMap: Record<string, string> = {
  'استارتر': 'starter',
  'پایه': 'basic',
  'ضروری': 'essential',
  'پلاس': 'plus',
  'هوشمند': 'smart',
  'حرفه‌ای': 'pro',
  'پیشرفته': 'advanced',
  'پریمیوم': 'premium',
  'آلتیمیت': 'ultimate',
  'PLNZ+': 'plnz-plus',
};

export default function Pricing() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const cardVariants = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 30, scale: 0.97 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { type: 'spring' as const, stiffness: 80, damping: 18 },
        },
      };

  const containerVariants = reduceMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.07, delayChildren: 0.15 },
        },
      };

  const handleChoosePlan = (planName: string) => {
    const slug = planSlugMap[planName] || planName.toLowerCase();
    navigate(`/get-started?plan=${slug}`);
  };

  return (
    <div className="relative min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center mb-14 md:mb-20"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-[#c0385a]/70 mb-5">
            قیمت‌گذاری PLANZ
          </span>
          <h1 className="text-balance text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[#2a0a16] leading-[1.2]">
            پلنی را انتخاب کن
            <br />
            که با تو هماهنگ است.
          </h1>
          <p className="text-balance text-lg md:text-xl text-[#8a4055] font-medium mt-6 max-w-xl mx-auto leading-[2]">
            رایگان شروع کن، هر وقت خواستی ارتقا بده. بدون هزینه پنهان، لغو هر زمان.
          </p>
        </motion.div>

        {/* Pricing cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              whileHover={reduceMotion ? undefined : { y: -6, scale: 1.02 }}
              transition={{ type: 'spring' as const, stiffness: 300, damping: 22 }}
              className={`rounded-4xl p-6 md:p-7 flex flex-col ${
                plan.popular ? 'glass-crimson-popular' : 'glass-crimson glass-crimson-shadow'
              }`}
            >
              {plan.popular && (
                <span className="self-start mb-3 inline-flex items-center rounded-full bg-[#d63b6a] px-3 py-1 text-xs font-bold text-white shadow-[0_2px_12px_rgba(214,59,106,0.3)]">
                  {plan.name === 'PLNZ+' ? 'بهترین ارزش' : 'محبوب‌ترین'}
                </span>
              )}

              <h3 className="text-xl font-extrabold tracking-tight text-[#2a0a16] mb-1">
                {plan.name}
              </h3>
              <p className="text-sm text-[#8a4055] font-medium mb-4 leading-[1.8] min-h-[2.5rem]">
                {plan.description}
              </p>

              <div className="flex items-baseline gap-1.5 mb-5 flex-row-reverse justify-end">
                <span className="text-sm text-[#8a4055] font-medium">
                  {plan.period}
                </span>
                <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#2a0a16]" style={{ fontFeatureSettings: '"tnum"', direction: 'ltr' }}>
                  {plan.price}
                </span>
              </div>

              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 flex-row-reverse">
                    <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-[#d63b6a]/15 flex items-center justify-center">
                      <Check size={10} strokeWidth={3} className="text-[#d63b6a]" />
                    </span>
                    <span className="text-sm text-[#3a1520] font-medium leading-relaxed text-right">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleChoosePlan(plan.name)}
                className={`w-full inline-flex items-center justify-center rounded-full font-semibold text-sm px-5 py-3 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] ${
                  plan.popular
                    ? 'bg-[#d63b6a] text-white shadow-[0_4px_20px_rgba(214,59,106,0.35)] hover:shadow-[0_6px_28px_rgba(214,59,106,0.5)]'
                    : 'glass-crimson-float text-[#2a0a16] hover:bg-[#d63b6a]/12'
                }`}
              >
                انتخاب پلن
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
