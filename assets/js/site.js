class StaticSiteNavigation {
  constructor(toggleSelector, bodyClassName) {
    this.toggleButton = document.querySelector(toggleSelector);
    this.bodyClassName = bodyClassName;
  }

  initialize() {
    if (!this.toggleButton) {
      return;
    }

    this.toggleButton.addEventListener('click', () => this.toggleMenu());

    document.querySelectorAll('.nav-links a').forEach((link) => {
      link.addEventListener('click', () => this.closeMenu());
    });
  }

  toggleMenu() {
    const isOpen = document.body.classList.toggle(this.bodyClassName);
    this.toggleButton.setAttribute('aria-expanded', String(isOpen));
  }

  closeMenu() {
    document.body.classList.remove(this.bodyClassName);
    this.toggleButton.setAttribute('aria-expanded', 'false');
  }
}

class FooterYear {
  constructor(elementId) {
    this.element = document.getElementById(elementId);
  }

  initialize() {
    if (!this.element) {
      return;
    }

    this.element.textContent = String(new Date().getFullYear());
  }
}

class FromScratchWebsite {
  constructor() {
    this.navigation = new StaticSiteNavigation('.nav-toggle', 'nav-open');
    this.footerYear = new FooterYear('year');
  }

  initialize() {
    this.navigation.initialize();
    this.footerYear.initialize();
  }
}

const website = new FromScratchWebsite();
website.initialize();
