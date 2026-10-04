document.addEventListener('DOMContentLoaded', () => {
    createFloatingBackground();

    const open = document.getElementById('openEnvelope');
    if (open) {
        open.addEventListener('click', () => {
            document.getElementById('secretContent')?.classList.remove('hidden');
            open.classList.add('hidden');
            document.getElementById('secretContent')?.scrollIntoView({ behavior: 'smooth' });
        });
    }

    const form = document.getElementById('codeForm');
    if (form) {
        const inputs = [...form.querySelectorAll('.code-inputs input')];
        inputs.forEach((input, i) => {
            input.addEventListener('input', () => {
                input.value = input.value.replace(/\D/g, '').slice(0, 1);
                if (input.value && inputs[i + 1]) inputs[i + 1].focus();
            });
            input.addEventListener('keydown', e => {
                if (e.key === 'Backspace' && !input.value && inputs[i - 1]) inputs[i - 1].focus();
            });
            input.addEventListener('paste', e => {
                e.preventDefault();
                const text = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, 6);
                text.split('').forEach((v, j) => {
                    if (inputs[j]) inputs[j].value = v;
                });
                inputs[Math.min(text.length, inputs.length - 1)]?.focus();
            });
        });

        form.addEventListener('submit', e => {
            e.preventDefault();
            const code = inputs.map(x => x.value).join('');
            const status = document.getElementById('codeStatus');
            if (code === '123456') {
                status.textContent = 'เปิดสำเร็จแล้ว 💗 กำลังพาเธอไปดูเรื่องราว...';
                status.className = 'message-status success';
                setTimeout(() => location.href = 'menu.html', 650);
            } else {
                status.textContent = 'รหัสยังไม่ถูกนะ ลองนึกถึงตัวเลขสำคัญของเราดูอีกครั้ง 💕';
                status.className = 'message-status error';
                inputs.forEach(x => x.value = '');
                inputs[0].focus();
            }
        });
    }

    const surprise = document.getElementById('surpriseBtn');
    if (surprise) {
        surprise.addEventListener('click', () => {
            document.getElementById('surpriseReveal')?.classList.remove('hidden');
            surprise.classList.add('hidden');
            createHearts();
        });
    }

    const quiz = document.getElementById('quizForm');
    if (quiz) {
        quiz.addEventListener('submit', e => {
            e.preventDefault();
            const answers = { q1: 'love', q2: 'together', q3: 'time' };
            let score = 0;
            Object.keys(answers).forEach(k => {
                if (quiz.querySelector(`input[name="${k}"]:checked`)?.value === answers[k]) score++;
            });
            const result = document.getElementById('quizResult');
            result.classList.remove('hidden');
            result.innerHTML = `<h2>คะแนนของเธอ 💕</h2><p>ได้ <b>${score}/3</b> คะแนน</p><p>${score === 3 ? 'เก่งที่สุดเลย จำเรื่องของเราได้ดีมาก 🥰' : score === 2 ? 'เกือบเต็มแล้วนะ เธอจำเรื่องของเราได้ดีมาก 💗' : 'ไม่เป็นไรนะ เพราะสิ่งสำคัญที่สุดคือสิ่งที่เรารู้สึกต่อกัน ❤️'}</p>`;
            result.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

function createFloatingBackground() {
    if (document.querySelector('.floating-bg')) return;
    const layer = document.createElement('div');
    layer.className = 'floating-bg';
    layer.setAttribute('aria-hidden', 'true');
    const symbols = ['♡', '♥', '✦', '✧', '☆', '⋆'];
    const total = window.innerWidth < 500 ? 16 : 26;
    for (let i = 0; i < total; i++) {
        const el = document.createElement('span');
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        const isHeart = symbol === '♡' || symbol === '♥';
        el.className = isHeart ? 'heart' : 'star';
        el.textContent = symbol;
        el.style.setProperty('--x', (Math.random() * 100) + 'vw');
        el.style.setProperty('--size', ((isHeart ? 13 : 9) + Math.random() * (isHeart ? 13 : 12)) + 'px');
        el.style.setProperty('--opacity', (0.45 + Math.random() * 0.45).toFixed(2));
        el.style.setProperty('--duration', (8 + Math.random() * 9).toFixed(2) + 's');
        el.style.setProperty('--delay', (-Math.random() * 17).toFixed(2) + 's');
        const sway = 25 + Math.random() * 70;
        el.style.setProperty('--sway1', (Math.random() > .5 ? sway : -sway) + 'px');
        el.style.setProperty('--sway2', (Math.random() > .5 ? -sway * .7 : sway * .7) + 'px');
        el.style.setProperty('--sway3', (Math.random() > .5 ? sway * .8 : -sway * .8) + 'px');
        el.style.setProperty('--sway4', (Math.random() > .5 ? -sway : sway) + 'px');
        layer.appendChild(el);
    }
    document.body.prepend(layer);
}

function createHearts() {
    for (let i = 0; i < 18; i++) {
        const h = document.createElement('span');
        h.textContent = ['❤', '♡', '✨'][Math.floor(Math.random() * 3)];
        h.style.position = 'fixed';
        h.style.left = Math.random() * 100 + 'vw';
        h.style.top = '-30px';
        h.style.fontSize = 16 + Math.random() * 22 + 'px';
        h.style.zIndex = 20;
        h.style.pointerEvents = 'none';
        h.style.animation = `fall ${2 + Math.random() * 3}s linear forwards`;
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 5200);
    }
}

const style = document.createElement('style');
style.textContent = '@keyframes fall { to { transform: translateY(110vh) rotate(360deg); opacity: 0; } }';
document.head.appendChild(style);

/* =========================================
   [ส่วนที่เพิ่ม] สคริปต์สร้างหัวใจและดาวลอยขึ้นด้านบน
========================================= */
document.addEventListener("DOMContentLoaded", function() {
    const symbols = ['❤️', '⭐', '✨', '💖', '🌟'];
    
    function createFloatingElement() {
        const el = document.createElement('div');
        el.className = 'floating-element';
        
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        el.innerText = symbol;
        
        el.style.left = Math.random() * 100 + 'vw';
        el.style.fontSize = (Math.random() * 20 + 15) + 'px'; 
        el.style.animationDuration = (Math.random() * 4 + 4) + 's'; 
        el.style.filter = "drop-shadow(0px 0px 4px rgba(255,255,255,0.8)) drop-shadow(0px 0px 2px rgba(0,0,0,0.5))";
        
        document.body.appendChild(el);
        
        setTimeout(() => {
            if (el.parentNode) el.parentNode.removeChild(el);
        }, parseFloat(el.style.animationDuration) * 1000 + 1000);
    }
    
    setInterval(createFloatingElement, 300);
});

/* =========================================
   [ส่วนที่เพิ่ม] สคริปต์ระบบนับเวลา (Anniversary Counter)
========================================= */
document.addEventListener("DOMContentLoaded", function() {
    const counterBox = document.getElementById('time-counter');
    if (counterBox) {
        const startDate = new Date(2023, 1, 14, 0, 0, 0); 
        function updateCounter() {
            const now = new Date();
            const diff = now - startDate;
            if (diff < 0) return;
            const totalSeconds = Math.floor(diff / 1000);
            const seconds = totalSeconds % 60;
            const totalMinutes = Math.floor(totalSeconds / 60);
            const minutes = totalMinutes % 60;
            const totalHours = Math.floor(totalMinutes / 60);
            const hours = totalHours % 24;
            const totalDays = Math.floor(totalHours / 24);
            const years = Math.floor(totalDays / 365);
            const remainingDays = totalDays % 365;
            const months = Math.floor(remainingDays / 30);
            const days = remainingDays % 30;

            document.getElementById('years').innerText = years;
            document.getElementById('months').innerText = months;
            document.getElementById('days').innerText = days;
            document.getElementById('hours').innerText = hours;
            document.getElementById('minutes').innerText = minutes;
            document.getElementById('seconds').innerText = seconds;
        }
        updateCounter();
        setInterval(updateCounter, 1000);
    }
});


/* =========================================
   [ส่วนที่เพิ่ม] สคริปต์สำหรับกดดูรูปเต็มจอ (Image Modal)
   - ดักจับการคลิกที่รูปภาพใน .gallery ทั้งหมด
   - เมื่อคลิก ให้นำ source (src) ของรูปนั้นไปใส่ในกล่องเต็มจอและแสดงกล่อง
========================================= */
document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const closeModal = document.getElementById("closeModal");

    // ตรวจสอบว่ามีกล่อง Modal อยู่ในหน้านั้นไหม (มีแค่ในหน้า memories.html)
    if (modal && modalImg && closeModal) {
        
        // ดึงรูปภาพทั้งหมดที่มีในแกลเลอรี
        const images = document.querySelectorAll(".gallery img");
        
        // วนลูปเพื่อเพิ่มคำสั่งเมื่อถูก "คลิก" ให้กับทุกรูปภาพ
        images.forEach(img => {
            img.addEventListener("click", function() {
                modal.classList.remove("hidden"); // เลิกซ่อน (แสดงฉากหลังดำ)
                modalImg.src = this.src; // นำ src ของรูปล่าสุดที่โดนคลิก มาใส่ในรูปเต็มจอ
            });
        });

        // 1. ปิดกล่องเต็มจอเมื่อกด "ปุ่มกากบาท"
        closeModal.addEventListener("click", function() {
            modal.classList.add("hidden");
        });

        // 2. ปิดกล่องเต็มจอเมื่อกด "พื้นที่ว่างสีดำ"
        modal.addEventListener("click", function(e) {
            // ถ้าจุดที่กด ไม่ใช่ตัวรูปภาพ (กดโดนฉากหลัง)
            if (e.target !== modalImg) { 
                modal.classList.add("hidden");
            }
        });
    }
});
