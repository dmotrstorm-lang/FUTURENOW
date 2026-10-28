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
const t=k=>T[lang][k]||k,L=o=>o[lang],P=id=>PRODUCTS.find(p=>p.id==id);
const money=n=>n.toLocaleString(lang=='ru'?'ru-RU':'en-US')+' ₽';
const save=()=>{LS.set('cart',cart);LS.set('fav',fav)};
const ph=p=>`<div class="ph" style="--h:${p.hue}">${p.img?`<img src="${p.img}" alt="">`:p.brand}</div>`;
const price=p=>(p.old?`<s>${money(p.old)}</s>`:'')+money(p.price);
const card=p=>`<div class="card"><a href="#/product/${p.id}">${ph(p)}</a><button class="fv ${fav.includes(p.id)?'on':''}" data-fav="${p.id}" aria-label="${t('fav')}">♥</button><div class="meta"><b>${p.brand}</b><span>${L(p.name)}</span><span>${price(p)}</span></div></div>`;
const grid=l=>l.length?`<div class="grid">${l.map(card).join('')}</div>`:`<p>${t('empty')}</p>`;
const inp=(n,l,r,type='text')=>`<input name="${n}" type="${type}" placeholder="${t(l)}${r?' *':''}" ${r?'required':''}>`;
const V={};
V.home=()=>`<section class="hero"><h1>${t('h1')}</h1><p>${t('sub')}</p><a class="btn" href="#/catalog">${t('shop')}</a></section><h2>${t('new')}</h2>${grid(PRODUCTS.slice(0,4))}<h2>${t('brands')}</h2>${V.brands()}`;
V.brands=()=>`<div class="grid">${BRANDS.map(b=>`<a href="#/catalog?brand=${encodeURIComponent(b.name)}"><b>${b.name}</b><br><span class="note">${b.city}</span><br>${L(b.about)}</a>`).join('')}</div>`;
V.catalog=q=>{let l=PRODUCTS.filter(p=>(!q.cat||p.cat==q.cat)&&(!q.brand||p.brand==q.brand)&&(!q.size||p.sizes.includes(q.size))&&(!q.sale||p.old));
if(q.sort)l=[...l].sort((a,b)=>q.sort=='asc'?a.price-b.price:b.price-a.price);
const sel=(n,o,lb)=>`<select data-f="${n}" aria-label="${lb}"><option value="">${lb}: ${t('any')}</option>${o.map(([v,x])=>`<option value="${v}" ${q[n]==v?'selected':''}>${x}</option>`).join('')}</select>`;
const sizes=[...new Set(PRODUCTS.flatMap(p=>p.sizes))];
return `<h1>${q.sale?t('sale'):q.cat?t(q.cat):t('new')}</h1><div class="filters">${sel('cat',['clothes','shoes','acc'].map(c=>[c,t(c)]),t('cat'))}${sel('brand',BRANDS.map(b=>[b.name,b.name]),t('brand'))}${sel('size',sizes.map(s=>[s,s]),t('size'))}${sel('sort',[['asc',t('asc')],['desc',t('desc')]],t('sort'))}</div>${grid(l)}`};
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
V.nf=()=>`<h1>${t('nf')}</h1><a class="btn" href="#/">${t('shop')}</a>`;
async function send(type,d){if(!SHOP.endpoint)return false;try{return(await fetch(SHOP.endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({type,...d})})).ok}catch{return false}}
function render(){const [path,qs]=(location.hash.slice(1)||'/').split('?'),q=Object.fromEntries(new URLSearchParams(qs)),s=path.split('/'),v=s[1]||'home';
$('#app').innerHTML=(V[v]||V.nf)(q,s[2]);document.documentElement.lang=lang;document.title='FUTURENOW';
$('#nav').innerHTML=[['new','/catalog'],['brands','/brands'],['clothes','/catalog?cat=clothes'],['shoes','/catalog?cat=shoes'],['acc','/catalog?cat=acc'],['sale','/catalog?sale=1'],['forb','/forbrands'],['info','/info']].map(([k,h])=>`<a href="#${h}">${t(k)}</a>`).join('');
$('[data-lang]').textContent=lang=='ru'?'EN':'RU';$('#favc').textContent='♥ '+fav.length;$('#cartc').textContent=t('cart')+' '+cart.reduce((a,i)=>a+i.q,0);
$('#foot').innerHTML=`<span>© FUTURENOW 2026</span><span>${SHOP.phone}</span><a href="${SHOP.tg}">${SHOP.tgName}</a><span>${SHOP.address}</span>`;scrollTo(0,0)}
document.addEventListener('click',e=>{const c=e.target.closest('button');if(!c)return;const d=c.dataset;
if('lang'in d){lang=lang=='ru'?'en':'ru';LS.set('lang',lang);render()}
else if(d.fav){fav=fav.includes(d.fav)?fav.filter(x=>x!=d.fav):[...fav,d.fav];save();render()}
else if(d.size){document.querySelectorAll('.sz[data-size]').forEach(x=>x.classList.remove('on'));c.classList.add('on')}
else if(d.add){const s=document.querySelector('.sz.on')?.dataset.size;if(!s)return alert(t('pick'));const i=cart.find(x=>x.id==d.add&&x.size==s);i?i.q++:cart.push({id:d.add,size:s,q:1});save();location.hash='/cart';render()}
else if(d.rm){cart.splice(+d.rm,1);save();render()}
else if(d.q){const[n,k]=d.q.split(':');cart[n].q=Math.max(1,cart[n].q+ +k);save();render()}});
document.addEventListener('change',e=>{const f=e.target.dataset.f;if(f){const q=new URLSearchParams((location.hash.split('?')[1]||''));e.target.value?q.set(f,e.target.value):q.delete(f);location.hash='/catalog?'+q}
else if('dl'in e.target.dataset){dl=e.target.value;render()}});
document.addEventListener('submit',async e=>{e.preventDefault();const f=e.target,d=Object.fromEntries(new FormData(f));
if(f.id=='co'){const items=cart.map(i=>{const p=P(i.id);return{brand:p.brand,name:L(p.name),size:i.size,q:i.q,price:p.price}}),sb=sub(),ship=d.dl=='post'?SHOP.postPrice:0;
const o={id:'FN-'+Date.now().toString(36).toUpperCase(),items,sub:sb,ship,total:sb+ship,name:d.name,phone:d.phone,contact:d.contact,delivery:d.dl,address:d.address,comment:d.comment};
o.sent=await send('order',o);LS.set('order',o);cart=[];save();location.hash='/order'}
else if(f.dataset.form){const ok=await send(f.dataset.form,d);$('#msg').textContent=ok?t('sent'):t('fail');if(ok)f.reset()}});
addEventListener('hashchange',render);render();
