document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // --- DATA ---
    const portfolioData = [
        { id: 1, title: "SmileCare Dental", category: "web", image: "images/Screenshot 2026-05-03 224351.png", gradient: "linear-gradient(135deg, #0f172a, #00E5FF)", client: "SmileCare Clinic", tools: ["Three.js", "GSAP", "Tailwind"], year: "2025", description: "A premium dental clinic landing page featuring dark mode aesthetics, floating UI elements, and a seamless booking system." },
        { id: 2, title: "Quantum Banking", category: "web", image: null, gradient: "linear-gradient(135deg, #6C3BFF, #00E5FF)", client: "Quantum Inc.", tools: ["Three.js", "GSAP", "HTML/CSS"], year: "2024", description: "A futuristic banking platform with immersive 3D visualizations and seamless user transitions." },
        { id: 3, title: "Lumina Brand", category: "logo", gradient: "linear-gradient(135deg, #FF3B8E, #6C3BFF)", client: "Lumina Labs", tools: ["Illustrator", "Photoshop"], year: "2023", description: "A high-end brand identity for a light-tech startup, focusing on minimalist and glowing aesthetics." },
        { id: 4, title: "Nebula Social", category: "Graphics Design", gradient: "linear-gradient(135deg, #00E5FF, #3BFFAC)", client: "Nebula App", tools: ["Figma", "After Effects"], year: "2024", description: "Complete social media kit and motion graphics for a next-gen social networking app." },
        { id: 5, title: "Ether Ecommerce", category: "web", gradient: "linear-gradient(135deg, #6C3BFF, #3BFFAC)", client: "Ether Luxury", tools: ["Shopify", "Vanilla JS"], year: "2024", description: "A premium ecommerce experience for a luxury watch brand with high-performance animations." },
        { id: 6, title: "Vortex Gaming", category: "logo", gradient: "linear-gradient(135deg, #FF9B3B, #FF3B8E)", client: "Vortex Esports", tools: ["Illustrator"], year: "2023", description: "Dynamic and aggressive logo design for a professional esports team competing globally." },
        { id: 7, title: "Aura Wellness", category: "web", gradient: "linear-gradient(135deg, #3BFFAC, #00E5FF)", client: "Aura Spa", tools: ["WordPress", "GSAP"], year: "2024", description: "A calming and responsive website for a high-end wellness retreat center." },
        { id: 8, title: "Titan Logistics", category: "Graphics Design", gradient: "linear-gradient(135deg, #04040F, #6C3BFF)", client: "Titan Group", tools: ["InDesign", "Photoshop"], year: "2023", description: "Comprehensive print design and annual report for a global logistics conglomerate." },
        { id: 9, title: "Nova App", category: "web", gradient: "linear-gradient(135deg, #FF3B8E, #FF9B3B)", client: "Nova Tech", tools: ["Next.js", "Tailwind"], year: "2024", description: "Marketing landing page for a productivity app with advanced scroll-triggered storytelling." },
        { id: 10, title: "Zephyr Identity", category: "logo", gradient: "linear-gradient(135deg, #00E5FF, #6C3BFF)", client: "Zephyr Energy", tools: ["Illustrator", "Figma"], year: "2024", description: "Corporate identity design for a sustainable energy company, reflecting movement and clarity." }
    ];

    const testimonialsData = [
        { name: "Sarah Johnson", company: "CEO, Quantum Inc.", text: "Webly transformed our digital presence. Their attention to detail and creative vision is unmatched in the industry.", initials: "SJ" },
        { name: "Michael Chen", company: "Director, Nebula Social", text: "The 3D elements and animations they built for our landing page have significantly increased our user engagement.", initials: "MC" },
        { name: "Elena Rodriguez", company: "Founder, Lumina Labs", text: "A truly professional team. They understood our brand identity perfectly and delivered a logo that we absolutely love.", initials: "ER" }
    ];

    // --- PRELOADER ---
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('progress-bar');
    const loadingText = document.querySelector('.loading-text');
    let progress = 0;

    // Initial stagger for letters
    gsap.to('.preloader-logo span', {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out'
    });

    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;

        progressBar.style.width = `${progress}%`;
        loadingText.innerText = `${Math.floor(progress)}%`;

        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                const tl = gsap.timeline();
                tl.to('.preloader-content', { opacity: 0, y: -50, duration: 0.5 })
                    .to(preloader, { y: '-100%', duration: 1, ease: 'expo.inOut' })
                    .from('.hero-title .line', { y: 100, opacity: 0, stagger: 0.2, duration: 1, ease: 'power4.out' }, '-=0.5')
                    .from('.hero-description', { opacity: 0, y: 20, duration: 0.8 }, '-=0.5')
                    .from('.hero-ctas', { opacity: 0, y: 20, duration: 0.8 }, '-=0.5');
            }, 500);
        }
    }, 150);

    // --- CUSTOM CURSOR ---
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    });

    const animateCursor = () => {
        // Lerp for the ring
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    const interactiveElements = document.querySelectorAll('a, button, .service-card, .filter-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.style.width = '60px';
            cursorRing.style.height = '60px';
            cursorRing.style.borderColor = 'var(--accent-cyan)';
            cursorRing.style.backgroundColor = 'rgba(0, 229, 255, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursorRing.style.width = '40px';
            cursorRing.style.height = '40px';
            cursorRing.style.borderColor = 'var(--accent-purple)';
            cursorRing.style.backgroundColor = 'transparent';
        });
    });

    // --- NAVBAR SCROLL ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Progress
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('scroll-progress').style.width = `${scrolled}%`;
    });

    // --- MOBILE MENU ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu-links a');

    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');

        if (mobileMenu.classList.contains('active')) {
            mobileLinks.forEach((link, i) => {
                link.style.transitionDelay = `${0.1 * (i + 1)}s`;
            });
        } else {
            mobileLinks.forEach(link => {
                link.style.transitionDelay = '0s';
            });
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });

    // --- THREE.JS HERO ---
    const initThree = () => {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas || window.innerWidth < 768) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: window.devicePixelRatio < 2, // Only antialias on low-res screens
            alpha: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance

        // Particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 80;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x00E5FF,
            transparent: true,
            opacity: 0.8
        });
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Geometries
        const geometries = [];
        const mat = new THREE.MeshPhongMaterial({ color: 0x6C3BFF, wireframe: true, emissive: 0x6C3BFF, emissiveIntensity: 0.5 });

        const geo1 = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 1), mat);
        geo1.position.set(-3, 1, -2);
        scene.add(geo1);
        geometries.push(geo1);

        const geo2 = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.2, 16, 100), mat);
        geo2.position.set(3, -1, -3);
        scene.add(geo2);
        geometries.push(geo2);

        const geo3 = new THREE.Mesh(new THREE.OctahedronGeometry(0.8, 1), mat);
        geo3.position.set(1, 2, -4);
        scene.add(geo3);
        geometries.push(geo3);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0x00E5FF, 2);
        pointLight.position.set(2, 3, 4);
        scene.add(pointLight);

        camera.position.z = 5;

        // Animation
        const clock = new THREE.Clock();
        const animate = () => {
            const elapsedTime = clock.getElapsedTime();

            particlesMesh.rotation.y = elapsedTime * 0.05;
            geometries.forEach((g, i) => {
                g.rotation.x = elapsedTime * 0.2 * (i + 1);
                g.rotation.y = elapsedTime * 0.3;
                g.position.y += Math.sin(elapsedTime + i) * 0.002;
            });

            // Parallax
            camera.position.x += (mouseX / window.innerWidth - 0.5 - camera.position.x) * 0.05;
            camera.position.y += (-(mouseY / window.innerHeight - 0.5) - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    };
    initThree();

    // --- PORTFOLIO LOGIC ---
    const portfolioGrid = document.getElementById('portfolio-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    const renderPortfolio = (filter = 'all') => {
        portfolioGrid.innerHTML = '';
        const filtered = filter === 'all' ? portfolioData : portfolioData.filter(item => item.category === filter);

        filtered.forEach(item => {
            const div = document.createElement('div');
            div.className = 'portfolio-item';
            div.dataset.id = item.id;
            div.innerHTML = `
                <div class="portfolio-gradient" style="background: ${item.image ? `url('${item.image}') center/cover no-repeat` : item.gradient}"></div>
                <div class="portfolio-overlay">
                    <span class="portfolio-category">${item.category}</span>
                    <h5>${item.title}</h5>
                    <a href="javascript:void(0)" class="view-btn">View Project →</a>
                </div>
            `;
            portfolioGrid.appendChild(div);

            div.addEventListener('click', () => openLightbox(item.id));
        });
    };
    renderPortfolio();

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderPortfolio(btn.dataset.filter);

            gsap.from('.portfolio-item', { opacity: 0, scale: 0.8, duration: 0.5, stagger: 0.1 });
        });
    });

    // --- LIGHTBOX ---
    const lightbox = document.getElementById('lightbox');
    const lbClose = document.querySelector('.lightbox-close');
    let currentLbId = null;

    const openLightbox = (id) => {
        const item = portfolioData.find(i => i.id === id);
        currentLbId = id;

        document.getElementById('lb-title').innerText = item.title;
        document.getElementById('lb-category').innerText = item.category;
        document.getElementById('lb-client').innerText = item.client;
        document.getElementById('lb-tools').innerText = item.tools.join(', ');
        document.getElementById('lb-year').innerText = item.year;
        document.getElementById('lb-description').innerText = item.description;
        
        const placeholder = document.querySelector('.lightbox-placeholder');
        if (item.image) {
            placeholder.style.background = `url('${item.image}') center/cover no-repeat`;
        } else {
            placeholder.style.background = item.gradient;
        }

        lightbox.style.display = 'flex';
        document.getElementById('cursor-dot').style.display = 'none';
        document.getElementById('cursor-ring').style.display = 'none';
        gsap.from('.lightbox-content', { opacity: 0, scale: 0.9, duration: 0.4, ease: 'back.out(1.7)' });
    };

    lbClose.addEventListener('click', () => {
        closeLightbox();
    });

    const closeLightbox = () => {
        gsap.to('.lightbox-content', {
            opacity: 0, scale: 0.9, duration: 0.3, onComplete: () => {
                lightbox.style.display = 'none';
                document.getElementById('cursor-dot').style.display = 'block';
                document.getElementById('cursor-ring').style.display = 'block';
            }
        });
    };

    // Close on overlay click
    document.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);

    // Escape key listener
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            closeLightbox();
        }
    });

    // --- TESTIMONIALS CAROUSEL ---
    const track = document.getElementById('testimonials-track');
    const dotsContainer = document.getElementById('carousel-dots');
    let currentIdx = 0;

    testimonialsData.forEach((t, i) => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
            <div class="quote-icon">"</div>
            <p class="testimonial-text">${t.text}</p>
            <div class="client-info">
                <div class="client-avatar">${t.initials}</div>
                <h5>${t.name}</h5>
                <small>${t.company}</small>
                <div class="stars">★★★★★</div>
            </div>
        `;
        track.appendChild(card);

        const dot = document.createElement('div');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    const goToSlide = (index) => {
        currentIdx = index;
        track.style.transform = `translateX(-${index * 100}%)`;
        document.querySelectorAll('.dot').forEach((d, i) => {
            d.classList.toggle('active', i === index);
        });
    };

    setInterval(() => {
        currentIdx = (currentIdx + 1) % testimonialsData.length;
        goToSlide(currentIdx);
    }, 5000);

    // --- SCROLL ANIMATIONS ---
    gsap.utils.toArray('.section-padding').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Stat Counters
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = +stat.dataset.target;
        ScrollTrigger.create({
            trigger: stat,
            start: "top 90%",
            onEnter: () => {
                let count = 0;
                const update = () => {
                    const inc = target / 50;
                    if (count < target) {
                        count += inc;
                        stat.innerText = Math.ceil(count);
                        setTimeout(update, 30);
                    } else {
                        stat.innerText = target;
                    }
                };
                update();
            }
        });
    });

    // Process Timeline
    gsap.to('.line-progress', {
        scrollTrigger: {
            trigger: '.process-wrapper',
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1
        },
        width: '100%'
    });

    // --- SERVICES 3D TILT ---
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        let requestId;
        card.addEventListener('mousemove', (e) => {
            if (requestId) cancelAnimationFrame(requestId);

            requestId = requestAnimationFrame(() => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 15; // Reduced sensitivity
                const rotateY = (centerX - x) / 15;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
        });

        card.addEventListener('mouseleave', () => {
            if (requestId) cancelAnimationFrame(requestId);
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });
    });

    // Set GSAP Defaults
    gsap.config({ force3D: true });

    // --- CONTACT FORM ---
    const contactForm = document.getElementById('contact-form');
    const formResponse = document.getElementById('form-response');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('button');
        btn.innerText = 'Sending...';

        setTimeout(() => {
            btn.innerText = 'Send Message';
            formResponse.innerText = '✓ Message sent! We\'ll get back within 24 hours.';
            formResponse.style.color = 'var(--accent-cyan)';
            contactForm.reset();

            setTimeout(() => { formResponse.innerText = ''; }, 5000);
        }, 2000);
    });
});
