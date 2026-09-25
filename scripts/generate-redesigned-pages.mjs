import fs from 'fs';
import path from 'path';

const MARQUEE_HTML = `<!-- Continuous Moving Message (right to left) -->
<div class="overflow-hidden border-b border-[#123a70]/20 bg-[#123a70] py-2.5 text-white shadow-xs whitespace-nowrap">
  <div style="display:flex;width:max-content;animation:jananMarquee 22s linear infinite;" class="font-semibold text-xs sm:text-sm tracking-wide whitespace-nowrap">
    <span style="padding:0 2.5rem;">&quot; Kindness is not an act, It&#x27;s a reflection of your soul. &quot;</span>
    <span style="padding:0 2.5rem;">&quot; Kindness is not an act, It&#x27;s a reflection of your soul. &quot;</span>
    <span style="padding:0 2.5rem;">&quot; Kindness is not an act, It&#x27;s a reflection of your soul. &quot;</span>
    <span style="padding:0 2.5rem;">&quot; Kindness is not an act, It&#x27;s a reflection of your soul. &quot;</span>
  </div>
</div>
<style>
  @keyframes jananMarquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
</style>`;

function getHeader(activePage = '') {
  const isHome = activePage === 'home';
  const isAbout = activePage === 'about';
  const isUniversities = activePage === 'universities';
  const isContact = activePage === 'contact';

  return `<header class="sticky top-0 z-40 border-b border-[#123a70]/10 bg-white/95 backdrop-blur"><div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5"><a class="flex items-center gap-2 shrink-0 ${isHome ? 'active' : ''}" href="/" ${isHome ? 'data-status="active" aria-current="page"' : ''}><img src="/img/janan-logo.jpg" alt="Janan Consultancy logo" width="40" height="40" class="rounded-md object-cover" style="width:40px;height:40px"/><span class="hidden sm:inline font-bold text-[#123a70] leading-none">Janan<br/>Consultancy</span></a><nav class="flex items-center gap-4 text-sm font-semibold text-[#123a70]"><a class="hover:underline ${isHome ? 'underline' : ''}" href="/">Home</a><a class="hover:underline ${isAbout ? 'underline' : ''}" href="/about" ${isAbout ? 'data-status="active" aria-current="page"' : ''}>About</a><a class="hover:underline ${isUniversities ? 'underline' : ''}" href="/universities" ${isUniversities ? 'data-status="active" aria-current="page"' : ''}>Universities</a><a class="hover:underline ${isContact ? 'underline' : ''}" href="/contact" ${isContact ? 'data-status="active" aria-current="page"' : ''}>Contact</a></nav></div></header>
${MARQUEE_HTML}`;
}

