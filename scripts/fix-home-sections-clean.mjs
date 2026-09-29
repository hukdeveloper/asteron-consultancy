import fs from 'fs';
import path from 'path';

const indexPath = path.resolve('site-live/index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// The clean, responsive, perfectly spaced university sections
const cleanSections = `
<!-- ========================================== -->
<!-- SECTIONS: FEATURED ITALY & PORTUGAL UNIVERSITIES -->
<!-- ========================================== -->
<style id="janan-home-unis-style">
  .janan-unis-grid {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 24px !important;
  }
  .janan-uni-card {
    background: #ffffff !important;
    border: 2px solid rgba(18, 58, 112, 0.12) !important;
    border-radius: 18px !important;
    padding: 24px !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    box-shadow: 0 2px 10px rgba(18, 58, 112, 0.04) !important;
    transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1) !important;
    box-sizing: border-box !important;
  }
  .janan-uni-card:hover {
    border-color: #123a70 !important;
    box-shadow: 0 10px 28px rgba(18, 58, 112, 0.12) !important;
    transform: translateY(-3px) !important;
  }
  .janan-sec-btn {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 8px !important;
    padding: 12px 36px !important;
    border-radius: 9999px !important;
    font-size: 14px !important;
    font-weight: 700 !important;
    text-decoration: none !important;
    transition: all 0.2s ease !important;
    border: 2px solid #123a70 !important;
    color: #123a70 !important;
    background: #ffffff !important;
    box-shadow: 0 2px 8px rgba(18, 58, 112, 0.08) !important;
  }
  .janan-sec-btn:hover {
    background: #123a70 !important;
    color: #ffffff !important;
    box-shadow: 0 4px 14px rgba(18, 58, 112, 0.2) !important;
    transform: translateY(-2px) !important;
  }
  .janan-card-apply-btn {
    display: inline-flex !important;
    align-items: center !important;
    gap: 6px !important;
    background: #123a70 !important;
    color: #ffffff !important;
    font-size: 12px !important;
    font-weight: 700 !important;
    padding: 7px 16px !important;
    border-radius: 9999px !important;
    text-decoration: none !important;
    transition: all 0.2s ease !important;
  }
  .janan-card-apply-btn:hover {
    background: #09254a !important;
    transform: translateY(-1px) !important;
  }
  @media (max-width: 900px) {
    .janan-unis-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 18px !important;
    }
  }
  @media (max-width: 640px) {
    .janan-unis-grid {
      grid-template-columns: 1fr !important;
      gap: 16px !important;
    }
    .janan-uni-card {
      padding: 18px 16px !important;
    }
    .janan-sec-header {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 12px !important;
    }
  }
</style>

<!-- Elegant Divider before Italian Section -->
<div style="height: 1px; width: 100%; background: linear-gradient(90deg, transparent, rgba(18,58,112,0.18), transparent); margin: 76px 0 68px 0;"></div>

<!-- SECTION 1: FEATURED ITALIAN UNIVERSITIES -->
<section class="janan-home-section" style="margin-top: 0; margin-bottom: 0; box-sizing: border-box;">
  <div class="janan-sec-header" style="display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:28px;">
    <div>
      <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(18,58,112,0.06);border:1px solid rgba(18,58,112,0.14);border-radius:9999px;padding:5px 14px;color:#123a70;font-size:12px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;margin-bottom:10px;">
        <span>🇮🇹 Study in Italy</span>
      </div>
      <h2 style="font-size:1.75rem;line-height:1.25;font-weight:900;color:#123a70;letter-spacing:-0.02em;margin:0;">
        Featured Universities in Italy
      </h2>
      <p style="font-size:14px;color:#64748b;margin-top:6px;max-width:540px;line-height:1.5;">
        World-renowned public universities offering English-taught degrees and 100% regional scholarship coverage.
      </p>
    </div>
    <a href="/universities" style="display:inline-flex;align-items:center;gap:6px;font-size:13.5px;font-weight:700;color:#123a70;text-decoration:none;white-space:nowrap;" onmouseover="this.style.color='#fbb040'" onmouseout="this.style.color='#123a70'">
      <span>View All</span>
      <span>→</span>
    </a>
  </div>

  <div class="janan-unis-grid">
    <!-- Card 1: University of Bologna -->
    <div class="janan-uni-card">
      <div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:12px;">
          <span style="font-size:11px;font-weight:700;background:rgba(18,58,112,0.08);color:#123a70;border-radius:6px;padding:3px 8px;">Emilia-Romagna</span>
          <span style="font-size:11px;font-weight:700;background:#ecfdf5;color:#047857;border-radius:6px;padding:3px 8px;">#1 in Italy</span>
        </div>
        <h3 style="font-size:17px;font-weight:800;color:#123a70;margin:0;line-height:1.3;">University of Bologna</h3>
        <div style="font-size:12px;font-weight:600;color:#94a3b8;margin-top:2px;">Alma Mater Studiorum • Bologna</div>
        <p style="font-size:12.5px;color:#475569;margin-top:12px;line-height:1.55;">
          Founded in 1088, the oldest university in the world offers 90+ English-taught Bachelor's and Master's programs with full eligibility for ER.GO regional grants.
        </p>
        <div style="margin-top:16px;padding-top:12px;border-top:1px solid #f1f5f9;display:flex;flex-direction:column;gap:6px;font-size:12px;">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span style="color:#64748b;">Regional Grant:</span>
            <span style="font-weight:700;color:#123a70;">ER.GO (€8,500/yr + Meals)</span>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span style="color:#64748b;">Tuition Fees:</span>
            <span style="font-weight:700;color:#059669;">€0 (100% Waiver with ISEE)</span>
          </div>
        </div>
      </div>
      <div style="margin-top:20px;padding-top:14px;border-top:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
        <a href="https://www.unibo.it" target="_blank" rel="noreferrer" style="font-size:12px;font-weight:700;color:#64748b;text-decoration:none;" onmouseover="this.style.color='#123a70'" onmouseout="this.style.color='#64748b'">
          Official Portal ↗
        </a>
        <a href="/universities" class="janan-card-apply-btn">
          <span>View Details</span> →
        </a>
      </div>
    </div>

    <!-- Card 2: Sapienza University of Rome -->
    <div class="janan-uni-card">
      <div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:12px;">
          <span style="font-size:11px;font-weight:700;background:rgba(18,58,112,0.08);color:#123a70;border-radius:6px;padding:3px 8px;">Rome (Lazio)</span>
          <span style="font-size:11px;font-weight:700;background:#fffbeb;color:#b45309;border-radius:6px;padding:3px 8px;">Largest in Europe</span>
        </div>
        <h3 style="font-size:17px;font-weight:800;color:#123a70;margin:0;line-height:1.3;">Sapienza University of Rome</h3>
        <div style="font-size:12px;font-weight:600;color:#94a3b8;margin-top:2px;">Sapienza Università di Roma • Rome</div>
        <p style="font-size:12.5px;color:#475569;margin-top:12px;line-height:1.55;">
          Over 700 years of historic excellence with top-tier faculties in Classics, Medicine, Computer Science, and Artificial Intelligence located in Italy's historic capital.
        </p>
        <div style="margin-top:16px;padding-top:12px;border-top:1px solid #f1f5f9;display:flex;flex-direction:column;gap:6px;font-size:12px;">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span style="color:#64748b;">Regional Grant:</span>
            <span style="font-weight:700;color:#123a70;">Lazio DiSCo (€8,000+/yr)</span>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span style="color:#64748b;">Tuition Fees:</span>
            <span style="font-weight:700;color:#059669;">Subsidized / Free with DiSCo</span>
          </div>
        </div>
      </div>
      <div style="margin-top:20px;padding-top:14px;border-top:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
        <a href="https://www.uniroma1.it" target="_blank" rel="noreferrer" style="font-size:12px;font-weight:700;color:#64748b;text-decoration:none;" onmouseover="this.style.color='#123a70'" onmouseout="this.style.color='#64748b'">
          Official Portal ↗
        </a>
        <a href="/universities" class="janan-card-apply-btn">
          <span>View Details</span> →
        </a>
      </div>
    </div>

    <!-- Card 3: Polytechnic University of Milan -->
    <div class="janan-uni-card">
      <div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:12px;">
          <span style="font-size:11px;font-weight:700;background:rgba(18,58,112,0.08);color:#123a70;border-radius:6px;padding:3px 8px;">Lombardy</span>
          <span style="font-size:11px;font-weight:700;background:#eff6ff;color:#1d4ed8;border-radius:6px;padding:3px 8px;">Top Tech &amp; Design</span>
        </div>
        <h3 style="font-size:17px;font-weight:800;color:#123a70;margin:0;line-height:1.3;">Polytechnic University of Milan</h3>
        <div style="font-size:12px;font-weight:600;color:#94a3b8;margin-top:2px;">Politecnico di Milano (PoliMI) • Milan</div>
        <p style="font-size:12.5px;color:#475569;margin-top:12px;line-height:1.55;">
          Italy's top-ranked technical university and global powerhouse for Architecture, Design, Mechanical and Computer Engineering with high international employability.
        </p>
        <div style="margin-top:16px;padding-top:12px;border-top:1px solid #f1f5f9;display:flex;flex-direction:column;gap:6px;font-size:12px;">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span style="color:#64748b;">Regional Grant:</span>
            <span style="font-weight:700;color:#123a70;">DSU Lombardia &amp; Merit</span>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span style="color:#64748b;">Tuition Fees:</span>
            <span style="font-weight:700;color:#059669;">Exempt with DSU Grant</span>
          </div>
        </div>
      </div>
      <div style="margin-top:20px;padding-top:14px;border-top:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
        <a href="https://www.polimi.it" target="_blank" rel="noreferrer" style="font-size:12px;font-weight:700;color:#64748b;text-decoration:none;" onmouseover="this.style.color='#123a70'" onmouseout="this.style.color='#64748b'">
          Official Portal ↗
        </a>
        <a href="/universities" class="janan-card-apply-btn">
          <span>View Details</span> →
        </a>
      </div>
    </div>
  </div>

  <div style="margin-top:36px;text-align:center;">
    <a href="/universities" class="janan-sec-btn">
      <span>View All</span>
      <span>→</span>
    </a>
  </div>
</section>

<!-- Elegant Divider between Italy & Portugal Sections (Ample Space) -->
<div style="height: 1px; width: 100%; background: linear-gradient(90deg, transparent, rgba(18,58,112,0.18), transparent); margin: 76px 0 68px 0;"></div>

<!-- SECTION 2: FEATURED PORTUGAL PUBLIC UNIVERSITIES -->
<section class="janan-home-section" style="margin-top: 0; margin-bottom: 48px; box-sizing: border-box;">
  <div class="janan-sec-header" style="display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:28px;">
    <div>
      <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:9999px;padding:5px 14px;color:#065f46;font-size:12px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;margin-bottom:10px;">
        <span>🇵🇹 Study in Portugal</span>
      </div>
      <h2 style="font-size:1.75rem;line-height:1.25;font-weight:900;color:#123a70;letter-spacing:-0.02em;margin:0;">
        Featured Public Universities in Portugal
      </h2>
      <p style="font-size:14px;color:#64748b;margin-top:6px;max-width:540px;line-height:1.5;">
        Prestigious public universities under DGES regulations offering affordable European tuition and English-taught Master's.
      </p>
    </div>
    <a href="/study/portugal" style="display:inline-flex;align-items:center;gap:6px;font-size:13.5px;font-weight:700;color:#123a70;text-decoration:none;white-space:nowrap;" onmouseover="this.style.color='#fbb040'" onmouseout="this.style.color='#123a70'">
      <span>View All</span>
      <span>→</span>
    </a>
  </div>

  <div class="janan-unis-grid">
    <!-- Card 1: University of Porto -->
    <div class="janan-uni-card">
      <div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:12px;">
          <span style="font-size:11px;font-weight:700;background:rgba(16,185,129,0.1);color:#065f46;border-radius:6px;padding:3px 8px;">Porto</span>
          <span style="font-size:11px;font-weight:700;background:rgba(18,58,112,0.08);color:#123a70;border-radius:6px;padding:3px 8px;">#1 in Portugal</span>
        </div>
        <h3 style="font-size:17px;font-weight:800;color:#123a70;margin:0;line-height:1.3;">University of Porto</h3>
        <div style="font-size:12px;font-weight:600;color:#94a3b8;margin-top:2px;">Universidade do Porto (U.Porto) • Porto</div>
        <p style="font-size:12.5px;color:#475569;margin-top:12px;line-height:1.55;">
          Portugal's top research university featuring prestigious engineering (FEUP), science, medicine, and economics faculties with strong industry ties across the EU.
        </p>
        <div style="margin-top:16px;padding-top:12px;border-top:1px solid #f1f5f9;display:flex;flex-direction:column;gap:6px;font-size:12px;">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span style="color:#64748b;">Admissions:</span>
            <span style="font-weight:700;color:#123a70;">International Contest (Phases 1-3)</span>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span style="color:#64748b;">Language Proof:</span>
            <span style="font-weight:700;color:#334155;">Programme-specific (IELTS/MOI)</span>
          </div>
        </div>
      </div>
      <div style="margin-top:20px;padding-top:14px;border-top:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
        <a href="https://www.up.pt" target="_blank" rel="noreferrer" style="font-size:12px;font-weight:700;color:#64748b;text-decoration:none;" onmouseover="this.style.color='#123a70'" onmouseout="this.style.color='#64748b'">
          Official Portal ↗
        </a>
        <a href="/study/portugal#porto" class="janan-card-apply-btn">
          <span>View Guide</span> →
        </a>
      </div>
    </div>

    <!-- Card 2: University of Lisbon -->
    <div class="janan-uni-card">
      <div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:12px;">
          <span style="font-size:11px;font-weight:700;background:rgba(16,185,129,0.1);color:#065f46;border-radius:6px;padding:3px 8px;">Lisbon</span>
          <span style="font-size:11px;font-weight:700;background:#fffbeb;color:#b45309;border-radius:6px;padding:3px 8px;">Largest University</span>
        </div>
        <h3 style="font-size:17px;font-weight:800;color:#123a70;margin:0;line-height:1.3;">University of Lisbon</h3>
        <div style="font-size:12px;font-weight:600;color:#94a3b8;margin-top:2px;">Universidade de Lisboa (ULisboa) • Lisbon</div>
        <p style="font-size:12.5px;color:#475569;margin-top:12px;line-height:1.55;">
          Comprehensive capital university encompassing 18 schools, including the world-famous Instituto Superior Técnico (IST) and ISEG School of Economics &amp; Management.
        </p>
        <div style="margin-top:16px;padding-top:12px;border-top:1px solid #f1f5f9;display:flex;flex-direction:column;gap:6px;font-size:12px;">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span style="color:#64748b;">Admissions:</span>
            <span style="font-weight:700;color:#123a70;">Direct School Application</span>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span style="color:#64748b;">Language Proof:</span>
            <span style="font-weight:700;color:#334155;">B2 English / Specific</span>
          </div>
        </div>
      </div>
      <div style="margin-top:20px;padding-top:14px;border-top:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
        <a href="https://www.ulisboa.pt" target="_blank" rel="noreferrer" style="font-size:12px;font-weight:700;color:#64748b;text-decoration:none;" onmouseover="this.style.color='#123a70'" onmouseout="this.style.color='#64748b'">
          Official Portal ↗
        </a>
        <a href="/study/portugal#lisboa" class="janan-card-apply-btn">
          <span>View Guide</span> →
        </a>
      </div>
    </div>

    <!-- Card 3: University of Coimbra -->
    <div class="janan-uni-card">
      <div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:12px;">
          <span style="font-size:11px;font-weight:700;background:rgba(16,185,129,0.1);color:#065f46;border-radius:6px;padding:3px 8px;">Coimbra</span>
          <span style="font-size:11px;font-weight:700;background:#faf5ff;color:#7e22ce;border-radius:6px;padding:3px 8px;">UNESCO Heritage</span>
        </div>
        <h3 style="font-size:17px;font-weight:800;color:#123a70;margin:0;line-height:1.3;">University of Coimbra</h3>
        <div style="font-size:12px;font-weight:600;color:#94a3b8;margin-top:2px;">Universidade de Coimbra (UC) • Coimbra</div>
        <p style="font-size:12.5px;color:#475569;margin-top:12px;line-height:1.55;">
          Established in 1290, one of the oldest continuously operating universities in the world. Renowned for Law, Engineering, Sciences, and a vibrant student city culture.
        </p>
        <div style="margin-top:16px;padding-top:12px;border-top:1px solid #f1f5f9;display:flex;flex-direction:column;gap:6px;font-size:12px;">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span style="color:#64748b;">Admissions:</span>
            <span style="font-weight:700;color:#123a70;">Inforestudante Online Portal</span>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span style="color:#64748b;">Language Proof:</span>
            <span style="font-weight:700;color:#334155;">English / Portuguese Certs</span>
          </div>
        </div>
      </div>
      <div style="margin-top:20px;padding-top:14px;border-top:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
        <a href="https://www.uc.pt" target="_blank" rel="noreferrer" style="font-size:12px;font-weight:700;color:#64748b;text-decoration:none;" onmouseover="this.style.color='#123a70'" onmouseout="this.style.color='#64748b'">
          Official Portal ↗
        </a>
        <a href="/study/portugal#coimbra" class="janan-card-apply-btn">
          <span>View Guide</span> →
        </a>
      </div>
    </div>
  </div>

  <div style="margin-top:36px;text-align:center;">
    <a href="/study/portugal" class="janan-sec-btn">
      <span>View All</span>
      <span>→</span>
    </a>
  </div>
</section>
`;

// Find where the Consultation box ends
const consultationAnchor = 'Whatsapp Group</a></div></div>';
const anchorIdx = html.indexOf(consultationAnchor);

if (anchorIdx === -1) {
  console.error('Could not find consultationAnchor in site-live/index.html');
  process.exit(1);
}

const beforeSections = html.substring(0, anchorIdx + consultationAnchor.length);
const footerIdx = html.indexOf('</div></main>');

if (footerIdx === -1) {
  console.error('Could not find </div></main> in site-live/index.html');
  process.exit(1);
}

const afterSections = html.substring(footerIdx);

const cleanHtml = beforeSections + '\n' + cleanSections.trim() + '\n' + afterSections;
fs.writeFileSync(indexPath, cleanHtml, 'utf8');

console.log('Cleaned and replaced index.html with single perfect section block!');
