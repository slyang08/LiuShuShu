// apps/web/src/app/contact/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="max-w-xl space-y-6 p-6">
      <section>
        <div className="flex flex-row">
          <h1 className="text-2xl font-bold">聯絡</h1>
          <Link href="/" className="block text-2xl font-bold text-black hover:underline">
            榴蓮樹樹
          </Link>
        </div>
        <p className="text-gray-600">如果想預留榴蓮或有任何問題，可以透過以下方式聯絡我們。</p>
      </section>

      <div className="space-y-3">
        {/* 📞 Phone */}
        <section className="flex flex-row">
          <p className="text-xl font-semibold"></p>
          <div className="flex flex-row items-center text-center">
            <Link
              href="tel:+60103835814"
              className="block text-xl font-semibold text-green-700 transition-colors hover:text-green-900 hover:underline"
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
            className="block text-xl font-semibold text-green-500 transition-colors hover:text-green-600 hover:underline"
          >
            💬 WhatsApp
          </Link>
        </section>

        <section>
          <p className="mb-1 font-semibold">微信: ElingKi5814</p>
          <div className="relative flex h-113 w-65.5 flex-col items-center rounded-xl border-2 border-green-100 bg-white p-6 shadow-lg">
            <Image
              src="/LiuShuShu-QR.JPG"
              alt="掃描加微信"
              fill
              className="mb-3 h-48 w-48 rounded-lg shadow-md"
            />
            <p className="text-center text-sm font-medium text-gray-600">
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
