import React, { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import s from "./Trips.module.css";
import { FaPlane, FaBed, FaCalendarDays, FaCartShopping } from "react-icons/fa6";
import image1 from "../../assets/tripsimg1.jpg";
import image2 from "../../assets/tripsimg2.jpg";
import image3 from "../../assets/tripsimg3.jpg";
import image4 from "../../assets/tripsimg4.jpg";
import image5 from "../../assets/tripsimg5.jpg";
import image6 from "../../assets/tripsimg6.jpg";
import image7 from "../../assets/tripsimg7.jpg";
import image8 from "../../assets/tripsimg8.jpg";
import image9 from "../../assets/tripsimg9.jpg";

const N = new Intl.NumberFormat();
const fmt = (n) => `₦${N.format(n || 0)}`;

const fmtMoney = (n) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Number(n || 0));

const fmtDate = (isoOrRange) => {
  if (!isoOrRange) return "Flexible";
  if (/\d/.test(isoOrRange) && isoOrRange.includes(" - ")) return isoOrRange;
  const d = new Date(isoOrRange);
  if (isNaN(d)) return isoOrRange;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const FLAG = {
  Portugal: "🇵🇹",
  France: "🇫🇷",
  UAE: "🇦🇪",
  Japan: "🇯🇵",
  Turkey: "🇹🇷",
  Nigeria: "🇳🇬",
  Italy: "🇮🇹",
  "South Korea": "🇰🇷",
};
const countryFlag = (country) => FLAG[country] || "🏳️";

function useTripsFromNav() {
  const location = useLocation();
  const stateTrips = location.state?.trips;
  const stateCriteria = location.state?.criteria;

  return useMemo(() => {
    if (stateTrips) return { trips: stateTrips, criteria: stateCriteria };
    const raw = sessionStorage.getItem("tripResults");
    if (!raw) return { trips: null, criteria: null };
    try {
      const parsed = JSON.parse(raw);
      return { trips: parsed.trips, criteria: parsed.criteria };
    } catch {
      return { trips: null, criteria: null };
    }
  }, [stateTrips, stateCriteria]);
}

const DEMO = [
  {
    id: "d1",
    city: "Lisbon",
    country: "Portugal",
    nights: 6,
    price: 1200000,
    img: image1,
    date: "July 10 - July 11",
  },
  {
    id: "d2",
    city: "Paris",
    country: "France",
    nights: 6,
    price: 900000,
    img: image2,
    date: "Aug 2 - Aug 9",
  },
  {
    id: "d3",
    city: "Dubai",
    country: "UAE",
    nights: 5,
    price: 1050000,
    img: image3,
    date: "Sept 4 - Sept 9",
  },
  {
    id: "d4",
    city: "Tokyo",
    country: "Japan",
    nights: 7,
    price: 1500000,
    img: image5,
    date: "Oct 1 - Oct 8",
  },
  {
    id: "d5",
    city: "Istanbul",
    country: "Turkey",
    nights: 6,
    price: 780000,
    img: image5,
    date: "Nov 12 - Nov 18",
  },
  {
    id: "d6",
    city: "Lagos",
    country: "Nigeria",
    nights: 4,
    price: 640000,
    img: image6,
    date: "Dec 3 - Dec 7",
  },
  {
    id: "d7",
    city: "Abuja",
    country: "Nigeria",
    nights: 5,
    price: 680000,
    img: image7,
    date: "Dec 10 - Dec 15",
  },
  {
    id: "d8",
    city: "Rome",
    country: "Italy",
    nights: 5,
    price: 950000,
    img: image8,
    date: "Jan 4 - Jan 9",
  },
  {
    id: "d9",
    city: "Seoul",
    country: "South Korea",
    nights: 6,
    price: 1120000,
    img: image9,
    date: "Feb 8 - Feb 14",
  },
];

export default function Trips() {
  const navigate = useNavigate();
  const { trips, criteria } = useTripsFromNav();

  const [budgetBand, setBudgetBand] = useState("All");
  const [sort, setSort] = useState("Best Match");

  // normalize API trips
  const normalized = useMemo(() => {
    if (!trips || !trips.length) return [];
    return trips.map((t, i) => {
      const base = t.price ?? 400000;
      const flight = t.flightEstimate ?? Math.round(base * 0.75);
      const stay = t.accommodation ?? Math.round(base * 0.4);
      const total = t.totalPackage ?? flight + stay;

      return {
        id: t.id || `r${i}`,
        city: t.city || t.to || "Destination",
        country: t.country || "",
        nights: t.nights ?? 5,
        price: base,
        img:
          t.img ||
          "https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=1600&auto=format&fit=crop",
        from: t.from || criteria?.from || "",
        date: t.date || criteria?.date || "Flexible",
        visaStatus: t.visaStatus || "Visa-free",
        flightEstimate: flight,
        accommodation: stay,
        totalPackage: total,
      };
    });
  }, [trips, criteria]);

  const fallback = useMemo(() => {
    if (normalized.length) return [];
    let list = DEMO.map((d) => {
      const flight = Math.round(d.price * 0.75);
      const stay = Math.round(d.price * 0.4);
      return {
        ...d,
        from: criteria?.from || "",
        visaStatus: "Visa-free",
        flightEstimate: flight,
        accommodation: stay,
        totalPackage: flight + stay,
      };
    });

    const qCountry = (criteria?.to || "").toLowerCase().trim();
    const qCity = (criteria?.city || "").toLowerCase().trim();
    if (qCountry)
      list = list.filter((d) =>
        (d.country || "").toLowerCase().includes(qCountry)
      );
    if (qCity)
      list = list.filter((d) => (d.city || "").toLowerCase().includes(qCity));
    return list;
  }, [normalized.length, criteria]);

  const base = normalized.length
    ? normalized
    : fallback.length
    ? fallback
    : DEMO;

  const filtered = useMemo(() => {
    let arr = [...base];

    if (budgetBand !== "All") {
      const [min, max] = budgetBand.split("-").map((n) => Number(n) * 1000);
      arr = arr.filter(
        (t) =>
          t.totalPackage >= (min || 0) &&
          t.totalPackage <= (isNaN(max) ? 1e12 : max)
      );
    }
    if (sort === "Price: Low to High")
      arr.sort((a, b) => a.totalPackage - b.totalPackage);
    if (sort === "Price: High to Low")
      arr.sort((a, b) => b.totalPackage - a.totalPackage);

    return arr;
  }, [base, budgetBand, sort]);

  return (
    <div className={s.page}>
      <section className={s.hero}>
        <div className={s.heroInner}>
          <h1 className={s.h1}>
            {criteria?.to
              ? `Here’s Your Top Travel Pick to ${criteria.to}.`
              : "Here’s Your Top Travel Pick."}
          </h1>

          <div className={s.summaryBar}>
            <div className={s.chip}>
              <span className={s.chipLabel}>Budget</span>
              <span className={s.chipValue}>
                {criteria?.budget ? fmtMoney(criteria.budget) : "—"}
              </span>
            </div>

            <div className={s.chip}>
              <span className={s.chipLabel}>Passport Type</span>
              <span className={s.chipValue}>
                {(criteria?.passports?.length ? criteria.passports : []).join(
                  ", "
                ) || "—"}
              </span>
            </div>

            <div className={s.chip}>
              <span className={s.chipLabel}>Destination</span>
              <span className={s.chipValue}>
                {criteria?.city
                  ? `${criteria.city}, ${criteria.to || ""}`.trim()
                  : criteria?.to || "—"}
              </span>
            </div>

            <div className={s.chip}>
              <span className={s.chipLabel}>Date</span>
              <span className={s.chipValue}>{fmtDate(criteria?.date)}</span>
            </div>

            <button
              className={s.editBtn}
              onClick={() => navigate("/plan", { state: { criteria } })}
            >
              Edit Search
            </button>
          </div>
        </div>
      </section>

      <main className={s.container}>
        {filtered.length === 0 ? (
          <div style={{ maxWidth: 920, margin: "32px auto" }}>
            <h3>No trips found</h3>
            <p>Try a different destination or budget range.</p>
            <Link to="/plan">Back to planner</Link>
          </div>
        ) : (
          <div className={s.grid}>
            {filtered.map((t) => (
              <article key={t.id} className={s.card}>
                <div
                  className={s.thumb}
                  style={{ backgroundImage: `url(${t.img})` }}
                />

                <div className={s.cardBody}>
                  <div className={s.topRow}>
                    <div className={s.country}>
                      <span className={s.flag}>{countryFlag(t.country)}</span>
                      <span className={s.countryName}>
                        {t.country || t.city}
                      </span>
                    </div>
                    <div className={s.visa}>{t.visaStatus || "Visa-free"}</div>
                  </div>

                  <hr className={s.hr} />

                  <div className={s.details}>
                    <div className={s.item}>
                      <div className={s.icon} aria-hidden>
                        <FaPlane />
                      </div>
                      <div className={s.labelBlock}>
                        <div className={s.label}>Flight Estimate</div>
                        <div className={s.valueStrong}>
                          {fmt(t.flightEstimate)}
                        </div>
                      </div>
                    </div>

                    <div className={s.item}>
                      <div className={s.icon} aria-hidden>
                       < FaCalendarDays />
                      </div>
                      <div className={s.labelBlock}>
                        <div className={s.label}>Date</div>
                        <div className={s.valueEmph}>
                          {t.date || "Flexible"}
                        </div>
                      </div>
                    </div>

                    <div className={s.item}>
                      <div className={s.icon} aria-hidden>
                        <FaBed />
                      </div>
                      <div className={s.labelBlock}>
                        <div className={s.label}>Accomodation</div>
                        <div className={s.valueStrong}>
                          {fmt(t.accommodation)}
                        </div>
                      </div>
                    </div>

                    <div className={s.item}>
                      <div className={s.icon} aria-hidden>
                        <FaCartShopping />
                      </div>
                      <div className={s.labelBlock}>
                        <div className={s.label}>Total Package</div>
                        <div className={s.valueStrong}>
                          {fmt(t.totalPackage)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className={s.ctaFull}>View Details</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
