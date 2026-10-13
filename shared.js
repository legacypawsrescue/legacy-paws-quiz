/* ============================================================
   LEGACY PAWS: shared helpers for match.html and help.html
   ============================================================ */

/* ---------- CAPTURE HOOK ----------
   Posts the tagged contact to the Wix Velo endpoint,
   which writes a row into the QuizLeads collection. */
function lpSend(contact){
  return fetch('https://www.legacypawsrescue.org/_functions/quizLead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact)
  }).then(function(r){
    if(!r.ok) throw new Error('bad response');
    return r.json();
  });
}

/* ---------- FREE DOG PARENT CHEAT SHEET ----------
   Anyone who subscribes gets this link on the spot, and their lead is
   tagged 'cheatsheet' + 'newsletter' with sendCheatSheet:true so the
   Wix side can email it to them automatically. See WIX-SETUP.md. */
const CHEAT_SHEET_URL = 'https://docs.google.com/document/d/1YmBSpngPS5GrfltCLcVLuoFuxS6RAX9FdsNQyMqKbng/edit?usp=sharing';

function cheatSheetDelivered(name){
  return `<div class="ok">You're in${name?', '+esc(name):''}. 🐾</div>
    <p style="text-align:center;margin:4px 0 12px;">Your Dog Parent Cheat Sheet is on its way to your inbox. Don't want to wait? It's right here:</p>
    <a class="btn full" href="${CHEAT_SHEET_URL}" target="_blank" rel="noopener" style="text-decoration:none;">Open my cheat sheet</a>`;
}

function subscribeFields(contact, on){
  if(!on) return contact;
  contact.tags = (contact.tags||[]).concat(['newsletter','cheatsheet']);
  contact.subscribe = true;
  contact.sendCheatSheet = true;
  contact.cheatSheetUrl = CHEAT_SHEET_URL;
  return contact;
}

/* ---------- STANDALONE SUBSCRIBE BOX ----------
   For pages where someone hasn't taken a quiz yet (the front door). */
function subscribeBlock(container, source){
  const box=el(`<div class="capture cheat">
    <h3>Get our free Dog Parent Cheat Sheet</h3>
    <p>The stuff we wish every dog parent knew on day one. The body signals most people miss, what your dog is really telling you, and the everyday habits that quietly make things harder. Join our email list and we'll send it straight to you.</p>
    <div class="err">Please enter a valid email.</div>
    <input class="sub-name" type="text" placeholder="First name (optional)" autocomplete="given-name">
    <input class="sub-email" type="email" placeholder="you@email.com" autocomplete="email">
    <button class="btn full navy">Send me the cheat sheet</button>
    <div class="privacy">We never share or sell your email. Unsubscribe anytime.</div>
  </div>`);
  container.appendChild(box);
  const btn=box.querySelector('button'), err=box.querySelector('.err');
  btn.onclick=()=>{
    const email=box.querySelector('.sub-email').value.trim();
    const name=box.querySelector('.sub-name').value.trim();
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ err.style.display='block'; return; }
    err.style.display='none'; btn.textContent='Saving...'; btn.disabled=true;
    const contact=subscribeFields({ email, name, path:'subscribe', tags:['subscribe','src:'+source], resultLabel:'', details:'' }, true);
    lpSend(contact).then(()=>{ box.innerHTML=cheatSheetDelivered(name); })
      .catch(()=>{ btn.textContent='Try again'; btn.disabled=false; err.textContent='Something went wrong. Please try again.'; err.style.display='block'; });
  };
}

/* ---------- QUIET RECORD ----------
   Sends a record of a finished quiz even when nobody leaves an email
   (marked anonymous). Never shows an error to the person. */
function lpRecord(payload){
  try{ lpSend(Object.assign({ email:'', name:'', anonymous:true }, payload)).catch(()=>{}); }catch(e){}
}
function readableAnswers(text){
  return Object.entries(text||{}).map(([q,a])=>q.replace(/\s+$/,'')+' '+a).join(' | ');
}
const ANON_NOTE = '<p class="privacy" style="margin-top:10px;">We save quiz answers, without your name or email, to help us make better matches.</p>';

