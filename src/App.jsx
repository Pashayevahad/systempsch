< !DOCTYPE html >

  <html className="scroll-smooth" lang="en"><head><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet" />
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>AeroNeural | Engineer-Turned-Psychologist Research</title>
    <!-- Tailwind CSS v3 CDN -->
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <!-- Google Fonts: Playfair Display (Serif) and JetBrains Mono (Monospace) -->
    <link href="https://fonts.googleapis.com" rel="preconnect" />
    <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect" />
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;700&amp;family=Playfair+Display:ital,wght@0,400;0,700;1,400&amp;display=swap" rel="stylesheet" />
    <script>
      tailwind.config = {
        theme: {
        extend: {
        colors: {
        charcoal: '#121212',
      gold: '#FFD700',
          },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
      mono: ['"JetBrains Mono"', 'monospace'],
          },
        },
      },
    }
    </script>
    <style data-purpose="layout-and-gradients">
      body {
        background - color: #121212;
      background-attachment: fixed;
      color: white;
      overflow-x: hidden;
      transition: background 0.8s ease-in-out;
    }

      .glass-nav {
        background: rgba(18, 18, 18, 0.7);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 215, 0, 0.1);
    }

      /* Scroll Interaction Classes */
      .blur-layer {
        transition: filter 0.8s ease-out, opacity 0.8s ease-out, transform 0.8s ease-out;
      filter: blur(12px);
      opacity: 0;
      transform: translateY(20px);
    }

      .blur-layer.is-visible {
        filter: blur(0px);
      opacity: 1;
      transform: translateY(0);
    }

      .geometric-grid {
        background - image: radial-gradient(circle, rgba(255, 215, 0, 0.1) 1px, transparent 1px);
      background-size: 40px 40px;
    }
    </style>
    <style data-purpose="typography-refinement">
      .section-title {
        letter - spacing: -0.02em;
    }
      .mono-label {
        text - transform: uppercase;
      letter-spacing: 0.15em;
      font-size: 0.75rem;
    }
    </style>
    <style>
      .vertical-nav-container {
        position: fixed;
      left: 2rem;
      top: 50%;
      transform: translateY(-50%);
      z-index: 100;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      padding: 2rem 1.5rem;
      background: rgba(18, 18, 18, 0.4);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 215, 0, 0.1);
      border-radius: 4px;
      max-width: 240px;
    }

      .nav-chapter {
        position: relative;
      cursor: pointer;
      transition: all 0.3s ease;
    }

      .nav-chapter-title {
        display: flex;
      align-items: center;
      gap: 0.75rem;
      transition: color 0.3s ease;
    }

      .nav-chapter-title:hover {
        color: #FFD700;
    }

      .nav-sub-items {
        max - height: 0;
      overflow: hidden;
      transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), margin-top 0.3s ease;
      margin-left: 1.5rem;
      position: relative;
    }

      .nav-chapter.active .nav-sub-items {
        max - height: 200px;
      margin-top: 0.75rem;
    }

      /* Schematic Lines */
      .nav-sub-items::before {
        content: '';
      position: absolute;
      left: -0.75rem;
      top: 0;
      bottom: 0.5rem;
      width: 1px;
      background: rgba(255, 215, 0, 0.2);
    }

      .nav-sub-item {
        position: relative;
      padding: 0.25rem 0;
      display: block;
      color: rgba(255, 255, 255, 0.6);
      transition: color 0.2s ease;
    }

      .nav-sub-item::before {
        content: '';
      position: absolute;
      left: -0.75rem;
      top: 50%;
      width: 0.5rem;
      height: 1px;
      background: rgba(255, 215, 0, 0.2);
    }

      .nav-sub-item:hover, .nav-sub-item.active {
        color: #FFD700;
    }

      /* Golden Node Icon */
      .golden-node {
        width: 6px;
      height: 6px;
      background: #FFD700;
      border-radius: 50%;
      box-shadow: 0 0 8px #FFD700;
      display: inline-block;
      opacity: 0;
      transition: opacity 0.3s ease;
      position: absolute;
      left: -1.25rem;
      top: 50%;
      transform: translateY(-50%);
    }

      .nav-sub-item.active .golden-node {
        opacity: 1;
    }

      @media (max-width: 1024px) {
      .vertical - nav - container {
        display: none;
      }
    }
    </style></head>
    <body className="font-serif" style="background-color: #eab308; color: white; overflow-x: hidden;">
      <!-- BEGIN: Navigation -->
      <nav className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-md border-b border-white/10" data-purpose="main-navigation">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="font-mono font-bold text-gold tracking-tighter text-xl mr-12">AeroNeural</span>
            <div className="hidden lg:flex space-x-8 items-center h-full">
              <!-- Monospace Tabs -->
              <a className="font-mono uppercase tracking-widest text-white/80 hover:text-gold transition-colors text-[1.1rem] font-bold" href="#">Complex System</a>
              <a className="font-mono uppercase tracking-widest text-white/80 hover:text-gold transition-colors text-[1.1rem] font-bold" href="#">Chaos Theory</a>
              <a className="font-mono uppercase tracking-widest text-white/80 hover:text-gold transition-colors text-[1.1rem] font-bold" href="#">System Thinking</a>
              <!-- Divider -->
              <div className="h-4 w-px bg-white/20 mx-2"></div>
              <!-- Serif Tabs -->
              <a className="font-serif italic text-white/80 hover:text-gold transition-colors text-[1.1rem] font-bold" href="#">Psychology</a>
              <a className="font-serif italic text-white/80 hover:text-gold transition-colors text-[1.1rem] font-bold" href="#">Business Psych</a>
              <a className="font-serif italic text-white/80 hover:text-gold transition-colors text-[1.1rem] font-bold" href="#">Food Psych</a>
            </div>
          </div>
          <button className="font-mono text-[10px] border border-gold/30 px-4 py-2 hover:bg-gold hover:text-charcoal transition-all text-gold">
            LOG_FLIGHT_DATA
          </button>
        </div>
      </nav>
      <!-- END: Navigation -->
      <!-- BEGIN: Hero Section -->
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden" data-purpose="hero-section" id="ascent">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none geometric-grid" style="background-image: radial-gradient(circle, rgba(0, 0, 0, 0.1) 1px, transparent 1px); background-size: 40px 40px;"></div>
        <div className="relative z-10 text-center max-w-4xl" data-purpose="hero-content">
          <p className="font-mono mono-label text-gold mb-4 animate-pulse">Initializing Ascent: System.Psyche.v1</p>
          <h1 className="text-6xl md:text-8xl font-bold section-title mb-8 leading-tight">
            The <span className="italic">Ascent</span>
          </h1>
          <!-- Central Image Container -->
          <div className="relative mx-auto w-64 h-64 md:w-96 md:h-96 mb-12 group">
            <div className="absolute -inset-4 bg-gold/20 rounded-full blur-3xl group-hover:bg-gold/40 transition-all duration-700"></div>
            <img src="/screen.png" className="w-full h-auto object-contain" alt="Neural Tree" />
          </div>
          <p className="font-mono text-sm md:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Where structural engineering meets cognitive resonance. Exploring the aerodynamic properties of the human mind as it navigates the turbulence of existence.
          </p>
        </div>
        <!-- Scroll Indicator -->
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="font-mono text-[10px] uppercase tracking-widest">Descent into depth</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent"></div>
        </div>
      </section>
      <!-- END: Hero Section -->
      <!-- BEGIN: Section 1 - Atmospheric Layers -->
      <!-- END: Section 1 -->
      <!-- BEGIN: Section 2 - Geometric Precision -->
      <!-- END: Section 2 -->
      <!-- BEGIN: Footer -->
      <footer className="py-20 px-6 border-t border-gold/10 bg-charcoal" data-purpose="horizon-footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h4 className="font-mono font-bold text-gold tracking-tighter text-lg mb-2">AeroNeural</h4>
            <p className="text-xs font-mono text-white/40 uppercase tracking-widest">The Horizon Line • © 2023</p>
          </div>
          <div className="flex space-x-8 font-mono text-[10px] text-white/60">
            <a className="hover:text-gold uppercase tracking-widest transition-colors" href="#">Research Papers</a>
            <a className="hover:text-gold uppercase tracking-widest transition-colors" href="#">Methodology</a>
            <a className="hover:text-gold uppercase tracking-widest transition-colors" href="#">Terminal Access</a>
          </div>
          <div className="font-mono text-[10px] text-white/20">
            LAT: 37.7749 | LONG: -122.4194
          </div>
        </div>
      </footer>
      <!-- END: Footer -->
      <!-- BEGIN: Interaction Script -->
      <!-- END: Interaction Script -->
      <script>
    document.querySelectorAll('.nav-chapter').forEach(chapter => {
      const title = chapter.querySelector('.nav-chapter-title');
      title.addEventListener('click', () => {
        const isActive = chapter.classList.contains('active');

        // Close all others
        document.querySelectorAll('.nav-chapter').forEach(c => c.classList.remove('active'));

        // Toggle current
        if (!isActive) {
          chapter.classList.add('active');
        }
      });
    });

    document.querySelectorAll('.nav-sub-item').forEach(item => {
          item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            document.querySelectorAll('.nav-sub-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
          });
    });
      </script></body></html>