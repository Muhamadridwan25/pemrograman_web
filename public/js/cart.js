const cartBody=document.getElementById("cart-body");
const cartEmpty=document.getElementById("cart-empty");
const cartContent=document.getElementById("cart-content");
const orderSuccess=document.getElementById("order-success");
const ONGKIR=10000;
function getCart(){return JSON.parse(localStorage.getItem("cartKulinerKu"))||[]}
function formatRupiah(n){return "Rp "+n.toLocaleString("id-ID")}
function saveCart(cart){localStorage.setItem("cartKulinerKu",JSON.stringify(cart));renderCart()}

function renderCart(){
  const cart=getCart();
  cartEmpty.classList.toggle("d-none",cart.length>0);
  cartContent.classList.toggle("d-none",cart.length===0);
  cartBody.innerHTML=cart.map((item,i)=>`
    <tr>
      <td><div class="d-flex align-items-center gap-2"><img src="${item.img}" class="cart-thumb" alt="${item.nama}"><strong>${item.nama}</strong></div></td>
      <td class="text-center">${formatRupiah(item.harga)}</td>
      <td class="text-center"><div class="qty-control">
        <button class="btn btn-sm btn-outline-danger" onclick="ubahQty(${i},-1)">−</button>
        <strong>${item.qty}</strong>
        <button class="btn btn-sm btn-outline-danger" onclick="ubahQty(${i},1)">+</button>
      </div></td>
      <td class="text-end fw-bold">${formatRupiah(item.harga*item.qty)}</td>
      <td><button class="btn btn-sm btn-outline-danger" aria-label="Hapus ${item.nama}" onclick="hapusItem(${i})">✕</button></td>
    </tr>`).join("");
  const subtotal=cart.reduce((sum,item)=>sum+item.harga*item.qty,0);
  document.getElementById("subtotal-biaya").textContent=formatRupiah(subtotal);
  document.getElementById("total-biaya").textContent=formatRupiah(subtotal+(subtotal?ONGKIR:0));
}
function ubahQty(index,delta){const cart=getCart();cart[index].qty+=delta;if(cart[index].qty<=0)cart.splice(index,1);saveCart(cart)}
function hapusItem(index){const cart=getCart();cart.splice(index,1);saveCart(cart)}

document.getElementById("checkout-form").addEventListener("submit",function(e){
  e.preventDefault();
  if(!this.checkValidity()){e.stopPropagation();this.classList.add("was-validated");return}
  if(getCart().length===0)return;
  const orderNum="KLR-"+Math.floor(Math.random()*90000+10000);
  document.getElementById("order-number").textContent=orderNum;
  localStorage.removeItem("cartKulinerKu");
  bootstrap.Modal.getOrCreateInstance(document.getElementById("checkoutModal")).hide();
  cartContent.classList.add("d-none");cartEmpty.classList.add("d-none");orderSuccess.classList.remove("d-none");
  window.scrollTo({top:0,behavior:"smooth"});
});
renderCart();
