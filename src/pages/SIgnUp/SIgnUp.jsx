import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

const BASE = import.meta.env.DEV ? "" : (import.meta.env.VITE_API_URL || "");

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim());
const strength = (pwd) => {
  let s = 0;
  if ((pwd || "").length >= 8) s++;
  if (/[A-Z]/.test(pwd)) s++;
  if (/[a-z]/.test(pwd)) s++;
  if (/\d/.test(pwd)) s++;
  if (/[^\w\s]/.test(pwd)) s++;
  return s;
};

export default function SignUp() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    agree: false,
  });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});
  const [done, setDone] = useState(false);

  const [serverErr, setServerErr] = useState("");
  const [fieldErrs, setFieldErrs] = useState({});

  const score = useMemo(() => strength(form.password), [form.password]);

  const clientErrs = useMemo(() => {
    const e = {};
    if (!form.name.trim()) e.name = "Your full name is required";
    if (!emailOk(form.email)) e.email = "Enter a valid email address";
    if (form.password.length < 8) e.password = "Min 8 characters";
    if (form.password && form.confirm && form.password !== form.confirm)
      e.confirm = "Passwords do not match";
    if (!form.agree) e.agree = "Please accept Terms";
    return e;
  }, [form]);

  const errFor = (k) => fieldErrs[k] || (touched[k] && clientErrs[k]) || "";

  const onChange = (k) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [k]: val }));
  };

  const onBlur = (k) => () => setTouched((t) => ({ ...t, [k]: true }));

  const submit = async (e) => {
    e.preventDefault();
    setServerErr("");
    setFieldErrs({});
    setTouched({
      name: true,
      email: true,
      password: true,
      confirm: true,
      agree: true,
    });

    if (Object.keys(clientErrs).length) return;

    try {
      setLoading(true);
      const res = await fetch(`${BASE}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json().catch(() => ({}));
      setLoading(false);

      if (!res.ok) {
        if (data?.errors) setFieldErrs(data.errors); 
        setServerErr(data?.message || "Registration failed");
        return;
      }

      localStorage.setItem("displayName", data.user?.name || form.name);
      setDone(true);
    } catch (err) {
      setLoading(false);
      setServerErr("Network error. Please try again.");
    }
  };

  return (
    <div className={styles.shell}>
      <NavBar />
      <main className={styles.main}>
        <section className={styles.card}>
          <h1>Create your account</h1>
          <p className={styles.sub}>Join Travelly and start planning perfect trips.</p>

          {serverErr && <div className={styles.banner}>{serverErr}</div>}

          <form className={styles.form} onSubmit={submit} noValidate>
            <label className={styles.label}>
              Full name
              <input
                className={`${styles.input} ${errFor("name") ? styles.bad : ""}`}
                type="text"
                placeholder="Sandra Adeniyi"
                value={form.name}
                onChange={onChange("name")}
                onBlur={onBlur("name")}
                autoComplete="name"
              />
              {errFor("name") && <span className={styles.err}>{errFor("name")}</span>}
            </label>
            <label className={styles.label}>
              Email address
              <input
                className={`${styles.input} ${errFor("email") ? styles.bad : ""}`}
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={onChange("email")}
                onBlur={onBlur("email")}
                autoComplete="email"
              />
              {errFor("email") && <span className={styles.err}>{errFor("email")}</span>}
            </label>
            <label className={styles.label}>
              Password
              <div className={styles.pwdRow}>
                <input
                  className={`${styles.input} ${errFor("password") ? styles.bad : ""}`}
                  type={showPwd ? "text" : "password"}
                  placeholder="At least 8 characters"
                  value={form.password}
                  onChange={onChange("password")}
                  onBlur={onBlur("password")}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className={styles.ghost}
                  onClick={() => setShowPwd((s) => !s)}
                  aria-label={showPwd ? "Hide password" : "Show password"}
                >
                  {showPwd ? "Hide" : "Show"}
                </button>
              </div>
              <div className={styles.meter} aria-hidden>
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} className={`${styles.bar} ${score > i ? styles.on : ""}`} />
                ))}
              </div>
              <small className={styles.hint}>
                Use upper & lower case, a number, and a symbol for a stronger password.
              </small>
              {errFor("password") && <span className={styles.err}>{errFor("password")}</span>}
            </label>

            <label className={styles.label}>
              Confirm password
              <input
                className={`${styles.input} ${errFor("confirm") ? styles.bad : ""}`}
                type={showPwd ? "text" : "password"}
                placeholder="Re-enter password"
                value={form.confirm}
                onChange={onChange("confirm")}
                onBlur={onBlur("confirm")}
                autoComplete="new-password"
              />
              {errFor("confirm") && <span className={styles.err}>{errFor("confirm")}</span>}
            </label>

            <label className={styles.checkline}>
              <input
                type="checkbox"
                checked={form.agree}
                onChange={onChange("agree")}
                onBlur={onBlur("agree")}
              />
              <span>
                I agree to the <a href="#terms">Terms</a> and{" "}
                <a href="#privacy">Privacy Policy</a>
              </span>
            </label>
            {errFor("agree") && <span className={styles.err}>{errFor("agree")}</span>}

            <button className={styles.primary} disabled={loading}>
              {loading ? "Creating account…" : "Create account"}
            </button>

            <p className={styles.alt}>
              Already have an account? <a href="/login">Log in</a>
            </p>
          </form>
        </section>
 
        {done && (
          <div className={styles.overlay} role="dialog" aria-modal="true">
            <div className={styles.modal}>
              <h2>Welcome to Travelly 🎉</h2>
              <p>Your account has been created.</p>
              <a className={styles.primary} href="/trips">Explore Trips</a>
              <button className={styles.ghost} onClick={() => setDone(false)}>Close</button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
