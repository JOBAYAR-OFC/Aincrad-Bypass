// ==UserScript==
// @name        🗝️ Aincrad Key Bypass by J1BON 💣
// @author      IT'S MEJIBON
// @telegram    @J1BON
// @namespace   http://tampermonkey.net/
// @version      4.0
// @grant        unsafeWindow
// @grant        GM_setValue
// @grant        GM_getValue
// @match        https://aincrad.decryptvpn.xyz/*
// @match        https://precisosaberinvestir.com.br/token.php*
// @match        https://encurtarapido.com/*
// @match        https://encurtarapido.com/cadastro*
// @run-at       document-start
// @note         Full bypass with auto-registration skip
// ==/UserScript==

(function() {
    'use strict';

    // ========== কনফিগারেশন ==========
    const TOKEN_ID = '3TMdueEaUw';
    const TARGET_URL = 'https://encurtarapido.com/' + TOKEN_ID;
    
    // ========== ফake ডেটা জেনারেটর ==========
    const fakeData = {
        username: 'user_' + Math.random().toString(36).substring(2, 10),
        email: 'temp_' + Date.now() + '@tempmail.com',
        whatsapp: '+551199999' + Math.floor(Math.random() * 10000),
        password: 'Pass@' + Math.random().toString(36).substring(2, 10)
    };
    
    // ========== রেজিস্ট্রেশন পেজ স্কিপ ==========
    function handleRegistrationPage() {
        console.log('[BYPASS] Registration page detected - auto-filling and submitting');
        
        // ফরম ফিল্ড খুঁজে ফিল করা
        setTimeout(() => {
            // ইউজারনেম
            const usernameInput = document.querySelector('input[name="username"], input[placeholder*="usuário"], input[placeholder*="username"]');
            if (usernameInput) usernameInput.value = fakeData.username;
            
            // ইমেইল
            const emailInput = document.querySelector('input[name="email"], input[type="email"], input[placeholder*="e-mail"]');
            if (emailInput) emailInput.value = fakeData.email;
            
            // ওয়াটসঅ্যাপ
            const whatsappInput = document.querySelector('input[name="whatsapp"], input[placeholder*="WhatsApp"], input[placeholder*="whatsapp"]');
            if (whatsappInput) whatsappInput.value = fakeData.whatsapp;
            
            // পাসওয়ার্ড
            const passwordInputs = document.querySelectorAll('input[type="password"]');
            if (passwordInputs[0]) passwordInputs[0].value = fakeData.password;
            if (passwordInputs[1]) passwordInputs[1].value = fakeData.password;
            
            // ট্রাফিক সোর্স সিলেক্ট
            const trafficSelect = document.querySelector('select[name*="traffic"], select[name*="fonte"]');
            if (trafficSelect) {
                trafficSelect.value = 'telegram';
                trafficSelect.dispatchEvent(new Event('change'));
            }
            
            // URL ফন্ট
            const urlInput = document.querySelector('input[name*="url"], input[placeholder*="fonte"], input[placeholder*="source"]');
            if (urlInput) urlInput.value = 'https://t.me/J1BON';
            
            // চেকবক্স টিক করা
            const checkbox = document.querySelector('input[type="checkbox"]');
            if (checkbox && !checkbox.checked) {
                checkbox.click();
            }
            
            // ২ সেকেন্ড পর সাবমিট বাটন ক্লিক
            setTimeout(() => {
                const submitBtn = document.querySelector('button[type="submit"], input[type="submit"], button:contains("Cadastre"), button:contains("Registrar")');
                if (submitBtn) {
                    submitBtn.click();
                    console.log('[BYPASS] Registration submitted with fake data');
                    
                    // রেজিস্ট্রেশন成功后 ৩ সেকেন্ড পর রিডাইরেক্ট
                    setTimeout(() => {
                        window.location.href = TARGET_URL + '?rtgok=1&bypass=auto';
                    }, 3000);
                } else {
                    // বাটন না পেলে সরাসরি রিডাইরেক্ট
                    window.location.href = TARGET_URL + '?rtgok=1';
                }
            }, 2000);
        }, 1500);
    }
    
    // ========== ভিআইপি লোডিং স্ক্রিন ==========
    function showVIPLoading() {
        if (document.getElementById('j1bon-vip')) return;
        
        const style = document.createElement('style');
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
            #j1bon-vip {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #0a0a1a, #000000);
                z-index: 999999;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Inter', sans-serif;
                animation: fadeIn 0.3s;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            #j1bon-vip .box {
                background: rgba(20, 30, 50, 0.9);
                backdrop-filter: blur(15px);
                border-radius: 30px;
                padding: 45px 55px;
                text-align: center;
                border: 1px solid #0ff;
                box-shadow: 0 0 60px rgba(0,255,200,0.2);
            }
            #j1bon-vip .spinner {
                width: 60px;
                height: 60px;
                border: 4px solid rgba(0,255,200,0.2);
                border-top: 4px solid #0ff;
                border-radius: 50%;
                animation: spin 0.6s linear infinite;
                margin: 0 auto 20px;
            }
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            #j1bon-vip h2 {
                background: linear-gradient(135deg, #fff, #0ff);
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
                font-size: 24px;
            }
            #j1bon-vip .timer {
                color: #0ff;
                font-size: 30px;
                font-weight: bold;
                margin: 15px 0;
            }
            #j1bon-vip .credit {
                color: #567;
                font-size: 11px;
                margin-top: 20px;
            }
        `;
        document.head.appendChild(style);
        
        const div = document.createElement('div');
        div.id = 'j1bon-vip';
        div.innerHTML = `
            <div class="box">
                <div class="spinner"></div>
                <h2>⚡ BYPASS ENGINE</h2>
                <p>Redirecting to destination...</p>
                <div class="timer"><span id="vip-timer">5</span>s</div>
                <div class="credit">J1BON • AINCRAD VIP</div>
            </div>
        `;
        document.body.appendChild(div);
        
        let sec = 5;
        const timerSpan = document.getElementById('vip-timer');
        const int = setInterval(() => {
            sec--;
            if (timerSpan) timerSpan.innerText = sec;
            if (sec <= 0) {
                clearInterval(int);
                const el = document.getElementById('j1bon-vip');
                if (el) el.remove();
            }
        }, 1000);
    }
    
    // ========== অটো ক্লিক ==========
    let clicked = false;
    function autoClick() {
        if (clicked) return false;
        
        const buttons = document.querySelectorAll('button, a, .btn, input[type="submit"], [role="button"]');
        const keywords = ['continuar', 'continue', 'prosseguir', 'proceed', 'next', 'avancar', 'avançar', 'ir', 'go', 'click', 'bypass', 'liberar', 'acessar'];
        
        for (const btn of buttons) {
            const text = (btn.innerText || btn.textContent || '').toLowerCase();
            for (const kw of keywords) {
                if (text.includes(kw)) {
                    clicked = true;
                    btn.click();
                    console.log('[BYPASS] Auto-clicked:', text);
                    return true;
                }
            }
        }
        return false;
    }
    
    // ========== URL ইন্টারসেপ্ট ==========
    function interceptURLs() {
        // AJAX রেসপন্স ইন্টারসেপ্ট
        const origFetch = window.fetch;
        window.fetch = async function(...args) {
            const res = await origFetch.apply(this, args);
            const url = args[0]?.url || args[0];
            if (url && url.includes('/go')) {
                try {
                    const data = await res.clone().json();
                    if (data.url) {
                        setTimeout(() => window.location.href = data.url, 300);
                    }
                } catch(e) {}
            }
            return res;
        };
        
        // মেটা রিফ্রেশ চেক
        const meta = document.querySelector('meta[http-equiv="refresh"]');
        if (meta) {
            const content = meta.getAttribute('content');
            const match = content.match(/url=(.+)/i);
            if (match && match[1]) {
                setTimeout(() => window.location.href = decodeURIComponent(match[1]), 500);
            }
        }
    }
    
    // ========== মেইন ==========
    const host = window.location.hostname;
    const path = window.location.pathname;
    
    // 1. Aincrad VPN
    if (host.includes('aincrad.decryptvpn.xyz')) {
        interceptURLs();
        window.addEventListener('load', () => {
            setTimeout(autoClick, 1000);
            setTimeout(autoClick, 3000);
        });
    }
    
    // 2. Preciso Saber Investir
    if (host.includes('precisosaberinvestir.com.br')) {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        if (id === TOKEN_ID) {
            window.location.replace(TARGET_URL + '?rtgok=1');
        }
    }
    
    // 3. Registration Page (এটাই আপনার সমস্যার সমাধান)
    if (host.includes('encurtarapido.com') && path.includes('cadastro')) {
        handleRegistrationPage();
    }
    
    // 4. EncurtarApido Main Page
    if (host.includes('encurtarapido.com') && !path.includes('cadastro')) {
        const params = new URLSearchParams(window.location.search);
        
        // rtgok=1 থাকলেই bypass শুরু করবে
        if (params.get('rtgok') === '1' || window.location.pathname === '/' + TOKEN_ID) {
            
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', showVIPLoading);
            } else {
                showVIPLoading();
            }
            
            interceptURLs();
            
            let attempts = 0;
            const interval = setInterval(() => {
                attempts++;
                if (autoClick() || attempts > 30) clearInterval(interval);
            }, 1500);
            
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(autoClick, 1000);
                setTimeout(autoClick, 3000);
            });
            
            // ফাইনাল ফ্যালব্যাক
            setTimeout(() => {
                const allBtns = document.querySelectorAll('button, a');
                for (const btn of allBtns) {
                    if (btn.offsetParent !== null && btn.innerText.length < 50) {
                        btn.click();
                        break;
                    }
                }
            }, 15000);
        } else {
            // rtgok=1 না থাকলে সেট করে রিলোড
            window.location.href = TARGET_URL + '?rtgok=1';
        }
    }
    
    console.log('[J1BON] Aincrad Key Bypass V4 Loaded ✅');
})();
