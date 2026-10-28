// Заглушки. hue — цвет плейсхолдера (0–360). Чтобы добавить фото: img:"img/name.jpg"
const BRANDS = [
  {name:"NORD LAB", city:"Санкт-Петербург", about:{ru:"Технологичная верхняя одежда.", en:"Technical outerwear."}},
  {name:"KVANT", city:"Москва", about:{ru:"Базовый трикотаж свободного кроя.", en:"Relaxed-fit essentials."}},
  {name:"SIGNAL", city:"Казань", about:{ru:"Обувь ручной работы.", en:"Handmade footwear."}},
  {name:"OBLAKO", city:"Екатеринбург", about:{ru:"Аксессуары из переработанных материалов.", en:"Accessories from recycled materials."}}
];
const PRODUCTS = [
 {id:"p1",brand:"NORD LAB",cat:"clothes",price:18900,sizes:["S","M","L"],hue:210,name:{ru:"Куртка Arc",en:"Arc jacket"},desc:{ru:"Водоотталкивающая ткань, скрытые карманы.",en:"Water-repellent fabric, hidden pockets."}},
 {id:"p2",brand:"KVANT",cat:"clothes",price:5400,sizes:["XS","S","M","L","XL"],hue:160,name:{ru:"Худи Базис",en:"Basis hoodie"},desc:{ru:"Плотный футер, свободный крой.",en:"Heavy fleece, relaxed fit."}},
 {id:"p3",brand:"KVANT",cat:"clothes",price:4200,old:5200,sizes:["S","M","L"],hue:30,name:{ru:"Футболка Ноль",en:"Zero tee"},desc:{ru:"Органический хлопок 240 г.",en:"240 g organic cotton."}},
 {id:"p4",brand:"SIGNAL",cat:"shoes",price:14500,sizes:["39","40","41","42","43"],hue:0,name:{ru:"Ботинки Импульс",en:"Impulse boots"},desc:{ru:"Натуральная кожа, ручная сборка.",en:"Natural leather, hand-assembled."}},
 {id:"p5",brand:"SIGNAL",cat:"shoes",price:11900,old:13900,sizes:["38","39","40","41"],hue:280,name:{ru:"Кеды Сигнал",en:"Signal sneakers"},desc:{ru:"Лёгкая подошва, прошитый верх.",en:"Light sole, stitched upper."}},
 {id:"p6",brand:"OBLAKO",cat:"acc",price:3200,sizes:["one size"],hue:90,name:{ru:"Сумка Облако",en:"Cloud bag"},desc:{ru:"Переработанный нейлон.",en:"Recycled nylon."}},
 {id:"p7",brand:"OBLAKO",cat:"acc",price:1800,sizes:["one size"],hue:340,name:{ru:"Шапка Тихо",en:"Quiet beanie"},desc:{ru:"Мериносовая шерсть.",en:"Merino wool."}},
 {id:"p8",brand:"NORD LAB",cat:"clothes",price:9800,sizes:["M","L","XL"],hue:240,name:{ru:"Брюки Карго N2",en:"Cargo N2 pants"},desc:{ru:"Съёмные карманы, регулируемый низ.",en:"Detachable pockets, adjustable hem."}}
];