// 1. Redesigned About Content
const ABOUT_CONTENT = `<main class="min-h-screen bg-[#f7f9fc]">
  <!-- Hero Section -->
  <section class="border-b border-[#123a70]/10 bg-white py-16">
    <div class="mx-auto max-w-5xl px-4 text-center">
      <span class="inline-block rounded-full bg-[#123a70]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#123a70]">About Janan Consultancy</span>
      <h1 class="mt-4 text-3xl font-extrabold tracking-tight text-[#123a70] sm:text-5xl">Guiding Your Global Education with Trust &amp; Integrity</h1>
      <p class="mx-auto mt-5 max-w-3xl text-base sm:text-lg leading-relaxed text-slate-600">
        Janan Consultancy is a premier education consultancy dedicated to empowering students to achieve their dreams of studying in Italy and across Europe. Founded on principles of honesty, complete transparency, and relentless student support, we demystify the study abroad process from university selection to arrival on campus.
      </p>
      <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
        <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20services." target="_blank" rel="noreferrer" class="janan-btn-primary">
          <span>Start 1-on-1 Consultation</span> ↗
        </a>
        <a href="/universities" class="janan-btn-secondary">
          <span>Explore Universities</span> →
        </a>
      </div>
    </div>
  </section>

  <!-- Impact Numbers -->
  <section class="py-12">
    <div class="mx-auto max-w-5xl px-4">
      <div class="janan-grid-4">
        <div class="janan-card text-center">
          <div class="text-3xl font-black text-[#123a70] sm:text-4xl">50,000+</div>
          <div class="mt-2 text-xs sm:text-sm font-semibold text-slate-600">Community Members</div>
        </div>
        <div class="janan-card text-center">
          <div class="text-3xl font-black text-[#123a70] sm:text-4xl">70+</div>
          <div class="mt-2 text-xs sm:text-sm font-semibold text-slate-600">Public Universities</div>
        </div>
        <div class="janan-card text-center">
          <div class="text-3xl font-black text-[#123a70] sm:text-4xl">€8,500/yr</div>
          <div class="mt-2 text-xs sm:text-sm font-semibold text-slate-600">Max Regional Scholarship</div>
        </div>
        <div class="janan-card text-center">
          <div class="text-3xl font-black text-[#123a70] sm:text-4xl">100%</div>
          <div class="mt-2 text-xs sm:text-sm font-semibold text-slate-600">Direct Official Portals</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Founder & Mission Section -->
  <section class="py-6">
    <div class="mx-auto max-w-5xl px-4">
      <div class="overflow-hidden rounded-2xl border-2 border-[#123a70]/15 bg-white shadow-sm" style="display:flex;flex-wrap:wrap;">
        <div style="flex:1 1 320px;background:#123a70;color:#fff;padding:36px;display:flex;flex-direction:column;justify-content:between;">
          <div>
            <span class="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/90">Leadership &amp; Vision</span>
            <h2 class="mt-4 text-2xl font-bold">Engr. Janan</h2>
            <p class="text-sm text-white/80">Founder &amp; Principal Education Consultant</p>
            <div class="mt-6 border-t border-white/20 pt-6 text-sm leading-relaxed text-white/90">
              <p>&ldquo;Kindness is not an act, it's a reflection of your soul. We built Janan Consultancy so students never fall victim to exorbitant agent charges or false promises. We guide with precision, truth, and heart.&rdquo;</p>
            </div>
          </div>
          <div class="mt-8">
            <a href="https://www.linkedin.com/in/engr-janan-813241273" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/25 transition">
              <span>Connect on LinkedIn</span> ↗
            </a>
          </div>
        </div>
        <div style="flex:2 1 380px;padding:36px;display:flex;flex-direction:column;justify-content:center;">
          <h3 class="text-2xl font-bold text-[#123a70]">Why Janan Consultancy Was Built</h3>
          <p class="mt-4 text-slate-600 leading-relaxed text-sm sm:text-base">
            Studying in Europe offers world-class education at zero tuition fee through regional scholarships. However, bureaucratic mazes, complex document legalization, embassy translation guidelines, and strict university deadlines leave many qualified students stranded.
          </p>
          <p class="mt-3 text-slate-600 leading-relaxed text-sm sm:text-base">
            Janan Consultancy eliminates this confusion. We walk alongside students through university selection, admission portal submissions, regional scholarship paperwork (DSU, ER.GO, ALiSEO, LazioDisco), certified Italian embassy translations, and Schengen visa health insurance.
          </p>
          <div class="mt-6 flex flex-wrap gap-2">
            <span class="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">✓ No False Promises</span>
            <span class="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">✓ Direct Official Portals</span>
            <span class="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">✓ 1-on-1 Personalized Care</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Core Services -->
  <section class="py-12">
    <div class="mx-auto max-w-5xl px-4">
      <div class="text-center mb-8">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-[#123a70]">Complete End-to-End Guidance</h2>
        <p class="mt-2 text-slate-600 max-w-xl mx-auto text-sm">Every step of your European academic path handled under one dedicated roof.</p>
      </div>
      <div class="janan-grid-2">
        <div class="janan-card">
          <div class="flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123a70]/10 text-base font-bold text-[#123a70]">01</span>
            <h3 class="text-lg font-bold text-[#123a70]">University Admissions &amp; Shortlisting</h3>
          </div>
          <p class="mt-3 text-sm text-slate-600 leading-relaxed">
            Personalized shortlisting of top Italian and European public universities matching your GPA, budget, and English proficiency (with or without IELTS). Direct guidance for Bachelor's, Master's, and PhD programs.
          </p>
        </div>
        <div class="janan-card">
          <div class="flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123a70]/10 text-base font-bold text-[#123a70]">02</span>
            <h3 class="text-lg font-bold text-[#123a70]">Regional Scholarships (Up to €8,500/yr)</h3>
          </div>
          <p class="mt-3 text-sm text-slate-600 leading-relaxed">
            Full support for Italian regional need-based scholarships including DSU, ER.GO, ALiSEO, and LazioDisco. We assist with family income evaluations (ISEE Parificato), document preparation, and error-free submissions.
          </p>
        </div>
        <div class="janan-card">
          <div class="flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123a70]/10 text-base font-bold text-[#123a70]">03</span>
            <h3 class="text-lg font-bold text-[#123a70]">Embassy Translation &amp; Legalization</h3>
          </div>
          <p class="mt-3 text-sm text-slate-600 leading-relaxed">
            Certified Italian language translations accepted by both the Embassy of Italy in Islamabad and the Consulate General in Karachi. Jurisdiction-specific documentation for Punjab, KPK, Sindh, and Balochistan.
          </p>
        </div>
        <div class="janan-card">
          <div class="flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123a70]/10 text-base font-bold text-[#123a70]">04</span>
            <h3 class="text-lg font-bold text-[#123a70]">Visa Health Insurance &amp; Pre-Enrollment</h3>
          </div>
          <p class="mt-3 text-sm text-slate-600 leading-relaxed">
            Official Schengen student visa health insurance with required minimum €30,000 coverage, alongside Universitaly pre-enrollment validation and visa interview preparation.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Box -->
  <section class="py-8">
    <div class="mx-auto max-w-5xl px-4 text-center">
      <div class="rounded-2xl bg-[#123a70] p-8 sm:p-12 text-white shadow-lg">
        <h2 class="text-2xl sm:text-3xl font-bold">Ready to Start Your Journey?</h2>
        <p class="mx-auto mt-3 max-w-xl text-white/80 text-sm sm:text-base">Connect directly with our counseling team on WhatsApp today for free initial guidance.</p>
        <div class="mt-6 flex flex-wrap items-center justify-center gap-4">
          <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20would%20like%20to%20consult%20regarding%20studying%20in%20Europe." target="_blank" rel="noreferrer" class="janan-btn-white">
            <span>Contact on WhatsApp</span> ↗
          </a>
          <a href="/contact" class="janan-btn-trans">
            <span>Visit Contact Page</span> →
          </a>
        </div>
      </div>
    </div>
  </section>
</main>`;

