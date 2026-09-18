"use client";

import { useMemo, useState } from "react";
import { ShoppingCart, MessageCircle, Instagram, Facebook, X, Flame, Star, Clock, MapPin, Plus, Minus, Trash2, ChevronDown } from "lucide-react";

const WHATSAPP = "5519999999999";

const pizzas = [
  {id:"margherita", name:"Margherita", cat:"Tradicionais", desc:"Molho de tomate, muçarela, tomate, manjericão e azeite.", price:49.9, img:"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1000&q=85"},
  {id:"calabresa", name:"Calabresa Artesanal", cat:"Tradicionais", desc:"Muçarela, calabresa fatiada, cebola roxa e orégano.", price:52.9, img:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=85"},
  {id:"portuguesa", name:"Portuguesa da Casa", cat:"Tradicionais", desc:"Muçarela, presunto, ovos, cebola, azeitonas e ervas.", price:56.9, img:"https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1000&q=85"},
  {id:"parma", name:"Parma & Rúcula", cat:"Especiais", desc:"Muçarela, presunto cru, rúcula, parmesão e redução balsâmica.", price:69.9, img:"https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=1000&q=85"},
  {id:"quattro", name:"Quattro Formaggi", cat:"Especiais", desc:"Muçarela, gorgonzola, parmesão e provolone.", price:67.9, img:"https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1000&q=85"},
  {id:"funghi", name:"Funghi & Alho-Poró", cat:"Especiais", desc:"Muçarela, cogumelos, alho-poró, parmesão e ervas.", price:65.9, img:"https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?auto=format&fit=crop&w=1000&q=85"},
  {id:"choco", name:"Chocolate & Morango", cat:"Doces", desc:"Chocolate cremoso, morangos e toque de açúcar.", price:54.9, img:"https://www.pizzariafornalhapopdelivery.shop/lovable-uploads/a3a0ef28-bd48-496b-9daa-052ecea565ef.png"},
  {id:"banana", name:"Banana Caramelada", cat:"Doces", desc:"Banana, canela, açúcar mascavo e doce de leite.", price:51.9, img:"https://2.bp.blogspot.com/-U_hsPWgk8FY/WtswKry0k-I/AAAAAAAACFM/EPpGl1UWIuItf-uybcRQogHLsg3f6ecDgCLcBGAs/s1600/pizzabananacaramelada-600x476.jpg"}
];

const sizes = { "Média": 0, "Grande": 12, "Família": 22 };
const crusts = { "Tradicional": 0, "Catupiry": 8, "Cheddar": 8 };
const extras = { "Muçarela extra": 7, "Bacon": 8, "Azeitonas": 4, "Manjericão": 3 };

const money = n => n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});

