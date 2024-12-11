let translations = {};

async function loadTranslations() {
    const response = await fetch('./lang.json'); 
    translations = await response.json();
}


function switchLanguage(language) {
    localStorage.setItem('selectedLanguage', language);

    const translateElements = document.querySelectorAll('[data-translate]');
    const translateGroups = document.querySelectorAll('[data-translate-group]');

    translateElements.forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[language] && translations[language][key]) {
            el.innerHTML = translations[language][key];
        }
    });

    translateGroups.forEach(el => {
        const groupKey = el.getAttribute('data-translate-group');
        const listItems = el.querySelectorAll('li');
        const translatedGroup = translations[language][groupKey];
        if (translatedGroup && Array.isArray(translatedGroup)) {
            listItems.forEach((li, index) => {
                if (translatedGroup[index]) {
                    li.innerHTML = translatedGroup[index];
                }
            });
        }
    });
}

window.onload = async function () {
    await loadTranslations(); 

    // Check if there's a saved language in localStorage, otherwise default to Greek
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'gr';
    
    switchLanguage(savedLanguage); // Apply saved or default language
}