// 2. Redesigned Contact Content with Interactive WhatsApp Generator & FAQs
const CONTACT_CONTENT = `<main class="min-h-screen bg-[#f7f9fc]">
  <!-- Hero Section -->
  <section class="border-b border-[#123a70]/10 bg-white py-16">
    <div class="mx-auto max-w-4xl px-4 text-center">
      <span class="inline-block rounded-full bg-[#123a70]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#123a70]">Direct Support</span>
      <h1 class="mt-4 text-3xl font-extrabold tracking-tight text-[#123a70] sm:text-5xl">Contact Janan Consultancy</h1>
      <p class="mx-auto mt-4 max-w-2xl text-base text-slate-600">
        Have questions regarding public university admissions, regional scholarships, translation, or student visas? We're available directly on WhatsApp and email.
      </p>
    </div>
  </section>

  <!-- Direct Channels Grid -->
  <section class="py-12">
    <div class="mx-auto max-w-5xl px-4">
      <div class="janan-grid-3">
        <!-- WhatsApp Direct -->
        <div class="janan-card flex flex-col justify-between">
          <div>
            <div style="width:48px;height:48px;border-radius:12px;background:#e8f5e9;display:flex;align-items:center;justify-content:center;color:#2e7d32;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.174.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-12.416c-5.523 0-10 4.477-10 10 0 1.77.46 3.435 1.266 4.887l-1.344 4.912 5.034-1.321c1.406.764 3.013 1.201 4.723 1.202 5.522 0 10-4.477 10-10 0-5.523-4.478-10-9.679-9.679z"/></svg>
            </div>
            <h3 class="mt-4 text-xl font-bold text-[#123a70]">WhatsApp Counseling</h3>
            <p class="mt-2 text-sm text-slate-600">Immediate 1-on-1 counseling, quick document checks, and status updates.</p>
            <p class="mt-3 text-base font-bold text-[#123a70]">+92 370 017 1997</p>
          </div>
          <div class="mt-6">
            <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20have%20a%20question%20about%20studying%20in%20Europe." target="_blank" rel="noreferrer" class="janan-btn-primary" style="width:100%;text-align:center;">Chat on WhatsApp ↗</a>
          </div>
        </div>

        <!-- Official Email -->
        <div class="janan-card flex flex-col justify-between">
          <div>
            <div style="width:48px;height:48px;border-radius:12px;background:#e3f2fd;display:flex;align-items:center;justify-content:center;color:#1565c0;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
            </div>
            <h3 class="mt-4 text-xl font-bold text-[#123a70]">Email Inquiries</h3>
            <p class="mt-2 text-sm text-slate-600">For academic transcripts evaluation, scholarship queries, and partnerships.</p>
            <p class="mt-3 text-xs sm:text-sm font-bold text-[#123a70] break-all">jananconsultants.services@gmail.com</p>
          </div>
          <div class="mt-6">
            <a href="mailto:jananconsultants.services@gmail.com" class="janan-btn-primary" style="width:100%;text-align:center;">Send Email ↗</a>
          </div>
        </div>

        <!-- WhatsApp Community -->
        <div class="janan-card flex flex-col justify-between">
          <div>
            <div style="width:48px;height:48px;border-radius:12px;background:#fff8e1;display:flex;align-items:center;justify-content:center;color:#b78103;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
            </div>
            <h3 class="mt-4 text-xl font-bold text-[#123a70]">Student Community</h3>
            <p class="mt-2 text-sm text-slate-600">Get daily updates on admission windows, scholarship deadlines, and visa alerts.</p>
            <p class="mt-3 text-base font-bold text-[#123a70]">50,000+ Followers</p>
          </div>
          <div class="mt-6">
            <a href="https://whatsapp.com/channel/0029Vb7XHR3IHphDS7o4ns2R" target="_blank" rel="noreferrer" class="janan-btn-primary" style="width:100%;text-align:center;">Join Channel ↗</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Interactive WhatsApp Dispatch Form -->
  <section class="py-6">
    <div class="mx-auto max-w-3xl px-4">
      <div class="rounded-2xl border-2 border-[#123a70]/15 bg-white p-6 sm:p-10 shadow-sm">
        <div class="text-center mb-6">
          <h2 class="text-2xl sm:text-3xl font-bold text-[#123a70]">Quick Consultation Request</h2>
          <p class="mt-2 text-sm text-slate-600">Fill in your details below to dispatch your profile directly to our counseling team on WhatsApp.</p>
        </div>
        <form id="consultation-form" style="display:flex;flex-direction:column;gap:16px;" onsubmit="event.preventDefault(); dispatchWhatsApp();">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">Full Name *</label>
              <input type="text" id="c-name" required placeholder="e.g. Muhammad Ali" style="margin-top:6px;width:100%;border-radius:10px;border:1px solid rgba(18,58,112,0.25);background:#f8fafc;padding:10px 14px;font-size:14px;outline:none;" />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">WhatsApp / Phone Number *</label>
              <input type="tel" id="c-phone" required placeholder="e.g. +92 300 1234567" style="margin-top:6px;width:100%;border-radius:10px;border:1px solid rgba(18,58,112,0.25);background:#f8fafc;padding:10px 14px;font-size:14px;outline:none;" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">Desired Degree Level *</label>
              <select id="c-degree" style="margin-top:6px;width:100%;border-radius:10px;border:1px solid rgba(18,58,112,0.25);background:#f8fafc;padding:10px 14px;font-size:14px;outline:none;">
                <option value="Bachelor's Program (Undergraduate)">Bachelor's Program (Undergraduate)</option>
                <option value="Master's Program (Postgraduate)">Master's Program (Postgraduate)</option>
                <option value="PhD / Doctorate">PhD / Doctorate</option>
                <option value="Language Course / Translation">Language Course / Translation</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">Destination *</label>
              <select id="c-country" style="margin-top:6px;width:100%;border-radius:10px;border:1px solid rgba(18,58,112,0.25);background:#f8fafc;padding:10px 14px;font-size:14px;outline:none;">
                <option value="Italy (Public Universities &amp; DSU)">Italy (Public Universities &amp; DSU)</option>
                <option value="Portugal">Portugal</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="China">China</option>
                <option value="Russia">Russia</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">Your Academic Background / CGPA / Questions</label>
            <textarea id="c-notes" rows="3" placeholder="Tell us your previous qualification, CGPA, and any specific questions you have..." style="margin-top:6px;width:100%;border-radius:10px;border:1px solid rgba(18,58,112,0.25);background:#f8fafc;padding:10px 14px;font-size:14px;outline:none;resize:vertical;"></textarea>
          </div>

          <div style="margin-top:8px;">
            <button type="submit" class="janan-btn-primary" style="width:100%;padding:14px 20px;font-size:15px;cursor:pointer;">
              Submit &amp; Open WhatsApp Conversation ↗
            </button>
          </div>
        </form>

        <script>
          function dispatchWhatsApp() {
            var name = document.getElementById('c-name').value.trim();
            var phone = document.getElementById('c-phone').value.trim();
            var degree = document.getElementById('c-degree').value;
            var country = document.getElementById('c-country').value;
            var notes = document.getElementById('c-notes').value.trim();

            var text = "Hello Janan Consultancy,\\n\\n" +
              "I would like to request study abroad counseling:\\n" +
              "• Name: " + name + "\\n" +
              "• Phone: " + phone + "\\n" +
              "• Degree Level: " + degree + "\\n" +
              "• Country: " + country + "\\n" +
              (notes ? "• Details: " + notes + "\\n" : "") +
              "\\nPlease let me know the admission windows and next steps.";

            var url = "https://wa.me/923700171997?text=" + encodeURIComponent(text);
            window.open(url, "_blank");
          }
        </script>
      </div>
    </div>
  </section>

  <!-- FAQs Accordion -->
  <section class="py-12">
    <div class="mx-auto max-w-4xl px-4">
      <div class="text-center mb-8">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-[#123a70]">Frequently Asked Questions</h2>
        <p class="mt-2 text-sm text-slate-600">Quick answers to common questions about admissions and scholarships.</p>
      </div>

      <div style="display:flex;flex-direction:column;gap:12px;">
        <details class="janan-card cursor-pointer">
          <summary class="flex items-center justify-between font-bold text-[#123a70]">
            <span>Can I apply to Italian public universities without IELTS?</span>
            <span style="color:#123a70;font-size:16px;">▼</span>
          </summary>
          <p class="mt-3 text-sm text-slate-600 leading-relaxed">
            Yes! Many Italian public universities accept an English Proficiency Certificate (Medium of Instruction - MOI) from your previous institution if your degree was taught in English. However, some specific courses or universities may require an IELTS score of 5.5 to 6.5. We evaluate your profile and target the right universities accordingly.
          </p>
        </details>

        <details class="janan-card cursor-pointer">
          <summary class="flex items-center justify-between font-bold text-[#123a70]">
            <span>What are Italian Regional Scholarships (DSU, ER.GO, ALiSEO)?</span>
            <span style="color:#123a70;font-size:16px;">▼</span>
          </summary>
          <p class="mt-3 text-sm text-slate-600 leading-relaxed">
            Regional scholarships in Italy are government need-based grants offered by regional bodies (such as DSU in Tuscany, ER.GO in Emilia Romagna, LazioDisco in Lazio, EDiSU in Piedmont/Lombardy). If your family income evaluates below the threshold (ISEE Parificato &lt; €25,000/year), you receive full tuition fee waiver, free or subsidized meals, accommodation, and an annual cash stipend up to €8,500.
          </p>
        </details>

        <details class="janan-card cursor-pointer">
          <summary class="flex items-center justify-between font-bold text-[#123a70]">
            <span>How does Janan Consultancy assist with embassy translations &amp; legalizations?</span>
            <span style="color:#123a70;font-size:16px;">▼</span>
          </summary>
          <p class="mt-3 text-sm text-slate-600 leading-relaxed">
            Both the Italian Embassy in Islamabad and the Consulate General in Karachi have strict translation and apostille/attestation standards. We provide authorized Italian sworn translations and guide you through Ministry of Foreign Affairs (MOFA) attestation, IBCC/HEC verification, and consulate submissions without delays.
          </p>
        </details>

        <details class="janan-card cursor-pointer">
          <summary class="flex items-center justify-between font-bold text-[#123a70]">
            <span>What are your active working hours?</span>
            <span style="color:#123a70;font-size:16px;">▼</span>
          </summary>
          <p class="mt-3 text-sm text-slate-600 leading-relaxed">
            Our counselors are actively available on WhatsApp and email Monday through Saturday from 10:00 AM to 8:00 PM (PKT). Community channels receive updates 24/7.
          </p>
        </details>
      </div>
    </div>
  </section>
</main>`;

