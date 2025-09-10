// بيانات العطور للمستشار الذكي
const perfumes = [
  {
    id: 1,
    name: "سحر الليل",
    description: "عطر غامض يجمع بين الفخامة والجاذبية",
    price: "750 ر.س",
    image: "img/a1.jpg",
    moods: ["ثقة وجاذبية", "ليل", "مناسبة خاصة"],
    notes: ["زهور", "أخشاب"]
  },
  {
    id: 2,
    name: "حديقة الجنة",
    description: "مزيج من أزهار الربيع النادرة والمنعشة",
    price: "650 ر.س",
    image: "img/a5.jpg",
    moods: ["رومانسية", "نهار", "مناسبة خاصة"],
    notes: ["زهور", "فواكه"]
  },
  {
    id: 3,
    name: "أمبر الملكي",
    description: "عطر شرقي فاخر يمزج العنبر والخشب النادر",
    price: "850 ر.س",
    image: "img/a6.jpg",
    moods: ["ثقة وجاذبية", "ليل", "مناسبة خاصة"],
    notes: ["أخشاب", "توابل"]
  },
  {
    id: 4,
    name: "نسيم الصباح",
    description: "عطر منعش يجمع بين الحمضيات والأعشاب",
    price: "600 ر.س",
    image: "img/a4.jpg",
    moods: ["نشاط وحيوية", "نهار"],
    notes: ["فواكه", "أعشاب"]
  },
  {
    id: 5,
    name: "سلطاني",
    description: "عطر يجمع بين فخامة العود ودفء العنبر",
    price: "850 ر.س",
    image: "img/a7.jpg",
    moods: ["ثقة وجاذبية", "ليل", "مناسبة خاصة"],
    notes: ["أخشاب", "توابل"]
  }
];

// بيانات المنتجات
const products = [
  {
    id: 1,
    name: "سحر الليل",
    description: "عطر غامض يجمع بين الفخامة والجاذبية",
    price: 750,
    image: "img/a1.jpg"
  },
  {
    id: 2,
    name: "حديقة الجنة",
    description: "مزيج من أزهار الربيع النادرة والمنعشة",
    price: 650,
    image: "img/a5.jpg"
  },
  {
    id: 3,
    name: "أمبر الملكي",
    description: "عطر شرقي فاخر يمزج العنبر والخشب النادر",
    price: 850,
    image: "img/a6.jpg"
  },
  {
    id: 4,
    name: "سلطاني",
    description: "عطر يجمع بين فخامة العود ودفء العنبر",
    price: 850,
    image: "img/a7.jpg"
  },
  {
    id: 5,
    name: "نسيم الصباح",
    description: "عطر منعش يجمع بين الحمضيات والأعشاب",
    price: 600,
    image: "img/a4.jpg"
  }
];

// متغيرات التتبع
let currentStep = 1;
let userSelections = {};
let cart = [];
let cartCount = 0;

// عناصر DOM
const startAdvisorBtn = document.getElementById('start-advisor');
const advisorSection = document.getElementById('advisor');
const optionButtons = document.querySelectorAll('.option-btn');
const resultsContainer = document.getElementById('results-container');
const cartCountElement = document.querySelector('.cart-count');
const productsSection = document.getElementById('products');
const checkoutPage = document.getElementById('checkout-page');
const thankYouPage = document.getElementById('thank-you');
const cartIcon = document.getElementById('cartIcon');
const cartPanel = document.getElementById('cartPanel');
const cartItemsContainer = document.getElementById('cartItems');
const closeCartBtn = document.getElementById('closeCart');
const checkoutBtnCart = document.getElementById('checkout-btn-cart');
const confirmPurchaseBtn = document.getElementById('confirm-purchase');
const backToProductsFromCheckoutBtn = document.getElementById('back-to-products-from-checkout');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const buyNowButtons = document.querySelectorAll('.buy-now');
const paymentMethodRadios = document.querySelectorAll('input[name="payment-method"]');
const cardDetailsDiv = document.getElementById('card-details');

// تهيئة التطبيق
function initApp() {
  loadCartFromStorage();
  setupEventListeners();
  updateCartCount();
  applySavedTheme();
}

