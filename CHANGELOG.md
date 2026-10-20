# Changelog

Rules: in-app copy in English, "iOS" spelling. One entry per change, for later merge with other workers' files.

## 2026-10-20 — Smart Switch

1. **Hidden scenario switch** (`assets/css/smartswitch.css`, `experiences/exp4.html`)
   - The bottom-right "Galaxy to Galaxy" / "iOS to Galaxy" button is now invisible (`opacity: 0`, 56x40px hit area).
   - 5 consecutive taps (each within 1.5s of the previous) switch scenario (iOS to Galaxy <-> Galaxy to Galaxy). Still only active after the final screen of a scenario.
2. **First-screen images replaced** (asset update by owner): `assets/img/smartswitch/ios/1.png`, `assets/img/smartswitch/galaxy/1.png`.
3. **Copy / naming** (`experiences/exp4.html`)
   - Intro hint translated to English: "Tap the screen to step through the iOS and Galaxy Smart Switch screens."
   - Scenario label "iPhone to Galaxy" -> "iOS to Galaxy"; alt text "iPhone 화면" -> "iOS screen".

## 2026-10-20 — Smart Switch (labels & copy)

4. **Pill labels** (`experiences/exp4.html`, `assets/css/smartswitch.css`)
   - iOS to Galaxy scenario: top pill "iOS" -> "Your Phone : iPhone"; bottom pill "Galaxy" -> "New Phone : Galaxy S00" (static HTML, intro pill, `SCENARIOS.i2g`).
   - Removed `text-transform: uppercase` from `.ss-pill` (was rendering "iOS" as "IOS"); letter-spacing 0.06em -> 0.02em. Applies to all scenarios (G2G "Sender"/"Receiver", Quick Share "Galaxy"/"iOS" now display as written). G2G / Quick Share labels not yet changed.
5. **English copy** (`experiences/exp4.html`)
   - "시작하기" -> "Get started"; "← 홈으로 돌아가기" -> "← Back to home"; aria-labels "닫기" -> "Close", "두 화면 비율 드래그로 조절" -> "Drag to resize the two screens".
   - alt "iOS 화면 1" / "Galaxy 화면 1" -> "iOS screen 1" / "Galaxy screen 1".
   - Quick Share intro hint -> "Tap the screen to step through Quick Share, sending a photo from Galaxy to iOS."

## 2026-10-20 — Smart Switch (device name line)

6. **Pill + device name split** (`experiences/exp4.html`, `assets/css/smartswitch.css`)
   - iOS to Galaxy: pill now "Your Phone" / "New Phone"; device name on its own line below the pill ("iPhone" / "Galaxy S00") via new `.ss-device-name` (plain text, grey when resting, dark when active, hidden in intro). New `name` field in `SCENARIOS.i2g` top/bottom; empty for G2G and Quick Share (line hidden via `:empty`).

## 2026-10-20 — Smart Switch (G2G labels, pill size)

7. **Galaxy to Galaxy labels** (`experiences/exp4.html`): "Sender" -> pill "Your Phone" + name "Galaxy S24"; "Receiver" -> pill "New Phone" + name "Galaxy S00". G2G receiver images updated by owner (asset update, no code change).
8. **Pill size x0.7** (`assets/css/smartswitch.css`): `.ss-pill` font-size 0.58rem -> 0.41rem, padding 3px 10px -> 2px 7px (all scenarios).

## 2026-10-20 — Quick Share (new g2i / i2g flows)

