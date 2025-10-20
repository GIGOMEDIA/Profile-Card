document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('contactForm');
  const success = document.getElementById('success');

  function showError(id, message){
    const el = document.getElementById('error-' + id);
    if(el){ el.textContent = message; }
  }

  function clearErrors(){
    ['name','email','subject','message'].forEach(id=> showError(id,''));
  }

  function validate(){
    clearErrors();
    let ok = true;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if(!name){ showError('name','Name is required'); ok = false; }
    if(!email){ showError('email','Email is required'); ok = false; }
    else if(!/^\S+@\S+\.\S+$/.test(email)){ showError('email','Enter a valid email'); ok = false; }
    if(!subject){ showError('subject','Subject is required'); ok = false; }
    if(!message || message.length < 10){ showError('message','Message must be at least 10 characters'); ok = false; }

    return ok;
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    success.hidden = true;
    if(validate()){
      // show success
      success.hidden = false;
      form.reset();
    }
  });
});
