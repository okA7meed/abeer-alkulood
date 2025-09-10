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
    name: "أمبر الملكي", // تم تصحيح الاسم ليطابق بيانات المستشار
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
const steps = document.querySelectorAll('.advisor-step');
const optionButtons = document.querySelectorAll('.option-btn');
const resultsContainer = document.getElementById('results-container');
const cartCountElement = document.querySelector('.cart-count');
const productPage = document.getElementById('product-page');
const checkoutPage = document.getElementById('checkout-page');
const thankYouPage = document.getElementById('thank-you');
const viewProductButtons = document.querySelectorAll('.view-product');
const addToCartBtn = document.getElementById('add-to-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const completePurchaseBtn = document.getElementById('complete-purchase');
const backToProductsBtn = document.getElementById('back-to-products');
const backToProductBtn = document.getElementById('back-to-product');
const backToHomeBtn = document.getElementById('back-to-home');
const perfumeBottle = document.getElementById('perfume-bottle');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const cardInput = document.getElementById('card');
const cardIcon = document.getElementById('card-icon');
const themeToggle = document.getElementById('theme-toggle');
const hamburgerMenu = document.getElementById('hamburger-menu');
const mainNav = document.getElementById('main-nav');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.querySelector('.newsletter-form');
const cartIcon = document.getElementById('cartIcon');
const cartPanel = document.getElementById('cartPanel');
const cartItemsContainer = document.getElementById('cartItems');
const closeCartBtn = document.getElementById('closeCart');
const checkoutBtnCart = document.getElementById('checkout-btn');
const backToProductsFromCheckoutBtn = document.getElementById('back-to-products-from-checkout');
const confirmPurchaseBtn = document.getElementById('confirm-purchase');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const buyNowButtons = document.querySelectorAll('.buy-now');

// تهيئة التطبيق
function initApp() {
  loadCartFromStorage();
  setupEventListeners();
  updateCartCount();
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
      const parentStepId = this.closest('.advisor-step').id;
      let stepName = document.getElementById(parentStepId).querySelector('.advisor-question').textContent;

      userSelections[stepName] = this.dataset.value;

      if (currentStep < 3) {
        document.getElementById(`step-${currentStep}`).classList.remove('active');
        currentStep++;
        document.getElementById(`step-${currentStep}`).classList.add('active');

        if (stepName.includes("نوع الروائح")) {
          document.body.style.backgroundImage = `linear-gradient(rgba(10, 10, 10, 0.9), rgba(10, 10, 10, 0.9)), url('https://source.unsplash.com/random/1600x900/?${this.dataset.value}')`;
        }
      } else {
        document.getElementById(`step-${currentStep}`).classList.remove('active');
        showResults();
        document.getElementById('step-results').classList.add('active');
      }
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
      const productName = this.getAttribute('data-name');
      const productPrice = parseInt(this.getAttribute('data-price'));
      const productImage = this.getAttribute('data-image');

      addToCart(productId, productName, productPrice, productImage);
    });
  });

  buyNowButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-id'));
      const productName = this.getAttribute('data-name');
      const productPrice = parseInt(this.getAttribute('data-price'));
      const productImage = this.getAttribute('data-image');

      buyNow(productId, productName, productPrice, productImage);
    });
  });

  // أحداث صفحة الدفع
  backToProductsFromCheckoutBtn.addEventListener('click', backToProducts);
  confirmPurchaseBtn.addEventListener('click', confirmPurchase);

  // أحداث أخرى
  themeToggle.addEventListener('change', toggleTheme);
  hamburgerMenu.addEventListener('click', toggleMobileMenu);
  navLinks.forEach(link => {
    link.addEventListener('click', smoothScrollToTarget);
  });
  window.addEventListener('scroll', activateNavLinkOnScroll);
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('شكراً لتواصلكم معنا! سنرد عليكم في أقرب وقت ممكن.');
    this.reset();
  });
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');
    alert(`شكراً لاشتراككم في النشرة البريدية باستخدام: ${emailInput.value}`);
    emailInput.value = '';
  });
}

