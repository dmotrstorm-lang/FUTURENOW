const $=s=>document.querySelector(s);
const LS={get:(k,d)=>{try{return JSON.parse(localStorage[k])??d}catch{return d}},set:(k,v)=>{try{localStorage[k]=JSON.stringify(v)}catch{}}};
let lang=LS.get('lang','ru'),cart=LS.get('cart',[]),fav=LS.get('fav',[]),dl='pickup';
const T={ru:{new:'Новинки',brands:'Бренды',clothes:'Одежда',shoes:'Обувь',acc:'Аксессуары',sale:'Скидки',forb:'Для брендов',info:'Доставка и оплата',
h1:'Новая русская мода',sub:'Одежда, обувь и аксессуары малых российских брендов.',shop:'В каталог',cat:'Категория',brand:'Бренд',size:'Размер',sort:'Сортировка',any:'Все',asc:'Дешевле',desc:'Дороже',empty:'Ничего не найдено. Сбросьте фильтры.',
add:'В корзину',pick:'Выберите размер',cart:'Корзина',cartE:'Корзина пуста. Выберите что-нибудь в каталоге.',fav:'Избранное',favE:'В избранном пока пусто.',del:'Удалить',sum:'Товары',ship:'Доставка',total:'Итого',go:'Оформить заказ',
name:'Имя',phone:'Телефон',cont:'Telegram или email',pickup:'Самовывоз (бесплатно)',post:'Почта',addr:'Адрес и индекс',comm:'Комментарий',place:'Оформить заказ',err:'Заполните обязательные поля',
ot:'Заказ принят',pay:'Оплатите заказ по реквизитам или по QR (СБП). Мы подтвердим заказ после поступления денег.',payee:'Получатель',inn:'ИНН',acc:'Счёт',bank:'Банк',bik:'БИК',corr:'Корр. счёт',purp:'Назначение',amt:'Сумма',copy:'Скопировать',noSent:'Заказ не отправлен в Telegram: не настроен endpoint. Напишите нам вручную.',
send:'Отправить',sent:'Отправлено. Мы свяжемся с вами.',fail:'Не удалось отправить. Напишите нам в Telegram.',bf:'Хотите продавать у нас?',bfp:'Расскажите о бренде. Мы отвечаем в течение нескольких дней.',bname:'Ваше имя',bbrand:'Название бренда',blink:'Ссылка на сайт или соцсети',bmsg:'Что вы производите',
ip:'Самовывоз: бесплатно, по адресу магазина. Почта: стоимость указана при оформлении, отправляем после оплаты.',ip2:'Оплата: банковский перевод по реквизитам или QR-код СБП.',contacts:'Контакты',nf:'Страница не найдена',city:'Город'},
en:{new:'New',brands:'Brands',clothes:'Clothing',shoes:'Shoes',acc:'Accessories',sale:'Sale',forb:'For brands',info:'Shipping & payment',
h1:'New Russian fashion',sub:'Clothing, shoes and accessories from small Russian brands.',shop:'Shop now',cat:'Category',brand:'Brand',size:'Size',sort:'Sort',any:'All',asc:'Price: low to high',desc:'Price: high to low',empty:'Nothing found. Reset the filters.',
add:'Add to cart',pick:'Choose a size',cart:'Cart',cartE:'Your cart is empty. Browse the catalog.',fav:'Favorites',favE:'No favorites yet.',del:'Remove',sum:'Items',ship:'Shipping',total:'Total',go:'Checkout',
name:'Name',phone:'Phone',cont:'Telegram or email',pickup:'Pickup (free)',post:'Post',addr:'Address and postcode',comm:'Comment',place:'Place order',err:'Fill in the required fields',
ot:'Order received',pay:'Pay using the bank details or the SBP QR code. We confirm the order once payment arrives.',payee:'Payee',inn:'Tax ID',acc:'Account',bank:'Bank',bik:'BIC',corr:'Corr. account',purp:'Purpose',amt:'Amount',copy:'Copy',noSent:'Order was not sent to Telegram: endpoint is not configured. Contact us manually.',
send:'Send',sent:'Sent. We will contact you.',fail:'Could not send. Message us on Telegram.',bf:'Want to sell with us?',bfp:'Tell us about your brand. We reply within a few days.',bname:'Your name',bbrand:'Brand name',blink:'Website or social link',bmsg:'What you make',
ip:'Pickup: free, at the store address. Post: price shown at checkout, shipped after payment.',ip2:'Payment: bank transfer or SBP QR code.',contacts:'Contacts',nf:'Page not found',city:'City'}};
const t=k=>T[lang][k]||k,L=o=>o[lang],P=id=>PRODUCTS.concat(CERTS).find(p=>p.id==id);
Object.assign(T.ru,TX.ru);Object.assign(T.en,TX.en);
Object.assign(T.ru,{menu:'Меню',newarr:'Новые поступления',price:'Цена',from:'от',all:'Смотреть все',allb:'Все бренды',nlt:'Подпишитесь на нашу рассылку и получите скидку 15% на первый заказ',subs:'Подписаться',consent:'Оставляя email, я соглашаюсь на обработку персональных данных',adr:'Адрес',about:'О нас',chan:'Канал',collab:'Сотрудничество',search:'Поиск'});
Object.assign(T.en,{menu:'Menu',newarr:'New arrivals',price:'Price',from:'from',all:'View all',allb:'All brands',nlt:'Subscribe to our newsletter and get 15% off your first order',subs:'Subscribe',consent:'By leaving my email I agree to personal data processing',adr:'Address',about:'About',chan:'Channel',collab:'Collaboration',search:'Search'});
const IC={m:'<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',s:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/></svg>',u:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-4 3-6 7-6s7 2 7 6"/></svg>',h:'<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>',b:'<svg viewBox="0 0 24 24"><path d="M6 8h12l1 12H5zM9 8V6a3 3 0 0 1 6 0v2"/></svg>',x:'<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',c:'<svg viewBox="0 0 24 24" style="width:14px"><path d="M9 6l6 6-6 6"/></svg>'};
const money=n=>n.toLocaleString(lang=='ru'?'ru-RU':'en-US')+' ₽';
const save=()=>{LS.set('cart',cart);LS.set('fav',fav)};
const ph=p=>`<div class="ph" style="--h:${p.hue}">${p.img?`<img src="${p.img}" alt="">`:p.brand}</div>`;
const price=p=>money(p.price)+(p.old?`<s>${money(p.old)}</s>`:'');
const card=p=>`<div class="card"><div class="tile"><a href="#/product/${p.id}">${ph(p)}</a>${p.old?'<i class="sale">SALE</i>':''}<button class="fv ${fav.includes(p.id)?'on':''}" data-fav="${p.id}" aria-label="${t('fav')}">${IC.h}</button><a class="bg" href="#/product/${p.id}">${IC.b}</a></div><a class="meta" href="#/product/${p.id}"><b>${p.brand}</b><span>${price(p)}</span><small>${p.sizes.join(' / ')}</small></a></div>`;
const grid=l=>l.length?`<div class="grid">${l.map(card).join('')}</div>`:`<p>${t('empty')}</p>`;
const inp=(n,l,r,type='text')=>`<input name="${n}" type="${type}" placeholder="${t(l)}${r?' *':''}" ${r?'required':''}>`;
const V={};
V.home=()=>`<div class="scroll">${PRODUCTS.map(card).join('')}</div><a class="band" href="#/gallery">${GALLERY.slice(0,3).map(g=>`<div class="ph" style="--h:${g.hue};aspect-ratio:4/3">${g.img?`<img src="${g.img}" alt="">`:''}</div>`).join('')}</a>`;
V.brands=()=>`<div class="grid">${BRANDS.map(b=>`<a href="#/catalog?brand=${encodeURIComponent(b.name)}"><b>${b.name}</b><br><span class="note">${b.city}</span><br>${L(b.about)}</a>`).join('')}</div>`;
const PR=[[0,5000],[5000,10000],[10000,20000],[20000,0]],inPr=(p,s)=>{if(!s)return true;const[a,b]=s.split('-').map(Number);return p.price>=a&&(!b||p.price<=b)};
V.catalog=q=>{const nq=(q.q||'').toLowerCase();let l=PRODUCTS.filter(p=>(!q.cat||p.cat==q.cat)&&(!q.sub||p.sub==q.sub)&&(!q.brand||p.brand==q.brand)&&(!q.size||p.sizes.includes(q.size))&&(!q.sale||p.old)&&(!nq||(p.brand+' '+L(p.name)).toLowerCase().includes(nq))&&inPr(p,q.price));
if(q.sort)l=[...l].sort((a,b)=>q.sort=='asc'?a.price-b.price:b.price-a.price);
const href=(k,v)=>{const u={...q};v?u[k]=v:delete u[k];return '#/catalog?'+new URLSearchParams(u)};
const dd=(k,lb,o)=>`<div class="dd"><button data-dd>${lb}</button><div class="pan"><a href="${href(k,'')}">${t('any')}</a>${o.map(([v,x])=>`<a href="${href(k,v)}" class="${q[k]==v?'on':''}">${x}</a>`).join('')}</div></div>`;
const br=BRANDS.find(b=>b.name==q.brand),sizes=[...new Set(PRODUCTS.flatMap(p=>p.sizes))];
const sb=q.sub&&q.cat?SUBS[q.cat].find(x=>x[0]==q.sub):null;
const title=br?br.name:q.q?`${t('search')}: ${q.q}`:q.sale?t('sale'):sb?L(sb[1]):q.cat?t(q.cat):t('newarr');
return `<div class="fbar"><div>${dd('cat',t('cat'),['clothes','shoes','acc'].map(c=>[c,t(c)]))}${br?'':dd('brand',t('brand'),BRANDS.map(b=>[b.name,b.name]))}${dd('size',t('size'),sizes.map(s=>[s,s]))}${dd('price',t('price'),PR.map(([a,b])=>[a+'-'+b,b?`${money(a)} – ${money(b)}`:`${t('from')} ${money(a)}`]))}</div><div class="r">${dd('sort',t('sort'),[['asc',t('asc')],['desc',t('desc')]])}</div></div><div class="wrap"><div class="thead ${br?'b':''}"><h1>${title}</h1>${br?`<p class="bdesc">${L(br.about)}</p>`:`<p class="blist">${BRANDS.map(b=>b.name).join(', ')}</p>`}</div>${grid(l)}</div>`};
V.product=(q,id)=>{const p=P(id);if(!p)return V.nf();return `<div class="two"><div>${ph(p)}</div><div><h1>${L(p.name)}</h1><p><a href="#/catalog?brand=${encodeURIComponent(p.brand)}"><b>${p.brand}</b></a></p><p class="tot">${price(p)}</p><p>${L(p.desc)}</p><div class="sizes">${p.sizes.map((s,i)=>`<button class="sz ${p.sizes.length==1?'on':''}" data-size="${s}">${s}</button>`).join('')}</div><button class="btn" data-add="${p.id}">${t('add')}</button> <button class="sz" data-fav="${p.id}">${fav.includes(p.id)?'♥':'♡'} ${t('fav')}</button></div></div>`};
V.favorites=()=>`<h1>${t('fav')}</h1>${fav.length?grid(fav.map(P).filter(Boolean)):`<p>${t('favE')}</p>`}`;
const sub=()=>cart.reduce((s,i)=>s+P(i.id).price*i.q,0);
V.cart=()=>{cart=cart.filter(i=>P(i.id));return `<h1>${t('cart')}</h1>`+(cart.length?cart.map((i,n)=>{const p=P(i.id);return `<div class="row">${ph(p)}<div><b>${p.brand}</b> ${L(p.name)}<br><span class="note">${i.size}</span></div><span class="q"><button data-q="${n}:-1">−</button> ${i.q} <button data-q="${n}:1">+</button></span><b>${money(p.price*i.q)}</b><button data-rm="${n}" class="sz">${t('del')}</button></div>`}).join('')+`<p class="tot">${t('sum')}: ${money(sub())}</p><a class="btn" href="#/checkout">${t('go')}</a>`:`<p>${t('cartE')}</p>`)};
V.checkout=()=>!cart.length?V.cart():`<h1>${t('go')}</h1><form id="co">${inp('name','name',1)}${inp('phone','phone',1,'tel')}${inp('contact','cont',0)}<label class="r"><input type="radio" name="dl" value="pickup" ${dl=='pickup'?'checked':''} data-dl> ${t('pickup')}</label><label class="r"><input type="radio" name="dl" value="post" ${dl=='post'?'checked':''} data-dl> ${t('post')} (+${money(SHOP.postPrice)})</label><input name="address" placeholder="${t('addr')}" ${dl=='post'?'required':'hidden'}><textarea name="comment" placeholder="${t('comm')}"></textarea><p class="tot">${t('total')}: ${money(sub()+(dl=='post'?SHOP.postPrice:0))}</p><button class="btn">${t('place')}</button></form>`;
V.order=()=>{const o=LS.get('order');if(!o)return V.nf();const b=SHOP.bank,purp=`${lang=='ru'?'Оплата заказа':'Order'} ${o.id}`;
const st=`ST00022|Name=${b.name}|PersonalAcc=${b.account}|BankName=${b.bankName}|BIC=${b.bik}|CorrespAcc=${b.corr}|PayeeINN=${b.inn}|Sum=${o.total*100}|Purpose=${purp}`;
let qr='';try{const c=qrcode(0,'M');c.addData(st);c.make();qr=c.createSvgTag(4)}catch{}
return `<h1>${t('ot')} ${o.id}</h1><p>${t('pay')}</p>${o.sent?'':`<p class="note"><b>${t('noSent')}</b></p>`}<div class="pay"><dl><dt>${t('amt')}</dt><dd><b>${money(o.total)}</b></dd><dt>${t('payee')}</dt><dd>${b.name}</dd><dt>${t('inn')}</dt><dd>${b.inn}</dd><dt>${t('acc')}</dt><dd>${b.account}</dd><dt>${t('bank')}</dt><dd>${b.bankName}</dd><dt>${t('bik')}</dt><dd>${b.bik}</dd><dt>${t('corr')}</dt><dd>${b.corr}</dd><dt>${t('purp')}</dt><dd>${purp}</dd></dl><div class="qr">${qr}</div></div>`};
V.forbrands=()=>`<h1>${t('bf')}</h1><p>${t('bfp')}</p><form data-form="brand">${inp('name','bname',1)}${inp('contact','cont',1)}${inp('brand','bbrand',1)}${inp('link','blink',0)}<textarea name="message" placeholder="${t('bmsg')}"></textarea><button class="btn">${t('send')}</button></form><p id="msg" class="note"></p>`;
V.info=()=>`<h1>${t('info')}</h1><p>${t('ip')}</p><p>${t('ip2')}</p><h2>${t('contacts')}</h2><p>${SHOP.phone}<br><a href="${SHOP.tg}">${SHOP.tgName}</a><br>${SHOP.address}<br>${SHOP.hours}</p>`;
V.certificates=()=>`<h1>${t('cert')}</h1><p>${t('certp')}</p><div class="grid">${CERTS.map(c=>`<div class="card">${ph(c)}<div class="meta"><b>${L(c.name)}</b></div><button class="btn" data-cert="${c.id}">${t('buy')}</button></div>`).join('')}</div>`;
V.gallery=()=>`<h1>${t('gallery')}</h1><div class="masonry">${GALLERY.map(g=>`<figure><div class="ph" style="--h:${g.hue};aspect-ratio:${g.ar}">${g.img?`<img src="${g.img}" alt="">`:''}</div><figcaption class="note">${L(g.cap)}</figcaption></figure>`).join('')}</div>`;
V.faq=()=>`<h1>${t('faq')}</h1>${PAGES.faq[lang].map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('')}`;
const b=SHOP.bank,bankTxt=()=>`${b.name}, ${lang=='ru'?'ИНН':'Tax ID'} ${b.inn}, ${b.account}, ${b.bankName}, ${lang=='ru'?'БИК':'BIC'} ${b.bik}`;
const legal=k=>()=>`<h1>${t(k)}</h1><p class="note">${t('draft')}</p>${PAGES[k][lang].map(([h,x])=>`<h2>${h}</h2><p class="legal">${x.replace('{{bank}}',bankTxt())}</p>`).join('')}`;
V.offer=legal('offer');V.privacy=legal('privacy');
V.nf=()=>`<h1>${t('nf')}</h1><a class="btn" href="#/">${t('shop')}</a>`;
async function send(type,d){if(!SHOP.endpoint)return false;try{return(await fetch(SHOP.endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({type,...d})})).ok}catch{return false}}
function paint(){const cnt=(n)=>n?`<sup>${n}</sup>`:'';
$('#ib-m').innerHTML=IC.m;$('#ib-s').innerHTML=IC.s;$('#ib-u').innerHTML=IC.u;$('#favc').innerHTML=IC.h+cnt(fav.length);$('#cartc').innerHTML=IC.b+cnt(cart.reduce((a,i)=>a+i.q,0));
$('[data-lang]').textContent=lang=='ru'?'EN':'RU';$('#sb input').placeholder=t('search');
const sup=(k,h,c)=>`<a href="${h}" class="${c||''}">${t(k)}</a>`,sb=k=>`<button data-sub="${k}">${t(k)}${IC.c}</button>`;
$('#drawer').innerHTML=`<div class="d1"><div class="dh"><span>${t('menu')}</span><button data-close aria-label="Close">${IC.x}</button></div>${sup('new','#/catalog')}${sb('brands')}${sb('clothes')}${sb('shoes')}${sb('acc')}<hr>${sup('cert','#/certificates','g')}${sup('gallery','#/gallery','g')}${sup('sale','#/catalog?sale=1','red')}${sup('forb','#/forbrands','red')}${sup('info','#/info','g')}</div>
<div class="d2"><div class="pan2" data-p="brands"><h3>${t('brands')}</h3>${BRANDS.map(b=>`<a class="l" href="#/catalog?brand=${encodeURIComponent(b.name)}">${b.name}</a>`).join('')}<hr><a class="btn o" href="#/brands">${t('allb')}</a></div>${['clothes','shoes','acc'].map(c=>`<div class="pan2" data-p="${c}"><h3>${t(c)}</h3>${SUBS[c].map(([k,n])=>`<a class="l" href="#/catalog?cat=${c}&sub=${k}">${L(n)}</a>`).join('')}<hr><a class="btn o" href="#/catalog?cat=${c}">${t('all')}</a></div>`).join('')}</div>`;
$('#foot').innerHTML=`<div><p>${t('nlt')}</p><form data-form="subscribe"><input name="email" type="email" placeholder="Email" required><button class="btn">${t('subs')}</button></form><p class="fm"></p><small>${t('consent')}</small></div><div><h4>${t('contacts')}</h4><a href="tel:${SHOP.phone}">${SHOP.phone}</a><a href="${SHOP.tg}">Telegram</a></div><div><h4>${t('adr')}</h4><span>${SHOP.address}</span><br><span>${SHOP.hours}</span></div><div><h4>${t('about')}</h4><a href="${SHOP.tg}">${t('chan')}</a><a href="#/info">${t('contacts')}</a><a href="#/offer">${t('offer')}</a><a href="#/privacy">${t('privacy')}</a><a href="#/faq">${t('faq')}</a><a href="${SHOP.tg}">${t('collab')}</a></div>`}
function render(){const [path,qs]=(location.hash.slice(1)||'/').split('?'),q=Object.fromEntries(new URLSearchParams(qs)),s=path.split('/'),v=s[1]||'home';
document.body.classList.remove('menu');$('#drawer').classList.remove('sub2');$('#sb').classList.remove('on');
const out=(V[v]||V.nf)(q,s[2]);$('#app').innerHTML=v=='home'||v=='catalog'?out:`<div class="wrap pg">${out}</div>`;
document.documentElement.lang=lang;document.title='FUTURENOW';paint();scrollTo(0,0)}
document.addEventListener('click',e=>{const c=e.target.closest('button');if(!c)return;const d=c.dataset;
if('lang'in d){lang=lang=='ru'?'en':'ru';LS.set('lang',lang);render()}
else if(d.fav){fav=fav.includes(d.fav)?fav.filter(x=>x!=d.fav):[...fav,d.fav];save();render()}
else if(d.size){document.querySelectorAll('.sz[data-size]').forEach(x=>x.classList.remove('on'));c.classList.add('on')}
else if(d.add){const s=document.querySelector('.sz.on')?.dataset.size;if(!s)return alert(t('pick'));const i=cart.find(x=>x.id==d.add&&x.size==s);i?i.q++:cart.push({id:d.add,size:s,q:1});save();location.hash='/cart';render()}
else if(d.cert){const i=cart.find(x=>x.id==d.cert);i?i.q++:cart.push({id:d.cert,size:'—',q:1});save();location.hash='/cart';render()}
else if(d.rm){cart.splice(+d.rm,1);save();render()}
else if(d.q){const[n,k]=d.q.split(':');cart[n].q=Math.max(1,cart[n].q+ +k);save();render()}});
document.addEventListener('change',e=>{const f=e.target.dataset.f;if(f){const q=new URLSearchParams((location.hash.split('?')[1]||''));e.target.value?q.set(f,e.target.value):q.delete(f);location.hash='/catalog?'+q}
else if('dl'in e.target.dataset){dl=e.target.value;render()}});
document.addEventListener('submit',async e=>{e.preventDefault();const f=e.target,d=Object.fromEntries(new FormData(f));
if(f.id=='co'){const items=cart.map(i=>{const p=P(i.id);return{brand:p.brand,name:L(p.name),size:i.size,q:i.q,price:p.price}}),sb=sub(),ship=d.dl=='post'?SHOP.postPrice:0;
const o={id:'FN-'+Date.now().toString(36).toUpperCase(),items,sub:sb,ship,total:sb+ship,name:d.name,phone:d.phone,contact:d.contact,delivery:d.dl,address:d.address,comment:d.comment};
o.sent=await send('order',o);LS.set('order',o);cart=[];save();location.hash='/order'}
else if(f.id=='sb'){location.hash='/catalog?q='+encodeURIComponent(d.q)}
else if(f.dataset.form){const ok=await send(f.dataset.form,d);(f.querySelector('.fm')||$('#msg')).textContent=ok?t('sent'):t('fail');if(ok)f.reset()}});
addEventListener('hashchange',render);render();

document.addEventListener('click',e=>{const x=e.target;
if(x.closest('[data-close]'))document.body.classList.remove('menu');
if(x.closest('[data-open]'))document.body.classList.add('menu');
const sb=x.closest('[data-sub]');if(sb){document.querySelectorAll('.pan2').forEach(p=>p.classList.toggle('on',p.dataset.p==sb.dataset.sub));$('#drawer').classList.add('sub2')}
if(x.closest('[data-search]')){$('#sb').classList.toggle('on');$('#sb input').focus()}
const d=x.closest('[data-dd]');document.querySelectorAll('.dd.open').forEach(o=>{if(!d||o!==d.parentNode)o.classList.remove('open')});if(d)d.parentNode.classList.toggle('open')});
