import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type { FormEvent, ReactNode } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Armchair,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Heart,
  Info,
  MapPin,
  Menu,
  Plus,
  RefreshCw,
  Scissors,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Utensils,
  Wheat,
  X,
} from "lucide-react";
import {
  businessTypes,
  calculateTransition,
  compactWon,
  formatDate,
  getMatches,
  neighborhoods,
  properties,
  requiredEquipment,
  won,
} from "./model";
import type {
  BusinessType,
  MatchPreferences,
  MatchResult,
  Property,
  TransitionInputs,
} from "./model";

const typeIcons = {
  Café: Coffee,
  Bakery: Wheat,
  Restaurant: Utensils,
  "Beauty salon": Scissors,
  "Retail shop": ShoppingBag,
};
const defaultPreferences: MatchPreferences = {
  type: "Café",
  budget: 50000000,
  location: "All Jeonju",
  date: "2027-03-01",
};

function Wordmark({ large = false }: { large?: boolean }) {
  return (
    <span
      className={`wordmark ${large ? "wordmark-large" : ""}`}
      aria-label="DASIRO"
    >
      DASIR<span className="wordmark-o">O</span>
      <span className="wordmark-detail" aria-hidden="true" />
    </span>
  );
}
function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}
function DemoNote({ children }: { children?: ReactNode }) {
  return (
    <p className="demo-note">
      <Info size={15} aria-hidden="true" />
      <span>
        {children ||
          "Fictional properties & illustrative photography. For demonstration only."}
      </span>
    </p>
  );
}
function Photo({
  src,
  alt,
  className = "",
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  // Public assets need the repository prefix on GitHub Pages, including srcSet.
  const source = `${import.meta.env.BASE_URL}${src.replace(/^\/+/, "")}`;
  return (
    <img
      className={className}
      src={source}
      srcSet={`${source.replace(".webp", "-small.webp")} 640w, ${source} 1400w`}
      sizes="(max-width: 680px) 100vw, (max-width: 1100px) 50vw, 750px"
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={(event) => {
        if (!event.currentTarget.src.endsWith("/assets/cafe.webp")) {
          event.currentTarget.srcset = "";
          event.currentTarget.src = `${import.meta.env.BASE_URL}assets/cafe.webp`;
        }
      }}
    />
  );
}
function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      viewport={{ once: true, margin: "0px 0px -35px 0px" }}
    >
      {children}
    </motion.div>
  );
}
function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  const id = useId();
  return (
    <div className="field">
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {isValidElement<{ id?: string }>(children)
        ? cloneElement(children, { id })
        : children}
      {hint && <span className="field-hint">{hint}</span>}
    </div>
  );
}
function TypePicker({
  value,
  onChange,
  compact = false,
}: {
  value: BusinessType;
  onChange: (v: BusinessType) => void;
  compact?: boolean;
}) {
  return (
    <div
      className={`type-picker ${compact ? "compact" : ""}`}
      role="group"
      aria-label="Desired business type"
    >
      {businessTypes.map((type) => {
        const Icon = typeIcons[type];
        return (
          <button
            key={type}
            type="button"
            aria-pressed={value === type}
            className={value === type ? "selected" : ""}
            onClick={() => onChange(type)}
          >
            <Icon size={compact ? 17 : 23} strokeWidth={1.4} />
            <span>{type}</span>
            {!compact && value === type && (
              <Check className="type-check" size={14} />
            )}
          </button>
        );
      })}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location]);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <>
      <div className="prototype-bar">
        Interactive Concept Prototype <span>—</span> Demo Data
      </div>
      <header className="site-header">
        <div className="nav-wrap">
          <Link to="/" className="brand-link">
            <Wordmark />
            <span className="korean brand-korean" lang="ko">
              다시로
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/explore">Explore Spaces</NavLink>
            <NavLink to="/match">Business Match</NavLink>
            <NavLink to="/how-it-works">How It Works</NavLink>
          </nav>
          <Link to="/transfer" className="button button-burgundy nav-cta">
            List Your Business <Plus size={16} />
          </Link>
          <button
            className="mobile-menu icon-button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            <NavLink to="/">Home</NavLink>
            <NavLink to="/explore">Explore Spaces</NavLink>
            <NavLink to="/match">Business Match</NavLink>
            <NavLink to="/how-it-works">How It Works</NavLink>
            <NavLink to="/transition">Transition Simulator</NavLink>
            <NavLink to="/transfer">List Your Business</NavLink>
          </nav>
        )}
      </header>
    </>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div>
          <Link to="/" className="footer-brand">
            <Wordmark />
            <span className="korean" lang="ko">
              다시로
            </span>
          </Link>
          <p>Every space has a next chapter.</p>
        </div>
        <div className="footer-links">
          <Link to="/explore">Explore Spaces</Link>
          <Link to="/match">Business Match</Link>
          <Link to="/transition">Transition Simulator</Link>
          <Link to="/transfer">Transfer My Business</Link>
        </div>
        <p className="footer-location">
          A new beginning,
          <br />
          rooted in Jeonju.
          <br />
          <span>Jeonju, South Korea</span>
        </p>
      </div>
      <div className="container footer-bottom">
        <p>
          DASIRO — A startup concept developed for the Global Inbound Start-up
          Idea Competition.
        </p>
        <p>
          Concept prototype. No real property transactions. DASIRO is not a
          licensed real-estate brokerage. Legal agreements, property transfers,
          and regulated brokerage activities require appropriate licensed
          professionals.
        </p>
        <span>
          © {new Date().getFullYear()} DASIRO. Illustrative demo content.
        </span>
      </div>
    </footer>
  );
}
function PropertyCard({
  property,
  index = 0,
}: {
  property: Property;
  index?: number;
}) {
  const [saved, setSaved] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("dasiro-saved") || "[]").includes(
        property.id,
      );
    } catch {
      return false;
    }
  });
  const toggle = () => {
    setSaved(!saved);
    try {
      const items: string[] = JSON.parse(
        localStorage.getItem("dasiro-saved") || "[]",
      );
      localStorage.setItem(
        "dasiro-saved",
        JSON.stringify(
          saved
            ? items.filter((id) => id !== property.id)
            : [...items, property.id],
        ),
      );
    } catch {
      /* session-only fallback */
    }
  };
  return (
    <article className="property-card">
      <div className="property-photo">
        <Link
          to={`/spaces/${property.id}`}
          aria-label={`View ${property.title}`}
        >
          <Photo
            src={property.image}
            alt={`Illustrative ${property.type.toLowerCase()} interior in ${property.neighborhood}`}
            eager={index < 3}
          />
        </Link>
        <span className="photo-label">{property.type}</span>
        <button
          type="button"
          className={`save-button ${saved ? "saved" : ""}`}
          aria-label={`${saved ? "Unsave" : "Save"} ${property.title}`}
          aria-pressed={saved}
          onClick={toggle}
        >
          <Heart size={18} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="property-meta">
        <span>
          <MapPin size={13} />
          {property.neighborhood}, Jeonju
        </span>
        <span>{property.size} m²</span>
      </div>
      <Link to={`/spaces/${property.id}`} className="property-title">
        {property.title}
      </Link>
      <div className="property-bottom">
        <span>
          <strong>{compactWon(property.rent)}</strong> / month
        </span>
        <span>{property.equipment.length} items to rethink</span>
      </div>
      <div className="property-status">
        <span>{property.status}</span>
        <span>Fictional listing</span>
      </div>
    </article>
  );
}