// Load Complete Universities
const rawUnis = JSON.parse(fs.readFileSync('scripts/complete-universities.json', 'utf8'));

// Build Universities Page HTML
function buildUniversitiesHtml() {
  const cardsHtml = rawUnis.map(u => {
    const isFree = u.fee.includes('No Fee') || u.fee.includes('€0');
    const feeBadgeStyle = isFree 
      ? 'background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;' 
      : 'background:#eff6ff;color:#1d4ed8;border:1px solid #bfdbfe;';
    const hasApply = u.applyUrl && u.applyUrl.startsWith('http');
    const applyHref = hasApply ? u.applyUrl : `https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20would%20like%20to%20apply%20to%20${encodeURIComponent(u.name)}.`;
    const searchTokens = `${u.name.toLowerCase()} ${u.city.toLowerCase()} ${isFree ? 'nofee free' : ''} ${u.english.toLowerCase()}`;

    const cleanCity = u.city.replace(/,\s*Italy$/i, '').trim();
    return `
      <div data-uni-card data-search="${searchTokens}" class="janan-card flex flex-col justify-between" style="display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
            <span style="display:inline-flex;align-items:center;border-radius:8px;padding:4px 10px;font-size:11px;font-weight:700;${feeBadgeStyle}">
              ${u.fee}
            </span>
            <span style="display:inline-flex;align-items:center;border-radius:8px;background:#f1f5f9;padding:4px 10px;font-size:11px;font-weight:600;color:#475569;">
              📍 ${cleanCity}, Italy
            </span>
          </div>
          <h3 class="mt-3 text-lg font-bold text-[#123a70]" style="line-height:1.35;min-height:48px;">${u.name}</h3>
          
          <div style="margin-top:16px;border-top:1px solid #f1f5f9;padding-top:12px;font-size:12px;color:#475569;display:flex;flex-direction:column;gap:6px;">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span style="color:#94a3b8;">Language:</span>
              <span style="font-weight:600;color:#334155;">English / MOI Accepted</span>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span style="color:#94a3b8;">Scholarship:</span>
              <span style="font-weight:600;color:#047857;">DSU / Regional Eligible</span>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span style="color:#94a3b8;">Degrees:</span>
              <span style="font-weight:600;color:#334155;">Bachelor's &amp; Master's</span>
            </div>
          </div>
        </div>

        <div style="margin-top:20px;display:flex;flex-direction:column;gap:8px;padding-top:8px;">
          <a href="${applyHref}" target="_blank" rel="noreferrer" class="janan-btn-primary" style="padding:9px 14px;font-size:12px;border-radius:10px;width:100%;">
            Apply Portal ↗
          </a>
          <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20need%20admission%20guidance%20for%20${encodeURIComponent(u.name)}." target="_blank" rel="noreferrer" class="janan-btn-secondary" style="padding:8px 14px;font-size:12px;border-radius:10px;width:100%;border-width:1px;">
            Ask Counselor on WhatsApp
          </a>
        </div>
      </div>
    `;
  }).join('\n');

  return `<main class="min-h-screen bg-[#f7f9fc]">
    <!-- Hero Section -->
    <section class="border-b border-[#123a70]/10 bg-white py-16">
      <div class="mx-auto max-w-5xl px-4 text-center">
        <span class="inline-block rounded-full bg-[#123a70]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#123a70]">Accredited European Higher Education</span>
        <h1 class="mt-4 text-3xl font-extrabold tracking-tight text-[#123a70] sm:text-5xl">Italian Public Universities Directory</h1>
        <p class="mx-auto mt-4 max-w-2xl text-base text-slate-600">
          Discover top public universities across Italy offering English-taught Bachelor's and Master's programs, low tuition fees, and 100% regional scholarship eligibility.
        </p>

        <!-- Search & Filter Controls -->
        <div class="mt-8 flex flex-col items-center justify-center gap-4">
          <div class="relative w-full max-w-md">
            <input 
              id="uni-search" 
              type="text" 
              placeholder="Search by university name or city (e.g. Milan, Rome, Bologna, Genoa)..." 
              style="width:100%;border-radius:9999px;border:2px solid rgba(18,58,112,0.2);background:#f8fafc;padding:12px 22px;font-size:14px;color:#123a70;outline:none;box-shadow:0 1px 3px rgba(0,0,0,0.04);"
              oninput="filterUniversities()"
            />
          </div>

          <div class="flex flex-wrap items-center justify-center gap-2" style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px;">
            <button onclick="setFilter('all')" id="btn-all" class="filter-btn" style="border-radius:9999px;background:#123a70;color:#fff;padding:6px 16px;font-size:12px;font-weight:700;border:none;cursor:pointer;">All (${rawUnis.length})</button>
            <button onclick="setFilter('nofee')" id="btn-nofee" class="filter-btn" style="border-radius:9999px;border:1px solid rgba(18,58,112,0.25);background:#fff;color:#123a70;padding:6px 16px;font-size:12px;font-weight:600;cursor:pointer;">No Application Fee</button>
            <button onclick="setFilter('milan')" id="btn-milan" class="filter-btn" style="border-radius:9999px;border:1px solid rgba(18,58,112,0.25);background:#fff;color:#123a70;padding:6px 16px;font-size:12px;font-weight:600;cursor:pointer;">Milan</button>
            <button onclick="setFilter('rome')" id="btn-rome" class="filter-btn" style="border-radius:9999px;border:1px solid rgba(18,58,112,0.25);background:#fff;color:#123a70;padding:6px 16px;font-size:12px;font-weight:600;cursor:pointer;">Rome</button>
            <button onclick="setFilter('bologna')" id="btn-bologna" class="filter-btn" style="border-radius:9999px;border:1px solid rgba(18,58,112,0.25);background:#fff;color:#123a70;padding:6px 16px;font-size:12px;font-weight:600;cursor:pointer;">Bologna</button>
            <button onclick="setFilter('turin')" id="btn-turin" class="filter-btn" style="border-radius:9999px;border:1px solid rgba(18,58,112,0.25);background:#fff;color:#123a70;padding:6px 16px;font-size:12px;font-weight:600;cursor:pointer;">Turin</button>
          </div>

          <div id="uni-count" style="font-size:13px;font-weight:600;color:#64748b;">
            Showing ${rawUnis.length} of ${rawUnis.length} universities
          </div>
        </div>
      </div>
    </section>

    <!-- Cards Grid -->
    <section class="py-12">
      <div class="mx-auto max-w-6xl px-4">
        <div id="uni-grid" class="janan-grid-3">
          ${cardsHtml}
        </div>
        <div id="no-results" class="hidden rounded-2xl border-2 border-dashed border-[#123a70]/20 bg-white p-12 text-center" style="margin-top:24px;">
          <p class="text-lg font-bold text-[#123a70]">No universities match your search</p>
          <p class="mt-1 text-sm text-slate-500">Try searching for a different university name, city, or reset the filter.</p>
          <button onclick="resetSearch()" class="janan-btn-primary" style="margin-top:16px;padding:8px 20px;font-size:12px;cursor:pointer;">Reset Search</button>
        </div>
      </div>
    </section>

    <!-- Client-side Interactive Filter Script -->
    <script>
      var currentTag = 'all';

      function filterUniversities() {
        var query = (document.getElementById('uni-search').value || '').trim().toLowerCase();
        var cards = document.querySelectorAll('[data-uni-card]');
        var visibleCount = 0;

        cards.forEach(function(card) {
          var haystack = card.getAttribute('data-search') || '';
          var matchesQuery = !query || haystack.indexOf(query) !== -1;
          var matchesTag = (currentTag === 'all') || (haystack.indexOf(currentTag) !== -1);

          if (matchesQuery && matchesTag) {
            card.style.display = 'flex';
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });

        document.getElementById('uni-count').innerText = 'Showing ' + visibleCount + ' of ' + cards.length + ' universities';
        var noResults = document.getElementById('no-results');
        if (noResults) {
          if (visibleCount > 0) {
            noResults.classList.add('hidden');
          } else {
            noResults.classList.remove('hidden');
          }
        }
      }

      function setFilter(tag) {
        currentTag = tag;
        var buttons = document.querySelectorAll('.filter-btn');
        buttons.forEach(function(b) {
          b.style.background = '#ffffff';
          b.style.color = '#123a70';
          b.style.border = '1px solid rgba(18,58,112,0.25)';
          b.style.fontWeight = '600';
        });
        var activeBtn = document.getElementById('btn-' + tag);
        if (activeBtn) {
          activeBtn.style.background = '#123a70';
          activeBtn.style.color = '#ffffff';
          activeBtn.style.border = 'none';
          activeBtn.style.fontWeight = '700';
        }
        filterUniversities();
      }

      function resetSearch() {
        document.getElementById('uni-search').value = '';
        setFilter('all');
      }
    </script>
  </main>`;
}

