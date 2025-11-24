// small site JS for interactive pieces
document.addEventListener('DOMContentLoaded', ()=> {
  // Year in footer
  const yearEls = document.querySelectorAll('#year');
  if(yearEls.length) yearEls.forEach(e => e.textContent = new Date().getFullYear());

  // Registration form logic (if present)
  const form = document.getElementById('regForm');
  if(form){
    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('email');
    const phoneEl = document.getElementById('phone');
    const eventEl = document.getElementById('eventSelect');
    const teamEl = document.getElementById('team');
    const deptEl = document.getElementById('dept');
    const msgEl = document.getElementById('regMsg');
    const savedList = document.getElementById('savedList');
    const submitBtn = document.getElementById('submitBtn');
    const clearBtn = document.getElementById('clearBtn');

    // load and display saved
    function loadRegs(){
      const regs = JSON.parse(localStorage.getItem('campus_regs') || '[]');
      if(!regs.length){
        savedList.textContent = 'No registrations yet.';
        return;
      }
      const ul = document.createElement('ul');
      regs.forEach(r=>{
        const li = document.createElement('li');
        li.textContent = `${r.name} — ${r.event} — ${r.email} — ${r.phone}`;
        ul.appendChild(li);
      });
      savedList.innerHTML = '';
      savedList.appendChild(ul);
    }
    loadRegs();

    submitBtn?.addEventListener('click', () => {
      if(!nameEl.value || !emailEl.value || !phoneEl.value || !eventEl.value) {
        msgEl.textContent = 'Please fill required fields.';
        return;
      }
      // Basic phone validation
      if(!/^\d{10}$/.test(phoneEl.value)) {
        msgEl.textContent = 'Phone should be 10 digits.';
        return;
      }
      const regs = JSON.parse(localStorage.getItem('campus_regs') || '[]');
      const payload = {
        name: nameEl.value.trim(),
        email: emailEl.value.trim(),
        phone: phoneEl.value.trim(),
        event: eventEl.value,
        team: teamEl.value.trim(),
        dept: deptEl.value.trim(),
        timestamp: new Date().toISOString()
      };
      regs.push(payload);
      localStorage.setItem('campus_regs', JSON.stringify(regs));
      msgEl.textContent = `Thanks, ${payload.name}! Your registration is saved (demo).`;
      form.reset();
      loadRegs();
    });

    clearBtn?.addEventListener('click', () => {
      if(confirm('Clear all saved registrations from this browser?')) {
        localStorage.removeItem('campus_regs');
        loadRegs();
        msgEl.textContent = 'Local registrations cleared.';
      }
    });
  }

  // small gallery click to enlarge (lightbox)
  const grid = document.getElementById('galleryGrid');
  if(grid){
    grid.addEventListener('click', e => {
      const img = e.target.closest('img');
      if(!img) return;
      const overlay = document.createElement('div');
      overlay.style = `
        position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:9999;
      `;
      const big = document.createElement('img');
      big.src = img.src;
      big.style = 'max-width:90%;max-height:90%;border-radius:8px;box-shadow:0 20px 40px rgba(0,0,0,0.6)';
      overlay.appendChild(big);
      overlay.addEventListener('click', ()=> overlay.remove());
      document.body.appendChild(overlay);
    });
  }
});
