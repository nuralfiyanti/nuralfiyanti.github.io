const linkProyek = {
  gayaku: {
    repo: "",
    screenshot: "assets/Tampilan Mobile App Halaman Dashboard.png"
  },
  evently: {
    repo: "",
    demo: "",
    screenshot: "assets/Tampilan Kamera Sedang Memindai QR Code Tamu.png"
  },
  lab: {
    repo: "",
    demo: "",
    screenshot: "assets/LandingPageLabDT.png"
  }
};

const dokumentasi = [
  { src: "assets/Kominfo.jpeg", alt: "Dokumentasi Staf Ahli Divisi Kominfo FORMADIKSI POLINEMA" }
];

const prestasi = [
  { judul: "", keterangan: "", tahun: "" }
];

const sertifikat = [
  { judul: "Peserta Webinar Pemanfaatan Teknologi dalam Peningkatan Daya Saing Kerja di Dunia Global", penyelenggara: "Play IT, Jurusan Teknologi Informasi Polinema", tahun: "2026", file: "assets/Sertifikat3.pdf" },
  { judul: "Intro to Software Engineering (Coding Camp)", penyelenggara: "RevoU", tahun: "2026", file: "assets/Sertifikat4.pdf" },
  { judul: "Panitia Sarasehan dan Lomba Program Kreativitas Mahasiswa KIP Kuliah", penyelenggara: "FORMADIKSI Polinema", tahun: "2025", file: "assets/Sertifikat2.pdf" },
  { judul: "Panitia Sambut dan Motivasi Mahasiswa Baru KIP Kuliah", penyelenggara: "FORMADIKSI Polinema", tahun: "2025", file: "assets/Sertifikat1.pdf" }
];

const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const currentYear = document.getElementById('current-year');
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const modalCaption = document.getElementById('modal-caption');
const modalClose = document.getElementById('modal-close');
const modalOverlay = document.getElementById('modal-overlay');
const modalPrev = document.getElementById('modal-prev');
const modalNext = document.getElementById('modal-next');

let currentModalGallery = [];
let currentModalIndex = 0;

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });
}

const updateModalView = () => {
  if (!currentModalGallery || currentModalGallery.length === 0) return;
  const item = currentModalGallery[currentModalIndex];
  modalImg.src = item.src || '';
  modalImg.alt = item.alt || item.judul || '';
  if (modalCaption) {
    modalCaption.textContent = item.caption || item.judul || item.alt || '';
  }

  if (modalPrev && modalNext) {
    if (currentModalGallery.length > 1) {
      modalPrev.style.display = 'flex';
      modalNext.style.display = 'flex';
    } else {
      modalPrev.style.display = 'none';
      modalNext.style.display = 'none';
    }
  }
};

const openModal = (items, index = 0, captionText = '') => {
  if (!modal || !modalImg) return;
  if (typeof items === 'string') {
    const text = typeof index === 'string' ? index : captionText;
    currentModalGallery = [{ src: items, alt: text, caption: text }];
    currentModalIndex = 0;
  } else if (Array.isArray(items)) {
    currentModalGallery = items;
    currentModalIndex = typeof index === 'number' ? index : 0;
  } else {
    return;
  }

  updateModalView();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
};

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  if (modalImg) modalImg.src = '';
};

const nextModalImage = () => {
  if (currentModalGallery.length <= 1) return;
  currentModalIndex = (currentModalIndex + 1) % currentModalGallery.length;
  updateModalView();
};

const prevModalImage = () => {
  if (currentModalGallery.length <= 1) return;
  currentModalIndex = (currentModalIndex - 1 + currentModalGallery.length) % currentModalGallery.length;
  updateModalView();
};

if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
if (modalNext) modalNext.addEventListener('click', nextModalImage);
if (modalPrev) modalPrev.addEventListener('click', prevModalImage);

window.addEventListener('keydown', (e) => {
  if (modal && modal.classList.contains('open')) {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') nextModalImage();
    if (e.key === 'ArrowLeft') prevModalImage();
  }
});

const renderProjectButtons = () => {
  const configs = [
    { id: 'links-gayaku', data: linkProyek.gayaku, name: 'Gayaku, Aplikasi Mobile Rekomendasi Outfit' },
    { id: 'links-evently', data: linkProyek.evently, name: 'Evently, Sistem Manajemen Tamu Undangan Digital' },
    { id: 'links-lab', data: linkProyek.lab, name: 'Sistem Informasi Manajemen Lab Teknologi Data' }
  ];

  configs.forEach(({ id, data, name }) => {
    const box = document.getElementById(id);
    if (!box || !data) return;

    if (data.repo) {
      const a = document.createElement('a');
      a.href = data.repo;
      a.className = 'btn btn-sm btn-outline';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = 'Repo';
      box.appendChild(a);
    }

    if (data.screenshot) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn btn-sm btn-primary';
      btn.textContent = 'Lihat Screenshot';
      btn.addEventListener('click', () => {
        openModal(data.screenshot, name);
      });
      box.appendChild(btn);
    }

    if (data.demo) {
      const a = document.createElement('a');
      a.href = data.demo;
      a.className = 'btn btn-sm btn-outline';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = 'Demo';
      box.appendChild(a);
    }
  });
};

renderProjectButtons();

