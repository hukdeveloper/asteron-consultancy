(function () {
  const form = document.getElementById("insurance-ticket");
  if (!form) return;
  const fields = [
    ["name", "Name"],
    ["fatherName", "Father name"],
    ["cnic", "CNIC"],
    ["passport", "Passport"],
    ["dob", "Date of birth"],
    ["uniName", "Italian Uni name"],
    ["uniCity", "Uni city name"],
    ["email", "My Email"],
    ["address", "Home Address"],
    ["mobile", "Mobile"],
    ["travelDate", "Effective travel date"],
    ["nextOfKin", "Next of kin — Name and Relation"],
    ["insuranceType", "Type of Insurance needed"],
  ];
  const sendBtn = document.getElementById("insurance-send");
  const confirmEl = document.getElementById("insurance-confirm");

  const params = new URLSearchParams(window.location.search);
  const presetType = params.get("type");
  if (presetType) {
    const typeEl = document.getElementById("insuranceType");
    if (typeEl) typeEl.value = presetType;
  }

  function checkValidity() {
    if (!sendBtn) return;
    const allFilled = fields.every(([id]) => {
      const el = document.getElementById(id);
      return el && el.value.trim().length > 0;
    });

    if (allFilled) {
      sendBtn.disabled = false;
      sendBtn.className = "rounded-full bg-[#123a70] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0e2c56] cursor-pointer transition shadow-sm";
    } else {
      sendBtn.disabled = true;
      sendBtn.className = "rounded-full bg-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-500 cursor-not-allowed opacity-60 transition";
    }
  }

  fields.forEach(([id]) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", checkValidity);
      el.addEventListener("change", checkValidity);
    }
  });

  // Initial check
  checkValidity();

  sendBtn.addEventListener("click", () => {
    if (sendBtn.disabled) return;
    const lines = ["Insurance request — please arrange my visa insurance:", ""];
    fields.forEach(([id, label]) => {
      const el = document.getElementById(id);
      const value = el && el.value ? el.value.trim() : "(not provided)";
      lines.push(`${label}: ${value}`);
    });
    const message = lines.join("\n");
    window.open(`https://wa.me/923700171997?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    if (confirmEl) confirmEl.classList.remove("hidden");
  });
})();
