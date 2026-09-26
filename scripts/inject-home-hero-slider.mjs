import fs from 'fs';
import path from 'path';

const SLIDER_HTML = `
<!-- ========================================== -->
<!-- HERO SECTION SCHOLARSHIP SLIDER (ONE SLIDE AT A TIME) -->
<!-- ========================================== -->
<section id="janan-hero-slider-section" class="text-white" style="position:relative;overflow:hidden;max-width:100vw;width:100%;box-sizing:border-box;background:linear-gradient(135deg, #071933 0%, #123a70 55%, #184b8f 100%);border-bottom:1px solid rgba(255,255,255,0.15);">
  <!-- Background Ambient Glow -->
  <div style="position:absolute;top:0;left:20%;width:500px;height:500px;background:radial-gradient(circle, rgba(251,176,64,0.12) 0%, rgba(18,58,112,0) 70%);pointer-events:none;"></div>
  <div style="position:absolute;bottom:0;right:10%;width:400px;height:400px;background:radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(18,58,112,0) 70%);pointer-events:none;"></div>

  <!-- Slides Track Wrapper -->
  <div id="hero-slider-viewport" style="position:relative;width:100%;max-width:100vw;overflow:hidden;box-sizing:border-box;">
    <div id="hero-slider-track" style="display:flex;width:100%;transition:transform 0.55s cubic-bezier(0.25, 1, 0.5, 1);">

      <!-- SLIDE 1: DSU Toscana -->
      <div class="hero-slide-wrap w-full flex-shrink-0" style="min-width:100%;padding:56px 16px 92px 16px;box-sizing:border-box;">
        <div class="mx-auto max-w-5xl">
          <div style="display:flex;flex-wrap:wrap;align-items:center;gap:36px;justify-content:space-between;">
            <div style="flex:1 1 480px;max-width:620px;">
              <div class="hero-slide-badge" style="display:inline-flex;align-items:center;gap:8px;border-radius:9999px;background:rgba(16,185,129,0.2);border:1px solid rgba(16,185,129,0.4);padding:6px 14px;color:#a7f3d0;font-size:12px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;">
                <span style="display:inline-block;width:8px;height:8px;border-radius:9999px;background:#10b981;box-shadow:0 0 8px #10b981;"></span>
                Open Now • Priority Preparation
              </div>
              <p class="hero-slide-region" style="margin-top:14px;font-size:13px;font-weight:700;letter-spacing:0.1em;color:#fbb040;text-transform:uppercase;">Tuscany Region • Pisa • Florence • Siena</p>
              <h2 class="hero-slide-title" style="margin-top:8px;font-size:2.2rem;line-height:1.2;font-weight:900;color:#ffffff;letter-spacing:-0.02em;">
                DSU Toscana Regional Scholarship
              </h2>
              <p class="hero-slide-desc" style="margin-top:14px;font-size:1.05rem;line-height:1.6;color:rgba(255,255,255,0.88);">
                Cover 100% of your expenses studying in Tuscany. Top-ranking public universities including University of Pisa, Florence, and Siena offer full coverage through the DSU regional grant.
              </p>

              <!-- Scholarship Highlights Grid (2x2 on mobile, 4-col on desktop) -->
              <div class="hero-boxes-grid" style="margin-top:22px;display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:12px;">
                <div class="hero-box-item" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:12px 14px;">
                  <div class="hero-box-value" style="font-size:18px;font-weight:800;color:#fbb040;">€8,500 / Year</div>
                  <div class="hero-box-label" style="font-size:12px;color:rgba(255,255,255,0.8);margin-top:2px;">Annual Cash Stipend</div>
                </div>
                <div class="hero-box-item" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:12px 14px;">
                  <div class="hero-box-value" style="font-size:18px;font-weight:800;color:#ffffff;">100% Free Tuition</div>
                  <div class="hero-box-label" style="font-size:12px;color:rgba(255,255,255,0.8);margin-top:2px;">Complete Fee Exemption</div>
                </div>
                <div class="hero-box-item" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:12px 14px;">
                  <div class="hero-box-value" style="font-size:18px;font-weight:800;color:#a7f3d0;">Free Meals</div>
                  <div class="hero-box-label" style="font-size:12px;color:rgba(255,255,255,0.8);margin-top:2px;">Campus Mensa (2/Day)</div>
                </div>
                <div class="hero-box-item" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:12px 14px;">
                  <div class="hero-box-value" style="font-size:18px;font-weight:800;color:#ffffff;">Free Housing</div>
                  <div class="hero-box-label" style="font-size:12px;color:rgba(255,255,255,0.8);margin-top:2px;">Student Residence</div>
                </div>
              </div>

              <!-- Action CTAs (One row side-by-side on mobile) -->
              <div class="hero-buttons-wrap" style="margin-top:28px;display:flex;flex-wrap:wrap;align-items:center;gap:14px;">
                <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20would%20like%20to%20check%20my%20eligibility%20for%20the%20DSU%20Toscana%20Scholarship." target="_blank" rel="noreferrer" class="hero-btn-primary" style="display:inline-flex;align-items:center;gap:8px;background:#fbb040;color:#0a1f3d;font-weight:800;font-size:14px;padding:13px 26px;border-radius:9999px;text-decoration:none;box-shadow:0 4px 14px rgba(251,176,64,0.35);transition:all 0.2s;">
                  <span class="desktop-text">Check DSU Eligibility on WhatsApp ↗</span>
                  <span class="mobile-text">WhatsApp Check ↗</span>
                </a>
                <a href="/universities" class="hero-btn-secondary" style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.12);color:#ffffff;border:1px solid rgba(255,255,255,0.35);font-weight:700;font-size:14px;padding:12px 24px;border-radius:9999px;text-decoration:none;transition:all 0.2s;">
                  <span class="desktop-text">Explore Tuscan Universities →</span>
                  <span class="mobile-text">Explore Unis →</span>
                </a>
              </div>
            </div>

            <!-- Slide Side Card Visual (Hidden on mobile) -->
            <div class="hero-side-card" style="flex:1 1 300px;max-width:380px;background:rgba(255,255,255,0.06);border:2px solid rgba(255,255,255,0.18);border-radius:24px;padding:28px;backdrop-filter:blur(8px);box-shadow:0 12px 30px rgba(0,0,0,0.25);">
              <div style="font-size:12px;font-weight:700;color:#fbb040;text-transform:uppercase;letter-spacing:0.05em;">Key Requirement</div>
              <div style="font-size:1.4rem;font-weight:800;color:#ffffff;margin-top:6px;">ISEE Parificato &lt; €25,000</div>
              <p style="font-size:13px;color:rgba(255,255,255,0.8);margin-top:8px;line-height:1.5;">
                Almost all Pakistani &amp; South Asian middle-class students comfortably qualify based on family income documentation.
              </p>
              <div style="margin-top:20px;border-top:1px solid rgba(255,255,255,0.15);padding-top:16px;">
                <div style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.6);text-transform:uppercase;">Eligible Institutions</div>
                <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">
                  <span style="font-size:11px;font-weight:600;background:rgba(255,255,255,0.12);border-radius:6px;padding:4px 8px;">Univ. of Pisa</span>
                  <span style="font-size:11px;font-weight:600;background:rgba(255,255,255,0.12);border-radius:6px;padding:4px 8px;">Univ. of Florence</span>
                  <span style="font-size:11px;font-weight:600;background:rgba(255,255,255,0.12);border-radius:6px;padding:4px 8px;">Univ. of Siena</span>
                  <span style="font-size:11px;font-weight:600;background:rgba(255,255,255,0.12);border-radius:6px;padding:4px 8px;">Sant'Anna School</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SLIDE 2: ER.GO Emilia-Romagna -->
      <div class="hero-slide-wrap w-full flex-shrink-0" style="min-width:100%;padding:56px 16px 92px 16px;box-sizing:border-box;">
        <div class="mx-auto max-w-5xl">
          <div style="display:flex;flex-wrap:wrap;align-items:center;gap:36px;justify-content:space-between;">
            <div style="flex:1 1 480px;max-width:620px;">
              <div class="hero-slide-badge" style="display:inline-flex;align-items:center;gap:8px;border-radius:9999px;background:rgba(16,185,129,0.2);border:1px solid rgba(16,185,129,0.4);padding:6px 14px;color:#a7f3d0;font-size:12px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;">
                <span style="display:inline-block;width:8px;height:8px;border-radius:9999px;background:#10b981;box-shadow:0 0 8px #10b981;"></span>
                Admissions &amp; Call Open
              </div>
              <p class="hero-slide-region" style="margin-top:14px;font-size:13px;font-weight:700;letter-spacing:0.1em;color:#fbb040;text-transform:uppercase;">Emilia-Romagna • Bologna • Parma • Modena • Ferrara</p>
              <h2 class="hero-slide-title" style="margin-top:8px;font-size:2.2rem;line-height:1.2;font-weight:900;color:#ffffff;letter-spacing:-0.02em;">
                ER.GO Regional Scholarship
              </h2>
              <p class="hero-slide-desc" style="margin-top:14px;font-size:1.05rem;line-height:1.6;color:rgba(255,255,255,0.88);">
                Study at the world's oldest university, University of Bologna (ranked #1 in Italy), and premier institutes in Parma and Modena with complete financial funding from ER.GO.
              </p>

              <!-- Scholarship Highlights Grid -->
              <div class="hero-boxes-grid" style="margin-top:22px;display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:12px;">
                <div class="hero-box-item" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:12px 14px;">
                  <div class="hero-box-value" style="font-size:18px;font-weight:800;color:#fbb040;">€8,500+ / Year</div>
                  <div class="hero-box-label" style="font-size:12px;color:rgba(255,255,255,0.8);margin-top:2px;">Direct Cash Stipend</div>
                </div>
                <div class="hero-box-item" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:12px 14px;">
                  <div class="hero-box-value" style="font-size:18px;font-weight:800;color:#ffffff;">Zero Tuition</div>
                  <div class="hero-box-label" style="font-size:12px;color:rgba(255,255,255,0.8);margin-top:2px;">Complete Fee Exemption</div>
                </div>
                <div class="hero-box-item" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:12px 14px;">
                  <div class="hero-box-value" style="font-size:18px;font-weight:800;color:#a7f3d0;">Subsidized Housing</div>
                  <div class="hero-box-label" style="font-size:12px;color:rgba(255,255,255,0.8);margin-top:2px;">Priority Apartments</div>
                </div>
                <div class="hero-box-item" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:12px 14px;">
                  <div class="hero-box-value" style="font-size:18px;font-weight:800;color:#ffffff;">Meals Covered</div>
                  <div class="hero-box-label" style="font-size:12px;color:rgba(255,255,255,0.8);margin-top:2px;">Regional Canteen</div>
                </div>
              </div>

              <!-- Action CTAs -->
              <div class="hero-buttons-wrap" style="margin-top:28px;display:flex;flex-wrap:wrap;align-items:center;gap:14px;">
                <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20want%20to%20apply%20for%20University%20of%20Bologna%20and%20ER.GO%20scholarship." target="_blank" rel="noreferrer" class="hero-btn-primary" style="display:inline-flex;align-items:center;gap:8px;background:#fbb040;color:#0a1f3d;font-weight:800;font-size:14px;padding:13px 26px;border-radius:9999px;text-decoration:none;box-shadow:0 4px 14px rgba(251,176,64,0.35);transition:all 0.2s;">
                  <span class="desktop-text">Apply for ER.GO Guidance ↗</span>
                  <span class="mobile-text">WhatsApp Apply ↗</span>
                </a>
                <a href="/universities" class="hero-btn-secondary" style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.12);color:#ffffff;border:1px solid rgba(255,255,255,0.35);font-weight:700;font-size:14px;padding:12px 24px;border-radius:9999px;text-decoration:none;transition:all 0.2s;">
                  <span class="desktop-text">Explore Bologna &amp; Parma →</span>
                  <span class="mobile-text">Explore Unis →</span>
                </a>
              </div>
            </div>

            <!-- Slide Side Card Visual (Hidden on mobile) -->
            <div class="hero-side-card" style="flex:1 1 300px;max-width:380px;background:rgba(255,255,255,0.06);border:2px solid rgba(255,255,255,0.18);border-radius:24px;padding:28px;backdrop-filter:blur(8px);box-shadow:0 12px 30px rgba(0,0,0,0.25);">
              <div style="font-size:12px;font-weight:700;color:#fbb040;text-transform:uppercase;letter-spacing:0.05em;">Featured Ranking</div>
              <div style="font-size:1.4rem;font-weight:800;color:#ffffff;margin-top:6px;">Univ. of Bologna (#1 Italy)</div>
              <p style="font-size:13px;color:rgba(255,255,255,0.8);margin-top:8px;line-height:1.5;">
                World's oldest university offering 90+ Master's &amp; Bachelor's degrees taught entirely in English.
              </p>
              <div style="margin-top:20px;border-top:1px solid rgba(255,255,255,0.15);padding-top:16px;">
                <div style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.6);text-transform:uppercase;">Eligible Universities</div>
                <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">
                  <span style="font-size:11px;font-weight:600;background:rgba(255,255,255,0.12);border-radius:6px;padding:4px 8px;">Univ. of Bologna</span>
                  <span style="font-size:11px;font-weight:600;background:rgba(255,255,255,0.12);border-radius:6px;padding:4px 8px;">Univ. of Parma</span>
                  <span style="font-size:11px;font-weight:600;background:rgba(255,255,255,0.12);border-radius:6px;padding:4px 8px;">UNIMORE</span>
                  <span style="font-size:11px;font-weight:600;background:rgba(255,255,255,0.12);border-radius:6px;padding:4px 8px;">Univ. of Ferrara</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SLIDE 3: LazioDisco Rome -->
      <div class="hero-slide-wrap w-full flex-shrink-0" style="min-width:100%;padding:56px 16px 92px 16px;box-sizing:border-box;">
        <div class="mx-auto max-w-5xl">
          <div style="display:flex;flex-wrap:wrap;align-items:center;gap:36px;justify-content:space-between;">
            <div style="flex:1 1 480px;max-width:620px;">
              <div class="hero-slide-badge" style="display:inline-flex;align-items:center;gap:8px;border-radius:9999px;background:rgba(16,185,129,0.2);border:1px solid rgba(16,185,129,0.4);padding:6px 14px;color:#a7f3d0;font-size:12px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;">
                <span style="display:inline-block;width:8px;height:8px;border-radius:9999px;background:#10b981;box-shadow:0 0 8px #10b981;"></span>
                Rome Priority Intake Active
              </div>
              <p class="hero-slide-region" style="margin-top:14px;font-size:13px;font-weight:700;letter-spacing:0.1em;color:#fbb040;text-transform:uppercase;">Rome &amp; Lazio • Sapienza • Tor Vergata • Roma Tre</p>
              <h2 class="hero-slide-title" style="margin-top:8px;font-size:2.2rem;line-height:1.2;font-weight:900;color:#ffffff;letter-spacing:-0.02em;">
                LazioDisco Scholarship (Rome)
              </h2>
              <p class="hero-slide-desc" style="margin-top:14px;font-size:1.05rem;line-height:1.6;color:rgba(255,255,255,0.88);">
                Live and study in Italy's historic capital with full financial backing. Sapienza University of Rome, Tor Vergata, and Roma Tre are covered under the Lazio regional scholarship.
              </p>

              <!-- Scholarship Highlights Grid -->
              <div class="hero-boxes-grid" style="margin-top:22px;display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:12px;">
                <div class="hero-box-item" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:12px 14px;">
                  <div class="hero-box-value" style="font-size:18px;font-weight:800;color:#fbb040;">€8,000+ / Year</div>
                  <div class="hero-box-label" style="font-size:12px;color:rgba(255,255,255,0.8);margin-top:2px;">Regional Allowance</div>
                </div>
                <div class="hero-box-item" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:12px 14px;">
                  <div class="hero-box-value" style="font-size:18px;font-weight:800;color:#ffffff;">Zero Tuition</div>
                  <div class="hero-box-label" style="font-size:12px;color:rgba(255,255,255,0.8);margin-top:2px;">Sapienza &amp; Rome Unis Free</div>
                </div>
                <div class="hero-box-item" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:12px 14px;">
                  <div class="hero-box-value" style="font-size:18px;font-weight:800;color:#a7f3d0;">Rome Housing</div>
                  <div class="hero-box-label" style="font-size:12px;color:rgba(255,255,255,0.8);margin-top:2px;">Student Residences</div>
                </div>
                <div class="hero-box-item" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:12px 14px;">
                  <div class="hero-box-value" style="font-size:18px;font-weight:800;color:#ffffff;">Daily Canteen</div>
                  <div class="hero-box-label" style="font-size:12px;color:rgba(255,255,255,0.8);margin-top:2px;">Free Dining Vouchers</div>
                </div>
              </div>

              <!-- Action CTAs -->
              <div class="hero-buttons-wrap" style="margin-top:28px;display:flex;flex-wrap:wrap;align-items:center;gap:14px;">
                <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20am%20interested%20in%20Sapienza%20Rome%20and%20LazioDisco%20scholarship." target="_blank" rel="noreferrer" class="hero-btn-primary" style="display:inline-flex;align-items:center;gap:8px;background:#fbb040;color:#0a1f3d;font-weight:800;font-size:14px;padding:13px 26px;border-radius:9999px;text-decoration:none;box-shadow:0 4px 14px rgba(251,176,64,0.35);transition:all 0.2s;">
                  <span class="desktop-text">Check Rome Eligibility on WhatsApp ↗</span>
                  <span class="mobile-text">WhatsApp Check ↗</span>
                </a>
                <a href="/universities" class="hero-btn-secondary" style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.12);color:#ffffff;border:1px solid rgba(255,255,255,0.35);font-weight:700;font-size:14px;padding:12px 24px;border-radius:9999px;text-decoration:none;transition:all 0.2s;">
                  <span class="desktop-text">Explore Rome Universities →</span>
                  <span class="mobile-text">Explore Unis →</span>
                </a>
              </div>
            </div>

            <!-- Slide Side Card Visual (Hidden on mobile) -->
            <div class="hero-side-card" style="flex:1 1 300px;max-width:380px;background:rgba(255,255,255,0.06);border:2px solid rgba(255,255,255,0.18);border-radius:24px;padding:28px;backdrop-filter:blur(8px);box-shadow:0 12px 30px rgba(0,0,0,0.25);">
              <div style="font-size:12px;font-weight:700;color:#fbb040;text-transform:uppercase;letter-spacing:0.05em;">Capital City Prestige</div>
              <div style="font-size:1.4rem;font-weight:800;color:#ffffff;margin-top:6px;">Sapienza University of Rome</div>
              <p style="font-size:13px;color:rgba(255,255,255,0.8);margin-top:8px;line-height:1.5;">
                Europe's largest university with over 700 years of academic history, offering prestigious English degrees.
              </p>
              <div style="margin-top:20px;border-top:1px solid rgba(255,255,255,0.15);padding-top:16px;">
                <div style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.6);text-transform:uppercase;">Covered Universities</div>
                <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">
                  <span style="font-size:11px;font-weight:600;background:rgba(255,255,255,0.12);border-radius:6px;padding:4px 8px;">Sapienza Rome</span>
                  <span style="font-size:11px;font-weight:600;background:rgba(255,255,255,0.12);border-radius:6px;padding:4px 8px;">Tor Vergata</span>
                  <span style="font-size:11px;font-weight:600;background:rgba(255,255,255,0.12);border-radius:6px;padding:4px 8px;">Roma Tre</span>
                  <span style="font-size:11px;font-weight:600;background:rgba(255,255,255,0.12);border-radius:6px;padding:4px 8px;">Univ. of Tuscia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SLIDE 4: EDiSU Piemonte & Lombardy -->
      <div class="hero-slide-wrap w-full flex-shrink-0" style="min-width:100%;padding:56px 16px 92px 16px;box-sizing:border-box;">
        <div class="mx-auto max-w-5xl">
          <div style="display:flex;flex-wrap:wrap;align-items:center;gap:36px;justify-content:space-between;">
            <div style="flex:1 1 480px;max-width:620px;">
              <div class="hero-slide-badge" style="display:inline-flex;align-items:center;gap:8px;border-radius:9999px;background:rgba(16,185,129,0.2);border:1px solid rgba(16,185,129,0.4);padding:6px 14px;color:#a7f3d0;font-size:12px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;">
                <span style="display:inline-block;width:8px;height:8px;border-radius:9999px;background:#10b981;box-shadow:0 0 8px #10b981;"></span>
                Engineering &amp; Sciences Priority
              </div>
              <p class="hero-slide-region" style="margin-top:14px;font-size:13px;font-weight:700;letter-spacing:0.1em;color:#fbb040;text-transform:uppercase;">Piedmont &amp; Lombardy • PoliTO • UniTO • Milan • Pavia</p>
              <h2 class="hero-slide-title" style="margin-top:8px;font-size:2.2rem;line-height:1.2;font-weight:900;color:#ffffff;letter-spacing:-0.02em;">
                EDiSU Piemonte &amp; Lombardy
              </h2>
              <p class="hero-slide-desc" style="margin-top:14px;font-size:1.05rem;line-height:1.6;color:rgba(255,255,255,0.88);">
                Aiming for world-class Engineering, IT, or Management? Politecnico di Torino, University of Turin, and University of Milan offer 100% regional fee waivers and grants.
              </p>

              <!-- Scholarship Highlights Grid -->
              <div class="hero-boxes-grid" style="margin-top:22px;display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:12px;">
                <div class="hero-box-item" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:12px 14px;">
                  <div class="hero-box-value" style="font-size:18px;font-weight:800;color:#fbb040;">€8,200 / Year</div>
                  <div class="hero-box-label" style="font-size:12px;color:rgba(255,255,255,0.8);margin-top:2px;">Annual Cash Grant</div>
                </div>
                <div class="hero-box-item" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:12px 14px;">
                  <div class="hero-box-value" style="font-size:18px;font-weight:800;color:#ffffff;">100% Fee Exemption</div>
                  <div class="hero-box-label" style="font-size:12px;color:rgba(255,255,255,0.8);margin-top:2px;">Zero Tuition at PoliTO</div>
                </div>
                <div class="hero-box-item" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:12px 14px;">
                  <div class="hero-box-value" style="font-size:18px;font-weight:800;color:#a7f3d0;">EDiSU Residences</div>
                  <div class="hero-box-label" style="font-size:12px;color:rgba(255,255,255,0.8);margin-top:2px;">Hostel Room in Turin</div>
                </div>
                <div class="hero-box-item" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:12px 14px;">
                  <div class="hero-box-value" style="font-size:18px;font-weight:800;color:#ffffff;">Free Dining</div>
                  <div class="hero-box-label" style="font-size:12px;color:rgba(255,255,255,0.8);margin-top:2px;">Campus Meal Allowances</div>
                </div>
              </div>

              <!-- Action CTAs -->
              <div class="hero-buttons-wrap" style="margin-top:28px;display:flex;flex-wrap:wrap;align-items:center;gap:14px;">
                <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20am%20interested%20in%20Politecnico%20di%20Torino%20and%20EDiSU%20scholarship." target="_blank" rel="noreferrer" class="hero-btn-primary" style="display:inline-flex;align-items:center;gap:8px;background:#fbb040;color:#0a1f3d;font-weight:800;font-size:14px;padding:13px 26px;border-radius:9999px;text-decoration:none;box-shadow:0 4px 14px rgba(251,176,64,0.35);transition:all 0.2s;">
                  <span class="desktop-text">Check PoliTO Guidance on WhatsApp ↗</span>
                  <span class="mobile-text">WhatsApp Check ↗</span>
                </a>
                <a href="/universities" class="hero-btn-secondary" style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.12);color:#ffffff;border:1px solid rgba(255,255,255,0.35);font-weight:700;font-size:14px;padding:12px 24px;border-radius:9999px;text-decoration:none;transition:all 0.2s;">
                  <span class="desktop-text">Explore Turin &amp; Milan Unis →</span>
                  <span class="mobile-text">Explore Unis →</span>
                </a>
              </div>
            </div>

            <!-- Slide Side Card Visual (Hidden on mobile) -->
            <div class="hero-side-card" style="flex:1 1 300px;max-width:380px;background:rgba(255,255,255,0.06);border:2px solid rgba(255,255,255,0.18);border-radius:24px;padding:28px;backdrop-filter:blur(8px);box-shadow:0 12px 30px rgba(0,0,0,0.25);">
              <div style="font-size:12px;font-weight:700;color:#fbb040;text-transform:uppercase;letter-spacing:0.05em;">Engineering Hub</div>
              <div style="font-size:1.4rem;font-weight:800;color:#ffffff;margin-top:6px;">Politecnico di Torino (PoliTO)</div>
              <p style="font-size:13px;color:rgba(255,255,255,0.8);margin-top:8px;line-height:1.5;">
                Italy's oldest technical university, globally recognized for Automotive, Mechanical, Aerospace, and Computer Engineering.
              </p>
              <div style="margin-top:20px;border-top:1px solid rgba(255,255,255,0.15);padding-top:16px;">
                <div style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.6);text-transform:uppercase;">Eligible Universities</div>
                <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">
                  <span style="font-size:11px;font-weight:600;background:rgba(255,255,255,0.12);border-radius:6px;padding:4px 8px;">PoliTO</span>
                  <span style="font-size:11px;font-weight:600;background:rgba(255,255,255,0.12);border-radius:6px;padding:4px 8px;">Univ. of Turin</span>
                  <span style="font-size:11px;font-weight:600;background:rgba(255,255,255,0.12);border-radius:6px;padding:4px 8px;">Univ. of Milan</span>
                  <span style="font-size:11px;font-weight:600;background:rgba(255,255,255,0.12);border-radius:6px;padding:4px 8px;">Univ. of Pavia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SLIDE 5: MAECI Italian Government Grant -->
      <div class="hero-slide-wrap w-full flex-shrink-0" style="min-width:100%;padding:56px 16px 92px 16px;box-sizing:border-box;">
        <div class="mx-auto max-w-5xl">
          <div style="display:flex;flex-wrap:wrap;align-items:center;gap:36px;justify-content:space-between;">
            <div style="flex:1 1 480px;max-width:620px;">
              <div class="hero-slide-badge" style="display:inline-flex;align-items:center;gap:8px;border-radius:9999px;background:rgba(251,176,64,0.25);border:1px solid rgba(251,176,64,0.5);padding:6px 14px;color:#fde047;font-size:12px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;">
                <span style="display:inline-block;width:8px;height:8px;border-radius:9999px;background:#fbb040;box-shadow:0 0 8px #fbb040;"></span>
                Government National Merit Grant
              </div>
              <p class="hero-slide-region" style="margin-top:14px;font-size:13px;font-weight:700;letter-spacing:0.1em;color:#fbb040;text-transform:uppercase;">Italian Ministry of Foreign Affairs (MAECI)</p>
              <h2 class="hero-slide-title" style="margin-top:8px;font-size:2.2rem;line-height:1.2;font-weight:900;color:#ffffff;letter-spacing:-0.02em;">
                MAECI Italian Government Grant
              </h2>
              <p class="hero-slide-desc" style="margin-top:14px;font-size:1.05rem;line-height:1.6;color:rgba(255,255,255,0.88);">
                Offered directly by the Italian Government to encourage international cooperation, this prestigious merit grant funds Master's &amp; PhD students across all Italian public universities.
              </p>

              <!-- Scholarship Highlights Grid -->
              <div class="hero-boxes-grid" style="margin-top:22px;display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:12px;">
                <div class="hero-box-item" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:12px 14px;">
                  <div class="hero-box-value" style="font-size:18px;font-weight:800;color:#fbb040;">€9,000 Total</div>
                  <div class="hero-box-label" style="font-size:12px;color:rgba(255,255,255,0.8);margin-top:2px;">€1,000 / Month Deposit</div>
                </div>
                <div class="hero-box-item" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:12px 14px;">
                  <div class="hero-box-value" style="font-size:18px;font-weight:800;color:#ffffff;">100% Tuition Exemption</div>
                  <div class="hero-box-label" style="font-size:12px;color:rgba(255,255,255,0.8);margin-top:2px;">Full University Waiver</div>
                </div>
                <div class="hero-box-item" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:12px 14px;">
                  <div class="hero-box-value" style="font-size:18px;font-weight:800;color:#a7f3d0;">Free Health Insurance</div>
                  <div class="hero-box-label" style="font-size:12px;color:rgba(255,255,255,0.8);margin-top:2px;">Full Medical Cover</div>
                </div>
                <div class="hero-box-item" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:12px 14px;">
                  <div class="hero-box-value" style="font-size:18px;font-weight:800;color:#ffffff;">Nationwide Scope</div>
                  <div class="hero-box-label" style="font-size:12px;color:rgba(255,255,255,0.8);margin-top:2px;">All Italian Public Unis</div>
                </div>
              </div>

              <!-- Action CTAs -->
              <div class="hero-buttons-wrap" style="margin-top:28px;display:flex;flex-wrap:wrap;align-items:center;gap:14px;">
                <a href="https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20want%20to%20prepare%20documents%20for%20the%20MAECI%20Italian%20Government%20Scholarship." target="_blank" rel="noreferrer" class="hero-btn-primary" style="display:inline-flex;align-items:center;gap:8px;background:#fbb040;color:#0a1f3d;font-weight:800;font-size:14px;padding:13px 26px;border-radius:9999px;text-decoration:none;box-shadow:0 4px 14px rgba(251,176,64,0.35);transition:all 0.2s;">
                  <span class="desktop-text">Prepare MAECI Application on WhatsApp ↗</span>
                  <span class="mobile-text">WhatsApp Prepare ↗</span>
                </a>
                <a href="/universities" class="hero-btn-secondary" style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.12);color:#ffffff;border:1px solid rgba(255,255,255,0.35);font-weight:700;font-size:14px;padding:12px 24px;border-radius:9999px;text-decoration:none;transition:all 0.2s;">
                  <span class="desktop-text">Explore Eligible Universities →</span>
                  <span class="mobile-text">Explore Unis →</span>
                </a>
              </div>
            </div>

            <!-- Slide Side Card Visual (Hidden on mobile) -->
            <div class="hero-side-card" style="flex:1 1 300px;max-width:380px;background:rgba(255,255,255,0.06);border:2px solid rgba(255,255,255,0.18);border-radius:24px;padding:28px;backdrop-filter:blur(8px);box-shadow:0 12px 30px rgba(0,0,0,0.25);">
              <div style="font-size:12px;font-weight:700;color:#fbb040;text-transform:uppercase;letter-spacing:0.05em;">Scholarship Type</div>
              <div style="font-size:1.4rem;font-weight:800;color:#ffffff;margin-top:6px;">National Diplomatic Award</div>
              <p style="font-size:13px;color:rgba(255,255,255,0.8);margin-top:8px;line-height:1.5;">
                Requires pre-admission acceptance letter and certified degree documentation legalized with CIMEA or Declaration of Value (DOV).
              </p>
              <div style="margin-top:20px;border-top:1px solid rgba(255,255,255,0.15);padding-top:16px;">
                <div style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.6);text-transform:uppercase;">Included Support</div>
                <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">
                  <span style="font-size:11px;font-weight:600;background:rgba(255,255,255,0.12);border-radius:6px;padding:4px 8px;">Master's (2 Years)</span>
                  <span style="font-size:11px;font-weight:600;background:rgba(255,255,255,0.12);border-radius:6px;padding:4px 8px;">PhD Research</span>
                  <span style="font-size:11px;font-weight:600;background:rgba(255,255,255,0.12);border-radius:6px;padding:4px 8px;">AFAM Arts &amp; Music</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- Left / Right Chevron Navigation Buttons -->
  <button id="hero-slider-prev" aria-label="Previous Scholarship Slide" style="position:absolute;left:14px;top:50%;transform:translateY(-50%);z-index:30;background:rgba(255,255,255,0.2);backdrop-filter:blur(6px);color:#ffffff;border:1px solid rgba(255,255,255,0.35);border-radius:9999px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.4)';this.style.transform='translateY(-50%) scale(1.05)'" onmouseout="this.style.background='rgba(255,255,255,0.2)';this.style.transform='translateY(-50%) scale(1)'">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
  </button>
  <button id="hero-slider-next" aria-label="Next Scholarship Slide" style="position:absolute;right:14px;top:50%;transform:translateY(-50%);z-index:30;background:rgba(255,255,255,0.2);backdrop-filter:blur(6px);color:#ffffff;border:1px solid rgba(255,255,255,0.35);border-radius:9999px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.4)';this.style.transform='translateY(-50%) scale(1.05)'" onmouseout="this.style.background='rgba(255,255,255,0.2)';this.style.transform='translateY(-50%) scale(1)'">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  </button>

  <!-- Slider Indicator Dots -->
  <div style="position:absolute;bottom:24px;left:0;right:0;display:flex;align-items:center;justify-content:center;gap:8px;z-index:30;" id="hero-slider-dots">
    <button class="hero-dot" data-slide="0" aria-label="Go to Slide 1" style="width:28px;height:8px;border-radius:9999px;background:#fbb040;border:none;cursor:pointer;transition:all 0.3s;"></button>
    <button class="hero-dot" data-slide="1" aria-label="Go to Slide 2" style="width:8px;height:8px;border-radius:9999px;background:rgba(255,255,255,0.35);border:none;cursor:pointer;transition:all 0.3s;"></button>
    <button class="hero-dot" data-slide="2" aria-label="Go to Slide 3" style="width:8px;height:8px;border-radius:9999px;background:rgba(255,255,255,0.35);border:none;cursor:pointer;transition:all 0.3s;"></button>
    <button class="hero-dot" data-slide="3" aria-label="Go to Slide 4" style="width:8px;height:8px;border-radius:9999px;background:rgba(255,255,255,0.35);border:none;cursor:pointer;transition:all 0.3s;"></button>
    <button class="hero-dot" data-slide="4" aria-label="Go to Slide 5" style="width:8px;height:8px;border-radius:9999px;background:rgba(255,255,255,0.35);border:none;cursor:pointer;transition:all 0.3s;"></button>
  </div>
</section>

<!-- Mobile Hero Slider Specific CSS Styles -->
<style>
  @media (max-width: 768px) {
    /* 1. Remove regional subtitle & description paragraph from each slide */
    .hero-slide-region {
      display: none !important;
    }
    .hero-slide-desc {
      display: none !important;
    }
    /* Hide auxiliary side card on mobile so slide is tight and focused */
    .hero-side-card {
      display: none !important;
    }
    /* Compact slide padding */
    .hero-slide-wrap {
      padding: 24px 14px 60px 14px !important;
    }
    /* Small badge */
    .hero-slide-badge {
      font-size: 10px !important;
      padding: 4px 10px !important;
    }
    /* 2. Smaller title font */
    .hero-slide-title {
      font-size: 1.35rem !important;
      line-height: 1.25 !important;
      margin-top: 6px !important;
      font-weight: 800 !important;
    }
    /* 3. The 4 boxes: small, 2 boxes per row */
    .hero-boxes-grid {
      display: grid !important;
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 8px !important;
      margin-top: 14px !important;
    }
    .hero-box-item {
      padding: 8px 10px !important;
      border-radius: 10px !important;
    }
    .hero-box-value {
      font-size: 13.5px !important;
      font-weight: 800 !important;
    }
    .hero-box-label {
      font-size: 10px !important;
      line-height: 1.2 !important;
      margin-top: 2px !important;
    }
    /* 4. Two buttons: small and in one row */
    .hero-buttons-wrap {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: 8px !important;
      margin-top: 14px !important;
      width: 100% !important;
    }
    .hero-btn-primary, .hero-btn-secondary {
      width: 100% !important;
      min-width: 0 !important;
      padding: 10px 4px !important;
      font-size: 11px !important;
      font-weight: 700 !important;
      border-radius: 9999px !important;
      text-align: center !important;
      justify-content: center !important;
      white-space: nowrap !important;
      box-sizing: border-box !important;
    }
    .hero-btn-primary .desktop-text, .hero-btn-secondary .desktop-text {
      display: none !important;
    }
    .hero-btn-primary .mobile-text, .hero-btn-secondary .mobile-text {
      display: inline !important;
    }
    #hero-slider-prev, #hero-slider-next {
      display: none !important;
    }
    .home-dest-desc {
      display: none !important;
    }
  }
  @media (min-width: 769px) {
    .hero-btn-primary .mobile-text, .hero-btn-secondary .mobile-text {
      display: none !important;
    }
    .hero-btn-primary .desktop-text, .hero-btn-secondary .desktop-text {
      display: inline !important;
    }
  }
</style>

<!-- Lightweight Vanilla JS Slider Controller -->
<script>
  (function initHeroSlider() {
    var currentSlide = 0;
    var totalSlides = 5;
    var track = document.getElementById('hero-slider-track');
    var dots = document.querySelectorAll('.hero-dot');
    var autoPlayTimer = null;
    var sliderSection = document.getElementById('janan-hero-slider-section');

    function updateSlider(index) {
      currentSlide = (index + totalSlides) % totalSlides;
      if (track) {
        track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
      }
      dots.forEach(function(dot, idx) {
        if (idx === currentSlide) {
          dot.style.width = '28px';
          dot.style.background = '#fbb040';
        } else {
          dot.style.width = '8px';
          dot.style.background = 'rgba(255,255,255,0.35)';
        }
      });
    }

    function nextSlide() {
      updateSlider(currentSlide + 1);
    }

    function prevSlide() {
      updateSlider(currentSlide - 1);
    }

    function startAutoPlay() {
      stopAutoPlay();
      autoPlayTimer = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }

    var nextBtn = document.getElementById('hero-slider-next');
    var prevBtn = document.getElementById('hero-slider-prev');

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        nextSlide();
        startAutoPlay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        prevSlide();
        startAutoPlay();
      });
    }

    dots.forEach(function(dot) {
      dot.addEventListener('click', function() {
        var idx = parseInt(dot.getAttribute('data-slide'), 10);
        updateSlider(idx);
        startAutoPlay();
      });
    });

    if (sliderSection) {
      sliderSection.addEventListener('mouseenter', stopAutoPlay);
      sliderSection.addEventListener('mouseleave', startAutoPlay);
      sliderSection.addEventListener('touchstart', stopAutoPlay, { passive: true });
      sliderSection.addEventListener('touchend', startAutoPlay, { passive: true });
    }

    // Touch swipe support
    var startX = 0;
    var endX = 0;
    if (sliderSection) {
      sliderSection.addEventListener('touchstart', function(e) {
        startX = e.changedTouches[0].screenX;
      }, { passive: true });

      sliderSection.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].screenX;
        if (startX - endX > 40) {
          nextSlide();
        } else if (endX - startX > 40) {
          prevSlide();
        }
      }, { passive: true });
    }

    startAutoPlay();
  })();
</script>
`;

