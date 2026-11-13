/* ==========================================================================
   Prerna Goswami — Portfolio Interactive Scripts (Vanilla JavaScript)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileDrawer();
  initSmoothScrolling();
  initHeroTyping();
  initScrollReveal();
  initProjectFilters();
  initSkillSyncGallery();
  initProjectPreviews();
  initCaseStudies();
  initCopyEmail();
  initContactForm();
  initBackToTop();
  initProfileFallback();
  updateFooterYear();
});

/* --------------------------------------------------------------------------
   1. Sticky Header & Active Section Scroll-Spy
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('.nav-desktop .nav-link');
  const sections = document.querySelectorAll('main section[id]');

  const onScroll = () => {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 24);
    }

    let currentId = '';
    const offset = 130;
    sections.forEach((section) => {
      const top = section.offsetTop - offset;
      const height = section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const hrefId = link.getAttribute('href')?.replace('#', '');
      link.classList.toggle('active', hrefId === currentId);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --------------------------------------------------------------------------
   2. Responsive Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  if (!menuBtn || !drawer) return;

  const closeDrawer = () => {
    drawer.hidden = true;
    menuBtn.setAttribute('aria-expanded', 'false');
  };

  menuBtn.addEventListener('click', () => {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    drawer.hidden = isExpanded;
    menuBtn.setAttribute('aria-expanded', String(!isExpanded));
  });

  drawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 680) closeDrawer();
  });
}

/* --------------------------------------------------------------------------
   2b. Smooth Scrolling for In-Page Anchor Links
   -------------------------------------------------------------------------- */
function initSmoothScrolling() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetSelector = anchor.getAttribute('href');
      if (!targetSelector || targetSelector === '#') return;
      const target = document.querySelector(targetSelector);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: prefersReduced ? 'auto' : 'smooth',
        block: 'start'
      });
    });
  });
}

/* --------------------------------------------------------------------------
   2c. Hero Animated Typing Text
   -------------------------------------------------------------------------- */
function initHeroTyping() {
  const el = document.getElementById('hero-typing');
  if (!el) return;

  const phrases = ['CSE Student', 'Aspiring Developer', 'UI/UX Enthusiast'];
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    el.textContent = phrases.join(' · ');
    return;
  }

  let phraseIndex = 0;
  let charIndex = phrases[0].length;
  let isDeleting = true;

  const tick = () => {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      charIndex -= 1;
      el.textContent = currentPhrase.slice(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, 320);
        return;
      }
      setTimeout(tick, 45);
    } else {
      charIndex += 1;
      el.textContent = currentPhrase.slice(0, charIndex);
      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(tick, 1750);
        return;
      }
      setTimeout(tick, 80);
    }
  };

  setTimeout(tick, 1600);
}

/* --------------------------------------------------------------------------
   3. Subtle Scroll Reveal Animations
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || !('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------------
   6b. Interactive Project Category Filters
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');
  const emptyNotice = document.getElementById('projects-empty');
  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-filter') || 'all';

      filterButtons.forEach((item) => {
        const isActive = item === btn;
        item.classList.toggle('active', isActive);
        item.setAttribute('aria-selected', String(isActive));
      });

      let visibleCount = 0;
      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        const matches = selected === 'all' || category === selected;
        card.hidden = !matches;
        if (matches) {
          card.classList.add('is-visible');
          visibleCount += 1;
        }
      });

      if (emptyNotice) {
        emptyNotice.hidden = visibleCount > 0;
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7a. Interactive SkillSync 11-Screen Gallery & Lightbox Modal
   -------------------------------------------------------------------------- */
