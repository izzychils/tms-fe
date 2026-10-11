import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Circle,
  ClipboardList,
  Clock,
  FileText,
  LayoutGrid,
  ListChecks,
  Menu,
  MessageSquare,
  Shield,
  TrendingUp,
  UserPlus,
  Users,
  X,
  Zap,
} from 'lucide-react';
import ServicesCarousel, { type Service } from '../components/ui/ServicesCarousel';
import StaggerTestimonials, { type Testimonial } from '../components/ui/StaggerTestimonials';
import './Landing.css';

/* ------------------------------------------------------------------ data */

const NAV_MENUS: Array<{
  label: string;
  items: Array<{ label: string; desc: string; href: string }>;
}> = [
  {
    label: 'Product',
    items: [
      { label: 'Onboarding checklists', desc: 'Template-driven first weeks', href: '#showcase' },
      { label: 'Task boards', desc: 'One board for the whole team', href: '#showcase' },
      { label: 'Reports & analytics', desc: 'Live completion insight', href: '#showcase' },
      { label: 'Automations', desc: 'Reminders that chase people, not you', href: '#features' },
    ],
  },
  {
    label: 'Solutions',
    items: [
      { label: 'For HR teams', desc: 'Run 5 or 500 hires a year', href: '#features' },
      { label: 'For managers', desc: 'See progress without asking', href: '#features' },
      { label: 'For IT & Ops', desc: 'Accounts and gear, on time', href: '#features' },
      { label: 'For startups', desc: 'Structure without the bureaucracy', href: '#how-it-works' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { label: 'Template library', desc: 'Steal our first-week plans', href: '#how-it-works' },
      { label: 'Help centre', desc: 'Guides and best practices', href: '#testimonials' },
      { label: 'Customer stories', desc: 'How teams ramp faster', href: '#testimonials' },
      { label: 'Changelog', desc: 'What shipped this month', href: '#showcase' },
    ],
  },
];

const USE_CASES = [
  {
    id: 'checklists',
    icon: ListChecks,
    title: 'Onboarding checklists',
    description:
      'Give every new hire the same great first week. Duplicate a template, pick a start date, and Onboad schedules each task with an owner and a due date, automatically.',
  },
  {
    id: 'boards',
    icon: LayoutGrid,
    title: 'Task boards',
    description:
      'One shared board for HR, the manager, IT and the new hire. Drag a card and everyone sees it move: no status meeting required.',
  },
  {
    id: 'reports',
    icon: BarChart3,
    title: 'Reports & analytics',
    description:
      'Live completion rates, time-to-productivity and bottleneck reports. Export to CSV or pipe the numbers into the BI stack you already use.',
  },
] as const;

type UseCaseId = (typeof USE_CASES)[number]['id'];

const CHECKLIST_GROUPS = [
  {
    label: 'Before day 1',
    tasks: [
      { title: 'Sign contract & tax forms', owner: 'HR', done: true },
      { title: 'Order laptop + accessories', owner: 'IT', done: true },
      { title: 'Create email & SSO accounts', owner: 'IT', done: false },
    ],
  },
  {
    label: 'Week 1',
    tasks: [
      { title: 'Meet your onboarding buddy', owner: 'Manager', done: true },
      { title: 'Finish security training', owner: 'New hire', done: false },
      { title: 'Ship a small first change', owner: 'New hire', done: false },
    ],
  },
];

const BOARD_COLUMNS = [
  {
    title: 'To do',
    cards: [
      { title: 'Create email & SSO accounts', tag: 'IT', due: 'Mon' },
      { title: 'Security training', tag: 'Compliance', due: 'Wed' },
    ],
  },
  {
    title: 'In progress',
    cards: [
      { title: 'Meet your onboarding buddy', tag: 'Manager', due: 'Today' },
      { title: 'Read the product handbook', tag: 'Self-paced', due: 'Fri' },
    ],
  },
  {
    title: 'Done',
    cards: [
      { title: 'Sign contract & tax forms', tag: 'HR', due: 'Done' },
      { title: 'Order laptop + accessories', tag: 'IT', due: 'Done' },
    ],
  },
];

const STATS = [
  { value: '1k+', label: 'Employees onboarded' },
  { value: '95%', label: 'Average task completion' },
  { value: '60%', label: 'Less admin time per hire' },
  { value: '200+', label: 'Companies run on Onboad' },
];

const CHAOS_BADGES = [
  { text: '41% of tasks overdue', className: 'badge-a' },
  { text: '3 weeks to ramp up', className: 'badge-b' },
  { text: '6 tools to chase', className: 'badge-c' },
  { text: '100+ onboarding emails', className: 'badge-d' },
  { text: 'handbook_v3_FINAL.pdf', className: 'badge-e' },
];

const CHAOS_STATS = [
  { stat: '3+ days', text: 'before a new hire gets their first real task' },
  { stat: '6 tools', text: 'spreadsheets, chat, email and three HR tabs' },
  { stat: '6 hrs/week', text: 'managers spend chasing status updates' },
];

const IMAGINE_CHIPS = [
  'Tasks',
  'Checklists',
  'Templates',
  'Reports',
  'Reminders',
  'Buddies',
];

const SERVICES: Service[] = [
  {
    number: '001',
    icon: LayoutGrid,
    tone: 'slate',
    title: 'Task boards & lists',
    description:
      'Kanban boards for managers, a simple checklist for new hires. Everyone sees the same truth, filtered to exactly what they own.',
  },
  {
    number: '002',
    icon: Zap,
    tone: 'amber',
    title: 'Automated workflows',
    description:
      'Finish a task and the next one unlocks with its owner and due date already set. Offboarding works the same way, in reverse.',
  },
  {
    number: '003',
    icon: Bell,
    tone: 'sky',
    title: 'Smart reminders',
    description:
      'Polite nudges in email or Slack before a due date slips. Escalate to the manager automatically when something is really stuck.',
  },
  {
    number: '004',
    icon: ClipboardList,
    tone: 'lilac',
    title: 'Role-based templates',
    description:
      'Engineers, sales reps and support agents get different first weeks. Build a template once, reuse it for every future hire.',
  },
  {
    number: '005',
    icon: BarChart3,
    tone: 'mint',
    title: 'Progress reports',
    description:
      'Completion rates, ramp-up time and bottlenecks per team: live, exportable, and readable without a data analyst.',
  },
  {
    number: '006',
    icon: Shield,
    tone: 'rose',
    title: 'Security & permissions',
    description:
      'SSO, role-based access and audit trails. New-hire paperwork stays visible only to the people who actually need it.',
  },
];

const PAIN_POINTS = [
  {
    icon: ClipboardList,
    title: "You're stuck in spreadsheets",
    description:
      'Onboarding trackers multiply until nobody knows which tab is the truth, and every new hire gets a slightly different first week.',
  },
  {
    icon: MessageSquare,
    title: 'Status lives in chat threads',
    description:
      '"Where is Daniel with his IT setup?" burns manager hours that should go to actual mentoring and real work.',
  },
  {
    icon: FileText,
    title: 'Reports are built by hand',
    description:
      'Month-end summaries mean copy-pasting cells into slides instead of helping new people settle in and contribute.',
  },
];

const STEPS = [
  {
    icon: FileText,
    title: 'Create your workflow',
    description:
      'Start from a template or build your own. Group tasks by day, week or milestone, and set owners and due dates in minutes.',
  },
  {
    icon: Users,
    title: 'Invite your team',
    description:
      'Add the new hire, their manager, buddies and IT. Each person only sees the tasks they are responsible for: nothing more.',
  },
  {
    icon: TrendingUp,
    title: 'Track progress',
    description:
      'Watch completion live on your dashboard, spot blockers early, and give leadership a real answer when they ask how it is going.',
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'We cut ramp-up time from three weeks to nine days. Managers finally see progress without having to ask for it every morning.',
    name: 'Amara Okafor',
    role: 'Head of People, Northwind',
  },
  {
    quote:
      'The templates alone paid for the first year. Every new engineer now gets the same clean first week, with zero reminders from me.',
    name: 'Daniel Kim',
    role: 'Engineering Manager, Lumen Labs',
  },
  {
    quote:
      'Our remote team stopped losing new hires in Slack. Onboad gives every task an owner, a date and a reminder, so nobody falls through.',
    name: 'Sofia Alvarez',
    role: 'COO, Kana Studio',
  },
  {
    quote:
      'Handover between HR and IT used to happen in a group chat. Now the handover is the board, so nobody has to ask twice.',
    name: 'Priya Raman',
    role: 'Head of Talent, Vertex',
  },
  {
    quote:
      'Ninety new hires in a single week with Onboad, and every one of them had a laptop and a buddy on day one. We have never been this calm.',
    name: 'Marcus Bell',
    role: 'IT Operations Lead, MecurixTech',
  },
];

interface FooterLink {
  label: string;
  href?: string;
  to?: string;
}

const FOOTER_COLUMNS: Array<{ title: string; links: FooterLink[] }> = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Task boards', href: '#showcase' },
      { label: 'Automations', href: '#features' },
      { label: 'Reports', href: '#showcase' },
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'Pricing', href: '#features' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', to: '/about' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help centre', href: '#testimonials' },
      { label: 'Template library', href: '#how-it-works' },
      { label: 'Customer stories', href: '#testimonials' },
      { label: 'Changelog', href: '#showcase' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', to: '/privacy' },
      { label: 'Terms of use', to: '/terms' },
      { label: 'Terms and conditions', to: '/terms-and-conditions' },
    ],
  },
];

