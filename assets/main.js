// Partículas animadas en el hero
const canvas = document.getElementById('hero-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  const particles = [];
  const particleCount = 50;

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.color = Math.random() > 0.5 ? 'rgba(0, 255, 255, 0.5)' : 'rgba(255, 0, 255, 0.5)';
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x > width) this.x = 0;
      if (this.x < 0) this.x = width;
      if (this.y > height) this.y = 0;
      if (this.y < 0) this.y = height;
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    for (let particle of particles) {
      particle.update();
      particle.draw();
    }
    requestAnimationFrame(animateParticles);
  }

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  initParticles();
  animateParticles();
}

// Efecto de aparición al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
  const fadeElements = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    fadeElements.forEach(el => observer.observe(el));
  } else {
    // Fallback para navegadores antiguos
    fadeElements.forEach(el => el.classList.add('visible'));
  }
});

// Panel de Partners (simulado)
const partnersData = { active: 127, todayLeads: 0, conversionRate: 68.5, monthlyRevenue: 156420 };
function updatePartnerStats() {
  const todayLeadsEl = document.getElementById('todayLeads');
  if (todayLeadsEl) todayLeadsEl.textContent = partnersData.todayLeads;
}
function generateLead() {
  const companies = [
    { name: 'TechSolutions S.L.', type: 'software', employees: 45 },
    { name: 'Marketing Pro Agency', type: 'agencia', employees: 12 },
    { name: 'Consulting Partners', type: 'empresa', employees: 28 }
  ];
  const c = companies[Math.floor(Math.random() * companies.length)];
  const budget = Math.floor(Math.random() * 50000) + 10000;
  const score = Math.floor(Math.random() * 30) + 70;
  const newLead = { id: Date.now(), name: c.name, type: c.type, employees: c.employees, budget: budget, score: score };
  const leadList = document.getElementById('leadList');
  if (leadList) {
    const div = document.createElement('div');
    div.style.cssText = 'background: var(--bg-card); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 15px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;';
    div.innerHTML = `<div><strong style="font-weight: 400;">${newLead.name}</strong><div style="color: #ccc; font-size: 0.85rem;">${newLead.type} • ${newLead.employees} empleados • Presupuesto: €${newLead.budget.toLocaleString()}</div></div><span style="background: var(--gradient-primary); color: #000; padding: 5px 12px; border-radius: 15px; font-weight: 400; font-size: 0.85rem;">${newLead.score}/100</span>`;
    leadList.appendChild(div);
    partnersData.todayLeads++;
    updatePartnerStats();
  }
}
updatePartnerStats();

// Casos de éxito rotativos
let currentCase = 0;
const cases = document.querySelectorAll('#casesGrid .case-card');
function rotateCases() {
  if (cases.length > 0) {
    cases.forEach((card, index) => {
      card.style.display = index === currentCase ? 'block' : 'none';
    });
    currentCase = (currentCase + 1) % cases.length;
  }
}
if (cases.length > 1) setInterval(rotateCases, 8000);

// KAI Chatbot (simulado)
function openKaiModal() {
  const modal = document.getElementById('kai-modal');
  const button = document.getElementById('kai-button');
  if (modal && button) {
    modal.style.display = 'flex';
    button.style.display = 'none';
  }
}
function closeKaiModal() {
  const modal = document.getElementById('kai-modal');
  const button = document.getElementById('kai-button');
  if (modal && button) {
    modal.style.display = 'none';
    button.style.display = 'block';
  }
}
function sendKai() {
  const input = document.getElementById('kai-input');
  const messages = document.getElementById('kai-messages');
  if (!input || !messages) return;
  const question = input.value.trim();
  if (!question) return;
  messages.innerHTML += `<div style="text-align:right;margin:6px 0;"><span style="background:var(--accent-cyan);color:var(--bg-dark);padding:5px 10px;border-radius:15px;font-size:0.75rem;">${question}</span></div>`;
  let answer = '';
  if (question.toLowerCase().includes('lead')) answer = 'Puedo ayudarte a generar leads automáticamente. Pulsa el botón "Generar Lead de Prueba" en tu dashboard.';
  else if (question.toLowerCase().includes('ley')) answer = 'La nueva Ley de IA exige identificar contenidos generados por IA desde febrero 2025. Te preparo un informe personalizado si quieres.';
  else if (question.toLowerCase().includes('correo')) answer = '¿Quieres que automatice el envío de correos a tus leads? Dame su email y preparo la secuencia.';
  else answer = 'Gracias por tu consulta. En breve te respondo con información detallada.';
  messages.innerHTML += `<div style="text-align:left;margin:6px 0;"><span style="background:rgba(255,255,255,0.1);color:var(--text-primary);padding:5px 10px;border-radius:15px;font-size:0.75rem;">${answer}</span></div>`;
  input.value = '';
  messages.scrollTop = messages.scrollHeight;
}