const renderOrgGallery = () => {
  const wrap = document.getElementById('org-gallery-wrap');
  const gallery = document.getElementById('org-gallery');
  const imgEl = document.getElementById('gallery-img');
  const dotsEl = document.getElementById('gallery-dots');
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');

  if (!wrap || !gallery || !imgEl) return;

  const validItems = dokumentasi.filter((item) => item.src && item.src.trim() !== '');

  if (validItems.length === 0) {
    wrap.style.display = 'none';
    return;
  }

  wrap.style.display = '';

  let activeIndex = 0;

  const showSlide = (idx) => {
    activeIndex = (idx + validItems.length) % validItems.length;
    const current = validItems[activeIndex];
    imgEl.src = current.src;
    imgEl.alt = current.alt || '';
    if (dotsEl) {
      const dots = dotsEl.querySelectorAll('.gallery-dot');
      dots.forEach((dot, i) => {
        if (i === activeIndex) dot.classList.add('active');
        else dot.classList.remove('active');
      });
    }
  };

  if (validItems.length <= 1) {
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    if (dotsEl) dotsEl.style.display = 'none';
    showSlide(0);
  } else {
    if (prevBtn) {
      prevBtn.style.display = 'flex';
      prevBtn.addEventListener('click', () => showSlide(activeIndex - 1));
    }
    if (nextBtn) {
      nextBtn.style.display = 'flex';
      nextBtn.addEventListener('click', () => showSlide(activeIndex + 1));
    }
    if (dotsEl) {
      dotsEl.style.display = 'flex';
      dotsEl.innerHTML = '';
      validItems.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Foto ${i + 1}`);
        dot.addEventListener('click', () => showSlide(i));
        dotsEl.appendChild(dot);
      });
    }
    showSlide(0);

    let touchStartX = 0;
    gallery.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    gallery.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 40) {
        showSlide(activeIndex + 1);
      } else if (touchEndX - touchStartX > 40) {
        showSlide(activeIndex - 1);
      }
    }, { passive: true });
  }

  imgEl.addEventListener('click', () => {
    const modalItems = validItems.map((item) => ({
      src: item.src,
      alt: item.alt,
      caption: item.alt || 'Dokumentasi Organisasi'
    }));
    openModal(modalItems, activeIndex);
  });
};

renderOrgGallery();

const renderPrestasiDanSertifikat = () => {
  const navItem = document.getElementById('nav-item-prestasi');
  const section = document.getElementById('prestasi');
  const timelineEl = document.getElementById('prestasi-timeline');
  const certGridEl = document.getElementById('sertifikat-grid');
  const certMoreWrap = document.getElementById('cert-more-wrap');
  const btnCertMore = document.getElementById('btn-cert-more');

  const validPrestasi = prestasi.filter((p) => p.judul && p.judul.trim() !== '');
  const validSertifikat = sertifikat.filter((s) => s.judul && s.judul.trim() !== '');

  if (validPrestasi.length === 0 && validSertifikat.length === 0) {
    if (navItem) navItem.style.display = 'none';
    if (section) section.style.display = 'none';
    return;
  }

  if (navItem) navItem.style.display = '';
  if (section) section.style.display = '';

  if (timelineEl) {
    if (validPrestasi.length > 0) {
      timelineEl.style.display = '';
      timelineEl.innerHTML = validPrestasi.map((item) => `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <span class="timeline-year">${item.tahun || ''}</span>
            <h3 class="timeline-title">${item.judul || ''}</h3>
            <p class="timeline-school">${item.keterangan || ''}</p>
          </div>
        </div>
      `).join('');
    } else {
      timelineEl.style.display = 'none';
    }
  }

  if (certGridEl) {
    if (validSertifikat.length > 0) {
      certGridEl.style.display = '';
      certGridEl.innerHTML = validSertifikat.map((item, idx) => `
        <a class="cert-card${idx >= 6 ? ' cert-hidden' : ''}" href="${item.file}" target="_blank" rel="noopener noreferrer">
        <span class="cert-year">${item.tahun || ''}</span>
        <h3 class="cert-title">${item.judul}</h3>
        <p class="cert-issuer">${item.penyelenggara || ''}</p>
        <span class="cert-link">Lihat sertifikat</span>
        </a>
      `).join('');

      if (validSertifikat.length > 6) {
        if (certMoreWrap) certMoreWrap.style.display = '';
        if (btnCertMore) {
          let expanded = false;
          btnCertMore.addEventListener('click', () => {
            expanded = !expanded;
            const allCertCards = certGridEl.querySelectorAll('.cert-card');
            allCertCards.forEach((c, i) => {
              if (i >= 6) {
                c.classList.toggle('cert-hidden', !expanded);
              }
            });
            btnCertMore.textContent = expanded ? 'Tampilkan lebih sedikit' : 'Lihat semua';
          });
        }
      } else {
        if (certMoreWrap) certMoreWrap.style.display = 'none';
      }
    } else {
      certGridEl.style.display = 'none';
      if (certMoreWrap) certMoreWrap.style.display = 'none';
    }
  }
};

renderPrestasiDanSertifikat();

const highlightNav = () => {
  const scrollY = window.pageYOffset || document.documentElement.scrollTop;
  const navbarHeight = 64;
  const isBottom = window.innerHeight + scrollY >= document.documentElement.scrollHeight - 50;

  if (isBottom) {
    navLinks.forEach((link) => link.classList.remove('active'));
    const contactLink = document.querySelector('.nav-link[href="#kontak"]');
    if (contactLink) contactLink.classList.add('active');
    return;
  }

  const visibleSections = Array.from(sections).filter((sec) => sec.style.display !== 'none' && sec.offsetParent !== null);

  visibleSections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - navbarHeight - 10;
    const sectionId = section.getAttribute('id');
    const targetLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (targetLink) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        targetLink.classList.add('active');
      } else {
        targetLink.classList.remove('active');
      }
    }
  });
};

window.addEventListener('scroll', highlightNav);
highlightNav();

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  }
);

document.querySelectorAll('.fade-in').forEach((el) => {
  revealObserver.observe(el);
});

document.querySelectorAll('.project-thumb img').forEach((img) => {
  img.addEventListener('click', () => {
    openModal(img.src, img.alt);
  });
});