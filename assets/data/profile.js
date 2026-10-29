/* =========================================================
   Site content.
   This is the ONLY file you need to edit to make the site yours.
   Everything below is plain data: change text, add items, done.
   ========================================================= */

window.SITE = {
    hero: {
        chips: [
            '.NET',
            'C / C++',
            'C#',
            'Python',
            'Unity',
            'TypeScript',
            'Reverse',
            'Linux',
            'Windows',
        ],
        stats: [
            { label: 'Years engineering', value: '10+' },
            { label: 'Public repos', value: '40+' },
            { label: 'Languages & stacks', value: '15+' },
            { label: 'Legacy systems recovered', value: '25+' },
        ],
    },

    profile: {
        paragraphs: [
            'I am an engineer who works at the intersection of backend development, systems analysis, reverse engineering, desktop tooling, game servers and infrastructure. Since 2014 I have been growing through programming and reverse engineering; commercially I have worked with .NET, Unity, C++, Python, Linux/Windows, PostgreSQL, RabbitMQ, Docker, CI and visualization systems.',
            'I am looking for a strong team and a product where the job is not only to "write code", but also to understand complex systems, recover architecture, design internal tools, bring solutions to a working state and leave a clear engineering base behind.',
        ],
        bullets: [
            '<strong>10+ years of engineering experience:</strong> from online game reverse engineering and system administration to .NET backend, Unity, C++ and infrastructure services.',
            '<strong>Strong area:</strong> complex systems, legacy code, binary analysis, .NET tools, server platforms, dependency visualization, automation and documentation.',
            '<strong>Public track record:</strong> dozens of repositories across the <code>Dvurechensky</code>, <code>Lizerium</code>, <code>Dvurechensky Tools</code> and <code>Templates</code> ecosystems.',
            '<strong>Rare combination:</strong> backend + desktop + reverse + game/server engineering, plus the ability to explain and document complex systems.',
        ],
    },

    contacts: [
        {
            label: 'Email',
            value: 'dvurechenskysoft@gmail.com',
            href: 'mailto:dvurechenskysoft@gmail.com',
        },
        { label: 'Email', value: 'nikolay@dvurechensky.pro', href: 'mailto:nikolay@dvurechensky.pro' },
        { label: 'GitHub', value: 'github.com/Dvurechensky', href: 'https://github.com/Dvurechensky' },
        { label: 'ORCID', value: '0009-0004-2701-5592', href: 'https://orcid.org/0009-0004-2701-5592' },
    ],

    value: [
        {
            icon: '◎',
            title: 'Understand unfamiliar systems',
            text: 'Quickly read unfamiliar codebases, protocols, data formats and old systems, then map them into something the team can maintain.',
        },
        {
            icon: '⬡',
            title: 'Design backend services',
            text: '.NET backend services, integrations, queues, databases and admin panels built for operations, not just for demos.',
        },
        {
            icon: '⚙',
            title: 'Build tools that save time',
            text: 'Analyzers, generators, converters, diff and monitoring utilities, project templates — anything that removes manual work.',
        },
        {
            icon: '⬢',
            title: 'Work across the stack',
            text: 'Windows and Linux, Docker, Jenkins, Git/SVN, PostgreSQL, RabbitMQ, Redis and nginx in the same delivery.',
        },
        {
            icon: '◆',
            title: 'Own a task end to end',
            text: 'Research, hypothesis, prototype, implementation, debugging, documentation and support — one person, whole loop.',
        },
        {
            icon: '⟠',
            title: 'Handle legacy and low level',
            text: 'Reverse engineering, C/C++, ABI, DLL proxying, x86, Ghidra/x32dbg/IDA-style workflows and low-level diagnostics.',
        },
    ],

    achievements: [
        {
            title: 'Reverse engineering and systems analysis',
            items: [
                '<strong>Freelancer.Reverse.Runtime:</strong> a runtime layer on top of the original Freelancer (2003) engine, where DLL modules are replaced by compatible proxy components with controlled C++ code, logging and behavior reconstruction.',
                '<strong>ReverseProxyDLL:</strong> a reverse-aware proxy DLL scaffold generator for legacy x86 Windows DLLs, covering exports, ordinals, ABI, C/C++ symbols, data exports and manual override scenarios.',
                '<strong>BinNexus:</strong> a Windows DLL/EXE analysis tool that generates an interactive web portal with dependency graphs, exports, symbol search and system-noise filtering.',
                'Freelancer / Lizerium C++/ASM ecosystem: plugins, server extensions, game DLLs, data formats, tooling and administration.',
            ],
        },
        {
            title: '.NET, backend and infrastructure',
            items: [
                'ASP.NET Core MVC applications with PostgreSQL, EF Core, RabbitMQ, Docker, Jenkins, Git/SVN.',
                '.NET Framework to .NET 6/7/8 migrations, architectural stabilization, dependencies and builds.',
                'Pentest monitoring system: data collection, visualization, analytics, server logic and UI.',
                '<strong>Lizerium Server:</strong> modular ASP.NET Core MVC platform for a game portal, admin backend, knowledge base, documentation, translations, internal services and network protection.',
                '<strong>Unifier:</strong> registered software system for distributed device interaction and infrastructure orchestration.',
            ],
        },
        {
            title: 'Desktop, tooling and automation',
            items: [
                '<strong>FileSync Sentinel:</strong> .NET 8 WinForms application for real-time file monitoring, visual diff, logging and synchronization of large <code>.ini</code> sets.',
                '<strong>Herodotus:</strong> WPF/Prism MVVM tool for presentation and demo scenarios with Markdown preview.',
                '<strong>LibreResxTranslate:</strong> NuGet library for automated <code>.resx</code> localization through LibreTranslate.',
                'Templates: Telegram bot template, ASP.NET Core MVC template, Electron/Vue/Vite template.',
            ],
        },
        {
            title: 'Unity, game development and VR',
            items: [
                'OXSIONSOFT / Lizerium, <strong>Ceek Virtual Reality</strong>: features, bug fixing, UI redesign and client-server improvements.',
                'Memory optimization through <strong>Unity Addressables</strong>, improving stability on Android 7+.',
                'Unity3D, HDRP, VFX Graph, Zenject, Addressables, Photon Engine, Blender, Substance, Photoshop.',
            ],
        },
    ],

    experience: [
        {
            company: 'OXSIONSOFT / Lizerium',
            role: 'Unity Developer',
            period: 'Mar 2021 — 2026 · 5+ yrs',
            points: [
                'Feature development, bug fixing and UI redesigns for VR/Unity projects.',
                'Memory optimization via Addressables and improved mobile build stability.',
                'Multiplayer with Photon Engine, client-server API improvements and technical specifications.',
            ],
            tags: ['Unity3D', 'HDRP', 'Photon', 'Addressables', 'C#'],
        },
        {
            company: 'NPC Reagent / SIGMA / CMK Consulting',
            role: '.NET Developer',
            period: '2019 — 2025 · 5+ yrs',
            points: [
                'ASP.NET Core MVC applications, PostgreSQL, EF Core, RabbitMQ, Docker.',
                'Dependency visualization for C#/C++ projects and NuGet graphs.',
                '.NET Framework to .NET 6/7/8 migrations, refactoring and architectural stabilization.',
                'Monitoring, analytics and visualization systems for security/pentest processes.',
            ],
            tags: ['ASP.NET Core', 'PostgreSQL', 'EF Core', 'RabbitMQ', 'Docker'],
        },
        {
            company: 'Freelancer Rebirth',
            role: 'C++ Developer',
            period: 'Nov 2020 — Nov 2023 · 3 yrs',
            points: [
                'Supported a major CIS mod for Freelancer (2003).',
                'Migrated 25+ plugins and core code into a unified C++ solution.',
                'Completed 3 major migrations between Visual Studio generations.',
            ],
            tags: ['C++', 'ASM x86', 'Visual Studio', 'Reverse'],
        },
        {
            company: 'Moscow Institute of Psychoanalysis',
            role: 'Technical Specialist',
            period: 'Feb 2020 — present · 6+ yrs',
            points: [
                'Technical support for an online video platform and live broadcasts.',
                'Helped 1000+ users of different ages and devices join educational events.',
            ],
            tags: ['Streaming', 'Support', 'Networking'],
        },
        {
            company: 'InterEVM / CITIS',
            role: 'Systems Engineer',
            period: 'Feb 2020 — Jun 2023 · 3+ yrs',
            points: [
                'Monitoring systems in Qt, data analyzers in Python/PHP.',
                'XSLT/XML templates and PostgreSQL query optimization.',
                'Astra Linux, Ubuntu, Debian and Windows environments.',
            ],
            tags: ['Qt', 'Python', 'PHP', 'PostgreSQL', 'Astra Linux'],
        },
    ],

    projects: [
        {
            name: 'Freelancer.Reverse.Runtime',
            url: 'https://github.com/Dvurechensky/Freelancer.Reverse.Runtime',
            category: 'Reverse',
            proves: 'Reverse engineering, C++ runtime layer, compatible DLLs, legacy engine behavior recovery.',
            tags: ['C', 'C++', 'ASM x86', 'Ghidra', 'x32dbg'],
        },
        {
            name: 'ReverseProxyDLL',
            url: 'https://github.com/Dvurechensky/ReverseProxyDLL',
            category: 'Reverse',
            proves: 'Proxy DLL scaffold generation for old Windows x86 libraries.',
            tags: ['Python', 'C++'],
        },
        {
            name: 'BinNexus',
            url: 'https://github.com/Dvurechensky/BinNexus',
            category: 'Tooling',
            proves: 'DLL/EXE analysis with dependency graph, export explorer and web visualization.',
            tags: ['Python', 'JavaScript', 'C++', 'HTML/CSS'],
        },
        {
            name: 'Lizerium Server',
            url: 'https://github.com/Lizerium/LizeriumServer',
            category: 'Backend',
            proves: 'Modular server platform for portal, admin, documentation and services.',
            tags: ['ASP.NET Core MVC', 'EF Core', 'PostgreSQL'],
        },
        {
            name: 'FileSync Sentinel',
            url: 'https://github.com/Dvurechensky-Tools/FileSyncSentinel',
            category: 'Tooling',
            proves: 'Desktop tool for file monitoring, visual diff and synchronization.',
            tags: ['.NET 8', 'WinForms', 'DiffPlex'],
        },
        {
            name: 'Herodotus',
            url: 'https://github.com/Dvurechensky-Tools/Heradotus',
            category: 'Tooling',
            proves: 'WPF/MVVM application for demo scenarios and Markdown workflow.',
            tags: ['WPF', 'Prism MVVM', 'HandyControl'],
        },
        {
            name: 'LibreResxTranslate',
            url: 'https://github.com/Dvurechensky-Tools/LibreResxTranslate',
            category: 'Backend',
            proves: 'NuGet library for automated .NET localization.',
            tags: ['C#', '.NET', 'RESX', 'LibreTranslate'],
        },
    ],

    stack: [
        {
            title: 'Backend / .NET',
            items: [
                'C#',
                '.NET Framework',
                '.NET 6/7/8',
                'ASP.NET Core MVC',
                'SignalR',
                'EF Core',
                'xUnit',
                'NUnit',
            ],
        },
        {
            title: 'Databases / Messaging',
            items: ['PostgreSQL', 'SQL Server', 'MySQL', 'Redis', 'RabbitMQ'],
        },
        {
            title: 'Infrastructure',
            items: ['Docker', 'Jenkins', 'nginx', 'Git', 'SVN', 'Gitea', 'Linux', 'Windows'],
        },
        {
            title: 'Frontend / Visualization',
            items: [
                'TypeScript',
                'JavaScript',
                'Cytoscape.js',
                'Three.js',
                'HTML5',
                'SCSS/CSS',
                'Webpack',
                'Grunt',
            ],
        },
        {
            title: 'Desktop',
            items: [
                'WPF',
                'Prism MVVM',
                'HandyControl',
                'WinForms',
                'FastColoredTextBox',
                'Costura/Fody',
            ],
        },
        {
            title: 'Reverse / Low-level',
            items: [
                'C',
                'C++',
                'ASM x86',
                'DLL proxying',
                'ABI',
                'PE analysis',
                'IDA Pro',
                'Ghidra',
                'x32dbg',
                'OllyDbg',
            ],
        },
        {
            title: 'Game / Unity',
            items: [
                'Unity3D',
                'HDRP',
                'URP',
                'VFX Graph',
                'Zenject',
                'Addressables',
                'Photon Engine',
                'ECS approaches',
            ],
        },
        {
            title: 'Other languages',
            items: ['Python', 'Go', 'PHP', 'Shell/Bash', 'Qt', 'XSLT/XML', 'Elixir', 'Fortran77'],
        },
    ],
};
