// Cloudflare Worker: принимает заказ с сайта и шлёт в Telegram.
// Переменные (Settings → Variables, тип Secret): BOT_TOKEN, CHAT_ID; ALLOW_ORIGIN = https://ваш-логин.github.io
export default {
  async fetch(req, env) {
    const cors = {"Access-Control-Allow-Origin": env.ALLOW_ORIGIN || "*", "Access-Control-Allow-Headers": "Content-Type"};
    if (req.method === "OPTIONS") return new Response(null, {headers: cors});
    if (req.method !== "POST") return new Response("ok", {headers: cors});
    const d = await req.json();
    let text;
    if (d.type === "order") {
      text = `Заказ ${d.id}\n` + d.items.map(i => `• ${i.brand} ${i.name} (${i.size}) x${i.q} = ${i.price * i.q} ₽`).join("\n") +
        `\nТовары: ${d.sub} ₽, доставка: ${d.ship} ₽\nИТОГО: ${d.total} ₽\n` +
        `${d.name}, ${d.phone}, ${d.contact || ""}\n${d.delivery === "post" ? "Почта: " + d.address : "Самовывоз"}\n${d.comment || ""}`;
    } else {
      text = `Заявка (${d.type})\n` + Object.entries(d).filter(([k]) => k !== "type").map(([k, v]) => `${k}: ${v}`).join("\n");
    }
    const r = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
      method: "POST", headers: {"Content-Type": "application/json"},
      body: JSON.stringify({chat_id: env.CHAT_ID, text: text.slice(0, 3900)})
    });
    return new Response(null, {status: r.ok ? 200 : 502, headers: cors});
  }
};
