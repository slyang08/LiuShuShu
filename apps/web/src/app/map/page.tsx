// apps/web/src/app/map/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function MapPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="flex flex-col items-center text-center">
        <h1 className="mb-4 text-3xl font-bold text-green-800">
          <div className="mb-4 flex items-center gap-2">
            <div className="relative h-12 w-12 shrink-0">
              <Image src="/durian.svg" alt="榴蓮" fill className="object-contain" />
            </div>
            <div className="flex flex-row">
              <Link
                href="/"
                className="block text-2xl font-bold text-blue-600 underline hover:no-underline"
              >
                榴蓮樹樹
              </Link>
              <span className="text-2xl">位置</span>
            </div>
          </div>
        </h1>
        <p className="mb-6 text-xl text-gray-600">檳城新鮮榴蓮，歡迎現場挑選！</p>
      </div>

      <div className="h-125 w-full overflow-hidden rounded-2xl border-4 border-green-200 shadow-2xl md:h-150">
        <iframe
          // src="https://www.google.com/maps/embed?pb=!3m2!1szh-TW!2sca!4v1773285737198!5m2!1szh-TW!2sca!6m8!1m7!1sskJQkdhKUtYxXRnOSBhNcA!2m2!1d5.421172629744303!2d100.3320492790406!3f205.74862381329515!4f2.0794305431685416!5f0.7820865974627469"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.972972591914!2d100.3319653!3d5.4210771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304ac3f0d4267da1%3A0x6f795665c73a95e1!2z5qa06I6y5qCR5qCR!5e0!3m2!1szh-TW!2sca!4v1773335575399!5m2!1szh-TW!2sca"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full"
          title="榴蓮樹樹位置"
        />
      </div>

      <div className="grid gap-6 text-sm text-gray-600 md:grid-cols-2">
        <div>
          <h3 className="mb-2 font-semibold text-green-800">📍 地址</h3>
          <Link
            href="https://maps.app.goo.gl/Hg5ZGsCwJ7gYR13YA"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-600 hover:underline"
          >
            27, Jalan Sri Bahari, George Town, 10050 George Town, Pulau Pinang, Malaysia
          </Link>
          <p>原串盅火渥(BEYONG HOTPOT)</p>
        </div>
        <div>
          <h3 className="mb-2 font-semibold text-green-800">🕒 營業時間</h3>
          <p>每日 09:00 - 17:00</p>
        </div>
      </div>
    </div>
  );
}