/* ------------------------------------------------------------- fragments */

const CursorTag: React.FC<{
  name: string;
  className: string;
}> = ({ name, className }) => (
  <div className={`cursor-tag ${className}`}>
    <svg viewBox="0 0 16 16" className="cursor-arrow" aria-hidden>
      <path d="M2 1l12 6.5-5.4 1.4L6.6 14 2 1z" fill="currentColor" />
    </svg>
    <span>{name}</span>
  </div>
);

/* ------------------------------------------------------------ nav dropdown
   Rendered inline (not in a portal) so the landing page's glass styles and
   CSS variables apply. Opens on hover for pointer users and on click for
   keyboard/touch, with a small grace period so the pointer can travel down
   into the panel.                                                          */

const NavMenu: React.FC<{ menu: (typeof NAV_MENUS)[number] }> = ({ menu }) => {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const cancelClose = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openNow = () => {
    cancelClose();
    setOpen(true);
  };

  const closeSoon = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), 160);
  };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  useEffect(() => cancelClose, []);

  return (
    <div
      className="nav-menu"
      ref={wrapRef}
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
    >
      <button
        type="button"
        className="nav-pill"
        aria-haspopup="true"
        aria-expanded={open}
        /* Pointer devices already opened the panel on hover: a click must not
           immediately toggle it shut again. Touch/keyboard can still toggle. */
        onPointerDown={(event) => {
          if (event.pointerType === 'mouse') return;
          setOpen((isOpen) => !isOpen);
        }}
        onClick={openNow}
      >
        {menu.label}
        <ChevronDown size={15} className="nav-pill-caret" />
      </button>

      {/* The panel is visible in its resting state and only slides in via CSS,
          so a stalled animation can never leave the menu unusable. */}
      {open && (
        <div className="nav-dropdown">
          {menu.items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-dropdown-link"
              onClick={() => setOpen(false)}
            >
              <span className="nav-dropdown-label">{item.label}</span>
              <span className="nav-dropdown-desc">{item.desc}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

/* ---------------------------------------------------------------- landing */

const Landing: React.FC = () => {
  const [activeCase, setActiveCase] = useState<UseCaseId>('checklists');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const close = () => setMobileOpen(false);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('hashchange', close);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('hashchange', close);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <div className="landing-page">
      {/* Soft backdrop */}
      <div className="lp-backdrop" aria-hidden>
        <div className="lp-blob lp-blob-a"></div>
        <div className="lp-blob lp-blob-b"></div>
        <div className="lp-blob lp-blob-c"></div>
        <div className="lp-grid"></div>
      </div>          {/* Navigation: glass bar, Miro layout */}
      <nav className="lp-nav">
        <div className="lp-nav-inner">
          <Link to="/" className="lp-logo">
            <img src="/logo.jpg" alt="Onboad" className="lp-logo-image" />
            <span>Onboad</span>
          </Link>

          <div className="lp-nav-center">
            {NAV_MENUS.map((menu) => (
              <NavMenu key={menu.label} menu={menu} />
            ))}
            <a href="#showcase" className="nav-pill">
              Enterprise
            </a>
            <a href="#features" className="nav-pill">
              Pricing
            </a>
          </div>

          <div className="lp-nav-right">
            <Link to="/signup" className="nav-cta">
              Get started free
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mobile menu: glass panel */}
          <div className="lp-mobile-menu">
            <button
              type="button"
              className="mobile-menu-btn-glass"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {mobileOpen && (
              <>
                <div
                  className="mobile-menu-backdrop"
                  onClick={() => setMobileOpen(false)}
                  aria-hidden
                />
                <div className="mobile-glass-panel">
                  <div className="mobile-panel-clean">
                    <a
                      href="#showcase"
                      className="mobile-clean-link"
                      onClick={() => setMobileOpen(false)}
                    >
                      Product
                    </a>
                    <a
                      href="#features"
                      className="mobile-clean-link"
                      onClick={() => setMobileOpen(false)}
                    >
                      Solutions
                    </a>
                    <a
                      href="#how-it-works"
                      className="mobile-clean-link"
                      onClick={() => setMobileOpen(false)}
                    >
                      Resources
                    </a>
                    <a
                      href="#showcase"
                      className="mobile-clean-link"
                      onClick={() => setMobileOpen(false)}
                    >
                      Enterprise
                    </a>
                    <a
                      href="#features"
                      className="mobile-clean-link"
                      onClick={() => setMobileOpen(false)}
                    >
                      Pricing
                    </a>
                  </div>

                  <div className="mobile-menu-cta">
                    <Link
                      to="/signup"
                      className="mobile-btn-primary"
                      onClick={() => setMobileOpen(false)}
                    >
                      <UserPlus size={16} />
                      Get started free
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>          {/* Hero: inspo 3 layout, black instead of blue */}
      <header className="lp-hero">
        <div className="lp-hero-inner">
          <motion.h1
            className="lp-hero-title"
            initial={{ y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Where new hires
            <br />
            get real work done
          </motion.h1>

          <motion.p
            className="lp-hero-sub"
            initial={{ y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            Onboad is the task management platform that turns employee onboarding into clear,
            trackable work. Every new hire knows exactly what to do today, and you always know
            where they stand.
          </motion.p>

          <motion.div
            className="lp-hero-actions"
            initial={{ y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
          >
            <Link to="/signup" className="btn-ink">
              Start onboarding free
              <ArrowRight size={19} />
            </Link>
            <a href="#showcase" className="btn-glass">
              See the product tour
            </a>
          </motion.div>

          <motion.p
            className="lp-hero-note"
            initial={{ y: 8 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.34 }}
          >
            Free 14-day trial · Unlimited tasks · No credit card required
          </motion.p>

          {/* Floating decor. Decorative only on desktop (absolute, in the side
              margins); on mobile the CSS lets it flow below the copy so the
              chips stay visible without ever covering the headline. */}
          <div className="hero-decor" aria-hidden>
            <CursorTag name="Amara · HR" className="tag-amara" />
            <CursorTag name="Tobi · Manager" className="tag-tobi" />
            <CursorTag name="Elena · Mentor" className="tag-elena" />
            <CursorTag name="Sam · Day 1" className="tag-sam" />
            <div className="sticky-note">
              <span className="sticky-note-title">Day 1 plan</span>
              <span className="sticky-note-line">✓ Laptop ready</span>
              <span className="sticky-note-line">✓ Buddy assigned</span>
              <span className="sticky-note-line">→ First task shipped</span>
            </div>
            <svg className="hero-squiggle" viewBox="0 0 220 90" fill="none">
              <path
                d="M4 70c34-58 62 22 96-18s58 34 112-38"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <span className="hero-block"></span>
          </div>
        </div>
      </header>          {/* Product showcase: Miro-style window with use-case list */}
      <section id="showcase" className="showcase-section">
        <motion.div
          className="showcase-window"
          initial={{ y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="showcase-app">
            <aside className="app-sidebar">
              <div className="app-sidebar-brand">
                <img src="/logo.jpg" alt="" className="app-sidebar-logo" />
                <span>Onboad</span>
              </div>
              <nav className="app-sidebar-nav">
                <span className="app-side-item">
                  <LayoutGrid size={15} /> Workspace
                </span>
                <span className="app-side-item">
                  <Users size={15} /> People
                </span>
                <span className="app-side-item">
                  <CalendarDays size={15} /> Calendar
                </span>
                <span className="app-side-item">
                  <Bell size={15} /> Notifications
                  <em className="app-side-badge">3</em>
                </span>
              </nav>
              <div className="app-sidebar-foot">
                <div className="app-progress-label">
                  <span>Q3 cohort</span>
                  <strong>68%</strong>
                </div>
                <div className="app-progress-track">
                  <span style={{ width: '68%' }}></span>
                </div>
              </div>
            </aside>

            <div className="app-main">
              <div className="app-topbar">
                <div>
                  <h3>Engineering cohort · Sept 15</h3>
                  <p>12 people · 48 tasks · 6 owners</p>
                </div>
                <div className="app-topbar-people" aria-hidden>
                  <span className="avatar av-a">AO</span>
                  <span className="avatar av-b">DK</span>
                  <span className="avatar av-c">SA</span>
                  <span className="avatar av-more">+9</span>
                </div>
              </div>

              {activeCase === 'checklists' && (
                <div className="app-checklist">
                  {CHECKLIST_GROUPS.map((group) => (
                    <div key={group.label} className="checklist-group">
                      <h4>{group.label}</h4>
                      {group.tasks.map((task) => (
                        <div key={task.title} className={`checklist-row ${task.done ? 'is-done' : ''}`}>
                          <span className="checklist-check">
                            {task.done ? <CheckCircle2 size={17} /> : <Circle size={17} />}
                          </span>
                          <span className="checklist-title">{task.title}</span>
                          <span className="checklist-owner">{task.owner}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {activeCase === 'boards' && (
                <div className="app-board">
                  {BOARD_COLUMNS.map((column) => (
                    <div key={column.title} className="board-col">
                      <div className="board-col-head">
                        <span>{column.title}</span>
                        <em>{column.cards.length}</em>
                      </div>
                      {column.cards.map((card) => (
                        <div key={card.title} className="board-card">
                          <p>{card.title}</p>
                          <div className="board-card-meta">
                            <span className="board-tag">{card.tag}</span>
                            <span className="board-due">
                              <Clock size={12} /> {card.due}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {activeCase === 'reports' && (
                <div className="app-reports">
                  <div className="report-chart">
                    {[
                      { label: 'W1', h: 45 },
                      { label: 'W2', h: 62 },
                      { label: 'W3', h: 74 },
                      { label: 'W4', h: 88 },
                      { label: 'W5', h: 96 },
                    ].map((bar) => (
                      <div key={bar.label} className="report-bar-wrap">
                        <div className="report-bar" style={{ height: `${bar.h}%` }}></div>
                        <span>{bar.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="report-side">
                    <div className="report-kpi">
                      <strong>95%</strong>
                      <span>Tasks completed on time</span>
                    </div>
                    <div className="report-kpi">
                      <strong>9 days</strong>
                      <span>Average time to productivity</span>
                    </div>
                    <div className="report-kpi">
                      <strong>2</strong>
                      <span>Blockers currently open</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="showcase-cases">
            {USE_CASES.map((useCase) => {
              const Icon = useCase.icon;
              const active = activeCase === useCase.id;
              return (
                <button
                  key={useCase.id}
                  className={`case-item ${active ? 'is-active' : ''}`}
                  onClick={() => setActiveCase(useCase.id)}
                  type="button"
                >
                  <span className="case-head">
                    <Icon size={18} />
                    {useCase.title}
                  </span>
                  {active && <p>{useCase.description}</p>}
                </button>
              );
            })}
            <a href="#features" className="case-link">
              Explore all features
              <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>

        {/* Stats strip */}
        <div className="stats-strip">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-cell"
              initial={{ y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trusted by */}
      <section className="logos-section">
        <p className="logos-title">Trusted by</p>
        <div className="logos-row">
          <span>MecurixTech</span>
          <span>Rekraft</span>
          <span>Iventverse</span>
          <span>Schoolpaddi</span>
          <span>Nextra</span>
        </div>
      </section>

      {/* Chaos section: inspo 1 */}
      <section className="chaos-section">
        <div className="chaos-inner">
          <div className="chaos-decor" aria-hidden>
            {CHAOS_BADGES.map((badge) => (
              <span key={badge.text} className={`chaos-badge ${badge.className}`}>
                {badge.text}
              </span>
            ))}
          </div>

          <motion.h2
            className="chaos-title"
            initial={{ y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The current way we
            <br />
            onboard is chaotic.
          </motion.h2>

          <div className="chaos-stats">
            {CHAOS_STATS.map((item, index) => (
              <motion.div
                key={item.stat}
                initial={{ y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
              >
                <strong>{item.stat}</strong>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.h2
            className="chaos-fix-title"
            initial={{ y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Onboad fixes all
            <br />
            of that.
          </motion.h2>
        </div>
      </section>

      {/* Imagine section: inline chips with glass hover animation */}
      <section className="imagine-section">
        <motion.p
          className="imagine-text"
          initial={{ y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Imagine all of your{' '}
          {IMAGINE_CHIPS.slice(0, 3).map((chip) => (
            <span key={chip} className="imagine-chip">
              {chip}
            </span>
          ))}{' '}
          and{' '}
          {IMAGINE_CHIPS.slice(3).map((chip) => (
            <span key={chip} className="imagine-chip">
              {chip}
            </span>
          ))}{' '}
          in one connected place.
        </motion.p>
        <div className="imagine-cta">
          <Link to="/signup" className="btn-ink">
            Get started: it is free
            <ArrowRight size={18} />
          </Link>
          <span className="imagine-note">No credit card required</span>
        </div>
      </section>

      {/* Features: inspo 4 value list, with the numbered card carousel */}
      <section id="features" className="features-section">
        <div className="features-inner">
          <ServicesCarousel
            services={SERVICES}
            eyebrow="Task management, built for people"
            title="Your first weeks depend on clear tasks, real owners and fast ramp-ups."
            subtitle="Six pieces of one system, from the board a manager opens first to the checklist a new hire ticks off."
            bullets={[
              'Assign every task a real owner',
              'Keep due dates honest with automatic reminders',
              'Prove progress with live reports',
            ]}
          />
        </div>
      </section>

      {/* Pain points, then Meet Onboad (inspo 2) */}
      <section className="pain-section">
        <div className="pain-inner">
          <motion.h2
            initial={{ y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            You are moving fast but
            <br />
            your tools cannot keep up
          </motion.h2>

          <div className="pain-grid">
            {PAIN_POINTS.map((point, index) => (
              <motion.div
                key={point.title}
                className="pain-card"
                initial={{ y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
              >
                <span className="pain-icon">
                  <point.icon size={18} />
                </span>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </motion.div>
            ))}
          </div>

          <svg className="pain-lines" viewBox="0 0 800 120" fill="none" aria-hidden>
            <path d="M120 0C120 70 400 40 400 120" stroke="currentColor" strokeWidth="1.5" />
            <path d="M400 0v120" stroke="currentColor" strokeWidth="1.5" />
            <path d="M680 0c0 70-280 40-280 120" stroke="currentColor" strokeWidth="1.5" />
          </svg>

          <motion.div
            className="meet-title"
            initial={{ y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Meet Onboad.</h2>
            <p>Your complete onboarding stack</p>
            <span className="meet-sub">
              Everything above, fixed, with the calm, structured workspace your first weeks
              deserve. No plugins, no duct tape, no spreadsheet tab called “FINAL v3”.
            </span>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="steps-section">
        <div className="steps-inner">
          <motion.div
            className="section-header"
            initial={{ y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="section-eyebrow">How it works</p>
            <h2>Live in an afternoon, not a quarter</h2>
            <p className="section-sub">
              Three steps between today's chaos and next week's clean, tracked onboarding.
            </p>
          </motion.div>

          <div className="steps-grid">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.title}
                className="step-card"
                initial={{ y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.14 }}
              >
                <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="step-icon">
                  <step.icon size={24} />
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="testimonials-section">
        <motion.div
          className="section-header"
          initial={{ y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-eyebrow">Loved by people teams</p>
          <h2>First weeks that actually go to plan</h2>
          <p className="section-sub">
            Click a card to bring it forward, or step through the stack with the arrows.
          </p>
        </motion.div>

        <StaggerTestimonials testimonials={TESTIMONIALS} />
      </section>

      {/* Final CTA */}
      <section className="cta-section">
        <motion.div
          className="cta-panel"
          initial={{ y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <CursorTag name="You, next Monday" className="tag-cta" />
          <h2>Ready to give every new hire a great first week?</h2>
          <p>
            Set up your first workflow in under ten minutes. Free for 14 days, bring the whole
            team, keep the templates even if you leave.
          </p>
          <div className="cta-actions">
            <Link to="/signup" className="btn-white">
              Start onboarding free
              <ArrowRight size={18} />
            </Link>
            <a href="#testimonials" className="btn-outline-light">
              Talk to sales
            </a>
          </div>
          <span className="cta-note">
            <CheckCircle2 size={15} /> Cancel anytime · GDPR-ready · SOC 2 in progress
          </span>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-footer-brand">
            <div className="lp-footer-logo">
              <img src="/logo.jpg" alt="Onboad" className="lp-logo-image" />
              <span>Onboad</span>
            </div>
          </div>

          <div className="lp-footer-columns">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title} className="lp-footer-column">
                <h4>{column.title}</h4>
                {column.links.map((link) =>
                  link.to ? (
                    <Link key={link.label} to={link.to}>
                      {link.label}
                    </Link>
                  ) : (
                    <a key={link.label} href={link.href}>
                      {link.label}
                    </a>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="lp-footer-bottom">
          <p>© 2026 Onboad. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
