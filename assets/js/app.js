/* =========================================================
   Renderer + UI enhancements.
   Content comes from assets/data/profile.js (window.SITE).
   All user data is inserted as text or escaped HTML, never
   as raw markup, so a stray tag in the data file cannot
   break the page.
   ========================================================= */

(() => {
    'use strict';

    // Guard against a double include (e.g. a host injecting the script twice),
    // which would otherwise attach duplicate listeners to the same controls.
    if (window.__SITE_BOOTED__) return;
    window.__SITE_BOOTED__ = true;

    const SITE = window.SITE || {};
    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

    /* ---------- safety helpers ---------- */

    // Insert untrusted text as a text node.
    const text = (value) => {
        const node = document.createTextNode(value == null ? '' : String(value));
        return node;
    };

    // Allow a tiny, explicit whitelist of inline tags so the data file can
    // emphasise a word without opening the door to arbitrary markup.
    const ALLOWED = new Set(['STRONG', 'B', 'EM', 'I', 'CODE', 'BR', 'A']);

    const safeHtml = (value) => {
        const tpl = document.createElement('template');
        tpl.innerHTML = String(value == null ? '' : value);

        const clean = (node) => {
            $$('*', node).forEach((element) => {
                if (!ALLOWED.has(element.tagName)) {
                    element.replaceWith(...element.childNodes);
                    return;
                }
                // Strip every attribute except a safe href on links.
                Array.from(element.attributes).forEach((attr) => {
                    const okHref =
                        element.tagName === 'A' &&
                        attr.name === 'href' &&
                        /^(https?:|mailto:|#)/i.test(attr.value);
                    if (!okHref) element.removeAttribute(attr.name);
                });
                if (element.tagName === 'A') {
                    element.setAttribute('rel', 'noopener');
                    element.target = '_blank';
                }
                clean(element);
            });
        };

        clean(tpl.content);
        return tpl.content;
    };

    const el = (tag, className, content) => {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (content instanceof Node) node.appendChild(content);
        else if (content != null) node.appendChild(text(content));
        return node;
    };

    const list = (items, className, render) => {
        const ul = el('ul', className);
        (items || []).forEach((item) => ul.appendChild(render(item)));
        return ul;
    };

    const renderInto = (node, value) => {
        if (node) node.replaceChildren(safeHtml(value));
    };

    /* ---------- renderers ---------- */

    const renderHeroPhoto = () => {
        const host = $('[data-hero-photo]');
        const cfg = SITE.hero?.photo;
        if (!host || !cfg?.src) return;
        const img = document.createElement('img');
        img.className = 'hero__photo';
        img.src = cfg.src;
        img.alt = cfg.alt || '';
        img.width = 400;
        img.height = 400;
        img.loading = 'eager';
        img.decoding = 'async';
        // If the photo fails to load, fall back to the monogram mark rather
        // than showing a broken-image icon.
        img.addEventListener('error', () => {
            host.replaceChildren(el('span', 'hero__photo-fallback', 'A'));
        });
        host.replaceChildren(img);
    };

    const renderChips = () => {
        const host = $('[data-chips]');
        if (!host) return;
        host.replaceChildren(
            ...(SITE.hero?.chips || []).map((chip) => el('li', null, chip)),
        );
    };

    const renderStats = () => {
        const host = $('[data-stats]');
        if (!host) return;
        host.replaceChildren(
            ...(SITE.hero?.stats || []).map((stat) => {
                const cell = el('div');
                cell.appendChild(el('dt', null, stat.label));
                cell.appendChild(el('dd', null, stat.value));
                return cell;
            }),
        );
    };

    const renderProfile = () => {
        const host = $('[data-profile]');
        if (!host) return;
        const profile = SITE.profile || {};
        const fragment = document.createDocumentFragment();
        (profile.paragraphs || []).forEach((p) =>
            fragment.appendChild(el('p', null, safeHtml(p))),
        );
        if (profile.bullets?.length) {
            fragment.appendChild(
                list(profile.bullets, null, (item) => el('li', null, safeHtml(item))),
            );
        }
        host.replaceChildren(fragment);
    };

    const renderContacts = () => {
        const host = $('[data-contacts]');
        if (!host) return;
        host.replaceChildren(
            ...(SITE.contacts || []).map((contact) => {
                const card = el('a', 'contact-card');
                card.href = contact.href || '#';
                if (/^https?:/i.test(card.href)) {
                    card.target = '_blank';
                    card.rel = 'noopener';
                }
                card.appendChild(el('span', null, contact.label));
                card.appendChild(el('strong', null, contact.value));
                return card;
            }),
        );
    };

    const renderValue = () => {
        const host = $('[data-value]');
        if (!host) return;
        host.replaceChildren(
            ...(SITE.value || []).map((item) => {
                const card = el('article', 'card');
                card.appendChild(el('div', 'card__icon', item.icon || '◆'));
                card.appendChild(el('h3', null, item.title));
                card.appendChild(el('p', null, item.text));

                if (item.tags?.length) {
                    const tags = el('div', 'tags');
                    item.tags.forEach((tag) => tags.appendChild(el('span', 'tag', tag)));
                    card.appendChild(tags);
                }

                // Proficiency bar. The width is set from data and the fill is
                // animated by CSS once the card is revealed, so it must start
                // at 0 and be driven by the --level custom property.
                if (typeof item.level === 'number') {
                    const meter = el('div', 'meter');
                    meter.setAttribute('role', 'img');
                    meter.setAttribute(
                        'aria-label',
                        `${item.title}: ${item.level} percent proficiency`,
                    );
                    const bar = el('div', 'meter__bar');
                    bar.style.setProperty('--level', `${item.level}%`);
                    const fill = el('div', 'meter__fill');
                    bar.appendChild(fill);
                    const label = el('span', 'meter__value', `${item.level}%`);
                    meter.appendChild(el('span', 'meter__label', 'Proficiency'));
                    meter.appendChild(label);
                    meter.appendChild(bar);
                    card.appendChild(meter);
                }
                return card;
            }),
        );
    };

    const renderCredentials = () => {
        const host = $('[data-credentials]');
        if (!host) return;
        host.replaceChildren(
            ...(SITE.credentials || []).map((item) => {
                const card = el('article', 'credential');

                const seal = el('div', 'credential__seal', item.seal || '★');
                seal.setAttribute('aria-hidden', 'true');
                card.appendChild(seal);

                const body = el('div', 'credential__body');
                body.appendChild(el('p', 'credential__kind', item.kind));
                body.appendChild(el('h3', null, item.field));
                const meta = el('p', 'credential__meta');
                meta.appendChild(el('strong', null, item.issuer));
                if (item.period) meta.appendChild(el('span', null, ` · ${item.period}`));
                body.appendChild(meta);
                body.appendChild(el('p', 'credential__detail', item.detail));
                card.appendChild(body);

                return card;
            }),
        );
    };

    const renderExperience = () => {
        const host = $('[data-experience]');
        if (!host) return;
        host.replaceChildren(
            ...(SITE.experience || []).map((job) => {
                const item = el('li');

                const top = el('div', 'timeline__top');
                top.appendChild(el('h3', null, job.company));
                top.appendChild(el('span', 'timeline__period', job.period));
                item.appendChild(top);

                item.appendChild(el('p', 'timeline__role', job.role));
                item.appendChild(
                    list(job.points, null, (point) => el('li', null, point)),
                );

                if (job.tags?.length) {
                    const tags = el('div', 'tags');
                    job.tags.forEach((tag) => tags.appendChild(el('span', 'tag', tag)));
                    item.appendChild(tags);
                }
                return item;
            }),
        );
    };

    const renderStack = () => {
        const host = $('[data-stack]');
        if (!host) return;
        host.replaceChildren(
            ...(SITE.stack || []).map((group) => {
                const wrap = el('section', 'stack-group');
                wrap.appendChild(el('h3', null, group.title));
                wrap.appendChild(
                    list(group.items, null, (item) => el('li', null, item)),
                );
                return wrap;
            }),
        );
    };

    /* ---------- projects with filtering ---------- */

    const projectsSection = () => {
        const grid = $('[data-projects]');
        const empty = $('[data-projects-empty]');
        const filters = $('[data-filters]');
        if (!grid) return;

        const projects = SITE.projects || [];
        const categories = ['All', ...new Set(projects.map((p) => p.category).filter(Boolean))];
        let active = 'All';

        const card = (project) => {
            const node = el('article', 'project');
            node.dataset.category = project.category || '';

            const head = el('div', 'project__head');
            const title = el('h3');
            if (project.url) {
                const link = el('a', null, project.name);
                link.href = project.url;
                link.target = '_blank';
                link.rel = 'noopener';
                title.appendChild(link);
            } else {
                title.appendChild(text(project.name));
            }
            head.appendChild(title);
            if (project.category) {
                head.appendChild(el('span', 'project__badge', project.category));
            }
            node.appendChild(head);

            node.appendChild(el('p', 'project__body', project.proves));

            if (!project.url && project.note) {
                node.appendChild(el('p', 'project__note', project.note));
            }

            if (project.tags?.length) {
                const tags = el('div', 'tags');
                project.tags.forEach((tag) => tags.appendChild(el('span', 'tag', tag)));
                node.appendChild(tags);
            }
            return node;
        };

        const paint = () => {
            const visible = projects.filter(
                (p) => active === 'All' || p.category === active,
            );
            grid.replaceChildren(...visible.map(card));
            // The empty state must be handled on every repaint, not only once.
            if (empty) empty.hidden = visible.length > 0;
        };

        if (filters) {
            filters.replaceChildren(
                ...categories.map((category) => {
                    const button = el('button', null, category);
                    button.type = 'button';
                    button.setAttribute('role', 'tab');
                    button.setAttribute('aria-selected', String(category === active));
                    button.addEventListener('click', () => {
                        active = category;
                        $$('button', filters).forEach((other) =>
                            other.setAttribute(
                                'aria-selected',
                                String(other === button),
                            ),
                        );
                        paint();
                    });
                    return button;
                }),
            );
        }

        paint();
    };

    /* ---------- chrome: progress bar, spotlight, theme, nav ---------- */

    const scrollProgress = () => {
        const bar = $('.scroll-progress');
        if (!bar) return;
        const update = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const value = max > 0 ? window.scrollY / max : 0;
            document.documentElement.style.setProperty(
                '--scroll-progress',
                value.toFixed(4),
            );
        };
        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
    };

    const spotlight = () => {
        if (!window.matchMedia?.('(pointer: fine)')?.matches) return;
        window.addEventListener(
            'pointermove',
            (event) => {
                const root = document.documentElement;
                root.style.setProperty('--spot-x', `${event.clientX}px`);
                root.style.setProperty('--spot-y', `${event.clientY}px`);
            },
            { passive: true },
        );
    };

    /* ---------- weather ----------
       A calm rain-and-snow drift painted on a fixed canvas behind the page.
       Purely decorative: the canvas is aria-hidden and never carries text.

       Notes:
       - Particle counts scale with area but are capped, so a 4K screen does not
         pay for four times the work of a phone.
       - devicePixelRatio is capped at 2: past that the extra pixels are
         invisible while the fill cost keeps climbing.
       - Nothing runs while the tab is hidden, and the whole effect is skipped
         under prefers-reduced-motion (the canvas then stays empty). */
    const weather = () => {
        const canvas = $('.weather');
        if (!canvas || !canvas.getContext) return;
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return;

        // getContext returns null when canvas is unavailable — not just in
        // jsdom, but in real browsers where it is blocked for fingerprinting.
        // Bail before touching it, or the throw would abort the whole boot.
        let ctx;
        try {
            ctx = canvas.getContext('2d');
        } catch {
            return;
        }
        if (!ctx) return;

        const DPR = Math.min(window.devicePixelRatio || 1, 2);
        const GOLD = '245, 217, 77';
        const CYAN = '64, 212, 255';

        // The canvas sits behind the text, so a particle can land directly
        // behind a glyph and raise the background it is read against. Alpha is
        // therefore capped by contrast, not by taste: two particles may overlap
        // a single glyph, which composites to 1-(1-a)^2, and the dimmest body
        // text (--muted) must still reach 4.5:1 against the result. At 0.09 the
        // worst case is 4.70:1 in the dark theme and 4.77:1 in the light one.
        // Raising this without re-checking will break WCAG AA.
        const MAX_ALPHA = 0.09;
        let w = 0;
        let h = 0;
        let drops = [];
        let flakes = [];
        let raf = 0;

        const isLight = () => document.documentElement.dataset.theme === 'light';

        const seed = () => {
            const area = w * h;
            const dropCount = Math.min(150, Math.round(area / 13000));
            const flakeCount = Math.min(46, Math.round(area / 42000));

            drops = Array.from({ length: dropCount }, () => {
                // depth drives parallax: nearer drops are longer, faster, brighter
                const depth = 0.35 + Math.random() * 0.65;
                return {
                    x: Math.random() * w,
                    y: Math.random() * h,
                    depth,
                    len: 7 + depth * 15,
                    vy: (110 + depth * 210) / 60,
                    vx: -0.28,
                };
            });

            flakes = Array.from({ length: flakeCount }, () => {
                const depth = 0.3 + Math.random() * 0.7;
                return {
                    x: Math.random() * w,
                    y: Math.random() * h,
                    depth,
                    r: 0.7 + depth * 1.7,
                    vy: (16 + depth * 34) / 60,
                    phase: Math.random() * Math.PI * 2,
                    wobble: 0.5 + depth * 0.9,
                };
            });
        };

        const resize = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = Math.round(w * DPR);
            canvas.height = Math.round(h * DPR);
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
            seed();
        };

        const frame = () => {
            raf = requestAnimationFrame(frame);
            ctx.clearRect(0, 0, w, h);
            const light = isLight();
            const t = performance.now() / 1000;

            ctx.lineCap = 'round';
            for (const d of drops) {
                d.y += d.vy;
                d.x += d.vx * d.depth;
                if (d.y > h + d.len) {
                    d.y = -d.len;
                    d.x = Math.random() * w;
                }
                if (d.x < -d.len) d.x = w + d.len;
                ctx.strokeStyle = `rgba(${CYAN}, ${(light ? 0.075 : MAX_ALPHA) * d.depth})`;
                ctx.lineWidth = 0.6 + d.depth * 1.1;
                ctx.beginPath();
                ctx.moveTo(d.x, d.y);
                ctx.lineTo(d.x + d.vx * 3, d.y + d.len);
                ctx.stroke();
            }

            for (const f of flakes) {
                f.y += f.vy;
                f.x += Math.sin(t * 0.6 + f.phase) * f.wobble * 0.5;
                if (f.y > h + f.r) {
                    f.y = -f.r;
                    f.x = Math.random() * w;
                }
                if (f.x < -f.r) f.x = w + f.r;
                else if (f.x > w + f.r) f.x = -f.r;
                ctx.fillStyle = `rgba(${GOLD}, ${(light ? 0.08 : MAX_ALPHA) * f.depth})`;
                ctx.beginPath();
                ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const start = () => {
            if (!raf) raf = requestAnimationFrame(frame);
        };
        const stop = () => {
            if (raf) {
                cancelAnimationFrame(raf);
                raf = 0;
            }
        };

        resize();
        start();

        window.addEventListener('resize', resize);
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) stop();
            else start();
        });
    };

    const theme = () => {
        const button = $('[data-theme-toggle]');
        const root = document.documentElement;
        const stored = (() => {
            try {
                return localStorage.getItem('theme');
            } catch {
                return null;
            }
        })();
        // Dark is the intended default; light is opt-in via the toggle.
        root.dataset.theme = stored === 'light' ? 'light' : 'dark';

        button?.addEventListener('click', () => {
            root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
            try {
                localStorage.setItem('theme', root.dataset.theme);
            } catch {
                /* storage unavailable: theme still applies for this session */
            }
        });
    };

    const navHighlight = () => {
        const links = $$('.topbar__nav a');
        const sections = links
            .map((link) => $(link.getAttribute('href')))
            .filter(Boolean);
        if (!sections.length || !('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    links.forEach((link) =>
                        link.classList.toggle(
                            'is-active',
                            link.getAttribute('href') === `#${entry.target.id}`,
                        ),
                    );
                });
            },
            { rootMargin: '-45% 0px -50% 0px' },
        );
        sections.forEach((section) => observer.observe(section));
    };

    const reveal = () => {
        const targets = $$(
            '.section__head, .prose, .contact-grid, .card, .credential, .timeline > li, .project, .stack-group, .cta, .stats',
        );
        if (!('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                });
            },
            { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
        );
        targets.forEach((target) => {
            target.classList.add('reveal');
            observer.observe(target);
        });
    };

    const cvButton = () => {
        const button = $('[data-print-cv]');
        if (!button) return;
        button.addEventListener('click', () => window.print());
    };

    /* ---------- boot ---------- */
    renderHeroPhoto();
    renderChips();
    renderStats();
    renderProfile();
    renderContacts();
    renderValue();
    renderCredentials();
    renderExperience();
    projectsSection();
    renderStack();

    const year = $('[data-year]');
    if (year) year.textContent = String(new Date().getFullYear());

    theme();
    weather();
    scrollProgress();
    spotlight();
    navHighlight();
    reveal();
    cvButton();
})();
