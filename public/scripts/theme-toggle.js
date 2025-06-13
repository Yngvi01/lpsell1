// Sistema de alternância de temas
class ThemeManager {
  constructor() {
    this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
    this.init();
  }

  // Detecta a preferência do sistema
  getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Recupera o tema armazenado no localStorage
  getStoredTheme() {
    return localStorage.getItem('theme');
  }

  // Armazena o tema no localStorage
  setStoredTheme(theme) {
    localStorage.setItem('theme', theme);
  }

  // Aplica o tema ao documento
  applyTheme(theme) {
    const html = document.documentElement;
    
    // Remove classes de tema existentes
    html.classList.remove('theme-light', 'theme-dark');
    
    // Adiciona a classe do tema atual
    if (theme !== 'system') {
      html.classList.add(`theme-${theme}`);
    }
    
    this.currentTheme = theme;
    this.setStoredTheme(theme);
    
    // Atualiza o ícone do botão
    this.updateToggleIcon();
  }

  // Alterna entre os temas
  toggleTheme() {
    let newTheme;
    
    switch (this.currentTheme) {
      case 'light':
        newTheme = 'dark';
        break;
      case 'dark':
        newTheme = 'light';
        break;
      default:
        // Se estiver no modo system, alterna para o oposto da preferência atual
        newTheme = this.getSystemTheme() === 'dark' ? 'light' : 'dark';
    }
    
    this.applyTheme(newTheme);
  }

  // Atualiza o ícone dos botões de alternância
  updateToggleIcon() {
    const desktopButton = document.getElementById('theme-toggle-desktop');
    const mobileButton = document.getElementById('theme-toggle-mobile-header');
    
    [desktopButton, mobileButton].forEach(button => {
      if (button) {
        const sunIcon = button.querySelector('.sun-icon');
        const moonIcon = button.querySelector('.moon-icon');
        
        if (this.currentTheme === 'dark') {
          if (sunIcon) sunIcon.style.display = 'block';
          if (moonIcon) moonIcon.style.display = 'none';
        } else {
          if (sunIcon) sunIcon.style.display = 'none';
          if (moonIcon) moonIcon.style.display = 'block';
        }
      }
    });
  }

  // Inicializa o sistema de temas
  init() {
    // Aplica o tema inicial
    this.applyTheme(this.currentTheme);
    
    // Escuta mudanças na preferência do sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (this.currentTheme === 'system') {
        this.applyTheme('system');
      }
    });
    
    // Aguarda o DOM estar pronto para configurar os botões
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupToggleButtons());
    } else {
      this.setupToggleButtons();
    }
  }

  // Configura os botões de alternância de tema existentes
  setupToggleButtons() {
    const desktopButton = document.querySelector('#theme-toggle-desktop');
    const mobileButton = document.querySelector('#theme-toggle-mobile-header');
    
    // Configura botão desktop
    if (desktopButton) {
      desktopButton.addEventListener('click', () => this.toggleTheme());
      desktopButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleTheme();
        }
      });
    }
    
    // Configura botão mobile
    if (mobileButton) {
      mobileButton.addEventListener('click', () => this.toggleTheme());
      mobileButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleTheme();
        }
      });
    }
    
    // Atualiza os ícones iniciais
    this.updateToggleIcon();
  }
}

// Inicializa o gerenciador de temas
const themeManager = new ThemeManager();

// Exporta para uso global se necessário
window.themeManager = themeManager;