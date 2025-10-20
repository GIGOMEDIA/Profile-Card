// Update the time element with Date.now() every 1s
function updateTime(){
  const el = document.querySelector('[data-testid="test-user-time"]');
  if(!el) return;
  el.textContent = String(Date.now());
}

updateTime();
setInterval(updateTime, 1000);

// Avatar update handlers
const avatarImg = document.querySelector('[data-testid="test-user-avatar"]');
const urlInput = document.getElementById('avatarUrl');
const fileInput = document.getElementById('avatarFile');
const applyBtn = document.getElementById('applyAvatar');

function setAvatarFromUrl(url){
  if(!url) return;
  avatarImg.src = url;
}

function setAvatarFromFile(file){
  if(!file) return;
  const url = URL.createObjectURL(file);
  avatarImg.src = url;
}

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

