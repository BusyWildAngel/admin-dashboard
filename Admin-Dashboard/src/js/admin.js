import { supabase } from './supabaseClient.js'

// Elements
const loginForm = document.getElementById('login-form')
const dashboard = document.getElementById('dashboard-section')
const authSection = document.getElementById('auth-section')
const logoutBtn = document.getElementById('logout-btn')
const form = document.getElementById('product-form')
const tableBody = document.querySelector('#product-table tbody')
const loadingDiv = document.getElementById('loading')

// 🔐 Check if user is signed in
async function checkSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    showDashboard()
    loadProducts()
  } else {
    showLogin()
  }
}

// 🧠 Show/Hide sections
function showDashboard() {
  authSection.style.display = 'none'
  dashboard.style.display = 'block'
}

function showLogin() {
  authSection.style.display = 'block'
  dashboard.style.display = 'none'
}

// 🔓 Handle Login
loginForm?.addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = document.getElementById('email').value.trim()
  const password = document.getElementById('password').value.trim()

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    alert('Login failed: ' + error.message)
  } else {
    checkSession()
  }
  form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert('Login failed: ' + error.message);
    return;
  }

  // Save session/token if needed
  console.log('Logged in:', data);
  window.location.href = 'admin-dashboard.html'; // or wherever
});

})

// 🚪 Logout
logoutBtn?.addEventListener('click', async () => {
  await supabase.auth.signOut()
  showLogin()
})

// 📦 Load Products
async function loadProducts() {
  loadingDiv.textContent = 'Loading products...'
  const { data: products, error } = await supabase.from('products').select('*')

  if (error) {
    loadingDiv.textContent = 'Failed to load products.'
    console.error('Error loading products:', error)
    return
  }

  loadingDiv.style.display = 'none'
  tableBody.innerHTML = ''

  for (const product of products) {
    const row = document.createElement('tr')
    const imageUrl = product.image_url
      ? `<img src="${product.image_url}" width="60" />`
      : 'No image'

    row.innerHTML = `
      <td>${imageUrl}</td>
      <td>${product.name}</td>
      <td>${product.price} DA</td>
      <td><button onclick="deleteProduct('${product.id}')">🗑</button></td>
    `
    tableBody.appendChild(row)
  }
}

// ➕ Add Product
form?.addEventListener('submit', async (e) => {
  e.preventDefault()

  const name = document.getElementById('name').value.trim()
  const price = parseFloat(document.getElementById('price').value)
  const imageFile = document.getElementById('image').files[0]

  if (!name || !price || !imageFile) return alert('Fill in all fields.')

  const filePath = `${Date.now()}_${imageFile.name}`
  const { data: imageData, error: uploadError } = await supabase
    .storage
    .from('product-images')
    .upload(filePath, imageFile)

  if (uploadError) {
    console.error('Upload error:', uploadError)
    return alert('Image upload failed')
  }

  const imageUrl = `${supabase.storageUrl}/object/public/product-images/${filePath}`

  const { error } = await supabase
    .from('products')
    .insert([{ name, price, image_url: imageUrl }])

  if (error) {
    console.error('Insert error:', error)
    return alert('Failed to add product.')
  }

  form.reset()
  loadProducts()
})

// 🗑 Delete
window.deleteProduct = async (id) => {
  const confirmed = confirm('Are you sure you want to delete this product?')
  if (!confirmed) return

  const { error } = await supabase.from('products').delete().eq('id', id)

  if (error) {
    console.error('Delete error:', error)
    alert('Failed to delete.')
  } else {
    loadProducts()
  }
}

// 🔁 Keep session alive
supabase.auth.onAuthStateChange((_event, session) => {
  if (session) showDashboard()
  else showLogin()
})

// 🚀 Start
checkSession()
