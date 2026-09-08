document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const header = document.querySelector("[data-header]");
  const navToggle = document.querySelector(".nav-toggle");
  const navPanel = document.querySelector(".nav-panel");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const themeToggle = document.querySelector("[data-theme-toggle]");
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
  const projectLightboxOpeners = Array.from(document.querySelectorAll("[data-project-lightbox-open]"));
  const projectLightboxClosers = Array.from(document.querySelectorAll("[data-project-lightbox-close]"));
  const focusableSelector = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "object",
    "[tabindex]:not([tabindex='-1'])"
  ].join(",");
  let scrollTicking = false;
  let lastDialogTrigger = null;

  const renderIcons = () => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
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
  };

  const toggleMenu = () => {
    if (!navToggle || !navPanel || !header) return;
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navPanel.classList.toggle("is-open", !isOpen);
    header.classList.toggle("menu-visible", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
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
    }

    contactCopyButtons.forEach((button) => {
      button.classList.remove("is-copied");
      const label = button.querySelector("[data-copy-text]");
      if (label) {
        label.textContent = "Copiar";
      }
    });
  };

  const setContactCopyState = (message, copied = false) => {
    if (contactCopyStatus) {
      contactCopyStatus.textContent = message;
    }

    contactCopyButtons.forEach((button) => {
      button.classList.toggle("is-copied", copied);
      const label = button.querySelector("[data-copy-text]");
      if (label) {
        label.textContent = copied ? "Copiado" : "Copiar";
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
      setContactCopyState("E-mail copiado para a área de transferência.", true);
    } else {
      setContactCopyState("Não foi possível copiar automaticamente. Selecione o e-mail acima.", false);
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
    if (!themeToggle) return;
    const label = theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro";
    themeToggle.setAttribute("aria-label", label);
    themeToggle.innerHTML = `<i data-lucide="${theme === "dark" ? "moon" : "sun"}" aria-hidden="true"></i><span>Tema</span>`;
    renderIcons();
  };

  const initialTheme = getStoredTheme() || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(initialTheme);

  if (yearSlot) {
    yearSlot.textContent = String(new Date().getFullYear());
  }

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

  projectLightboxOpeners.forEach((opener) => {
    opener.addEventListener("click", () => {
      const src = opener.getAttribute("data-lightbox-src");
      if (!src || !projectLightbox || !projectLightboxImage) return;

      const title = opener.getAttribute("data-lightbox-title") || "Preview do projeto";
      const alt = opener.getAttribute("data-lightbox-alt") || "";

      if (projectLightboxTitle) {
        projectLightboxTitle.textContent = title;
      }

      projectLightboxImage.src = src;
      projectLightboxImage.alt = alt;
      openManagedDialog(projectLightbox, opener);
    });
  });

  projectLightboxClosers.forEach((closer) => {
    closer.addEventListener("click", () => closeManagedDialog(projectLightbox));
  });

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
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
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
