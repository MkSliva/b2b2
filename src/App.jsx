import React, { useEffect, useMemo, useState, useContext, createContext, useRef } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Upload,
  Store,
  Factory,
  Settings,
  Rocket,
  PlugZap,
  Plus,
  ShoppingCart,
  Shield,
  ArrowRight,
  Search,
  Edit3,
  Boxes,
  UploadCloud,
  Sparkles,
  Globe,
  Sun,
  Moon,
} from "lucide-react";

/**
 * Minimal in-file UI kit (shadcn-like) so the demo runs without external paths
 */
const cx = (...a) => a.filter(Boolean).join(" ");

function Button({ variant = "default", className = "", children, ...props }) {
  const styles = {
    default:
      "bg-neutral-900 text-white hover:opacity-90 dark:bg-white dark:text-neutral-900",
    secondary:
      "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100",
    ghost:
      "bg-transparent text-inherit hover:bg-neutral-100/60 dark:hover:bg-neutral-800/60",
    outline:
      "bg-transparent border border-neutral-300 text-neutral-900 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800/60",
  };
  return (
    <button
      className={cx(
        "px-4 py-2 text-sm rounded-md transition-colors",
        styles[variant] || styles.default,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function Card({ className = "", children }) {
  return <div className={cx("border rounded-xl", className)}>{children}</div>;
}
function CardHeader({ className = "", children }) {
  return <div className={cx("p-4", className)}>{children}</div>;
}
function CardContent({ className = "", children }) {
  return <div className={cx("p-4 pt-0", className)}>{children}</div>;
}
function CardTitle({ className = "", children }) {
  return <div className={cx("font-semibold", className)}>{children}</div>;
}

function Input({ className = "", ...props }) {
  return (
    <input
      className={cx(
        "w-full px-3 py-2 rounded-md border outline-none",
        className
      )}
      {...props}
    />
  );
}
function Label({ className = "", children }) {
  return <label className={cx("block text-sm mb-1", className)}>{children}</label>;
}
function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={cx(
        "w-full px-3 py-2 rounded-md border outline-none min-h-[90px]",
        className
      )}
      {...props}
    />
  );
}
function Badge({ className = "", variant = "default", children }) {
  const styles = variant === "secondary"
    ? "bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-100"
    : variant === "outline"
    ? "border border-neutral-300 text-neutral-700 dark:border-neutral-700 dark:text-neutral-200"
    : "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900";
  return (
    <span className={cx("text-xs px-2 py-1 rounded-md", styles, className)}>
      {children}
    </span>
  );
}
function Switch({ checked, onCheckedChange }) {
  return (
    <label className="inline-flex items-center cursor-pointer select-none">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
      />
      <span className={cx(
        "w-9 h-5 rounded-full transition-colors",
        checked ? "bg-neutral-900 dark:bg-white" : "bg-neutral-300 dark:bg-neutral-700"
      )}>
        <span className={cx(
          "block w-4 h-4 bg-white dark:bg-neutral-900 rounded-full translate-x-0.5 transition-transform",
          checked ? "translate-x-[18px]" : "translate-x-0.5"
        )} />
      </span>
    </label>
  );
}

/** Tabs **/
const TabsCtx = createContext(null);
function Tabs({ defaultValue, className = "", children }) {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsCtx.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsCtx.Provider>
  );
}
function TabsList({ className = "", children }) {
  return <div className={cx("inline-flex gap-2 p-1", className)}>{children}</div>;
}
function TabsTrigger({ value, children }) {
  const ctx = useContext(TabsCtx);
  const active = ctx?.value === value;
  return (
    <Button
      variant={active ? "default" : "secondary"}
      onClick={() => ctx?.setValue(value)}
      className="rounded-2xl"
    >
      {children}
    </Button>
  );
}
function TabsContent({ value, className = "", children }) {
  const ctx = useContext(TabsCtx);
  if (ctx?.value !== value) return null;
  return <div className={className}>{children}</div>;
}

/** Select **/
const SelectCtx = createContext(null);
function Select({ value, defaultValue, onValueChange, children }) {
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState(value ?? defaultValue ?? "");
  useEffect(() => { if (value !== undefined) setVal(value); }, [value]);
  const api = {
    open,
    setOpen,
    value: val,
    setValue: (v) => { setVal(v); onValueChange?.(v); setOpen(false); },
  };
  return <SelectCtx.Provider value={api}>{children}</SelectCtx.Provider>;
}
function SelectTrigger({ className = "", children }) {
  const { setOpen, value } = useContext(SelectCtx) || {};
  return (
    <button onClick={() => setOpen?.(true)} className={cx("w-full text-left px-3 py-2 border rounded-md", className)}>
      {children || value}
    </button>
  );
}
function SelectValue({ placeholder }) {
  const { value } = useContext(SelectCtx) || {};
  return <span>{value || placeholder}</span>;
}
function SelectContent({ className = "", children }) {
  const { open, setOpen } = useContext(SelectCtx) || {};
  if (!open) return null;
  return (
    <div className={cx("mt-2 border rounded-md p-1 z-50 bg-white dark:bg-neutral-900", className)}>
      <div onClick={() => setOpen?.(false)} className="absolute inset-0" />
      <div className="relative">{children}</div>
    </div>
  );
}
function SelectItem({ value, children }) {
  const { setValue } = useContext(SelectCtx) || {};
  return (
    <div
      role="option"
      onClick={() => setValue?.(value)}
      className="px-3 py-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
    >
      {children}
    </div>
  );
}

/** Dialog **/
function Dialog({ open, onOpenChange, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onOpenChange?.(false);
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <div className="absolute inset-0 bg-black/50" onClick={() => onOpenChange?.(false)} />
      {children}
    </div>
  );
}
function DialogContent({ className = "", children }) {
  return (
    <div className={cx("relative w-[95vw] max-w-3xl bg-white dark:bg-neutral-900 border rounded-2xl shadow-xl", className)}>
      {children}
    </div>
  );
}
function DialogHeader({ children }) { return <div className="p-4 pb-2">{children}</div>; }
function DialogTitle({ className = "", children }) { return <div className={cx("text-lg font-semibold", className)}>{children}</div>; }
function DialogDescription({ className = "", children }) { return <div className={cx("text-sm text-neutral-500 dark:text-neutral-400", className)}>{children}</div>; }
function DialogFooter({ children }) { return <div className="p-4 pt-2">{children}</div>; }

/**
 * ---- Local Accordion fallback ----
 */
const AccordionUI = ({ children, className }) => <div className={className}>{children}</div>;
AccordionUI.displayName = "AccordionUI";
const AccordionItemUI = ({ children, className }) => {
  const nodes = React.Children.toArray(children);
  const trigger = nodes.find((n) => n?.type?.displayName === "AccordionTriggerUI");
  const content = nodes.find((n) => n?.type?.displayName === "AccordionContentUI");
  return (
    <details className={cx("group border-b", className)}>
      <summary className="list-none cursor-pointer select-none px-4 py-3 flex items-center justify-between">
        <div className="font-medium">{trigger ? trigger.props.children : null}</div>
        <span className="transition-transform group-open:rotate-180">▾</span>
      </summary>
      <div className="px-4 pb-4 text-sm">{content ? content.props.children : null}</div>
    </details>
  );
};
AccordionItemUI.displayName = "AccordionItemUI";
const AccordionTriggerUI = ({ children }) => <>{children}</>;
AccordionTriggerUI.displayName = "AccordionTriggerUI";
const AccordionContentUI = ({ children }) => <>{children}</>;
AccordionContentUI.displayName = "AccordionContentUI";

/** Helpers **/
const cls = (...a) => a.filter(Boolean).join(" ");
const PLACEHOLDER_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e5e7eb"/><stop offset="1" stop-color="#d1d5db"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`
  );

