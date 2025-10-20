// Update the time element with Date.now() every 1s
function updateTime(){
  const el = document.querySelector('[data-testid="test-user-time"]');
  if(!el) return;
  el.textContent = String(Date.now());
}

updateTime();
setInterval(updateTime, 1000);

// Avatar update handlers (work on index or about page)
const avatarImg = document.querySelector('[data-testid="test-user-avatar"]');
let urlInput = document.getElementById('avatarUrl');
let fileInput = document.getElementById('avatarFile');
let applyBtn = document.getElementById('applyAvatar');

function setAvatarFromUrl(url, persist = true){
  if(!avatarImg || !url) return;
  avatarImg.src = url;
  if(persist){
    localStorage.setItem('profile_avatar', url);
  }
}

function setAvatarFromFile(file, persist = false){
  if(!avatarImg || !file) return;
  const url = URL.createObjectURL(file);
  avatarImg.src = url;
  // do not persist blobs in localStorage; optionally persist the object URL is not useful across reloads
}

// populate from storage if available
const stored = localStorage.getItem('profile_avatar');
if(stored && avatarImg){
  avatarImg.src = stored;
}

// re-query controls in case they exist on this page (About page)
urlInput = document.getElementById('avatarUrl');
fileInput = document.getElementById('avatarFile');
applyBtn = document.getElementById('applyAvatar');

applyBtn?.addEventListener('click', ()=>{
  const url = urlInput?.value?.trim();
  const file = fileInput?.files?.[0];
  if(file){
    setAvatarFromFile(file);
  } else if(url){
    setAvatarFromUrl(url);
  }
});

// Make sure social links are keyboard focusable (they are by default) and show focus styles.
// No further JS needed for that, but ensure they open in new tabs (HTML provides target="_blank").

// Small defensive export for tests (if the test harness runs in same scope)
window.__profileCard = {
  updateTime, setAvatarFromUrl, setAvatarFromFile
};

// Mobile nav toggle - support multiple toggles (header and card toggle)
;(function(){
  const toggles = Array.from(document.querySelectorAll('.nav-toggle'));
  if(!toggles.length) return;

  toggles.forEach(toggle => {
    // find the closest nav for this toggle: prefer sibling with id top-navigation or next .top-nav
    const header = toggle.closest('.site-header') || toggle.closest('.profile-card') || document;
    let nav = header.querySelector('#top-navigation');
    if(!nav) nav = header.querySelector('.top-nav');
    if(!nav) nav = document.getElementById('top-navigation');
    if(!nav) return;

    function setOpen(open){
      nav.classList.toggle('show', !!open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    }

    toggle.addEventListener('click', ()=>{
      const isOpen = nav.classList.contains('show');
      setOpen(!isOpen);
    });

    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>setOpen(false)));
  });
})();

// Card buttons (index) navigation
;(function(){
  const aboutBtn = document.querySelector('[data-testid="test-card-about"]');
  const contactBtn = document.querySelector('[data-testid="test-card-contact"]');
  if(aboutBtn) aboutBtn.addEventListener('click', ()=> location.href = 'about.html');
  if(contactBtn) contactBtn.addEventListener('click', ()=> location.href = 'contact.html');
})();

