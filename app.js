const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

// Динамические цитаты геймеров/бустеров
const quotes = [
    "Пинг — это иллюзия, буст — это реальность. 🧘‍♂️",
    "Не лагает, а тактическая пауза. 🛑",
    "Твой провайдер плачет, когда ты включаешь наш буст. 😈",
    "Каждая миллисекунда на счету! ⏱️",
    "Меньше пинг — больше фрагов. Факт. 🎯",
    "Говорят, с нашим бустом пули летят быстрее... 🤫"
];

// Устанавливаем рандомную цитату при загрузке
document.getElementById('daily-quote').innerText = quotes[Math.floor(Math.random() * quotes.length)];

const user = tg.initDataUnsafe?.user;

if (user) {
    document.getElementById('tg-username').innerText = user.first_name || user.username;
    document.getElementById('tg-id').innerText = user.id;
} else {
    document.getElementById('tg-username').innerText = 'Неизвестный Снайпер';
    document.getElementById('tg-id').innerText = '777888';
}

function switchTab(tabId, navElement = null) {
    // Добавляем вибрацию при переключении (ощущение нативных эппл кнопок)
    tg.HapticFeedback.impactOccurred('light');

    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');

    if (navElement) {
        navElement.classList.add('active');
    } else {
        const targetNav = Array.from(navItems).find(item => item.getAttribute('onclick').includes(tabId));
        if (targetNav) targetNav.classList.add('active');
    }
}

function copyRef() {
    const refInput = document.getElementById('ref-link');
    refInput.select();
    refInput.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(refInput.value).then(() => {
        tg.HapticFeedback.notificationOccurred('success');
        tg.showAlert('Ссылка в буфере! Отправь её кентам 🚀');
    });
}

// Пасхалка (Прикол)
let eggClicks = 0;
function easterEgg() {
    eggClicks++;
    if (eggClicks === 3) {
        tg.HapticFeedback.impactOccurred('heavy');
    }
    if (eggClicks === 5) {
        tg.HapticFeedback.notificationOccurred('warning');
        tg.showAlert('Ого, ты нашел пасхалку! Держи виртуальную пятюню 🖐️ Теперь иди тащи катку!');
        eggClicks = 0; // сбрасываем
    }
}