function ImageWithFallback({ src, alt, className }) {
  const [s, setS] = useState(src || PLACEHOLDER_SVG);
  return (
    <img src={s} alt={alt} loading="lazy" onError={() => setS(PLACEHOLDER_SVG)} className={className} />
  );
}

function getThemeTokens(theme) {
  return {
    card:
      theme === "dark"
        ? "bg-neutral-900/60 border-neutral-800 text-neutral-300"
        : "bg-white/80 border-neutral-200 text-neutral-700 backdrop-blur",
    border: theme === "dark" ? "border-neutral-800" : "border-neutral-200",
    muted: theme === "dark" ? "text-neutral-400" : "text-neutral-500",
    input:
      theme === "dark"
        ? "bg-neutral-900/60 border-neutral-800 text-neutral-100 placeholder:text-neutral-500"
        : "bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400",
    surface: theme === "dark" ? "bg-neutral-950 border-neutral-800" : "bg-white border-neutral-200",
  };
}

// ------- Mock data -------
const MOCK_PRODUCTS = [
  {
    id: "p1",
    title: "Smart Watch 8 (OEM)",
    category: "Электроника",
    minQty: 10,
    price: 1290,
    msrp: 2990,
    margin: 35,
    brand: "OEM",
    country: "CN",
    sku: "SW8-Black",
    stock: 1540,
    assetsReady: true,
    certifications: ["EAC", "RoHS"],
    images: [
      "https://images.unsplash.com/photo-1518447531136-bf65d8d6ad60?q=80&w=1200&auto=format&fit=crop",
    ],
    pack: {
      photos: 12,
      videos: 2,
      bullets: 8,
      keywords: 40,
      dimensions: "45×38×10 мм",
    },
  },
  {
    id: "p2",
    title: "Bluetooth-наушники Pods Pro",
    category: "Электроника",
    minQty: 20,
    price: 990,
    msrp: 2490,
    margin: 42,
    brand: "OEM",
    country: "CN",
    sku: "PP23-White",
    stock: 3200,
    assetsReady: true,
    certifications: ["EAC"],
    images: [
      "https://images.unsplash.com/photo-1518442411420-6b6f8f80b7a7?q=80&w=1200&auto=format&fit=crop",
    ],
    pack: {
      photos: 10,
      videos: 1,
      bullets: 6,
      keywords: 30,
      dimensions: "54×44×21 мм",
    },
  },
  {
    id: "p3",
    title: "Органайзер для кухни 'Compact'",
    category: "Дом и быт",
    minQty: 30,
    price: 190,
    msrp: 590,
    margin: 50,
    brand: "HomeCraft",
    country: "RU",
    sku: "HC-CMP-01",
    stock: 900,
    assetsReady: true,
    certifications: [],
    images: [
      "https://images.unsplash.com/photo-1496412705862-e0088f16f791?q=80&w=1200&auto=format&fit=crop",
    ],
    pack: {
      photos: 8,
      videos: 1,
      bullets: 6,
      keywords: 24,
      dimensions: "220×110×60 мм",
    },
  },
];

const PRICE_RULES = [
  { id: "r1", name: "Стандартная наценка", type: "markup", value: 1.35 },
  { id: "r2", name: "Минимальная маржа 25%", type: "minMargin", value: 0.25 },
];