const GLOBAL_ENHANCEMENT_STYLES = `
<style>
  .janan-btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background-color: #123a70;
    color: #ffffff !important;
    font-weight: 700;
    font-size: 0.875rem;
    padding: 12px 24px;
    border-radius: 9999px;
    text-decoration: none;
    box-shadow: 0 2px 6px rgba(18, 58, 112, 0.18);
    transition: all 0.2s ease;
    border: none;
  }
  .janan-btn-primary:hover {
    background-color: #0e2c56;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(18, 58, 112, 0.28);
  }
  .janan-btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background-color: #ffffff;
    color: #123a70 !important;
    font-weight: 700;
    font-size: 0.875rem;
    padding: 11px 22px;
    border-radius: 9999px;
    border: 2px solid #123a70;
    text-decoration: none;
    transition: all 0.2s ease;
  }
  .janan-btn-secondary:hover {
    background-color: rgba(18, 58, 112, 0.05);
    transform: translateY(-2px);
  }
  .janan-btn-white {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background-color: #ffffff;
    color: #123a70 !important;
    font-weight: 700;
    font-size: 0.875rem;
    padding: 12px 26px;
    border-radius: 9999px;
    text-decoration: none;
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
    transition: all 0.2s ease;
  }
  .janan-btn-white:hover {
    background-color: #f8fafc;
    transform: translateY(-2px);
  }
  .janan-btn-trans {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background-color: rgba(255, 255, 255, 0.12);
    color: #ffffff !important;
    font-weight: 700;
    font-size: 0.875rem;
    padding: 11px 24px;
    border-radius: 9999px;
    border: 1px solid rgba(255, 255, 255, 0.35);
    text-decoration: none;
    transition: all 0.2s ease;
  }
  .janan-btn-trans:hover {
    background-color: rgba(255, 255, 255, 0.22);
    transform: translateY(-2px);
  }
  .janan-grid-2 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }
  .janan-grid-3 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
  }
  .janan-grid-4 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
  }
  .janan-card {
    background-color: #ffffff;
    border: 2px solid rgba(18, 58, 112, 0.14);
    border-radius: 1.25rem;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    transition: all 0.2s ease;
  }
  .janan-card:hover {
    border-color: #123a70;
    box-shadow: 0 6px 18px rgba(18, 58, 112, 0.10);
    transform: translateY(-2px);
  }
</style>
`;

