const BOUTIQUE_LOGOS = [
  "https://tse3.mm.bing.net/th/id/OIP.ZnRU3yxa6Dz3WR8kBReCBgHaHg?rs=1&pid=ImgDetMain&o=7&rm=3",
  "https://tse3.mm.bing.net/th/id/OIP.jPWbAQXogmtehspfMKsfRgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
  "https://tse2.mm.bing.net/th/id/OIP.7BgLIdErQgKaIoSlJQj_EQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
  "https://tse1.mm.bing.net/th/id/OIP._7AE6gDlOr570kestuiBZgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
  "https://tse3.mm.bing.net/th/id/OIP.5mYhgA_jfEfvF9-cD1YXCwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
];

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function hashText(value) {
  const text = normalizeText(value);
  if (!text) return 0;

  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }
  return hash;
}

export function getBoutiqueLogo(boutique, fallbackIndex = 0) {
  const raw = boutique?.raw || boutique || {};
  const candidates = [
    raw?.idboutique,
    raw?.nomboutique,
    raw?.name,
    raw?.shop_name,
    raw?.idvendeur,
    boutique?.id,
    boutique?.name,
    boutique?.vendorId,
  ];

  const seed = candidates.find((value) => normalizeText(value)) || fallbackIndex;
  const index = Math.abs(hashText(seed) || Number(fallbackIndex) || 0) % BOUTIQUE_LOGOS.length;
  return BOUTIQUE_LOGOS[index];
}

export function getBoutiqueAccent(boutique) {
  const logo = getBoutiqueLogo(boutique);
  return {
    logo,
    label: boutique?.name || boutique?.nomboutique || boutique?.shop_name || "Boutique",
  };
}
