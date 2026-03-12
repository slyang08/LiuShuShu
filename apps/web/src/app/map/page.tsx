// apps/web/src/app/map/page.tsx
export default function MapPage() {
  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-800 mb-4">
          🥭 榴蓮樹樹位置
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          檳城新鮮榴蓮，歡迎現場挑選！
        </p>
      </div>

      {/* ✅ 你的 iframe，微調一下 */}
      <div className="w-full h-125 md:h-150 rounded-2xl overflow-hidden shadow-2xl border-4 border-green-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!3m2!1szh-TW!2sca!4v1773285737198!5m2!1szh-TW!2sca!6m8!1m7!1sskJQkdhKUtYxXRnOSBhNcA!2m2!1d5.421172629744303!2d100.3320492790406!3f205.74862381329515!4f2.0794305431685416!5f0.7820865974627469"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
          title="榴蓮樹樹位置"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
        <div>
          <h3 className="font-semibold text-green-800 mb-2">📍 地址</h3>
          <p>27, Jalan Sri Bahari, George Town, 10050 George Town, Pulau Pinang, 馬來西亞</p>
          <p>原串盅火渥(BEYONG HOTPOT)</p>
        </div>
        <div>
          <h3 className="font-semibold text-green-800 mb-2">🕒 營業時間</h3>
          <p>每日 9:00 - 17:00</p>
        </div>
      </div>
    </div>
  );
}
