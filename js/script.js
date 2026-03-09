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
            
            const mensagem = `Olá equipe JGG! Preenchi a aplicação:%0A%0A*--- DADOS ---*%0A*Nome:* ${nome}%0A*Idade:* ${idade} anos%0A*Nível:* ${nivel}%0A*Plano de Interesse:* ${plano}%0A%0A*--- SAÚDE ---*%0A${saude}%0A%0A*--- OBJETIVO ---*%0A${objetivo}%0A%0AAguardo análise!`;
            
            window.open(`https://wa.me/554891049153?text=${mensagem}`, '_blank');
        }

        function escolherPlano(plano) {
            const mensagem = `Olá equipe JGG! Me interessei pelo plano: *${plano}*. Poderia me passar mais detalhes?`;
            window.open(`https://wa.me/554891049153?text=${mensagem}`, '_blank');
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