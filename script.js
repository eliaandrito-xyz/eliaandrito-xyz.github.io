/* ==========================================================================
   ANDRITO ELIA - ULTRA-PREMIUM INTERACTIVE SCRIPT WITH UNIQUE ANIMATIONS
   ========================================================================== */

let bgMode = 'constellation'; // 'constellation', 'matrix', 'warp'

document.addEventListener('DOMContentLoaded', () => {
  initCursorSpotlight();
  initTypingEffect();
  initCanvasBackground();
  initBgModeToggle();
  initClickRipples();
  initThemeToggle();
  initNavigation();
  initProjectFilters();
  initCertSearch();
  initCliTerminal();
  initPdfModal();
  initProjectModal();
  initWaForm();
  initCopyEmail();
  initBackToTop();
  initScrollReveal();
  init3DTilt();
  initCounterStats();
  initMagneticButtons();
  initCardSpotlight();
});

/* -------------------------------------------------------------------------- */
/* 1. CURSOR SPOTLIGHT TRACKER                                               */
/* -------------------------------------------------------------------------- */
function initCursorSpotlight() {
  const glow = document.getElementById('cursor-glow');
  if (!glow || window.innerWidth <= 768) return;

  window.addEventListener('mousemove', (e) => {
    glow.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
  });
}

