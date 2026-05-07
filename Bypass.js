// ==RemoteCore==
// @name        Aincrad Bypass Core Engine
// @version     3.0
// @author      J1BON
// @telegram    @J1BON
// ==/RemoteCore==

(function() {
    'use strict';
    
    if(window.__AINCRAD_CORE_LOADED) return;
    window.__AINCRAD_CORE_LOADED = true;
    
    // ========== কোর কনফিগারেশন ==========
    const TOKEN_ID = '3TMdueEaUw';
    const SHORTENER_URL = 'https://encurtarapido.com';
    const TARGET_URL = SHORTENER_URL + '/' + TOKEN_ID;
    
    const CLICK_KEYWORDS = [
        'clique aqui para continuar', 'clique aqui para prosseguir',
        'prosseguir', 'continuar', 'continue', 'next', 'claim', 'get key',
        'avançar', 'avancar', 'obter', 'proceed', 'click here', 'bypass', 
        'submit', 'gerar', 'criar', 'encurtar', 'ir para', 'redirect',
        'liberar', 'acessar', 'entrar'
    ];

    // ========== ভিআইপি লোডিং স্ক্রিন ==========
    function showVIPLoading() {
        if (document.getElementById('j1bon-vip-screen')) return;

        const style = document.createElement('style');
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
            #j1bon-vip-screen {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle at 30% 20%, #0a0f1e, #020408);
                z-index: 999999;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                font-family: 'Inter', sans-serif;
                backdrop-filter: blur(10px);
            }
            #j1bon-vip-screen .vip-card {
                background: rgba(10, 20, 35, 0.85);
                backdrop-filter: blur(20px);
                border-radius: 40px;
                padding: 50px 60px;
                border: 1px solid rgba(0, 255, 200, 0.5);
                box-shadow: 0 0 80px rgba(0, 255, 200, 0.15);
                text-align: center;
                animation: glowPulse 2s infinite;
            }
            @keyframes glowPulse {
                0% { box-shadow: 0 0 20px rgba(0,255,200,0.2); border-color: rgba(0,255,200,0.3); }
                100% { box-shadow: 0 0 50px rgba(0,255,200,0.5); border-color: rgba(0,255,200,0.7); }
            }
            #j1bon-vip-screen .spinner {
                width: 80px;
                height: 80px;
                border: 4px solid rgba(0,255,200,0.15);
                border-top: 4px solid #0ff;
                border-right: 4px solid #0ff;
                border-radius: 50%;
                animation: spin 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
                margin: 0 auto 25px;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            #j1bon-vip-screen h2 {
                font-size: 28px;
                font-weight: 700;
                background: linear-gradient(135deg, #ffffff, #0ff, #0fa);
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
                margin: 15px 0 10px;
            }
            #j1bon-vip-screen p {
                color: #aac;
                font-size: 14px;
                margin: 5px 0;
            }
            #j1bon-vip-screen .timer-box {
                margin: 25px 0 10px;
            }
            #j1bon-vip-screen .timer {
                font-size: 32px;
                font-weight: 800;
                color: #0ff;
                background: rgba(0,0,0,0.5);
                display: inline-block;
                padding: 5px 25px;
                border-radius: 50px;
                letter-spacing: 3px;
                font-family: monospace;
            }
            #j1bon-vip-screen .credit-line {
                margin-top: 35px;
                font-size: 11px;
                color: #457;
                letter-spacing: 1.5px;
            }
            #j1bon-vip-screen .credit-line span {
                color: #0ff;
            }
        `;
        document.head.appendChild(style);

        const div = document.createElement('div');
        div.id = 'j1bon-vip-screen';
        div.innerHTML = `
            <div class="vip-card">
                <div class="spinner"></div>
                <h2>⚡ AINCRAD ENGINE</h2>
                <p>Secure bypass protocol initialized</p>
                <div class="timer-box">
                    <div class="timer"><span id="j1bon-timer">6</span>s</div>
                </div>
                <p style="font-size:12px;color:#6af;">Redirecting to destination...</p>
                <div class="credit-line">🔐 <span>J1BON</span> • VIP BYPASS</div>
            </div>
        `;
        document.body.appendChild(div);

        let seconds = 6;
        const timerSpan = document.getElementById('j1bon-timer');
        const interval = setInterval(() => {
            seconds--;
            if (timerSpan) timerSpan.innerText = seconds;
            if (seconds <= 0) {
                clearInterval(interval);
                const el = document.getElementById('j1bon-vip-screen');
                if (el) {
                    el.style.transition = 'opacity 0.5s';
                    el.style.opacity = '0';
                    setTimeout(() => el.remove(), 500);
                }
            }
        }, 1000);
    }

    // ========== নেটওয়ার্ক ইন্টারসেপ্টর ==========
    let networkPatched = false;
    function patchNetwork() {
        if (networkPatched) return;
        networkPatched = true;

        // XMLHttpRequest প্যাচ
        const OrigXHR = window.XMLHttpRequest;
        window.XMLHttpRequest = function() {
            const xhr = new OrigXHR();
            let reqUrl = '';
            const origOpen = xhr.open;
            xhr.open = function(method, url, ...args) {
                reqUrl = url || '';
                return origOpen.call(xhr, method, url, ...args);
            };
            xhr.addEventListener('load', function() {
                if (reqUrl && (reqUrl.includes('/go') || reqUrl.includes('redirect') || reqUrl.includes('api/get'))) {
                    try {
                        const data = JSON.parse(xhr.responseText);
                        const finalUrl = data.url || data.link || data.redirect || data.destination;
                        if (finalUrl && finalUrl.startsWith('http')) {
                            setTimeout(() => window.location.href = finalUrl, 200);
                        }
                    } catch(e) {}
                }
            });
            return xhr;
        };

        // Fetch প্যাচ
        const origFetch = window.fetch;
        window.fetch = async function(...args) {
            const response = await origFetch.apply(this, args);
            const url = typeof args[0] === 'string' ? args[0] : (args[0]?.url || '');
            if (url && (url.includes('/go') || url.includes('redirect'))) {
                try {
                    const data = await response.clone().json();
                    const finalUrl = data.url || data.link || data.redirect;
                    if (finalUrl && finalUrl.startsWith('http')) {
                        setTimeout(() => window.location.href = finalUrl, 200);
                    }
                } catch(e) {}
            }
            return response;
        };
    }

    // ========== অটো ক্লিক ইঞ্জিন ==========
    let autoClicked = false;
    function triggerAutoClick() {
        if (autoClicked) return false;
        
        const clickables = document.querySelectorAll('button, a, input[type="submit"], input[type="button"], .btn, .button, [role="button"], .next, .continue, .proceed, .skip');
        
        for (const el of clickables) {
            const text = (el.innerText || el.textContent || el.value || '').toLowerCase();
            const id = (el.id || '').toLowerCase();
            const cls = (el.className || '').toLowerCase();
            
            for (const kw of CLICK_KEYWORDS) {
                if (text.includes(kw) || id.includes(kw) || cls.includes(kw)) {
                    autoClicked = true;
                    console.log('[CORE] Auto-clicked:', text.slice(0, 50));
                    el.click();
                    setTimeout(() => el.click(), 100);
                    return true;
                }
            }
        }
        return false;
    }

    // ========== ফাইনাল রিডাইরেক্ট ফাইন্ডার ==========
    function findFinalRedirect() {
        // লিংক চেক
        const links = document.querySelectorAll('a[href]');
        for (const link of links) {
            const href = link.href;
            if (href && (href.includes('/go/') || href.includes('redirect') || href.includes('final') || href.includes('destination'))) {
                setTimeout(() => window.location.href = href, 300);
                return true;
            }
        }
        
        // মেটা রিফ্রেশ চেক
        const meta = document.querySelector('meta[http-equiv="refresh"]');
        if (meta) {
            const content = meta.getAttribute('content');
            const match = content.match(/url=(.+)/i);
            if (match && match[1]) {
                setTimeout(() => window.location.href = match[1], 300);
                return true;
            }
        }
        return false;
    }

    // ========== ডোমেইন স্পেসিফিক হ্যান্ডলার ==========
    const host = window.location.hostname;
    
    // Aincrad VPN
    if (host.includes('aincrad.decryptvpn.xyz')) {
        patchNetwork();
        window.addEventListener('load', () => {
            setTimeout(triggerAutoClick, 800);
            setTimeout(triggerAutoClick, 2500);
            setTimeout(findFinalRedirect, 4000);
        });
    }
    
    // Preciso Saber Investir
    if (host.includes('precisosaberinvestir.com.br')) {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        const ts = params.get('sf_ft_ts');
        const sig = params.get('sf_ft_sig');
        
        if (id === TOKEN_ID && ts && sig) {
            window.location.replace(TARGET_URL + '?rtgok=1&ts=' + encodeURIComponent(ts) + '&sig=' + encodeURIComponent(sig));
        }
    }
    
    // EncurtarApido
    if (host.includes('encurtarapido.com')) {
        const urlParams = new URLSearchParams(window.location.search);
        
        if (urlParams.get('rtgok') === '1') {
            // লোডিং স্ক্রিন
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', showVIPLoading);
            } else {
                showVIPLoading();
            }
            
            patchNetwork();
            
            let attempts = 0;
            const clickInterval = setInterval(() => {
                attempts++;
                const clicked = triggerAutoClick();
                if (clicked || attempts > 25) clearInterval(clickInterval);
            }, 1500);
            
            if (document.readyState !== 'loading') {
                setTimeout(triggerAutoClick, 1000);
                setTimeout(findFinalRedirect, 4000);
            } else {
                document.addEventListener('DOMContentLoaded', () => {
                    setTimeout(triggerAutoClick, 1000);
                    setTimeout(findFinalRedirect, 4000);
                });
            }
            
            // ফ্যালব্যাক
            setTimeout(() => {
                const all = document.querySelectorAll('button, a, .btn');
                for (const btn of all) {
                    if (btn.offsetParent !== null) {
                        btn.click();
                        break;
                    }
                }
            }, 18000);
        }
    }
    
    console.log('[AINCRAD CORE] Engine loaded successfully ✅');
})();
