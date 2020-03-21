const MENU_LINKS = document.querySelectorAll('#menu a');
const LEFT_PHONE = document.getElementById('screen-left');
const RIGHT_PHONE = document.getElementById('screen-right');
const FILTER = document.getElementById('filter');
const PORTFOLIO = document.getElementById('portfolio-images');
const FORM = document.getElementById('form');
const MESSAGE_BLOCK = document.getElementById('message-block');
const CLOSE = document.getElementById('close-button');

document.addEventListener('scroll', onScroll);

function onScroll(event) {
    const position = window.scrollY;
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('header');

    sections.forEach(el => {
        if (el.offsetTop - header.offsetHeight < position && el.offsetTop + el.offsetHeight >= position) {
            MENU_LINKS.forEach(a => {
                a.classList.remove('active-menu');
                if (el.getAttribute('id') === a.innerText.toLowerCase()) {
                    a.classList.add('active-menu');
                }
            })       
        }
    })
}


LEFT_PHONE.addEventListener('click', () => event.target.style.opacity = event.target.style.opacity == 0 ? 1 : 0);
RIGHT_PHONE.addEventListener('click', () => event.target.style.opacity = event.target.style.opacity == 0 ? 1 : 0);


FILTER.addEventListener('click', () => {
    if (event.target.tagName === 'BUTTON') {
        FILTER.querySelectorAll('button').forEach(el => el.classList.remove('active-filter'));
        event.target.classList.add('active-filter');
        shiftPortfolio();
    }
})

PORTFOLIO.addEventListener('click', () => {
    if (event.target.tagName === 'IMG') {
        PORTFOLIO.querySelectorAll('div').forEach(el => el.classList.remove('active-img'));
        const div = event.target.parentNode;
        div.classList.add('active-img');
    }
})

FORM.addEventListener('submit', (e) => {
    e.preventDefault();
    const subjectText = subject.value.length > 100 ? subject.value.substring(0, 100) + '...' : subject.value;
    const descriptionText = description.value.length > 100 ? description.value.substring(0, 100) + '...' : description.value;

    MESSAGE_BLOCK.classList.remove('hidden');
    document.getElementById('message-subject').innerText = subject.value ? 'Subject: ' + subjectText : 'Without subject';
    document.getElementById('message-dsc').innerText = description.value ? 'Description: ' + descriptionText : 'Without description';
})

CLOSE.addEventListener('click', () => {
    MESSAGE_BLOCK.classList.add('hidden');
    document.getElementById('form').reset();
});


function shiftPortfolio() {
    let first = PORTFOLIO.firstElementChild;
    let last = PORTFOLIO.lastElementChild;
    last.after(first);
}

/*SLIDER*/

let slides = document.querySelectorAll('.slider .slide');
let currentSlide = 0;
let isEnabled = true;

function changeCurrentSlide(n) {
    currentSlide = (n + slides.length) % slides.length;
}

function hideSlide(direction) {
    isEnabled = false;
    slides[currentSlide].classList.add(direction);
    slides[currentSlide].addEventListener('animationend', function () {
        this.classList.remove('active', direction);
    });
}

function showSlide(direction) {
    slides[currentSlide].classList.add('next', direction);
    slides[currentSlide].addEventListener('animationend', function () {
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnabled = true;
    });
}

function nextSlide(n) {
    hideSlide('to-left');
    changeCurrentSlide(n + 1);
    showSlide('from-right');
}

function previousSlide(n) {
    hideSlide('to-right');
    changeCurrentSlide(n - 1);
    showSlide('from-left');
}

document.querySelector('.control.next-button').addEventListener('click', function () {
    if (isEnabled) {
        previousSlide(currentSlide);
    }
});

document.querySelector('.control.prev-button').addEventListener('click', function () {
    if (isEnabled) {
        nextSlide(currentSlide);
    }
});