9. **Quick Share rebuilt from new assets** (`experiences/exp4.html`; assets in `assets/img/QuickShare/G2I`, `assets/img/QuickShare/i2G`)
   - Replaced scenario `qs` with `qsg2i` (Galaxy sends, top Galaxy / bottom iOS) and `qsi2g` (iOS sends, top iOS / bottom Galaxy). `?s=qs` entry starts at g2i. Old `qs-galaxy` / `qs-ios` folders are now unused (kept).
   - After the last screen, the invisible bottom-right button (5 consecutive taps) switches g2i <-> i2g, same as Smart Switch.
   - Engine changes: image paths support per-side `prefix` ("Galaxy 1.png", "iOS 3.png"); hotspots are now `SC.hotspots[step] = { side, x, y, d }` with a second hotspot element `#ssHotspotB` on the bottom screen (was top-only); `SC.startActive` (i2g starts with the bottom Galaxy phone active); `SC.sendStep` (step at which the photo flies out of the sender; was "first time bottom acts").
   - g2i steps: Galaxy 1-2, iOS 3-7 (hotspots: Galaxy 2 iPhone icon, iOS 4 "Accept"). i2g steps: Galaxy 1-3, then 4 iOS device tap + Galaxy "wants to share", Galaxy 5-7 (hotspots: status bar, Quick Share tile, iOS device icon, Galaxy "Accept", "Open"). `i2G/iOS 4.png` is identical to `iOS 1.png` and unused. Pills stay "Galaxy" / "iOS".
   - Follow-up: `updateHotspot()` now brings the phone that holds the tap target into focus (zoom in) 800ms after the previous screen settles — fixes i2g step 3, where the iOS device-tap hotspot was on the zoomed-out top phone.
   - Asset update (owner): `assets/img/QuickShare/i2G/iOS 1.png` and `iOS 4.png` replaced (device label "Hyowon" -> "Galaxy S00"; same size 271x587, icon position unchanged, so the step-3 hotspot still lines up; no code change). Note: an empty folder `assets/img/QuickShare/smartswitch/i2G` exists (only .DS_Store), unused.
   - Update (owner assets: `G2I/Galaxy 1-2`, `i2G/iOS 1/4`): the share list now has 2 devices, then a 3rd appears; the hotspot targets that 3rd device. g2i: `Galaxy 2` 3rd device "iPhone" (152,215). i2g: step 4 is now two taps — iOS shows `iOS 4` with the 3rd device "Galaxy S00" (hotspot at 168,142, `whileQueued`), tapping it sends the photo and Galaxy shows "wants to share" (Accept hotspot). `SC.top.nums` for i2g = [1, 4]; hotspot step 3 removed. Engine: `SC.hotspots[step]` may be an array of entries picked by `when` (= side that acted last); `whileQueued` allows a hotspot while the step still has a pending action.

## 2026-10-20 — Merged from teammate folder "Trygalaxydemocprototype 3" (home design + Smart Glasses only)