export default function B2BResellerMVP() {
  const [role, setRole] = useState("seller");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [connectedWB, setConnectedWB] = useState(false);
  const [connectedOzon, setConnectedOzon] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [ruleId, setRuleId] = useState(PRICE_RULES[0].id);
  const [basket, setBasket] = useState([]);
  const [notif, setNotif] = useState(null);
  const [isLanding, setIsLanding] = useState(true);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Sanity checks
  useEffect(() => {
    console.assert(typeof AccordionUI === "function", "[SelfTest] AccordionUI should be defined");
    const td = getThemeTokens("dark");
    const tl = getThemeTokens("light");
    console.assert(!!td.muted && !!tl.muted, "[SelfTest] theme tokens must be present");
  }, []);

  const filtered = useMemo(() => {
    return MOCK_PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const selectedProduct = useMemo(
    () => MOCK_PRODUCTS.find((p) => p.id === selected) || null,
    [selected]
  );

  const t = getThemeTokens(theme);

  function addToBasket(id, qty = 10) {
    setBasket((prev) => {
      const exists = prev.find((i) => i.id === id);
      if (exists) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { id, qty }];
    });
    setNotif("Товар добавлен в корзину закупки");
  }

  function oneClickPublish(productId, target) {
    if ((target === "WB" && !connectedWB) || (target === "Ozon" && !connectedOzon)) {
      setNotif(`${target}: сначала подключите магазин в разделе Настройки`);
      return;
    }
    const product = MOCK_PRODUCTS.find((p) => p.id === productId);
    const rule = PRICE_RULES.find((r) => r.id === ruleId);
    let price = product.price;
    if (rule.type === "markup") price = Math.round(product.price * rule.value);
    if (rule.type === "minMargin")
      price = Math.max(
        Math.round(product.price * 1.2),
        Math.round(product.msrp * (1 - (1 - rule.value)))
      );
    setNotif(`Карточка «${product.title}» опубликована в ${target} по цене ${price} ₽ (симуляция)`);
  }

  if (isLanding) {
    return (
      <Landing
        theme={theme}
        setTheme={setTheme}
        onStartSeller={() => { setRole("seller"); setIsLanding(false); }}
        onStartManufacturer={() => { setRole("manufacturer"); setIsLanding(false); }}
      />
    );
  }

  return (
    <div
      className={cls(
        "min-h-screen w-full bg-gradient-to-b",
        theme === "dark"
          ? "from-neutral-950 via-neutral-950 to-neutral-900 text-neutral-50"
          : "from-white via-neutral-50 to-neutral-100 text-neutral-900"
      )}
    >
      <header className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cls("h-10 w-10 rounded-2xl grid place-items-center", theme === "dark" ? "bg-neutral-800" : "bg-neutral-200")}>
              <PlugZap className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">ResellerLink</h1>
              <p className={cls("text-xs", t.muted)}>Производители → ИП продавцы (WB / Ozon)</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="rounded-2xl"
              variant="ghost"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant={role === "seller" ? "default" : "secondary"} onClick={() => setRole("seller")} className="rounded-2xl">
              <Store className="h-4 w-4 mr-2" />Я — продавец
            </Button>
            <Button variant={role === "manufacturer" ? "default" : "secondary"} onClick={() => setRole("manufacturer")} className="rounded-2xl">
              <Factory className="h-4 w-4 mr-2" />Я — производитель
            </Button>
            <Button variant="secondary" className="rounded-2xl" onClick={() => setDialogOpen(true)}>
              <Rocket className="h-4 w-4 mr-2" /> Быстрый старт
            </Button>
          </div>
        </div>
      </header>

      {/* Value props */}
      <section className="max-w-7xl mx-auto px-6 pb-6">
        <div className="grid md:grid-cols-3 gap-4">
          <Card className={cls(t.card, "rounded-2xl")}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5" />Готовые карточки
              </CardTitle>
            </CardHeader>
            <CardContent className={cls("text-sm", t.muted)}>
              Фото, видео, SEO и характеристики входят. EAC и документы хранятся в профиле товара.
            </CardContent>
          </Card>
          <Card className={cls(t.card, "rounded-2xl")}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <UploadCloud className="h-5 w-5" />1 клик → WB/Ozon
              </CardTitle>
            </CardHeader>
            <CardContent className={cls("text-sm", t.muted)}>
              Интеграция с API маркетплейсов, ценовые правила и авто-синхронизация остатков.
            </CardContent>
          </Card>
          <Card className={cls(t.card, "rounded-2xl")}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="h-5 w-5" />Безопасная сделка
              </CardTitle>
            </CardHeader>
            <CardContent className={cls("text-sm", t.muted)}>
              Оплата по факту отгрузки, резервирование партии, защита от пересечения карточек.
            </CardContent>
          </Card>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 pb-20">
        <Tabs defaultValue="catalog" className="w-full">
          <TabsList className={cls("rounded-2xl border", theme === "dark" ? "bg-neutral-900/60 border-neutral-800" : "bg-white/80 border-neutral-200")}>
            <TabsTrigger value="catalog">Каталог</TabsTrigger>
            {role === "seller" && <TabsTrigger value="seller">Мой магазин</TabsTrigger>}
            {role === "manufacturer" && <TabsTrigger value="manufacturer">Мои товары</TabsTrigger>}
            <TabsTrigger value="settings"><span className="inline-flex items-center"><Settings className="h-4 w-4 mr-2"/>Настройки</span></TabsTrigger>
          </TabsList>

          {/* Catalog */}
          <TabsContent value="catalog" className="mt-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-1">
                <Search className={cls("h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2", t.muted)} />
                <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Поиск по названию или категории" className={cls("pl-9 rounded-2xl", t.input)} />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className={cls("w-[200px] rounded-2xl", t.input)}>
                  <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent className={theme === "dark" ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200"}>
                  <SelectItem value="all">Все категории</SelectItem>
                  <SelectItem value="Электроника">Электроника</SelectItem>
                  <SelectItem value="Дом и быт">Дом и быт</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {filtered.map((p) => (
                <motion.div key={p.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <Card className={cls(t.card, "overflow-hidden rounded-2xl")}>
                    <ImageWithFallback src={p.images[0]} alt={p.title} className="aspect-video w-full object-cover" />
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        {p.title} <Badge variant="secondary" className="rounded-xl">{p.category}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-3">
                      <div className={cls("flex items-center justify-between", t.muted)}><span>Мин. партия</span><span>{p.minQty} шт.</span></div>
                      <div className={cls("flex items-center justify-between", t.muted)}><span>Опт/шт</span><span>{p.price} ₽</span></div>
                      <div className={cls("flex items-center justify-between", t.muted)}><span>РРЦ</span><span>{p.msrp} ₽</span></div>
                      <div className={cls("flex items-center justify-between", t.muted)}><span>Склад</span><span>{p.stock} шт.</span></div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {p.assetsReady && <Badge className="rounded-xl" variant="outline">Контент-пак</Badge>}
                        {p.certifications.map((c) => (<Badge key={c} className="rounded-xl" variant="outline">{c}</Badge>))}
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <Button className="rounded-2xl flex-1" onClick={() => { setSelected(p.id); setDialogOpen(true); }}>
                          <Boxes className="h-4 w-4 mr-2" />Детали
                        </Button>
                        <Button className="rounded-2xl" variant="secondary" onClick={() => addToBasket(p.id, p.minQty)}>
                          <ShoppingCart className="h-4 w-4 mr-2" />В корзину
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button className="rounded-2xl flex-1" variant="outline" onClick={() => oneClickPublish(p.id, "WB")}>
                          <Globe className="h-4 w-4 mr-2" />Выложить в WB
                        </Button>
                        <Button className="rounded-2xl flex-1" variant="outline" onClick={() => oneClickPublish(p.id, "Ozon")}>
                          <Globe className="h-4 w-4 mr-2" />Выложить в Ozon
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Seller tab */}
          <TabsContent value="seller" className="mt-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className={cls(t.card, "rounded-2xl md:col-span-2")}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Store className="h-5 w-5" />Мои публикации
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className={cls("mb-3", t.muted)}>
                    Здесь появятся товары, опубликованные в WB/Ozon. Для демонстрации используйте кнопку публикации в каталоге.
                  </p>
                  <div className={cls("rounded-xl p-4 text-sm border", t.border, t.muted)}>
                    Пусто. Опубликуйте что-нибудь из каталога.
                  </div>
                </CardContent>
              </Card>
              <Card className={cls(t.card, "rounded-2xl")}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Settings className="h-5 w-5" />Правила цен
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3">
                  <Label className={t.muted}>Выберите правило</Label>
                  <Select value={ruleId} onValueChange={setRuleId}>
                    <SelectTrigger className={cls("rounded-2xl", t.input)}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={theme === "dark" ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200"}>
                      {PRICE_RULES.map((r) => (<SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>))}
                    </SelectContent>
                  </Select>
                  <div className="flex items-center justify-between pt-2">
                    <span className={t.muted}>Авто‑синхронизация цен/остатков</span>
                    <Switch checked={autoSync} onCheckedChange={setAutoSync} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Manufacturer tab */}
          <TabsContent value="manufacturer" className="mt-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className={cls(t.card, "rounded-2xl md:col-span-2")}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Edit3 className="h-5 w-5" />Добавить товар
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-4">
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <Label className={t.muted}>Название</Label>
                      <Input placeholder="Напр.: Smart Watch 8 (OEM)" className={cls("rounded-2xl", t.input)} />
                    </div>
                    <div>
                      <Label className={t.muted}>Категория</Label>
                      <Input placeholder="Электроника" className={cls("rounded-2xl", t.input)} />
                    </div>
                    <div>
                      <Label className={t.muted}>SKU</Label>
                      <Input placeholder="SW8-Black" className={cls("rounded-2xl", t.input)} />
                    </div>
                    <div>
                      <Label className={t.muted}>Оптовая цена, ₽</Label>
                      <Input type="number" placeholder="1290" className={cls("rounded-2xl", t.input)} />
                    </div>
                    <div>
                      <Label className={t.muted}>Мин. партия (шт.)</Label>
                      <Input type="number" placeholder="10" className={cls("rounded-2xl", t.input)} />
                    </div>
                    <div>
                      <Label className={t.muted}>Остаток на складе</Label>
                      <Input type="number" placeholder="1000" className={cls("rounded-2xl", t.input)} />
                    </div>
                    <div className="md:col-span-2">
                      <Label className={t.muted}>Краткое описание</Label>
                      <Textarea placeholder="Ключевые фичи, комплектация, гарантии" className={cls("rounded-2xl", t.input)} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className={cls("rounded-2xl p-3 border", t.border)}>
                      <Label className={t.muted}>Фото и видео</Label>
                      <div className={cls("mt-2 flex items-center gap-2 text-sm", t.muted)}><Upload className="h-4 w-4" /> Перетащите файлы</div>
                    </div>
                    <div className={cls("rounded-2xl p-3 border", t.border)}>
                      <Label className={t.muted}>Сертификаты (EAC, RoHS)</Label>
                      <div className={cls("mt-2 flex items-center gap-2 text-sm", t.muted)}><Upload className="h-4 w-4" /> Загрузить PDF</div>
                    </div>
                    <div className={cls("rounded-2xl p-3 border", t.border)}>
                      <Label className={t.muted}>Шаблоны карточек</Label>
                      <div className={cls("mt-2 text-sm", t.muted)}>Bullets, SEO, размеры, SKU</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button className="rounded-2xl"><Plus className="h-4 w-4 mr-2" />Сохранить товар</Button>
                    <Button className="rounded-2xl" variant="secondary">Предпросмотр карточки</Button>
                  </div>
                </CardContent>
              </Card>
              <Card className={cls(t.card, "rounded-2xl")}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Мои SKU</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3">
                  <div className={cls("rounded-xl p-4 text-sm border", t.border, t.muted)}>
                    Пока пусто. Добавьте первый товар.
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="mt-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className={cls(t.card, "rounded-2xl")}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg"><Globe className="h-5 w-5" />Интеграция WB</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3">
                  <Label className={t.muted}>API Token</Label>
                  <Input placeholder="wb_token_xxx" className={cls("rounded-2xl", t.input)} />
                  <Button className="rounded-2xl" onClick={() => setConnectedWB(true)}>
                    {connectedWB ? (<><Check className="h-4 w-4 mr-2" />Подключено</>) : ("Подключить")}
                  </Button>
                  <p className={cls("text-xs", t.muted)}>Используется для публикации карточек и синхронизации остатков.</p>
                </CardContent>
              </Card>
              <Card className={cls(t.card, "rounded-2xl")}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg"><Globe className="h-5 w-5" />Интеграция Ozon</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3">
                  <Label className={t.muted}>Client ID</Label>
                  <Input placeholder="ozon_client_id" className={cls("rounded-2xl", t.input)} />
                  <Label className={t.muted}>API Key</Label>
                  <Input placeholder="ozon_api_key" className={cls("rounded-2xl", t.input)} />
                  <Button className="rounded-2xl" onClick={() => setConnectedOzon(true)}>
                    {connectedOzon ? (<><Check className="h-4 w-4 mr-2" />Подключено</>) : ("Подключить")}
                  </Button>
                  <p className={cls("text-xs", t.muted)}>Для публикации карточек и получения фидов.</p>
                </CardContent>
              </Card>
              <Card className={cls(t.card, "rounded-2xl")}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg"><Settings className="h-5 w-5" />Общие</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={t.muted}>Автосоздание карточек</span>
                    <Switch checked={true} onCheckedChange={() => {}} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={t.muted}>Резерв партии при добавлении в корзину</span>
                    <Switch checked={true} onCheckedChange={() => {}} />
                  </div>
                  <Button className="rounded-2xl">Сохранить настройки</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Product dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className={cls("rounded-2xl max-w-3xl", t.surface)}>
          {selectedProduct ? (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedProduct.title} <Badge variant="secondary" className="rounded-xl">{selectedProduct.category}</Badge>
                </DialogTitle>
                <DialogDescription className={t.muted}>
                  SKU: {selectedProduct.sku} • Страна: {selectedProduct.country}
                </DialogDescription>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-4">
                <div className={cls("rounded-2xl overflow-hidden border", t.border)}>
                  <ImageWithFallback src={selectedProduct.images[0]} alt={selectedProduct.title} className="aspect-video w-full object-cover" />
                  <div className={cls("p-3 text-xs", t.muted)}>
                    Фото: {selectedProduct.pack.photos} • Видео: {selectedProduct.pack.videos} • Буллеты: {selectedProduct.pack.bullets}
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <InfoRow label="Опт/шт" value={`${selectedProduct.price} ₽`} />
                    <InfoRow label="РРЦ" value={`${selectedProduct.msrp} ₽`} />
                    <InfoRow label="Мин. партия" value={`${selectedProduct.minQty} шт.`} />
                    <InfoRow label="Склад" value={`${selectedProduct.stock} шт.`} />
                    <InfoRow label="Маржа (цел.)" value={`${selectedProduct.margin}%`} />
                    <InfoRow label="Габариты" value={selectedProduct.pack.dimensions} />
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {selectedProduct.assetsReady && (<Badge className="rounded-xl" variant="outline">Контент-пак</Badge>)}
                    {selectedProduct.certifications.map((c) => (<Badge key={c} className="rounded-xl" variant="outline">{c}</Badge>))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button className="rounded-2xl flex-1" onClick={() => addToBasket(selectedProduct.id, selectedProduct.minQty)}>
                      <ShoppingCart className="h-4 w-4 mr-2" />В корзину закупки
                    </Button>
                    <Button className="rounded-2xl flex-1" variant="secondary" onClick={() => oneClickPublish(selectedProduct.id, "WB")}>
                      <Globe className="h-4 w-4 mr-2" />Выложить в WB
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button className="rounded-2xl"><ArrowRight className="h-4 w-4 mr-2" />Предложить ИП шаблон карточки</Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Быстрый старт</DialogTitle>
                <DialogDescription className={t.muted}>
                  Подключите магазины, выберите правило цены и опубликуйте первый товар.
                </DialogDescription>
              </DialogHeader>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <StepCard icon={<Globe className="h-5 w-5" />} title="Подключите WB/Ozon" subtitle="Вставьте токены в Настройках и нажмите Подключить." />
                <StepCard icon={<Settings className="h-5 w-5" />} title="Выберите правило" subtitle="Наценка или минимальная маржа." />
                <StepCard icon={<UploadCloud className="h-5 w-5" />} title="Опубликуйте товар" subtitle="Откройте каталог и нажмите 'Выложить'." />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Toast */}
      {notif && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cls("px-4 py-2 rounded-xl border shadow-lg", theme === "dark" ? "bg-neutral-800 border-neutral-700 text-neutral-100" : "bg-white border-neutral-300 text-neutral-900")}>
            {notif}
          </motion.div>
          <div className={cls("h-0.5 mt-2 rounded-full overflow-hidden", theme === "dark" ? "bg-neutral-700" : "bg-neutral-300")}>
            <motion.div initial={{ width: "100%" }} animate={{ width: "0%" }} transition={{ duration: 3 }} className={cls("h-full", theme === "dark" ? "bg-neutral-100" : "bg-neutral-900")} onAnimationComplete={() => setNotif(null)} />
          </div>
        </div>
      )}

      {/* Hidden self-tests */}
      <DevSelfTests />

      <footer className={cls("max-w-7xl mx-auto px-6 pb-10 text-sm", t.muted)}>
        <div className={cls("pt-6 flex items-center justify-between border-t", t.border)}>
          <span>© {new Date().getFullYear()} ResellerLink</span>
          <span className="flex items-center gap-2"><Shield className="h-4 w-4" />Сделки защищены. Контент-паки включены.</span>
        </div>
      </footer>
    </div>
  );
}

/** Helper UI components **/
function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800/60 py-1">
      <span className="text-neutral-500 dark:text-neutral-400">{label}</span>
      <span>{value}</span>
    </div>
  );
}
function StepCard({ icon, title, subtitle }) {
  return (
    <Card className="rounded-2xl bg-white/80 border border-neutral-200 text-neutral-700 backdrop-blur dark:bg-neutral-900/60 dark:border-neutral-800 dark:text-neutral-300">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">{icon}{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-neutral-500 dark:text-neutral-400">{subtitle}</CardContent>
    </Card>
  );
}
function Metric({ value, label, theme }) {
  const isDark = theme === "dark";
  const surface = isDark ? "border-white/10 bg-white/5" : "border-neutral-200 bg-white";
  const valueColor = isDark ? "text-white" : "text-neutral-900";
  const muted = isDark ? "text-neutral-400" : "text-neutral-500";
  return (
    <div className={cls("rounded-3xl p-6 backdrop-blur", surface)}>
      <div className={cls("text-3xl font-semibold", valueColor)}>{value}</div>
      <div className={cls("mt-2 text-sm", muted)}>{label}</div>
    </div>
  );
}

/** Landing (pre-registration) **/
function Landing({ theme, setTheme, onStartSeller, onStartManufacturer }) {
  const isDark = theme === "dark";
  return (
    <div
      className={cls(
        "relative min-h-screen w-full overflow-hidden",
        theme === "dark"
          ? "bg-neutral-950 text-neutral-100"
          : "bg-gradient-to-b from-white via-neutral-50 to-neutral-100 text-neutral-900"
      )}
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(129,140,248,0.22),_transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(14,165,233,0.12),_transparent_55%)]" />
      </div>

      <header className="max-w-6xl lg:max-w-7xl mx-auto px-6 pt-10">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div
              className={cls(
                "h-10 w-10 rounded-2xl grid place-items-center border",
                theme === "dark" ? "border-white/10 bg-white/5" : "border-neutral-200 bg-white"
              )}
            >
              <PlugZap className="h-5 w-5" />
            </div>
            <div>
              <p className={cls("text-xs uppercase tracking-[0.3em]", isDark ? "text-neutral-400" : "text-neutral-500")}>ResellerLink</p>
              <h1 className={cls("text-lg font-semibold tracking-tight", isDark ? "text-neutral-50" : "text-neutral-900")}>Платформа для оптовых поставок</h1>
            </div>
          </div>
          <nav className={cls("hidden md:flex items-center gap-6 text-sm", isDark ? "text-neutral-300" : "text-neutral-500")}> 
            <button className={cls("transition", isDark ? "hover:text-white" : "hover:text-neutral-900")}>Как это работает</button>
            <button className={cls("transition", isDark ? "hover:text-white" : "hover:text-neutral-900")}>Каталог товаров</button>
            <button className={cls("transition", isDark ? "hover:text-white" : "hover:text-neutral-900")}>Партнёрам</button>
          </nav>
          <div className="flex items-center gap-2">
            <Button
              className="rounded-2xl"
              variant="ghost"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              className={cls(
                "rounded-2xl",
                isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-neutral-900 text-white hover:bg-neutral-800"
              )}
              variant="secondary"
            >
              Войти
            </Button>
            <Button className="rounded-2xl" onClick={onStartSeller}>
              Начать продавать
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl lg:max-w-7xl mx-auto px-6 pb-20">
        <section className="pt-16 lg:pt-20 grid lg:grid-cols-[1.1fr,1fr] gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div
                className={cls(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs",
                  isDark ? "border-white/10 bg-white/5 text-neutral-300" : "border-neutral-200 bg-white text-neutral-500"
                )}
              >
                <span className={cls("flex h-2 w-2 rounded-full", isDark ? "bg-emerald-400" : "bg-emerald-500")} />
                Готовые карточки, контент и логистика
              </div>
              <h2
                className={cls(
                  "text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight",
                  isDark ? "text-white" : "text-neutral-900"
                )}
              >
                <span className="block">Покупай малыми партиями.</span>
                <span className={cls("block", isDark ? "text-neutral-300" : "text-neutral-500")}>Публикуй в WB/Ozon в один клик.</span>
              </h2>
              <p className={cls("max-w-xl text-base sm:text-lg", isDark ? "text-neutral-400" : "text-neutral-600")}> 
                Платформа, где производители выкладывают готовые к продаже товары с контентом, а ИП моментально добавляют их в свои магазины.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="rounded-2xl px-6 py-3 text-base" onClick={onStartSeller}>
                <Search className="mr-2 h-4 w-4" /> Найти товары
              </Button>
              <Button
                className={cls(
                  "rounded-2xl px-6 py-3 text-base",
                  isDark ? "bg-white/10 text-white hover:bg-white/15" : "bg-neutral-900 text-white hover:bg-neutral-800"
                )}
                variant="secondary"
                onClick={onStartManufacturer}
              >
                <Upload className="mr-2 h-4 w-4" /> Стать поставщиком
              </Button>
            </div>

            <ul className={cls("flex flex-wrap items-center gap-3 text-sm", isDark ? "text-neutral-400" : "text-neutral-600")}> 
              <li className="flex items-center gap-2"><Shield className="h-4 w-4" /> Безопасная сделка</li>
              <li className="flex items-center gap-2"><PlugZap className="h-4 w-4" /> Интеграция API WB &amp; Ozon</li>
              <li className="flex items-center gap-2"><Sparkles className="h-4 w-4" /> Контент-паки включены</li>
            </ul>
          </div>

          <HeroShowcase theme={theme} />
        </section>

        <section className="mt-16 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Metric theme={theme} value="≥1500" label="SKU в каталоге" />
          <Metric theme={theme} value="5–30 шт." label="Минимальная партия" />
          <Metric theme={theme} value="&lt; 3 мин" label="Публикация карточки" />
          <Metric theme={theme} value="2 маркетплейса" label="WB + Ozon синхронно" />
        </section>

        <section className="mt-20 grid lg:grid-cols-3 gap-6">
          <LandingFeatureCard
            theme={theme}
            icon={<Boxes className="h-5 w-5" />}
            title="Каталог поставщиков"
            description="Выбирайте проверенные товары и бронируйте партии онлайн."
          />
          <LandingFeatureCard
            theme={theme}
            icon={<UploadCloud className="h-5 w-5" />}
            title="Публикуем малую партию"
            description="Ценовые правила и авто-обновление остатков без XLS и рутины."
          />
          <LandingFeatureCard
            theme={theme}
            icon={<ShoppingCart className="h-5 w-5" />}
            title="Выкуп в MP"
            description="Подключайте магазины WB/Ozon и получайте готовые карточки."
          />
        </section>

        <section
          className={cls(
            "mt-20 rounded-3xl p-8 backdrop-blur",
            isDark ? "border border-white/10 bg-white/5" : "border border-neutral-200 bg-white"
          )}
        >
          <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-8 items-center">
            <div className="space-y-4">
              <h3 className={cls("text-2xl font-semibold", isDark ? "text-white" : "text-neutral-900")}>Как это работает</h3>
              <p className={cls("text-base", isDark ? "text-neutral-400" : "text-neutral-600")}>
                Подключите маркетплейсы, выберите товары и запустите продажи с готовым контентом. Система автоматически добавит цену,
                опубликует карточку и будет синхронизировать остатки.
              </p>
              <div className={cls("space-y-3 text-sm", isDark ? "text-neutral-300" : "text-neutral-600")}> 
                <FeatureStep theme={theme} number="1" title="Подключите WB / Ozon" subtitle="Вставьте API-ключи и выберите склад" />
                <FeatureStep theme={theme} number="2" title="Выберите товары" subtitle="Фильтрация по марже, категориям и доступности" />
                <FeatureStep theme={theme} number="3" title="Публикация в 1 клик" subtitle="Мы создаём карточки, резервируем партию и отправляем поставку" />
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-sky-500/30 blur-3xl" />
              <div
                className={cls(
                  "rounded-3xl border p-6 shadow-xl",
                  isDark
                    ? "border-white/10 bg-neutral-900/70 shadow-sky-500/20"
                    : "border-neutral-200 bg-white shadow-sky-100/40"
                )}
              >
                <h4 className={cls("text-lg font-semibold", isDark ? "text-white" : "text-neutral-900")}>Готовый контент-пак</h4>
                <p className={cls("mt-2 text-sm", isDark ? "text-neutral-400" : "text-neutral-600")}>Фото, SEO, EAC, описание и ключевые слова. Добавьте товар — мы остальное сделаем сами.</p>
                <div className={cls("mt-6 space-y-3 text-sm", isDark ? "text-neutral-300" : "text-neutral-600")}> 
                  <InfoChip theme={theme} icon={<ImageIcon />} label="12 фото + 2 видео" />
                  <InfoChip theme={theme} icon={<Edit3 className="h-4 w-4" />} label="Bullets и SEO на русском" />
                  <InfoChip theme={theme} icon={<Shield className="h-4 w-4" />} label="Юридический пакет документов" />
                  <InfoChip theme={theme} icon={<Rocket className="h-4 w-4" />} label="Логистика до маркетплейса" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-6xl lg:max-w-7xl mx-auto px-6 pb-10 text-sm">
        <div
          className={cls(
            "mt-12 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between",
            isDark ? "border-white/10 text-neutral-400" : "border-neutral-200 text-neutral-500"
          )}
        >
          <span>© {new Date().getFullYear()} ResellerLink — платформа для оптовых продавцов</span>
          <span className={cls("flex items-center gap-2", isDark ? "text-neutral-300" : "text-neutral-600")}> 
            <Shield className="h-4 w-4" /> Сделки защищены · Контент-паки включены
          </span>
        </div>
      </footer>
    </div>
  );
}

