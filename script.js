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