Base compared against folder "Trygalaxydemocprototype 2" (3-way merge so today's work was kept). Figma reference: TG2 Ideation, node 523-55016 (frames 522:54320 home, 522:54253 Explore Features).

10. **Home** (`index.html`; coded layered home kept as the base, tutorial slides 1-2 and ring hints unchanged)
    - Slide 4 title "Only on Galaxy" -> "Explore Features"; card labels "Try Wearables" -> "Watch & Ring", "Try Smart Glasses" -> "Smart Glasses" (Figma typo "Super Steday" kept out; code uses "Super Steady").
    - Card art per Figma: the 4 phone cards use a blue-to-green gradient phone mock (`linear-gradient(#1ba2fd, #dbffc8 45.192%)` inside `card-phone-frame.png`) instead of screenshots; Watch & Ring shows watch + ring (`card-watch.png`, `card-ring.png`, downloaded from Figma); row 3 no longer offset (`.crow-last` margin-top 32px -> 0).
    - Home (slide 3): dock Camera icon links to `experiences/camera.html`.
11. **Camera hub** (new `experiences/camera.html`, copied from teammate): lists My FanCam / Palm Selfie / Super Steady; "Start over" returns to home.
12. **Smart Glasses** (`experiences/glassview.html` merged; new `experiences/glass-photo.html`, `assets/img/glassview/glasses-frame.png`, `photo-reference.png` copied from teammate)
    - "Album / Playback" card -> "Photo / Capture", opens `glass-photo.html`; Meeting card disabled (`.glass-card:disabled`); Glass View copy translated to English (intro h1 "Smart Glasses", hint, buttons, notes/summary text, status messages).
    - Not taken: teammate's English copy for exp1-exp6 / index-list / experiences.js, their 2-image home (`home-1/2.webp`, tutorials removed), `lang="en"`. Remaining Korean copy in Glass View: the See & Ask (Baking) screen and object descriptions (my work, not theirs).

## 2026-10-20 — Smart Glasses / home cleanups

13. **See & Ask removed** (`experiences/glassview.html`): deleted the `screen-baking` screen, its CSS (`.glass-baking`, `.bk-*`) and the whole See & Ask script (80-object list, camera, MediaPipe detection, voice). The Baking card ("See & Ask") stays as a placeholder with no action, as in the teammate's version.
14. **White highlight rings removed on home** (`index.html`): removed the `.ring` highlight around Smart Switch / Quick Share on slides 1-3 (6 elements); slide 2 hint "Tap icons / with white line" -> "Tap icons". Still open: on slide 2 the two icons are drawn by the baked-in `tap-hand.png` highlight image, which still has a white rim (see next entry once fixed).
    - Fixed: slide 2 no longer uses the `tap-hand` image (removed from markup; file kept). The Smart Switch / Quick Share icons now sit above the dim layer (`.slide[data-step="2"] .approw-in .app:nth-child(-n+2) { z-index: 6 }`), so no white rim; the label-hiding rule for slide 2 was removed since labels are real again.
15. **Camera hub link fix** (`index.html`): the home Camera icon -> `camera.html` link existed but taps were intercepted by the hidden slide 4's dock (`.stack-bottom > * { pointer-events: auto }` overrides the slide's `pointer-events: none`). Added `.slide:not(.is-active) .stack-bottom > * { pointer-events: none; }`. Link is on the home slide (3) only, as in the teammate's version.
16. **"Tap icons" guide skipped** (`index.html`): first visit now goes slide 1 (Swipe Homescreen) -> slide 3 (home) by timer / tap / swipe / arrow key. Slide 2 markup is kept but unreachable (slide count unchanged so step numbers stay valid).

## 2026-10-20 — Unified intro layout

17. **Intro layout unified** (title, copy, "Try now", "Back to home")
    - Single-experience pages `experiences/exp1-6.html`: intro button text -> "Try now" (was "촬영 시작하기" / "시작하기" / "Get started"); back link -> "← Back to home". Copy text itself unchanged (still Korean on exp1, 2, 3, 5, 6).
    - Branching pages: new `assets/css/intro.css` (`.intro-options`, `.intro-option`, ...). `experiences/camera.html` rebuilt: "Camera" + "Choose a camera feature to try." + 3 options (My FanCam / Palm Selfie / Super Steady), each with its own "Try now"; "Back to home".
    - `experiences/glassview.html`: merged the 2-step intro (intro -> select) into one page: "Smart Glasses" + "Explore the useful features of Glass." + 4 image cards each with a "Try now" pill (Baking and Meeting are disabled/greyed) + "Back to home". Removed `#screen-intro`, `startBtn`, `backBtn`; initial screen is now `screen-select`. "Try another scenario" still returns to this page.
18. **Privacy Display uses the site home screen** (`experiences/exp3.html`, new `assets/css/homescreen.css`)
    - Replaced the old Figma-built home (`.wallpaper` + `.home-stage`, images from `assets/img/privacy/`) with the same home as `index.html` slide 3 (wallpaper, weather / Keep in mind / health widgets, Google bar, apps, dock, nav) using `assets/img/homescreen/`. App icons are plain (no links).
    - New `homescreen.css`: home styles copied from `index.html`, all classes prefixed `hs-` / scoped under `.hs` so they don't clash with `privacydisplay.css` (which still has the old, now-unused home CSS; left as is). Tilt overlay, close button, tilt readout and permission button unchanged.
