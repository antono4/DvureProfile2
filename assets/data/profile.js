/* =========================================================
   Site content.
   This is the ONLY file you need to edit to make the site yours.
   Everything below is plain data: change text, add items, done.
   Source of truth: https://antono4.github.io/
   ========================================================= */

window.SITE = {
    hero: {
        photo: {
            src: 'assets/img/avatar.jpg',
            alt: 'Antono, Full Stack Web Developer and IT Network Engineer',
        },
        chips: [
            'HTML5',
            'Tailwind',
            'JavaScript',
            'TypeScript',
            'PHP',
            'Three.js',
            'MySQL',
            'SQL Server',
            'OpenAI',
            'CCNA',
            'Cyber Security',
            'Monitoring',
        ],
        stats: [
            { label: 'Years in IT', value: '15+' },
            { label: 'Companies', value: '7' },
            { label: 'Projects shipped', value: '12+' },
            { label: 'Core domains', value: '4' },
        ],
    },

    profile: {
        paragraphs: [
            'A highly competent and innovative IT professional with over 15 years of experience across 7 companies. Passionate about technological advancements, continuously evolving skills in software development and network infrastructure. Proven expertise in building responsive web applications and managing large-scale server infrastructures.',
            'I work across full-stack web development, IT operations and networking, and database analysis - from building responsive applications and AI-assisted tooling to keeping enterprise server infrastructure stable across a region.',
        ],
        bullets: [
            '<strong>15+ years in IT</strong> across 7 companies, spanning programming, IT operations, networking and systems support.',
            '<strong>Full-stack delivery:</strong> responsive web applications in HTML5, Tailwind, JavaScript, PHP and Three.js, with AI integration via OpenAI.',
            '<strong>Infrastructure at scale:</strong> monitoring and maintaining server infrastructure across the entire South East Asia region.',
            '<strong>Data and analysis:</strong> database design and analysis, system audits, and IT asset management systems.',
        ],
    },

    contacts: [
        {
            label: 'Email',
            value: 'antonockr1@gmail.com',
            href: 'mailto:antonockr1@gmail.com',
        },
        { label: 'WhatsApp', value: '+62 822-6156-9466', href: 'https://wa.me/6282261569466' },
        { label: 'GitHub', value: 'github.com/antono4', href: 'https://github.com/antono4' },
        { label: 'Website', value: 'antono4.github.io', href: 'https://antono4.github.io/' },
        {
            label: 'Location',
            value: 'Cikarang Utara, Bekasi, Jawa Barat',
            href: 'https://www.google.com/maps/place/Cikarang+Utara,+Bekasi',
        },
        {
            label: 'ORCID',
            value: '0009-0003-7561-4840',
            href: 'https://orcid.org/0009-0003-7561-4840',
        },
    ],

    value: [
        {
            icon: '01',
            title: 'Web Development & AI',
            text: 'Full-stack development and modern AI integration across multiple frameworks.',
            level: 92,
            tags: ['HTML5', 'Tailwind', 'JavaScript', 'PHP', 'OpenAI', 'Three.js'],
        },
        {
            icon: '02',
            title: 'Networking & Security',
            text: 'Enterprise network infrastructure, security risk assessment and monitoring.',
            level: 88,
            tags: ['CCNA', 'Cyber Security', 'Monitoring', 'Cabling'],
        },
        {
            icon: '03',
            title: 'Databases & Systems',
            text: 'Database design, analysis, and full hardware and software systems maintenance.',
            level: 85,
            tags: ['MySQL', 'SQL Server', 'Analysis', 'Audits'],
        },
        {
            icon: '04',
            title: 'Management',
            text: 'IT operations, technical support leadership and asset management systems.',
            level: 90,
            tags: ['IT Operations', 'Support', 'Assets', 'SPA'],
        },
    ],

    credentials: [
        {
            kind: "Master's Degree",
            field: 'Manajemen Informatika',
            issuer: 'Postgraduate',
            period: 'Recipient: Antono',
            detail: 'Advanced study in information systems management, focusing on strategic IT governance and modern software engineering practices.',
            seal: 'M',
        },
        {
            kind: 'Diploma (D3)',
            field: 'Engineering (Computer / Telecommunication)',
            issuer: 'LP3I Cikarang',
            period: 'Graduated 2010',
            detail: 'Three-year diploma covering computer engineering and telecommunication fundamentals, from networking to embedded systems.',
            seal: 'D3',
        },
        {
            kind: 'CCNA',
            field: 'Cisco Certified Network Associate',
            issuer: 'Issued by LP3I',
            period: 'Networking',
            detail: 'Industry-recognized certification validating expertise in networking fundamentals, routing, switching and network security.',
            seal: 'C',
        },
    ],

    experience: [
        {
            company: 'Mondelez International',
            role: 'IT OSS & Network Engineer / IT Operations Specialist',
            period: 'Feb 2022 - Present',
            points: [
                'Monitor and maintain server infrastructures across the entire South East Asia (SEA) region.',
                'Identify hardware and software solutions, resolving complex network and connectivity issues.',
                'Troubleshoot technical issues to ensure continuous manufacturing operations.',
                'Install, configure, and maintain critical hardware and software systems.',
            ],
            tags: ['Networking', 'Server Infrastructure', 'Monitoring', 'IT Operations'],
        },
        {
            company: 'PT Multi Usage Indonesia',
            role: 'IT Programmer & IT Technical Support',
            period: 'Mar 2020 - Mar 2021',
            points: [
                'Developed corporate systems and applications utilizing Delphi 10 Embarcadero.',
                'Identified and implemented hardware and software solutions tailored to business needs.',
                'Troubleshoot technical issues, diagnosing system faults, and resolving network bottlenecks.',
            ],
            tags: ['Delphi', 'Technical Support', 'Hardware', 'Networking'],
        },
        {
            company: 'PT Annisa Mitra Husada (Rumah Sakit Annisa)',
            role: 'EDP / SIMRS',
            period: 'Sep 2016 - Dec 2019',
            points: [
                'Managed hospital information systems (SIMRS), ensuring data integrity and continuous availability.',
                'Supported IT-related medical projects, network administration, and hardware maintenance.',
            ],
            tags: ['SIMRS', 'Data Integrity', 'Network Administration'],
        },
        {
            company: 'PT Multi Mayaka',
            role: 'Programmer',
            period: 'Feb 2014 - Aug 2016',
            points: [
                'Developed and maintained company software and database systems, driving operational efficiency.',
            ],
            tags: ['Software Development', 'Databases'],
        },
        {
            company: 'PT Baja Nusantara',
            role: 'IT Staff',
            period: 'Mar 2013 - Feb 2014',
            points: [],
            tags: ['IT Support'],
        },
        {
            company: 'PT Multi Usage Indonesia',
            role: 'IT Programmer',
            period: 'Apr 2012 - Apr 2013',
            points: [],
            tags: ['Programming'],
        },
        {
            company: 'LP3I Cikarang',
            role: 'IT Staff',
            period: 'Sep 2010 - Aug 2011',
            points: [],
            tags: ['IT Support'],
        },
        {
            company: 'PT Oriental Asahi JP Carton Box',
            role: 'Warehouse Staff',
            period: 'Aug 2006 - Jul 2010',
            points: [],
            tags: ['Operations'],
        },
    ],

    projects: [
        {
            name: 'StockMind',
            url: 'https://github.com/antono4/StockMind',
            category: 'AI',
            proves: 'AI-powered stock prediction tool that analyses market trends to deliver actionable forecasting insights.',
            tags: ['AI', 'Prediction', 'HTML'],
        },
        {
            name: 'Local AI Like Ollama',
            url: 'https://github.com/antono4/Local-AI-Like-Ollama',
            category: 'AI',
            proves: 'Self-hosted local AI interface inspired by Ollama, bringing conversational AI capabilities to your own machine.',
            tags: ['AI', 'Local LLM', 'Self-hosted'],
        },
        {
            name: 'Koinku',
            url: 'https://github.com/antono4/Koinku',
            category: 'Web App',
            proves: 'Personal finance management app with a bold Neobrutalism design for tracking income, expenses and budgets.',
            tags: ['TypeScript', 'Finance', 'Neobrutalism'],
        },
        {
            name: 'Nexus Social Media',
            url: 'https://github.com/antono4/-NEXUS-SOCIAL-MEDIA',
            category: 'Web App',
            proves: 'Social media platform project with modern community features, deployed on Vercel for a live demo experience.',
            tags: ['JavaScript', 'Social', 'Vercel'],
        },
        {
            name: 'Awan Rent Car',
            note: 'Private project - not publicly available',
            category: 'Web App',
            proves: 'Premium web app template with a 10-vehicle fleet gallery and booking submission tools linked directly to the WhatsApp API.',
            tags: ['Web App', 'WhatsApp API'],
        },
        {
            name: 'BrainMetrics Elite',
            note: 'Private project - not publicly available',
            category: 'Web App',
            proves: 'Cognitive assessment app with a 50-question test bank across five intelligence domains, radar chart outputs and downloadable PDF reports.',
            tags: ['Assessment', 'Data Viz', 'PDF'],
        },
        {
            name: 'MRP Simulation',
            note: 'Private project - not publicly available',
            category: 'Web App',
            proves: 'Material Requirements Planning app with multi-warehouse inventory locations and integrated QR code scanning for stock tracking.',
            tags: ['Inventory', 'QR Scanning'],
        },
        {
            name: 'IT Asset Management',
            note: 'Private project - not publicly available',
            category: 'Web App',
            proves: 'Custom, fast single-page CRUD app configured for database connections to track and manage organizational IT assets efficiently.',
            tags: ['SPA', 'CRUD', 'Asset Tracking'],
        },
        {
            name: 'OptiCore-OS',
            url: 'https://github.com/antono4/OptiCore-OS',
            category: 'Systems',
            proves: 'Premium Windows optimization system to enhance performance, privacy and security on Windows 10/11.',
            tags: ['PowerShell', 'Optimization', 'Security'],
        },
        {
            name: 'AetherOS',
            url: 'https://antono4.github.io/AetherOS',
            category: 'Systems',
            proves: 'Web-based operating system experience built with TypeScript, featuring a modern desktop-like interface.',
            tags: ['TypeScript', 'Web OS', 'Live Demo'],
        },
        {
            name: 'RentCar',
            url: 'https://antono4.github.io/RentCar',
            category: 'Systems',
            proves: 'Live car rental web project with a clean, responsive interface for browsing and booking vehicles online.',
            tags: ['HTML', 'Live Demo'],
        },
        {
            name: 'Neon Strike Game',
            url: 'https://antono4.github.io/neon-strike-game',
            category: 'Game',
            proves: 'Browser-based arcade game with neon visuals and fast-paced gameplay, deployed via GitHub Pages.',
            tags: ['Game', 'HTML', 'Live Demo'],
        },
    ],

    stack: [
        {
            title: 'Web Development',
            items: ['HTML5', 'CSS', 'Tailwind', 'JavaScript', 'TypeScript', 'Three.js', 'Responsive Web Apps'],
        },
        {
            title: 'Backend & Databases',
            items: ['PHP', 'MySQL', 'SQL Server', 'Database Design', 'Database Analysis', 'SPA / CRUD'],
        },
        {
            title: 'AI & Tooling',
            items: ['OpenAI', 'Local LLM (Ollama)', 'Self-hosted AI', 'AI-assisted workflows'],
        },
        {
            title: 'Networking & Security',
            items: [
                'CCNA',
                'Routing & Switching',
                'Cyber Security',
                'Monitoring',
                'Structured Cabling',
                'Network Administration',
            ],
        },
        {
            title: 'Systems & Operations',
            items: [
                'Windows 10/11',
                'Server Infrastructure',
                'Hardware Maintenance',
                'IT Asset Management',
                'Technical Support',
            ],
        },
        {
            title: 'Programming',
            items: ['Delphi (Embarcadero)', 'PowerShell', 'SQL', 'Data Visualization'],
        },
        {
            title: 'Management',
            items: ['IT Operations', 'Team Support', 'Asset Management', 'System Audits', 'Documentation'],
        },
    ],
};
