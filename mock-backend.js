/**
 * COOPSEWA Mock Backend Service Layer
 * ====================================
 * A complete localStorage-based backend simulator.
 * No Firebase, no server, no API keys — everything runs in the browser.
 * 
 * Replace this with real Firebase/Supabase when ready for production.
 * 
 * Features:
 *  1. AuthService     — Register, Login, Logout, Session persistence
 *  2. DatabaseService — Workers, Users, Jobs stored in localStorage
 *  3. BookingService  — Full 10-step job lifecycle with state persistence
 *  4. WalletService   — Balance tracking, transactions, pension corpus
 *  5. PaymentService  — Mock UPI/Razorpay payment flow
 *  6. LocationService — Real browser GPS + simulated worker movement
 *  7. NotifyService   — Toast notifications & live ticker simulation
 *  8. AnalyticsService — Federation AI dashboard data
 */

const MockBackend = (() => {
  // ─────────────────────────────────────
  // UTILITY: localStorage helpers
  // ─────────────────────────────────────
  const DB_PREFIX = 'coopsewa_';
  
  function dbGet(key) {
    try {
      const raw = localStorage.getItem(DB_PREFIX + key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.warn(`[MockDB] Failed to read ${key}:`, e);
      return null;
    }
  }

  function dbSet(key, value) {
    try {
      localStorage.setItem(DB_PREFIX + key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn(`[MockDB] Failed to write ${key}:`, e);
      return false;
    }
  }

  function dbRemove(key) {
    localStorage.removeItem(DB_PREFIX + key);
  }

  function generateId(prefix = 'ID') {
    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`;
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  // ═══════════════════════════════════════
  // 1. AUTH SERVICE
  // ═══════════════════════════════════════
  const AuthService = {
    /**
     * Register a new user
     * @param {Object} userData - { name, phone, role, password, address? }
     * @returns {Object} { success, user?, error? }
     */
    register(userData) {
      const users = dbGet('users') || {};
      
      if (users[userData.phone]) {
        return { success: false, error: 'Phone number already registered' };
      }

      const user = {
        id: generateId('USR'),
        name: userData.name,
        phone: userData.phone,
        role: userData.role || 'customer', // 'customer' | 'worker' | 'admin'
        address: userData.address || '',
        password: userData.password, // In production: hash this!
        createdAt: new Date().toISOString(),
        isVerified: true // Mock: auto-verify
      };

      // If worker, add worker-specific fields
      if (user.role === 'worker') {
        user.workerProfile = {
          trade: userData.trade || 'General Services',
          coopId: generateId('COOP'),
          society: userData.society || 'Labour Cooperative Society',
          grade: 'C', // Start at Grade C
          rating: 4.0,
          reviewsCount: 0,
          jobsCompleted: 0,
          score: 50,
          isOnline: false,
          walletBalance: 0,
          todayEarnings: 0,
          pensionCorpus: 0,
          experienceYears: userData.experienceYears || 1
        };
      }

      users[userData.phone] = user;
      dbSet('users', users);

      // Auto-login after register
      dbSet('currentSession', { userId: user.id, phone: user.phone, role: user.role });

      console.log(`[Auth] ✅ Registered: ${user.name} (${user.role})`);
      return { success: true, user };
    },

    /**
     * Login with phone + password
     */
    login(phone, password) {
      const users = dbGet('users') || {};
      const user = users[phone];

      if (!user) {
        return { success: false, error: 'Phone number not found. Please register first.' };
      }
      if (user.password !== password) {
        return { success: false, error: 'Incorrect password.' };
      }

      dbSet('currentSession', { userId: user.id, phone: user.phone, role: user.role });
      console.log(`[Auth] ✅ Logged in: ${user.name}`);
      return { success: true, user };
    },

    /**
     * OTP-based login (simulated — always accepts any 4-digit OTP)
     */
    loginWithOTP(phone, otp) {
      if (otp.length !== 4) {
        return { success: false, error: 'OTP must be 4 digits' };
      }

      const users = dbGet('users') || {};
      const user = users[phone];

      if (!user) {
        return { success: false, error: 'Phone number not registered.' };
      }

      dbSet('currentSession', { userId: user.id, phone: user.phone, role: user.role });
      console.log(`[Auth] ✅ OTP Login: ${user.name}`);
      return { success: true, user };
    },

    /**
     * Send OTP (mock — logs to console)
     */
    sendOTP(phone) {
      const otp = String(Math.floor(1000 + Math.random() * 9000));
      dbSet('pendingOTP', { phone, otp, expiresAt: Date.now() + 300000 });
      console.log(`[Auth] 📱 OTP sent to ${phone}: ${otp} (valid 5 min)`);
      NotifyService.toast(`OTP sent to ${phone}: ${otp}`, 'info');
      return { success: true, message: `OTP sent to ${phone}` };
    },

    /**
     * Get current logged-in user
     */
    getCurrentUser() {
      const session = dbGet('currentSession');
      if (!session) return null;

      const users = dbGet('users') || {};
      return Object.values(users).find(u => u.id === session.userId) || null;
    },

    /**
     * Check if user is logged in
     */
    isLoggedIn() {
      return dbGet('currentSession') !== null;
    },

    /**
     * Logout
     */
    logout() {
      dbRemove('currentSession');
      console.log('[Auth] 👋 Logged out');
      return { success: true };
    },

    /**
     * Seed demo users (run once)
     */
    seedDemoUsers() {
      if (dbGet('users_seeded')) return;

      this.register({
        name: 'Priya Sharma', phone: '+91 9876543210', role: 'customer',
        password: 'demo123', address: 'Flat 402, Green Valley Apts, Sector 14, New Delhi'
      });

      this.register({
        name: 'Ramesh Kumar', phone: '+91 9988776655', role: 'worker',
        password: 'demo123', trade: 'Monsoon Plumbing & Drainage',
        society: 'Delhi Labour Coop Federation #41', experienceYears: 8
      });

      this.register({
        name: 'Admin Officer', phone: '+91 9000000001', role: 'admin',
        password: 'admin123'
      });

      // Restore customer as default logged-in
      this.login('+91 9876543210', 'demo123');

      dbSet('users_seeded', true);
      console.log('[Auth] 🌱 Demo users seeded');
    }
  };


  // ═══════════════════════════════════════
  // 2. DATABASE SERVICE
  // ═══════════════════════════════════════
  const DatabaseService = {
    /**
     * Save a record to a collection
     */
    save(collection, id, data) {
      const store = dbGet(collection) || {};
      store[id] = { ...data, updatedAt: new Date().toISOString() };
      dbSet(collection, store);
      return store[id];
    },

    /**
     * Get a record by ID
     */
    get(collection, id) {
      const store = dbGet(collection) || {};
      return store[id] || null;
    },

    /**
     * Get all records in a collection
     */
    getAll(collection) {
      const store = dbGet(collection) || {};
      return Object.values(store);
    },

    /**
     * Query records with a filter function
     */
    query(collection, filterFn) {
      return this.getAll(collection).filter(filterFn);
    },

    /**
     * Delete a record
     */
    delete(collection, id) {
      const store = dbGet(collection) || {};
      delete store[id];
      dbSet(collection, store);
    },

    /**
     * Count records in a collection
     */
    count(collection) {
      return this.getAll(collection).length;
    }
  };


  // ═══════════════════════════════════════
  // 3. BOOKING SERVICE (10-Step Job Lifecycle)
  // ═══════════════════════════════════════
  const BookingService = {
    /**
     * Create a new booking/job
     * @returns {Object} The created job
     */
    createJob({ customerId, customerName, address, notes, serviceId, serviceTitle, serviceIcon, assignedWorker, fareDetails }) {
      const jobId = 'COOP-' + Math.floor(1000 + Math.random() * 9000);
      const otp = String(Math.floor(1000 + Math.random() * 9000));

      const job = {
        id: jobId,
        customerId,
        customerName,
        address,
        notes,
        otp,
        step: 1, // Step 1: Service Discovery
        serviceId,
        serviceTitle,
        serviceIcon,
        assignedWorkerId: assignedWorker?.id || null,
        assignedWorkerName: assignedWorker?.name || null,
        fareDetails,
        totalFare: fareDetails?.totalFare || 0,
        workerShare: fareDetails?.workerShare || 0,
        coopFee: fareDetails?.coopFee || 0,
        status: 'created', // created | matching | dispatched | accepted | en_route | arrived | in_progress | completed | paid | rated
        createdAt: new Date().toISOString(),
        completedAt: null,
        paidAt: null,
        rating: null,
        review: null
      };

      DatabaseService.save('jobs', jobId, job);
      console.log(`[Booking] 📋 Job ${jobId} created for ${customerName}`);
      return job;
    },

    /**
     * Advance job to next step
     */
    advanceStep(jobId, newStep, statusLabel) {
      const job = DatabaseService.get('jobs', jobId);
      if (!job) return null;

      job.step = newStep;
      if (statusLabel) job.status = statusLabel;
      if (newStep === 8) job.completedAt = new Date().toISOString();

      DatabaseService.save('jobs', jobId, job);
      console.log(`[Booking] ⏩ Job ${jobId} → Step ${newStep} (${statusLabel || job.status})`);
      return job;
    },

    /**
     * Get job by ID
     */
    getJob(jobId) {
      return DatabaseService.get('jobs', jobId);
    },

    /**
     * Get all jobs for a customer
     */
    getCustomerJobs(customerId) {
      return DatabaseService.query('jobs', j => j.customerId === customerId);
    },

    /**
     * Get all jobs for a worker
     */
    getWorkerJobs(workerId) {
      return DatabaseService.query('jobs', j => j.assignedWorkerId === workerId);
    },

    /**
     * Get active (incomplete) jobs
     */
    getActiveJobs() {
      return DatabaseService.query('jobs', j => j.step < 10);
    },

    /**
     * Get job history (completed)
     */
    getCompletedJobs() {
      return DatabaseService.query('jobs', j => j.step >= 10);
    },

    /**
     * Add rating to a job
     */
    rateJob(jobId, stars, review = '') {
      const job = DatabaseService.get('jobs', jobId);
      if (!job) return null;

      job.rating = stars;
      job.review = review;
      job.step = 10;
      job.status = 'rated';

      DatabaseService.save('jobs', jobId, job);
      console.log(`[Booking] ⭐ Job ${jobId} rated ${stars}/5`);
      return job;
    }
  };


  // ═══════════════════════════════════════
  // 4. WALLET SERVICE
  // ═══════════════════════════════════════
  const WalletService = {
    /**
     * Get wallet for a user
     */
    getWallet(userId) {
      let wallet = DatabaseService.get('wallets', userId);
      if (!wallet) {
        wallet = {
          userId,
          balance: 0,
          todayEarnings: 0,
          totalEarnings: 0,
          pensionCorpus: 0,
          transactions: [],
          lastResetDate: new Date().toDateString()
        };
        DatabaseService.save('wallets', userId, wallet);
      }

      // Reset daily earnings if new day
      if (wallet.lastResetDate !== new Date().toDateString()) {
        wallet.todayEarnings = 0;
        wallet.lastResetDate = new Date().toDateString();
        DatabaseService.save('wallets', userId, wallet);
      }

      return wallet;
    },

    /**
     * Credit money to wallet (worker receives payment)
     */
    credit(userId, amount, description = 'Service payment') {
      const wallet = this.getWallet(userId);
      const txn = {
        id: generateId('TXN'),
        type: 'credit',
        amount,
        description,
        timestamp: new Date().toISOString(),
        balanceAfter: wallet.balance + amount
      };

      wallet.balance += amount;
      wallet.todayEarnings += amount;
      wallet.totalEarnings += amount;

      // Auto pension contribution (5% of earnings)
      const pensionAdd = Math.round(amount * 0.05);
      wallet.pensionCorpus += pensionAdd;

      wallet.transactions.unshift(txn); // newest first
      if (wallet.transactions.length > 50) wallet.transactions.pop(); // keep last 50

      DatabaseService.save('wallets', userId, wallet);
      console.log(`[Wallet] 💰 +₹${amount} → ${userId} (Balance: ₹${wallet.balance})`);
      return { wallet, transaction: txn, pensionAdded: pensionAdd };
    },

    /**
     * Debit money from wallet (withdrawal)
     */
    debit(userId, amount, description = 'Withdrawal') {
      const wallet = this.getWallet(userId);
      if (wallet.balance < amount) {
        return { success: false, error: 'Insufficient balance' };
      }

      const txn = {
        id: generateId('TXN'),
        type: 'debit',
        amount,
        description,
        timestamp: new Date().toISOString(),
        balanceAfter: wallet.balance - amount
      };

      wallet.balance -= amount;
      wallet.transactions.unshift(txn);
      if (wallet.transactions.length > 50) wallet.transactions.pop();

      DatabaseService.save('wallets', userId, wallet);
      console.log(`[Wallet] 💸 -₹${amount} ← ${userId} (Balance: ₹${wallet.balance})`);
      return { success: true, wallet, transaction: txn };
    },

    /**
     * Get transaction history
     */
    getTransactions(userId) {
      const wallet = this.getWallet(userId);
      return wallet.transactions;
    }
  };


  // ═══════════════════════════════════════
  // 5. PAYMENT SERVICE (Mock UPI / Razorpay)
  // ═══════════════════════════════════════
  const PaymentService = {
    /**
     * Initiate a mock payment
     * Simulates a 2-second payment processing delay
     * @returns {Promise<Object>} Payment result
     */
    async processPayment({ jobId, amount, method = 'upi', customerId, workerId }) {
      console.log(`[Payment] 🔄 Processing ₹${amount} via ${method.toUpperCase()}...`);

      // Simulate payment gateway delay
      await delay(1500 + Math.random() * 1000);

      const payment = {
        id: generateId('PAY'),
        jobId,
        amount,
        method,
        workerShare: Math.round(amount * 0.95),
        coopFee: Math.round(amount * 0.05),
        gst: Math.round(amount * 0.18 / 1.18), // Reverse GST calc
        status: 'success',
        upiTransactionId: `UPI${Date.now()}${Math.floor(Math.random() * 9000 + 1000)}`,
        timestamp: new Date().toISOString()
      };

      // Save payment record
      DatabaseService.save('payments', payment.id, payment);

      // Credit worker's wallet
      if (workerId) {
        WalletService.credit(workerId, payment.workerShare, `Job ${jobId} - Service Payment`);
      }

      // Record coop fee
      const coopLedger = dbGet('coopLedger') || { totalCollected: 0, entries: [] };
      coopLedger.totalCollected += payment.coopFee;
      coopLedger.entries.unshift({
        jobId,
        amount: payment.coopFee,
        timestamp: payment.timestamp
      });
      dbSet('coopLedger', coopLedger);

      console.log(`[Payment] ✅ ₹${amount} processed | Worker: ₹${payment.workerShare} | Coop: ₹${payment.coopFee}`);
      
      return { success: true, payment };
    },

    /**
     * Generate GST Invoice
     */
    generateInvoice(jobId) {
      const job = DatabaseService.get('jobs', jobId);
      if (!job) return null;

      const total = job.totalFare;
      const taxable = (total / 1.18).toFixed(2);
      const totalGst = (total - taxable).toFixed(2);
      const cgst = (totalGst / 2).toFixed(2);
      const sgst = (totalGst / 2).toFixed(2);

      return {
        invoiceNo: `INV-${job.id}-${Date.now().toString(36).toUpperCase()}`,
        jobId: job.id,
        date: new Date().toLocaleDateString('en-IN'),
        customerName: job.customerName,
        workerName: job.assignedWorkerName,
        serviceTitle: job.serviceTitle,
        subtotal: taxable,
        cgst,
        sgst,
        total,
        workerShare: job.workerShare,
        coopFee: job.coopFee,
        paymentMethod: 'UPI / Digital',
        status: 'PAID'
      };
    },

    /**
     * Get payment history
     */
    getPayments() {
      return DatabaseService.getAll('payments');
    }
  };


  // ═══════════════════════════════════════
  // 6. LOCATION SERVICE (Real GPS + Simulation)
  // ═══════════════════════════════════════
  const LocationService = {
    watchId: null,
    currentPosition: null,

    /**
     * Get user's real GPS location (browser permission required)
     * @returns {Promise<{lat, lng}>}
     */
    async getCurrentLocation() {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          console.warn('[Location] Geolocation not supported, using default');
          this.currentPosition = { lat: 28.5420, lng: 77.2140 }; // Delhi fallback
          resolve(this.currentPosition);
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            this.currentPosition = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
              accuracy: pos.coords.accuracy
            };
            console.log(`[Location] 📍 GPS: ${this.currentPosition.lat.toFixed(4)}, ${this.currentPosition.lng.toFixed(4)} (±${Math.round(this.currentPosition.accuracy)}m)`);
            resolve(this.currentPosition);
          },
          (err) => {
            console.warn('[Location] GPS denied, using Delhi default:', err.message);
            this.currentPosition = { lat: 28.5420, lng: 77.2140 };
            resolve(this.currentPosition); // Resolve with fallback, don't reject
          },
          { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
        );
      });
    },

    /**
     * Start watching location (continuous updates)
     */
    startTracking(onUpdate) {
      if (!navigator.geolocation) return;
      this.watchId = navigator.geolocation.watchPosition(
        (pos) => {
          this.currentPosition = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy
          };
          if (onUpdate) onUpdate(this.currentPosition);
        },
        (err) => console.warn('[Location] Watch error:', err.message),
        { enableHighAccuracy: true }
      );
    },

    /**
     * Stop watching location
     */
    stopTracking() {
      if (this.watchId !== null) {
        navigator.geolocation.clearWatch(this.watchId);
        this.watchId = null;
      }
    },

    /**
     * Simulate a worker moving towards the customer
     * @param {Object} workerStart - {lat, lng}
     * @param {Object} customerPos - {lat, lng}
     * @param {Function} onMove - callback with new position each step
     * @param {number} steps - number of movement steps (default 10)
     */
    simulateWorkerMovement(workerStart, customerPos, onMove, steps = 10) {
      const latStep = (customerPos.lat - workerStart.lat) / steps;
      const lngStep = (customerPos.lng - workerStart.lng) / steps;
      let currentStep = 0;

      const moveInterval = setInterval(() => {
        currentStep++;
        const newPos = {
          lat: workerStart.lat + (latStep * currentStep) + (Math.random() - 0.5) * 0.0003,
          lng: workerStart.lng + (lngStep * currentStep) + (Math.random() - 0.5) * 0.0003
        };

        if (onMove) onMove(newPos, currentStep, steps);

        if (currentStep >= steps) {
          clearInterval(moveInterval);
          console.log('[Location] 🏁 Worker arrived at customer location');
        }
      }, 2000); // Move every 2 seconds

      return moveInterval; // Return so caller can clearInterval if needed
    },

    /**
     * Calculate distance between two lat/lng points (Haversine)
     */
    getDistance(lat1, lng1, lat2, lng2) {
      const R = 6371000; // Earth radius in meters
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLng = (lng2 - lng1) * Math.PI / 180;
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLng/2) * Math.sin(dLng/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return Math.round(R * c); // meters
    }
  };


  // ═══════════════════════════════════════
  // 7. NOTIFICATION SERVICE
  // ═══════════════════════════════════════
  const NotifyService = {
    /**
     * Show a toast notification
     */
    toast(message, type = 'info', duration = 4000) {
      // Create toast container if not exists
      let container = document.getElementById('mockToastContainer');
      if (!container) {
        container = document.createElement('div');
        container.id = 'mockToastContainer';
        container.style.cssText = `
          position: fixed; top: 80px; right: 20px; z-index: 99999;
          display: flex; flex-direction: column; gap: 10px;
          pointer-events: none; max-width: 380px;
        `;
        document.body.appendChild(container);
      }

      const colors = {
        info:    { bg: 'rgba(14, 165, 233, 0.95)', icon: 'ℹ️' },
        success: { bg: 'rgba(16, 185, 129, 0.95)', icon: '✅' },
        warning: { bg: 'rgba(245, 158, 11, 0.95)', icon: '⚠️' },
        error:   { bg: 'rgba(239, 68, 68, 0.95)',  icon: '❌' },
        payment: { bg: 'rgba(139, 92, 246, 0.95)', icon: '💳' },
        booking: { bg: 'rgba(249, 115, 22, 0.95)', icon: '📋' }
      };

      const c = colors[type] || colors.info;

      const toast = document.createElement('div');
      toast.style.cssText = `
        background: ${c.bg}; color: #fff; padding: 12px 18px;
        border-radius: 12px; font-size: 0.88rem; font-family: 'Plus Jakarta Sans', sans-serif;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3); pointer-events: auto;
        backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.15);
        transform: translateX(120%); transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex; align-items: center; gap: 10px;
      `;
      toast.innerHTML = `<span style="font-size: 1.2rem;">${c.icon}</span><span>${message}</span>`;
      container.appendChild(toast);

      // Slide in
      requestAnimationFrame(() => {
        toast.style.transform = 'translateX(0)';
      });

      // Slide out and remove
      setTimeout(() => {
        toast.style.transform = 'translateX(120%)';
        setTimeout(() => toast.remove(), 400);
      }, duration);
    },

    /**
     * Live ticker messages (simulated activity feed)
     */
    _tickerMessages: [
      { name: 'Sunita Devi', area: 'Saket', service: 'Plumbing Repair', amount: 420 },
      { name: 'Gurpreet Singh', area: 'Lajpat Nagar', service: 'Carpentry Work', amount: 550 },
      { name: 'Meena Kumari', area: 'Dwarka', service: 'House Cleaning', amount: 380 },
      { name: 'Ravi Shankar', area: 'Rohini', service: 'Electrical Wiring', amount: 480 },
      { name: 'Lakshmi Bai', area: 'Vasant Kunj', service: 'Garden Maintenance', amount: 350 },
      { name: 'Mohammed Iqbal', area: 'Mehrauli', service: 'AC Repair', amount: 600 },
      { name: 'Anjali Verma', area: 'Hauz Khas', service: 'Painting Work', amount: 520 },
      { name: 'Deepak Chauhan', area: 'Janakpuri', service: 'Appliance Repair', amount: 440 }
    ],

    _tickerIndex: 0,

    /**
     * Start the live ticker rotation
     */
    startLiveTicker(elementId, intervalMs = 6000) {
      const el = document.getElementById(elementId);
      if (!el) return;

      const updateTicker = () => {
        const msg = this._tickerMessages[this._tickerIndex % this._tickerMessages.length];
        el.innerHTML = `🔥 <strong>${msg.name}</strong> from <strong>${msg.area}</strong> just completed: <em>${msg.service}</em> — ₹${msg.amount} (95% to worker)`;
        this._tickerIndex++;
      };

      updateTicker();
      return setInterval(updateTicker, intervalMs);
    }
  };


  // ═══════════════════════════════════════
  // 8. ANALYTICS SERVICE (Federation Dashboard)
  // ═══════════════════════════════════════
  const AnalyticsService = {
    /**
     * Get dashboard stats for Federation AI
     */
    getDashboardStats() {
      const jobs = DatabaseService.getAll('jobs');
      const payments = DatabaseService.getAll('payments');
      const users = dbGet('users') || {};
      const coopLedger = dbGet('coopLedger') || { totalCollected: 0, entries: [] };

      const totalWorkers = Object.values(users).filter(u => u.role === 'worker').length;
      const totalCustomers = Object.values(users).filter(u => u.role === 'customer').length;
      const completedJobs = jobs.filter(j => j.step >= 10).length;
      const activeJobs = jobs.filter(j => j.step > 0 && j.step < 10).length;
      const totalRevenue = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
      const avgRating = jobs.filter(j => j.rating).reduce((sum, j, _, arr) => sum + j.rating / arr.length, 0);

      return {
        totalWorkers: totalWorkers || 45, // Show demo data if empty
        totalCustomers: totalCustomers || 312,
        completedJobs: completedJobs || 1247,
        activeJobs: activeJobs || 8,
        totalRevenue: totalRevenue || 524800,
        coopFundCollected: coopLedger.totalCollected || 26240,
        avgRating: avgRating || 4.87,
        workerRetentionRate: 95,
        gradeDistribution: {
          A: 12, B: 18, C: 15
        },
        topCategories: [
          { name: 'Plumbing', jobs: 342, revenue: 136800 },
          { name: 'Electrical', jobs: 298, revenue: 149000 },
          { name: 'Carpentry', jobs: 215, revenue: 107500 },
          { name: 'Cleaning', jobs: 187, revenue: 56100 },
          { name: 'Gardening', jobs: 134, revenue: 46900 }
        ],
        monthlyTrend: [
          { month: 'Apr', jobs: 145 }, { month: 'May', jobs: 178 },
          { month: 'Jun', jobs: 210 }, { month: 'Jul', jobs: 256 },
          { month: 'Aug', jobs: 312 }, { month: 'Sep', jobs: 289 }
        ]
      };
    }
  };


  // ═══════════════════════════════════════
  // INITIALIZATION
  // ═══════════════════════════════════════
  function init() {
    console.log('╔══════════════════════════════════════════╗');
    console.log('║  COOPSEWA Mock Backend v1.0 — Running    ║');
    console.log('║  Storage: localStorage (browser)         ║');
    console.log('║  Status: ✅ All services ready            ║');
    console.log('╚══════════════════════════════════════════╝');

    // Seed demo data if first run
    AuthService.seedDemoUsers();

    return {
      ready: true,
      services: ['Auth', 'Database', 'Booking', 'Wallet', 'Payment', 'Location', 'Notify', 'Analytics']
    };
  }


  // ═══════════════════════════════════════
  // PUBLIC API
  // ═══════════════════════════════════════
  return {
    init,
    Auth: AuthService,
    DB: DatabaseService,
    Booking: BookingService,
    Wallet: WalletService,
    Payment: PaymentService,
    Location: LocationService,
    Notify: NotifyService,
    Analytics: AnalyticsService,

    // Quick helpers
    clearAllData() {
      const keys = Object.keys(localStorage).filter(k => k.startsWith(DB_PREFIX));
      keys.forEach(k => localStorage.removeItem(k));
      console.log(`[MockDB] 🗑️ Cleared ${keys.length} records`);
      NotifyService.toast('All data cleared. Refresh to reseed.', 'warning');
    },

    getStats() {
      const keys = Object.keys(localStorage).filter(k => k.startsWith(DB_PREFIX));
      const totalBytes = keys.reduce((sum, k) => sum + (localStorage.getItem(k)?.length || 0), 0);
      return {
        collections: keys.length,
        storageUsed: `${(totalBytes / 1024).toFixed(1)} KB`,
        maxStorage: '5 MB (localStorage limit)'
      };
    }
  };
})();

// Auto-initialize when script loads
document.addEventListener('DOMContentLoaded', () => {
  MockBackend.init();
});
