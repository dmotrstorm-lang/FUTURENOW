// Тексты страниц. ВАЖНО: оферта и политика — шаблоны, перед запуском покажите юристу.
const CERTS=[3000,5000,10000,20000].map(n=>({id:'c'+n,brand:'FUTURENOW',cat:'cert',price:n,sizes:['—'],hue:225,
  name:{ru:`Сертификат ${n.toLocaleString('ru-RU')} ₽`,en:`Gift certificate ${n.toLocaleString('en-US')} ₽`}}));
const GALLERY=[[210,'3/4'],[30,'1/1'],[160,'4/5'],[280,'3/4'],[0,'1/1'],[90,'4/5'],[340,'3/4'],[240,'1/1']].map(([hue,ar],i)=>({hue,ar,
  cap:{ru:`Съёмка ${i+1}`,en:`Shoot ${i+1}`}})); // img:"img/gallery1.jpg" — чтобы подставить фото
const TX={ru:{cert:'Сертификаты',gallery:'Галерея',faq:'Вопросы и ответы',offer:'Договор оферты',privacy:'Политика конфиденциальности',
 certp:'Электронный подарочный сертификат на любую сумму из списка. После оплаты мы отправим код в Telegram или на email, он действует 12 месяцев.',buy:'Купить',
 draft:'Шаблон документа. Перед запуском магазина согласуйте с юристом и подставьте реквизиты.'},
 en:{cert:'Certificates',gallery:'Gallery',faq:'FAQ',offer:'Terms of sale',privacy:'Privacy policy',
 certp:'A digital gift certificate in any amount below. After payment we send the code via Telegram or email. Valid for 12 months.',buy:'Buy',
 draft:'Template. Have a lawyer review before launch and fill in the details.'}};
const PAGES={
faq:{ru:[
['Сколько идёт доставка?','Отправляем почтой после подтверждения оплаты, обычно в течение 1–3 рабочих дней. Срок в пути зависит от региона.'],
['Как оплатить заказ?','Банковским переводом по реквизитам или по QR-коду СБП. Они появляются сразу после оформления заказа.'],
['Можно ли вернуть товар?','Да, надлежащего качества в течение 7 дней после получения, если сохранены вид и бирки. Подробнее в договоре оферты.'],
['Как выбрать размер?','Размерная сетка указана в карточке товара. Если сомневаетесь, напишите нам в Telegram.'],
['Как работают сертификаты?','После оплаты присылаем код. При заказе назовите его менеджеру, сумма зачтётся.'],
['Как стать брендом на FUTURENOW?','Заполните форму на странице «Для брендов», мы ответим в течение нескольких дней.']],
en:[
['How long is delivery?','We ship by post after payment is confirmed, usually within 1–3 business days. Transit time depends on the region.'],
['How do I pay?','By bank transfer using the details, or by SBP QR code. Both appear right after you place the order.'],
['Can I return an item?','Yes, items in proper condition within 7 days of receipt, with appearance and tags intact. See the terms of sale.'],
['How do I choose a size?','The size chart is on the product page. If unsure, message us on Telegram.'],
['How do certificates work?','After payment we send a code. Quote it to a manager when ordering and the amount is deducted.'],
['How can my brand join FUTURENOW?','Fill in the form on the “For brands” page and we will reply within a few days.']]},
offer:{ru:[
['1. Общие положения','Настоящий договор является публичной офертой интернет-магазина FUTURENOW (далее — Продавец) и определяет порядок продажи товаров дистанционным способом. Оформление заказа означает согласие Покупателя с условиями договора.'],
['2. Заказ и оплата','Заказ оформляется на сайте. Цены указаны в рублях. Оплата производится банковским переводом по реквизитам или через СБП. Заказ считается подтверждённым после поступления средств на счёт Продавца.'],
['3. Доставка','Доступны самовывоз по адресу магазина и доставка Почтой России. Стоимость доставки указывается при оформлении. Товар передаётся после подтверждения оплаты.'],
['4. Возврат и обмен','Покупатель вправе отказаться от товара надлежащего качества в течение 7 дней после получения при сохранении товарного вида, бирок и документа об оплате. Расходы на обратную пересылку несёт Покупатель. Деньги возвращаются в течение 10 дней с момента получения товара Продавцом. Товары ненадлежащего качества возвращаются по законодательству РФ о защите прав потребителей.'],
['5. Сертификаты','Электронный сертификат действует 12 месяцев, не подлежит возврату и обмену на деньги.'],
['6. Персональные данные','Данные Покупателя обрабатываются согласно Политике конфиденциальности.'],
['7. Реквизиты Продавца','{{bank}}']],
en:[
['Courtesy translation','The Russian version prevails.'],
['1. Orders and payment','Orders are placed on the site. Prices are in rubles. Payment is by bank transfer or SBP. An order is confirmed once funds reach the Seller.'],
['2. Delivery','Pickup at the store or delivery by post. The delivery price is shown at checkout. Goods are handed over after payment is confirmed.'],
['3. Returns','Items in proper condition may be returned within 7 days of receipt if appearance, tags and proof of payment are preserved. Return shipping is paid by the Buyer. Refunds are made within 10 days after the Seller receives the goods.'],
['4. Certificates','Digital certificates are valid for 12 months and are not refundable.'],
['5. Seller details','{{bank}}']]},
privacy:{ru:[
['1. Какие данные мы собираем','Имя, телефон, Telegram или email, адрес доставки и комментарий к заказу. Эти данные вы вводите сами при оформлении заказа или в формах на сайте.'],
['2. Зачем','Для обработки заказа, связи с вами и доставки. Данные не используются для других целей без вашего согласия.'],
['3. Хранение и передача','Данные передаются только в Telegram-чат Продавца и службе доставки в объёме, необходимом для отправки. Корзина и избранное хранятся в вашем браузере.'],
['4. Ваши права','Вы можете запросить уточнение или удаление своих данных, написав нам в Telegram или по телефону из контактов.'],
['5. Cookie и localStorage','Сайт использует локальное хранилище браузера для корзины, избранного и выбора языка.']],
en:[
['1. Data we collect','Name, phone, Telegram or email, delivery address and order comment, entered by you at checkout or in forms.'],
['2. Purpose','Order processing, contacting you and delivery. We do not use it for other purposes without your consent.'],
['3. Storage and sharing','Data goes only to the Seller’s Telegram chat and the delivery service as needed. Cart and favorites stay in your browser.'],
['4. Your rights','Ask us to correct or delete your data via Telegram or the phone in our contacts.'],
['5. Local storage','The site uses browser storage for the cart, favorites and language.']]}};