// تحميل السلة من localStorage
function loadCartFromStorage() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  }
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
  // أحداث المستشار الذكي
  startAdvisorBtn.addEventListener('click', function(e) {
    e.preventDefault();
    advisorSection.scrollIntoView({ behavior: 'smooth' });
  });

  optionButtons.forEach(button => {
    button.addEventListener('click', function() {
      const stepName = document.getElementById(`step-${currentStep}`).querySelector('.advisor-question').textContent;
      userSelections[stepName] = this.dataset.value;
      
      // التقديم إلى الخطوة التالية
      document.getElementById(`step-${currentStep}`).classList.remove('active');
      currentStep++;
      if (currentStep <= 3) {
        document.getElementById(`step-${currentStep}`).classList.add('active');
      } else {
        document.getElementById('step-results').classList.add('active');
      }

      // عرض النتائج بعد كل اختيار
      showResults();
    });
  });

  // أحداث السلة
  cartIcon.addEventListener('click', toggleCartPanel);
  closeCartBtn.addEventListener('click', toggleCartPanel);
  checkoutBtnCart.addEventListener('click', proceedToCheckout);

  // أحداث أزرار المنتجات
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-id'));
      const product = products.find(p => p.id === productId);
      addToCart(product);
    });
  });

  buyNowButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-id'));
      const product = products.find(p => p.id === productId);
      buyNow(product);
    });
  });

  // أحداث صفحة الدفع
  if (confirmPurchaseBtn) {
    confirmPurchaseBtn.addEventListener('click', confirmPurchase);
  }
  if (backToProductsFromCheckoutBtn) {
    backToProductsFromCheckoutBtn.addEventListener('click', backToProducts);
  }
  paymentMethodRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.value === 'card') {
        cardDetailsDiv.style.display = 'block';
      } else {
        cardDetailsDiv.style.display = 'none';
      }
    });
  });

  // أحداث أخرى
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('change', toggleTheme);
  }
}

// دالة عرض النتائج
function showResults() {
  resultsContainer.innerHTML = '';
  const selectedMood = userSelections["إيه الإحساس اللي بتدور عليه النهاردة؟"];
  const selectedNotes = userSelections["ما نوع الروائح التي تفضلها؟"];
  const selectedTime = userSelections["ما وقت الاستخدام؟"];
  
  // حساب درجة التطابق لكل عطر
  const scoredPerfumes = perfumes.map(perfume => {
    let score = 0;
    if (selectedMood && perfume.moods.includes(selectedMood)) {
      score++;
    }
    if (selectedNotes && perfume.notes.includes(selectedNotes)) {
      score++;
    }
    if (selectedTime && perfume.moods.includes(selectedTime)) {
      score++;
    }
    return { ...perfume, score };
  });

  // فرز العطور حسب درجة التطابق تنازليًا
  const sortedPerfumes = scoredPerfumes.sort((a, b) => b.score - a.score);

  // اختيار أول عطرين (أو ما هو متاح إذا كان أقل من اثنين)
  const bestMatches = sortedPerfumes.slice(0, 2);

  // عرض النتائج
  bestMatches.forEach((perfume, index) => {
    const card = document.createElement('div');
    card.classList.add('perfume-card');
    card.innerHTML = `
      <img src="${perfume.image}" alt="${perfume.name}" class="perfume-img">
      <div class="perfume-info">
        <h3 class="perfume-name">${perfume.name}</h3>
        <p class="perfume-desc">${perfume.description}</p>
        <span class="perfume-price">${perfume.price}</span>
        <button class="btn add-to-cart-advisor" data-id="${perfume.id}">
          <i class="fas fa-shopping-cart"></i> أضف إلى السلة
        </button>
      </div>
    `;
    setTimeout(() => {
      card.classList.add('visible');
    }, index * 100);
    resultsContainer.appendChild(card);
  });

  document.querySelectorAll('.add-to-cart-advisor').forEach(button => {
    button.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-id'));
      const product = products.find(p => p.id === productId);
      addToCart(product);
    });
  });
}

// إضافة منتج إلى السلة
function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  updateCartCount();
  saveCartToStorage();
  showNotification(`تم إضافة ${product.name} إلى السلة`);
}

// شراء الآن
function buyNow(product) {
  cart = [{ ...product, quantity: 1 }];
  cartCount = 1;
  updateCartCount();
  saveCartToStorage();
  proceedToCheckout();
}

// تحديث عداد السلة
function updateCartCount() {
  cartCountElement.textContent = cartCount;
}

// حفظ السلة في localStorage
function saveCartToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// عرض/إخفاء لوحة السلة
function toggleCartPanel() {
  cartPanel.classList.toggle('active');
  if (cartPanel.classList.contains('active')) {
    renderCartItems();
  }
}