// Full HTML Template Wrapper
function buildFullHtml(title, description, contentHtml, activeNav) {
  return `<!DOCTYPE html><html lang="en"><head><meta charSet="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="preload" as="image" href="/img/janan-logo.jpg"/><link rel="stylesheet" href="/assets/index-Cmku6p7J.css" type="text/css" data-precedence="default"/><title>${title}</title><meta name="description" content="${description}"/><meta property="og:title" content="${title}"/><meta property="og:description" content="${description}"/><meta property="og:type" content="website"/><meta name="twitter:card" content="summary_large_image"/>${GLOBAL_ENHANCEMENT_STYLES}</head><body>
${getHeader(activeNav)}
${contentHtml}
<footer class="mt-20"></footer>
<script src="/assets/janan-features.js" defer></script>
</body></html>`;
}

// 1. Write Redesigned About Pages
const aboutHtml = buildFullHtml(
  "About Janan Consultancy — Study in Italy & Europe",
  "Learn about Janan Consultancy, our mission, leadership by Engr. Janan, and our end-to-end guidance for public universities and scholarships in Europe.",
  ABOUT_CONTENT,
  "about"
);
fs.writeFileSync('site-live/about/index.html', aboutHtml, 'utf8');
fs.writeFileSync('site-live/about.html', aboutHtml, 'utf8');
console.log('Successfully wrote site-live/about/index.html & site-live/about.html');