function injectHeroSliderIntoHome() {
  const homePath = path.resolve('site-live/index.html');
  let content = fs.readFileSync(homePath, 'utf8');

  // Remove any previously injected hero slider section
  content = content.replace(/<!-- ========================================== -->\s*<!-- HERO SECTION SCHOLARSHIP SLIDER[\s\S]*?<\/script>/, '');

  // Look for the end of the marquee style tag
  const marqueeEndRegex = /(<\/style>\s*)(<!--\$-->|<main)/i;
  if (!marqueeEndRegex.test(content)) {
    console.error('Could not find marquee end tag in site-live/index.html');
    return;
  }

  content = content.replace(marqueeEndRegex, `$1\n${SLIDER_HTML}\n$2`);
  // Ensure the section following the slider has generous top padding explicitly via inline style
  // First strip any existing repeated style attributes on that container
  content = content.replace(/(<main[^>]*><div class="mx-auto max-w-5xl px-4)(?:\s*style="[^"]*")+/gi, '$1');
  content = content.replace(/(<main[^>]*><div class="mx-auto max-w-5xl px-4)"/i, '$1" style="padding-top:72px;padding-bottom:48px;"');
  // Hide the destination description on mobile screens
  content = content.replace(
    /<p class="mx-auto mt-4 max-w-2xl text-slate-600">\s*Janan Consultancy walks you through admissions, regional scholarships, document translation and visa insurance\. Choose a destination to get started\.\s*<\/p>/i,
    '<p class="home-dest-desc mx-auto mt-4 max-w-2xl text-slate-600">Janan Consultancy walks you through admissions, regional scholarships, document translation and visa insurance. Choose a destination to get started.</p>'
  );
  fs.writeFileSync(homePath, content, 'utf8');
  console.log('Successfully injected responsive Hero Scholarship Slider into site-live/index.html!');
}

injectHeroSliderIntoHome();