function initSkillSyncGallery() {
  const thumbButtons = Array.from(document.querySelectorAll('.ss-thumb-btn[data-ss-index]'));
  const mainImg = document.getElementById('ss-gallery-main');
  const mainTitle = document.getElementById('ss-gallery-title');
  const mainSubtitle = document.getElementById('ss-gallery-subtitle');
  const mainCounter = document.getElementById('ss-gallery-counter');
  const expandBtn = document.getElementById('ss-gallery-expand');
  const stageTrigger = document.getElementById('ss-stage-trigger');

  const lightbox = document.getElementById('ss-lightbox');
  const lbImg = document.getElementById('ss-lightbox-img');
  const lbTitle = document.getElementById('ss-lightbox-title');
  const lbDesc = document.getElementById('ss-lightbox-desc');
  const lbCounter = document.getElementById('ss-lightbox-counter');
  const lbPrev = document.getElementById('ss-lightbox-prev');
  const lbNext = document.getElementById('ss-lightbox-next');
  const lbClose = document.getElementById('ss-lightbox-close');

  if (!thumbButtons.length || !mainImg) return;

  const total = thumbButtons.length;
  let activeIndex = 0;
  let lastTriggerEl = null;

  const getSlideData = (index) => {
    const safeIndex = ((index % total) + total) % total;
    const btn = thumbButtons[safeIndex];
    return {
      index: safeIndex,
      src: btn.getAttribute('data-ss-src') || '',
      title: btn.getAttribute('data-ss-title') || '',
      desc: btn.getAttribute('data-ss-desc') || ''
    };
  };

  const renderGallery = (index) => {
    const slide = getSlideData(index);
    activeIndex = slide.index;

    mainImg.src = slide.src;
    mainImg.alt = `SkillSync ${slide.title} screen preview`;
    if (mainTitle) mainTitle.textContent = slide.title;
    if (mainSubtitle) mainSubtitle.textContent = slide.desc;
    if (mainCounter) mainCounter.textContent = `${activeIndex + 1} / ${total}`;

    thumbButtons.forEach((btn, idx) => {
      const isSelected = idx === activeIndex;
      btn.classList.toggle('active', isSelected);
      btn.setAttribute('aria-pressed', String(isSelected));
    });

    if (lightbox && !lightbox.hidden && lbImg) {
      lbImg.src = slide.src;
      lbImg.alt = `SkillSync ${slide.title} full screen preview`;
      if (lbTitle) lbTitle.textContent = slide.title;
      if (lbDesc) lbDesc.textContent = slide.desc;
      if (lbCounter) lbCounter.textContent = `${activeIndex + 1} / ${total}`;
    }
  };

  thumbButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      renderGallery(idx);
    });
  });

  const openLightbox = (triggerEl) => {
    if (!lightbox || !lbImg) return;
    lastTriggerEl = triggerEl || document.activeElement;
    const slide = getSlideData(activeIndex);
    lbImg.src = slide.src;
    lbImg.alt = `SkillSync ${slide.title} full screen preview`;
    if (lbTitle) lbTitle.textContent = slide.title;
    if (lbDesc) lbDesc.textContent = slide.desc;
    if (lbCounter) lbCounter.textContent = `${activeIndex + 1} / ${total}`;

    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    if (lbClose) lbClose.focus();
  };

  const closeLightbox = () => {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    document.body.style.overflow = '';
    if (lastTriggerEl && typeof lastTriggerEl.focus === 'function') {
      lastTriggerEl.focus();
    }
  };

  if (expandBtn) {
    expandBtn.addEventListener('click', () => openLightbox(expandBtn));
  }
  if (stageTrigger) {
    stageTrigger.addEventListener('click', () => openLightbox(stageTrigger));
  }
  if (lbPrev) {
    lbPrev.addEventListener('click', () => renderGallery(activeIndex - 1));
  }
  if (lbNext) {
    lbNext.addEventListener('click', () => renderGallery(activeIndex + 1));
  }
  if (lbClose) {
    lbClose.addEventListener('click', closeLightbox);
  }
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox || lightbox.hidden) return;
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      renderGallery(activeIndex - 1);
    } else if (e.key === 'ArrowRight') {
      renderGallery(activeIndex + 1);
    }
  });
}

/* --------------------------------------------------------------------------
   7. Interactive Mini-Previews Inside Project Cards
   -------------------------------------------------------------------------- */
function initProjectPreviews() {
  // LifeArchive category filter tabs inside preview frame
  const laTabs = document.querySelectorAll('[data-la-filter]');
  const laEntries = document.querySelectorAll('[data-la-cat]');
  laTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-la-filter');
      laTabs.forEach((t) => t.classList.toggle('active', t === tab));
      laEntries.forEach((entry) => {
        const cat = entry.getAttribute('data-la-cat');
        entry.hidden = filter !== 'all' && cat !== filter;
      });
    });
  });

  // BiteVerse mini cart counter inside preview frame
  const cartCountEl = document.getElementById('bv-cart-count');
  const addButtons = document.querySelectorAll('.bv-add-btn');
  let cartCount = 0;

  addButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      cartCount += 1;
      if (cartCountEl) cartCountEl.textContent = String(cartCount);
      const original = btn.textContent;
      btn.textContent = 'Added';
      setTimeout(() => {
        btn.textContent = original;
      }, 900);
    });
  });
}

/* --------------------------------------------------------------------------
   8. Expandable Project Case Studies
   -------------------------------------------------------------------------- */
