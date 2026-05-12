document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggle = document.querySelectorAll('.theme-toggle');
  const html = document.documentElement;
  
  const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  themeToggle.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcons(newTheme);
    });
  });

  function updateThemeIcons(theme) {
    themeToggle.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = theme === 'light' ? 'ph ph-moon' : 'ph ph-sun';
      }
    });
  }

  // RTL Toggle
  const rtlToggle = document.querySelectorAll('.rtl-toggle');
  const savedRtl = localStorage.getItem('rtl') === 'true';
  if (savedRtl) {
    html.setAttribute('dir', 'rtl');
    html.classList.add('rtl');
  }

  rtlToggle.forEach(btn => {
    btn.addEventListener('click', () => {
      const isRtl = html.getAttribute('dir') === 'rtl';
      if (isRtl) {
        html.removeAttribute('dir');
        html.classList.remove('rtl');
        localStorage.setItem('rtl', 'false');
      } else {
        html.setAttribute('dir', 'rtl');
        html.classList.add('rtl');
        localStorage.setItem('rtl', 'true');
      }
    });
  });

  // Mobile Menu
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.nav-drawer');
  const overlay = document.querySelector('.drawer-overlay');
  const drawerClose = document.querySelector('.drawer-close');

  const toggleMenu = () => {
    drawer.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = drawer.classList.contains('active') ? 'hidden' : '';
  };

  if (hamburger) hamburger.addEventListener('click', toggleMenu);
  if (overlay) overlay.addEventListener('click', toggleMenu);
  if (drawerClose) drawerClose.addEventListener('click', toggleMenu);

  // Scroll Header
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Reveal Animations
  const revealElements = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));

  // Shop Cart State (Simple)
  let cart = JSON.parse(localStorage.getItem('bloom_cart')) || [];
  const cartCounts = document.querySelectorAll('.cart-count');

  const updateCartUI = () => {
    cartCounts.forEach(count => {
      count.textContent = cart.length;
    });
  };

  window.addToCart = (product) => {
    cart.push(product);
    localStorage.setItem('bloom_cart', JSON.stringify(cart));
    updateCartUI();
    alert(`${product.name} added to cart!`);
  };

  updateCartUI();

  // Form Validation
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
      
      inputs.forEach(input => {
        const errorMsg = input.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('error-text')) errorMsg.remove();

        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = 'red';
          const msg = document.createElement('span');
          msg.className = 'error-text';
          msg.style.color = 'red';
          msg.style.fontSize = '0.8rem';
          msg.textContent = 'This field is required';
          input.after(msg);
        } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          isValid = false;
          input.style.borderColor = 'red';
        } else {
          input.style.borderColor = 'var(--text-muted)';
        }
      });

      const terms = form.querySelector('#terms');
      if (terms && !terms.checked) {
        isValid = false;
        alert('Please accept terms and conditions');
      }

      if (isValid) {
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.style.color = 'green';
        successMsg.style.marginTop = '20px';
        successMsg.textContent = 'Success! Your message has been sent.';
        form.appendChild(successMsg);
        form.reset();
        setTimeout(() => successMsg.remove(), 5000);
      }
    });
  });

  // Password Toggle
  const passwordToggles = document.querySelectorAll('.password-toggle');
  passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const input = toggle.parentElement.querySelector('input');
      const icon = toggle.querySelector('i');
      
      if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'ph ph-eye-slash';
      } else {
        input.type = 'password';
        icon.className = 'ph ph-eye';
      }
    });
  });
  // Back to Top
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
