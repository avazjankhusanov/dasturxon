"use client"

import { useState } from "react"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import Link from "next/link"

const today = new Date().toISOString().split("T")[0]

const menuData: Record<string, { name: string; desc: string; price: string }[]> = {
  asosiy: [
    { name: "Asl o'zbek oshi", desc: "Farg'ona uslubi, qo'zi go'shti, kunjut moyi bilan", price: "55 000 so'm" },
    { name: "Tandir kabob", desc: "Yangi yoqilgan tandirda pishirilgan, ziravorli mol go'shti", price: "75 000 so'm" },
    { name: "Qozonkabob", desc: "Kartoshka va sabzavotlar bilan qozon kabob", price: "65 000 so'm" },
    { name: "Dimlama", desc: "7 xil sabzavot va qo'zi go'shti bilan dim taom", price: "60 000 so'm" },
    { name: "Manti", desc: "Qo'l bilan yasalgan, asl qo'zi go'shtli manti (6 dona)", price: "45 000 so'm" },
    { name: "Lag'mon", desc: "Qo'lda tortilgan erişta, mol go'shti va sabzavotlar", price: "48 000 so'm" },
    { name: "Shashlik", desc: "Qo'zi go'shtidan tayyorlangan milliy shashlik (5 ta)", price: "70 000 so'm" },
    { name: "Norin", desc: "Qo'lda qiyilgan go'sht va erişta bilan milliy taom", price: "52 000 so'm" },
  ],
  shorva: [
    { name: "Mastava", desc: "Guruchli, qo'zi go'shtli milliy sho'rva", price: "35 000 so'm" },
    { name: "Mosho'rva", desc: "Mosh va go'sht bilan an'anaviy sho'rva", price: "32 000 so'm" },
    { name: "Qovurma sho'rva", desc: "Qovurilgan go'sht va sabzavotlar bilan sho'rva", price: "38 000 so'm" },
    { name: "Dolma sho'rva", desc: "Karam va go'sht bilan isituvchi sho'rva", price: "36 000 so'm" },
    { name: "Ugra sho'rva", desc: "Uy erişta va mol go'shti bilan", price: "34 000 so'm" },
    { name: "Shurpa", desc: "Qo'zi go'shti va yirik sabzavotlar bilan", price: "40 000 so'm" },
  ],
  non: [
    { name: "Tandir non", desc: "Kunda ertalab yopiladigan yangi non", price: "8 000 so'm" },
    { name: "Achichuk salat", desc: "Pomidor, piyoz, ko'k ziravorlar bilan", price: "18 000 so'm" },
    { name: "Chuchvara", desc: "Go'shtli mayda chuchvara, qatiq bilan (10 dona)", price: "42 000 so'm" },
    { name: "Somsa", desc: "Tandirda pishirilgan qo'zi go'shtli somsa (2 dona)", price: "22 000 so'm" },
    { name: "Ko'k salat", desc: "Mavsumiy sabzavotlar va o'tlar bilan", price: "20 000 so'm" },
    { name: "Non kabob", desc: "Tandirda pishirilgan go'shtli non", price: "28 000 so'm" },
  ],
  ichimlik: [
    { name: "Ko'k choy", desc: "Namangan ko'k choy, limon bilan (choydish)", price: "12 000 so'm" },
    { name: "Qora choy", desc: "Qand va qaymoq bilan (choydish)", price: "12 000 so'm" },
    { name: "Qatiq", desc: "Uy qatiği, yangi tayyorlangan (1 kosa)", price: "15 000 so'm" },
    { name: "Kompot", desc: "Quritilgan mevalardan tayyorlangan ichimlik", price: "18 000 so'm" },
    { name: "Limonand", desc: "Tabiiy limon va nana bilan sovuq ichimlik", price: "22 000 so'm" },
    { name: "Uzum sharbati", desc: "Yangi siqilgan tabiiy uzum sharbati", price: "25 000 so'm" },
  ],
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("asosiy")
  const [navOpen, setNavOpen] = useState(false)
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "", guests: "", room: "", note: "" })
  const [submitted, setSubmitted] = useState(false)

  const closeNav = () => setNavOpen(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.date || !form.time || !form.guests) {
      alert("Iltimos, yulduzcha (*) bilan belgilangan maydonlarni to'ldiring.")
      return
    }
    setSubmitted(true)
  }

  const resetForm = () => {
    setForm({ name: "", phone: "", date: "", time: "", guests: "", room: "", note: "" })
    setSubmitted(false)
  }

  return (
    <>
      {/* ===== NAV ===== */}
      <nav className="nav">
        <a href="#" className="nav-logo">✦ Dasturxon</a>
        <button
          className="nav-burger"
          onClick={() => setNavOpen(!navOpen)}
          aria-label="Menyu"
        >
          <span /><span /><span />
        </button>
        <ul className={`nav-links${navOpen ? " open" : ""}`} id="navLinks">
          <li><a href="#about" onClick={closeNav}>Biz haqimizda</a></li>
          <li><a href="#menu" onClick={closeNav}>Menyu</a></li>
          <li><a href="#reservation" onClick={closeNav}>Joy band qilish</a></li>
          <li><a href="#contact" onClick={closeNav}>Aloqa</a></li>
          <li>
            <SignedIn>
              <Link href="/products" onClick={closeNav} style={{ color: "var(--gold-light)" }}>
                Mahsulotlar
              </Link>
            </SignedIn>
          </li>
          <li>
            <SignedOut>
              <SignInButton mode="modal">
                <button style={{ background: "none", border: "none", padding: 0, font: "inherit" }}>
                  Kirish
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </li>
        </ul>
      </nav>

      {/* ===== HERO ===== */}
      <div className="hero">
        <div className="hero-content">
          <span className="hero-ornament">❧</span>
          <h1>Haqiqiy <em>O'zbek</em><br />ta'mi</h1>
          <p className="hero-sub">Toshkent · Milliy oshxona · 1987 yildan</p>
          <p className="hero-desc">Bobomizdan meros qolgan retseptlar, zamon talabiga mos muhit va yurak to'la mehribonlik.</p>
          <div className="hero-btns">
            <a href="#reservation" className="btn-gold">✦ Joy band qilish</a>
            <a href="#menu" className="btn-outline">Menyuni ko'rish</a>
          </div>
        </div>
      </div>

      {/* ===== GALLERY STRIP ===== */}
      <div className="gallery-strip">
        <div style={{ display: "flex", animation: "scroll 20s linear infinite" } as React.CSSProperties}>
          {["🍽️ Asl o'zbek oshi", "🫖 Ko'k choy marosimi", "🥘 Tandir kabob", "🫓 Yangi non", "🎋 Milliy muhit", "🌿 Tabiiy ziravorlar", "🏺 An'anaviy idishlar"].map((item, i) => (
            <div key={i} className="gallery-item">{item}</div>
          ))}
          {["🍽️ Asl o'zbek oshi", "🫖 Ko'k choy marosimi", "🥘 Tandir kabob", "🫓 Yangi non", "🎋 Milliy muhit", "🌿 Tabiiy ziravorlar", "🏺 An'anaviy idishlar"].map((item, i) => (
            <div key={`dup-${i}`} className="gallery-item">{item}</div>
          ))}
        </div>
      </div>

      {/* ===== ABOUT ===== */}
      <div className="section-wrap" id="about">
        <div className="section-inner">
          <h2 className="section-title">Biz haqimizda</h2>
          <div className="divider">
            <div className="divider-line" /><div className="divider-diamond" /><div className="divider-line" />
          </div>
          <div className="about-grid">
            <div className="about-text">
              <p>«Dasturxon» — bu shunchaki restoran emas, bu avloddan-avlodga o'tib kelgan milliy an'analarimiz, o'zbek mehmon-do'stligi va haqiqiy ta'mlarning uyidir.</p>
              <p>Biz har bir taomni qalb va sabr bilan tayyorlaymiz. Tandirda yopilgan non, yillab yetilgan kunjut moyi, tog'dan keltirilgan ziravorlar — bularning barchasi sizning dasturxoningizga iliq holda yetib keladi.</p>
              <p>Keling, bir ko'ringa aylanib keting — va albatta qaytib kelasiz.</p>
              <div className="stats">
                <div className="stat"><span className="stat-num">37+</span><span className="stat-label">Yil tajriba</span></div>
                <div className="stat"><span className="stat-num">80+</span><span className="stat-label">Taom turi</span></div>
                <div className="stat"><span className="stat-num">200</span><span className="stat-label">O'rindiq</span></div>
              </div>
            </div>
            <div className="about-visual">
              <span className="big-icon">🫖</span>
              <h3>Mehmon — izzat</h3>
              <p>&quot;Uyga kirgan mehmon — baxtga kirgan&quot; — bu o'zbek udumi bizning har bir kunimizning asosini tashkil etadi.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MENU ===== */}
      <div className="section-wrap menu-section" id="menu">
        <div className="section-inner">
          <h2 className="section-title">Bizning menyu</h2>
          <div className="divider">
            <div className="divider-line" /><div className="divider-diamond" /><div className="divider-line" />
          </div>

          <div className="menu-tabs">
            {[
              { id: "asosiy", label: "Asosiy taomlar" },
              { id: "shorva", label: "Sho'rvalar" },
              { id: "non", label: "Non & Salatlar" },
              { id: "ichimlik", label: "Ichimliklar" },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn${activeTab === tab.id ? " active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {Object.entries(menuData).map(([key, items]) => (
            <div key={key} className={`menu-category${activeTab === key ? " active" : ""}`}>
              {items.map((item, i) => (
                <div key={i} className="menu-item">
                  <div>
                    <div className="menu-item-name">{item.name}</div>
                    <div className="menu-item-desc">{item.desc}</div>
                  </div>
                  <div className="menu-price">{item.price}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ===== RESERVATION ===== */}
      <div className="section-wrap reservation-section" id="reservation">
        <div className="section-inner" style={{ maxWidth: 720 }}>
          <h2 className="section-title light">Joy band qilish</h2>
          <div className="divider">
            <div className="divider-line" /><div className="divider-diamond" /><div className="divider-line" />
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} id="resFormWrap">
              <div className="res-form">
                <div className="form-group">
                  <label>Ism va familiya *</label>
                  <input type="text" placeholder="Sardor Karimov" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Telefon raqam *</label>
                  <input type="tel" placeholder="+998 90 123 45 67" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Sana *</label>
                  <input type="date" min={today} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Vaqt *</label>
                  <select value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}>
                    <option value="">Vaqtni tanlang</option>
                    {["11:00","12:00","13:00","14:00","15:00","17:00","18:00","19:00","20:00","21:00"].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Mehmonlar soni *</label>
                  <select value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })}>
                    <option value="">Tanlang</option>
                    {["1 kishi","2 kishi","3–4 kishi","5–6 kishi","7–10 kishi","10+ kishi"].map((g) => (
                      <option key={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Xona turi</label>
                  <select value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })}>
                    <option value="">Tanlang (ixtiyoriy)</option>
                    <option>Asosiy zal</option>
                    <option>Airvon (ochiq havo)</option>
                    <option>Alohida xona (VIP)</option>
                    <option>Mahalla (guruh uchun)</option>
                  </select>
                </div>
                <div className="form-group full">
                  <label>Izoh (ixtiyoriy)</label>
                  <textarea rows={3} placeholder="Tug'ilgan kun, maxsus talab, allergiya yoki boshqa xabar..." value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
                </div>
                <div className="full" style={{ textAlign: "center", marginTop: "0.5rem" }}>
                  <button type="submit" className="btn-gold" style={{ fontSize: "1.1rem", padding: "0.85rem 3rem" }}>
                    ✦ &nbsp;Joyni band qilish
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="res-success" style={{ display: "block" }}>
              <span className="check">✦</span>
              <h3>Joyingiz band qilindi!</h3>
              <p>
                {form.name}, {new Date(form.date).toLocaleDateString("uz-UZ", { day: "numeric", month: "long", year: "numeric" })}
                {" "}kuni soat {form.time} da {form.guests} uchun joyingiz band qilindi.
                Tez orada {form.phone} raqamiga qo&apos;ng&apos;iroq qilamiz!
              </p>
              <button onClick={resetForm}>Yangi band qilish</button>
            </div>
          )}
        </div>
      </div>

      {/* ===== CONTACT ===== */}
      <div className="section-wrap" id="contact">
        <div className="section-inner">
          <h2 className="section-title">Aloqa</h2>
          <div className="divider">
            <div className="divider-line" /><div className="divider-diamond" /><div className="divider-line" />
          </div>
          <div className="contact-grid">
            <div className="contact-card">
              <span className="contact-icon">📍</span>
              <h4>Manzil</h4>
              <p>Toshkent shahri,<br />Navoiy ko'chasi, 14-uy</p>
            </div>
            <div className="contact-card">
              <span className="contact-icon">🕐</span>
              <h4>Ish vaqti</h4>
              <p>Har kuni<br />11:00 — 23:00</p>
            </div>
            <div className="contact-card">
              <span className="contact-icon">📞</span>
              <h4>Telefon</h4>
              <p>+998 71 234 56 78<br />+998 90 123 45 67</p>
            </div>
          </div>
          <div className="map-placeholder">
            <span>🗺️</span>
            <p>Bu yerga Google Maps embed kodini joylashtiring</p>
          </div>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <footer>
        <span className="footer-logo">✦ Dasturxon</span>
        <p className="footer-tagline">Milliy ta'mlar, yurak to'la mehmon-do'stlik · Toshkent, 1987 yildan</p>
        <div className="footer-links">
          <a href="#about">Biz haqimizda</a>
          <a href="#menu">Menyu</a>
          <a href="#reservation">Joy band qilish</a>
          <a href="#contact">Aloqa</a>
        </div>
        <p className="footer-copy">&copy; {new Date().getFullYear()} Dasturxon restoran. Barcha huquqlar himoyalangan.</p>
      </footer>

      { /* keyframes for gallery scroll */ }
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </>
  )
}
