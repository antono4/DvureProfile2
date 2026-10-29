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
                return card;
            }),
        );
    };

    const renderAchievements = () => {
        const host = $('[data-achievements]');
        if (!host) return;
        host.replaceChildren(
            ...(SITE.achievements || []).map((group) => {
                const wrap = el('article', 'group');
                wrap.appendChild(el('h3', null, group.title));
                wrap.appendChild(
                    list(group.items, null, (item) => el('li', null, safeHtml(item))),
                );
                return wrap;
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
            '.section__head, .prose, .contact-grid, .card, .group, .timeline > li, .project, .stack-group, .cta, .stats',
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

    /* ---------- boot ---------- */
    renderChips();
    renderStats();
    renderProfile();
    renderContacts();
    renderValue();
    renderAchievements();
    renderExperience();
    projectsSection();
    renderStack();

    const year = $('[data-year]');
    if (year) year.textContent = String(new Date().getFullYear());

    theme();
    scrollProgress();
    spotlight();
    navHighlight();
    reveal();
})();
