document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const header = document.querySelector("[data-header]");
  const navToggle = document.querySelector(".nav-toggle");
  const navPanel = document.querySelector(".nav-panel");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const languageSwitcher = document.querySelector("[data-language-switcher]");
  const languageToggle = document.querySelector("[data-language-toggle]");
  const languageCurrent = document.querySelector("[data-language-current]");
  const languageOptions = Array.from(document.querySelectorAll("[data-language-option]"));
  const yearSlot = document.querySelector("[data-current-year]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const resumeDialog = document.querySelector("[data-resume-dialog]");
  const resumeOpeners = Array.from(document.querySelectorAll("[data-resume-open]"));
  const resumeClosers = Array.from(document.querySelectorAll("[data-resume-close]"));
  const contactDialog = document.querySelector("[data-contact-dialog]");
  const contactOpeners = Array.from(document.querySelectorAll("[data-contact-open]"));
  const contactClosers = Array.from(document.querySelectorAll("[data-contact-close]"));
  const contactCopyButtons = Array.from(document.querySelectorAll("[data-copy-email]"));
  const contactCopyStatus = document.querySelector("[data-copy-status]");
  const projectLightbox = document.querySelector("[data-project-lightbox]");
  const projectLightboxTitle = document.querySelector("[data-project-lightbox-title]");
  const projectLightboxImage = document.querySelector("[data-project-lightbox-image]");
  const projectLightboxCounter = document.querySelector("[data-project-lightbox-counter]");
  const projectLightboxPrev = document.querySelector("[data-project-lightbox-prev]");
  const projectLightboxNext = document.querySelector("[data-project-lightbox-next]");
  const projectLightboxDots = document.querySelector("[data-project-lightbox-dots]");
  const projectLightboxOpeners = Array.from(document.querySelectorAll("[data-project-lightbox-open]"));
  const projectLightboxClosers = Array.from(document.querySelectorAll("[data-project-lightbox-close]"));
  const forcedLanguageLinks = Array.from(document.querySelectorAll("[data-force-language-link]"));
  const focusableSelector = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "object",
    "[tabindex]:not([tabindex='-1'])"
  ].join(",");
  const supportedLanguages = ["pt-BR", "en", "es"];
  const defaultLanguage = "pt-BR";
  const languageStorageKey = "victor-portfolio-language";
  const languageLabels = {
    "pt-BR": {
      short: "PT-BR",
      name: "Português (Brasil)"
    },
    en: {
      short: "EN",
      name: "English"
    },
    es: {
      short: "ES",
      name: "Español"
    }
  };
  const attributeTranslations = [
    ["data-i18n-aria-label", "aria-label"],
    ["data-i18n-alt", "alt"],
    ["data-i18n-title", "title"],
    ["data-i18n-preview-alt", "data-preview-alt"],
    ["data-i18n-lightbox-alt", "data-lightbox-alt"],
    ["data-i18n-lightbox-title", "data-lightbox-title"]
  ];
  const translations = {
    "pt-BR": {
      "skip.content": "Pular para o conteúdo",
      "nav.ariaLabel": "Navegação principal",
      "nav.brandAria": "Ir para o início",
      "nav.brandSubtitle": "Desenvolvedor de Software",
      "nav.openMenu": "Abrir menu",
      "nav.closeMenu": "Fechar menu",
      "nav.home": "Início",
      "nav.about": "Sobre",
      "nav.experience": "Experiência",
      "nav.projects": "Projetos",
      "nav.education": "Formação",
      "nav.technologies": "Tecnologias",
      "nav.contact": "Contato",
      "theme.label": "Tema",
      "theme.activateLight": "Ativar tema claro",
      "theme.activateDark": "Ativar tema escuro",
      "language.menuLabel": "Selecionar idioma",
      "language.toggleAria": "Selecionar idioma. Idioma atual: {language}",
      "hero.kicker": "01 - Apresentação",
      "hero.greeting": "Olá, eu sou",
      "hero.role": "Desenvolvedor Full Stack",
      "hero.text": "Desenvolvo aplicações web com foco em backend, APIs, bancos de dados e integrações, combinando desenvolvimento de software com experiência prática em ambientes de produção.",
      "hero.profileAria": "Foto de perfil",
      "hero.profileAlt": "Ilustração de perfil de Victor Galvão",
      "hero.actionsAria": "Ações principais",
      "hero.viewProjects": "Ver projetos",
      "hero.startConversation": "Iniciar conversa",
      "about.kicker": "02 - Sobre mim",
      "about.titleLine1": "Código, lógica e",
      "about.titleLine2": "resolução de problemas.",
      "about.paragraph1": "Sou Victor Galvão, estudante de Engenharia de Software na UTFPR e desenvolvedor Full Stack com foco em Backend. Tenho experiência com desenvolvimento de aplicações web, APIs, bancos de dados, autenticação e integrações entre sistemas.",
      "about.paragraph2": "Minha experiência anterior com Cloud, infraestrutura e observabilidade complementa meu perfil, trazendo uma visão prática sobre disponibilidade, troubleshooting e funcionamento de aplicações em produção.",
      "about.factFocusLabel": "Foco",
      "about.factFocusValue": "Backend",
      "about.factProfileLabel": "Perfil",
      "about.factProfileValue": "Full Stack",
      "about.factEducationLabel": "Formação",
      "about.factEducationValue": "Engenharia de Software",
      "about.interestsTitle": "Quando não estou programando",
      "hobbies.gaming.title": "Jogos",
      "hobbies.gaming.text": "Gosto de jogos que envolvem estratégia, competição e resolução de problemas.",
      "hobbies.sports.title": "Esportes",
      "hobbies.sports.text": "Gosto de acompanhar e praticar esportes como forma de manter uma rotina ativa e equilibrada.",
      "hobbies.music.title": "Músicas",
      "hobbies.music.text": "Música faz parte do meu dia a dia, principalmente enquanto estudo, desenvolvo ou relaxo.",
      "hobbies.movies.title": "Filmes e séries",
      "hobbies.movies.text": "Gosto de filmes e séries, especialmente histórias que prendem a atenção e exploram boas narrativas.",
      "resume.cardKicker": "Currículo",
      "resume.cardTitle": "Minha trajetória profissional.",
      "resume.cardText": "Visualize meu currículo sem sair do portfólio ou baixe a versão mais recente.",
      "resume.view": "Visualizar currículo",
      "resume.downloadPdf": "Baixar PDF",
      "resume.dialogKicker": "Currículo",
      "resume.dialogTitle": "Victor Galvão - CV",
      "resume.closeAria": "Fechar visualização do currículo",
      "resume.previewAria": "Pré-visualização do currículo de Victor Galvão",
      "resume.fallbackText": "Seu navegador não exibiu o PDF dentro da página.",
      "resume.openPdf": "Abrir PDF",
      "resume.download": "Baixar currículo",
      "experience.kicker": "03 / Experiência profissional",
      "experience.title": "Experiência que conecta desenvolvimento e operação.",
      "experience.nexxt.role": "Analista de Suporte, NOC e Infraestrutura",
      "experience.nexxt.description": "Atuação com monitoramento de aplicações e infraestrutura, análise de incidentes, troubleshooting, escalonamento N1/N2 e acompanhamento de sistemas em produção. A experiência complementou minha visão como desenvolvedor sobre disponibilidade, observabilidade e operação de aplicações reais.",
      "experience.nexxt.bullet1": "Monitoramento com Grafana, observabilidade e acompanhamento de ambientes de clientes.",
      "experience.nexxt.bullet2": "Análise inicial de incidentes, investigação de falhas e comunicação com equipes técnicas.",
      "experience.nexxt.bullet3": "Rotinas envolvendo AWS Lambda, Google Cloud Platform e serviços corporativos em nuvem.",
      "experience.nexxt.bullet4": "Experiência com dashboards, disponibilidade e comportamento de sistemas em produção.",
      "experience.plastec.role": "Desenvolvedor Python Júnior / Estágio",
      "experience.plastec.description": "Desenvolvimento e evolução de funcionalidades para sistema ERP web, com foco em lógica de negócio, manutenção de sistemas, banco de dados e melhoria contínua da aplicação.",
      "experience.plastec.bullet1": "Desenvolvimento de funcionalidades em Python para sistema web.",
      "experience.plastec.bullet2": "Manutenção, evolução e ajuste de recursos existentes.",
      "experience.plastec.bullet3": "Trabalho com banco de dados e organização de informações do sistema.",
      "projects.kicker": "04 / Projetos",
      "projects.title": "Projetos que sustentam meu foco em software.",
      "projects.inProgress": "Projetos em progresso",
      "projects.inProgressDescription": "Trabalhos que continuo desenvolvendo e aprimorando.",
      "projects.completed": "Projetos concluídos",
      "projects.completedDescription": "Projetos finalizados individualmente ou em equipe.",
      "projects.other": "Outros projetos",
      "projects.teamLabel": "Projeto em equipe",
      "projects.statusPortfolio": "Status: portfólio",
      "projects.viewProject": "Ver projeto",
      "projects.viewGithub": "Ver no GitHub",
      "projects.previewOpen": "Ampliar preview",
      "projects.viewScreens": "Ver telas",
      "projects.placeholderPending": "Screenshot pendente",
      "projects.placeholderReplaceApp": "Substitua este placeholder pelo print da aplicação.",
      "projects.portfolio.label": "Em evolução",
      "projects.portfolio.name": "Portfólio Pessoal",
      "projects.portfolio.description": "Experiência autoral criada para apresentar minha trajetória com navegação acessível, temas claro e escuro, conteúdo em três idiomas e atenção especial aos detalhes de interface.",
      "projects.portfolio.note": "Design, desenvolvimento e conteúdo",
      "projects.portfolio.previewAlt": "Screenshot da home do Portfólio Pessoal.",
      "projects.portfolio.viewAria": "Ver projeto Portfólio Pessoal em inglês",
      "projects.facilix.label": "Projeto principal",
      "projects.facilix.type": "Marketplace / Plataforma Web",
      "projects.facilix.description": "Plataforma web construída como projeto prático de engenharia de software, com arquitetura de marketplace, autenticação, banco de dados, integrações externas e fluxo de pagamentos.",
      "projects.facilix.problemTitle": "Problema trabalhado",
      "projects.facilix.problemText": "Conectar compradores e vendedores em um ambiente web com contas, pagamentos, APIs e regras de marketplace.",
      "projects.facilix.featuresTitle": "Características",
      "projects.facilix.featuresText": "Vendedores, compradores, OAuth, gateway de pagamento, webhooks, autenticação, APIs REST e deploy.",
      "projects.facilix.previewAlt": "Screenshot da aplicação Facilix.",
      "projects.facilix.viewAria": "Ver projeto Facilix",
      "projects.vollopay.type": "Frontend / Onboarding / Stripe Connect",
      "projects.vollopay.description": "Participei do desenvolvimento do VolloPay, uma plataforma de onboarding e habilitação de vendedores para pagamentos. Minha atuação incluiu a criação da landing page, telas de login e cadastro e o fluxo de KYC na área de configurações, utilizado para coletar os dados necessários para conexão e habilitação da conta na Stripe.",
      "projects.vollopay.directTitle": "Atuei diretamente",
      "projects.vollopay.directText": "Landing page, telas de login e cadastro/registro, participação no fluxo de autenticação relacionado a essas telas e KYC em Configurações para coletar dados necessários à conexão e habilitação da conta via Stripe Connect.",
      "projects.vollopay.teamTitle": "Projeto em equipe",
      "projects.vollopay.teamText": "O VolloPay inclui onboarding de sellers, autenticação, área privada, configuração de conta, KYC e integração com Stripe Connect. Minha contribuição ficou concentrada em interfaces, formulários e fluxo frontend de onboarding.",
      "projects.vollopay.note": "Minha contribuição ficou concentrada em interfaces, formulários, autenticação relacionada às telas e onboarding para Stripe Connect.",
      "projects.vollopay.previewAlt": "Screenshot da área de Configurações de pagamento do VolloPay.",
      "projects.vollopay.previewAria": "Ampliar preview do VolloPay",
      "projects.agro.category": "Frontend / Interface Web",
      "projects.agro.name": "Portal Agropecuário de Doação de Bezerros",
      "projects.agro.description": "Protótipo frontend de uma plataforma agropecuária que conecta produtores de leite, produtores de carne, ONG e empresas parceiras em um fluxo de doação e adoção de bezerros com sistema de pontos e recompensas.",
      "projects.agro.contribution": "Minha contribuição: desenvolvimento da interface do Produtor de Carne.",
      "projects.agro.previewAlt1": "Tela do Produtor de Carne, visão inicial.",
      "projects.agro.previewAlt2": "Tela do Produtor de Carne, formulário de adoção, meus bezerros e extrato de pontos.",
      "projects.agro.previewAlt3": "Tela do Produtor de Carne, seção final.",
      "projects.agro.previewAlt4": "Visão geral das quatro interfaces do projeto.",
      "projects.agro.caption1": "Produtor de Carne, visão geral",
      "projects.agro.caption2": "Adoção, meus bezerros e extrato de pontos",
      "projects.agro.caption3": "Acompanhamento e extrato de pontos",
      "projects.agro.caption4": "Visão geral das interfaces do projeto",
      "projects.agro.placeholderAria": "Screenshots pendentes do Portal Agropecuário de Doação de Bezerros. Adicione assets/projects/doacao-bezerros/produtor-carne-01.png, assets/projects/doacao-bezerros/produtor-carne-02.png, assets/projects/doacao-bezerros/produtor-carne-03.png e assets/projects/doacao-bezerros/visao-geral.png.",
      "projects.agro.placeholderReplaceScreens": "Adicione as quatro telas PNG para ativar o carrossel.",
      "projects.agro.previewAria": "Ampliar screenshot do Portal Agropecuário de Doação de Bezerros",
      "projects.agro.previousAria": "Screenshot anterior do Portal Agropecuário de Doação de Bezerros",
      "projects.agro.nextAria": "Próximo screenshot do Portal Agropecuário de Doação de Bezerros",
      "projects.agro.dotsAria": "Selecionar screenshot do projeto",
      "projects.agro.dotAria": "Mostrar screenshot {current} de {total}",
      "projects.caminhodv.category": "Aplicação Web",
      "projects.caminhodv.description": "Plataforma de gamificação turística preservada do portfólio existente, com foco em apresentar a ideia e direcionar para o repositório já referenciado.",
      "projects.caminhodv.previewAlt": "Screenshot da aplicação CaminhoDV.",
      "projects.caminhodv.viewAria": "Ver projeto CaminhoDV",
      "education.kicker": "05 / Formação",
      "education.title": "Formação acadêmica organizada por etapa.",
      "education.software.status": "Cursando",
      "education.software.title": "Engenharia de Software",
      "education.software.institution": "UTFPR — Universidade Tecnológica Federal do Paraná",
      "education.software.expected": "Previsão de conclusão: julho de 2027",
      "education.highschool.status": "2021",
      "education.highschool.title": "Ensino Médio",
      "education.highschool.institution": "Colégio Embraer Juarez Wanderley",
      "education.highschool.location": "São José dos Campos — SP",
      "education.highschool.completed": "Conclusão: 2021",
      "technologies.kicker": "06 / Tecnologias",
      "technologies.title": "Competências organizadas pelo meu foco de atuação.",
      "technologies.database": "Banco de dados",
      "technologies.engineeringTools": "Engenharia / Ferramentas",
      "technologies.cloudObservability": "Cloud & Observabilidade",
      "contact.kicker": "07 / Contato",
      "contact.title": "Vamos construir algo?",
      "contact.text": "Estou aberto a oportunidades em desenvolvimento Backend e Full Stack, com interesse em APIs, integrações, bancos de dados e aplicações web. Minha vivência com Cloud e observabilidade entra como diferencial para pensar sistemas em produção.",
      "contact.linksAria": "Links de contato",
      "contactDialog.closeAria": "Fechar contato",
      "contactDialog.kicker": "Contato direto",
      "contactDialog.title": "Vamos conversar?",
      "contactDialog.description": "Copie meu endereço para me enviar uma mensagem.",
      "contactDialog.emailLabel": "Meu e-mail",
      "contactDialog.copy": "Copiar",
      "contactDialog.copied": "Copiado",
      "contactDialog.copySuccess": "E-mail copiado para a área de transferência.",
      "contactDialog.copyError": "Não foi possível copiar automaticamente. Selecione o e-mail acima.",
      "dialog.close": "Fechar",
      "lightbox.kicker": "Preview ampliado",
      "lightbox.defaultTitle": "Preview do projeto",
      "lightbox.closeAria": "Fechar",
      "lightbox.previous": "Anterior",
      "lightbox.next": "Próxima",
      "lightbox.imageCounter": "Imagem {current} de {total}",
      "lightbox.dotsLabel": "Selecionar imagem",
      "lightbox.dotLabel": "Mostrar imagem {current} de {total}",
      "footer.builtWith": "Desenvolvido com HTML, CSS e JavaScript.",
      "footer.backToTop": "Voltar ao início",
      "tag.observability": "Observabilidade",
      "tag.production": "Produção",
      "tag.database": "Banco de dados",
      "tag.maintenance": "Manutenção",
      "tag.businessLogic": "Lógica de negócio",
      "tag.gamification": "Gamificação",
      "tag.digitalExperience": "Experiência digital",
      "tag.responsiveDesign": "Design responsivo",
      "tag.restApis": "APIs REST",
      "tag.tests": "Testes",
      "tag.apiIntegrations": "Integrações de APIs",
      "tag.monitoring": "Monitoramento"
    },
    en: {
      "skip.content": "Skip to content",
      "nav.ariaLabel": "Primary navigation",
      "nav.brandAria": "Go to the top",
      "nav.brandSubtitle": "Software Developer",
      "nav.openMenu": "Open menu",
      "nav.closeMenu": "Close menu",
      "nav.home": "Home",
      "nav.about": "About",
      "nav.experience": "Experience",
      "nav.projects": "Projects",
      "nav.education": "Education",
      "nav.technologies": "Technologies",
      "nav.contact": "Contact",
      "theme.label": "Theme",
      "theme.activateLight": "Switch to light theme",
      "theme.activateDark": "Switch to dark theme",
      "language.menuLabel": "Select language",
      "language.toggleAria": "Select language. Current language: {language}",
      "hero.kicker": "01 - Introduction",
      "hero.greeting": "Hi, I am",
      "hero.role": "Full Stack Developer",
      "hero.text": "I build web applications focused on backend development, APIs, databases and integrations, combining software engineering with practical experience in production environments.",
      "hero.profileAria": "Profile photo",
      "hero.profileAlt": "Profile illustration of Victor Galvão",
      "hero.actionsAria": "Primary actions",
      "hero.viewProjects": "View projects",
      "hero.startConversation": "Start a conversation",
      "about.kicker": "02 - About me",
      "about.titleLine1": "Code, logic and",
      "about.titleLine2": "problem solving.",
      "about.paragraph1": "I am Victor Galvão, a Software Engineering student at UTFPR and a Full Stack Developer focused on Backend Development. I have experience building web applications, APIs, databases, authentication flows and system integrations.",
      "about.paragraph2": "My previous experience with Cloud, infrastructure and observability complements my profile with a practical view of availability, troubleshooting and how applications behave in production.",
      "about.factFocusLabel": "Focus",
      "about.factFocusValue": "Backend",
      "about.factProfileLabel": "Profile",
      "about.factProfileValue": "Full Stack",
      "about.factEducationLabel": "Education",
      "about.factEducationValue": "Software Engineering",
      "about.interestsTitle": "When I am not coding",
      "hobbies.gaming.title": "Gaming",
      "hobbies.gaming.text": "I enjoy games that involve strategy, competition and problem solving.",
      "hobbies.sports.title": "Sports",
      "hobbies.sports.text": "I like following and playing sports as a way to keep an active and balanced routine.",
      "hobbies.music.title": "Music",
      "hobbies.music.text": "Music is part of my daily routine, especially while I study, build or relax.",
      "hobbies.movies.title": "Movies & TV Shows",
      "hobbies.movies.text": "I enjoy movies and TV shows, especially stories that hold attention and explore strong narratives.",
      "resume.cardKicker": "Resume",
      "resume.cardTitle": "My professional path.",
      "resume.cardText": "View my resume without leaving the portfolio or download the latest version.",
      "resume.view": "View resume",
      "resume.downloadPdf": "Download PDF",
      "resume.dialogKicker": "Resume",
      "resume.dialogTitle": "Victor Galvão - Resume",
      "resume.closeAria": "Close resume preview",
      "resume.previewAria": "Resume preview for Victor Galvão",
      "resume.fallbackText": "Your browser did not display the PDF inside the page.",
      "resume.openPdf": "Open PDF",
      "resume.download": "Download resume",
      "experience.kicker": "03 / Professional experience",
      "experience.title": "Experience connecting development and operations.",
      "experience.nexxt.role": "Support, NOC and Infrastructure Analyst",
      "experience.nexxt.description": "Worked with application and infrastructure monitoring, incident analysis, troubleshooting, N1/N2 escalation and production systems follow-up. This experience expanded my developer perspective on availability, observability and real-world application operations.",
      "experience.nexxt.bullet1": "Monitoring with Grafana, observability practices and follow-up of customer environments.",
      "experience.nexxt.bullet2": "Initial incident analysis, failure investigation and communication with technical teams.",
      "experience.nexxt.bullet3": "Routines involving AWS Lambda, Google Cloud Platform and corporate cloud services.",
      "experience.nexxt.bullet4": "Experience with dashboards, availability and production system behavior.",
      "experience.plastec.role": "Junior Python Developer / Internship",
      "experience.plastec.description": "Developed and improved features for a web ERP system, with focus on business logic, system maintenance, databases and continuous application improvement.",
      "experience.plastec.bullet1": "Developed Python features for a web system.",
      "experience.plastec.bullet2": "Maintained, evolved and adjusted existing features.",
      "experience.plastec.bullet3": "Worked with databases and system information organization.",
      "projects.kicker": "04 / Projects",
      "projects.title": "Projects that support my focus in software.",
      "projects.inProgress": "Projects in Progress",
      "projects.inProgressDescription": "Work I am still developing and refining.",
      "projects.completed": "Completed Projects",
      "projects.completedDescription": "Projects completed individually or as part of a team.",
      "projects.other": "Other projects",
      "projects.teamLabel": "Team project",
      "projects.statusPortfolio": "Status: portfolio",
      "projects.viewProject": "View project",
      "projects.viewGithub": "View on GitHub",
      "projects.previewOpen": "Open preview",
      "projects.viewScreens": "View screens",
      "projects.placeholderPending": "Screenshot pending",
      "projects.placeholderReplaceApp": "Replace this placeholder with the application screenshot.",
      "projects.portfolio.label": "In development",
      "projects.portfolio.name": "Personal Portfolio",
      "projects.portfolio.description": "A custom experience built to present my background with accessible navigation, light and dark themes, content in three languages and careful attention to interface details.",
      "projects.portfolio.note": "Design, development and content",
      "projects.portfolio.previewAlt": "Screenshot of the Personal Portfolio home page.",
      "projects.portfolio.viewAria": "View Personal Portfolio in English",
      "projects.facilix.label": "Main project",
      "projects.facilix.type": "Marketplace / Web Platform",
      "projects.facilix.description": "Web platform built as a practical software engineering project, with marketplace architecture, authentication, database, external integrations and a payment flow.",
      "projects.facilix.problemTitle": "Problem addressed",
      "projects.facilix.problemText": "Connecting buyers and sellers in a web environment with accounts, payments, APIs and marketplace rules.",
      "projects.facilix.featuresTitle": "Features",
      "projects.facilix.featuresText": "Sellers, buyers, OAuth, payment gateway, webhooks, authentication, REST APIs and deployment.",
      "projects.facilix.previewAlt": "Screenshot of the Facilix application.",
      "projects.facilix.viewAria": "View Facilix project",
      "projects.vollopay.type": "Frontend / Onboarding / Stripe Connect",
      "projects.vollopay.description": "I contributed to VolloPay, an onboarding and account-enablement platform for sellers receiving payments. My work included the landing page, login and signup screens, registration flow and the KYC flow inside settings, used to collect the data required to connect and enable the account through Stripe.",
      "projects.vollopay.directTitle": "Direct contribution",
      "projects.vollopay.directText": "Landing page, login and signup/registration screens, participation in the authentication flow connected to those screens, and KYC inside Settings to collect the data required for Stripe Connect account connection and enablement.",
      "projects.vollopay.teamTitle": "Team project",
      "projects.vollopay.teamText": "VolloPay includes seller onboarding, authentication, private area, account settings, KYC and Stripe Connect integration. My contribution was focused on interfaces, forms and the frontend onboarding flow.",
      "projects.vollopay.note": "My contribution was focused on interfaces, forms, authentication connected to those screens and Stripe Connect onboarding.",
      "projects.vollopay.previewAlt": "Screenshot of the VolloPay payment settings area.",
      "projects.vollopay.previewAria": "Open VolloPay preview",
      "projects.agro.category": "Frontend / Web Interface",
      "projects.agro.name": "Agricultural Calf Donation Portal",
      "projects.agro.description": "Frontend prototype for an agricultural platform connecting dairy farmers, beef producers, an NGO and partner companies through a calf donation and adoption flow with points and rewards.",
      "projects.agro.contribution": "My contribution: development of the Beef Producer interface.",
      "projects.agro.previewAlt1": "Beef Producer screen, initial view.",
      "projects.agro.previewAlt2": "Beef Producer screen with adoption form, my calves and points statement.",
      "projects.agro.previewAlt3": "Beef Producer screen, final section.",
      "projects.agro.previewAlt4": "Overview of the project's four interfaces.",
      "projects.agro.caption1": "Beef Producer, overview",
      "projects.agro.caption2": "Adoption, my calves and points statement",
      "projects.agro.caption3": "Points tracking and statement",
      "projects.agro.caption4": "Overview of the project interfaces",
      "projects.agro.placeholderAria": "Screenshots pending for the Agricultural Calf Donation Portal. Add assets/projects/doacao-bezerros/produtor-carne-01.png, assets/projects/doacao-bezerros/produtor-carne-02.png, assets/projects/doacao-bezerros/produtor-carne-03.png and assets/projects/doacao-bezerros/visao-geral.png.",
      "projects.agro.placeholderReplaceScreens": "Add the four PNG screens to enable the carousel.",
      "projects.agro.previewAria": "Open screenshot for the Agricultural Calf Donation Portal",
      "projects.agro.previousAria": "Previous screenshot for the Agricultural Calf Donation Portal",
      "projects.agro.nextAria": "Next screenshot for the Agricultural Calf Donation Portal",
      "projects.agro.dotsAria": "Select project screenshot",
      "projects.agro.dotAria": "Show screenshot {current} of {total}",
      "projects.caminhodv.category": "Web Application",
      "projects.caminhodv.description": "Tourism gamification platform preserved from the existing portfolio, focused on presenting the idea and pointing to the referenced repository.",
      "projects.caminhodv.previewAlt": "Screenshot of the CaminhoDV application.",
      "projects.caminhodv.viewAria": "View CaminhoDV project",
      "education.kicker": "05 / Education",
      "education.title": "Academic background organized by stage.",
      "education.software.status": "Currently enrolled",
      "education.software.title": "Software Engineering",
      "education.software.institution": "UTFPR — Universidade Tecnológica Federal do Paraná",
      "education.software.expected": "Expected completion: July 2027",
      "education.highschool.status": "2021",
      "education.highschool.title": "High School",
      "education.highschool.institution": "Colégio Embraer Juarez Wanderley",
      "education.highschool.location": "São José dos Campos — SP",
      "education.highschool.completed": "Completion: 2021",
      "technologies.kicker": "06 / Technologies",
      "technologies.title": "Skills organized around my professional focus.",
      "technologies.database": "Database",
      "technologies.engineeringTools": "Engineering / Tools",
      "technologies.cloudObservability": "Cloud & Observability",
      "contact.kicker": "07 / Contact",
      "contact.title": "Shall we build something?",
      "contact.text": "I am open to Backend and Full Stack development opportunities, with interest in APIs, integrations, databases and web applications. My experience with Cloud and observability adds a production-minded perspective to system design.",
      "contact.linksAria": "Contact links",
      "contactDialog.closeAria": "Close contact dialog",
      "contactDialog.kicker": "Direct contact",
      "contactDialog.title": "Shall we talk?",
      "contactDialog.description": "Copy my address to send me a message.",
      "contactDialog.emailLabel": "My email",
      "contactDialog.copy": "Copy",
      "contactDialog.copied": "Copied",
      "contactDialog.copySuccess": "Email copied to clipboard.",
      "contactDialog.copyError": "Could not copy automatically. Select the email above.",
      "dialog.close": "Close",
      "lightbox.kicker": "Expanded preview",
      "lightbox.defaultTitle": "Project preview",
      "lightbox.closeAria": "Close",
      "lightbox.previous": "Previous",
      "lightbox.next": "Next",
      "lightbox.imageCounter": "Image {current} of {total}",
      "lightbox.dotsLabel": "Select image",
      "lightbox.dotLabel": "Show image {current} of {total}",
      "footer.builtWith": "Built with HTML, CSS and JavaScript.",
      "footer.backToTop": "Back to top",
      "tag.observability": "Observability",
      "tag.production": "Production",
      "tag.database": "Database",
      "tag.maintenance": "Maintenance",
      "tag.businessLogic": "Business logic",
      "tag.gamification": "Gamification",
      "tag.digitalExperience": "Digital experience",
      "tag.responsiveDesign": "Responsive Design",
      "tag.restApis": "REST APIs",
      "tag.tests": "Tests",
      "tag.apiIntegrations": "API integrations",
      "tag.monitoring": "Monitoring"
    },
    es: {
      "skip.content": "Saltar al contenido",
      "nav.ariaLabel": "Navegación principal",
      "nav.brandAria": "Ir al inicio",
      "nav.brandSubtitle": "Desarrollador de Software",
      "nav.openMenu": "Abrir menú",
      "nav.closeMenu": "Cerrar menú",
      "nav.home": "Inicio",
      "nav.about": "Sobre mí",
      "nav.experience": "Experiencia",
      "nav.projects": "Proyectos",
      "nav.education": "Formación",
      "nav.technologies": "Tecnologías",
      "nav.contact": "Contacto",
      "theme.label": "Tema",
      "theme.activateLight": "Activar tema claro",
      "theme.activateDark": "Activar tema oscuro",
      "language.menuLabel": "Seleccionar idioma",
      "language.toggleAria": "Seleccionar idioma. Idioma actual: {language}",
      "hero.kicker": "01 - Presentación",
      "hero.greeting": "Hola, soy",
      "hero.role": "Desarrollador Full Stack",
      "hero.text": "Desarrollo aplicaciones web con enfoque en backend, APIs, bases de datos e integraciones, combinando desarrollo de software con experiencia práctica en entornos de producción.",
      "hero.profileAria": "Foto de perfil",
      "hero.profileAlt": "Ilustración de perfil de Victor Galvão",
      "hero.actionsAria": "Acciones principales",
      "hero.viewProjects": "Ver proyectos",
      "hero.startConversation": "Iniciar conversación",
      "about.kicker": "02 - Sobre mí",
      "about.titleLine1": "Código, lógica y",
      "about.titleLine2": "resolución de problemas.",
      "about.paragraph1": "Soy Victor Galvão, estudiante de Ingeniería de Software en UTFPR y Desarrollador Full Stack con enfoque en Backend. Tengo experiencia en desarrollo de aplicaciones web, APIs, bases de datos, autenticación e integraciones entre sistemas.",
      "about.paragraph2": "Mi experiencia previa con Cloud, infraestructura y observabilidad complementa mi perfil con una visión práctica sobre disponibilidad, troubleshooting y funcionamiento de aplicaciones en producción.",
      "about.factFocusLabel": "Enfoque",
      "about.factFocusValue": "Backend",
      "about.factProfileLabel": "Perfil",
      "about.factProfileValue": "Full Stack",
      "about.factEducationLabel": "Formación",
      "about.factEducationValue": "Ingeniería de Software",
      "about.interestsTitle": "Cuando no estoy programando",
      "hobbies.gaming.title": "Videojuegos",
      "hobbies.gaming.text": "Me gustan los juegos que involucran estrategia, competición y resolución de problemas.",
      "hobbies.sports.title": "Deportes",
      "hobbies.sports.text": "Me gusta seguir y practicar deportes como forma de mantener una rutina activa y equilibrada.",
      "hobbies.music.title": "Música",
      "hobbies.music.text": "La música forma parte de mi rutina diaria, especialmente mientras estudio, desarrollo o descanso.",
      "hobbies.movies.title": "Películas y series",
      "hobbies.movies.text": "Me gustan las películas y series, especialmente historias que atrapan la atención y exploran buenas narrativas.",
      "resume.cardKicker": "Currículum",
      "resume.cardTitle": "Mi trayectoria profesional.",
      "resume.cardText": "Visualiza mi currículum sin salir del portafolio o descarga la versión más reciente.",
      "resume.view": "Visualizar currículum",
      "resume.downloadPdf": "Descargar PDF",
      "resume.dialogKicker": "Currículum",
      "resume.dialogTitle": "Victor Galvão - CV",
      "resume.closeAria": "Cerrar visualización del currículum",
      "resume.previewAria": "Vista previa del currículum de Victor Galvão",
      "resume.fallbackText": "Tu navegador no mostró el PDF dentro de la página.",
      "resume.openPdf": "Abrir PDF",
      "resume.download": "Descargar currículum",
      "experience.kicker": "03 / Experiencia profesional",
      "experience.title": "Experiencia que conecta desarrollo y operación.",
      "experience.nexxt.role": "Analista de Soporte, NOC e Infraestructura",
      "experience.nexxt.description": "Trabajo con monitoreo de aplicaciones e infraestructura, análisis de incidentes, troubleshooting, escalamiento N1/N2 y seguimiento de sistemas en producción. Esta experiencia complementó mi visión como desarrollador sobre disponibilidad, observabilidad y operación de aplicaciones reales.",
      "experience.nexxt.bullet1": "Monitoreo con Grafana, observabilidad y seguimiento de entornos de clientes.",
      "experience.nexxt.bullet2": "Análisis inicial de incidentes, investigación de fallas y comunicación con equipos técnicos.",
      "experience.nexxt.bullet3": "Rutinas con AWS Lambda, Google Cloud Platform y servicios corporativos en la nube.",
      "experience.nexxt.bullet4": "Experiencia con dashboards, disponibilidad y comportamiento de sistemas en producción.",
      "experience.plastec.role": "Desarrollador Python Junior / Pasantía",
      "experience.plastec.description": "Desarrollo y evolución de funcionalidades para un sistema ERP web, con foco en lógica de negocio, mantenimiento de sistemas, bases de datos y mejora continua de la aplicación.",
      "experience.plastec.bullet1": "Desarrollo de funcionalidades en Python para sistema web.",
      "experience.plastec.bullet2": "Mantenimiento, evolución y ajuste de recursos existentes.",
      "experience.plastec.bullet3": "Trabajo con bases de datos y organización de información del sistema.",
      "projects.kicker": "04 / Proyectos",
      "projects.title": "Proyectos que sostienen mi enfoque en software.",
      "projects.inProgress": "Proyectos en progreso",
      "projects.inProgressDescription": "Trabajos que sigo desarrollando y mejorando.",
      "projects.completed": "Proyectos finalizados",
      "projects.completedDescription": "Proyectos finalizados individualmente o en equipo.",
      "projects.other": "Otros proyectos",
      "projects.teamLabel": "Proyecto en equipo",
      "projects.statusPortfolio": "Estado: portafolio",
      "projects.viewProject": "Ver proyecto",
      "projects.viewGithub": "Ver en GitHub",
      "projects.previewOpen": "Ampliar preview",
      "projects.viewScreens": "Ver pantallas",
      "projects.placeholderPending": "Screenshot pendiente",
      "projects.placeholderReplaceApp": "Sustituye este placeholder por la captura de la aplicación.",
      "projects.portfolio.label": "En evolución",
      "projects.portfolio.name": "Portafolio Personal",
      "projects.portfolio.description": "Experiencia autoral creada para presentar mi trayectoria con navegación accesible, temas claro y oscuro, contenido en tres idiomas y atención especial a los detalles de interfaz.",
      "projects.portfolio.note": "Diseño, desarrollo y contenido",
      "projects.portfolio.previewAlt": "Screenshot de la home de Portafolio Personal.",
      "projects.portfolio.viewAria": "Ver Portafolio Personal en inglés",
      "projects.facilix.label": "Proyecto principal",
      "projects.facilix.type": "Marketplace / Plataforma Web",
      "projects.facilix.description": "Plataforma web construida como proyecto práctico de ingeniería de software, con arquitectura de marketplace, autenticación, base de datos, integraciones externas y flujo de pagos.",
      "projects.facilix.problemTitle": "Problema trabajado",
      "projects.facilix.problemText": "Conectar compradores y vendedores en un entorno web con cuentas, pagos, APIs y reglas de marketplace.",
      "projects.facilix.featuresTitle": "Características",
      "projects.facilix.featuresText": "Vendedores, compradores, OAuth, gateway de pago, webhooks, autenticación, APIs REST y deploy.",
      "projects.facilix.previewAlt": "Screenshot de la aplicación Facilix.",
      "projects.facilix.viewAria": "Ver proyecto Facilix",
      "projects.vollopay.type": "Frontend / Onboarding / Stripe Connect",
      "projects.vollopay.description": "Participé en el desarrollo de VolloPay, una plataforma de onboarding y habilitación de cuentas para vendedores que reciben pagos. Mi actuación incluyó la landing page, pantallas de login y registro, flujo de registro y el flujo de KYC dentro del área de configuración, utilizado para recopilar los datos necesarios para conectar y habilitar la cuenta en Stripe.",
      "projects.vollopay.directTitle": "Actué directamente",
      "projects.vollopay.directText": "Landing page, pantallas de login y registro, participación en el flujo de autenticación relacionado con esas pantallas y KYC en Configuración para recopilar los datos necesarios para la conexión y habilitación de la cuenta vía Stripe Connect.",
      "projects.vollopay.teamTitle": "Proyecto en equipo",
      "projects.vollopay.teamText": "VolloPay incluye onboarding de sellers, autenticación, área privada, configuración de cuenta, KYC e integración con Stripe Connect. Mi contribución se concentró en interfaces, formularios y flujo frontend de onboarding.",
      "projects.vollopay.note": "Mi contribución se concentró en interfaces, formularios, autenticación relacionada con esas pantallas y onboarding para Stripe Connect.",
      "projects.vollopay.previewAlt": "Screenshot del área de Configuración de pagos de VolloPay.",
      "projects.vollopay.previewAria": "Ampliar preview de VolloPay",
      "projects.agro.category": "Frontend / Interfaz Web",
      "projects.agro.name": "Portal Agropecuario de Donación de Terneros",
      "projects.agro.description": "Prototipo frontend de una plataforma agropecuaria que conecta productores de leche, productores de carne, una ONG y empresas asociadas en un flujo de donación y adopción de terneros con sistema de puntos y recompensas.",
      "projects.agro.contribution": "Mi contribución: desarrollo de la interfaz del Productor de Carne.",
      "projects.agro.previewAlt1": "Pantalla del Productor de Carne, vista inicial.",
      "projects.agro.previewAlt2": "Pantalla del Productor de Carne con formulario de adopción, mis terneros y extracto de puntos.",
      "projects.agro.previewAlt3": "Pantalla del Productor de Carne, sección final.",
      "projects.agro.previewAlt4": "Vista general de las cuatro interfaces del proyecto.",
      "projects.agro.caption1": "Productor de Carne, vista general",
      "projects.agro.caption2": "Adopción, mis terneros y extracto de puntos",
      "projects.agro.caption3": "Seguimiento y extracto de puntos",
      "projects.agro.caption4": "Vista general de las interfaces del proyecto",
      "projects.agro.placeholderAria": "Screenshots pendientes del Portal Agropecuario de Donación de Terneros. Añade assets/projects/doacao-bezerros/produtor-carne-01.png, assets/projects/doacao-bezerros/produtor-carne-02.png, assets/projects/doacao-bezerros/produtor-carne-03.png y assets/projects/doacao-bezerros/visao-geral.png.",
      "projects.agro.placeholderReplaceScreens": "Añade las cuatro pantallas PNG para activar el carrusel.",
      "projects.agro.previewAria": "Ampliar screenshot del Portal Agropecuario de Donación de Terneros",
      "projects.agro.previousAria": "Screenshot anterior del Portal Agropecuario de Donación de Terneros",
      "projects.agro.nextAria": "Siguiente screenshot del Portal Agropecuario de Donación de Terneros",
      "projects.agro.dotsAria": "Seleccionar screenshot del proyecto",
      "projects.agro.dotAria": "Mostrar screenshot {current} de {total}",
      "projects.caminhodv.category": "Aplicación Web",
      "projects.caminhodv.description": "Plataforma de gamificación turística preservada del portafolio existente, con foco en presentar la idea y dirigir al repositorio ya referenciado.",
      "projects.caminhodv.previewAlt": "Screenshot de la aplicación CaminhoDV.",
      "projects.caminhodv.viewAria": "Ver proyecto CaminhoDV",
      "education.kicker": "05 / Formación",
      "education.title": "Formación académica organizada por etapa.",
      "education.software.status": "En curso",
      "education.software.title": "Ingeniería de Software",
      "education.software.institution": "UTFPR — Universidade Tecnológica Federal do Paraná",
      "education.software.expected": "Finalización prevista: julio de 2027",
      "education.highschool.status": "2021",
      "education.highschool.title": "Educación Secundaria",
      "education.highschool.institution": "Colégio Embraer Juarez Wanderley",
      "education.highschool.location": "São José dos Campos — SP",
      "education.highschool.completed": "Finalización: 2021",
      "technologies.kicker": "06 / Tecnologías",
      "technologies.title": "Competencias organizadas según mi enfoque profesional.",
      "technologies.database": "Base de datos",
      "technologies.engineeringTools": "Ingeniería / Herramientas",
      "technologies.cloudObservability": "Cloud y Observabilidad",
      "contact.kicker": "07 / Contacto",
      "contact.title": "¿Construimos algo?",
      "contact.text": "Estoy abierto a oportunidades en desarrollo Backend y Full Stack, con interés en APIs, integraciones, bases de datos y aplicaciones web. Mi experiencia con Cloud y observabilidad aporta una perspectiva orientada a producción para pensar sistemas.",
      "contact.linksAria": "Links de contacto",
      "contactDialog.closeAria": "Cerrar contacto",
      "contactDialog.kicker": "Contacto directo",
      "contactDialog.title": "¿Hablamos?",
      "contactDialog.description": "Copia mi dirección para enviarme un mensaje.",
      "contactDialog.emailLabel": "Mi e-mail",
      "contactDialog.copy": "Copiar",
      "contactDialog.copied": "Copiado",
      "contactDialog.copySuccess": "E-mail copiado al portapapeles.",
      "contactDialog.copyError": "No fue posible copiar automáticamente. Selecciona el e-mail arriba.",
      "dialog.close": "Cerrar",
      "lightbox.kicker": "Preview ampliado",
      "lightbox.defaultTitle": "Preview del proyecto",
      "lightbox.closeAria": "Cerrar",
      "lightbox.previous": "Anterior",
      "lightbox.next": "Siguiente",
      "lightbox.imageCounter": "Imagen {current} de {total}",
      "lightbox.dotsLabel": "Seleccionar imagen",
      "lightbox.dotLabel": "Mostrar imagen {current} de {total}",
      "footer.builtWith": "Desarrollado con HTML, CSS y JavaScript.",
      "footer.backToTop": "Volver al inicio",
      "tag.observability": "Observabilidad",
      "tag.production": "Producción",
      "tag.database": "Base de datos",
      "tag.maintenance": "Mantenimiento",
      "tag.businessLogic": "Lógica de negocio",
      "tag.gamification": "Gamificación",
      "tag.digitalExperience": "Experiencia digital",
      "tag.responsiveDesign": "Diseño responsivo",
      "tag.restApis": "APIs REST",
      "tag.tests": "Pruebas",
      "tag.apiIntegrations": "Integraciones de APIs",
      "tag.monitoring": "Monitoreo"
    }
  };
  const seoTranslations = {
    "pt-BR": {
      title: "Victor Galvão | Desenvolvedor Full Stack",
      description: "Portfólio profissional de Victor Galvão, desenvolvedor Full Stack com foco em Backend, estudante de Engenharia de Software na UTFPR, com experiência adicional em cloud, infraestrutura e observabilidade.",
      ogLocale: "pt_BR",
      ogTitle: "Victor Galvão | Desenvolvedor Full Stack",
      ogDescription: "Desenvolvimento Full Stack com foco em Backend, APIs, bancos de dados, integrações e visão complementar de cloud e produção.",
      twitterTitle: "Victor Galvão | Desenvolvedor Full Stack",
      twitterDescription: "Portfólio profissional de Victor Galvão, desenvolvedor Full Stack com foco em Backend e estudante de Engenharia de Software na UTFPR."
    },
    en: {
      title: "Victor Galvão | Full Stack Developer",
      description: "Professional portfolio of Victor Galvão, a Full Stack Developer focused on Backend Development and Software Engineering student at UTFPR, with additional experience in cloud, infrastructure and observability.",
      ogLocale: "en_US",
      ogTitle: "Victor Galvão | Full Stack Developer",
      ogDescription: "Full Stack Developer focused on Backend Development, APIs, databases, integrations and production-minded cloud experience.",
      twitterTitle: "Victor Galvão | Full Stack Developer",
      twitterDescription: "Professional portfolio of Victor Galvão, a Full Stack Developer focused on Backend Development and Software Engineering student at UTFPR."
    },
    es: {
      title: "Victor Galvão | Desarrollador Full Stack",
      description: "Portafolio profesional de Victor Galvão, Desarrollador Full Stack con enfoque en Backend y estudiante de Ingeniería de Software en UTFPR, con experiencia adicional en cloud, infraestructura y observabilidad.",
      ogLocale: "es_ES",
      ogTitle: "Victor Galvão | Desarrollador Full Stack",
      ogDescription: "Desarrollador Full Stack con enfoque en Backend, APIs, bases de datos, integraciones y experiencia complementaria en cloud y producción.",
      twitterTitle: "Victor Galvão | Desarrollador Full Stack",
      twitterDescription: "Portafolio profesional de Victor Galvão, Desarrollador Full Stack con enfoque en Backend y estudiante de Ingeniería de Software en UTFPR."
    }
  };
  let scrollTicking = false;
  let lastDialogTrigger = null;
  let currentLanguage = defaultLanguage;
  const projectGalleryPreviewItems = new WeakMap();
  const projectCarouselStates = new WeakMap();
  const projectLightboxState = {
    title: "",
    items: [],
    index: 0
  };

  const isSupportedLanguage = (language) => supportedLanguages.includes(language);

  const t = (key, language = currentLanguage) => {
    return translations[language]?.[key] || translations[defaultLanguage]?.[key] || "";
  };

  const renderIcons = () => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  const setMetaContent = (selector, value) => {
    const element = document.querySelector(selector);
    if (element && value) {
      element.setAttribute("content", value);
    }
  };

  const applySeo = (language) => {
    const seo = seoTranslations[language] || seoTranslations[defaultLanguage];

    root.lang = language;
    document.title = seo.title;
    setMetaContent('meta[name="description"]', seo.description);
    setMetaContent('meta[property="og:locale"]', seo.ogLocale);
    setMetaContent('meta[property="og:title"]', seo.ogTitle);
    setMetaContent('meta[property="og:description"]', seo.ogDescription);
    setMetaContent('meta[name="twitter:title"]', seo.twitterTitle);
    setMetaContent('meta[name="twitter:description"]', seo.twitterDescription);
  };

  const applyTextTranslations = () => {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const value = t(key);

      if (value) {
        element.textContent = value;
      }
    });

    attributeTranslations.forEach(([dataAttribute, targetAttribute]) => {
      document.querySelectorAll(`[${dataAttribute}]`).forEach((element) => {
        const key = element.getAttribute(dataAttribute);
        const value = t(key);

        if (value) {
          element.setAttribute(targetAttribute, value);
        }
      });
    });
  };

  const updateMenuA11y = () => {
    if (!navToggle) return;

    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-label", t(isOpen ? "nav.closeMenu" : "nav.openMenu"));
  };

  const syncThemeToggle = () => {
    if (!themeToggle) return;

    const theme = root.dataset.theme || "light";
    const icon = theme === "dark" ? "moon" : "sun";
    const label = theme === "dark" ? t("theme.activateLight") : t("theme.activateDark");
    themeToggle.setAttribute("aria-label", label);
    themeToggle.innerHTML = `<i data-lucide="${icon}" aria-hidden="true"></i><span>${t("theme.label")}</span>`;
    renderIcons();
  };

  const syncLanguageControls = () => {
    const currentLabel = languageLabels[currentLanguage] || languageLabels[defaultLanguage];

    if (languageCurrent) {
      languageCurrent.textContent = currentLabel.short;
    }

    if (languageToggle) {
      languageToggle.setAttribute("aria-label", t("language.toggleAria").replace("{language}", currentLabel.name));
    }

    languageOptions.forEach((option) => {
      const language = option.getAttribute("data-language-option");
      const label = languageLabels[language];

      if (label) {
        option.textContent = label.name;
      }

      option.setAttribute("aria-checked", String(language === currentLanguage));
    });
  };

  const syncContactCopyText = () => {
    contactCopyButtons.forEach((button) => {
      const label = button.querySelector("[data-copy-text]");

      if (label) {
        label.textContent = button.classList.contains("is-copied") ? t("contactDialog.copied") : t("contactDialog.copy");
      }
    });

    if (contactCopyStatus?.dataset.statusKey) {
      contactCopyStatus.textContent = t(contactCopyStatus.dataset.statusKey);
    }
  };

  const splitDataList = (value) => {
    return (value || "")
      .split("|")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const formatTranslation = (key, replacements = {}) => {
    let value = t(key);

    Object.entries(replacements).forEach(([token, replacement]) => {
      value = value.split(`{${token}}`).join(String(replacement));
    });

    return value;
  };

  const getProjectItemAlt = (item) => {
    return item?.altKey ? t(item.altKey) : item?.alt || "";
  };

  const getProjectItemCaption = (item) => {
    return item?.captionKey ? t(item.captionKey) : item?.caption || "";
  };

  const setForcedLanguageHref = (link) => {
    const language = link.getAttribute("data-force-language");
    const href = link.getAttribute("href");
    if (!language || !href) return;

    try {
      const url = new URL(href, window.location.href);
      url.searchParams.set("lang", language);
      link.href = url.href;
    } catch {
      return null;
    }
  };

  const syncForcedLanguageLinks = () => {
    forcedLanguageLinks.forEach(setForcedLanguageHref);
  };

  const getProjectGalleryItems = (opener) => {
    const previewItems = projectGalleryPreviewItems.get(opener);

    if (previewItems?.length) {
      return previewItems;
    }

    const sources = splitDataList(opener.getAttribute("data-lightbox-sources") || opener.getAttribute("data-lightbox-src"));
    const altKeys = splitDataList(opener.getAttribute("data-lightbox-alt-keys"));
    const alts = splitDataList(opener.getAttribute("data-lightbox-alts"));
    const fallbackAlt = opener.getAttribute("data-lightbox-alt") || "";

    return sources.map((src, index) => ({
      src,
      altKey: altKeys[index] || "",
      alt: alts[index] || fallbackAlt
    }));
  };

  const getProjectLightboxCounterText = (index, total) => {
    return formatTranslation("lightbox.imageCounter", {
      current: index + 1,
      total
    });
  };

  const renderProjectLightbox = () => {
    const { items, index } = projectLightboxState;
    const total = items.length;
    const item = items[index];
    const hasMultipleImages = total > 1;

    if (!item || !projectLightboxImage) return;

    projectLightboxImage.src = item.src;
    projectLightboxImage.alt = getProjectItemAlt(item);

    if (projectLightboxCounter) {
      projectLightboxCounter.textContent = getProjectLightboxCounterText(index, total);
      projectLightboxCounter.hidden = !hasMultipleImages;
    }

    [projectLightboxPrev, projectLightboxNext].forEach((button) => {
      if (!button) return;
      button.hidden = !hasMultipleImages;
      button.disabled = !hasMultipleImages;
    });

    if (projectLightboxDots) {
      projectLightboxDots.hidden = !hasMultipleImages;
      projectLightboxDots.innerHTML = "";

      items.forEach((_, dotIndex) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "project-lightbox-dot";
        dot.setAttribute("aria-label", formatTranslation("lightbox.dotLabel", {
          current: dotIndex + 1,
          total
        }));
        dot.setAttribute("aria-current", String(dotIndex === index));
        dot.addEventListener("click", () => setProjectLightboxIndex(dotIndex));
        projectLightboxDots.append(dot);
      });
    }

    renderIcons();
  };

  const setProjectLightboxIndex = (index) => {
    const total = projectLightboxState.items.length;
    if (!total) return;

    projectLightboxState.index = (index + total) % total;
    renderProjectLightbox();
  };

  const moveProjectLightbox = (direction) => {
    setProjectLightboxIndex(projectLightboxState.index + direction);
  };

  const syncProjectLightboxText = () => {
    if (projectLightboxPrev) {
      projectLightboxPrev.setAttribute("aria-label", t("lightbox.previous"));
    }

    if (projectLightboxNext) {
      projectLightboxNext.setAttribute("aria-label", t("lightbox.next"));
    }

    if (projectLightboxDots) {
      projectLightboxDots.setAttribute("aria-label", t("lightbox.dotsLabel"));
    }

    if (projectLightboxTitle) {
      projectLightboxTitle.textContent = projectLightboxState.title || t("lightbox.defaultTitle");
    }

    if (projectLightboxState.items.length) {
      renderProjectLightbox();
    }
  };

  const openProjectGallery = (opener) => {
    const items = getProjectGalleryItems(opener);
    if (!items.length || !projectLightbox || !projectLightboxImage) return;

    projectLightboxState.title = opener.getAttribute("data-lightbox-title") || t("lightbox.defaultTitle");
    projectLightboxState.items = items;
    const requestedIndex = Number.parseInt(opener.getAttribute("data-lightbox-index") || "0", 10);
    projectLightboxState.index = Number.isFinite(requestedIndex)
      ? Math.min(Math.max(requestedIndex, 0), items.length - 1)
      : 0;

    syncProjectLightboxText();
    openManagedDialog(projectLightbox, opener);
  };

  const hydrateGalleryPreviews = () => {
    const galleryPreviews = Array.from(document.querySelectorAll("[data-gallery-preview]"));

    galleryPreviews.forEach((preview) => {
      const sources = splitDataList(preview.getAttribute("data-gallery-sources"));
      const altKeys = splitDataList(preview.getAttribute("data-gallery-alt-keys"));
      const opener = preview.querySelector("[data-project-lightbox-open]");

      if (!sources.length || !opener) return;

      opener.disabled = true;

      const loadingImages = sources.map((src, index) => new Promise((resolve) => {
        const image = new Image();
        image.decoding = "async";
        image.addEventListener("load", () => resolve({
          src,
          altKey: altKeys[index] || "",
          alt: ""
        }), { once: true });
        image.addEventListener("error", () => resolve(null), { once: true });
        image.src = src;
      }));

      Promise.all(loadingImages).then((items) => {
        const readyItems = items.filter(Boolean);

        if (!readyItems.length) {
          preview.classList.add("is-placeholder");
          return;
        }

        readyItems.slice(0, 3).forEach((item, index) => {
          const layer = preview.querySelector(`[data-gallery-layer="${index}"]`);

          if (layer) {
            layer.style.backgroundImage = `url("${item.src}")`;
            layer.setAttribute("data-loaded", "true");
          }
        });

        const placeholder = preview.querySelector(".project-preview-placeholder");
        if (placeholder) {
          placeholder.setAttribute("aria-hidden", "true");
        }

        projectGalleryPreviewItems.set(opener, readyItems);
        opener.disabled = false;
        preview.classList.add("has-image");
      });
    });
  };

  const getProjectCarouselElements = (preview) => ({
    image: preview.querySelector("[data-carousel-image]"),
    opener: preview.querySelector("[data-project-lightbox-open]"),
    prevButton: preview.querySelector("[data-carousel-prev]"),
    nextButton: preview.querySelector("[data-carousel-next]"),
    caption: preview.querySelector("[data-carousel-caption]"),
    dots: preview.querySelector("[data-carousel-dots]")
  });

  const renderProjectCarousel = (preview) => {
    const state = projectCarouselStates.get(preview);
    if (!state?.items.length) return;

    const { image, opener, prevButton, nextButton, caption, dots } = getProjectCarouselElements(preview);
    const total = state.items.length;
    const item = state.items[state.index];
    const hasMultipleImages = total > 1;

    if (!item || !image) return;

    image.src = item.src;
    image.alt = getProjectItemAlt(item);

    if (opener) {
      opener.disabled = false;
      opener.setAttribute("data-lightbox-index", String(state.index));
    }

    [prevButton, nextButton].forEach((button) => {
      if (!button) return;
      button.hidden = !hasMultipleImages;
      button.disabled = !hasMultipleImages;
    });

    if (caption) {
      const captionText = getProjectItemCaption(item);
      caption.textContent = captionText;
      caption.hidden = !captionText;
    }

    if (dots) {
      const dotLabelKey = preview.getAttribute("data-carousel-dot-label-key") || "lightbox.dotLabel";

      dots.hidden = !hasMultipleImages;
      dots.innerHTML = "";

      if (hasMultipleImages) {
        state.items.forEach((_, dotIndex) => {
          const dot = document.createElement("button");
          dot.type = "button";
          dot.className = "project-carousel-dot";
          dot.setAttribute("aria-label", formatTranslation(dotLabelKey, {
            current: dotIndex + 1,
            total
          }));
          dot.setAttribute("aria-current", String(dotIndex === state.index));
          dot.addEventListener("click", () => setProjectCarouselIndex(preview, dotIndex));
          dots.append(dot);
        });
      }
    }
  };

  const setProjectCarouselIndex = (preview, index) => {
    const state = projectCarouselStates.get(preview);
    if (!state?.items.length) return;

    const total = state.items.length;
    state.index = (index + total) % total;
    renderProjectCarousel(preview);
  };

  const moveProjectCarousel = (preview, direction) => {
    const state = projectCarouselStates.get(preview);
    if (!state?.items.length) return;

    setProjectCarouselIndex(preview, state.index + direction);
  };

  const syncCarouselText = () => {
    document.querySelectorAll("[data-carousel-preview]").forEach((preview) => {
      renderProjectCarousel(preview);
    });
  };

  const hydrateCarouselPreviews = () => {
    const carouselPreviews = Array.from(document.querySelectorAll("[data-carousel-preview]"));

    carouselPreviews.forEach((preview) => {
      const sources = splitDataList(preview.getAttribute("data-gallery-sources"));
      const altKeys = splitDataList(preview.getAttribute("data-gallery-alt-keys"));
      const captionKeys = splitDataList(preview.getAttribute("data-gallery-caption-keys"));
      const { image, opener, prevButton, nextButton, caption, dots } = getProjectCarouselElements(preview);

      if (!sources.length || !image) return;

      [opener, prevButton, nextButton].forEach((button) => {
        if (button) {
          button.disabled = true;
        }
      });

      [prevButton, nextButton].forEach((button) => {
        if (button) {
          button.hidden = true;
        }
      });

      if (caption) {
        caption.hidden = true;
      }

      if (dots) {
        dots.hidden = true;
      }

      const loadingImages = sources.map((src, index) => new Promise((resolve) => {
        const previewImage = new Image();
        previewImage.decoding = "async";
        previewImage.addEventListener("load", () => resolve({
          src,
          altKey: altKeys[index] || "",
          alt: "",
          captionKey: captionKeys[index] || ""
        }), { once: true });
        previewImage.addEventListener("error", () => resolve(null), { once: true });
        previewImage.src = src;
      }));

      Promise.all(loadingImages).then((items) => {
        const readyItems = items.filter(Boolean);

        if (!readyItems.length) {
          preview.classList.add("is-placeholder");
          return;
        }

        const placeholder = preview.querySelector(".project-preview-placeholder");
        if (placeholder) {
          placeholder.setAttribute("aria-hidden", "true");
        }

        projectCarouselStates.set(preview, {
          items: readyItems,
          index: 0,
          pointerStartX: null,
          pointerStartY: null
        });

        if (opener) {
          projectGalleryPreviewItems.set(opener, readyItems);
        }

        preview.classList.add("has-image");
        renderProjectCarousel(preview);
      });

      if (prevButton) {
        prevButton.addEventListener("click", () => moveProjectCarousel(preview, -1));
      }

      if (nextButton) {
        nextButton.addEventListener("click", () => moveProjectCarousel(preview, 1));
      }

      preview.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          moveProjectCarousel(preview, -1);
        }

        if (event.key === "ArrowRight") {
          event.preventDefault();
          moveProjectCarousel(preview, 1);
        }
      });

      preview.addEventListener("pointerdown", (event) => {
        const state = projectCarouselStates.get(preview);
        if (!state || event.pointerType === "mouse") return;

        state.pointerStartX = event.clientX;
        state.pointerStartY = event.clientY;
      }, { passive: true });

      preview.addEventListener("pointerup", (event) => {
        const state = projectCarouselStates.get(preview);
        if (!state || state.pointerStartX === null || state.pointerStartY === null || event.pointerType === "mouse") {
          return;
        }

        const deltaX = event.clientX - state.pointerStartX;
        const deltaY = event.clientY - state.pointerStartY;
        state.pointerStartX = null;
        state.pointerStartY = null;

        if (Math.abs(deltaX) > 42 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
          moveProjectCarousel(preview, deltaX < 0 ? 1 : -1);
        }
      }, { passive: true });
    });
  };

  const getStoredLanguage = () => {
    try {
      const language = window.localStorage.getItem(languageStorageKey);
      return isSupportedLanguage(language) ? language : null;
    } catch {
      return null;
    }
  };

  const storeLanguage = (language) => {
    try {
      window.localStorage.setItem(languageStorageKey, language);
    } catch {
      return null;
    }
  };

  const getUrlLanguage = () => {
    const params = new URLSearchParams(window.location.search);
    const language = params.get("lang");
    return isSupportedLanguage(language) ? language : null;
  };

  const getInitialLanguage = () => {
    return getUrlLanguage() || getStoredLanguage() || defaultLanguage;
  };

  const getCurrentSectionHash = () => {
    if (window.location.hash) {
      return window.location.hash;
    }

    const activeLink = navLinks.find((link) => link.classList.contains("active"));
    return activeLink?.getAttribute("href") || "";
  };

  const updateLanguageUrl = (language) => {
    const url = new URL(window.location.href);
    const hash = getCurrentSectionHash();

    url.searchParams.set("lang", language);

    if (hash.startsWith("#")) {
      url.hash = hash;
    }

    window.history.replaceState({}, "", url);
  };

  const applyLanguage = (language, options = {}) => {
    const nextLanguage = isSupportedLanguage(language) ? language : defaultLanguage;
    currentLanguage = nextLanguage;

    applySeo(nextLanguage);
    applyTextTranslations();
    syncThemeToggle();
    syncLanguageControls();
    syncContactCopyText();
    syncProjectLightboxText();
    syncCarouselText();
    syncForcedLanguageLinks();
    updateMenuA11y();

    if (options.persist) {
      storeLanguage(nextLanguage);
    }

    if (options.updateUrl) {
      updateLanguageUrl(nextLanguage);
    }
  };

  const closeLanguageMenu = () => {
    if (!languageSwitcher || !languageToggle) return;

    languageSwitcher.classList.remove("is-open");
    languageToggle.setAttribute("aria-expanded", "false");
  };

  const openLanguageMenu = (focusSelected = false) => {
    if (!languageSwitcher || !languageToggle) return;

    languageSwitcher.classList.add("is-open");
    languageToggle.setAttribute("aria-expanded", "true");

    if (focusSelected) {
      const selectedOption = languageOptions.find((option) => option.getAttribute("data-language-option") === currentLanguage);
      window.requestAnimationFrame(() => {
        (selectedOption || languageOptions[0])?.focus({ preventScroll: true });
      });
    }
  };

  const toggleLanguageMenu = () => {
    const isOpen = languageToggle?.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeLanguageMenu();
    } else {
      openLanguageMenu(false);
    }
  };

  const focusLanguageOption = (currentIndex, direction) => {
    if (!languageOptions.length) return;

    const nextIndex = (currentIndex + direction + languageOptions.length) % languageOptions.length;
    languageOptions[nextIndex].focus({ preventScroll: true });
  };

  const hydrateProjectPreviews = () => {
    const previews = Array.from(document.querySelectorAll("[data-preview-src][data-preview-ready='true']:not(.has-image)"));

    previews.forEach((preview) => {
      const src = preview.getAttribute("data-preview-src");
      if (!src) return;

      const image = new Image();
      image.className = "project-preview-image";
      image.alt = preview.getAttribute("data-preview-alt") || "";
      image.decoding = "async";

      image.addEventListener("load", () => {
        const placeholder = preview.querySelector(".project-preview-placeholder");
        if (placeholder) {
          placeholder.setAttribute("aria-hidden", "true");
        }

        window.requestAnimationFrame(() => {
          preview.classList.add("has-image");
        });
      }, { once: true });

      image.addEventListener("error", () => {
        image.remove();
        preview.classList.add("is-placeholder");
      }, { once: true });

      preview.prepend(image);
      image.src = src;
    });
  };

  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  const closeMenu = () => {
    if (!navToggle || !navPanel || !header) return;
    navToggle.setAttribute("aria-expanded", "false");
    navPanel.classList.remove("is-open");
    header.classList.remove("menu-visible");
    document.body.classList.remove("menu-open");
    updateMenuA11y();
  };

  const toggleMenu = () => {
    if (!navToggle || !navPanel || !header) return;
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navPanel.classList.toggle("is-open", !isOpen);
    header.classList.toggle("menu-visible", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
    updateMenuA11y();
  };

  const syncDialogBodyState = () => {
    const hasOpenDialog = Boolean(document.querySelector(".portfolio-dialog[open]"));
    document.body.classList.toggle("dialog-open", hasOpenDialog);
  };

  const restoreDialogFocus = () => {
    syncDialogBodyState();

    const trigger = lastDialogTrigger;
    lastDialogTrigger = null;

    if (trigger && typeof trigger.focus === "function" && document.contains(trigger)) {
      trigger.focus({ preventScroll: true });
      window.requestAnimationFrame(() => {
        if (document.contains(trigger)) {
          trigger.focus({ preventScroll: true });
        }
      });
    }
  };

  const openManagedDialog = (dialog, trigger) => {
    if (!dialog) return;

    lastDialogTrigger = trigger || document.activeElement;

    if (typeof dialog.showModal === "function") {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      dialog.setAttribute("open", "");
      dialog.setAttribute("role", "dialog");
      dialog.setAttribute("aria-modal", "true");
    }

    syncDialogBodyState();

    const focusTarget = dialog.querySelector("[data-dialog-initial]") || dialog.querySelector(focusableSelector);
    if (focusTarget && typeof focusTarget.focus === "function") {
      window.requestAnimationFrame(() => focusTarget.focus({ preventScroll: true }));
    }
  };

  const closeManagedDialog = (dialog) => {
    if (!dialog || !dialog.open) return;

    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
      restoreDialogFocus();
    }
  };

  const bindBackdropClose = (dialog) => {
    if (!dialog) return;

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        closeManagedDialog(dialog);
      }
    });

    dialog.addEventListener("close", restoreDialogFocus);
  };

  const resetContactCopyState = () => {
    if (contactCopyStatus) {
      contactCopyStatus.textContent = "";
      delete contactCopyStatus.dataset.statusKey;
    }

    contactCopyButtons.forEach((button) => {
      button.classList.remove("is-copied");
      const label = button.querySelector("[data-copy-text]");
      if (label) {
        label.textContent = t("contactDialog.copy");
      }
    });
  };

  const setContactCopyState = (messageKey, copied = false) => {
    if (contactCopyStatus) {
      contactCopyStatus.dataset.statusKey = messageKey;
      contactCopyStatus.textContent = t(messageKey);
    }

    contactCopyButtons.forEach((button) => {
      button.classList.toggle("is-copied", copied);
      const label = button.querySelector("[data-copy-text]");
      if (label) {
        label.textContent = copied ? t("contactDialog.copied") : t("contactDialog.copy");
      }
    });
  };

  const copyTextFallback = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    textarea.style.opacity = "0";

    document.body.append(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();

    return copied;
  };

  const copyContactEmail = async (button) => {
    const email = button.getAttribute("data-copy-email");
    if (!email) return;

    let copied = false;

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(email);
        copied = true;
      } catch {
        copied = false;
      }
    }

    if (!copied) {
      try {
        copied = copyTextFallback(email);
      } catch {
        copied = false;
      }
    }

    if (copied) {
      setContactCopyState("contactDialog.copySuccess", true);
    } else {
      setContactCopyState("contactDialog.copyError", false);
    }
  };

  const updateActiveLink = (id) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const updateActiveSection = () => {
    if (!sections.length) return;
    const offset = window.innerHeight < 720 ? 120 : 160;
    let current = sections[0].id;

    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= offset) {
        current = section.id;
      }
    });

    updateActiveLink(current);
  };

  const handleScroll = () => {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(() => {
      setHeaderState();
      updateActiveSection();
      scrollTicking = false;
    });
  };

  const getStoredTheme = () => {
    try {
      return window.localStorage.getItem("victor-portfolio-theme");
    } catch {
      return null;
    }
  };

  const storeTheme = (theme) => {
    try {
      window.localStorage.setItem("victor-portfolio-theme", theme);
    } catch {
      return null;
    }
  };

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    syncThemeToggle();
  };

  const initialTheme = getStoredTheme() || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyLanguage(getInitialLanguage());
  applyTheme(initialTheme);

  if (yearSlot) {
    yearSlot.textContent = String(new Date().getFullYear());
  }

  if (languageToggle) {
    languageToggle.addEventListener("click", toggleLanguageMenu);
    languageToggle.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        openLanguageMenu(true);
      }
    });
  }

  languageOptions.forEach((option, index) => {
    option.addEventListener("click", () => {
      const language = option.getAttribute("data-language-option");
      applyLanguage(language, { persist: true, updateUrl: true });
      closeLanguageMenu();
      languageToggle?.focus({ preventScroll: true });
    });

    option.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        focusLanguageOption(index, 1);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        focusLanguageOption(index, -1);
      }

      if (event.key === "Escape") {
        event.preventDefault();
        closeLanguageMenu();
        languageToggle?.focus({ preventScroll: true });
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (languageSwitcher && !languageSwitcher.contains(event.target)) {
      closeLanguageMenu();
    }
  });

  if (navToggle) {
    navToggle.addEventListener("click", toggleMenu);
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      storeTheme(nextTheme);
    });
  }

  resumeOpeners.forEach((opener) => {
    opener.addEventListener("click", () => {
      closeMenu();
      openManagedDialog(resumeDialog, opener);
    });
  });

  resumeClosers.forEach((closer) => {
    closer.addEventListener("click", () => closeManagedDialog(resumeDialog));
  });

  contactOpeners.forEach((opener) => {
    opener.addEventListener("click", () => {
      closeMenu();
      resetContactCopyState();
      openManagedDialog(contactDialog, opener);
    });
  });

  contactClosers.forEach((closer) => {
    closer.addEventListener("click", () => closeManagedDialog(contactDialog));
  });

  contactCopyButtons.forEach((button) => {
    button.addEventListener("click", () => copyContactEmail(button));
  });

  forcedLanguageLinks.forEach((link) => {
    link.addEventListener("click", () => setForcedLanguageHref(link));
  });

  projectLightboxOpeners.forEach((opener) => {
    opener.addEventListener("click", () => openProjectGallery(opener));
  });

  projectLightboxClosers.forEach((closer) => {
    closer.addEventListener("click", () => closeManagedDialog(projectLightbox));
  });

  if (projectLightboxPrev) {
    projectLightboxPrev.addEventListener("click", () => moveProjectLightbox(-1));
  }

  if (projectLightboxNext) {
    projectLightboxNext.addEventListener("click", () => moveProjectLightbox(1));
  }

  bindBackdropClose(resumeDialog);
  bindBackdropClose(contactDialog);
  bindBackdropClose(projectLightbox);

  if (contactDialog) {
    contactDialog.addEventListener("close", resetContactCopyState);
  }

  if (projectLightbox) {
    projectLightbox.addEventListener("close", () => {
      if (projectLightboxImage) {
        projectLightboxImage.removeAttribute("src");
        projectLightboxImage.alt = "";
      }

      if (projectLightboxCounter) {
        projectLightboxCounter.textContent = "";
      }

      if (projectLightboxDots) {
        projectLightboxDots.innerHTML = "";
      }

      projectLightboxState.title = "";
      projectLightboxState.items = [];
      projectLightboxState.index = 0;

      if (projectLightboxTitle) {
        projectLightboxTitle.textContent = t("lightbox.defaultTitle");
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (projectLightbox?.open) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveProjectLightbox(-1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveProjectLightbox(1);
      }
    }

    if (event.key === "Escape") {
      closeLanguageMenu();
      closeMenu();
      closeManagedDialog(resumeDialog);
      closeManagedDialog(contactDialog);
      closeManagedDialog(projectLightbox);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
      closeMenu();
    }
    updateActiveSection();
  });

  window.addEventListener("scroll", handleScroll, { passive: true });
  setHeaderState();
  updateActiveSection();
  hydrateProjectPreviews();
  hydrateGalleryPreviews();
  hydrateCarouselPreviews();

  const revealItems = Array.from(document.querySelectorAll(".reveal"));
  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.12
    });

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });
  }

  renderIcons();
});
