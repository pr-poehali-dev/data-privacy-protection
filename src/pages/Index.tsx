import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/39f2aff2-49ec-4302-aa38-c20509928997/files/18582a0c-1f3e-4ce9-a387-70dfe4ffcecc.jpg";
const STUDY_IMG = "https://cdn.poehali.dev/projects/39f2aff2-49ec-4302-aa38-c20509928997/files/14ae04cf-187e-4f46-8ac0-be0fd1be7e50.jpg";

type Section = "home" | "materials" | "about";

const courses = [
  {
    id: 1,
    tag: "Базовый",
    title: "Основы защиты данных",
    desc: "Узнайте, что такое персональные данные, как они собираются и какие права у вас есть по закону.",
    icon: "Shield",
    color: "purple",
    lessons: 8,
    duration: "2 часа",
    level: "Начинающий",
  },
  {
    id: 2,
    tag: "Практика",
    title: "Цифровая гигиена",
    desc: "Практические инструменты для защиты паролей, двухфакторная аутентификация и безопасный браузинг.",
    icon: "Lock",
    color: "cyan",
    lessons: 12,
    duration: "3.5 часа",
    level: "Средний",
  },
  {
    id: 3,
    tag: "Закон",
    title: "Ваши права по 152-ФЗ",
    desc: "Полный разбор закона о персональных данных: как отозвать согласие, подать жалобу и защитить себя.",
    icon: "Scale",
    color: "pink",
    lessons: 6,
    duration: "1.5 часа",
    level: "Средний",
  },
  {
    id: 4,
    tag: "Продвинутый",
    title: "Корпоративная безопасность",
    desc: "Обязанности бизнеса при работе с данными, аудит и требования регулятора.",
    icon: "Building2",
    color: "blue",
    lessons: 10,
    duration: "4 часа",
    level: "Продвинутый",
  },
];

const articles = [
  {
    id: 1,
    tag: "Статья",
    title: "Что такое GDPR и как он влияет на россиян",
    desc: "Разбираем европейский регламент о защите данных и его практическое значение.",
    icon: "FileText",
    date: "10 марта 2026",
    readTime: "7 мин",
  },
  {
    id: 2,
    tag: "Гид",
    title: "Как удалить свои данные из интернета",
    desc: "Пошаговая инструкция по отзыву согласий и удалению профилей на крупных платформах.",
    icon: "Trash2",
    date: "5 марта 2026",
    readTime: "12 мин",
  },
  {
    id: 3,
    tag: "Новости",
    title: "Изменения в законодательстве о данных — 2026",
    desc: "Обзор последних поправок и что они означают для граждан и компаний.",
    icon: "Newspaper",
    date: "1 марта 2026",
    readTime: "5 мин",
  },
  {
    id: 4,
    tag: "Чеклист",
    title: "10 шагов к безопасности ваших данных",
    desc: "Простые действия, которые вы можете сделать прямо сейчас для защиты личной информации.",
    icon: "CheckSquare",
    date: "25 февраля 2026",
    readTime: "4 мин",
  },
  {
    id: 5,
    tag: "Кейс",
    title: "Как компании нарушают ваши права: реальные примеры",
    desc: "Разбор громких дел о нарушении законодательства о персональных данных.",
    icon: "AlertTriangle",
    date: "18 февраля 2026",
    readTime: "9 мин",
  },
  {
    id: 6,
    tag: "Инструменты",
    title: "Лучшие VPN и менеджеры паролей в 2026",
    desc: "Независимый обзор инструментов для защиты вашей конфиденциальности в сети.",
    icon: "KeyRound",
    date: "12 февраля 2026",
    readTime: "10 мин",
  },
];

const allItems = [
  ...courses.map((c) => ({ ...c, type: "course" as const })),
  ...articles.map((a) => ({ ...a, type: "article" as const })),
];

const colorMap: Record<string, string> = {
  purple: "rgba(139,92,246,0.12)",
  cyan: "rgba(34,211,238,0.1)",
  pink: "rgba(236,72,153,0.1)",
  blue: "rgba(59,130,246,0.1)",
};
const borderMap: Record<string, string> = {
  purple: "rgba(139,92,246,0.3)",
  cyan: "rgba(34,211,238,0.3)",
  pink: "rgba(236,72,153,0.3)",
  blue: "rgba(59,130,246,0.3)",
};
const iconColorMap: Record<string, string> = {
  purple: "#a78bfa",
  cyan: "#22d3ee",
  pink: "#f472b6",
  blue: "#60a5fa",
};

const navItems: { key: Section; label: string }[] = [
  { key: "home", label: "Главная" },
  { key: "materials", label: "Материалы" },
  { key: "about", label: "О проекте" },
];

