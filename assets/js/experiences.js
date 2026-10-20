// 체험 카드 데이터: 새 체험을 추가하려면 해당 섹션의 items 배열에 항목만 추가하면 됩니다.
// link가 없는 항목은 "준비 중" 카드로 표시되고, done: true 항목은 "완료", hold: true 항목은 "보류" 뱃지가 붙습니다.
const SECTIONS = [
  {
    title: "Switch to Galaxy",
    items: [
      {
        id: "exp4",
        title: "Smart Switch",
        description: "iOS·Galaxy 이전 화면 비교",
        link: "experiences/exp4.html",
      },
      {
        id: "quickshare",
        title: "Quick Share",
        description: "Send photos between Galaxy and iOS",
        link: "experiences/exp4.html?s=qs",
      },
    ],
  },
  {
    title: "Camera",
    items: [
      {
        id: "exp1",
        title: "My FanCam",
        done: true,
        description: "원하는 인물만 정사각 팬캠으로",
        link: "experiences/exp1.html",
      },
      {
        id: "exp2",
        title: "Palm Selfie",
        done: true,
        description: "셔터로 전·후면 전환",
        link: "experiences/exp2.html",
      },
      {
        id: "exp6",
        title: "Super Steady",
        hold: true,
        description: "흔들림 보정 영상 비교",
        link: "experiences/exp6.html",
      },
    ],
  },
  {
    title: "Display",
    items: [
      {
        id: "exp3",
        title: "Privacy Display",
        done: true,
        description: "기울이면 화면이 어두워져요",
        link: "experiences/exp3.html",
      },
    ],
  },
  {
    title: "Wearable",
    items: [
      {
        id: "exp5",
        title: "Try-on",
        description: "링·워치 AR 착용",
        link: "experiences/exp5.html",
      },
      {
        id: "glassview",
        title: "Glass View",
        description: "준비 중",
      },
    ],
  },
];

function renderCard(exp) {
  const inner = `
        <h2>${exp.title}${exp.done ? '<span class="badge">완료</span>' : ""}${exp.hold ? '<span class="badge badge-hold">보류</span>' : ""}</h2>
        <p>${exp.description}</p>
      `;
  return exp.link
    ? `<a class="card" href="${exp.link}" data-id="${exp.id}">${inner}</a>`
    : `<div class="card disabled" data-id="${exp.id}">${inner}</div>`;
}

function renderCards() {
  const grid = document.getElementById("card-grid");
  if (!grid) return;

  grid.innerHTML = SECTIONS.map(
    (section) => `
      <section class="card-section">
        <h3 class="section-title">${section.title}</h3>
        ${section.items.map(renderCard).join("")}
      </section>
    `
  ).join("");
}

document.addEventListener("DOMContentLoaded", renderCards);