function Home() {
  const [previewType, setPreviewType] = useState<BusinessType>("Café");
  const preview = getMatches({ ...defaultPreferences, type: previewType })[0];
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <Eyebrow>Spaces with a past. Ideas with a future.</Eyebrow>
            <h1>
              Every space
              <br />
              has a <em>next</em>
              <br />
              <span className="hero-last">chapter.</span>
            </h1>
            <div className="hero-copy-bottom">
              <p>
                When one business closes, another possibility begins. DASIRO
                connects existing commercial spaces with entrepreneurs who can
                give them a new life.
              </p>
              <div className="hero-actions">
                <Link className="button button-burgundy" to="/explore">
                  Explore Spaces
                </Link>
                <Link className="text-link" to="/how-it-works">
                  See How It Works <Plus size={15} />
                </Link>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrap">
              <Photo
                src="/assets/cafe.webp"
                alt="Illustrative sunlit Korean neighborhood café with warm wood furniture and a ready-to-reimagine interior"
                eager
              />
              <div className="hero-photo-note">
                <span>A café today.</span>
                <span>Someone’s beginning tomorrow.</span>
              </div>
            </div>
            <div className="hero-caption">
              <span>THE NEXT CHAPTER STARTS IN JEONJU</span>
              <span className="korean" lang="ko">
                공간의 다음을 잇다
              </span>
            </div>
            <span className="hero-side-label">
              A SECOND LIFE FOR GOOD SPACES
            </span>
          </div>
        </div>
        <div className="container hero-foot">
          <span>Less starting over. More building on.</span>
          <span>Fictional spaces. Real possibilities to imagine.</span>
        </div>
      </section>
      <section className="intro-section container">
        <Eyebrow>A different way to begin</Eyebrow>
        <Reveal className="intro-grid">
          <h2>
            A closing door.
            <br />
            <em>An open possibility.</em>
          </h2>
          <div>
            <p className="intro-lead">
              The counter. The kitchen. The care put into every corner. A
              business may close, but its value doesn’t have to disappear.
            </p>
            <p>
              We bring the next entrepreneur into the picture earlier—so spaces,
              equipment, and ideas can move forward together.
            </p>
            <Link className="text-link" to="/how-it-works">
              Meet the idea behind DASIRO <Plus size={15} />
            </Link>
          </div>
        </Reveal>
        <div className="value-strip">
          <span>Reduce vacancy</span>
          <span>Preserve what matters</span>
          <span>Start with a head start</span>
        </div>
      </section>
      <section className="featured-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>Selected spaces · Jeonju</Eyebrow>
              <h2>
                Already a space.
                <br />
                <em>Not yet your story.</em>
              </h2>
            </div>
            <div className="section-heading-aside">
              <p>
                A coffee bar, a neighborhood kitchen,
                <br />a little shop. What could you make of it?
              </p>
              <Link to="/explore" className="text-link">
                View all spaces <Plus size={16} />
              </Link>
            </div>
          </div>
          <div className="featured-grid">
            {properties.slice(0, 3).map((property, index) => (
              <Reveal key={property.id}>
                <PropertyCard property={property} index={index} />
              </Reveal>
            ))}
          </div>
          <DemoNote />
        </div>
      </section>
      <section className="match-teaser">
        <div className="container teaser-grid">
          <div className="teaser-copy">
            <Eyebrow>A space that gets your idea</Eyebrow>
            <h2>
              Good things
              <br />
              happen with
              <br />
              <em>the right fit.</em>
            </h2>
            <p>
              More than square meters. Find a starting point that fits your
              business, your budget, and what comes next.
            </p>
            <Link
              className="button button-butter"
              to={`/match?type=${encodeURIComponent(previewType)}`}
            >
              Find My Business Match <Sparkles size={16} />
            </Link>
            <span className="small-note">
              A transparent, rules-based demo. No AI analysis.
            </span>
          </div>
          <div className="match-preview">
            <Eyebrow>What are you imagining?</Eyebrow>
            <TypePicker compact value={previewType} onChange={setPreviewType} />
            <div className="preview-result" key={preview.property.id}>
              <Photo
                src={preview.property.image}
                alt={`Illustrative ${preview.property.type} match preview`}
              />
              <div className="preview-result-text">
                <div className="preview-score">
                  <strong>
                    {preview.score}
                    <small>/100</small>
                  </strong>
                  <span>
                    Illustrative
                    <br />
                    compatibility
                  </span>
                </div>
                <span className="tiny-label">
                  {preview.property.neighborhood} · {preview.property.size} m²
                </span>
                <h3>{preview.property.title}</h3>
                <p>
                  <Check size={15} /> {preview.reusable.length} equipment items
                  with reuse potential
                </p>
              </div>
            </div>
            <p className="preview-footnote">
              Example preferences: ₩50M budget · Jeonju · March 2027
            </p>
          </div>
        </div>
      </section>
      <section className="home-process container">
        <div className="process-photo">
          <Photo
            src="/assets/restaurant.webp"
            alt="Illustrative dining space awaiting its next chapter"
          />
          <span className="image-caption">
            Some things are too good to start over.
          </span>
        </div>
        <div className="process-copy">
          <Eyebrow>One thoughtful handover</Eyebrow>
          <h2>
            Keep the good.
            <br />
            <em>Make it yours.</em>
          </h2>
          <div className="process-line">
            <span>Discover</span>
            <p>See the potential in an existing space.</p>
          </div>
          <div className="process-line">
            <span>Find your fit</span>
            <p>Explore compatibility, equipment, and timing.</p>
          </div>
          <div className="process-line">
            <span>Plan a transition</span>
            <p>Imagine a coordinated handover with expert support.</p>
          </div>
          <Link className="text-link" to="/transition">
            Try the Transition Simulator <Plus size={16} />
          </Link>
        </div>
      </section>
      <ClosingCTA />
    </>
  );
}
function ClosingCTA() {
  return (
    <section className="closing-cta">
      <div className="container">
        <Eyebrow>Your next chapter</Eyebrow>
        <h2>
          Something ends.
          <br />
          <em>Something begins.</em>
        </h2>
        <div>
          <p>
            Give an existing space a new possibility.
            <br />
            Or find the person who will.
          </p>
          <div className="cta-actions">
            <Link to="/explore" className="button button-butter">
              Find a Space
            </Link>
            <Link to="/transfer" className="button button-outline-light">
              Transfer My Business
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Explore() {
  const [search, setSearch] = useSearchParams();
  const type = search.get("type") || "All businesses";
  const [budget, setBudget] = useState("0");
  const [size, setSize] = useState("all");
  const [area, setArea] = useState("All Jeonju");
  const [sort, setSort] = useState("curated");
  const [savedOnly, setSavedOnly] = useState(false);
  const [revision, setRevision] = useState(0);
  const filtered = useMemo(() => {
    let saved: string[] = [];
    try {
      saved = JSON.parse(localStorage.getItem("dasiro-saved") || "[]");
    } catch {
      /* empty saved list */
    }
    const result = properties.filter(
      (p) =>
        (type === "All businesses" || p.type === type) &&
        (+budget === 0 || p.rent <= +budget) &&
        (size === "all" ||
          (size === "small"
            ? p.size < 60
            : size === "medium"
              ? p.size >= 60 && p.size <= 90
              : p.size > 90)) &&
        (area === "All Jeonju" || p.neighborhood === area) &&
        (!savedOnly || saved.includes(p.id)),
    );
    return sort === "rent"
      ? result.sort((a, b) => a.rent - b.rent)
      : sort === "size"
        ? result.sort((a, b) => b.size - a.size)
        : result;
  }, [type, budget, size, area, sort, savedOnly, revision]);
  const reset = () => {
    setSearch({});
    setBudget("0");
    setSize("all");
    setArea("All Jeonju");
    setSavedOnly(false);
  };
  return (
    <div className="container page-content">
      <div className="page-intro explore-intro">
        <div>
          <Eyebrow>Find your next beginning · Jeonju, South Korea</Eyebrow>
          <h1>
            Spaces with
            <br />
            <em>more to give.</em>
          </h1>
        </div>
        <p>
          Look beyond an empty address.
          <br />
          Discover what’s already here—and
          <br />
          imagine what could come next.
        </p>
      </div>
      <div
        className="business-tabs"
        role="group"
        aria-label="Filter by business type"
      >
        {["All businesses", ...businessTypes].map((item) => (
          <button
            className={type === item ? "active" : ""}
            key={item}
            aria-pressed={type === item}
            onClick={() =>
              setSearch(item === "All businesses" ? {} : { type: item })
            }
          >
            {item}
          </button>
        ))}
      </div>
      <div className="filter-bar">
        <span className="filter-label">
          <SlidersHorizontal size={17} /> Refine your search
        </span>
        <Field label="Monthly rent">
          <select value={budget} onChange={(e) => setBudget(e.target.value)}>
            <option value="0">Any budget</option>
            <option value="1000000">Up to ₩1M / month</option>
            <option value="1500000">Up to ₩1.5M / month</option>
            <option value="2000000">Up to ₩2M / month</option>
          </select>
        </Field>
        <Field label="Space size">
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="all">Any size</option>
            <option value="small">Under 60 m²</option>
            <option value="medium">60–90 m²</option>
            <option value="large">Over 90 m²</option>
          </select>
        </Field>
        <Field label="Neighborhood">
          <select value={area} onChange={(e) => setArea(e.target.value)}>
            {neighborhoods.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </Field>
        <button className="text-link reset-button" onClick={reset}>
          Reset <RefreshCw size={14} />
        </button>
      </div>
      <div className="results-toolbar">
        <p>
          <strong>{filtered.length}</strong> fictional{" "}
          {filtered.length === 1 ? "space" : "spaces"} to reimagine
        </p>
        <div>
          <button
            className={`saved-filter ${savedOnly ? "active" : ""}`}
            aria-pressed={savedOnly}
            onClick={() => {
              setSavedOnly(!savedOnly);
              setRevision(revision + 1);
            }}
          >
            <Heart size={15} /> Saved
          </button>
          <label className="sort-label">
            Sort by
            <select
              aria-label="Sort spaces"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="curated">Curated selection</option>
              <option value="rent">Lowest rent</option>
              <option value="size">Largest space</option>
            </select>
          </label>
        </div>
      </div>
      {filtered.length ? (
        <div className="listing-grid">
          {filtered.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Search size={32} />
          <h2>A different starting point?</h2>
          <p>
            No demo spaces match these filters. Try a wider search or save a
            space using its heart button.
          </p>
          <button className="button button-burgundy" onClick={reset}>
            Reset Filters
          </button>
        </div>
      )}
      <DemoNote>
        All 8 listings are fictional. Photos illustrate interior concepts, not
        actual available properties in Jeonju. Rent, deposits, equipment, and
        dates are mock data.
      </DemoNote>
      <div className="inline-prompt">
        <div>
          <Eyebrow>Need a little direction?</Eyebrow>
          <h2>Start with your idea.</h2>
        </div>
        <Link className="button button-burgundy" to="/match">
          Try Business Match <Sparkles size={16} />
        </Link>
      </div>
    </div>
  );
}

function Gallery({ property }: { property: Property }) {
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const gallery = property.gallery;
  const move = (direction: number) =>
    setIndex((value) => (value + direction + gallery.length) % gallery.length);
  return (
    <>
      <div className="detail-gallery">
        <button
          className="gallery-main"
          aria-label="Open photo gallery"
          onClick={() => dialogRef.current?.showModal()}
        >
          <Photo
            src={gallery[index]}
            alt={`Illustrative ${property.type.toLowerCase()} space, gallery photo ${index + 1}`}
            eager
          />
          <span className="gallery-open">
            View gallery <Plus size={15} />
          </span>
        </button>
        <div className="gallery-thumbnails">
          {gallery.map((src, i) => (
            <button
              key={src}
              className={i === index ? "selected" : ""}
              aria-label={`Show photo ${i + 1}`}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
            >
              <Photo src={src} alt={`Illustrative interior view ${i + 1}`} />
            </button>
          ))}
        </div>
      </div>
      <dialog
        className="gallery-dialog"
        ref={dialogRef}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
      >
        <div className="lightbox">
          <button
            className="lightbox-close icon-button"
            aria-label="Close gallery"
            onClick={() => dialogRef.current?.close()}
          >
            <X />
          </button>
          <Photo
            src={gallery[index]}
            alt={`Illustrative property photograph ${index + 1} of ${gallery.length}`}
            eager
          />
          <div className="lightbox-controls">
            <button
              className="icon-button"
              aria-label="Previous photo"
              onClick={() => move(-1)}
            >
              <ChevronLeft />
            </button>
            <span>
              {index + 1} / {gallery.length} · Illustrative demo photography
            </span>
            <button
              className="icon-button"
              aria-label="Next photo"
              onClick={() => move(1)}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
function PropertyDetail() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);
  if (!property) return <NotFound />;
  return (
    <div className="container page-content property-detail">
      <Link className="back-link" to="/explore">
        <ChevronLeft size={16} /> All Spaces
      </Link>
      <div className="detail-heading">
        <div>
          <Eyebrow>
            {property.type} · {property.neighborhood}, Jeonju
          </Eyebrow>
          <h1>{property.title}</h1>
        </div>
        <span className="tag">Fictional demo listing</span>
      </div>
      <Gallery key={id} property={property} />
      <DemoNote>
        Illustrative photographs, not images of a verified Jeonju listing.
        Gallery views show design references and may depict different spaces.
      </DemoNote>
      <div className="detail-body">
        <div className="detail-main">
          <section>
            <Eyebrow>The space, and what stays</Eyebrow>
            <h2>
              Some of the work
              <br />
              <em>is already here.</em>
            </h2>
            <p className="lead">{property.description}</p>
            <p>{property.detail}</p>
            <div className="amenity-list">
              {property.features.map((f) => (
                <span key={f}>
                  <Check size={16} />
                  {f}
                </span>
              ))}
            </div>
          </section>
          <section>
            <h3>Existing infrastructure & equipment</h3>
            <p>A starting point to assess, inspect, and make your own.</p>
            <div className="equipment-grid">
              {property.equipment.map((item) => (
                <div key={item}>
                  <Armchair size={18} />
                  <span>{item}</span>
                  <span className="equipment-state">Illustrative</span>
                </div>
              ))}
            </div>
            <p className="field-hint">
              Condition, ownership, transfer rights, maintenance, and compliance
              are unverified. No equipment is offered for sale.
            </p>
          </section>
          <section>
            <h3>What could come next?</h3>
            <div className="tags">
              {property.suitable.map((type) => (
                <Link
                  key={type}
                  to={`/match?type=${encodeURIComponent(type)}&property=${property.id}`}
                  className="tag"
                >
                  {type} <Plus size={13} />
                </Link>
              ))}
            </div>
            <p className="field-hint">
              Conceptual suitability only. A licensed professional must assess
              permitted use, building requirements, and business licensing.
            </p>
          </section>
          <section>
            <h3>An imagined transition</h3>
            <div className="timeline">
              <div>
                <span className="timeline-dot" />
                <strong>Discover & discuss</strong>
                <p>Review the space and the outgoing owner’s plan.</p>
              </div>
              <div>
                <span className="timeline-dot" />
                <strong>Inspect & coordinate</strong>
                <p>Arrange professional checks and agree a handover plan.</p>
              </div>
              <div>
                <span className="timeline-dot" />
                <strong>From {formatDate(property.available)}</strong>
                <p>
                  Illustrative availability. Allow additional preparation time.
                </p>
              </div>
            </div>
          </section>
        </div>
        <aside className="detail-sidebar">
          <Eyebrow>A possible starting point</Eyebrow>
          <div className="rent-display">
            {compactWon(property.rent)}
            <span>/ month</span>
          </div>
          <dl>
            <div>
              <dt>Deposit</dt>
              <dd>{won(property.deposit)}</dd>
            </div>
            <div>
              <dt>Floor area</dt>
              <dd>{property.size} m²</dd>
            </div>
            <div>
              <dt>Availability</dt>
              <dd>{formatDate(property.available)}</dd>
            </div>
            <div>
              <dt>Transition</dt>
              <dd>{property.status}</dd>
            </div>
          </dl>
          <Link
            className="button button-burgundy full-width"
            to={`/match?type=${encodeURIComponent(property.type)}&property=${property.id}`}
          >
            Find My Business Match <Sparkles size={16} />
          </Link>
          <Link className="text-link" to="/transition">
            Explore illustrative reuse benefits <Plus size={14} />
          </Link>
          <DemoNote>
            Hypothetical terms. No booking, transaction, or contact request is
            created.
          </DemoNote>
        </aside>
      </div>
      <section className="related-spaces">
        <div className="section-heading">
          <h2>Another possibility.</h2>
          <Link className="text-link" to="/explore">
            All spaces <Plus size={16} />
          </Link>
        </div>
        <div className="listing-grid">
          {properties
            .filter((p) => p.id !== id)
            .slice(0, 3)
            .map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
        </div>
      </section>
    </div>
  );
}

function MatchCard({
  result,
  featured,
  desiredType,
}: {
  result: MatchResult;
  featured: boolean;
  desiredType: BusinessType;
}) {
  const p = result.property;
  return (
    <article className={`match-result-card ${featured ? "top-match" : ""}`}>
      <div className="match-result-image">
        <Photo
          src={p.image}
          alt={`Illustrative ${p.type.toLowerCase()} in ${p.neighborhood}`}
          eager
        />
        <span className="photo-label">
          {featured ? "Your closest demo fit" : "Another possibility"}
        </span>
      </div>
      <div className="match-result-body">
        <div className="match-result-header">
          <div>
            <Eyebrow>
              {p.neighborhood} · {p.size} m² · {p.type}
            </Eyebrow>
            <h3>
              <Link to={`/spaces/${p.id}`}>{p.title}</Link>
            </h3>
          </div>
          <div
            className="score-circle"
            aria-label={`${result.score} out of 100 illustrative compatibility`}
          >
            <strong>{result.score}</strong>
            <span>/ 100</span>
          </div>
        </div>
        <p className="match-explanation">
          {p.type === desiredType
            ? `An existing ${desiredType.toLowerCase()} setup`
            : `A ${p.type.toLowerCase()} with a different future to explore`}
          , with {result.reusable.length} of{" "}
          {requiredEquipment[desiredType].length} assumed equipment needs
          already represented.
        </p>
        <div className="match-info-columns">
          <div>
            <span className="mini-heading">Potential to reuse</span>
            <p>
              {result.reusable.length
                ? result.reusable.join(" · ")
                : "No direct equipment overlap in this example."}
            </p>
          </div>
          <div>
            <span className="mini-heading">Plan to adapt</span>
            <p>
              {result.missing.length
                ? result.missing.join(" · ")
                : "Branding, finishes & equipment inspection."}
            </p>
          </div>
        </div>
        <div className="match-cost">
          <span>
            Illustrative setup budget{" "}
            <strong>{compactWon(result.upfront)}</strong>
          </span>
          <Link className="text-link" to={`/spaces/${p.id}`}>
            Explore this space <Plus size={15} />
          </Link>
        </div>
        <details className="score-details">
          <summary>
            Why this score? <ChevronDown size={15} />
          </summary>
          <div className="score-breakdown">
            {result.breakdown.map((b) => (
              <div key={b.label}>
                <div>
                  <strong>{b.label}</strong>
                  <span>
                    {b.points} / {b.max}
                  </span>
                </div>
                <div className="score-track">
                  <span style={{ width: `${(b.points / b.max) * 100}%` }} />
                </div>
                <p>{b.explanation}</p>
              </div>
            ))}
          </div>
          <p className="field-hint">
            Setup assumption = deposit + 2 months’ rent + ₩15M fit-out + up to
            ₩20M of missing equipment, scaled by equipment overlap. Excludes
            taxes, brokerage, key money, professional fees, and ongoing
            operating costs.
          </p>
        </details>
        <p className="match-disclaimer">
          Illustrative compatibility · Fictional listing · Rules-based, not AI
          analysis
        </p>
      </div>
    </article>
  );
}
function BusinessMatch() {
  const [search] = useSearchParams();
  const initialType =
    businessTypes.find((type) => type === search.get("type")) || "Café";
  const [preferences, setPreferences] = useState<MatchPreferences>({
    ...defaultPreferences,
    type: initialType,
  });
  const [submitted, setSubmitted] = useState<MatchPreferences | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const results = submitted ? getMatches(submitted) : [];
  const selectedProperty = properties.find(
    (p) => p.id === search.get("property"),
  );
  const selectedMatch =
    submitted && selectedProperty
      ? results.find((r) => r.property.id === selectedProperty.id)
      : null;
  const update = <K extends keyof MatchPreferences>(
    key: K,
    value: MatchPreferences[K],
  ) => setPreferences((prev) => ({ ...prev, [key]: value }));
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const openingDate = new FormData(e.currentTarget as HTMLFormElement).get(
      "openingDate",
    );
    setSubmitted({
      ...preferences,
      date: typeof openingDate === "string" ? openingDate : preferences.date,
    });
    requestAnimationFrame(() =>
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };
  return (
    <>
      <section className="match-page-intro">
        <div className="container">
          <Eyebrow>Business Match · An interactive demo</Eyebrow>
          <div>
            <h1>
              Your idea.
              <br />
              <em>Its next home.</em>
            </h1>
            <p>
              Tell us what you’re imagining.
              <br />
              Let’s find the spaces that could
              <br />
              help bring it to life.
            </p>
          </div>
        </div>
      </section>
      <div className="container match-workspace">
        <form onSubmit={submit} className="match-form">
          <div className="form-section">
            <div className="form-section-title">
              <span className="step-label">THE IDEA</span>
              <h2>What would you like to open?</h2>
            </div>
            <TypePicker
              value={preferences.type}
              onChange={(v) => update("type", v)}
            />
          </div>
          <div className="form-section">
            <div className="form-section-title">
              <span className="step-label">THE POSSIBILITIES</span>
              <h2>A few things to work with.</h2>
            </div>
            <div className="budget-control">
              <label htmlFor="match-budget">Approximate startup budget</label>
              <strong>{compactWon(preferences.budget)}</strong>
              <input
                id="match-budget"
                type="range"
                min="10000000"
                max="150000000"
                step="5000000"
                value={preferences.budget}
                onChange={(e) => update("budget", +e.target.value)}
              />
              <div>
                <span>₩10M</span>
                <span>₩150M</span>
              </div>
              <p className="field-hint">
                Total example starting budget, including deposit, preparation,
                and equipment.
              </p>
            </div>
            <div className="form-row">
              <Field label="Preferred location">
                <select
                  value={preferences.location}
                  onChange={(e) => update("location", e.target.value)}
                >
                  {neighborhoods.map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </Field>
              <Field label="Desired opening date">
                <input
                  required
                  type="date"
                  name="openingDate"
                  min="2026-11-20"
                  max="2030-12-31"
                  value={preferences.date}
                  onInput={(e) => update("date", e.currentTarget.value)}
                  onChange={(e) => update("date", e.target.value)}
                />
              </Field>
            </div>
          </div>
          <div className="match-form-bottom">
            <DemoNote>
              Illustrative scoring, not investment advice or a suitability
              assessment. No AI analysis is performed.
            </DemoNote>
            <button type="submit" className="button button-burgundy">
              {submitted ? "Update My Matches" : "Find My Business Match"}
              <Sparkles size={18} />
            </button>
          </div>
        </form>
        <aside className="match-editorial">
          <Photo
            src="/assets/shop.webp"
            alt="Illustrative warmly lit independent Korean retail space"
          />
          <blockquote>
            “Not just a space.
            <br />
            <em>A place to begin.”</em>
          </blockquote>
          <span className="korean" lang="ko">
            당신의 시작을 위한 공간
          </span>
          <details>
            <summary>
              How the demo works <Plus size={15} />
            </summary>
            <p>
              Every listing receives a score out of 100: business fit (30),
              equipment overlap (25), budget fit (25), location (10), and
              availability (10). Matching uses only these fictional records and
              your selections. The same inputs always return the same result.
            </p>
          </details>
        </aside>
      </div>
      <div
        className="container match-results"
        ref={resultRef}
        aria-live="polite"
      >
        {submitted && (
          <>
            <div className="section-heading">
              <div>
                <Eyebrow>For your {submitted.type.toLowerCase()} idea</Eyebrow>
                <h2>
                  A few places
                  <br />
                  <em>to start imagining.</em>
                </h2>
              </div>
              <p>
                {compactWon(submitted.budget)} budget · {submitted.location}
                <br />
                Opening {formatDate(submitted.date)}
              </p>
            </div>
            <DemoNote>
              Scores illustrate a simple rules-based fit. They do not verify
              property condition, legal suitability, feasibility, or real-world
              savings.
            </DemoNote>
            {selectedMatch && (
              <div className="selected-match-note">
                Your selected space:{" "}
                <strong>{selectedMatch.property.title}</strong> —{" "}
                {selectedMatch.score}/100 illustrative compatibility.
              </div>
            )}
            <div className="match-result-list">
              {results.slice(0, 3).map((result, index) => (
                <MatchCard
                  key={result.property.id}
                  result={result}
                  featured={index === 0}
                  desiredType={submitted.type}
                />
              ))}
            </div>
            <div className="inline-prompt">
              <div>
                <Eyebrow>Imagine the handover</Eyebrow>
                <h2>What could reuse change?</h2>
              </div>
              <Link className="button button-burgundy" to="/transition">
                Try the Transition Simulator
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}

const defaultTransition: TransitionInputs = {
  rent: 1200000,
  vacancyMonths: 3,
  renovation: 30000000,
  equipment: 22000000,
  reuse: 65,
  preparationWeeks: 10,
  handoverWeeks: 2,
};
function TransitionSimulator() {
  const [inputs, setInputs] = useState(defaultTransition);
  const calculation = calculateTransition(inputs);
  const update = (key: keyof TransitionInputs, value: number) =>
    setInputs((prev) => ({
      ...prev,
      [key]: Number.isFinite(value) ? Math.max(0, value) : 0,
    }));
  const rows = [
    [
      "Vacancy period",
      `${inputs.vacancyMonths} months`,
      `${inputs.handoverWeeks} weeks`,
    ],
    [
      "Vacancy cost",
      won(calculation.traditional.vacancy),
      won(calculation.coordinated.vacancy),
    ],
    ["Equipment reuse", "0% assumed", `${inputs.reuse}% assumed`],
    [
      "New equipment",
      won(calculation.traditional.equipment),
      won(calculation.coordinated.equipment),
    ],
    [
      "Renovation",
      won(calculation.traditional.renovation),
      won(calculation.coordinated.renovation),
    ],
    [
      "Preparation time",
      `${calculation.traditional.weeks} weeks`,
      `${calculation.coordinated.weeks} weeks`,
    ],
  ];
  return (
    <div className="container page-content">
      <div className="page-intro">
        <Eyebrow>Transition Simulator · Hypothetical estimates</Eyebrow>
        <h1>
          Less starting over.
          <br />
          <em>More moving forward.</em>
        </h1>
        <p>
          What changes when a space’s next chapter is planned before its last
          one ends? Adjust the assumptions and explore one imagined handover.
        </p>
      </div>
      <div className="transition-layout">
        <aside className="simulator-inputs">
          <div className="section-heading">
            <h2>Your example</h2>
            <button
              className="icon-button"
              aria-label="Reset simulator assumptions"
              onClick={() => setInputs(defaultTransition)}
            >
              <RefreshCw size={17} />
            </button>
          </div>
          <Field label="Monthly rent (KRW)">
            <input
              type="number"
              min="0"
              max="10000000"
              step="100000"
              value={inputs.rent}
              onChange={(e) =>
                update("rent", Math.min(10000000, +e.target.value))
              }
            />
          </Field>
          <Field label="Traditional vacancy (months)">
            <input
              type="number"
              min="0"
              max="24"
              value={inputs.vacancyMonths}
              onChange={(e) =>
                update("vacancyMonths", Math.min(24, +e.target.value))
              }
            />
          </Field>
          <Field label="Traditional renovation (KRW)">
            <input
              type="number"
              min="0"
              max="500000000"
              step="1000000"
              value={inputs.renovation}
              onChange={(e) =>
                update("renovation", Math.min(500000000, +e.target.value))
              }
            />
          </Field>
          <Field label="New equipment budget (KRW)">
            <input
              type="number"
              min="0"
              max="500000000"
              step="1000000"
              value={inputs.equipment}
              onChange={(e) =>
                update("equipment", Math.min(500000000, +e.target.value))
              }
            />
          </Field>
          <Field label="Traditional preparation (weeks)">
            <input
              type="number"
              min="1"
              max="52"
              value={inputs.preparationWeeks}
              onChange={(e) =>
                update(
                  "preparationWeeks",
                  Math.max(1, Math.min(52, +e.target.value)),
                )
              }
            />
          </Field>
          <Field label="Coordinated vacancy (weeks)">
            <input
              type="number"
              min="0"
              max="52"
              value={inputs.handoverWeeks}
              onChange={(e) =>
                update("handoverWeeks", Math.min(52, +e.target.value))
              }
            />
          </Field>
          <div className="reuse-range">
            <label htmlFor="reuse-range">
              Equipment reuse <strong>{inputs.reuse}%</strong>
            </label>
            <input
              id="reuse-range"
              type="range"
              min="0"
              max="100"
              step="5"
              value={inputs.reuse}
              onChange={(e) => update("reuse", +e.target.value)}
            />
          </div>
        </aside>
        <div className="comparison-panel" aria-live="polite">
          <div className="comparison-head">
            <div>
              <span>THE USUAL RESET</span>
              <h2>
                Traditional closure
                <br />& reopening
              </h2>
            </div>
            <div>
              <span>A DIFFERENT POSSIBILITY</span>
              <h2>
                A DASIRO
                <br />
                <em>coordinated transition</em>
              </h2>
            </div>
          </div>
          <div className="comparison-rows">
            {rows.map(([label, first, second]) => (
              <div className="comparison-row" key={label}>
                <span>{label}</span>
                <strong>{first}</strong>
                <strong>{second}</strong>
              </div>
            ))}
          </div>
          <div className="comparison-totals">
            <span>Illustrative total</span>
            <strong>{compactWon(calculation.traditionalTotal)}</strong>
            <strong>{compactWon(calculation.coordinatedTotal)}</strong>
          </div>
          <div className="difference-result">
            <span>
              {calculation.difference >= 0
                ? "Potential difference in this example"
                : "Additional cost in this example"}
            </span>
            <strong>{compactWon(Math.abs(calculation.difference))}</strong>
            <p>Hypothetical figures, not verified savings or a guarantee.</p>
          </div>
          <details className="calculation-details">
            <summary>
              See the calculation assumptions <ChevronDown size={17} />
            </summary>
            <p>
              Traditional total = vacancy months × monthly rent + full
              renovation + new equipment. Coordinated vacancy cost = vacancy
              weeks ÷ 4 × rent. Equipment cost = equipment budget × (1 − reuse
              %). Renovation = renovation budget × (1 − reuse % × 0.5).
              Preparation = traditional weeks × (1 − reuse % × 0.6), rounded up,
              and at least the coordinated vacancy weeks.
            </p>
            <p>
              These are editable assumptions. Vacancy losses relate to the
              property owner, while renovation and equipment relate to the
              incoming operator; the combined total is a system-wide
              illustration, not one person’s expense. Deposit, key money, taxes,
              legal and brokerage fees, transfer payments, repairs, and
              operating costs are excluded. Preparation may overlap vacancy.
              Four weeks per month is a simplification.
            </p>
          </details>
        </div>
      </div>
      <DemoNote>
        All financial figures are hypothetical estimates from simplified demo
        assumptions. Actual costs, equipment reuse, timing, and outcomes require
        independent professional assessment.
      </DemoNote>
    </div>
  );
}

interface TransferDraft {
  type: BusinessType;
  neighborhood: string;
  size: number;
  equipment: string[];
  date: string;
}
const defaultDraft: TransferDraft = {
  type: "Café",
  neighborhood: "Gaeksa",
  size: 68,
  equipment: ["Espresso machine", "Coffee grinder", "Refrigerator"],
  date: "2027-02-01",
};
function loadDraft(): TransferDraft {
  try {
    const raw = JSON.parse(sessionStorage.getItem("dasiro-transfer") || "null");
    if (
      raw &&
      businessTypes.includes(raw.type) &&
      neighborhoods.includes(raw.neighborhood) &&
      Number.isFinite(raw.size) &&
      Array.isArray(raw.equipment) &&
      /^\d{4}-\d{2}-\d{2}$/.test(raw.date)
    )
      return raw;
  } catch {
    /* use demo defaults */
  }
  return defaultDraft;
}
function Transfer() {
  const [draft, setDraft] = useState<TransferDraft>(loadDraft);
  const [step, setStep] = useState(1);
  const [saved, setSaved] = useState(false);
  const update = <K extends keyof TransferDraft>(
    key: K,
    value: TransferDraft[K],
  ) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };
  const equipment = Array.from(
    new Set([
      ...requiredEquipment[draft.type],
      ...draft.equipment,
      "Air conditioning",
      "Storage units",
      "Tables & seating",
    ]),
  );
  const advance = (e: FormEvent) => {
    e.preventDefault();
    if (step === 2) {
      const closingDate = new FormData(e.currentTarget as HTMLFormElement).get(
        "closingDate",
      );
      if (typeof closingDate === "string") update("date", closingDate);
    }
    setStep(Math.min(3, step + 1));
    window.scrollTo({ top: 160, behavior: "smooth" });
  };
  const save = () => {
    try {
      sessionStorage.setItem("dasiro-transfer", JSON.stringify(draft));
      setSaved(true);
    } catch {
      setSaved(false);
    }
  };
  return (
    <div className="container page-content transfer-page">
      <div className="page-intro">
        <Eyebrow>Transfer My Business · Confidential demo</Eyebrow>
        <h1>
          Your last chapter.
          <br />
          <em>Their first page.</em>
        </h1>
        <p>
          The care you’ve put into a place can carry on. Explore a confidential
          handover listing, without sharing an address or contact details.
        </p>
      </div>
      <div className="transfer-layout">
        <div className="transfer-main">
          <div className="step-progress" aria-label={`Step ${step} of 3`}>
            {["Your space", "What stays", "Your preview"].map((label, i) => (
              <button
                key={label}
                className={
                  step === i + 1 ? "active" : step > i + 1 ? "complete" : ""
                }
                disabled={i + 1 > step}
                onClick={() => setStep(i + 1)}
              >
                <span>{step > i + 1 ? <Check size={14} /> : i + 1}</span>
                {label}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {step < 3 ? (
                <form onSubmit={advance} className="transfer-form">
                  {step === 1 ? (
                    <>
                      <h2>Tell us about the space.</h2>
                      <p>Use fictional details to try the experience.</p>
                      <Field label="Current business type">
                        <select
                          value={draft.type}
                          onChange={(e) => {
                            update("type", e.target.value as BusinessType);
                            update("equipment", []);
                          }}
                        >
                          {businessTypes.map((type) => (
                            <option key={type}>{type}</option>
                          ))}
                        </select>
                      </Field>
                      <div className="form-row">
                        <Field label="Neighborhood in Jeonju">
                          <select
                            value={draft.neighborhood}
                            onChange={(e) =>
                              update("neighborhood", e.target.value)
                            }
                          >
                            {neighborhoods.slice(1).map((n) => (
                              <option key={n}>{n}</option>
                            ))}
                          </select>
                        </Field>
                        <Field label="Property size (m²)">
                          <input
                            required
                            type="number"
                            min="10"
                            max="1000"
                            value={draft.size || ""}
                            onChange={(e) => update("size", +e.target.value)}
                          />
                        </Field>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2>What could have a next life?</h2>
                      <p>
                        Select equipment you would consider including in a
                        handover.
                      </p>
                      <div className="equipment-checkboxes">
                        {equipment.map((item) => (
                          <label key={item}>
                            <input
                              type="checkbox"
                              checked={draft.equipment.includes(item)}
                              onChange={(e) =>
                                update(
                                  "equipment",
                                  e.target.checked
                                    ? [...draft.equipment, item]
                                    : draft.equipment.filter((v) => v !== item),
                                )
                              }
                            />
                            <span>{item}</span>
                          </label>
                        ))}
                      </div>
                      <Field
                        label="Planned closing date"
                        hint="A fictional planning date, not a commitment."
                      >
                        <input
                          required
                          type="date"
                          name="closingDate"
                          min="2026-11-20"
                          max="2030-12-31"
                          value={draft.date}
                          onInput={(e) => update("date", e.currentTarget.value)}
                          onChange={(e) => update("date", e.target.value)}
                        />
                      </Field>
                    </>
                  )}
                  <div className="transfer-actions">
                    {step === 2 && (
                      <button
                        type="button"
                        className="text-link"
                        onClick={() => setStep(1)}
                      >
                        <ChevronLeft size={15} /> Back
                      </button>
                    )}
                    <button type="submit" className="button button-burgundy">
                      {step === 1
                        ? "Continue to Equipment"
                        : "Preview My Listing"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="transfer-preview">
                  <span className="tag">
                    Private demo preview · Not published
                  </span>
                  <h2>
                    A {draft.type.toLowerCase()} with
                    <br />
                    <em>a next chapter.</em>
                  </h2>
                  <p>
                    <MapPin size={16} />
                    {draft.neighborhood}, Jeonju · {draft.size} m²
                  </p>
                  <dl>
                    <div>
                      <dt>Planned closing</dt>
                      <dd>{formatDate(draft.date)}</dd>
                    </div>
                    <div>
                      <dt>Location privacy</dt>
                      <dd>Exact address withheld</dd>
                    </div>
                  </dl>
                  <h3>Equipment to explore</h3>
                  <div className="tags">
                    {draft.equipment.length ? (
                      draft.equipment.map((item) => (
                        <span className="tag" key={item}>
                          {item}
                        </span>
                      ))
                    ) : (
                      <p>No equipment selected.</p>
                    )}
                  </div>
                  <DemoNote>
                    This is a local preview. No owner details, address, or
                    listing have been submitted, published, or shared.
                  </DemoNote>
                  <div className="transfer-actions">
                    <button className="text-link" onClick={() => setStep(1)}>
                      Edit Details <Plus size={14} />
                    </button>
                    <button className="button button-burgundy" onClick={save}>
                      {saved ? (
                        <>
                          <Check size={16} /> Saved in This Browser Tab
                        </>
                      ) : (
                        "Save Demo Draft"
                      )}
                    </button>
                  </div>
                  {saved && (
                    <p className="saved-message" role="status">
                      Your draft is stored only in this browser tab’s session.
                      No server received any information.
                    </p>
                  )}
                  <button
                    className="text-link start-over"
                    onClick={() => {
                      sessionStorage.removeItem("dasiro-transfer");
                      setDraft(defaultDraft);
                      setStep(1);
                      setSaved(false);
                    }}
                  >
                    Start a New Demo <RefreshCw size={14} />
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <aside className="transfer-aside">
          <Photo
            src="/assets/coffee.webp"
            alt="Illustrative coffee bar with existing equipment"
          />
          <Eyebrow>Built with care. Carried forward.</Eyebrow>
          <h2>
            A good ending
            <br />
            can be a <br />
            <em>good beginning.</em>
          </h2>
          <p>
            This prototype explores how owners might plan a handover privately,
            before a space becomes vacant.
          </p>
          <DemoNote>
            Demo only. No public listing, transaction, or real contact request
            is created.
          </DemoNote>
        </aside>
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      title: "See what’s already possible.",
      copy: "Discover an existing business space, its layout, equipment, and the outgoing owner’s planned timing. Start with potential rather than a blank shell.",
      link: "/explore",
      action: "Explore the demo spaces",
      photo: "/assets/cafe.webp",
      label: "DISCOVER THE SPACE",
    },
    {
      title: "Bring your idea into the picture.",
      copy: "Choose a business type, budget, neighborhood, and opening date. Our transparent demo shows equipment overlap and a simple compatibility breakdown.",
      link: "/match",
      action: "Try Business Match",
      photo: "/assets/shop.webp",
      label: "FIND THE FIT",
    },
    {
      title: "Imagine a thoughtful handover.",
      copy: "Explore how reuse and coordinated timing could change a transition. Real handovers would require inspections, landlord agreement, legal advice, and appropriate licensed professionals.",
      link: "/transition",
      action: "Try the Transition Simulator",
      photo: "/assets/restaurant.webp",
      label: "PLAN WHAT COMES NEXT",
    },
  ];
  return (
    <>
      <div className="container page-content how-page">
        <div className="page-intro">
          <Eyebrow>The idea behind DASIRO</Eyebrow>
          <h1>
            A space doesn’t have
            <br />
            to start <em>from zero.</em>
          </h1>
          <p>
            DASIRO connects a business’s ending with an entrepreneur’s
            beginning—before the space between them becomes vacant.
          </p>
        </div>
        {steps.map((step, i) => (
          <Reveal
            className={`how-step ${i % 2 ? "reverse" : ""}`}
            key={step.label}
          >
            <Photo
              src={step.photo}
              alt={`Illustrative commercial interior: ${step.label.toLowerCase()}`}
            />
            <div>
              <Eyebrow>{step.label}</Eyebrow>
              <h2>{step.title}</h2>
              <p>{step.copy}</p>
              <Link className="text-link" to={step.link}>
                {step.action} <Plus size={15} />
              </Link>
            </div>
          </Reveal>
        ))}
        <section className="principles">
          <Eyebrow>What stays at the heart of it</Eyebrow>
          <h2>
            Less waste.
            <br />
            More continuity.
            <br />
            <em>A better place to begin.</em>
          </h2>
          <p>
            This university startup concept is a conversation about preserving
            value. All spaces, availability dates, financial figures, and match
            scores are illustrative. DASIRO is not a licensed brokerage and does
            not facilitate real transactions.
          </p>
        </section>
      </div>
      <ClosingCTA />
    </>
  );
}
function NotFound() {
  return (
    <div className="container not-found">
      <Eyebrow>A page between chapters</Eyebrow>
      <h1>
        Let’s find
        <br />
        <em>your way back.</em>
      </h1>
      <p>This demo page doesn’t exist. There are still spaces to explore.</p>
      <Link className="button button-burgundy" to="/explore">
        Explore Spaces
      </Link>
    </div>
  );
}
function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const titles: Record<string, string> = {
      "/": "Every space has a next chapter.",
      "/explore": "Explore Spaces",
      "/match": "Business Match",
      "/transition": "Transition Simulator",
      "/transfer": "Transfer My Business",
      "/how-it-works": "How It Works",
    };
    const property = properties.find((p) => pathname === `/spaces/${p.id}`);
    document.title = `DASIRO (다시로) — ${property?.title || titles[pathname] || "A next chapter"}`;
  }, [pathname]);
  return null;
}
export default function App() {
  return (
    <>
      <a
        href="#main"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          const main = document.getElementById("main");
          main?.focus();
          main?.scrollIntoView();
        }}
      >
        Skip to content
      </a>
      <RouteEffects />
      <Header />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/spaces/:id" element={<PropertyDetail />} />
          <Route path="/match" element={<BusinessMatch />} />
          <Route path="/transition" element={<TransitionSimulator />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