function HeroShowcase({ theme }) {
  const isDark = theme === "dark";
  const surface = isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-neutral-200 text-neutral-900";
  const secondary = isDark ? "text-neutral-300" : "text-neutral-500";
  const highlight = isDark ? "text-emerald-300" : "text-emerald-600";
  return (
    <div className="relative grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className={cls("rounded-2xl p-4 backdrop-blur", surface)}>
          <p className={cls("text-xs", secondary)}>Товары для стартов</p>
          <p className="mt-3 text-lg font-semibold">Проверенные поставщики</p>
          <div className={cls("mt-4 flex items-center gap-3 text-sm", secondary)}>
            <span className={cls("rounded-xl px-3 py-1", isDark ? "bg-emerald-500/20 text-emerald-200" : "bg-emerald-100 text-emerald-600")}>≥35% маржа</span>
            <span className={cls("rounded-xl px-3 py-1", isDark ? "bg-sky-500/20 text-sky-200" : "bg-sky-100 text-sky-600")}>SKU готов</span>
          </div>
        </div>
        <div className={cls("rounded-2xl p-4 text-sm backdrop-blur", surface)}>
          <div className={cls("flex items-center justify-between", secondary)}>
            <span>Баланс</span>
            <span className={cls("text-xs uppercase tracking-[0.2em]", secondary)}>WB</span>
          </div>
          <p className="mt-4 text-2xl font-semibold">178 540 ₽</p>
          <p className={cls("mt-1 text-xs", highlight)}>+28 900 ₽ за 7 дней</p>
          <div className={cls("mt-4 h-20 overflow-hidden rounded-xl border", isDark ? "border-white/10" : "border-neutral-200")}> 
            <ImageWithFallback
              className="h-full w-full object-cover"
              alt="Ассортимент"
              src="https://images.unsplash.com/photo-1523475472560-d2df97ec485c?q=80&w=1200&auto=format&fit=crop"
            />
          </div>
        </div>
      </div>
      <div className={cls("rounded-3xl border p-4 sm:p-6 backdrop-blur", surface)}>
        <div className={cls("flex items-center justify-between text-xs", secondary)}>
          <span>Листинг готов</span>
          <span className={cls("rounded-xl px-3 py-1", isDark ? "bg-emerald-500/20 text-emerald-200" : "bg-emerald-100 text-emerald-600")}>Авто-синк 24/7</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <ImageWithFallback
            className="aspect-video w-full overflow-hidden rounded-2xl object-cover"
            alt="Hero showcase"
            src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1600&auto=format&fit=crop"
          />
          <div
            className={cls(
              "space-y-3 rounded-2xl border p-4 text-sm",
              isDark
                ? "border-white/10 bg-neutral-900/70 text-neutral-300"
                : "border-neutral-200 bg-neutral-50 text-neutral-600"
            )}
          >
            <div className="flex items-center justify-between">
              <span>Мин. партия</span>
              <span className="font-semibold text-current">10 шт.</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Опт / шт.</span>
              <span className="font-semibold text-current">1 290 ₽</span>
            </div>
            <div className="flex items-center justify-between">
              <span>РРЦ</span>
              <span className="font-semibold text-current">2 990 ₽</span>
            </div>
            <div className="flex items-center justify-between">
              <span>SKU в наличии</span>
              <span className="font-semibold text-current">1 540</span>
            </div>
            <Button
              className={cls(
                "w-full rounded-xl py-2 text-sm",
                isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-neutral-900 text-white hover:bg-neutral-800"
              )}
              variant="secondary"
            >
              В корзину закупки
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LandingFeatureCard({ icon, title, description, theme }) {
  const isDark = theme === "dark";
  const surface = isDark ? "border-white/10 bg-white/5 text-white" : "border-neutral-200 bg-white text-neutral-900";
  const muted = isDark ? "text-neutral-400" : "text-neutral-500";
  const iconBg = isDark ? "bg-white/10 text-white" : "bg-neutral-100 text-neutral-900";
  return (
    <div className={cls("rounded-3xl p-6 backdrop-blur", surface)}>
      <div className={cls("flex h-12 w-12 items-center justify-center rounded-2xl", iconBg)}>
        {icon}
      </div>
      <h3 className={cls("mt-6 text-lg font-semibold", isDark ? "text-white" : "text-neutral-900")}>{title}</h3>
      <p className={cls("mt-2 text-sm", muted)}>{description}</p>
    </div>
  );
}

function FeatureStep({ number, title, subtitle, theme }) {
  const isDark = theme === "dark";
  return (
    <div className="flex items-start gap-3">
      <div
        className={cls(
          "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
          isDark
            ? "border border-white/20 bg-white/10 text-white"
            : "border border-neutral-200 bg-neutral-100 text-neutral-900"
        )}
      >
        {number}
      </div>
      <div>
        <div className={cls("font-medium", isDark ? "text-white" : "text-neutral-900")}>{title}</div>
        <div className={cls("text-xs", isDark ? "text-neutral-400" : "text-neutral-500")}>{subtitle}</div>
      </div>
    </div>
  );
}

function InfoChip({ icon, label, theme }) {
  const isDark = theme === "dark";
  const surface = isDark ? "border-white/10 bg-white/5 text-neutral-200" : "border-neutral-200 bg-white text-neutral-700";
  const accent = isDark ? "text-sky-200" : "text-sky-500";
  return (
    <div className={cls("flex items-center gap-3 rounded-2xl px-4 py-2", surface)}>
      <span className={accent}>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function ImageIcon() {
  return <ImageWithFallback className="h-4 w-4 rounded object-cover" alt="Icon" src="https://images.unsplash.com/photo-1523475472560-d2df97ec485c?q=80&w=1200&auto=format&fit=crop" />;
}

function DevSelfTests() {
  // Silent; could render hidden diagnostics if needed
  return null;
}