// دالة عرض النتائج
function showResults() {
  const selectedMood = userSelections["إيه الإحساس اللي بتدور عليه النهاردة؟"];
  const selectedNotes = userSelections["ما نوع الروائح التي تفضلها؟"];
  const selectedTime = userSelections["ما وقت الاستخدام؟"];

  let filteredPerfumes = perfumes.filter(perfume => {
    const hasMood = perfume.moods.includes(selectedMood);
    const hasNotes = perfume.notes.includes(selectedNotes);
    const hasTime = perfume.moods.includes(selectedTime);
    return hasMood && hasNotes && hasTime;
  });
  
  // إذا لم يتم العثور على نتائج، قم بتوسيع البحث
  if (filteredPerfumes.length === 0) {
    filteredPerfumes = perfumes.filter(perfume => {
      const hasMood = perfume.moods.includes(selectedMood);
      const hasNotes = perfume.notes.includes(selectedNotes);
      return hasMood && hasNotes;
    });
  }

  renderResults(filteredPerfumes);
}

// دالة لعرض العطور المقترحة
function renderResults(results) {
  resultsContainer.innerHTML = '';

  if (results.length === 0) {
    resultsContainer.innerHTML = '<p class="no-results-message">عذراً، لم نجد أي عطر يطابق اختياراتك. يرجى تجربة خيارات أخرى.</p>';
    return;
  }

  results.forEach((perfume, index) => {
    const card = document.createElement('div');
    card.classList.add('perfume-card');
    card.innerHTML = `
      <img src="${perfume.image}" alt="${perfume.name}" class="perfume-img">
      <div class="perfume-info">
        <h3 class="perfume-name">${perfume.name}</h3>
        <p class="perfume-desc">${perfume.description}</p>
        <span class="perfume-price">${perfume.price}</span>
        <button class="btn add-to-cart-advisor" data-id="${perfume.id}" data-name="${perfume.name}" data-price="${parseInt(perfume.price)}" data-image="${perfume.image}">
          <i class="fas fa-shopping-cart"></i> أضف إلى السلة
        </button>
      </div>
    `;

    // إضافة تأثير الظهور
    setTimeout(() => {
      card.classList.add('visible');
    }, index * 100);

    resultsContainer.appendChild(card);
  });

  // إضافة مستمعي الأحداث لأزرار "أضف إلى السلة" الجديدة
  document.querySelectorAll('.add-to-cart-advisor').forEach(button => {
    button.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-id'));
      const productName = this.getAttribute('data-name');
      const productPrice = parseInt(this.getAttribute('data-price'));
      const productImage = this.getAttribute('data-image');
      addToCart(productId, productName, productPrice, productImage);
    });
  });
}

// إضافة منتج إلى السلة
function addToCart(productId, productName, productPrice, productImage) {
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: productId, name: productName, price: productPrice, image: productImage, quantity: 1 });
  }
  cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  updateCartCount();
  saveCartToStorage();
  showNotification(`تم إضافة ${productName} إلى السلة`);
}

// شراء الآن
function buyNow(productId, productName, productPrice, productImage) {
  cart = [{ id: productId, name: productName, price: productPrice, image: productImage, quantity: 1 }];
  cartCount = 1;
  updateCartCount();
  saveCartToStorage();
  showCheckoutPage();
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
  cartTotal.innerHTML = `
    <span>المجموع الكلي:</span>
    <span class="total-price">${totalPrice} ر.س</span>
  `;
  cartItemsContainer.appendChild(cartTotal);

  // إضافة مستمعي الأحداث لأزرار التحكم بالكمية
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
  cartPanel.classList.remove('active');
  window.location.href = "checkout.html"; // افترض أن هناك صفحة دفع منفصلة
}

// دالة للتبديل بين الوضع الليلي والنهاري
function toggleTheme() {
  document.body.classList.toggle('light-mode');
}

// دالة للتبديل بين قائمة الجوال
function toggleMobileMenu() {
  mainNav.classList.toggle('active');
  hamburgerMenu.classList.toggle('active');
  document.body.classList.toggle('menu-open');
}

// دالة للتمرير السلس
function smoothScrollToTarget(e) {
  e.preventDefault();
  const targetId = this.getAttribute('href');
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' });
    if (mainNav.classList.contains('active')) {
      toggleMobileMenu();
    }
  }
}

// دالة لتفعيل رابط القائمة عند التمرير
function activateNavLinkOnScroll() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(currentSection)) {
      link.classList.add('active');
    }
  });
}

// دالة لعرض الإشعارات
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.classList.add('notification');
  notification.classList.add(type);
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('show');
  }, 100);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 3000);
}

// بدء التطبيق
initApp();
