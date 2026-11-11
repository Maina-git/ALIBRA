// ============================================================================
// ALIBRA CLIENT-SIDE SUITE
// 1. Theme Controller (Classic, Pink, Dark)
// 2. Mobile Menu Navigation
// 3. Centralized WhatsApp Configuration
// 4. Alibra Fashion Concierge (Personal Stylist)
// 5. Shopping Bag & Multi-Item WhatsApp Checkout
// ============================================================================

// Global Store Configuration (Update this number to change WhatsApp everywhere)
const ALIBRA_CONFIG = {
  whatsappNumber: '254XXXXXXXXX', // Replace with your Kenyan business WhatsApp number (e.g. 254712345678)
  storeName: 'Alibra',
  deliveryNairobi: 'Same-day delivery within Nairobi (from KES 250). Complimentary delivery on orders over KES 10,000.',
  deliveryNationwide: 'Express door-to-door delivery within 24–48 hours to all 47 counties across Kenya.',
  paymentMethods: 'Lipa na M-Pesa (Buy Goods Till / Paybill) and all major Debit/Credit cards upon checkout confirmation.',
  exchangePolicy: 'Need a different size? We offer a smooth 7-day exchange on all unworn clothing and footwear.'
};

// ----------------------------------------------------------------------------
// 1. THEME CONTROLLER
// ----------------------------------------------------------------------------
function initThemes() {
  const savedTheme = localStorage.getItem('alibra-theme') || 'default';
  setTheme(savedTheme);

  document.querySelectorAll('[data-set-theme]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const theme = btn.getAttribute('data-set-theme');
      setTheme(theme);
    });
  });
}

function setTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('alibra-theme', themeName);

  document.querySelectorAll('[data-set-theme]').forEach((btn) => {
    if (btn.getAttribute('data-set-theme') === themeName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// ----------------------------------------------------------------------------
// 2. MOBILE MENU
// ----------------------------------------------------------------------------
function initMobileMenu() {
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('hidden') === false;
      menuBtn.setAttribute('aria-expanded', String(open));
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

// ----------------------------------------------------------------------------
// 3. SYNC WHATSAPP NUMBER
// ----------------------------------------------------------------------------
function syncWhatsAppLinks() {
  if (ALIBRA_CONFIG.whatsappNumber && ALIBRA_CONFIG.whatsappNumber !== '254XXXXXXXXX') {
    document.querySelectorAll('a[href*="254XXXXXXXXX"]').forEach((a) => {
      a.href = a.href.replace(/254XXXXXXXXX/g, ALIBRA_CONFIG.whatsappNumber);
    });
  }
}

// ----------------------------------------------------------------------------
// 4. ALIBRA FASHION CONCIERGE (STYLISH BOUTIQUE ASSISTANT)
// ----------------------------------------------------------------------------
function initChatbot() {
  const container = document.getElementById('chatbot');
  if (!container) return;

  container.innerHTML = `
    <!-- Floating Launcher with Fashion Robot Icon (Bottom Left) -->
    <button id="chatbot-launcher" aria-label="Open Alibra Fashion Concierge"
            class="fixed bottom-5 left-5 z-50 flex items-center gap-2.5 rounded-full bg-ink px-4 py-3 text-paper shadow-2xl transition-all duration-300 hover:bg-accent border border-line group">
      
      <!-- Pulsing Active Indicator -->
      <span class="relative flex h-2.5 w-2.5">
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
        <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent"></span>
      </span>

      <!-- Chic Fashion Robot Icon (Stylized Robot Head with Shades) -->
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300 group-hover:scale-110">
        <line x1="12" y1="8" x2="12" y2="4"/>
        <circle cx="12" cy="3" r="1.5" fill="currentColor"/>
        <rect x="4" y="8" width="16" height="12" rx="3.5"/>
        <rect x="7" y="11.5" width="10" height="2.5" rx="1.25" fill="currentColor"/>
        <path d="M10 16.5c.6.6 1.3.8 2 .8s1.4-.2 2-.8"/>
        <path d="M2 13v2M22 13v2"/>
      </svg>

      <span class="text-xs font-bold uppercase tracking-wider">Alibra Stylist</span>
    </button>

    <!-- Concierge Window -->
    <div id="chatbot-window"
         class="fixed bottom-20 left-5 z-50 hidden w-[90vw] max-w-[370px] flex-col overflow-hidden rounded-xl border border-line bg-paper shadow-2xl transition-all duration-300">
      
      <!-- Concierge Header -->
      <div class="flex items-center justify-between border-b border-line bg-soft px-4 py-3.5">
        <div class="flex items-center gap-3">
          <div class="relative flex h-9 w-9 items-center justify-center rounded-full bg-accent text-paper">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="8" x2="12" y2="4"/>
              <circle cx="12" cy="3" r="1.5" fill="currentColor"/>
              <rect x="4" y="8" width="16" height="12" rx="3.5"/>
              <rect x="7" y="11.5" width="10" height="2.5" rx="1.25" fill="currentColor"/>
              <path d="M10 16.5c.6.6 1.3.8 2 .8s1.4-.2 2-.8"/>
              <path d="M2 13v2M22 13v2"/>
            </svg>
          </div>
          <div>
            <h4 class="text-xs font-extrabold uppercase tracking-wider">Alibra Stylist</h4>
            <span class="flex items-center gap-1.5 text-[10px] text-muted font-medium">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Personal Fashion Concierge
            </span>
          </div>
        </div>
        <button id="chatbot-close" class="text-muted hover:text-ink p-1 transition-colors" aria-label="Close concierge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Messages Stream -->
      <div id="chatbot-messages" class="flex max-h-[360px] flex-col gap-3 overflow-y-auto p-4 text-xs">
        
        <div class="flex gap-2">
          <div class="max-w-[90%] rounded-lg bg-soft p-3.5 text-ink leading-relaxed border border-line">
            <p class="font-bold text-ink">Welcome to Alibra!</p>
            <p class="mt-1 text-muted">I'm your dedicated fashion concierge. I can assist with piece recommendations, size fittings, delivery across Kenya, or direct WhatsApp orders.</p>
            <p class="mt-2 text-[11px] font-semibold text-accent uppercase tracking-wider">How can we help today?</p>
          </div>
        </div>

        <div id="chatbot-chips" class="flex flex-wrap gap-1.5 pt-1">
          <button data-topic="delivery" class="chip-btn border border-line bg-paper px-2.5 py-1.5 text-[11px] font-semibold text-ink hover:border-accent hover:text-accent transition-colors">
            🚚 Delivery in Kenya
          </button>
          <button data-topic="payment" class="chip-btn border border-line bg-paper px-2.5 py-1.5 text-[11px] font-semibold text-ink hover:border-accent hover:text-accent transition-colors">
            💳 Lipa na M-Pesa & Cards
          </button>
          <button data-topic="exchange" class="chip-btn border border-line bg-paper px-2.5 py-1.5 text-[11px] font-semibold text-ink hover:border-accent hover:text-accent transition-colors">
            🔄 7-Day Size Swaps
          </button>
          <button data-topic="shoes" class="chip-btn border border-line bg-paper px-2.5 py-1.5 text-[11px] font-semibold text-ink hover:border-accent hover:text-accent transition-colors">
            👟 Footwear & Sneakers
          </button>
          <button data-topic="dresses" class="chip-btn border border-line bg-paper px-2.5 py-1.5 text-[11px] font-semibold text-ink hover:border-accent hover:text-accent transition-colors">
            👗 Dresses & Jumpsuits
          </button>
          <button data-topic="whatsapp" class="chip-btn border border-[#25D366] bg-[#25D366]/10 px-2.5 py-1.5 text-[11px] font-semibold text-[#128C7E] hover:bg-[#25D366] hover:text-white transition-colors">
            💬 Chat with Our Team
          </button>
        </div>

      </div>

      <form id="chatbot-form" class="flex items-center border-t border-line bg-paper p-2.5">
        <input type="text" id="chatbot-input" placeholder="Ask about sizes, styles, delivery..."
               class="flex-1 border-0 bg-transparent px-2.5 text-xs text-ink placeholder:text-muted focus:outline-none">
        <button type="submit" class="rounded bg-accent px-3 py-2 text-paper hover:bg-ink transition-colors text-xs font-semibold uppercase tracking-wider" aria-label="Send">
          Ask
        </button>
      </form>

    </div>
  `;

  const launcher = document.getElementById('chatbot-launcher');
  const windowEl = document.getElementById('chatbot-window');
  const closeBtn = document.getElementById('chatbot-close');
  const messages = document.getElementById('chatbot-messages');
  const form = document.getElementById('chatbot-form');
  const input = document.getElementById('chatbot-input');

  function toggleChat() {
    windowEl.classList.toggle('hidden');
    if (!windowEl.classList.contains('hidden')) {
      input.focus();
    }
  }

  launcher.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', toggleChat);

  function appendMessage(text, isUser = false) {
    const wrap = document.createElement('div');
    wrap.className = `flex gap-2 ${isUser ? 'justify-end' : 'justify-start'}`;

    const bubble = document.createElement('div');
    bubble.className = `max-w-[88%] rounded-lg p-3 text-xs leading-relaxed ${
      isUser ? 'bg-accent text-paper font-medium' : 'bg-soft text-ink border border-line'
    }`;
    bubble.innerHTML = text;

    wrap.appendChild(bubble);
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
  }

  function handleTopic(topic) {
    if (topic === 'delivery') {
      appendMessage(`<strong>Delivery & Dispatch:</strong><br>${ALIBRA_CONFIG.deliveryNairobi}<br><br>${ALIBRA_CONFIG.deliveryNationwide}<br><br>Every parcel is packed carefully in signature packaging.`);
    } else if (topic === 'payment') {
      appendMessage(`<strong>Payment Options:</strong><br>${ALIBRA_CONFIG.paymentMethods}<br><br>You'll receive official M-Pesa Till instructions upon booking.`);
    } else if (topic === 'exchange') {
      appendMessage(`<strong>Fit & Exchanges:</strong><br>${ALIBRA_CONFIG.exchangePolicy}<br><br>If the fit isn't 100% perfect, message us within 7 days and we'll swap it promptly.`);
    } else if (topic === 'shoes') {
      appendMessage(`Looking for sneakers, retro low-tops, or boots? You can browse all available footwear with live size options: <br><a href="store.html#footwear" class="mt-2 inline-block font-bold text-accent underline">Browse Footwear Collection &rarr;</a>`);
    } else if (topic === 'dresses') {
      appendMessage(`From ribbed midi dresses to wide-leg jumpsuits, explore our women's collection here: <br><a href="store.html#women" class="mt-2 inline-block font-bold text-accent underline">Browse Women's Apparel &rarr;</a>`);
    } else if (topic === 'whatsapp') {
      appendMessage(`Prefer chatting directly with our team? Connect with our stylists right on WhatsApp: <br><a href="https://wa.me/${ALIBRA_CONFIG.whatsappNumber}?text=Hello%20Alibra%2C%20I%20have%20an%20order%20question" target="_blank" class="mt-2.5 inline-flex items-center gap-1.5 bg-[#25D366] text-white px-3.5 py-2 rounded text-[11px] font-bold uppercase tracking-wider">Message on WhatsApp &rarr;</a>`);
    }
  }

  container.querySelectorAll('.chip-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const topic = btn.getAttribute('data-topic');
      appendMessage(btn.textContent.trim(), true);
      setTimeout(() => handleTopic(topic), 250);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    appendMessage(query, true);
    input.value = '';

    const lower = query.toLowerCase();
    setTimeout(() => {
      if (lower.includes('deliver') || lower.includes('where') || lower.includes('ship') || lower.includes('nairobi') || lower.includes('county') || lower.includes('coast')) {
        handleTopic('delivery');
      } else if (lower.includes('pay') || lower.includes('mpesa') || lower.includes('m-pesa') || lower.includes('till') || lower.includes('card')) {
        handleTopic('payment');
      } else if (lower.includes('exchange') || lower.includes('return') || lower.includes('size') || lower.includes('fit')) {
        handleTopic('exchange');
      } else if (lower.includes('shoe') || lower.includes('sneaker') || lower.includes('boot') || lower.includes('heel') || lower.includes('footwear')) {
        handleTopic('shoes');
      } else if (lower.includes('dress') || lower.includes('jumpsuit') || lower.includes('jacket') || lower.includes('women') || lower.includes('men')) {
        handleTopic('dresses');
      } else if (lower.includes('whatsapp') || lower.includes('number') || lower.includes('call') || lower.includes('contact') || lower.includes('human')) {
        handleTopic('whatsapp');
      } else {
        appendMessage(`Thanks for asking! For custom order requests, reservations, or immediate questions, our styling team is ready on WhatsApp: <br><a href="https://wa.me/${ALIBRA_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello Alibra Stylist: ' + query)}" target="_blank" class="mt-2.5 inline-flex items-center gap-1.5 bg-[#25D366] text-white px-3.5 py-2 rounded text-[11px] font-bold uppercase tracking-wider">Chat on WhatsApp &rarr;</a>`);
      }
    }, 300);
  });
}

// ----------------------------------------------------------------------------
// 5. SHOPPING BAG & MULTI-ITEM WHATSAPP CHECKOUT
// ----------------------------------------------------------------------------
const AlibraCart = {
  items: [],

  init() {
    try {
      this.items = JSON.parse(localStorage.getItem('alibra-cart')) || [];
    } catch (e) {
      this.items = [];
    }
    this.injectDrawer();
    this.updateBadges();
    this.render();
    this.bindEvents();
  },

  save() {
    localStorage.setItem('alibra-cart', JSON.stringify(this.items));
    this.updateBadges();
    this.render();
  },

  addItem(item) {
    // Check if same item & size already exists
    const existingIndex = this.items.findIndex(
      (i) => i.name === item.name && i.size === item.size
    );

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += item.quantity || 1;
    } else {
      this.items.push({
        id: Date.now(),
        name: item.name,
        price: Number(item.price),
        size: item.size || 'One Size',
        category: item.category || 'Apparel',
        img: item.img,
        quantity: item.quantity || 1
      });
    }

    this.save();
    this.showToast(`Added "${item.name}" (Size: ${item.size}) to your bag!`);
    this.open();
  },

  removeItem(index) {
    this.items.splice(index, 1);
    this.save();
  },

  updateQuantity(index, delta) {
    if (!this.items[index]) return;
    this.items[index].quantity += delta;
    if (this.items[index].quantity <= 0) {
      this.removeItem(index);
    } else {
      this.save();
    }
  },

  clear() {
    this.items = [];
    this.save();
  },

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getTotalCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  },

  updateBadges() {
    const totalCount = this.getTotalCount();
    document.querySelectorAll('.cart-badge, #cart-badge, .mobile-cart-badge').forEach((badge) => {
      badge.textContent = totalCount;
      if (totalCount > 0) {
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    });
  },

  injectDrawer() {
    // Backdrop
    if (!document.getElementById('cart-backdrop')) {
      const backdrop = document.createElement('div');
      backdrop.id = 'cart-backdrop';
      backdrop.className = 'fixed inset-0 z-50 hidden bg-black/60 backdrop-blur-sm transition-opacity duration-300';
      document.body.appendChild(backdrop);
    }

    // Drawer Container
    if (!document.getElementById('cart-drawer')) {
      const drawer = document.createElement('aside');
      drawer.id = 'cart-drawer';
      drawer.setAttribute('aria-label', 'Shopping Bag');
      drawer.className = 'fixed inset-y-0 right-0 z-50 flex w-full max-w-md translate-x-full flex-col border-l border-line bg-paper shadow-2xl transition-transform duration-300 ease-in-out';
      drawer.innerHTML = `
        <!-- Drawer Header -->
        <div class="flex items-center justify-between border-b border-line bg-soft px-5 py-4">
          <div class="flex items-center gap-2.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <h3 class="text-sm font-extrabold uppercase tracking-wider">Your Shopping Bag</h3>
            <span id="drawer-item-count" class="text-xs font-bold text-accent">(0)</span>
          </div>
          <button id="cart-close" class="text-muted hover:text-ink p-1" aria-label="Close bag">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- Cart Items List -->
        <div id="cart-items-list" class="flex-1 overflow-y-auto p-5 divide-y divide-line">
          <!-- Dynamically populated -->
        </div>

        <!-- Drawer Footer / Checkout -->
        <div id="cart-footer" class="border-t border-line bg-soft p-5">
          <div class="flex items-baseline justify-between text-sm">
            <span class="font-bold uppercase tracking-wider text-muted">Subtotal:</span>
            <span id="cart-total-price" class="text-xl font-extrabold text-ink">KES 0</span>
          </div>
          <p class="mt-1 text-[11px] text-muted">Doorstep delivery across Kenya &bull; M-Pesa & Card accepted</p>

          <!-- WhatsApp Multi-Item Checkout Button -->
          <a id="cart-whatsapp-checkout" href="#" target="_blank" rel="noopener noreferrer"
             class="mt-4 flex w-full items-center justify-center gap-2 bg-[#25D366] py-3.5 text-center text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#128C7E] shadow-md">
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.52 3.48A11.82 11.82 0 0 0 12.08 0C5.5 0 .14 5.36.14 11.94c0 2.1.55 4.15 1.6 5.96L.04 24l6.25-1.64a11.93 11.93 0 0 0 5.78 1.47h.01c6.58 0 11.94-5.36 11.94-11.94 0-3.19-1.24-6.19-3.5-8.41ZM12.08 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.71.97.99-3.62-.23-.37a9.87 9.87 0 0 1-1.52-5.25c0-5.46 4.44-9.9 9.9-9.9a9.83 9.83 0 0 1 7 2.9 9.83 9.83 0 0 1 2.9 7c0 5.46-4.45 9.9-9.92 9.9Zm5.43-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.88-.79-1.48-1.76-1.65-2.06-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.48 1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z"/>
            </svg>
            Complete Order on WhatsApp
          </a>

          <button id="cart-clear-btn" type="button" class="mt-2 w-full text-center text-[10px] font-bold uppercase tracking-widest text-muted hover:text-accent transition-colors">
            Clear Shopping Bag
          </button>
        </div>
      `;
      document.body.appendChild(drawer);
    }

    // Toast Container
    if (!document.getElementById('cart-toast')) {
      const toast = document.createElement('div');
      toast.id = 'cart-toast';
      toast.className = 'fixed top-20 right-5 z-50 hidden rounded-md bg-ink px-4 py-3 text-xs font-bold uppercase tracking-wider text-paper shadow-2xl transition-all duration-300 border border-line';
      document.body.appendChild(toast);
    }
  },

  render() {
    const list = document.getElementById('cart-items-list');
    const totalEl = document.getElementById('cart-total-price');
    const countEl = document.getElementById('drawer-item-count');
    const footer = document.getElementById('cart-footer');
    const checkoutBtn = document.getElementById('cart-whatsapp-checkout');

    if (!list) return;

    const total = this.getTotal();
    const count = this.getTotalCount();

    countEl.textContent = `(${count})`;
    totalEl.textContent = `KES ${total.toLocaleString()}`;

    if (this.items.length === 0) {
      list.innerHTML = `
        <div class="py-16 text-center">
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-soft text-muted">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <h4 class="mt-3 text-sm font-bold uppercase">Your bag is empty</h4>
          <p class="mt-1 text-xs text-muted">Explore our curated footwear, dresses, and jackets.</p>
          <a href="store.html" class="mt-4 inline-block bg-accent px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-paper hover:bg-ink transition-colors">
            Explore Store
          </a>
        </div>
      `;
      if (footer) footer.classList.add('opacity-50', 'pointer-events-none');
      return;
    }

    if (footer) footer.classList.remove('opacity-50', 'pointer-events-none');

    list.innerHTML = this.items
      .map(
        (item, index) => `
        <div class="flex items-center gap-4 py-4">
          <img src="${item.img}" alt="${item.name}" class="h-16 w-16 rounded object-cover bg-soft border border-line flex-shrink-0">
          <div class="flex-1 min-w-0">
            <h4 class="text-xs font-bold uppercase truncate text-ink">${item.name}</h4>
            <div class="mt-0.5 flex items-center gap-2 text-[11px] text-muted">
              <span>Size: <strong class="text-ink">${item.size}</strong></span>
              <span>&bull;</span>
              <span>KES ${item.price.toLocaleString()}</span>
            </div>
            <!-- Quantity controls -->
            <div class="mt-2 flex items-center gap-2">
              <div class="inline-flex items-center border border-line bg-paper">
                <button type="button" onclick="AlibraCart.updateQuantity(${index}, -1)" class="px-2 py-0.5 text-xs text-muted hover:text-ink">-</button>
                <span class="px-2 text-xs font-semibold">${item.quantity}</span>
                <button type="button" onclick="AlibraCart.updateQuantity(${index}, 1)" class="px-2 py-0.5 text-xs text-muted hover:text-ink">+</button>
              </div>
              <button type="button" onclick="AlibraCart.removeItem(${index})" class="text-[11px] text-muted hover:text-accent font-medium underline underline-offset-2 ml-2">
                Remove
              </button>
            </div>
          </div>
          <div class="text-right">
            <span class="text-xs font-bold text-ink">KES ${(item.price * item.quantity).toLocaleString()}</span>
          </div>
        </div>
      `
      )
      .join('');

    // Generate WhatsApp Multi-Item Checkout Link
    let msg = `Hello Alibra! I would like to place an order for the following items:\n\n`;
    this.items.forEach((item, i) => {
      msg += `${i + 1}. ${item.name}\n   - Size: ${item.size}\n   - Qty: ${item.quantity}\n   - Price: KES ${(item.price * item.quantity).toLocaleString()}\n\n`;
    });
    msg += `------------------------------\nSubtotal: KES ${total.toLocaleString()}\n------------------------------\n\nPlease confirm availability and delivery to my location.`;

    checkoutBtn.href = `https://wa.me/${ALIBRA_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  },

  open() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (drawer && backdrop) {
      backdrop.classList.remove('hidden');
      drawer.classList.remove('translate-x-full');
      document.body.style.overflow = 'hidden';
    }
  },

  close() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (drawer && backdrop) {
      drawer.classList.add('translate-x-full');
      backdrop.classList.add('hidden');
      document.body.style.overflow = '';
    }
  },

  showToast(message) {
    const toast = document.getElementById('cart-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 2800);
  },

  bindEvents() {
    // Open cart buttons
    document.querySelectorAll('#cart-btn, .mobile-cart-btn, [data-open-cart]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });

    // Close cart button
    const closeBtn = document.getElementById('cart-close');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    // Backdrop click
    const backdrop = document.getElementById('cart-backdrop');
    if (backdrop) backdrop.addEventListener('click', () => this.close());

    // Clear cart button
    const clearBtn = document.getElementById('cart-clear-btn');
    if (clearBtn) clearBtn.addEventListener('click', () => this.clear());

    // ESC key closes drawer
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  }
};

// ----------------------------------------------------------------------------
// INITIALIZATION
// ----------------------------------------------------------------------------
function initAlibra() {
  initThemes();
  initMobileMenu();
  syncWhatsAppLinks();
  initChatbot();
  AlibraCart.init();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAlibra);
} else {
  initAlibra();
}
