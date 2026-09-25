import vm from 'vm';

const P_WA = "M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.174.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-12.416c-5.523 0-10 4.477-10 10 0 1.77.46 3.435 1.266 4.887l-1.344 4.912 5.034-1.321c1.406.764 3.013 1.201 4.723 1.202 5.522 0 10-4.477 10-10 0-5.523-4.478-10-9.679-9.679z";
const P_MAIL = "M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z";
const P_FB = "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z";
const P_IG = "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z";
const P_TT = "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z";
const P_LI = "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z";

function generateQE() {
  const iconLink = (href, label, pathD, isPill) => {
    const cls = isPill
      ? "inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white backdrop-blur-xs border border-white/15 shadow-sm hover:bg-white/20 hover:border-white/30 hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
      : "inline-flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2 text-xs font-semibold text-white/90 border border-white/15 hover:bg-white/20 hover:border-white/30 hover:text-white hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap shadow-2xs";
    const svgCls = isPill ? "h-4 w-4 shrink-0 fill-current" : "h-3.5 w-3.5 shrink-0 fill-current";
    return `X.jsxs("a",{href:${href},target:"_blank",rel:"noreferrer",className:"${cls}",children:[X.jsx("svg",{className:"${svgCls}",viewBox:"0 0 24 24",children:X.jsx("path",{d:"${pathD}"})}),X.jsx("span",{children:"${label}"})]})`;
  };

  const mailLink = `X.jsxs("a",{href:"mailto:jananconsultants.services@gmail.com",className:"inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white backdrop-blur-xs border border-white/15 shadow-sm hover:bg-white/20 hover:border-white/30 hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap",children:[X.jsx("svg",{className:"h-4 w-4 shrink-0 fill-current",viewBox:"0 0 24 24",children:X.jsx("path",{d:"${P_MAIL}"})}),X.jsx("span",{children:"jananconsultants.services@gmail.com"})]})`;

  const waTop = iconLink(`jE("Hi Janan Consultancy, I have a question.")`, "WhatsApp +92 370 017 1997", P_WA, true);

  const subLinks = [
    iconLink('"https://whatsapp.com/channel/0029Vb7XHR3IHphDS7o4ns2R"', "WhatsApp Channel", P_WA, false),
    iconLink('"https://chat.whatsapp.com/JcYk4lt36HCDDxKRh45TqE"', "WhatsApp Group", P_WA, false),
    iconLink('"https://www.facebook.com/share/18Z3uypvtM/"', "Facebook", P_FB, false),
    iconLink('"https://www.facebook.com/share/1BapuxdF7Y/"', "Facebook (50k)", P_FB, false),
    iconLink('"https://www.instagram.com/janan_khanx?stkn=MTY5bzkwOGV5czN1cg=="', "Instagram", P_IG, false),
    iconLink('"https://www.tiktok.com/@jananconsultancy"', "TikTok", P_TT, false),
    iconLink('"https://www.linkedin.com/in/engr-janan-813241273"', "LinkedIn", P_LI, false)
  ].join(',');

  return `function qE(){return X.jsxs("footer",{className:"mt-20 border-t border-[#123a70]/10 bg-[#123a70] px-4 py-12 text-center text-white",children:[X.jsxs("div",{className:"mx-auto max-w-4xl",children:[X.jsx("p",{className:"text-xs font-semibold uppercase tracking-[0.35em] text-white/70",children:"Together, we rise — for a brighter future."}),X.jsx("p",{className:"mt-2 text-xl font-bold tracking-tight",children:"Your trust & satisfaction, our aim."}),X.jsxs("div",{className:"mt-4 flex items-center justify-center gap-2",children:[X.jsx("span",{className:"h-px w-8 bg-white/20"}),X.jsx("p",{className:"text-sm font-semibold text-white/90",children:"Janan Consultancy"}),X.jsx("span",{className:"h-px w-8 bg-white/20"})]}),X.jsxs("div",{className:"mt-8 flex flex-wrap items-center justify-center gap-3",children:[${waTop},${mailLink}]}),X.jsxs("div",{className:"mt-6 flex flex-wrap items-center justify-center gap-2.5",children:[${subLinks}]})]})]})}`;
}

const code = generateQE();
try {
  new vm.Script('let X, jE;\n' + code);
  console.log('SUCCESS! Code is 100% valid JavaScript syntax!');
} catch (e) {
  console.error('FAILED:', e.message);
}