export default function Home(){
  const [cat,setCat]=useState("Tradicionais");
  const [cart,setCart]=useState([]);
  const [open,setOpen]=useState(null);

  const add=(p,size="Média",crust="Tradicional",extra=[])=>{
    const unit=p.price+sizes[size]+crusts[crust]+extra.reduce((s,e)=>s+extras[e],0);
    setCart(c=>[...c,{key:crypto.randomUUID(),...p,size,crust,extra,unit,qty:1}]);
    setOpen(null);
  };
  const qty=(key,d)=>setCart(c=>c.map(i=>i.key===key?{...i,qty:Math.max(1,i.qty+d)}:i));
  const remove=key=>setCart(c=>c.filter(i=>i.key!==key));
  const total=useMemo(()=>cart.reduce((s,i)=>s+i.unit*i.qty,0),[cart]);

  const order=()=>{
    if(!cart.length) return;
    const lines=cart.map(i=>`• ${i.qty}x ${i.name} — ${i.size}, borda ${i.crust}${i.extra.length?`, adicionais: ${i.extra.join(", ")}`:""} — ${money(i.unit*i.qty)}`);
    const text=`Olá, Bella Forneria! Gostaria de fazer este pedido:\n\n${lines.join("\n")}\n\nTotal: ${money(total)}\n\nNome:\nEndereço:\nForma de pagamento:`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`,"_blank");
  };

  return <main>
    <header className="nav">
      <a className="brand" href="#inicio"><span className="brandmark"><Flame size={18}/></span><span>Bella <b>Forneria</b></span></a>
      <nav><a href="#cardapio">Cardápio</a><a href="#historia">Nossa história</a><a href="#contato">Contato</a></nav>
      <a className="btn small" href="#cardapio"><ShoppingCart size={17}/> Pedir agora</a>
    </header>

    <section id="inicio" className="hero">
      <div className="heroShade"></div>
      <div className="heroContent">
        <span className="eyebrow">PIZZARIA ARTESANAL • MOGI GUAÇU</span>
        <h1>Da massa ao forno,<br/><em>sabor que conquista.</em></h1>
        <p>Tradição italiana, preparo artesanal e sabor de verdade em Mogi Guaçu.</p>
        <div className="actions"><a className="btn" href="#cardapio">Ver cardápio</a><a className="ghost" href="#video">Conheça nosso forno</a></div>
        <div className="heroStats"><span><Star fill="currentColor" size={17}/> 4,9 avaliação</span><span><Clock size={17}/> Entrega rápida</span><span><Flame size={17}/> Forno bem quente</span></div>
      </div>
    </section>

    <section id="video" className="videoSection section">
      <div className="sectionHead"><span className="eyebrow dark">FEITO DIANTE DOS SEUS OLHOS</span><h2>O ritual da pizza perfeita</h2><p>Da massa aberta à mão aos ingredientes frescos e ao forno: poucos segundos que explicam nosso cuidado.</p></div>
      <div className="videoFrame">
        <video autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1600&q=90">
          <source src="/pizza-loop.mp4" type="video/mp4"/>
        </video>
        <div className="videoFallback"></div>
        <div className="videoText"><span>Bella Forneria</span><strong>Da massa ao forno, sabor que conquista.</strong></div>
      </div>
      <p className="videoNote">Vídeo hero de 10 segundos em loop suave.</p>
    </section>

    <section id="cardapio" className="menu section">
      <div className="sectionHead"><span className="eyebrow dark">NOSSO CARDÁPIO</span><h2>Escolha sua favorita</h2><p>Receitas clássicas, combinações especiais e um final doce.</p></div>
      <div className="tabs">{["Tradicionais","Especiais","Doces"].map(x=><button className={cat===x?"active":""} onClick={()=>setCat(x)} key={x}>{x}</button>)}</div>
      <div className="grid">{pizzas.filter(p=>p.cat===cat).map(p=><article className="card" key={p.id}>
        <img src={p.img} alt={p.name}/>
        <div className="cardBody"><span className="tag">{p.cat}</span><h3>{p.name}</h3><p>{p.desc}</p><div className="priceRow"><div><small>A partir de</small><strong>{money(p.price)}</strong></div><button className="round" onClick={()=>setOpen(p)}><Plus/></button></div></div>
      </article>)}</div>
    </section>

    <section className="promo section">
      <div><span className="eyebrow">COMBO DA CASA</span><h2>Noite Bella</h2><p>2 pizzas grandes tradicionais + refrigerante 2L.</p><strong>R$ 119,90</strong></div>
      <a className="btn cream" href="#cardapio">Montar meu pedido</a>
    </section>

    <section id="historia" className="story section">
      <div className="storyImg"></div>
      <div><span className="eyebrow dark">NOSSA HISTÓRIA</span><h2>Uma forneria feita para reunir pessoas.</h2><p>A Bella Forneria nasceu como um modelo de pizzaria artesanal: massa preparada com tempo, ingredientes selecionados e aquele forno que transforma simplicidade em sabor.</p><p>O ambiente visual combina tradição italiana e rusticidade contemporânea — acolhedor para famílias, encontros e noites em casa.</p><div className="mini"><span><b>48h</b> fermentação lenta</span><span><b>100%</b> preparo artesanal</span><span><b>Todos os dias</b> ingredientes frescos</span></div></div>
    </section>

    <section className="reviews section">
      <div className="sectionHead"><span className="eyebrow dark">QUEM PROVA, CONTA</span><h2>Momentos que viram tradição</h2></div>
      <div className="reviewGrid">
        {[
          ["“Massa leve, borda perfeita e ingredientes muito bem equilibrados.”","Marina A."],
          ["“Pedido simples pelo WhatsApp e pizza chegou com ótima apresentação.”","Carlos R."],
          ["“A Parma & Rúcula virou a favorita aqui de casa.”","Fernanda M."]
        ].map(([t,n])=><blockquote key={n}><div className="stars">★★★★★</div><p>{t}</p><footer>{n}</footer></blockquote>)}
      </div>
    </section>

    <section className="delivery section">
      <div><span className="eyebrow">DELIVERY BELLA</span><h2>Sua pizza favorita, onde você estiver.</h2><p>Monte o pedido no site e envie tudo pronto pelo WhatsApp.</p></div>
      <a className="btn cream" href="#cardapio"><MessageCircle size={19}/> Fazer pedido</a>
    </section>

    <section className="faq section">
      <div className="sectionHead"><span className="eyebrow dark">DÚVIDAS FREQUENTES</span><h2>Antes de pedir</h2></div>
      {[
        ["Vocês fazem entrega?","Sim. Este site-modelo está preparado para receber pedidos de delivery pelo WhatsApp."],
        ["Posso escolher tamanho e borda?","Sim. Ao adicionar uma pizza, escolha tamanho, borda e adicionais."],
        ["Quais formas de pagamento?","O pedido enviado ao WhatsApp possui campo para combinar a forma de pagamento."],
        ["Os dados do endereço são reais?","Não. Este é um site demonstrativo; telefone, endereço e perfis sociais são fictícios."]
      ].map(([q,a],i)=><details key={q}><summary>{q}<ChevronDown/></summary><p>{a}</p></details>)}
    </section>

    <section id="contato" className="contact section">
      <div><span className="eyebrow dark">VENHA NOS VISITAR</span><h2>Bella Forneria</h2><p><MapPin size={18}/> Região central • Mogi Guaçu/SP</p><p><Clock size={18}/> Ter–Dom • 18h às 23h</p><p className="muted">Endereço e contatos demonstrativos.</p></div>
      <div className="map"><span><MapPin size={30}/><b>Mogi Guaçu • SP</b><small>Localização ilustrativa</small></span></div>
    </section>

    <footer>
      <div className="brand"><span className="brandmark"><Flame size={18}/></span><span>Bella <b>Forneria</b></span></div>
      <p>Da massa ao forno, sabor que conquista.</p>
      <div className="social"><a href="#" aria-label="Instagram"><Instagram/></a><a href="#" aria-label="Facebook"><Facebook/></a><a href="#" aria-label="X"><X/></a></div>
      <small>© 2026 Bella Forneria • Site demonstrativo</small>
    </footer>

    <a className="whatsapp" href={`https://wa.me/${WHATSAPP}`} target="_blank" aria-label="WhatsApp"><MessageCircle/></a>

    {open && <Configurator p={open} onClose={()=>setOpen(null)} onAdd={add}/>}

    <aside className={`cart ${cart.length?"show":""}`}>
      <div className="cartTitle"><ShoppingCart/><b>Seu pedido</b><span>{cart.reduce((s,i)=>s+i.qty,0)}</span></div>
      <div className="cartItems">{cart.map(i=><div className="cartItem" key={i.key}><div><b>{i.name}</b><small>{i.size} • {i.crust}{i.extra.length?` • ${i.extra.join(", ")}`:""}</small><strong>{money(i.unit*i.qty)}</strong></div><div className="cartControls"><button onClick={()=>qty(i.key,-1)}><Minus/></button><span>{i.qty}</span><button onClick={()=>qty(i.key,1)}><Plus/></button><button onClick={()=>remove(i.key)}><Trash2/></button></div></div>)}</div>
      <div className="cartFoot"><div><span>Total</span><b>{money(total)}</b></div><button className="btn full" onClick={order}><MessageCircle size={18}/> Enviar pelo WhatsApp</button></div>
    </aside>
  </main>
}

function Configurator({p,onClose,onAdd}){
  const [size,setSize]=useState("Média"), [crust,setCrust]=useState("Tradicional"), [extra,setExtra]=useState([]);
  const toggle=e=>setExtra(x=>x.includes(e)?x.filter(v=>v!==e):[...x,e]);
  const total=p.price+sizes[size]+crusts[crust]+extra.reduce((s,e)=>s+extras[e],0);
  return <div className="modalBackdrop" onMouseDown={onClose}><div className="modal" onMouseDown={e=>e.stopPropagation()}>
    <button className="close" onClick={onClose}>×</button><h2>{p.name}</h2><p>{p.desc}</p>
    <h4>Tamanho</h4><div className="choices">{Object.entries(sizes).map(([k,v])=><button className={size===k?"selected":""} onClick={()=>setSize(k)} key={k}>{k}<small>{v?`+ ${money(v)}`:"Incluso"}</small></button>)}</div>
    <h4>Borda</h4><div className="choices">{Object.entries(crusts).map(([k,v])=><button className={crust===k?"selected":""} onClick={()=>setCrust(k)} key={k}>{k}<small>{v?`+ ${money(v)}`:"Inclusa"}</small></button>)}</div>
    <h4>Adicionais</h4><div className="extras">{Object.entries(extras).map(([k,v])=><label key={k}><input type="checkbox" checked={extra.includes(k)} onChange={()=>toggle(k)}/><span>{k}</span><b>+ {money(v)}</b></label>)}</div>
    <button className="btn full" onClick={()=>onAdd(p,size,crust,extra)}>Adicionar • {money(total)}</button>
  </div></div>
}
