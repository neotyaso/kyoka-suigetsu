"use client";

import { useState } from 'react';
import AppLayout from '../components/AppLayout';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactIndex(): React.JSX.Element {
  const [data, setData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [processing, setProcessing] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!data.name.trim()) newErrors.name = "お名前を入力してください。";
    if (!data.email.trim()) {
      newErrors.email = "メールアドレスを入力してください。";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "有効なメールアドレスを入力してください。";
    }
    if (!data.message.trim()) newErrors.message = "お問い合わせ内容を入力してください。";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  
  if (!validate()) return;

  setProcessing(true);

  try {
    const response = await fetch('http://localhost:8000/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('送信失敗');

    setData({ name: '', email: '', message: '' });
    alert("お問い合わせを受け付けました。");
  } catch (error) {
    console.error("送信エラー:", error);
    alert("送信に失敗しました。もう一度お試しください。");
  } finally {
    setProcessing(false);
  }
}

  return (
    <AppLayout>
      {/* ヒーローセクション */}
      <div className="bg-[url('/images/Contact/meyasu.png')] bg-cover bg-center h-[23vh] md:h-[30vh] lg:h-[45vh] xl:h-[55vh]">
        <h1 className="font-yuji text-center text-black pt-[6.5vh] md:pt-[11vh] lg:pt-[15vh] xl:pt-[17vh] text-4xl md:text-6xl lg:text-8xl xl:text-9xl">
          お問い合わせ
        </h1>
      </div>

      {/* フォームセクション */}
      <div className="max-w-3xl mx-auto px-4">
        <form onSubmit={submit} className="space-y-6 mt-[8vh] mb-[6vh]">
          {/* お名前 */}
          <div>
            <label htmlFor="name" className="block mb-[0.7vh] text-lg lg:text-xl xl:text-2xl font-bold font-yuji text-[#5c554f]">
              お名前
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#5c554f] focus:ring-1 focus:ring-[#5c554f] transition-all font-yuji"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="例：鏡花 桜"
              disabled={processing}
            />
            {errors.name && <p className="text-red-600 text-sm mt-1 font-yuji">{errors.name}</p>}
          </div>

          {/* メールアドレス */}
          <div>
            <label htmlFor="email" className="block mb-[0.7vh] text-lg lg:text-xl xl:text-2xl font-bold font-yuji text-[#5c554f]">
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#5c554f] focus:ring-1 focus:ring-[#5c554f] transition-all font-yuji"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="例：example@kyoka.com"
              disabled={processing}
            />
            {errors.email && <p className="text-red-600 text-sm mt-1 font-yuji">{errors.email}</p>}
          </div>

          {/* お問い合わせ内容 */}
          <div>
            <label htmlFor="message" className="block mb-[0.7vh] text-lg lg:text-xl xl:text-2xl font-bold font-yuji text-[#5c554f]">
              お問い合わせ内容
            </label>
            <textarea
              id="message"
              className="w-full p-3 border border-gray-300 rounded h-[18vh] lg:h-[20vh] xl:h-[25vh] focus:outline-none focus:border-[#5c554f] focus:ring-1 focus:ring-[#5c554f] transition-all font-yuji"
              value={data.message}
              onChange={(e) => setData({ ...data, message: e.target.value })}
              placeholder="こちらに質問内容をご記入ください"
              disabled={processing}
            />
            {errors.message && <p className="text-red-600 text-sm mt-1 font-yuji">{errors.message}</p>}
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-[#5c554f] hover:bg-[#403c37] text-white w-full max-w-md py-3 md:py-4 rounded font-yuji font-bold transition-all duration-300 disabled:opacity-50 text-base lg:text-lg xl:text-xl"
              disabled={processing}
            >
              {processing ? '送信中...' : '送信'}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}