function initCaseStudies() {
  const caseToggles = document.querySelectorAll('.case-study-toggle');
  const backButtons = document.querySelectorAll('.case-study-back-btn');

  const openCasePanel = (panel, toggleBtn) => {
    panel.hidden = false;
    panel.classList.remove('is-open');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        panel.classList.add('is-open');
      });
    });

    if (toggleBtn) {
      toggleBtn.setAttribute('aria-expanded', 'true');
      const label = toggleBtn.querySelector('span');
      if (label) label.textContent = 'Hide Case Study';
    }

    const headerOffset = 92;
    const panelTop = panel.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: panelTop, behavior: 'smooth' });
  };

  const closeCasePanel = (panel, toggleBtn, scrollToProjects) => {
    panel.classList.remove('is-open');
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      const label = toggleBtn.querySelector('span');
      if (label) label.textContent = 'View Case Study';
    }

    setTimeout(() => {
      if (!panel.classList.contains('is-open')) {
        panel.hidden = true;
      }
    }, 260);

    if (scrollToProjects) {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        const top = projectsSection.getBoundingClientRect().top + window.scrollY - 76;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  caseToggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('aria-controls');
      const panel = targetId ? document.getElementById(targetId) : null;
      if (!panel) return;

      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeCasePanel(panel, btn, false);
      } else {
        openCasePanel(panel, btn);
      }
    });
  });

  backButtons.forEach((backBtn) => {
    backBtn.addEventListener('click', () => {
      const targetId = backBtn.getAttribute('data-case-close');
      const panel = targetId ? document.getElementById(targetId) : null;
      const toggleBtn = targetId
        ? document.querySelector(`.case-study-toggle[aria-controls="${targetId}"]`)
        : null;

      if (panel) {
        closeCasePanel(panel, toggleBtn, true);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   9. Copy Email Address with Success Notification Toast
   -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const copyText = document.getElementById('copy-email-text');
  const toast = document.getElementById('copy-toast');
  const email = 'prernaagoswami@gmail.com';
  if (!copyBtn || !copyText) return;

  let toastTimer = null;

  const showToast = () => {
    if (!toast) return;
    clearTimeout(toastTimer);
    toast.hidden = false;
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (!toast.classList.contains('show')) {
          toast.hidden = true;
        }
      }, 240);
    }, 2500);
  };

  copyBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const temp = document.createElement('textarea');
        temp.value = email;
        temp.style.position = 'fixed';
        temp.style.opacity = '0';
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      }
      copyText.textContent = 'Copied!';
      showToast();
      setTimeout(() => {
        copyText.textContent = 'Copy Email';
      }, 2500);
    } catch {
      copyText.textContent = email;
    }
  });
}

/* --------------------------------------------------------------------------
   10. Contact Form Validation & Submission Feedback
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');
  const submitBtn = document.getElementById('form-submit-btn');
  if (!form || !statusEl || !submitBtn) return;

  const showStatus = (message, type) => {
    statusEl.textContent = message;
    statusEl.className = `form-status ${type}`;
    statusEl.hidden = false;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#contact-name').value.trim();
    const email = form.querySelector('#contact-email').value.trim();
    const subject = form.querySelector('#contact-subject').value.trim();
    const message = form.querySelector('#contact-message').value.trim();

    if (!name || !email || !message) {
      showStatus('Please fill in your name, email address, and message.', 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showStatus('Please enter a valid email address.', 'error');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Preparing...';

    const mailSubject = encodeURIComponent(subject || `Portfolio Inquiry from ${name}`);
    const mailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    const mailtoHref = `mailto:prernaagoswami@gmail.com?subject=${mailSubject}&body=${mailBody}`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.querySelector('span').textContent = 'Send Message';
      form.reset();
      showStatus(
        'Thank you for reaching out! Your message is ready — opening your email client or reach me directly at prernaagoswami@gmail.com.',
        'success'
      );
      window.location.href = mailtoHref;
    }, 450);
  });
}

/* --------------------------------------------------------------------------
   11. Back-to-Top Button & Profile Fallback & Year
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  const toggleVisibility = () => {
    btn.classList.toggle('visible', window.scrollY > 360);
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  toggleVisibility();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initProfileFallback() {
  const img = document.getElementById('profile-img');
  const fallback = document.getElementById('profile-fallback');
  if (!img || !fallback) return;

  img.addEventListener('error', () => {
    img.hidden = true;
    fallback.hidden = false;
  });
}

function updateFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}
