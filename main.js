document.addEventListener("DOMContentLoaded", () => {
    initializeFilter();
    initializeBookingForm();
    initializeTimer();
});

// === 1. Фильтрация занятий ===
function initializeFilter() {
    const filterSelect = document.getElementById("type-filter");
    const scheduleItems = document.querySelectorAll(".schedule__item");

    filterSelect.addEventListener("change", () => {
        const selectedType = filterSelect.value;

        scheduleItems.forEach(item => {
            const matchesType = item.classList.contains(`schedule__item--${selectedType}`);
            item.style.display = (selectedType === "all" || matchesType) ? "block" : "none";
        });
    });
}

// === 2. Онлайн-запись на тренировку ===
function initializeBookingForm() {
    const bookingForm = document.querySelector(".booking__form");

    bookingForm.addEventListener("submit", event => {
        event.preventDefault(); // Отмена стандартного поведения формы

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const session = document.getElementById("session").value;
        const day = document.getElementById("day").value;
        const time = document.getElementById("time").value;

        console.log("Запись на тренировку:");
        console.log(`Имя: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Тренировка: ${session}`);
        console.log(`День: ${day}`);
        console.log(`Время: ${time}`);

        alert("Вы успешно записались на тренировку!");
        bookingForm.reset(); // Очистка формы после отправки
    });
}

// === 3. Таймер до следующего занятия ===
function initializeTimer() {
    const timerElement = document.getElementById("timer");

    function getNextSessionTime() {
        const now = new Date();
        const schedule = [
            { day: 1, time: "09:00" }, // Понедельник
            { day: 1, time: "10:00" },
            { day: 2, time: "11:00" }, // Вторник
            { day: 2, time: "12:00" },
            { day: 3, time: "08:00" }, // Среда
            { day: 3, time: "09:30" },
            { day: 4, time: "10:00" }, // Четверг
            { day: 4, time: "11:30" },
            { day: 5, time: "09:00" }, // Пятница
            { day: 5, time: "10:00" },
            { day: 6, time: "09:00" }, // Суббота
            { day: 6, time: "10:30" },
            { day: 0, time: "09:00" }, // Воскресенье
            { day: 0, time: "10:00" },
        ];

        return schedule.map(({ day, time }) => {
            const [hours, minutes] = time.split(":").map(Number);
            const sessionTime = new Date();
            sessionTime.setHours(hours, minutes, 0, 0);
            sessionTime.setDate(now.getDate() + ((day - now.getDay() + 7) % 7));
            return sessionTime;
        }).filter(sessionTime => sessionTime > now).sort((a, b) => a - b)[0] || null;
    }

    function updateTimer() {
        const nextSession = getNextSessionTime();
        if (!nextSession) {
            timerElement.textContent = "Нет предстоящих занятий";
            return;
        }

        const now = new Date();
        const diff = nextSession - now;
        const hours = String(Math.floor(diff / 3600000)).padStart(2, "0");
        const minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
        const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");

        timerElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    setInterval(updateTimer, 1000); // Обновление каждую секунду
}


document.addEventListener("DOMContentLoaded", () => {
    // === Уведомления о тренировках ===
    function checkTrainingSchedule() {
      const now = new Date();
      user.schedule.forEach((training) => {
        const trainingDate = new Date(training.date);
        const timeDifference = trainingDate - now;
  
        if (timeDifference > 0 && timeDifference < 3600000) {
          // Уведомление за 1 час до тренировки
          notifyUser(training);
        }
      });
    }
  
    function notifyUser(training) {
      const message = `Напоминание: через час начнется тренировка "${training.type}" в ${
        new Date(training.date).toLocaleTimeString()
      }`;
  
      // Проверка разрешений
      if (Notification.permission === "granted") {
        new Notification("FitPhysique", { body: message });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("FitPhysique", { body: message });
          }
        });
      }
  
      // Вывод на странице
      const progressSection = document.getElementById("progress");
      const notification = document.createElement("div");
      notification.className = "notification";
      notification.textContent = message;
      progressSection.appendChild(notification);
    }
  
    // Запуск проверки расписания каждые 5 минут
    setInterval(checkTrainingSchedule, 300000);
  
    // === Настройки уведомлений ===
    const notificationCheckbox = document.getElementById("notification");
    notificationCheckbox.addEventListener("change", (e) => {
      if (e.target.checked) {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            alert("Уведомления включены.");
          } else {
            alert("Уведомления не разрешены.");
            notificationCheckbox.checked = false;
          }
        });
      }
    });
  });
  


