// apps/web/src/app/contact/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="p-6 space-y-6 max-w-xl">
      <section>
        <div className="flex flex-row">
          <h1 className="text-2xl font-bold">
            聯絡
          </h1>
          <Link href="/" className="text-black hover:underline block font-bold text-2xl">
            榴蓮樹樹
          </Link>
        </div>
        <p className="text-gray-600">
          如果想預留榴蓮或有任何問題，可以透過以下方式聯絡我們。
        </p>
      </section>


      <div className="space-y-3">
        {/* 📞 Phone */}
        <section className="flex flex-row">
          <p className="font-semibold text-xl"></p>
          <div className="flex flex-row text-center items-center">
            <Link 
              href="tel:+60103835814"
              className="text-xl font-semibold text-green-700 hover:text-green-900 hover:underline block transition-colors"
            >
              📞 +60 10-383 5814
            </Link>
          </div>
        </section>

        {/* 💬 WhatsApp */}
        <section>
          <Link 
            href="https://wa.me/60103835814"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-semibold text-green-500 hover:text-green-600 hover:underline block transition-colors"
          >
            💬 WhatsApp
          </Link>
        </section>

        <section>
          <p className="font-semibold mb-1">微信: ElingKi5814</p>
          <div className="flex flex-col w-65.5 h-113 relative items-center p-6 bg-white rounded-xl shadow-lg border-2 border-green-100">
            <Image 
              src="/LiuShuShu-QR.JPG"
              alt="掃描加微信"
              fill
              className="w-48 h-48 mb-3 rounded-lg shadow-md"
            />
            <p className="text-sm text-gray-600 text-center font-medium">
              掃描二維碼，立刻加樹樹家好友
            </p>
          </div>
        </section>

        <section>
          <p className="font-semibold">營業時間</p>
          <p>每天 09:00 - 17:00</p>
        </section>

        <section>
          <p className="font-semibold">地址</p>
          <Link href="/map" className="text-blue-600 hover:underline">
            <p>27, Jalan Sri Bahari, George Town, 10050 George Town, Pulau Pinang, Malaysia</p>
          </Link>
        </section>
      </div>
    </div>
  );
}
