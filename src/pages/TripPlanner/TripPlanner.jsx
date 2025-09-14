import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ add
import styles from "./TripPlanner.module.css";

function useCountries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2",
          { signal: ctrl.signal }
        );
        if (!res.ok) throw new Error("Failed to load countries");
        const data = await res.json();
        const list = data
          .map((c) => c?.name?.common)
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b));
        setCountries(list);
      } catch (e) {
        if (e.name !== "AbortError") setError(e.message || String(e));
      } finally {
        setLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, []);

  return { countries, loading, error };
}

const VISAS = [
  "Schengen Visa",
  "UK Visa",
  "US Visa",
  "Canadian Visa",
  "Schengen (Multiple)",
  "Tourist Visa",
  "Student Visa",
  "Transit Visa",
];

const fmtMoney = (n) =>
  new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(
    Number(n || 0)
  );

function useOutsideClose(ref, onClose) {
  useEffect(() => {
    function h(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose?.();
    }
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose, ref]);
}

function SingleSelect({ label, placeholder, items, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const boxRef = useRef(null);
  useOutsideClose(boxRef, () => setOpen(false));

  const filtered = useMemo(
    () => items.filter((i) => i.toLowerCase().includes(q.toLowerCase())),
    [items, q]
  );

  return (
    <div className={styles.field}>
      <label>{label}</label>
      <div className={styles.select} ref={boxRef}>
        <button
          type="button"
          className={styles.selectBtn}
          onClick={() => setOpen((s) => !s)}
          aria-expanded={open}
        >
          <span>{value || placeholder}</span>
          <span className={styles.chev}>▾</span>
        </button>

        {open && (
          <div className={styles.menu}>
            <div className={styles.searchRow}>
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search"
              />
            </div>
            <div className={styles.list}>
              {filtered.map((i) => (
                <button
                  key={i}
                  className={styles.item}
                  onClick={() => {
                    onChange(i);
                    setOpen(false);
                    setQ("");
                  }}
                >
                  {i}
                </button>
              ))}
              {!filtered.length && (
                <div className={styles.empty}>No results</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MultiSelect({ label, placeholder, items, values, onChange }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const boxRef = useRef(null);
  useOutsideClose(boxRef, () => setOpen(false));

  const filtered = useMemo(
    () => items.filter((i) => i.toLowerCase().includes(q.toLowerCase())),
    [items, q]
  );

  function toggle(v) {
    if (values.includes(v)) onChange(values.filter((x) => x !== v));
    else onChange([...values, v]);
  }

  return (
    <div className={styles.field}>
      <label>{label}</label>
      <div className={styles.select} ref={boxRef}>
        <button
          type="button"
          className={styles.selectBtn}
          onClick={() => setOpen((s) => !s)}
          aria-expanded={open}
        >
          <div className={styles.tagsWrap}>
            {values.length === 0 ? (
              <span className={styles.placeholder}>{placeholder}</span>
            ) : (
              values.map((v) => (
                <span key={v} className={styles.tag}>
                  {v}
                  <button
                    type="button"
                    aria-label={`Remove ${v}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(values.filter((x) => x !== v));
                    }}
                  >
                    ×
                  </button>
                </span>
              ))
            )}
          </div>
          <span className={styles.chev}>▾</span>
        </button>

        {open && (
          <div className={styles.menu}>
            <div className={styles.searchRow}>
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search"
              />
            </div>
            <div className={styles.list}>
              {filtered.map((i) => {
                const checked = values.includes(i);
                return (
                  <label key={i} className={styles.itemCheck}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(i)}
                    />
                    <span>{i}</span>
                  </label>
                );
              })}
              {!filtered.length && (
                <div className={styles.empty}>No results</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TripPlannerModal({ isOpen, onClose, onSubmit }) {
  const navigate = useNavigate();

  const [budget, setBudget] = useState(5_000_000);
  const [passports, setPassports] = useState([]);
  const [haveVisa, setHaveVisa] = useState([]);
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("");
  const [date, setDate] = useState("");

  const {
    countries,
    loading: loadingCountries,
    error: countriesError,
  } = useCountries();

  const countryItems = countries;

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const esc = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", esc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function submitHandler(e) {
    e.preventDefault();

    const criteria = {
      budget,
      passports,
      haveVisa,
      fromCountry,
      toCountry,
      date,
    };

    onSubmit?.(criteria);
    sessionStorage.setItem(
      "tripResults",
      JSON.stringify({ trips: null, criteria })
    );

    navigate("/search", { state: { criteria }, replace: true });
  }

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <div>
            <h3>Plan your perfect trip</h3>
            <p>Just a few details and we will find the best options for you.</p>
            {loadingCountries && (
              <small className={styles.muted}>Loading countries…</small>
            )}
            {countriesError && (
              <small className={styles.warning}>Couldn’t load countries.</small>
            )}
          </div>
          <button className={styles.close} aria-label="Close" onClick={onClose}>
            ×
          </button>
        </header>

        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.field}>
            <label>Budget Range</label>
            <div className={styles.budgetWrap}>
              <input
                type="text"
                inputMode="numeric"
                value={fmtMoney(budget)}
                onChange={(e) =>
                  setBudget(
                    Number(String(e.target.value).replace(/[^\d]/g, "")) || 0
                  )
                }
                className={styles.budgetInput}
              />
              <input
                type="range"
                min="50"
                max="15000000"
                step="50"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
              />
              <div className={styles.rangeLabels}>
                <span>Min: 50</span>
                <span>Max: ₦{fmtMoney(15_000_000)}</span>
              </div>
            </div>
          </div>

          <MultiSelect
            label="What passport do you hold?"
            placeholder={loadingCountries ? "Loading…" : "Select country"}
            items={countryItems}
            values={passports}
            onChange={setPassports}
          />

          <MultiSelect
            label="What visa(s) do you already have?"
            placeholder="Select visa type"
            items={VISAS}
            values={haveVisa}
            onChange={setHaveVisa}
          />

          <SingleSelect
            label="Where are you leaving from?"
            placeholder={
              loadingCountries ? "Loading…" : "Select your current country"
            }
            items={countryItems}
            value={fromCountry}
            onChange={setFromCountry}
          />
          <SingleSelect
            label="Where are you travelling to?"
            placeholder={
              loadingCountries ? "Loading…" : "Select destination country"
            }
            items={countryItems}
            value={toCountry}
            onChange={setToCountry}
          />

          <div className={styles.field}>
            <label>Departure Date</label>
            <div className={styles.select}>
              <div className={styles.selectBtn} data-static>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={styles.dateInput}
                />
                <span className={styles.chev}>▾</span>
              </div>
            </div>
          </div>

          <button
            className={styles.cta}
            type="submit"
            disabled={loadingCountries || !countryItems.length}
          >
            Find My Trip
          </button>
        </form>
      </div>
    </div>
  );
}
