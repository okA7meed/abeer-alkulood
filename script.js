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
    description: "عطر شرقي فاخر يمزج العنبر والخشب النادر",
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
    name: "أمير الملكي",
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
      const stepName = document.getElementById(`step-${currentStep}`).querySelector('.advisor-question').textContent;
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

// إضافة منتج إلى السلة
function addToCart(productId, productName, productPrice, productImage) {
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: 1
    });
  }
  
  cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  updateCartCount();
  saveCartToStorage();
  
  showNotification(`تم إضافة ${productName} إلى السلة`);
}

// شراء الآن
function buyNow(productId, productName, productPrice, productImage) {
  cart = [{
    id: productId,
    name: productName,
    price: productPrice,
    image: productImage,
    quantity: 1
  }];
  
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
  
  cart.forEach(item => {
    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-item');
    cartItemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>${item.price} ر.س</p>
        <div class="quantity-controls">
          <button class="quantity-btn decrease" data-id="${item.id}">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-btn increase" data-id="${item.id}">+</button>
        </div>
      </div>
      <button class="remove-item" data-id="${item.id}">×</button>
    `;
    
    cartItemsContainer.appendChild(cartItemElement);
    
    // إضافة مستمعي الأحداث للكمية والإزالة
    const decreaseBtn = cartItemElement.querySelector('.decrease');
    const increaseBtn = cartItemElement.querySelector('.increase');
    const removeBtn = cartItemElement.querySelector('.remove-item');
    
    decreaseBtn.addEventListener('click', function() {
      updateItemQuantity(item.id, -1);
    });
    
    increaseBtn.addEventListener('click', function() {
      updateItemQuantity(item.id, 1);
    });
    
    removeBtn.addEventListener('click', function() {
      removeFromCart(item.id);
    });
  });
}

// تحديث كمية المنتج
function updateItemQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  
  if (item) {
    item.quantity += change;
    
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      cartCount = cart.reduce((total, item) => total + item.quantity, 0);
      updateCartCount();
      saveCartToStorage();
      renderCartItems();
    }
  }
}

// إزالة منتج من السلة
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  updateCartCount();
  saveCartToStorage();
  renderCartItems();
}

// المتابعة إلى الدفع
function proceedToCheckout() {
  if (cart.length === 0) {
    showNotification('السلة فارغة، أضف منتجات أولاً');
    return;
  }
  
  showCheckoutPage();
}

// عرض صفحة الدفع
function showCheckoutPage() {
  document.querySelectorAll('section').forEach(section => {
    section.style.display = 'none';
  });
  
  checkoutPage.style.display = 'block';
  renderOrderSummary();
}

// عرض ملخص الطلب
function renderOrderSummary() {
  const checkoutItems = document.getElementById('checkout-items');
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
  const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
  
  if (!name || !phone || !address) {
    showNotification('يرجى ملء جميع الحقول المطلوبة');
    return;
  }
  
  if (paymentMethod === 'card') {
    const cardNumber = document.getElementById('card-number').value;
    const cardExpiry = document.getElementById('card-expiry').value;
    const cardCvv = document.getElementById('card-cvv').value;
    const cardName = document.getElementById('card-name').value;
    
    if (!cardNumber || !cardExpiry || !cardCvv || !cardName) {
      showNotification('يرجى ملء جميع تفاصيل البطاقة');
      return;
    }
  }
  
  // عرض رسالة النجاح
  showSuccessMessage();
  
  // تفريغ السلة
  cart = [];
  cartCount = 0;
  updateCartCount();
  saveCartToStorage();
}

// عرض رسالة النجاح
function showSuccessMessage() {
  checkoutPage.style.display = 'none';
  
  thankYouPage.style.display = 'block';
  document.getElementById('order-number').textContent = Math.floor(Math.random() * 10000);
  
  thankYouPage.scrollIntoView({ behavior: 'smooth' });
}

// العودة إلى المنتجات
function backToProducts() {
  checkoutPage.style.display = 'none';
  
  document.querySelectorAll('section').forEach(section => {
    if (section.id !== 'thank-you') {
      section.style.display = 'block';
    }
  });
  
  window.scrollTo(0, 0);
}

// عرض الإشعارات
function showNotification(message) {
  const notification = document.createElement('div');
  notification.classList.add('notification');
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// وظيفة التبديل بين الوضع الداكن والفاتح
function toggleTheme() {
  document.body.classList.toggle('light-mode');
  document.body.classList.toggle('dark-mode');
  
  const isLightMode = document.body.classList.contains('light-mode');
  localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
}

// تطبيق التtheme المحفوظ
function applySavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
    themeToggle.checked = true;
  } else {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
    themeToggle.checked = false;
  }
}

// تبديل قائمة الهاتف
function toggleMobileMenu() {
  hamburgerMenu.classList.toggle('active');
  mainNav.classList.toggle('active');
  document.body.classList.toggle('menu-open');
}

// إغلاق القائمة عند النقر على رابط
function closeMobileMenuOnLinkClick() {
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.getAttribute('href') === '#') {
        e.preventDefault();
      }
      
      closeMobileMenu();
      
      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#')) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          setTimeout(() => {
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        }
      }
    });
  });
}

// إغلاق القائمة
function closeMobileMenu() {
  hamburgerMenu.classList.remove('active');
  mainNav.classList.remove('active');
  document.body.classList.remove('menu-open');
}

// إغلاق القائمة عند النقر خارجها
function setupClickOutsideToClose() {
  document.addEventListener('click', function(e) {
    const isClickInsideNav = mainNav.contains(e.target);
    const isClickOnHamburger = hamburgerMenu.contains(e.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && mainNav.classList.contains('active')) {
      closeMobileMenu();
    }
  });
}

// إضافة تأثير التمرير السلس للروابط
function smoothScrollToTarget(e) {
  e.preventDefault();
  const targetId = this.getAttribute('href');
  if (targetId.startsWith('#')) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      closeMobileMenu();
    }
  }
}

// تفعيل الرابط النشط أثناء التمرير
function activateNavLinkOnScroll() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop - 200) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === currentSection) {
      link.classList.add('active');
    }
  });
}

// عرض النتائج
function showResults() {
  resultsContainer.innerHTML = '';
  
  const matchedPerfumes = perfumes.filter(perfume => {
    return (
      perfume.moods.some(mood => Object.values(userSelections).includes(mood)) ||
      perfume.notes.some(note => Object.values(userSelections).includes(note))
    );
  }).slice(0, 3);
  
  if (matchedPerfumes.length === 0) {
    resultsContainer.innerHTML = '<p>لم نتمكن من العثور على عطور تناسب تفضيلاتك. يرجى المحاولة مرة أخرى.</p>';
    return;
  }
  
  matchedPerfumes.forEach((perfume, index) => {
    const perfumeCard = document.createElement('div');
    perfumeCard.classList.add('perfume-card');
    perfumeCard.innerHTML = `
      <img src="${perfume.image}" alt="${perfume.name}" class="perfume-img">
      <div class="perfume-info">
        <h3 class="perfume-name">${perfume.name}</h3>
        <p class="perfume-desc">${perfume.description}</p>
        <span class="perfume-price">${perfume.price}</span>
        <button class="btn view-product" data-product="${perfume.id}">استكشف المنتج</button>
      </div>
    `;
    
    resultsContainer.appendChild(perfumeCard);
    
    setTimeout(() => {
      perfumeCard.classList.add('visible');
    }, 300 * index);
  });
  
  document.querySelectorAll('.view-product').forEach(btn => {
    btn.addEventListener('click', function() {
      const productId = this.dataset.product;
      showProductPage(productId);
    });
  });
}

// عرض صفحة المنتج
function showProductPage(productId) {
  const product = perfumes.find(p => p.id == productId);
  if (!product) return;
  
  document.getElementById('detail-name').textContent = product.name;
  document.getElementById('detail-desc').textContent = product.description;
  document.getElementById('detail-price').textContent = product.price;
  
  document.querySelectorAll('section:not(.product-page)').forEach(section => {
    section.style.display = 'none';
  });
  productPage.style.display = 'block';
  window.scrollTo(0, 0);
  
  setupBottleRotation();
}

// إعداد تأثير تدوير الزجاجة
function setupBottleRotation() {
  let isMouseDown = false;
  let startX, startY;
  let rotationY = 0;
  let rotationX = 0;
  
  perfumeBottle.addEventListener('mousedown', function(e) {
    isMouseDown = true;
    startX = e.clientX;
    startY = e.clientY;
  });
  
  document.addEventListener('mouseup', function() {
    isMouseDown = false;
  });
  
  document.addEventListener('mousemove', function(e) {
    if (!isMouseDown) return;
    
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    
    rotationY += deltaX * 0.5;
    rotationX += deltaY * 0.5;
    
    rotationX = Math.min(Math.max(rotationX, -30), 30);
    
    perfumeBottle.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
    
    startX = e.clientX;
    startY = e.clientY;
  });
  
  perfumeBottle.addEventListener('touchstart', function(e) {
    isMouseDown = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    e.preventDefault();
  });
  
  document.addEventListener('touchend', function() {
    isMouseDown = false;
  });
  
  document.addEventListener('touchmove', function(e) {
    if (!isMouseDown) return;
    
    const deltaX = e.touches[0].clientX - startX;
    const deltaY = e.touches[0].clientY - startY;
    
    rotationY += deltaX * 0.5;
    rotationX += deltaY * 0.5;
    
    rotationX = Math.min(Math.max(rotationX, -30), 30);
    
    perfumeBottle.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
    
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    e.preventDefault();
  });
}

// تهيئة أولية
document.addEventListener('DOMContentLoaded', function() {
  productPage.style.display = 'none';
  checkoutPage.style.display = 'none';
  thankYouPage.style.display = 'none';
  
  applySavedTheme();
  
  hamburgerMenu.addEventListener('click', toggleMobileMenu);
  
  closeMobileMenuOnLinkClick();
  setupClickOutsideToClose();
  
  initApp();
});
// في دالة addToCart، بعد إضافة المنتج إلى السلة
function addToCart(productId, productName, productPrice, productImage) {
  // ... الكود الحالي
  
  // إنشاء عنصر طائر نحو السلة
  createFlyingElement(productImage, productName);
  
  // ... باقي الكود
}

function createFlyingElement(imageSrc, productName) {
  const flyingElement = document.createElement('div');
  flyingElement.classList.add('flying-item');
  flyingElement.style.backgroundImage = `url(${imageSrc})`;
  flyingElement.style.backgroundSize = 'cover';
  
  // تحديد موقع الزر الذي تم النقر عليه
  const clickedButton = event.target.closest('.add-to-cart');
  const buttonRect = clickedButton.getBoundingClientRect();
  
  // تحديد موقع سلة التسوق
  const cartIcon = document.getElementById('cartIcon');
  const cartRect = cartIcon.getBoundingClientRect();
  
  // تعيين موقع البداية
  flyingElement.style.position = 'fixed';
  flyingElement.style.left = `${buttonRect.left + buttonRect.width/2}px`;
  flyingElement.style.top = `${buttonRect.top}px`;
  flyingElement.style.width = '50px';
  flyingElement.style.height = '50px';
  flyingElement.style.borderRadius = '50%';
  flyingElement.style.zIndex = '10000';
  flyingElement.style.transition = 'all 1s cubic-bezier(0.42, 0, 0.58, 1)';
  
  document.body.appendChild(flyingElement);
  
  // بدء الرسوم المتحركة
  setTimeout(() => {
    flyingElement.style.left = `${cartRect.left + cartRect.width/2}px`;
    flyingElement.style.top = `${cartRect.top + cartRect.height/2}px`;
    flyingElement.style.transform = 'scale(0.2)';
    flyingElement.style.opacity = '0';
  }, 50);
  
  // إزالة العنصر بعد انتهاء الرسوم المتحركة
  setTimeout(() => {
    document.body.removeChild(flyingElement);
  }, 1000);
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
  
  // إظهار الإشعار
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  // إخفاء الإشعار بعد 3 ثوانٍ
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}