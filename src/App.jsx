// Импортируем React для использования JSX
import React from "react";

// Экспортируем по умолчанию главный компонент приложения
export default function App() {
  // Возвращаем разметку начальной страницы
  return (
    // Корневой контейнер: высота экрана, тёмный градиентный фон, светлый текст
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Шапка сайта со стеклянным эффектом и тонкой нижней границей */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/60 backdrop-blur">
        {/* Центрирующий контейнер с максимальной шириной */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Строка: слева — логотип/название, по центру — навигация, справа — кнопки */}
          <div className="flex h-16 items-center justify-between">
            {/* Логотип и название проекта */}
            <a href="#" className="flex items-center gap-2">
              {/* Квадратный маркер-логотип с градиентом */}
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-indigo-500 ring-1 ring-white/20 shadow">
                {/* Простая «звезда» как иконка */}
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-white">
                  <path d="M12 2l2.1 6.3L21 10l-6 4 1.7 6.7L12 17.6 7.3 20.7 9 14 3 10l6.9-1.7L12 2z" fill="currentColor" />
                </svg>
              </span>
              {/* Текстовый логотип */}
              <span className="text-lg font-semibold tracking-tight">MarketLink B2B</span>
            </a>

            {/* Навигационное меню (скрыто на маленьких экранах) */}
            <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
              <a href="#how" className="hover:text-white transition">Как это работает</a>
              <a href="#benefits" className="hover:text-white transition">Преимущества</a>
              <a href="#integrations" className="hover:text-white transition">Интеграции</a>
              <a href="#faq" className="hover:text-white transition">FAQ</a>
            </nav>

            {/* Кнопки действий справа */}
            <div className="flex items-center gap-3">
              <button className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-white transition">Войти</button>
              <a
                href="#signup"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 shadow hover:brightness-110 transition"
              >
                Начать бесплатно
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Первый экран (Hero) */}
      <section className="relative">
        {/* Декоративное мягкое свечение сверху */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-80 w-[720px] rounded-full bg-fuchsia-500/20 blur-3xl" />
        {/* Контент первого экрана в контейнере */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* Две колонки: текст и превью-интерфейса */}
          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* Левая колонка с текстом и CTA */}
            <div>
              {/* Маленький бейдж позиционирования */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                B2B для селлеров маркетплейсов
              </div>
              {/* Большой заголовок с градиентом на второй строке */}
              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
                Производители встречают селлеров.
                <br />
                <span className="bg-gradient-to-r from-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                  Малые партии + автокарточки WB & Ozon.
                </span>
              </h1>
              {/* Краткое описание ценностного предложения */}
              <p className="mt-4 text-slate-300 text-base sm:text-lg">
                Производители размещают линейку товаров, а ИП берут партии от 5–10 шт. —
                карточки создаются в кабинете автоматически: фото, SEO, характеристики.
              </p>
              {/* Кнопки для двух типов пользователей */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#signup-seller" className="rounded-xl bg-white text-slate-900 px-5 py-3 text-sm font-semibold shadow ring-1 ring-black/5 hover:bg-slate-100 transition">
                  Я — ИП-продавец
                </a>
                <a href="#signup-vendor" className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition">
                  Я — производитель
                </a>
              </div>
              {/* Небольшие метрики-«доказательства» */}
              <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-2xl font-semibold">5–10</div>
                  <div className="text-xs text-slate-400">минимальный заказ</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-2xl font-semibold">1 клик</div>
                  <div className="text-xs text-slate-400">создание карточки</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-2xl font-semibold">24/7</div>
                  <div className="text-xs text-slate-400">синхронизация цен</div>
                </div>
              </div>
            </div>

            {/* Правая колонка: «демо» карточки/интерфейса */}
            <div className="relative">
              {/* Карточка с превью интерфейса в «стеклянном» стиле */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl">
                {/* Заголовок блока и статус синхронизации */}
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-200">Создание карточки</h3>
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    синхронизировано
                  </span>
                </div>
                {/* Содержимое карточки: заглушка изображения и фейковые строки */}
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="col-span-1 aspect-square rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 ring-1 ring-white/10 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="h-8 w-8 text-slate-500">
                      <path d="M4 4h16v16H4zM7 16l3-4 2 3 3-4 2 5H7z" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <div className="h-3 w-40 rounded bg-white/10" />
                    <div className="h-3 w-28 rounded bg-white/10" />
                    <div className="h-3 w-32 rounded bg-white/10" />
                    <div className="h-3 w-24 rounded bg-white/10" />
                  </div>
                </div>
                {/* Кнопки выгрузки на WB и Ozon */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 rounded-xl bg-fuchsia-600 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 hover:brightness-110 transition">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-white">
                      <circle cx="12" cy="12" r="11" fill="currentColor" />
                      <text x="50%" y="60%" textAnchor="middle" fontSize="9" fill="black" fontFamily="Inter, system-ui">WB</text>
                    </svg>
                    Выгрузить в WB
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 hover:brightness-110 transition">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-white">
                      <rect x="1" y="1" width="22" height="22" rx="5" fill="currentColor" />
                      <text x="50%" y="60%" textAnchor="middle" fontSize="7" fill="black" fontFamily="Inter, system-ui">OZON</text>
                    </svg>
                    Выгрузить в Ozon
                  </button>
                </div>
                {/* Подсказка пользователю */}
                <p className="mt-3 text-xs text-slate-400">
                  Подключите кабинеты через API — карточки создаются автоматически с фото и SEO.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Блок преимуществ */}
      <section id="benefits" className="border-t border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-semibold">Кому и чем полезно</h2>
          <p className="mt-2 text-slate-300">Закрываем мини-опт и моментальную выгрузку карточек.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <div className="text-sm font-semibold text-slate-200">Для производителей</div>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />Канал мини-опта без сложного онбординга дистрибьюторов.</li>
                <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />Единый контент-хаб: фото/SEO — один раз создал, сотни селлеров используют.</li>
                <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />Контроль RRP и синхронизация остатков/цен.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <div className="text-sm font-semibold text-slate-200">Для ИП-продавцов</div>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-400" />Закупка малыми партиями (от 5–10 шт.) — тестируй без больших рисков.</li>
                <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-400" />Автовыгрузка карточек в WB и Ozon — без ручной рутины.</li>
                <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-400" />Готовые фото, описания, характеристики и SEO.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Процесс 1-2-3 */}
      <section id="how">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-semibold">Как это работает</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            <li className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-xs text-slate-400">Шаг 1</div>
              <div className="mt-1 text-lg font-semibold">Подключение кабинетов</div>
              <p className="mt-2 text-sm text-slate-300">Добавьте API-ключи WB/Ozon. Мы проверим доступы и подготовим шаблоны карточек.</p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-xs text-slate-400">Шаг 2</div>
              <div className="mt-1 text-lg font-semibold">Выбор товара и партии</div>
              <p className="mt-2 text-sm text-slate-300">Находите позицию, выбираете минимальную партию и фиксируете цену.</p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-xs text-slate-400">Шаг 3</div>
              <div className="mt-1 text-lg font-semibold">Автовыгрузка карточки</div>
              <p className="mt-2 text-sm text-slate-300">Карточка с фото и SEO создаётся в кабинете — остаётся отгрузить товар.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* Интеграции (псевдо-бейджи) */}
      <section id="integrations" className="border-t border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-semibold">Интеграции</h2>
          <p className="mt-2 text-slate-300">REST и вебхуки: цены, остатки, заказы, контент-патчи.</p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-4 text-center text-sm">WB Content API</div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-4 text-center text-sm">WB Prices API</div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-4 text-center text-sm">Ozon Product API</div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-4 text-center text-sm">Ozon Prices API</div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-4 text-center text-sm">Webhooks Orders</div>
            <div className="rounded-xl border border-white/10 bg-slate-900/40 p-4 text-center text-sm">Inventory Sync</div>
          </div>
        </div>
      </section>

      {/* Финальный блок с призывом к действию */}
      <section id="signup" className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-600/20 to-indigo-600/20 p-8">
            <h3 className="text-xl sm:text-2xl font-semibold">Готов протестировать мини-опт?</h3>
            <p className="mt-2 text-slate-200/90">Подключение бесплатно. Комиссия — только с оборота. Отключить можно в один клик.</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a id="signup-seller" href="#" className="rounded-xl bg-white text-slate-900 px-5 py-3 text-sm font-semibold shadow ring-1 ring-black/5 hover:bg-slate-100 transition">
                Зарегистрироваться как ИП-продавец
              </a>
              <a id="signup-vendor" href="#" className="rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20 transition">
                Подать заявку как производитель
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Футер сайта */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500 to-indigo-500 ring-1 ring-white/20">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-white">
                  <path d="M12 2l2.1 6.3L21 10l-6 4 1.7 6.7L12 17.6 7.3 20.7 9 14 3 10l6.9-1.7L12 2z" fill="currentColor" />
                </svg>
              </span>
              <span>© {new Date().getFullYear()} MarketLink B2B</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <a href="#" className="hover:text-white transition">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white transition">Пользовательское соглашение</a>
              <a href="#faq" className="hover:text-white transition">Поддержка</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