/* -------------------------------------------------------------------------- */
/* 2. TYPING EFFECT                                                           */
/* -------------------------------------------------------------------------- */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const words = [
    "Lulusan Teknik Informatika",
    "Full-Stack Web Developer",
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
      typeSpeed = 2200; // Pause at end of word
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
/* 3. MULTI-MODE CANVAS BACKGROUND (CONSTELLATION, MATRIX RAIN, WARP)       */
/* -------------------------------------------------------------------------- */
function initCanvasBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const mouse = { x: null, y: null, radius: 160 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // --- Constellation Particles ---
  const particles = [];
  const particleCount = Math.min(Math.floor(width / 20), 75);
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 2.2 + 1,
      color: i % 3 === 0 ? 'rgba(99, 102, 241, ' : (i % 3 === 1 ? 'rgba(56, 189, 248, ' : 'rgba(192, 132, 252, '),
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  // --- Matrix Digital Rain ---
  const matrixChars = '0123456789ABCDEFHIJKLMNOPQRSTUVWXYZ';
  const fontSize = 14;
  const columns = Math.floor(width / fontSize);
  const drops = Array(columns).fill(1);

  // --- Warp Stars ---
  const stars = [];
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: Math.random() * width
    });
  }

  function animate() {
    const isLight = document.documentElement.classList.contains('light');

    if (bgMode === 'constellation') {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = isLight 
              ? `rgba(79, 70, 229, ${0.15 * (1 - dist / 130)})`
              : `rgba(99, 102, 241, ${0.18 * (1 - dist / 130)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        if (mouse.x !== null && mouse.y !== null) {
          const mdx = particles[i].x - mouse.x;
          const mdy = particles[i].y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouse.radius) {
            const force = (mouse.radius - mdist) / mouse.radius;
            particles[i].x += (mdx / mdist) * force * 3;
            particles[i].y += (mdy / mdist) * force * 3;
          }
        }
      }

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + (isLight ? p.alpha * 0.8 : p.alpha) + ')';
        ctx.fill();
      });

    } else if (bgMode === 'matrix') {
      ctx.fillStyle = isLight ? 'rgba(248, 250, 252, 0.18)' : 'rgba(6, 9, 19, 0.12)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = isLight ? '#059669' : '#10b981';
      ctx.font = `${fontSize}px var(--font-mono)`;

      for (let i = 0; i < drops.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

    } else if (bgMode === 'warp') {
      ctx.fillStyle = isLight ? 'rgba(248, 250, 252, 0.3)' : 'rgba(6, 9, 19, 0.25)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      stars.forEach(s => {
        s.z -= 4;
        if (s.z <= 0) s.z = width;

        const k = 128 / s.z;
        const px = s.x * k + cx;
        const py = s.y * k + cy;

        if (px >= 0 && px < width && py >= 0 && py < height) {
          const size = (1 - s.z / width) * 3;
          ctx.beginPath();
          ctx.arc(px, py, Math.max(0.5, size), 0, Math.PI * 2);
          ctx.fillStyle = isLight ? '#4f46e5' : '#38bdf8';
          ctx.fill();
        }
      });
    }

    requestAnimationFrame(animate);
  }

  animate();
}

function initBgModeToggle() {
  const modeBtns = document.querySelectorAll('#bg-mode-btn, #bg-mode-btn-mobile');
  if (!modeBtns.length) return;

  const modes = ['constellation', 'matrix', 'warp'];

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentIndex = modes.indexOf(bgMode);
      bgMode = modes[(currentIndex + 1) % modes.length];
      showToast(`Mode Latar Belakang: ${bgMode.toUpperCase()}`);
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 4. CLICK SHOCKWAVE RIPPLE                                                  */
/* -------------------------------------------------------------------------- */
function initClickRipples() {
  window.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    ripple.style.width = '50px';
    ripple.style.height = '50px';
    document.body.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
}

/* -------------------------------------------------------------------------- */
/* 6. REAL-TIME CERTIFICATE SEARCH SYSTEM                                     */
/* -------------------------------------------------------------------------- */
function initCertSearch() {
  const searchInput = document.getElementById('cert-search-input');
  const certCards = document.querySelectorAll('.cert-card');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    certCards.forEach(card => {
      const keywords = card.getAttribute('data-keywords') || '';
      const text = card.innerText.toLowerCase();

      if (query === '' || keywords.includes(query) || text.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 7. INTERACTIVE CYBER CLI TERMINAL                                          */
/* -------------------------------------------------------------------------- */
function initCliTerminal() {
  const modal = document.getElementById('cli-modal');
  const openBtns = document.querySelectorAll('#cli-btn, #cli-btn-mobile, .open-cli-trigger');
  const closeBtn = document.getElementById('cli-modal-close');
  const overlay = modal ? modal.querySelector('.modal-overlay') : null;
  const cliInput = document.getElementById('cli-input');
  const cliOutput = document.getElementById('cli-output');

  if (!modal || !cliInput) return;

  openBtns.forEach(b => {
    b.addEventListener('click', () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      setTimeout(() => cliInput.focus(), 100);
    });
  });

  const closeCLI = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeCLI);
  if (overlay) overlay.addEventListener('click', closeCLI);

  cliInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = cliInput.value.trim().toLowerCase();
      cliInput.value = '';

      if (cmd === '') return;

      appendCliLine(`guest@andrito-elia:~$ ${cmd}`, 'cli-out-cyan');
      processCommand(cmd);
    }
  });

  function processCommand(cmd) {
    switch (cmd) {
      case 'help':
        appendCliLine('Daftar Perintah Cyber Terminal:', 'cli-out-amber');
        appendCliLine(' - about     : Informasi singkat & profil Andrito Elia');
        appendCliLine(' - skills    : Ringkasan keahlian teknis (Web, Security, DB)');
        appendCliLine(' - projects  : Daftar proyek portofolio & repository GitHub');
        appendCliLine(' - certs     : Daftar sertifikat & prestasi nasional');
        appendCliLine(' - contact   : Kontak WhatsApp & Email resmi');
        appendCliLine(' - matrix    : Aktifkan mode background Matrix Digital Rain');
        appendCliLine(' - clear     : Membersihkan layar terminal');
        break;

      case 'about':
      case 'bio':
        appendCliLine('[PROFIL ANDRITO ELIA]', 'cli-out-green');
        appendCliLine('Gelar: S1 Teknik Informatika (STIKOM Uyelindo & PMM 4 IT Telkom Purwokerto)');
        appendCliLine('TTL: Mondo, 13 Mei 2003 | Domisili: Kupang, Nusa Tenggara Timur');
        appendCliLine('Spesialisasi: Pemrograman Web, Basis Data, Jaringan, Cyber Security');
        break;

      case 'skills':
        appendCliLine('[KEAHILAN TEKNIS]', 'cli-out-amber');
        appendCliLine('• Web Dev: PHP, JavaScript, HTML5/CSS3, Bootstrap, TypeScript');
        appendCliLine('• Database: MySQL, PostgreSQL, Query Optimization, ERD');
        appendCliLine('• Security & Network: Network Defense, Vulnerability Scanning, TCP/IP, IoT');
        appendCliLine('• ML & Data: Python Analytics, CNN Waste Classification');
        break;

      case 'projects':
        appendCliLine('[PROYEK HARGA KARYA]', 'cli-out-cyan');
        appendCliLine('1. Smart Waste System (Python CNN & Web Dashboard)');
        appendCliLine('2. Sistem Booking & Manajemen Perumahan (PHP & MySQL)');
        appendCliLine('3. Sistem Booking Jasa Penjahit Online (PHP)');
        appendCliLine('4. Aplikasi Layanan Agen SAMSAT (PHP)');
        appendCliLine('5. Manajemen Data Gereja & Keuangan (PHP)');
        appendCliLine('6. Kasir Kosmetik Point of Sale (JavaScript)');
        break;

      case 'certs':
      case 'awards':
        appendCliLine('[REKAP PRESTASI & SERTIFIKAT]', 'cli-out-green');
        appendCliLine('🏆 Finalis Cyber Security Startup Challenge (CSSC) 2025 Jakarta');
        appendCliLine('🎓 Sertifikat Pertukaran Mahasiswa Merdeka (PMM 4)');
        appendCliLine('🛡️ Sertifikat Instruktur Cyber Security & IoT');
        appendCliLine('🥇 Piagam Penghargaan Lomba Inovasi Digital Kavinya');
        appendCliLine('🎨 Peserta Lomba Desain Grafis Nasional UNIKA (PISMA VIII)');
        break;

      case 'contact':
      case 'hire':
        appendCliLine('[INFORMASI KONTAK]', 'cli-out-amber');
        appendCliLine('• Email: eliaandrito@gmail.com');
        appendCliLine('• WhatsApp: +62 85-2373-0772 (wa.me/628523730772)');
        appendCliLine('• Instagram: @andritoelia');
        appendCliLine('• GitHub: github.com/eliaandrito-xyz');
        break;

      case 'matrix':
        bgMode = 'matrix';
        appendCliLine('[SYS] Mode background diubah ke Matrix Digital Rain!', 'cli-out-green');
        break;

      case 'clear':
        cliOutput.innerHTML = '';
        break;

      default:
        appendCliLine(`Command '${cmd}' tidak ditemukan. Ketik 'help' untuk petunjuk.`, 'cli-out-red');
    }

    const cliBody = document.getElementById('cli-body');
    if (cliBody) cliBody.scrollTop = cliBody.scrollHeight;
  }

  function appendCliLine(text, cssClass = '') {
    const div = document.createElement('div');
    div.className = `cli-out-line ${cssClass}`;
    div.textContent = text;
    cliOutput.appendChild(div);
  }
}

/* -------------------------------------------------------------------------- */
/* 8. SCROLL REVEAL OBSERVER                                                  */
/* -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => observer.observe(el));
}

/* -------------------------------------------------------------------------- */
/* 9. 3D TILT EFFECT FOR CARDS                                                */
/* -------------------------------------------------------------------------- */
function init3DTilt() {
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 10. COUNTER STATS ANIMATION                                                */
/* -------------------------------------------------------------------------- */
function initCounterStats() {
  const stats = document.querySelectorAll('.stat-num');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        stats.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target') || '0', 10);
          let current = 0;
          const step = Math.max(1, Math.floor(target / 40));
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              stat.textContent = target;
              clearInterval(interval);
            } else {
              stat.textContent = current;
            }
          }, 30);
        });
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) observer.observe(heroStats);
}

/* -------------------------------------------------------------------------- */
/* 11. THEME TOGGLE (DARK / LIGHT)                                            */
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
/* 12. NAVIGATION & MOBILE MENU                                               */
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
/* 13. PROJECT FILTERS                                                        */
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
/* 14. PDF MODAL VIEWER                                                       */
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
/* 15. PROJECT DETAIL MODAL                                                   */
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
/* 16. WHATSAPP DIRECT FORM HANDLER                                           */
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
/* 17. COPY EMAIL & TOAST NOTIFICATION                                        */
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
/* 18. BACK TO TOP BUTTON                                                     */
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

/* -------------------------------------------------------------------------- */
/* 19. MAGNETIC HOVER BUTTONS                                                */
/* -------------------------------------------------------------------------- */
function initMagneticButtons() {
  if (window.innerWidth <= 768) return;
  const magneticElements = document.querySelectorAll('.btn-primary, .btn-glow, .icon-btn');

  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0px, 0px)';
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 20. GLASS CARD DYNAMIC SPOTLIGHT GLOW                                      */
/* -------------------------------------------------------------------------- */
function initCardSpotlight() {
  const cards = document.querySelectorAll('.glass-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}
