function toggleTheme() {
            const body = document.body;
            body.classList.toggle('light-theme');
            const icon = document.querySelector('.theme-toggle i');
            if(body.classList.contains('light-theme')){ 
                icon.classList.replace('fa-sun', 'fa-moon'); 
                localStorage.setItem('theme-jgg', 'light'); 
            } else { 
                icon.classList.replace('fa-moon', 'fa-sun'); 
                localStorage.setItem('theme-jgg', 'dark'); 
            }
        }
        if(localStorage.getItem('theme-jgg') === 'light') { 
            document.body.classList.add('light-theme'); 
            document.querySelector('.theme-toggle i').classList.replace('fa-sun', 'fa-moon'); 
        }

        function enviarAnamnese() {
            const plano = document.getElementById('planSelect').value;
            const nome = document.getElementById('clientName').value;
            const idade = document.getElementById('clientAge').value;
            const nivel = document.getElementById('levelSelect').value;
            const saude = document.getElementById('healthInput').value || "Nenhuma restrição relatada.";
            const objetivo = document.getElementById('goalInput').value;
            
            if(!nome || !idade || !objetivo) { alert("Por favor, preencha Nome, Idade e Objetivo."); return; }
            
            const mensagem = `Olá João Guilherme! Preenchi a aplicação:%0A%0A*--- DADOS ---*%0A*Nome:* ${nome}%0A*Idade:* ${idade} anos%0A*Nível:* ${nivel}%0A*Plano de Interesse:* ${plano}%0A%0A*--- SAÚDE ---*%0A${saude}%0A%0A*--- OBJETIVO ---*%0A${objetivo}%0A%0AAguardo análise!`;
            
            window.open(`https://wa.me/5548988407421?text=${mensagem}`, '_blank');
        }

        function escolherPlano(plano) {
            const mensagem = `Olá João Guilherme! Me interessei pelo plano: *${plano}*. Poderia me passar mais detalhes?`;
            window.open(`https://wa.me/5548988407421?text=${mensagem}`, '_blank');
        }

        /* JavaScript para o FAQ - Acordeão */
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const toggle = item.querySelector('.faq-toggle');
            toggle.addEventListener('click', () => {
                // Fecha outros acordeões se abertos (opcional, remova se quiser abrir múltiplos)
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                item.classList.toggle('active');
            });
        });

        /* Compartilhamento Dropdown */
        function toggleShareMenu() {
            const menu = document.getElementById('shareMenu');
            const btn = document.querySelector('.share-toggle');
            menu.classList.toggle('show');
            if(btn) btn.classList.toggle('active');
        }

        document.addEventListener('click', function(event) {
            const shareContainer = document.querySelector('.share-container');
            const shareMenu = document.getElementById('shareMenu');
            const shareBtn = document.querySelector('.share-toggle');
            
            if (shareContainer && !shareContainer.contains(event.target)) {
                if(shareMenu && shareMenu.classList.contains('show')) {
                    shareMenu.classList.remove('show');
                    if(shareBtn) shareBtn.classList.remove('active');
                }
            }

            const langContainer = document.querySelector('.lang-container');
            const langMenu = document.getElementById('langMenu');
            const langBtn = document.querySelector('.lang-toggle');

            if (langContainer && !langContainer.contains(event.target)) {
                if(langMenu && langMenu.classList.contains('show')) {
                    langMenu.classList.remove('show');
                    if(langBtn) langBtn.classList.remove('active');
                }
            }
        });

        /* Alterar Idioma (Exemplo) */
        function toggleLangMenu() {
            const menu = document.getElementById('langMenu');
            const btn = document.querySelector('.lang-toggle');
            menu.classList.toggle('show');
            if(btn) btn.classList.toggle('active');
        }

        function changeLanguage(lang, init = false) {
            if (!translations[lang]) return;
            localStorage.setItem('lang-jgg', lang);
            
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[lang][key]) {
                    // Se for input/textarea, traduz o placeholder, senão o text/innerHTMl
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        el.placeholder = translations[lang][key];
                    } else if (el.tagName === 'OPTGROUP') {
                        el.label = translations[lang][key];
                    } else {
                        // Preserva tags innerHTML se houver, mas os textos vêm do dict
                        el.innerHTML = translations[lang][key];
                    }
                }
            });
            
            if (!init) {
                toggleLangMenu();
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            const savedLang = localStorage.getItem('lang-jgg') || 'pt';
            changeLanguage(savedLang, true);
        });

        function shareSocial(platform) {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent(document.title);
            let shareUrl = '';

            switch(platform) {
                case 'whatsapp':
                    shareUrl = `https://api.whatsapp.com/send?text=${text} ${url}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`;
                    break;
                case 'tiktok':
                    // TikTok não possui API de share intent em web, então copiamos o link
                    navigator.clipboard.writeText(window.location.href).then(() => {
                        alert("Link copiado com sucesso! Cole no TikTok para compartilhar.");
                    });
                    toggleShareMenu(); // Fecha o menu
                    return;
            }
            
            if(shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
                toggleShareMenu(); // Fecha o menu
            }
        }