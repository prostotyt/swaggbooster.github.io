// Инициализация Telegram WebApp API
const tg = window.Telegram.WebApp;
tg.expand(); // Развернуть на весь экран телефона
tg.ready();

// Симуляция загрузки для премиального ощущения (1.5 секунды)
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        const appContent = document.getElementById('app-content');
        const appNav = document.getElementById('app-nav');
        
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        
        appContent.style.display = 'block';
        appNav.style.display = 'flex';
        
        // Скрываем спиннер полностью после анимации исчезновения
        setTimeout(() => { loadingScreen.style.display = 'none'; }, 500);
    }, 1500);
});

// Получение и подстановка данных пользователя
const user = tg.initDataUnsafe?.user;
if (user) {
    const fullName = user.first_name + (user.last_name ? ' ' + user.last_name : '');
    document.getElementById('tg-username').innerText = user.username ? `@${user.username}` : fullName;
    document.getElementById('tg-id').innerText = user.id;
    document.getElementById('ref-link').value = `https://t.me/SwaggBoosterBot?start=ref${user.id}`;
    
    // Подстановка первой буквы в аватарку
    const firstLetter = (user.first_name || 'U').charAt(0).toUpperCase();
    document.getElementById('avatar-letter').innerText = firstLetter;
} else {
    // Демонстрационные данные для тестирования в обычном браузере
    document.getElementById('tg-username').innerText = "@demo_user";
    document.getElementById('tg-id').innerText = "123456789";
    document.getElementById('avatar-letter').innerText = "D";
}

// Список цитат
const quotes = [
    "Стабильное соединение — залог эффективной работы.",
    "Оптимизация сетевых пакетов позволяет снизить задержку в играх.",
    "Безопасность передачи данных — наш главный приоритет.",
    "Ваша сетевая активность полностью анонимизирована.",
    "Оптимизатор распределяет трафик по наименее загруженным узлам."
];
document.getElementById('daily-quote').innerText = quotes[Math.floor(Math.random() * quotes.length)];

// Переключение вкладок
function switchTab(tabId, navElement) {
    // Легкая вибрация при нажатии на элемент меню
    if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('light');

    // Скрыть все вкладки
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Убрать активный статус со всех элементов меню
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    // Показать выбранную вкладку и сделать элемент активным
    document.getElementById(tabId).classList.add('active');
    
    if (navElement) {
        navElement.classList.add('active');
    } else {
        // Если переключение программное, ищем элемент по атрибуту
        const itemsArray = Array.from(navItems);
        const target = itemsArray.find(item => item.getAttribute('onclick').includes(tabId));
        if (target) target.classList.add('active');
    }
}

// Управление Бустером (Ускорителем)
let trafficInterval;
let trafficCount = 0;

function toggleBooster() {
    const isChecked = document.getElementById('booster-toggle').checked;
    const statsDiv = document.getElementById('booster-stats');
    const badge = document.getElementById('user-status-badge');
    const subStatus = document.getElementById('sub-status-text');
    
    if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('medium');

    if (isChecked) {
        statsDiv.classList.remove('hidden');
        // Изменяем циклический счетчик псевдо-трафика
        trafficInterval = setInterval(() => {
            trafficCount += Math.random() * 1.4;
            document.getElementById('stat-traffic').innerText = trafficCount.toFixed(1) + ' МБ';
            // Небольшие колебания пинга
            const mockPing = Math.floor(16 + Math.random() * 5);
            document.getElementById('stat-ping').innerText = mockPing + ' мс';
        }, 1000);
    } else {
        statsDiv.classList.add('hidden');
        clearInterval(trafficInterval);
    }
}

// Реферальная система
function copyRefLink() {
    const copyText = document.getElementById('ref-link');
    copyText.select();
    copyText.setSelectionRange(0, 99999); // Для мобильных устройств
    
    navigator.clipboard.writeText(copyText.value).then(() => {
        if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');
        tg.showAlert('Реферальная ссылка успешно скопирована!');
    }).catch(() => {
        tg.showAlert('Не удалось скопировать ссылку автоматически.');
    });
}

// Промокод
function applyPromo() {
    const promo = document.getElementById('promo-input').value.trim();
    if (!promo) return;
    
    if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('medium');
    tg.showAlert(`Промокод "${promo}" успешно отправлен на валидацию.`);
    document.getElementById('promo-input').value = '';
}

// Модальное Окно Оплаты (Чекаут карты)
function openPaymentModal(itemName, price) {
    if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('medium');
    
    document.getElementById('modal-item-name').innerText = itemName;
    document.getElementById('modal-item-price').innerText = price + ' ₽';
    document.getElementById('payment-modal').classList.add('active');
}

function closePaymentModal() {
    document.getElementById('payment-modal').classList.remove('active');
    document.getElementById('card-form').reset();
}

// Обработка платежа по карте
function processCardPayment(event) {
    event.preventDefault();
    const submitBtn = document.getElementById('pay-submit-btn');
    submitBtn.disabled = true;
    submitBtn.innerText = "Обработка платежа...";

    // Имитация задержки процессинга банка
    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerText = "Оплатить картой";
        closePaymentModal();
        
        if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');
        
        // Обновляем статус пользователя в UI после успешной оплаты
        document.getElementById('user-status-badge').innerText = "Премиум аккаунт";
        document.getElementById('user-status-badge').style.backgroundColor = "rgba(52, 199, 89, 0.15)";
        document.getElementById('user-status-badge').style.color = "#34c759";
        
        const subStatus = document.getElementById('sub-status-text');
        subStatus.innerText = "Активна";
        subStatus.className = "text-success";
        
        // Устанавливаем дату окончания подписки (текущая дата + 30 дней для примера)
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30);
        document.getElementById('sub-date').innerText = expiryDate.toLocaleDateString('ru-RU');
        
        tg.showAlert("Оплата прошла успешно! Ваш аккаунт обновлен.");
    }, 2500);
}

// Форматирование полей ввода карты
document.getElementById('card-number').addEventListener('input', function (e) {
    let target = e.target;
    let position = target.selectionEnd;
    let length = target.value.length;
    
    target.value = target.value.replace(/[^0-9]/g, '').replace(/(.{4})/g, '$1 ').trim();
    
    // Восстановление позиции курсора
    if (position !== length) {
        target.setSelectionRange(position, position);
    }
});

document.getElementById('card-expiry').addEventListener('input', function (e) {
    let target = e.target;
    target.value = target.value.replace(/[^0-9]/g, '');
    if (target.value.length > 2) {
        target.value = target.value.slice(0, 2) + '/' + target.value.slice(2, 4);
    }
});

// Настройки и Служебные методы
function updateSettingsInfo() {
    if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
}

function clearCache() {
    if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');
    tg.showAlert("Кэш приложения успешно очищен.");
}

function openSupport() {
    if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('medium');
    tg.showAlert("Открытие диалога со службой поддержки @SwaggBoosterSupport...");
}
