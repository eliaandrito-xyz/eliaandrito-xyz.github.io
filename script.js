/* ==========================================================================
   ANDRITO ELIA - PORTFOLIO INTERACTIVE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initCanvasBackground();
  initThemeToggle();
  initNavigation();
  initProjectFilters();
  initPdfModal();
  initProjectModal();
  initWaForm();
  initCopyEmail();
  initBackToTop();
});

/* -------------------------------------------------------------------------- */
/* 1. TYPING EFFECT                                                           */
/* -------------------------------------------------------------------------- */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const words = [
    "Lulusan Teknik Informatika",
    "Web Application Developer",
    "Cyber Security Enthusiast",
    "Database & System Analyst",
    "Networking & IoT Specialist"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400; // Pause before typing next word
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* -------------------------------------------------------------------------- */
/* 2. CANVAS BACKGROUND ANIMATION (CYBER PARTICLES)                           */
/* -------------------------------------------------------------------------- */
function initCanvasBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 25), 60);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - dist / 140)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* -------------------------------------------------------------------------- */
/* 3. THEME TOGGLE (DARK / LIGHT)                                             */
/* -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle');
  if (!themeBtn) return;

  const currentTheme = localStorage.getItem('theme') || 'dark';
  if (currentTheme === 'light') {
    document.documentElement.classList.add('light');
    themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  themeBtn.addEventListener('click', () => {
    const isLight = document.documentElement.classList.toggle('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeBtn.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  });
}

/* -------------------------------------------------------------------------- */
/* 4. NAVIGATION & MOBILE MENU                                                */
/* -------------------------------------------------------------------------- */
function initNavigation() {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fa-solid fa-xmark"></i>' 
        : '<i class="fa-solid fa-bars"></i>';
    });
  }

  // Close mobile nav on click
  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks) navLinks.classList.remove('active');
      if (menuToggle) menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  // Highlight active menu on scroll
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinkItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 5. PROJECT FILTERS                                                         */
/* -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 6. PDF MODAL VIEWER                                                         */
/* -------------------------------------------------------------------------- */
function initPdfModal() {
  const modal = document.getElementById('pdf-modal');
  const iframe = document.getElementById('pdf-iframe');
  const modalTitle = document.getElementById('pdf-modal-title');
  const downloadBtn = document.getElementById('pdf-download-btn');
  const closeBtns = document.querySelectorAll('#pdf-modal-close, .modal-close-btn, #pdf-modal .modal-overlay');

  document.querySelectorAll('.open-pdf-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const pdfFile = btn.getAttribute('data-file');
      const title = btn.getAttribute('data-title') || 'Dokumen Sertifikat';

      if (iframe) iframe.src = pdfFile;
      if (modalTitle) modalTitle.innerHTML = `<i class="fa-solid fa-file-pdf"></i> ${title}`;
      if (downloadBtn) downloadBtn.href = pdfFile;

      if (modal) modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modal) modal.classList.remove('active');
      if (iframe) iframe.src = '';
      document.body.style.overflow = '';
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 7. PROJECT DETAIL MODAL                                                    */
/* -------------------------------------------------------------------------- */
const projectData = {
  p1: {
    title: "Sistem Informasi & Manajemen Sampah (Smart Waste)",
    image: "assets/web/sistem infromasi dan manajemen sampah.png",
    github: "https://github.com/eliaandrito-xyz/smartwaste-dki",
    category: "Machine Learning & Web App",
    tech: ["Python", "TypeScript", "Machine Learning", "CNN Vision", "Web Dashboard"],
    desc: `Proyek ini merupakan kombinasi sistem informasi manajemen kebersihan dan model Machine Learning berbasis Computer Vision (Convolutional Neural Network / CNN). 
    Sistem mampu memprediksi volume penumpukan sampah di berbagai titik lokasi, memetakan rute armada pengangkut secara optimal, serta melakukan deteksi jenis sampah secara otomatis.`
  },
  p2: {
    title: "Sistem Booking & Manajemen Perumahan",
    image: "assets/web/sistem pembelian perumahan.png",
    github: "https://github.com/eliaandrito-xyz/Booking-Perumahan",
    category: "Web Application",
    tech: ["PHP", "MySQL", "HTML5/CSS3", "Bootstrap", "Database Relasional"],
    desc: `Platform sistem informasi properti perumahan yang memfasilitasi pengembang (developer) dalam mengelola katalog tipe rumah, galeri fasilitas, daftar stok unit, serta reservasi/booking rumah secara terstruktur bagi calon pembeli.`
  },
  p3: {
    title: "Sistem Booking Jasa Penjahit Online",
    image: "assets/web/booking penjahit.png",
    github: "",
    category: "Platform Web",
    tech: ["PHP", "JavaScript", "Database MySQL", "Responsive UI"],
    desc: `Sistem booking layanan jahit pakaian secara kustom. Pelanggan dapat menentukan jenis bahan, memilih model jahitan, memperoleh estimasi harga dan lama pengerjaan, serta melacak status pengerjaan pesanan secara online.`
  },
  p4: {
    title: "Aplikasi Layanan Agen SAMSAT",
    image: "assets/web/agen samsat.png",
    github: "",
    category: "Sistem Layanan Publik",
    tech: ["PHP", "MySQL", "System Administration", "Public Services"],
    desc: `Aplikasi informasi dan administrasi transaksi layanan perpanjangan STNK/Pajak Kendaraan melalui mitra agen SAMSAT. Membantu mempercepat pengolahan data dokumen dan rekapitulasi laporan transaksi mingguan/bulanan.`
  },
  p5: {
    title: "Sistem Manajemen Data Gereja & Keuangan",
    image: "assets/web/manajemen data gereja dan keuangan.png",
    github: "",
    category: "Sistem Informasi Keuangan",
    tech: ["PHP", "MySQL Security", "Report Generator", "Multi-Role Auth"],
    desc: `Aplikasi manajemen internal gereja yang mencakup pendataan jemaat per wilayah/sektor, manajemen aset inventaris, serta pengolahan kas keuangan (pemasukan & pengeluaran) secara transparan dan terukur.`
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('project-modal-content');
  const closeBtns = document.querySelectorAll('#project-modal-close, #project-modal .modal-overlay');

  document.querySelectorAll('.open-project-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-id');
      const data = projectData[projectId];

      if (!data) return;

      const techTags = data.tech.map(t => `<span class="tag">${t}</span>`).join(' ');
      const githubBtn = data.github ? `<a href="${data.github}" target="_blank" class="btn btn-sm btn-primary"><i class="fa-brands fa-github"></i> Buka GitHub Repository</a>` : '';

      modalContent.innerHTML = `
        <div class="project-modal-body">
          <div class="project-modal-img">
            <img src="${data.image}" alt="${data.title}">
          </div>
          <div class="project-modal-details" style="margin-top: 20px;">
            <span class="project-meta">${data.category}</span>
            <h2 style="font-size: 1.4rem; margin: 8px 0 14px;">${data.title}</h2>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; margin-bottom: 20px;">${data.desc}</p>
            <div style="margin-bottom: 24px;">
              <h4 style="font-size: 0.9rem; margin-bottom: 10px; color: var(--text-main);">Teknologi Digunakan:</h4>
              <div class="skill-tags">${techTags}</div>
            </div>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              ${githubBtn}
              <button class="btn btn-sm btn-secondary modal-close-btn">Tutup Modal</button>
            </div>
          </div>
        </div>
      `;

      if (modal) modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Re-bind close button inside generated content
      modalContent.querySelectorAll('.modal-close-btn').forEach(b => {
        b.addEventListener('click', () => {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modal) modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 8. WHATSAPP DIRECT FORM HANDLER                                            */
/* -------------------------------------------------------------------------- */
function initWaForm() {
  const form = document.getElementById('wa-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    const text = `Halo Andrito Elia,\n\nNama Saya: *${name}*\nKeperluan: *${subject}*\n\nPesan:\n"${message}"`;
    const encodedText = encodeURIComponent(text);
    const waUrl = `https://wa.me/628523730772?text=${encodedText}`;

    window.open(waUrl, '_blank');
  });
}

/* -------------------------------------------------------------------------- */
/* 9. COPY EMAIL & TOAST NOTIFICATION                                         */
/* -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBtns = document.querySelectorAll('.copy-email-btn');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const email = btn.getAttribute('data-email') || 'eliaandrito@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Email ${email} berhasil disalin!`);
      }).catch(err => {
        showToast('Gagal menyalin email.');
      });
    });
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = msg;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* -------------------------------------------------------------------------- */
/* 10. BACK TO TOP BUTTON                                                     */
/* -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