// عرض عناصر السلة
function renderCartItems() {
  cartItemsContainer.innerHTML = '';
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart">السلة فارغة</p>';
    return;
  }
  let totalPrice = 0;
  cart.forEach(item => {
    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-item');
    cartItemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>${item.price * item.quantity} ر.س</p>
        <div class="quantity-controls">
          <button class="quantity-btn decrease-quantity" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn increase-quantity" data-id="${item.id}">+</button>
        </div>
      </div>
      <button class="remove-btn" data-id="${item.id}">×</button>
    `;
    cartItemsContainer.appendChild(cartItemElement);
    totalPrice += item.price * item.quantity;
  });
  const cartTotal = document.createElement('div');
  cartTotal.classList.add('cart-total');
  cartTotal.innerHTML = `<span>المجموع الكلي:</span><span class="total-price">${totalPrice} ر.س</span>`;
  cartItemsContainer.appendChild(cartTotal);
  document.querySelectorAll('.increase-quantity').forEach(button => {
    button.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-id'));
      changeQuantity(productId, 1);
    });
  });
  document.querySelectorAll('.decrease-quantity').forEach(button => {
    button.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-id'));
      changeQuantity(productId, -1);
    });
  });
  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-id'));
      removeItem(productId);
    });
  });
}

// تغيير كمية المنتج في السلة
function changeQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeItem(productId);
    }
  }
  updateCartCount();
  saveCartToStorage();
  renderCartItems();
}

// إزالة منتج من السلة
function removeItem(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartCount();
  saveCartToStorage();
  renderCartItems();
}

// الانتقال إلى صفحة الدفع
function proceedToCheckout() {
  if (cart.length === 0) {
    showNotification('السلة فارغة، أضف منتجات أولاً');
    return;
  }
  cartPanel.classList.remove('active');
  document.querySelectorAll('section').forEach(section => {
    section.style.display = 'none';
  });
  if (checkoutPage) {
    checkoutPage.style.display = 'block';
    renderOrderSummary();
    window.scrollTo(0, 0);
  }
}

// عرض ملخص الطلب
function renderOrderSummary() {
  const checkoutItems = document.getElementById('checkout-items');
  if (!checkoutItems) return;
  checkoutItems.innerHTML = '';
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 25;
  const total = subtotal + shipping;
  document.getElementById('subtotal').textContent = `${subtotal} ر.س`;
  document.getElementById('shipping').textContent = `${shipping} ر.س`;
  document.getElementById('total').textContent = `${total} ر.س`;
  cart.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('checkout-item');
    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="checkout-item-info">
        <h4>${item.name}</h4>
        <p>${item.quantity} × ${item.price} ر.س</p>
      </div>
    `;
    checkoutItems.appendChild(itemElement);
  });
}

// تأكيد عملية الشراء
function confirmPurchase() {
  const name = document.getElementById('customer-name').value;
  const phone = document.getElementById('customer-phone').value;
  const address = document.getElementById('customer-address').value;
  const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value;
  if (!name || !phone || !address || !paymentMethod) {
    showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
    return;
  }
  if (paymentMethod === 'card') {
    const cardNumber = document.getElementById('card-number').value;
    const cardExpiry = document.getElementById('card-expiry').value;
    const cardCvv = document.getElementById('card-cvv').value;
    const cardName = document.getElementById('card-name').value;
    if (!cardNumber || !cardExpiry || !cardCvv || !cardName) {
      showNotification('يرجى ملء جميع تفاصيل البطاقة', 'error');
      return;
    }
  }
  showSuccessMessage();
  cart = [];
  cartCount = 0;
  updateCartCount();
  saveCartToStorage();
}

// عرض رسالة النجاح
function showSuccessMessage() {
  if (checkoutPage) checkoutPage.style.display = 'none';
  if (thankYouPage) {
    thankYouPage.style.display = 'block';
    document.getElementById('order-number').textContent = Math.floor(Math.random() * 10000);
  }
}

// العودة إلى المنتجات
function backToProducts() {
  if (checkoutPage) checkoutPage.style.display = 'none';
  if (productsSection) productsSection.style.display = 'block';
  window.scrollTo(0, 0);
}

// وظيفة التبديل بين الوضع الداكن والفاتح
function toggleTheme() {
  const body = document.body;
  const isLightMode = body.classList.toggle('light-mode');
  if (isLightMode) {
    body.classList.remove('dark-mode');
  } else {
    body.classList.add('dark-mode');
  }
  localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
}

// تطبيق الت theme المحفوظ
function applySavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
  } else {
    document.body.classList.add('dark-mode');
  }
}

// عرض الإشعارات
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.classList.add('notification', type);
  notification.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i><span>${message}</span>`;
  document.body.appendChild(notification);
  setTimeout(() => notification.classList.add('show'), 100);
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => document.body.removeChild(notification), 300);
  }, 3000);
}

// بدء التطبيق
initApp();

// بدء التطبيق
initApp();


