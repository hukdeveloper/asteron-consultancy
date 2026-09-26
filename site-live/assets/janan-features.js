/**
 * Janan Consultancy - Global Interactive Features & Modals
 * 
 * Safely handles:
 * 1. University application link password protection
 * 2. Paid Consultation modal form with strict validation
 * 3. Destination choice modal (Free & Paid consultation)
 * 
 * Note: Does NOT mutate React component DOM trees to prevent hydration mismatch / error #321.
 */

(function () {
  const WHATSAPP_PHONE = "923700171997";
  const AUTH_EMAIL = "engrmuhammaddawood02@gmail.com";
  const AUTH_PASSWORD = "Khans0370@";

  function isAuthorized(input) {
    if (!input) return false;
    const clean = input.trim();
    return clean.toLowerCase() === AUTH_EMAIL.toLowerCase() || clean === AUTH_PASSWORD;
  }

  function initModals() {
    if (document.getElementById("janan-modals-container")) return;

    const container = document.createElement("div");
    container.id = "janan-modals-container";
    container.innerHTML = `
      <!-- University Link Password Protection Modal -->
      <div id="janan-uni-modal" class="fixed inset-0 z-50 hidden flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
        <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 class="flex items-center gap-2 text-lg font-bold text-[#123a70]">
              <span>🔒</span> University Application Access
            </h3>
            <button type="button" class="janan-modal-close text-2xl font-bold text-slate-400 hover:text-slate-600">&times;</button>
          </div>
          <div class="mt-4">
            <p class="text-sm text-slate-600">This university apply link is locked. Please enter your password or authorized email to unlock:</p>
            <form id="uni-auth-form" class="mt-4 space-y-3">
              <input type="password" id="uni-pass-input" placeholder="Enter password or email" class="w-full rounded-full border border-[#123a70]/20 px-4 py-2 text-sm focus:border-[#123a70] focus:outline-none" required />
              <p id="uni-auth-err" class="hidden text-xs font-semibold text-rose-600">Invalid password or email. Access denied.</p>
              <button type="submit" class="w-full rounded-full bg-[#123a70] py-2.5 text-sm font-semibold text-white hover:bg-[#0e2c56]">Unlock &amp; Proceed →</button>
            </form>
          </div>
        </div>
      </div>

      <!-- Paid Consultation Modal Form -->
      <div id="janan-paid-modal" class="fixed inset-0 z-50 hidden flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
        <div class="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl my-8">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 class="text-xl font-bold text-[#123a70]">Paid Consultation</h3>
              <p class="text-xs text-slate-500">Complete all sections to connect directly on WhatsApp</p>
            </div>
            <button type="button" class="janan-modal-close text-2xl font-bold text-slate-400 hover:text-slate-600">&times;</button>
          </div>
          
          <form id="paid-consultation-form" class="mt-4 space-y-3">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-[#123a70]">Name *</label>
                <input type="text" id="paid-name" class="mt-1 w-full rounded-full border border-[#123a70]/20 px-3.5 py-1.5 text-sm focus:border-[#123a70] focus:outline-none" placeholder="Your full name" required />
              </div>
              <div>
                <label class="block text-xs font-bold text-[#123a70]">Age *</label>
                <input type="number" id="paid-age" min="15" max="80" class="mt-1 w-full rounded-full border border-[#123a70]/20 px-3.5 py-1.5 text-sm focus:border-[#123a70] focus:outline-none" placeholder="e.g. 22" required />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-[#123a70]">City *</label>
                <input type="text" id="paid-city" class="mt-1 w-full rounded-full border border-[#123a70]/20 px-3.5 py-1.5 text-sm focus:border-[#123a70] focus:outline-none" placeholder="City of residence" required />
              </div>
              <div>
                <label class="block text-xs font-bold text-[#123a70]">Qualification *</label>
                <select id="paid-qualification" class="mt-1 w-full rounded-full border border-[#123a70]/20 px-3.5 py-1.5 text-sm focus:border-[#123a70] focus:outline-none" required>
                  <option value="">Select qualification</option>
                  <option value="Intermediate / A-Level">Intermediate / A-Level</option>
                  <option value="Bachelor's (14/16 Years)">Bachelor's (14/16 Years)</option>
                  <option value="Master's / MS">Master's / MS</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-[#123a70]">Degree Title *</label>
                <input type="text" id="paid-degree" class="mt-1 w-full rounded-full border border-[#123a70]/20 px-3.5 py-1.5 text-sm focus:border-[#123a70] focus:outline-none" placeholder="e.g. BS Computer Science" required />
              </div>
              <div>
                <label class="block text-xs font-bold text-[#123a70]">Percentage / CGPA *</label>
                <input type="text" id="paid-cgpa" class="mt-1 w-full rounded-full border border-[#123a70]/20 px-3.5 py-1.5 text-sm focus:border-[#123a70] focus:outline-none" placeholder="e.g. 3.4 CGPA or 78%" required />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-[#123a70]">Completion Year *</label>
                <input type="text" id="paid-year" class="mt-1 w-full rounded-full border border-[#123a70]/20 px-3.5 py-1.5 text-sm focus:border-[#123a70] focus:outline-none" placeholder="e.g. 2024 or Expected 2025" required />
              </div>
              <div>
                <label class="block text-xs font-bold text-[#123a70]">English Language *</label>
                <select id="paid-english" class="mt-1 w-full rounded-full border border-[#123a70]/20 px-3.5 py-1.5 text-sm focus:border-[#123a70] focus:outline-none" required>
                  <option value="">Select English status</option>
                  <option value="English Proficiency Certificate (MOI)">English Proficiency Certificate (MOI)</option>
                  <option value="IELTS">IELTS</option>
                  <option value="TOEFL / Duolingo">TOEFL / Duolingo</option>
                  <option value="Will appear soon">Will appear soon</option>
                  <option value="None">None</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-[#123a70]">Course of Interest *</label>
              <input type="text" id="paid-course" class="mt-1 w-full rounded-full border border-[#123a70]/20 px-3.5 py-1.5 text-sm focus:border-[#123a70] focus:outline-none" placeholder="e.g. Data Science, Business, Engineering" required />
            </div>

            <div>
              <label class="block text-xs font-bold text-[#123a70]">Country Destination *</label>
              <input type="text" id="paid-country" class="mt-1 w-full rounded-full border border-[#123a70]/20 px-3.5 py-1.5 text-sm focus:border-[#123a70] focus:outline-none" placeholder="e.g. Portugal, Germany, France, Italy" required />
            </div>

            <div class="pt-3">
              <button type="submit" id="paid-send-btn" disabled class="w-full rounded-full bg-slate-300 py-3 text-sm font-bold text-slate-500 cursor-not-allowed opacity-60 transition shadow-sm">
                Send Data on WhatsApp
              </button>
              <p id="paid-helper-text" class="mt-1.5 text-center text-xs text-slate-400">Please complete all fields above to enable sending.</p>
            </div>
          </form>
        </div>
      </div>

      <!-- Destination Choice Modal (Contact us for Information) -->
      <div id="janan-dest-modal" class="fixed inset-0 z-50 hidden flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
        <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl text-center">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 id="dest-modal-title" class="text-lg font-bold text-[#123a70]">Contact us for Information</h3>
            <button type="button" class="janan-modal-close text-2xl font-bold text-slate-400 hover:text-slate-600">&times;</button>
          </div>
          <div class="py-5">
            <div id="dest-modal-flag" class="flex justify-center mb-2"></div>
            <p id="dest-modal-desc" class="mt-2 text-sm text-slate-600">Choose consultation type for your study abroad plans:</p>
            <div class="mt-6 flex flex-col gap-3">
              <button type="button" id="dest-free-btn" class="w-full rounded-full bg-[#123a70] py-3 text-sm font-bold text-white transition hover:bg-[#0e2c56] shadow-sm cursor-pointer">
                Free consultation →
              </button>
              <button type="button" id="dest-paid-btn" class="w-full rounded-full border-2 border-[#123a70] py-2.5 text-sm font-bold text-[#123a70] transition hover:bg-[#123a70]/5 cursor-pointer">
                Paid consultation →
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(container);
    attachModalEvents();
  }

  function attachModalEvents() {
    // Close buttons
    document.querySelectorAll(".janan-modal-close").forEach((btn) => {
      btn.addEventListener("click", () => {
        const c = document.getElementById("janan-modals-container");
        if (c) c.querySelectorAll(":scope > div").forEach((m) => m.classList.add("hidden"));
      });
    });

    // Close on background click
    const container = document.getElementById("janan-modals-container");
    if (container) {
      container.querySelectorAll(":scope > div").forEach((m) => {
        m.addEventListener("click", (e) => {
          if (e.target === m) m.classList.add("hidden");
        });
      });
    }

    // --- University Apply Password Unlock ---
    let pendingUniUrl = null;
    const uniForm = document.getElementById("uni-auth-form");
    if (uniForm) {
      uniForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = document.getElementById("uni-pass-input");
        const err = document.getElementById("uni-auth-err");
        if (isAuthorized(input.value)) {
          sessionStorage.setItem("janan_uni_unlocked", "true");
          if (err) err.classList.add("hidden");
          const m = document.getElementById("janan-uni-modal");
          if (m) m.classList.add("hidden");
          input.value = "";
          if (pendingUniUrl) {
            window.open(pendingUniUrl, "_blank", "noopener,noreferrer");
            pendingUniUrl = null;
          }
        } else {
          if (err) err.classList.remove("hidden");
        }
      });
    }

    // Intercept university apply clicks via event delegation
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href") || "";
      const text = (link.textContent || "").trim();

      const inUniCard = Boolean(link.closest("[data-uni-card]"));
      const isDegreeUniCard = Boolean(link.closest(".border-2") && link.closest(".grid") && href.startsWith("http") && !href.includes("whatsapp.com") && !href.includes("hussainsilat.com"));
      const isApplyText = text.toLowerCase().includes("apply");
      const isUniversityPortalText =
        text.includes("Apply") ||
        text.includes("Portal") ||
        text.includes("University Website") ||
        text.includes("Admissions Info") ||
        text.includes("Application Form") ||
        text.includes("Watch Tutorial") ||
        text.includes("Ask on WhatsApp");

      const isApplyLink =
        link.hasAttribute("data-uni-apply") ||
        (inUniCard && isApplyText) ||
        (isDegreeUniCard && isUniversityPortalText) ||
        ((text.includes("Apply / Watch Tutorial") || text.includes("Apply / Ask on WhatsApp") || text.includes("Apply directly")) &&
        (href.startsWith("http") || href.includes("wa.me")));

      if (isApplyLink) {
        if (sessionStorage.getItem("janan_uni_unlocked") === "true") {
          return;
        }
        e.preventDefault();
        pendingUniUrl = href;
        const err = document.getElementById("uni-auth-err");
        if (err) err.classList.add("hidden");
        const input = document.getElementById("uni-pass-input");
        if (input) input.value = "";
        const m = document.getElementById("janan-uni-modal");
        if (m) m.classList.remove("hidden");
      }
    }, true);

    // --- Paid Consultation Form Validation ---
    const paidForm = document.getElementById("paid-consultation-form");
    const paidBtn = document.getElementById("paid-send-btn");
    const paidHelper = document.getElementById("paid-helper-text");

    const paidFields = [
      "paid-name",
      "paid-age",
      "paid-city",
      "paid-qualification",
      "paid-degree",
      "paid-cgpa",
      "paid-year",
      "paid-english",
      "paid-course",
      "paid-country",
    ];

    function checkPaidFormValidity() {
      if (!paidForm || !paidBtn) return;
      const allFilled = paidFields.every((id) => {
        const el = document.getElementById(id);
        return el && el.value.trim().length > 0;
      });

      if (allFilled) {
        paidBtn.disabled = false;
        paidBtn.className = "w-full rounded-full bg-[#123a70] py-3 text-sm font-bold text-white cursor-pointer hover:bg-[#0e2c56] transition shadow-md";
        if (paidHelper) {
          paidHelper.textContent = "All sections completed! Click below to send data on WhatsApp.";
          paidHelper.className = "mt-1.5 text-center text-xs font-semibold text-emerald-600";
        }
      } else {
        paidBtn.disabled = true;
        paidBtn.className = "w-full rounded-full bg-slate-300 py-3 text-sm font-bold text-slate-500 cursor-not-allowed opacity-60 transition shadow-sm";
        if (paidHelper) {
          paidHelper.textContent = "Please complete all fields above to enable sending.";
          paidHelper.className = "mt-1.5 text-center text-xs text-slate-400";
        }
      }
    }

    paidFields.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", checkPaidFormValidity);
        el.addEventListener("change", checkPaidFormValidity);
      }
    });

    if (paidForm) {
      paidForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = {
          name: document.getElementById("paid-name").value.trim(),
          age: document.getElementById("paid-age").value.trim(),
          city: document.getElementById("paid-city").value.trim(),
          qualification: document.getElementById("paid-qualification").value.trim(),
          degree: document.getElementById("paid-degree").value.trim(),
          cgpa: document.getElementById("paid-cgpa").value.trim(),
          year: document.getElementById("paid-year").value.trim(),
          english: document.getElementById("paid-english").value.trim(),
          course: document.getElementById("paid-course").value.trim(),
          country: document.getElementById("paid-country").value.trim(),
        };

        const msgLines = [
          "Paid Consultation Request:",
          "--------------------------------",
          `Name: ${data.name}`,
          `Age: ${data.age}`,
          `City: ${data.city}`,
          `Qualification: ${data.qualification}`,
          `Degree title: ${data.degree}`,
          `Percentage/ CGPA: ${data.cgpa}`,
          `Completion year: ${data.year}`,
          `English Language: ${data.english}`,
          `Course of Interest: ${data.course}`,
          `Country destination: ${data.country}`,
          "--------------------------------",
          "Sent from Janan Consultancy Website",
        ];

        const fullMsg = msgLines.join("\n");
        window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(fullMsg)}`, "_blank", "noopener,noreferrer");
        const m = document.getElementById("janan-paid-modal");
        if (m) m.classList.add("hidden");
      });
    }

    // Trigger buttons delegation
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-open-paid-consultation]");
      if (btn) {
        e.preventDefault();
        const country = btn.getAttribute("data-country") || "";
        window.openPaidConsultation(country);
      }
    });
  }

  // --- Public APIs on window ---
  window.openPaidConsultation = function (country = "") {
    initModals();
    const countryEl = document.getElementById("paid-country");
    if (countryEl && country) {
      countryEl.value = country;
    }
    const modal = document.getElementById("janan-paid-modal");
    if (modal) modal.classList.remove("hidden");
  };

  const flagCodes = {
    portugal: "pt",
    germany: "de",
    france: "fr",
    china: "cn",
    russia: "ru",
    italy: "it",
  };

  window.openDestinationOptions = function (countryName, flagCode = "") {
    initModals();
    const modal = document.getElementById("janan-dest-modal");
    const titleEl = document.getElementById("dest-modal-title");
    const flagEl = document.getElementById("dest-modal-flag");
    const freeBtn = document.getElementById("dest-free-btn");
    const paidBtn = document.getElementById("dest-paid-btn");

    if (titleEl) titleEl.textContent = `Contact us for Information — Study in ${countryName}`;
    
    const code = flagCode || flagCodes[countryName.toLowerCase()] || "";
    if (flagEl) {
      if (code) {
        flagEl.innerHTML = `<img src="/img/flags/${code}.svg" alt="${countryName} flag" class="h-12 w-16 rounded shadow-xs object-cover" />`;
      } else {
        flagEl.innerHTML = `<span class="text-4xl">🌍</span>`;
      }
    }

    if (freeBtn) {
      freeBtn.onclick = function () {
        const msg = `Hi Janan Consultancy, I need free consultation about ${countryName}.`;
        window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
        modal.classList.add("hidden");
      };
    }

    if (paidBtn) {
      paidBtn.onclick = function () {
        modal.classList.add("hidden");
        window.openPaidConsultation(countryName);
      };
    }

    if (modal) modal.classList.remove("hidden");
  };

  function initMobileMenu() {
    const toggleBtn = document.getElementById("janan-mobile-menu-btn");
    const dropdown = document.getElementById("janan-mobile-menu-dropdown");

    if (!toggleBtn || !dropdown) return;

    if (!toggleBtn.onclick) {
      toggleBtn.addEventListener("click", function (e) {
        if (window.toggleJananMobileMenu) {
          window.toggleJananMobileMenu(e);
        }
      });
    }

    dropdown.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (dropdown.classList.contains("is-open") && window.toggleJananMobileMenu) {
          window.toggleJananMobileMenu();
        }
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && dropdown.classList.contains("is-open") && window.toggleJananMobileMenu) {
        window.toggleJananMobileMenu();
      }
    });
  }

  function initAll() {
    initModals();
    initMobileMenu();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