const menuBtn = document.getElementById("menu-btn");
const headerLinks = document.getElementById("header-links");
const menuBtnIcon = menuBtn.querySelector("i");
const bmiBtn = document.getElementById("btn-bmi");
const btnCal = document.getElementById("btn-cal");
const resultDiv = document.getElementById("result2");

menuBtn.addEventListener("click", () => {
    headerLinks.classList.toggle("open");
    const isOpen = headerLinks.classList.contains("open");
    menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

headerLinks.addEventListener("click", () => {
    headerLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
};

ScrollReveal().reveal(".bmi__title", scrollRevealOption);
ScrollReveal().reveal(".bmi__input", { ...scrollRevealOption, delay: 300 });
ScrollReveal().reveal(".btn", { ...scrollRevealOption, delay: 600 });
ScrollReveal().reveal(".sheet", { ...scrollRevealOption, delay: 900 });
ScrollReveal().reveal(".macro", { ...scrollRevealOption, delay: 900 });

const swiper = new Swiper('.client__swiper', {
    slidesPerView: 1, // По умолчанию 1 слайд
    spaceBetween: 20, // Расстояние между слайдами
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        // >= 320px
        320: {
            slidesPerView: 1, // 1 слайд на маленьких экранах
            spaceBetween: 10,
        },
        // >= 768px
        768: {
            slidesPerView: 2, // 2 слайда
            spaceBetween: 20,
        },
        // >= 1024px
        1024: {
            slidesPerView: 3, // 3 слайда
            spaceBetween: 30,
        },
        // >= 1200px
        1200: {
            slidesPerView: 4, // 4 слайда на больших экранах
            spaceBetween: 40,
        },
    },
});


bmiBtn.addEventListener("click", () => {
    const height = parseInt(document.getElementById("height").value);
    const weight = parseInt(document.getElementById("weight").value);
    const result = document.getElementById("output");

    let heightStatus = false, weightStatus = false;

    if (!height || isNaN(height) || height <= 0) {
        document.getElementById("height_error").innerText = "Пожалуйста, введите корректный рост";
    } else {
        document.getElementById("height_error").innerText = "";
        heightStatus = true;
    }

    if (!weight || isNaN(weight) || weight <= 0) {
        document.getElementById("weight_error").innerText = "Пожалуйста, введите корректный вес";
    } else {
        document.getElementById("weight_error").innerText = "";
        weightStatus = true;
    }

    if (heightStatus && weightStatus) {
        const bmi = (weight / ((height * height) / 10000)).toFixed(2);
        if (bmi < 18.5) {
            result.innerText = `Недостаточный вес: ${bmi}`;
        } else if (bmi > 25) {
            result.innerText = `Избыточный вес: ${bmi}`;
        } else {
            result.innerText = `Норма: ${bmi}`;
        }
    } else {
        result.innerText = "";
    }
});

btnCal.addEventListener("click", () => {
    const gender = document.getElementById("gender-2").value;
    const age = parseInt(document.getElementById("age-2").value, 10);
    const weight = parseFloat(document.getElementById("weight-2").value);
    const height = parseFloat(document.getElementById("height-2").value);
    const activity = parseFloat(document.getElementById("activity-2").value);

    if (isNaN(age) || isNaN(weight) || isNaN(height) || isNaN(activity)) {
        resultDiv.innerHTML = "<p class='error'>Пожалуйста, заполните все поля корректно.</p>";
        return;
    }

    let bmr;
    if (gender === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const dailyCalories = bmr * activity;
    resultDiv.innerHTML = `<p>Ваша суточная норма калорий: <strong>${dailyCalories.toFixed(2)}</strong> ккал.</p>`;
});

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex'; // Показываем модальное окно
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none'; // Скрываем модальное окно
    }
}

// Обработчик клика по фону
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach((modal) => {
        if (event.target === modal.querySelector('.modal__background')) {
            closeModal(modal.id); // Закрываем модальное окно при клике на фон
        }
    });
};