19. **Tighter intro spacing** (`assets/css/intro.css`, `experiences/exp1-6.html` now link `intro.css`, `experiences/glassview.html`): title -> copy 8px, copy -> Try now 16px, Try now -> Back to home 8px via `#screen-intro` rules; Glass View portrait title -> copy pulled to 8px.
20. **All in-app copy in English** (`experiences/exp1,2,3,5,6.html`, `glassview.html`): intro copy, status / error messages, buttons, labels and `aria-label`s translated (e.g. "Analyzing your video", "Show your palm to the camera", "Allow tilt sensor", "Tracking your wrist", "Tap the screen", "↻ Portrait / ↻ Landscape"). Not translated: Glass View Meeting speech phrase (`PHRASE`, Korean voice recognition; Meeting card is disabled), code comments, unused `index-list.html` / `assets/js/experiences.js`, text baked into images.
21. **Camera hub skips the experience's own intro** (`experiences/camera.html`, `exp1.html`, `exp2.html`, `exp6.html`): hub links use `?autostart=1`; each page clicks its own Try now on load, then removes the query. Entering from the home Explore Features cards still shows the intro.
22. **Home slide 4 / Glass View layout** : Watch & Ring card art shifted 7px right so the watch + ring group is centered (`index.html`); Glass View portrait cards now one column (4 stacked) instead of 2x2 (`experiences/glassview.html`); landscape stays 4 in a row.
23. **Card-based intros everywhere** (`assets/css/intro.css`, `experiences/exp1-6.html`, `camera.html`, `glassview.html`): same layout as Smart Glasses — title, copy, card(s), "Back to home"; "Try now" pill at the bottom-right of the card (Glass View's pill moved from bottom-left to bottom-right). Single-experience pages (exp1-6): one gray card (max ~320px) replaces the black Try now button; the card itself is `#startBtn`. Camera hub: 3 stacked gray cards with name + one-line description top-left. Gray box (`#9a9a9a`) is used wherever no image exists. Old `.intro-option` styles unused.
24. **Single-content intro + Back to home** (`assets/css/intro.css`, `experiences/exp1-6.html`, `experiences/glassview.html`): on single-experience pages the Try now button moved out of the gray card to a larger, centered black button under it (`#startBtn`, 16px text, 14px/40px padding); the card is now just an image placeholder. "Back to home" is smaller (12px, 4px/12px padding) and fainter (`#a3a3a3`, border `#ececec`) on all intro pages incl. Glass View.
25. **Back to home slightly larger** (`assets/css/intro.css`, `experiences/glassview.html`): 12px / 4px 12px -> 13px / 6px 14px (still faint grey).
26. **Home slide 4 centering + title** (`index.html`): measured the visible card art — Watch & Ring was +6.75px right of center because of the 7px shift added in item 22 (the original position was already centered), Smart Glasses was +3.5px right. Reverted the 7px shift (Watch & Ring wrapper `left:0`) and moved the glasses art left (`left:9px` -> `5.5px`). Title "Explore Features" -> "Explore Galaxy". Item 22's "shifted 7px right" is superseded by this.
27. **Intro side padding unified** (`assets/css/intro.css`): `.experience-page` side padding 24px -> 0, so cards on Camera and the single-experience pages sit 16px from the edges, same as Smart Glasses.
28. **Glass View Travel card disabled** (`experiences/glassview.html`): Travel is a placeholder (no experience yet), so its Try now is greyed out like Baking and Meeting. Photo stays enabled (opens `glass-photo.html`).
29. **Back to the Camera hub** (`experiences/exp1.html`, `exp2.html`, `exp6.html`): when an experience was opened from the Camera hub (`?autostart=1`), every "back to intro" path (`showScreen("screen-intro")`: close buttons, result close, error return, start over) now goes to `camera.html`. Opened from the home cards (no query) it still returns to that page's own intro.
