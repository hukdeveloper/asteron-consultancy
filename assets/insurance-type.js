(function () {
  const buttons = Array.from(document.querySelectorAll("[data-insurance-type]"));
  const contactLink = document.getElementById("insurance-contact-link");
  const ACTIVE = ["border-[#123a70]", "bg-[#123a70]", "text-white"];
  const INACTIVE = ["border-[#123a70]/15", "bg-white", "text-[#123a70]"];

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => {
        b.classList.remove(...ACTIVE);
        b.classList.add(...INACTIVE);
      });
      btn.classList.remove(...INACTIVE);
      btn.classList.add(...ACTIVE);
      if (contactLink) {
        const type = btn.getAttribute("data-insurance-type");
        contactLink.href = `/study/italy/insurance/contact/?type=${encodeURIComponent(type)}`;
      }
    });
  });
})();