// 2. Write Redesigned Contact Pages
const contactHtml = buildFullHtml(
  "Contact Us — Janan Consultancy",
  "Connect with Janan Consultancy for study abroad counseling, Italian public university admissions, DSU scholarships, translations, and visa insurance.",
  CONTACT_CONTENT,
  "contact"
);
fs.writeFileSync('site-live/contact/index.html', contactHtml, 'utf8');
fs.writeFileSync('site-live/contact.html', contactHtml, 'utf8');
console.log('Successfully wrote site-live/contact/index.html & site-live/contact.html');

// 3. Write New Universities Pages
if (!fs.existsSync('site-live/universities')) {
  fs.mkdirSync('site-live/universities', { recursive: true });
}
const universitiesContent = buildUniversitiesHtml();
const universitiesHtml = buildFullHtml(
  "Italian & European Public Universities Directory — Janan Consultancy",
  "Comprehensive directory of Italian public universities with admission fee details, English-taught degree criteria, and direct application portals.",
  universitiesContent,
  "universities"
);
fs.writeFileSync('site-live/universities/index.html', universitiesHtml, 'utf8');
fs.writeFileSync('site-live/universities.html', universitiesHtml, 'utf8');
console.log('Successfully wrote site-live/universities/index.html & site-live/universities.html');

// 4. Update Header Nav Across All Existing HTML Pages to include Universities
function updateNavInHtml(dir) {
  let count = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      count += updateNavInHtml(full);
    } else if (entry.name.endsWith('.html')) {
      let content = fs.readFileSync(full, 'utf8');
      // Look for nav without Universities
      if (content.includes('href="/about"') && !content.includes('href="/universities"')) {
        content = content.replace(
          /(<a[^>]*href="\/about"[^>]*>About<\/a>)/i,
          `$1<a href="/universities" class="hover:underline">Universities</a>`
        );
        fs.writeFileSync(full, content, 'utf8');
        count++;
      }
    }
  }
  return count;
}
const navUpdated = updateNavInHtml('site-live');
console.log(`Updated header navigation in ${navUpdated} HTML pages!`);
