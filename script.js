/* =====================================================
   BABY WENDY KO 💗
   ===================================================== */

   const pages = document.querySelectorAll(".page");

   const pageNumber = document.getElementById("pageNumber");
   
   const heartContainer =
       document.getElementById("heartContainer");
   
   const sparkleContainer =
       document.getElementById("sparkleContainer");
   
   const loveMusic =
       document.getElementById("loveMusic");
   
   const musicStatus =
       document.getElementById("musicStatus");
   
   const finalButton =
       document.getElementById("finalButton");
   
   const shockOverlay =
       document.getElementById("shockOverlay");
   
   const sweetOverlay =
       document.getElementById("sweetOverlay");
   
   const closeSweet =
       document.getElementById("closeSweet");
   
   const restartBtn =
       document.getElementById("restartBtn");
   
   const heartButton =
       document.getElementById("heartButton");
   
   const runawayBtn =
       document.getElementById("runawayBtn");
   
   
   let currentPage = 0;
   
   let musicStarted = false;
   
   let shockRunning = false;
   
   
   /* =====================================================
      MUSIC
   ===================================================== */
   
   function startMusic() {
   
       if (musicStarted) return;
   
       loveMusic.volume = 0;
   
       const playPromise = loveMusic.play();
   
       if (playPromise !== undefined) {
   
           playPromise.then(() => {
   
               musicStarted = true;
   
               let volume = 0;
   
               const fadeIn = setInterval(() => {
   
                   volume += 0.02;
   
                   if (volume >= 0.28) {
   
                       volume = 0.28;
   
                       clearInterval(fadeIn);
                   }
   
                   loveMusic.volume = volume;
   
               }, 80);
   
               musicStatus.classList.add("playing");
   
               document.removeEventListener(
                   "pointerdown",
                   startMusic
               );
   
               document.removeEventListener(
                   "keydown",
                   startMusic
               );
   
           }).catch(() => {
   
               console.log(
                   "Music waiting for user interaction."
               );
   
           });
   
       }
   }
   
   
   document.addEventListener(
       "pointerdown",
       startMusic
   );
   
   document.addEventListener(
       "keydown",
       startMusic
   );
   
   
   /* =====================================================
      PAGE CHANGE
   ===================================================== */
   
   function showPage(index) {
   
       if (index < 0) {
           index = 0;
       }
   
       if (index >= pages.length) {
           index = pages.length - 1;
       }
   
       pages.forEach((page, i) => {
   
           page.classList.toggle(
               "active",
               i === index
           );
   
       });
   
       currentPage = index;
   
       pageNumber.textContent =
           currentPage + 1;
   
       createHeartBurst(
           window.innerWidth / 2,
           window.innerHeight / 2,
           8
       );
   }
   
   
   /* =====================================================
      NEXT BUTTONS
   ===================================================== */
   
   document.querySelectorAll(".next-btn")
       .forEach(button => {
   
           button.addEventListener("click", event => {
   
               event.stopPropagation();
   
               createHeartBurst(
                   event.clientX || window.innerWidth / 2,
                   event.clientY || window.innerHeight / 2,
                   12
               );
   
               showPage(currentPage + 1);
           });
   
       });
   
   
   /* =====================================================
      PAGE 4 CHOICES
   ===================================================== */
   
   document.querySelectorAll(".wrong-choice")
       .forEach(button => {
   
           button.addEventListener("click", event => {
   
               event.stopPropagation();
   
               button.animate(
                   [
                       {
                           transform: "translateX(0)"
                       },
                       {
                           transform: "translateX(-8px)"
                       },
                       {
                           transform: "translateX(8px)"
                       },
                       {
                           transform: "translateX(0)"
                       }
                   ],
                   {
                       duration: 300
                   }
               );
   
               createTextPop(
                   event.clientX,
                   event.clientY,
                   "hindi 😭"
               );
   
           });
   
       });
   
   
   document.querySelector(".correct-choice")
       .addEventListener("click", event => {
   
           event.stopPropagation();
   
           createHeartBurst(
               event.clientX,
               event.clientY,
               20
           );
   
           showPage(4);
   
       });
   
   
   /* =====================================================
      HEART BUTTON
   ===================================================== */
   
   if (heartButton) {
   
       heartButton.addEventListener(
           "click",
           event => {
   
               event.stopPropagation();
   
               createHeartBurst(
                   event.clientX,
                   event.clientY,
                   45
               );
   
               createFloatingMessage(
                   "HOY 😭"
               );
   
               createFloatingMessage(
                   "ANG DAMI"
               );
   
               createFloatingMessage(
                   "💗"
               );
   
               setTimeout(() => {
   
                   showPage(currentPage + 1);
   
               }, 900);
   
           }
       );
   
   }
   
   
   /* =====================================================
      RUNAWAY BUTTON
   ===================================================== */
   
   if (runawayBtn) {
   
       let moved = false;
   
       runawayBtn.addEventListener(
           "pointerenter",
           moveRunaway
       );
   
       runawayBtn.addEventListener(
           "touchstart",
           moveRunaway,
           {
               passive: true
           }
       );
   
       function moveRunaway(event) {
   
           if (!moved) {
   
               moved = true;
   
               const x =
                   (Math.random() * 140) - 70;
   
               const y =
                   (Math.random() * 100) - 50;
   
               runawayBtn.style.transform =
                   `translate(${x}px, ${y}px)`;
   
               createTextPop(
                   event.clientX || window.innerWidth / 2,
                   event.clientY || window.innerHeight / 2,
                   "AY WAG 😭"
               );
   
           } else {
   
               showPage(currentPage + 1);
   
           }
   
       }
   
   }
   
   
   /* =====================================================
      FINAL BUTTON
   ===================================================== */
   
   if (finalButton) {
   
       finalButton.addEventListener(
           "click",
           event => {
   
               event.stopPropagation();
   
               if (shockRunning) return;
   
               shockRunning = true;
   
               startShock();
   
           }
       );
   
   }
   
   
   /* =====================================================
      SHOCK
   ===================================================== */
   
   function startShock() {
   
       shockOverlay.classList.add("active");
   
       document.body.classList.add("shaking");
   
       navigator.vibrate?.([
           80,
           40,
           120,
           40,
           180
       ]);
   
       createHeartBurst(
           window.innerWidth / 2,
           window.innerHeight / 2,
           55
       );
   
       for (let i = 0; i < 20; i++) {
   
           setTimeout(() => {
   
               createFloatingMessage(
                   randomShockWord()
               );
   
           }, i * 45);
   
       }
   
       setTimeout(() => {
   
           document.body.classList.remove(
               "shaking"
           );
   
       }, 750);
   
   
       setTimeout(() => {
   
           shockOverlay.classList.remove(
               "active"
           );
   
           sweetOverlay.classList.add(
               "active"
           );
   
           createHeartBurst(
               window.innerWidth / 2,
               window.innerHeight / 2,
               35
           );
   
       }, 1800);
   
   }
   
   
   function randomShockWord() {
   
       const words = [
           "HOY 😭",
           "HAHAHA",
           "GULAT KA BA BOY",
           "SORRY 😭",
           "AYAN",
           "WENDY BAHO POWIT😭",
           "BABY 💗",
           "HAHAHA 😭",
           "HOY HOY HOY",
           "BAHO MO",
           "😂",
           "💗"
       ];
   
       return words[
           Math.floor(
               Math.random() * words.length
           )
       ];
   
   }
   
   
   /* =====================================================
      CLOSE SWEET
   ===================================================== */
   
   closeSweet.addEventListener(
       "click",
       event => {
   
           event.stopPropagation();
   
           sweetOverlay.classList.remove(
               "active"
           );
   
           shockRunning = false;
   
           createHeartBurst(
               window.innerWidth / 2,
               window.innerHeight / 2,
               25
           );
   
       }
   );
   
   
   /* =====================================================
      RESTART
   ===================================================== */
   
   restartBtn.addEventListener(
       "click",
       event => {
   
           event.stopPropagation();
   
           showPage(0);
   
           createHeartBurst(
               window.innerWidth / 2,
               window.innerHeight / 2,
               25
           );
   
       }
   );
   
   
   /* =====================================================
      CLICK ANYWHERE
   ===================================================== */
   
   document.addEventListener(
       "click",
       event => {
   
           startMusic();
   
           createSparkle(
               event.clientX,
               event.clientY
           );
   
       }
   );
   
   
   /* =====================================================
      SWIPE
   ===================================================== */
   
   let touchStartX = 0;
   let touchStartY = 0;
   
   document.addEventListener(
       "touchstart",
       event => {
   
           touchStartX =
               event.changedTouches[0].screenX;
   
           touchStartY =
               event.changedTouches[0].screenY;
   
       },
       {
           passive: true
       }
   );
   
   
   document.addEventListener(
       "touchend",
       event => {
   
           const endX =
               event.changedTouches[0].screenX;
   
           const endY =
               event.changedTouches[0].screenY;
   
           const diffX =
               endX - touchStartX;
   
           const diffY =
               endY - touchStartY;
   
   
           if (
               Math.abs(diffX) > 70 &&
               Math.abs(diffX) > Math.abs(diffY)
           ) {
   
               if (diffX < 0) {
   
                   showPage(currentPage + 1);
   
               } else {
   
                   showPage(currentPage - 1);
   
               }
   
           }
   
       },
       {
           passive: true
       }
   );
   
   
   /* =====================================================
      FLOATING HEART GENERATOR
   ===================================================== */
   
   const heartTypes = [
       "♡",
       "♥",
       "💗",
       "💕",
       "💖",
       "💘",
       "💝",
       "💓",
       "💞",
       "❤︎"
   ];
   
   
   function createFloatingHeart(
       forceX = null,
       forceY = null
   ) {
   
       const heart =
           document.createElement("div");
   
       heart.className =
           "floating-heart";
   
       heart.textContent =
           heartTypes[
               Math.floor(
                   Math.random() *
                   heartTypes.length
               )
           ];
   
       const size =
           Math.random() * 23 + 12;
   
       const duration =
           Math.random() * 6 + 6;
   
       const left =
           forceX !== null
               ? forceX
               : Math.random() * 100;
   
       const drift =
           (Math.random() * 180) - 90;
   
       const rotation =
           (Math.random() * 70) - 35;
   
       heart.style.left =
           left + "%";
   
       heart.style.fontSize =
           size + "px";
   
       heart.style.animationDuration =
           duration + "s";
   
       heart.style.setProperty(
           "--drift",
           drift + "px"
       );
   
       heart.style.setProperty(
           "--rotation",
           rotation + "deg"
       );
   
       if (forceY !== null) {
   
           heart.style.bottom =
               forceY + "px";
   
       }
   
       heart.style.opacity =
           Math.random() * .6 + .3;
   
       heartContainer.appendChild(
           heart
       );
   
   
       setTimeout(() => {
   
           heart.remove();
   
       }, duration * 1000 + 500);
   
   }
   
   
   /* =====================================================
      CONTINUOUS HEARTS
   ===================================================== */
   
   setInterval(() => {
   
       createFloatingHeart();
   
   }, 280);
   
   
   /* =====================================================
      HEART BURST
   ===================================================== */
   
   function createHeartBurst(
       x,
       y,
       amount = 15
   ) {
   
       for (let i = 0; i < amount; i++) {
   
           const heart =
               document.createElement("div");
   
           heart.className =
               "floating-heart";
   
           heart.textContent =
               heartTypes[
                   Math.floor(
                       Math.random() *
                       heartTypes.length
                   )
               ];
   
           heart.style.left =
               x + "px";
   
           heart.style.bottom =
               (window.innerHeight - y) + "px";
   
           heart.style.fontSize =
               (Math.random() * 22 + 13) + "px";
   
           heart.style.setProperty(
               "--drift",
               ((Math.random() * 260) - 130) + "px"
           );
   
           heart.style.setProperty(
               "--rotation",
               ((Math.random() * 180) - 90) + "deg"
           );
   
           heart.style.animationDuration =
               (Math.random() * 2.5 + 2) + "s";
   
           heartContainer.appendChild(
               heart
           );
   
           setTimeout(() => {
   
               heart.remove();
   
           }, 5000);
   
       }
   
   }
   
   
   /* =====================================================
      SPARKLES
   ===================================================== */
   
   function createSparkle(x, y) {
   
       const sparkle =
           document.createElement("div");
   
       sparkle.className =
           "sparkle";
   
       sparkle.textContent =
           Math.random() > .5
               ? "✦"
               : "✧";
   
       sparkle.style.left =
           x + "px";
   
       sparkle.style.top =
           y + "px";
   
       sparkle.style.color =
           Math.random() > .5
               ? "#ff9ec7"
               : "#ffffff";
   
       sparkleContainer.appendChild(
           sparkle
       );
   
       setTimeout(() => {
   
           sparkle.remove();
   
       }, 1200);
   
   }
   
   
   /* =====================================================
      FLOATING MESSAGE
   ===================================================== */
   
   function createFloatingMessage(
       text
   ) {
   
       const element =
           document.createElement("div");
   
       element.textContent =
           text;
   
       element.style.position =
           "fixed";
   
       element.style.left =
           (Math.random() * 80 + 10) + "%";
   
       element.style.top =
           (Math.random() * 65 + 15) + "%";
   
       element.style.zIndex =
           "10001";
   
       element.style.pointerEvents =
           "none";
   
       element.style.fontFamily =
           "'Dancing Script', cursive";
   
       element.style.fontSize =
           (Math.random() * 16 + 20) + "px";
   
       element.style.fontWeight =
           "700";
   
       element.style.color =
           "#ff9fc8";
   
       element.style.textShadow =
           "0 0 20px rgba(255,100,180,.7)";
   
       element.animate(
           [
               {
                   transform:
                       "scale(.4) rotate(-15deg)",
                   opacity: 0
               },
   
               {
                   transform:
                       "scale(1.15) rotate(5deg)",
                   opacity: 1
               },
   
               {
                   transform:
                       "translateY(-100px) scale(.9) rotate(-5deg)",
                   opacity: 0
               }
           ],
           {
               duration:
                   1500 + Math.random() * 800,
   
               easing:
                   "cubic-bezier(.2,.8,.2,1)"
           }
       );
   
       document.body.appendChild(
           element
       );
   
       setTimeout(() => {
   
           element.remove();
   
       }, 2500);
   
   }
   
   
   /* =====================================================
      RANDOM AMBIENT WORDS
   ===================================================== */
   
   setInterval(() => {
   
       const words = [
           "hehe",
           "sus",
           "ayan ka",
           "cute 😭",
           "hoy",
           "wifey 💗",
           "baby",
           "HAHAHA",
           "😚",
           "💗"
       ];
   
       createFloatingMessage(
           words[
               Math.floor(
                   Math.random() *
                   words.length
               )
           ]
       );
   
   }, 4200);
   
   
   /* =====================================================
      RANDOM BACKGROUND HEART BURSTS
   ===================================================== */
   
   setInterval(() => {
   
       if (Math.random() > .35) {
   
           createHeartBurst(
               Math.random() *
                   window.innerWidth,
   
               Math.random() *
                   window.innerHeight,
   
               4
           );
   
       }
   
   }, 2500);
   
   
   /* =====================================================
      INITIAL HEARTS
   ===================================================== */
   
   for (let i = 0; i < 25; i++) {
   
       setTimeout(() => {
   
           createFloatingHeart();
   
       }, i * 150);
   
   }
   
   
   /* =====================================================
      INITIAL PAGE
   ===================================================== */
   
   showPage(0);