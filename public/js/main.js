function getCart(){return JSON.parse(localStorage.getItem("cartKulinerKu"))||[]}
function saveCart(cart){localStorage.setItem("cartKulinerKu",JSON.stringify(cart));updateCartBadge()}
function updateCartBadge(){const badge=document.getElementById("cart-badge");if(badge)badge.textContent=getCart().reduce((sum,item)=>sum+item.qty,0)}
function formatRupiah(n){return "Rp "+n.toLocaleString("id-ID")}
function showToast(message){document.getElementById("toast-msg").textContent=message;bootstrap.Toast.getOrCreateInstance(document.getElementById("toast")).show()}

let filterAktif="semua";
const grid=document.getElementById("menu-grid");
const searchInput=document.getElementById("search-input");
const emptyMsg=document.getElementById("empty-msg");

function renderMenu(){
  const keyword=searchInput.value.trim().toLowerCase();
  const hasil=MENU.filter(m=>(filterAktif==="semua"||m.kategori===filterAktif)&&m.nama.toLowerCase().includes(keyword));
  grid.innerHTML=hasil.map(m=>`
    <div class="col-xl-3 col-lg-4 col-sm-6">
      <div class="card menu-card shadow-sm">
        <img src="${m.img}" class="card-img-top" alt="${m.nama}" loading="lazy">
        <div class="card-body">
          <span class="badge text-bg-danger mb-2">${m.kategori}</span>
          <h5 class="card-title fw-bold">${m.nama}</h5>
          <p class="price text-danger fw-bold">${formatRupiah(m.harga)}</p>
          <button class="btn btn-danger w-100" onclick="addToCart(${m.id})">+ Keranjang</button>
        </div>
      </div>
    </div>`).join("");
  emptyMsg.classList.toggle("d-none",hasil.length>0);
}
function addToCart(id){
  const cart=getCart(),menu=MENU.find(m=>m.id===id),item=cart.find(c=>c.id===id);
  if(item)item.qty++;else cart.push({...menu,qty:1});
  saveCart(cart);showToast(menu.nama+" ditambahkan ke keranjang!");
}
searchInput.addEventListener("input",renderMenu);
document.querySelectorAll(".filter-btn").forEach(btn=>btn.addEventListener("click",()=>{
  filterAktif=btn.dataset.kategori;
  document.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");renderMenu();
}));
renderMenu();updateCartBadge();