function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function el(html){ const d=document.createElement('div'); d.innerHTML=html.trim(); return d.firstChild; }
function makeGo(app){
  return function go(render){ app.innerHTML=''; render(); window.scrollTo({top:0,behavior:'smooth'}); };
}

/* ---------- EMAIL CAPTURE BLOCK ----------
   opts:
     app        container element
     state      { path, answers, result }
     verb       'adopt' | 'help'
     dest       { href, label }   primary button (application, contact)
     extraTags  array of extra tags (e.g. rescue ids)
     extra      object merged into the contact payload
     onRestart  function */
function captureBlock(opts){
  const { app, state, verb, dest, onRestart } = opts;
  const extraTags = opts.extraTags || [];
  const isHelp = verb==='help';
  const heading = isHelp ? 'Want me to send this to you?' :
    'Want us to stay in touch?';
  const blurb = isHelp
    ? "Drop your email and we'll send this plan to your inbox so you have it whenever you need it. No spam, just this and the occasional thing we think actually helps."
    : "Leave your email and we'll follow up about next steps, no pressure and no obligation. This is an invitation, not a commitment.";

  const cap=el(`<div class="capture">
    <h3>${heading}</h3>
    <p>${blurb}</p>
    <div class="err" id="cap-err">Please enter a valid email.</div>
    <div class="row">
      <input id="cap-name" type="text" placeholder="First name (optional)" autocomplete="given-name">
    </div>
    <input id="cap-email" type="email" placeholder="you@email.com" autocomplete="email">
    <label class="optin"><input id="cap-sub" type="checkbox" checked>
      <span>Yes, add me to the Legacy Paws email list and send me the free <strong>Dog Parent Cheat Sheet</strong>.</span></label>
    <button class="btn full navy" id="cap-send">${isHelp?'Send it to me':'Keep me posted'}</button>
    <div class="privacy">We never share or sell your email. Unsubscribe anytime.</div>
  </div>`);
  app.appendChild(cap);

  if(dest && dest.href){
    app.appendChild(el(`<div style="text-align:center;margin-top:16px;">
      <a class="btn full" href="${esc(dest.href)}" target="_top" style="text-decoration:none;">${esc(dest.label)}</a>
    </div>`));
  }

  const restart=el(`<button class="btn ghost restart">Start over</button>`);
  restart.onclick=onRestart; app.appendChild(restart);

  document.getElementById('cap-send').onclick=()=>{
    const email=document.getElementById('cap-email').value.trim();
    const name=document.getElementById('cap-name').value.trim();
    const err=document.getElementById('cap-err');
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ err.style.display='block'; return; }
    err.style.display='none';

    const tags=['quiz', state.path].concat(extraTags);
    let resultLabel='';
    if(state.path==='match' && state.result && state.result.dogs && state.result.dogs.length){
      resultLabel='match:'+state.result.dogs.join(','); tags.push(resultLabel);
    }
    if(state.path==='help'){ resultLabel='help:'+(state.answers.issue||''); tags.push(resultLabel); }

    // Every extra answer bundled into one readable string.
    const skip={issue:1};
    const details=Object.keys(state.answers)
      .filter(k=>!skip[k])
      .map(k=>k+'='+state.answers[k])
      .join('; ');

    const sub=document.getElementById('cap-sub').checked;
    const contact=subscribeFields(Object.assign({ email, name, path:state.path, tags, resultLabel, details }, opts.extra||{}), sub);
    const btn=document.getElementById('cap-send'); btn.textContent='Saving...'; btn.disabled=true;
    lpSend(contact).then(()=>{
      cap.innerHTML = sub ? cheatSheetDelivered(name)
        : `<div class="ok">Got it${name?', '+esc(name):''}. You'll hear from us soon. 🐾</div>`;
    }).catch(()=>{ btn.textContent='Try again'; btn.disabled=false; err.textContent='Something went wrong. Please try again.'; err.style.display='block'; });
  };
}
