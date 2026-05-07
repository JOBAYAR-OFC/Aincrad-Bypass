// ==UserScript==
// @name         👑 AINCARD KEY BYPASS | VIP Edition 👑
// @namespace    aincard-bypass
// @version      3.0
// @description  Professional VIP Bypass Tool - Premium Experience
// @author       JOBAYAR AHMED
// @match        *://*/*
// @grant        none
// @license      MIT
// @run-at       document-start
// @downloadURL  https://update.greasyfork.org/scripts/576122/alpharede%20-%20Bypass.user.js
// @updateURL    https://update.greasyfork.org/scripts/576122/alpharede%20-%20Bypass.meta.js
// ==/UserScript==

(function () {
    'use strict';

    function extractDestination(text) {
        try {
            if (text.includes("destination")) {
                const clean = text.replace(/\\+"/g, '"');
                const match = clean.match(/destination["']?\s*:\s*["']([^"']+)["']/);
                if (match && match[1]) {
                    return match[1];
                }
            }
        } catch (e) { }
        return null;
    }

    function clearPage() {
        document.open();
        document.write(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AINCARD KEY BYPASS | VIP</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            min-height: 100vh;
            background: linear-gradient(135deg, #0a0a0a 0%, #0f0f1a 50%, #0a0a0f 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Poppins', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
            position: relative;
            overflow: hidden;
        }

        /* Animated gradient orbs */
        body::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.08) 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, rgba(255, 70, 150, 0.06) 0%, transparent 50%);
            pointer-events: none;
        }

        /* Main Container */
        .vip-container {
            position: relative;
            z-index: 10;
            text-align: center;
            padding: 3rem 3.5rem;
            background: rgba(10, 10, 15, 0.75);
            backdrop-filter: blur(25px);
            border-radius: 40px;
            border: 1px solid rgba(255, 215, 0, 0.25);
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 215, 0, 0.1), 0 0 40px rgba(255, 215, 0, 0.15);
            max-width: 550px;
            width: 90%;
            transition: all 0.3s ease;
        }

        .vip-container:hover {
            border-color: rgba(255, 215, 0, 0.5);
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 215, 0, 0.2), 0 0 60px rgba(255, 215, 0, 0.25);
        }

        /* Main Title */
        .main-title {
            font-size: 2.2rem;
            font-weight: 800;
            background: linear-gradient(135deg, #FFD700, #FFA500, #FF6B6B, #FFD700);
            background-size: 300% auto;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: gradientFlow 4s linear infinite;
            letter-spacing: 2px;
            margin-bottom: 0.5rem;
        }

        @keyframes gradientFlow {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
        }

        /* VIP Badge */
        .vip-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 100, 100, 0.1));
            backdrop-filter: blur(5px);
            padding: 0.45rem 1.2rem;
            border-radius: 50px;
            margin: 0.8rem 0 1.2rem;
            border: 1px solid rgba(255, 215, 0, 0.3);
        }

        .vip-badge span {
            font-weight: 700;
            font-size: 0.8rem;
            letter-spacing: 2px;
            color: #FFD700;
            text-shadow: 0 0 8px rgba(255, 215, 0, 0.3);
        }

        /* Divider */
        .divider {
            width: 60px;
            height: 2px;
            background: linear-gradient(90deg, transparent, #FFD700, transparent);
            margin: 1rem auto;
        }

        /* Credit Name */
        .credit-name {
            font-size: 1rem;
            color: rgba(255, 255, 255, 0.7);
            margin: 0.8rem 0;
            font-weight: 500;
        }

        .credit-name strong {
            background: linear-gradient(135deg, #FFD700, #FFA500);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            font-weight: 700;
        }

        /* Telegram Button */
        .telegram-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            background: linear-gradient(135deg, #0088cc, #006699);
            padding: 0.7rem 1.8rem;
            border-radius: 50px;
            text-decoration: none;
            margin: 0.8rem 0 1.2rem;
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 4px 15px rgba(0, 136, 204, 0.3);
        }

        .telegram-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 136, 204, 0.5);
            background: linear-gradient(135deg, #0099dd, #0077aa);
        }

        .telegram-btn:active {
            transform: translateY(0);
        }

        .telegram-btn span {
            color: white;
            font-weight: 600;
            font-size: 0.9rem;
            letter-spacing: 0.5px;
        }

        .telegram-icon {
            font-size: 1.2rem;
        }

        /* Loader */
        .loader-wrapper {
            margin: 2rem 0;
        }

        .loader {
            width: 70px;
            height: 70px;
            margin: 0 auto;
            position: relative;
        }

        .loader-ring {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 3px solid transparent;
            border-top-color: #FFD700;
            border-radius: 50%;
            animation: spin 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        }

        .loader-ring:nth-child(1) { animation-delay: -0.3s; border-top-color: #FFD700; }
        .loader-ring:nth-child(2) { animation-delay: -0.2s; border-top-color: #FFA500; width: 80%; height: 80%; top: 10%; left: 10%; }
        .loader-ring:nth-child(3) { animation-delay: -0.1s; border-top-color: #FF6B6B; width: 60%; height: 60%; top: 20%; left: 20%; }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Timer Display */
        .timer-section {
            margin: 1.5rem 0;
        }

        .timer-label {
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 4px;
            color: rgba(255, 255, 255, 0.5);
            margin-bottom: 0.5rem;
        }

        .timer-value {
            font-size: 3.8rem;
            font-weight: 800;
            background: linear-gradient(135deg, #FFD700, #FFA500);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            font-family: 'Courier New', 'Fira Code', monospace;
            letter-spacing: 5px;
        }

        .timer-unit {
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.5);
            margin-left: 5px;
        }

        /* Progress Bar */
        .progress-container {
            width: 100%;
            height: 3px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 3px;
            margin: 1.5rem 0 1rem;
            overflow: hidden;
        }

        .progress-fill {
            height: 100%;
            width: 0%;
            background: linear-gradient(90deg, #FFD700, #FF6B6B, #FFD700);
            background-size: 200% auto;
            border-radius: 3px;
            transition: width 0.1s linear;
        }

        /* Footer Status */
        .footer-status {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 1.2rem;
            font-size: 0.7rem;
            color: rgba(255, 255, 255, 0.3);
        }

        .status-dot {
            width: 6px;
            height: 6px;
            background: #FFD700;
            border-radius: 50%;
            display: inline-block;
            animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
        }
    </style>
</head>
<body>

    <div class="vip-container">
        <!-- Main Title -->
        <div class="main-title">⚡ AINCARD KEY BYPASS ⚡</div>
        
        <!-- VIP Badge -->
        <div class="vip-badge">
            <span>✦ PREMIUM VIP ACCESS ✦</span>
        </div>
        
        <div class="divider"></div>
        
        <!-- Credit Line -->
        <div class="credit-name">
            Credit • <strong>JOBAYAR AHMED</strong>
        </div>
        
        <!-- Telegram Contact Button (Clickable) -->
        <a href="https://t.me/DEVIL_OFC" target="_blank" class="telegram-btn" id="telegramLink">
            <span class="telegram-icon">✈️</span>
            <span>@DEVIL_OFC</span>
            <span class="telegram-icon">➤</span>
        </a>
        
        <div class="divider"></div>
        
        <!-- Loader -->
        <div class="loader-wrapper">
            <div class="loader">
                <div class="loader-ring"></div>
                <div class="loader-ring"></div>
                <div class="loader-ring"></div>
            </div>
        </div>
        
        <!-- Timer -->
        <div class="timer-section">
            <div class="timer-label">REDIRECTING IN</div>
            <div>
                <span class="timer-value" id="timerDisplay">50</span>
                <span class="timer-unit">seconds</span>
            </div>
        </div>
        
        <!-- Progress Bar -->
        <div class="progress-container">
            <div class="progress-fill" id="progressFill"></div>
        </div>
        
        <!-- Footer Status -->
        <div class="footer-status">
            <span>🔐 Secure Connection</span>
            <span><span class="status-dot"></span> Processing</span>
            <span>⚡ VIP Tunnel</span>
        </div>
    </div>

    <script>
        // Smooth progress update function
        function updateProgress(percent) {
            const fill = document.getElementById('progressFill');
            if (fill) fill.style.width = percent + '%';
        }
    </script>
</body>
</html>
        `);
        document.close();
    }

    function startTimer(url) {
        let seconds = 50;
        const timerEl = document.getElementById("timerDisplay");
        const progressFill = document.getElementById("progressFill");

        if (progressFill) {
            progressFill.style.transition = 'width 0.1s linear';
        }

        const interval = setInterval(() => {
            seconds--;
            
            if (timerEl) {
                timerEl.textContent = seconds;
                // Update progress bar
                const percent = ((50 - seconds) / 50) * 100;
                if (progressFill) {
                    progressFill.style.width = percent + '%';
                }
                
                // Add urgency effect on last 10 seconds
                if (seconds <= 10) {
                    timerEl.style.animation = 'pulse 0.5s infinite';
                }
            }

            if (seconds <= 0) {
                clearInterval(interval);
                const container = document.querySelector('.vip-container');
                if (container) {
                    container.style.opacity = '0';
                    container.style.transform = 'scale(0.95)';
                    container.style.transition = 'all 0.3s ease';
                    setTimeout(() => {
                        window.location.replace(url);
                    }, 300);
                } else {
                    window.location.replace(url);
                }
            }
        }, 1000);
    }

    function handle(url) {
        if (url.includes("getkey?")) {
            clearPage();
            startTimer(url);
        } else {
            window.location.replace(url);
        }
    }

    function run() {
        const scripts = document.querySelectorAll("script");

        for (let i = 0; i < scripts.length; i++) {
            const text = scripts[i].textContent || "";
            if (!text || text.length < 50) continue;

            const url = extractDestination(text);
            if (url) {
                handle(url);
                return true;
            }
        }
        return false;
    }

    if (run()) return;

    const observer = new MutationObserver(() => {
        if (run()) observer.disconnect();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    setTimeout(() => observer.disconnect(), 10000);

})();