export default function Index() {
  const [active, setActive] = useState<Section>("home");
  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredResults = allItems.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen mesh-bg noise-overlay">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <button onClick={() => setActive("home")} className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center">
              <Icon name="ShieldCheck" size={16} className="text-white" />
            </div>
            <span className="font-montserrat font-black text-white text-lg leading-none">
              Дата<span className="gradient-text">Шилд</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActive(item.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active === item.key
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder="Поиск..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  if (e.target.value) setActive("materials");
                }}
                className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none search-glow w-48 transition-all"
              />
            </div>
          </div>

          <button
            className="md:hidden text-white/60 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden glass-card border-t border-white/5 px-6 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => { setActive(item.key); setMobileMenuOpen(false); }}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium text-left transition-all ${
                  active === item.key ? "bg-purple-500/20 text-purple-300" : "text-white/60"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="relative mt-2">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder="Поиск по сайту..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  if (e.target.value) { setActive("materials"); setMobileMenuOpen(false); }
                }}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none search-glow"
              />
            </div>
          </div>
        )}
      </nav>

      <main className="pt-16">
        {/* HOME */}
        {active === "home" && (
          <div>
            <section className="relative min-h-screen flex items-center overflow-hidden">
              <div className="hero-glow absolute inset-0 pointer-events-none" />
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full opacity-10 animate-float"
                    style={{
                      width: `${80 + i * 40}px`,
                      height: `${80 + i * 40}px`,
                      left: `${10 + i * 15}%`,
                      top: `${20 + (i % 3) * 25}%`,
                      background:
                        i % 3 === 0 ? "radial-gradient(circle, #8b5cf6, transparent)"
                        : i % 3 === 1 ? "radial-gradient(circle, #22d3ee, transparent)"
                        : "radial-gradient(circle, #ec4899, transparent)",
                      animationDelay: `${i * 0.7}s`,
                      animationDuration: `${4 + i * 0.5}s`,
                    }}
                  />
                ))}
              </div>

              <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center relative z-10">
                <div className="animate-fade-in-up">
                  <div className="inline-flex items-center gap-2 tag-pill mb-6">
                    <Icon name="Zap" size={11} />
                    Образовательный портал
                  </div>
                  <h1 className="font-montserrat text-5xl md:text-6xl font-black leading-[1.05] mb-6 text-white">
                    Защита данных —{" "}
                    <span className="gradient-text">ваше право</span>
                  </h1>
                  <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-md">
                    Курсы, статьи и практические руководства о том, как защитить
                    свои персональные данные в цифровую эпоху.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setActive("materials")}
                      className="btn-gradient text-white font-semibold px-7 py-3.5 rounded-xl"
                    >
                      Начать обучение
                    </button>
                    <button
                      onClick={() => setActive("about")}
                      className="btn-outline-glow font-semibold px-7 py-3.5 rounded-xl"
                    >
                      О проекте
                    </button>
                  </div>
                  <div className="mt-12 flex gap-8">
                    {[{ val: "4", label: "Курса" }, { val: "36+", label: "Уроков" }, { val: "6", label: "Статей" }].map((s) => (
                      <div key={s.label}>
                        <div className="font-montserrat text-3xl font-black gradient-text-blue">{s.val}</div>
                        <div className="text-white/40 text-sm mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative hidden md:block animate-fade-in" style={{ animationDelay: "0.3s" }}>
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{ border: "1px solid rgba(139,92,246,0.4)", boxShadow: "0 0 60px rgba(139,92,246,0.3), 0 0 120px rgba(34,211,238,0.1)" }}
                  >
                    <img src={HERO_IMG} alt="Защита данных" className="w-full object-cover" style={{ height: "400px" }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c16] via-transparent to-transparent" />
                  </div>
                  <div className="absolute -bottom-5 -left-8 glass-card rounded-xl px-5 py-3 flex items-center gap-3" style={{ border: "1px solid rgba(34,211,238,0.4)" }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(34,211,238,0.15)" }}>
                      <Icon name="ShieldCheck" size={18} className="text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">152-ФЗ</div>
                      <div className="text-white/40 text-xs">Знаете свои права?</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 pb-20">
              <div className="glass-card rounded-2xl p-8 text-center" style={{ border: "1px solid rgba(139,92,246,0.25)" }}>
                <h2 className="font-montserrat text-2xl font-bold text-white mb-3">Быстрый поиск по всем материалам</h2>
                <p className="text-white/40 mb-6 text-sm">Курсы, статьи, руководства — всё в одном месте</p>
                <div className="relative max-w-xl mx-auto">
                  <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
                  <input
                    type="text"
                    placeholder="Введите тему — например, «пароли» или «152-ФЗ»..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); if (e.target.value) setActive("materials"); }}
                    className="w-full bg-white/5 border border-purple-500/30 rounded-xl pl-12 pr-5 py-4 text-white placeholder-white/25 focus:outline-none search-glow text-sm"
                  />
                </div>
              </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 pb-24">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <div className="tag-pill inline-flex mb-3">Популярное</div>
                  <h2 className="font-montserrat text-3xl font-black text-white">Наши курсы</h2>
                </div>
                <button onClick={() => setActive("materials")} className="text-purple-400 text-sm font-semibold hover:text-purple-300 transition-colors flex items-center gap-1">
                  Все материалы <Icon name="ArrowRight" size={14} />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                {courses.slice(0, 2).map((c) => <CourseCard key={c.id} course={c} />)}
              </div>
            </section>
          </div>
        )}

        {/* MATERIALS */}
        {active === "materials" && (
          <div className="max-w-6xl mx-auto px-6 py-14">
            <div className="mb-10">
              <div className="tag-pill inline-flex mb-4">Библиотека знаний</div>
              <h1 className="font-montserrat text-4xl font-black text-white mb-6">Материалы</h1>
              <div className="relative max-w-lg">
                <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
                <input
                  type="text"
                  placeholder="Поиск по курсам и статьям..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/5 border border-purple-500/30 rounded-xl pl-12 pr-10 py-3.5 text-white placeholder-white/25 focus:outline-none search-glow text-sm"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                    <Icon name="X" size={16} />
                  </button>
                )}
              </div>
            </div>

            {search ? (
              <>
                <p className="text-white/40 text-sm mb-6">
                  Найдено: <span className="text-white font-semibold">{filteredResults.length}</span> по запросу «{search}»
                </p>
                {filteredResults.length === 0 ? (
                  <div className="text-center py-20">
                    <Icon name="SearchX" size={48} className="mx-auto mb-4" style={{ color: "rgba(255,255,255,0.1)" }} />
                    <p className="text-white/30 text-lg">Ничего не найдено</p>
                    <p className="text-white/20 text-sm mt-2">Попробуйте другой запрос</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-5">
                    {filteredResults.map((item) =>
                      item.type === "course"
                        ? <CourseCard key={`c-${item.id}`} course={item as typeof courses[0]} />
                        : <ArticleCard key={`a-${item.id}`} article={item as typeof articles[0]} />
                    )}
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="mb-12">
                  <h2 className="font-montserrat text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Icon name="GraduationCap" size={20} className="text-purple-400" /> Курсы
                  </h2>
                  <div className="grid md:grid-cols-2 gap-5">
                    {courses.map((c) => <CourseCard key={c.id} course={c} />)}
                  </div>
                </div>
                <div>
                  <h2 className="font-montserrat text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Icon name="BookOpen" size={20} className="text-cyan-400" /> Статьи и руководства
                  </h2>
                  <div className="grid md:grid-cols-2 gap-5">
                    {articles.map((a) => <ArticleCard key={a.id} article={a} />)}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ABOUT */}
        {active === "about" && (
          <div className="max-w-6xl mx-auto px-6 py-14">
            <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
              <div className="animate-fade-in-up">
                <div className="tag-pill inline-flex mb-5">О проекте</div>
                <h1 className="font-montserrat text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                  Знание — это <span className="gradient-text">ваша защита</span>
                </h1>
                <p className="text-white/60 leading-relaxed mb-5">
                  ДатаШилд — образовательный портал, созданный чтобы каждый гражданин понимал свои права в цифровую эпоху. Мы переводим сложные законы и технические понятия на простой язык.
                </p>
                <p className="text-white/50 leading-relaxed">
                  Наши материалы основаны на актуальном российском и международном законодательстве, а курсы разработаны практикующими юристами и специалистами по кибербезопасности.
                </p>
              </div>
              <div className="relative rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(34,211,238,0.3)" }}>
                <img src={STUDY_IMG} alt="Обучение" className="w-full object-cover" style={{ height: "380px" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c16]/80 via-transparent to-transparent" />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-5 mb-20">
              {[
                { icon: "Target", title: "Наша миссия", desc: "Сделать знания о защите персональных данных доступными каждому человеку, независимо от технического опыта.", color: "#8b5cf6" },
                { icon: "BookOpen", title: "Подход", desc: "Простой язык, практические примеры, актуальная правовая база. Никакого лишнего жаргона.", color: "#22d3ee" },
                { icon: "Users", title: "Для всех", desc: "Курсы подходят как обычным пользователям, так и бизнесу — от базового до продвинутого уровня.", color: "#ec4899" },
              ].map((v) => (
                <div key={v.title} className="glass-card rounded-2xl p-6 card-hover" style={{ border: `1px solid ${v.color}30` }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${v.color}18` }}>
                    <Icon name={v.icon as "Target" | "BookOpen" | "Users"} fallback="Shield" size={22} style={{ color: v.color }} />
                  </div>
                  <h3 className="font-montserrat font-bold text-white text-lg mb-3">{v.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mb-10">
              <div className="tag-pill inline-flex mb-4">Команда</div>
              <h2 className="font-montserrat text-3xl font-black text-white">Кто создаёт ДатаШилд</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { name: "Анна Соколова", role: "Юрист, 152-ФЗ", emoji: "👩‍⚖️" },
                { name: "Дмитрий Власов", role: "Специалист по кибербезопасности", emoji: "🔐" },
                { name: "Ольга Тихонова", role: "Методолог и редактор", emoji: "📝" },
              ].map((p) => (
                <div key={p.name} className="glass-card rounded-2xl p-6 text-center card-hover" style={{ border: "1px solid rgba(139,92,246,0.2)" }}>
                  <div className="text-5xl mb-4">{p.emoji}</div>
                  <div className="font-montserrat font-bold text-white mb-1">{p.name}</div>
                  <div className="text-white/40 text-sm">{p.role}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-white/5 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md btn-gradient flex items-center justify-center">
              <Icon name="ShieldCheck" size={12} className="text-white" />
            </div>
            <span className="font-montserrat font-bold text-white/80 text-sm">ДатаШилд</span>
          </div>
          <p className="text-white/25 text-xs">© 2026 ДатаШилд. Образовательный портал о защите персональных данных.</p>
          <div className="flex gap-4">
            {navItems.map((n) => (
              <button key={n.key} onClick={() => setActive(n.key)} className="text-white/30 text-xs hover:text-white/60 transition-colors">
                {n.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

type CourseWithColor = typeof courses[0] & { color: string };

function CourseCard({ course }: { course: CourseWithColor }) {
  const color = course.color || "purple";
  return (
    <div
      className="rounded-2xl p-6 card-hover cursor-pointer"
      style={{ background: colorMap[color], border: `1px solid ${borderMap[color]}` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${iconColorMap[color]}18` }}>
          <Icon name={course.icon as "Shield" | "Lock" | "Scale" | "Building2"} fallback="Shield" size={22} style={{ color: iconColorMap[color] }} />
        </div>
        <span className="tag-pill">{course.tag}</span>
      </div>
      <h3 className="font-montserrat font-bold text-white text-lg mb-2">{course.title}</h3>
      <p className="text-white/50 text-sm leading-relaxed mb-5">{course.desc}</p>
      <div className="flex items-center gap-4 text-white/30 text-xs">
        <span className="flex items-center gap-1.5">
          <Icon name="PlayCircle" size={13} style={{ color: iconColorMap[color] }} />
          {course.lessons} уроков
        </span>
        <span className="flex items-center gap-1.5">
          <Icon name="Clock" size={13} style={{ color: iconColorMap[color] }} />
          {course.duration}
        </span>
        <span className="flex items-center gap-1.5">
          <Icon name="BarChart2" size={13} style={{ color: iconColorMap[color] }} />
          {course.level}
        </span>
      </div>
    </div>
  );
}

function ArticleCard({ article }: { article: typeof articles[0] }) {
  return (
    <div className="rounded-2xl p-6 card-hover cursor-pointer" style={{ background: "rgba(34,211,238,0.07)", border: "1px solid rgba(34,211,238,0.2)" }}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(34,211,238,0.12)" }}>
          <Icon name={article.icon as "FileText" | "Trash2" | "Newspaper" | "CheckSquare" | "AlertTriangle" | "KeyRound"} fallback="FileText" size={20} className="text-cyan-400" />
        </div>
        <span className="tag-pill" style={{ background: "rgba(34,211,238,0.1)", borderColor: "rgba(34,211,238,0.25)", color: "#67e8f9" }}>
          {article.tag}
        </span>
      </div>
      <h3 className="font-montserrat font-bold text-white text-base mb-2">{article.title}</h3>
      <p className="text-white/50 text-sm leading-relaxed mb-5">{article.desc}</p>
      <div className="flex items-center gap-4 text-white/30 text-xs">
        <span className="flex items-center gap-1.5">
          <Icon name="Calendar" size={12} className="text-cyan-500" />
          {article.date}
        </span>
        <span className="flex items-center gap-1.5">
          <Icon name="Clock" size={12} className="text-cyan-500" />
          {article.readTime}
        </span>
      </div>
    </div>
  );
}