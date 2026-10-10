import { navItems, SLOGAN } from '../config/constants.js';
import { dataService } from '../services/dataService.js';
import { escapeHtml } from '../utils/helpers.js';
function getRootPrefix(){return window.location.pathname.includes('/pages/')?'../':''}
function resolveHref(path){return `${getRootPrefix()}${path}`}
function getCurrentPage(){return document.body.dataset.page||'home'}
function renderAuthControls(){
 const container=document.querySelector('[data-auth-slot]'); if(!container)return;
 if(!dataService.isSignedIn()){container.innerHTML=`<a class="ghost-btn focus-ring" href="${resolveHref('pages/auth.html')}">Sign In</a><a class="primary-btn focus-ring" href="${resolveHref('pages/auth.html#signup')}">Sign Up</a>`;return}
 const id=localStorage.getItem('cybersafe-current-user-id');const user=dataService.getUsers().find(x=>x.id===id);const label=user?user.name:'Guest';
 container.innerHTML=`<span class="badge">${escapeHtml(label)}</span><button class="secondary-btn focus-ring" type="button" data-signout>Sign Out</button>`;
 container.querySelector('[data-signout]')?.addEventListener('click',()=>{dataService.clearCurrentUser();window.location.href=resolveHref('index.html')});
}
export function injectLayout(){
 const headerTarget=document.querySelector('[data-header]');const footerTarget=document.querySelector('[data-footer]');
 if(headerTarget){const current=getCurrentPage();const navHtml=navItems.map(item=>`<a class="focus-ring ${current===item.page?'active':''}" href="${resolveHref(item.href)}">${item.label}</a>`).join('');
 headerTarget.innerHTML=`<div class="container header-inner"><a href="${resolveHref('index.html')}" class="brand focus-ring" aria-label="CyberSafe home"><span class="brand-mark">C</span><span>CyberSafe</span></a><nav class="main-nav" aria-label="Main navigation">${navHtml}</nav><div class="auth-row" data-auth-slot></div><button class="menu-toggle focus-ring" type="button" aria-label="Toggle navigation" aria-expanded="false">Menu</button></div>`;
 const toggle=headerTarget.querySelector('.menu-toggle');const nav=headerTarget.querySelector('.main-nav');toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false')}));renderAuthControls();}
 if(footerTarget)footerTarget.innerHTML=`<div class="container"><div class="footer-grid"><div><a href="${resolveHref('index.html')}" class="brand"><span class="brand-mark">C</span><span>CyberSafe</span></a><p style="color:#71869f;max-width:430px;margin-top:1rem">A practical digital-safety campaign helping everyday users build stronger passwords, protect personal data, spot scams and make safer online decisions.</p></div><div><h4>Explore</h4><div class="footer-links"><a href="${resolveHref('index.html')}">Homepage</a><a href="${resolveHref('pages/learning.html')}">Learning</a><a href="${resolveHref('pages/statistics.html')}">Statistics</a></div></div><div><h4>Campaign</h4><div class="footer-links"><a href="${resolveHref('pages/campaign.html')}">Campaign</a><a href="${resolveHref('pages/tools.html')}">Interactive tools</a><a href="${resolveHref('pages/about.html')}">About us</a></div></div></div><div class="footer-tagline">${escapeHtml(SLOGAN)} <span style="font-weight:500">• Stay aware. Stay secure.</span></div></div>`;
}
