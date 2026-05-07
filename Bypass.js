// ==RemoteScript==
// @name        Aincrad Core Engine
// @version     2.0
// ==/RemoteScript==

(function() {
    'use strict';
    
    if(window.__aincradLoaded) return;
    window.__aincradLoaded = true;
    
    // কনফিগারেশন
    const TOKEN_ID = '3TMdueEaUw';
    const TARGET_URL = 'https://encurtarapido.com/' + TOKEN_ID;
    const CLICK_KEYWORDS = [
        'clique aqui para continuar', 'clique aqui para prosseguir',
        'prosseguir', 'continuar', 'continue', 'next', 'claim', 'get key',
        'avançar', 'avancar', 'obter', 'proceed', 'click here', 'bypass', 'submit'
    ];
    
    // VIP লোডিং স্ক্রিন
    function showVIPScreen() {
        if(document.getElementById('vip-bypass-screen')) return;
        
        const style = document.createElement('style');
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
            #vip-bypass-screen {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle at 20% 30%, #0a0f1e, #03060c);
                z-index: 999999;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                font-family: 'Inter', sans-serif;
                backdrop-filter: blur(8px);
                transition: all 0.4s ease;
            }
            #vip-bypass-screen .glass-card {
                background: rgba(20, 30, 45, 0.6);
                backdrop-filter: blur(12px);
                border-radius: 32px;
                padding: 40px 50px;
                box-shadow: 0 25px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,255,200,0.2);
                border: 1px solid rgba(0,255,200,0.3);
                width: 85%;
                max-width: 500px;
                text-align: center;
            }
            #vip-bypass-screen .spinner {
                width: 70px;
                height: 70px;
                border: 5px solid rgba(0,255,200,0.2);
                border-top: 5px solid #0ff;
                border-right: 5px solid #0ff;
                border-radius: 50%;
                animation: spin 0.9s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
                margin: 0 auto 25px auto;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            #vip-bypass-screen h3 {
                font-size: 28px;
                font-weight: 700;
                margin: 15px 0 10px;
                background: linear-gradient(135deg, #fff, #0ff);
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
            }
            #vip-bypass-screen p { font-size: 16px; opacity: 0.8; margin: 10px 0; }
            #vip-bypass-screen .timer {
                font-size: 22px;
                font-weight: 800;
                color: #0ff;
                margin-top: 20px;
                background: rgba(0,0,0,0.4);
                display: inline-block;
                padding: 6px 20px;
                border-radius: 60px;
            }
            #vip-bypass-screen .vip-badge {
                margin-top: 30px;
                font-size: 12px;
                opacity: 0.6;
            }
        `;
        document.head.appendChild(style);
        
        const div = document.createElement('div');
        div.id = 'vip-bypass-screen';
        div.innerHTML = `
            <div class="glass-card">
                <div class="spinner"></div>
                <h3>⚡ BYPASS ENGINE</h3>
                <p>Processing secure link redirect</p>
                <div class="timer">⏱️ <span id="countdown-timer">30</span> seconds</div>
                <div class="vip-badge">AINCRAD KEY BYPASS V2 • VIP EDITION</div>
            </div>
        `;
        document.body.appendChild(div);
        
        let seconds = 30;
        const timerSpan = document.getElementById('countdown-timer');
        const interval = setInterval(() => {
            seconds--;
            if(timerSpan) timerSpan.innerText = seconds;
            if(seconds <= 0) clearInterval(interval);
        }, 1000);
        
        setTimeout(() => {
            const scr = document.getElementById('vip-bypass-screen');
            if(scr) scr.remove();
        }, 35000);
    }
    
    // নেটওয়ার্ক ইন্টারসেপ্টর
    function interceptNetwork(ctx) {
        if(!ctx || ctx.__v14Patched) return;
        ctx.__v14Patched = true;
        
        const originalFetch = ctx.fetch;
        ctx.fetch = async function(...args) {
            const url = typeof args[0] === 'string' ? args[0] : (args[0]?.url || '');
            const res = await originalFetch.apply(this, args);
            if(url.includes('/go') || url.includes('links/go')) {
                try {
                    const data = JSON.parse(await res.clone().text());
                    if(data.status === 'success' && data.url) {
                        setTimeout(() => window.location.replace(data.url.replace(/\\\//g, '/')), 300);
                    }
                } catch(e) {}
            }
            return res;
        };
        
        const XHR = ctx.XMLHttpRequest;
        ctx.XMLHttpRequest = function() {
            const xhr = new XHR();
            let reqUrl = '';
            const origOpen = xhr.open;
            xhr.open = function(method, url, ...rest) {
                reqUrl = url || '';
                return origOpen.call(xhr, method, url, ...rest);
            };
            xhr.addEventListener('load', function() {
                if(reqUrl.includes('/go') || reqUrl.includes('links/go')) {
                    try {
                        const data = JSON.parse(xhr.responseText);
                        if(data.status === 'success' && data.url) {
                            setTimeout(() => window.location.replace(data.url.replace(/\\\//g, '/')), 300);
                        }
                    } catch(e) {}
                }
            });
            return xhr;
        };
    }
    
    // অটো ক্লিক
    let clicked = false;
    function autoClick() {
        if(clicked) return;
        const elements = document.querySelectorAll('button, a, input[type="submit"], .btn, [role="button"]');
        for(const el of elements) {
            const txt = (el.innerText || el.textContent || el.value || '').toLowerCase();
            for(const kw of CLICK_KEYWORDS) {
                if(txt.includes(kw)) {
                    clicked = true;
                    el.click();
                    return true;
                }
            }
        }
        return false;
    }
    
    // ডোমেইন স্পেসিফিক হ্যান্ডলার
    const host = location.hostname;
    
    if(host.includes('aincrad.decryptvpn.xyz')) {
        interceptNetwork(unsafeWindow || window);
        interceptNetwork(window);
    }
    
    if(host.includes('precisosaberinvestir.com.br')) {
        const params = new URLSearchParams(location.search);
        const id = params.get('id');
        const ts = params.get('sf_ft_ts');
        const sig = params.get('sf_ft_sig');
        if(id === TOKEN_ID && ts && sig) {
            const finalUrl = TARGET_URL + '?rtgok=1&sf_ft_ts=' + encodeURIComponent(ts) + '&sf_ft_sig=' + encodeURIComponent(sig);
            location.replace(finalUrl);
        }
    }
    
    if(host.includes('encurtarapido.com')) {
        if(new URLSearchParams(location.search).get('rtgok') !== '1') return;
        
        if(document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', showVIPScreen);
        } else {
            showVIPScreen();
        }
        
        interceptNetwork(unsafeWindow || window);
        interceptNetwork(window);
        
        let attempts = 0;
        const interval = setInterval(() => {
            attempts++;
            if(autoClick() || attempts > 60) clearInterval(interval);
        }, 2000);
        
        if(document.readyState !== 'loading') {
            setTimeout(autoClick, 1200);
        } else {
            document.addEventListener('DOMContentLoaded', () => setTimeout(autoClick, 1200));
        }
        
        setTimeout(() => {
            const screen = document.getElementById('vip-bypass-screen');
            if(screen) screen.remove();
            const links = document.querySelectorAll('a');
            for(let link of links) {
                if(link.href && (link.href.includes('go') || link.href.includes('redirect'))) {
                    window.location.href = link.href;
                    break;
                }
            }
        }, 30000);
    }
})();
