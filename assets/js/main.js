const saluta = () => console.log('Hello Davide');

/* TYPEWRITER EFFECT */
class TxtType {
  constructor(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  }
  tick() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  }
}

window.onload = function () {
  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement('style');
  css.type = 'text/css';
  css.innerHTML = '.typewrite > .wrap { border-right: 0.08em solid #6cace0}';
  document.body.appendChild(css);
};

/* SWIPER */
let swiperProjects = new Swiper('.projects_container', {
  loop: true,
  spaceBetween: 24,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
  },
  breakpoints: {
    1200: {
      slidesPerView: 2,
      spaceBetween: -56,
    },
  },
});

/**  MOBILE MENU REVEAL */
const menu = document.getElementById('nav-menu'),
  toggle = document.getElementById('nav-toggle'),
  close = document.getElementById('nav-close'),
  links = document.querySelectorAll('.nav_link');

toggle.addEventListener('click', () => {
  menu.classList.add('show-menu');
});

close.addEventListener('click', () => {
  menu.classList.remove('show-menu');
});

const linkAction = () => {
  menu.classList.remove('show-menu');
};
links.forEach((link) => link.addEventListener('click', linkAction));

/**  DESKTOP MENU STICK*/
const scrollHeader = () => {
  const header = document.getElementById('header');
  // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  this.scrollY >= 50
    ? header.classList.add('bg-header')
    : header.classList.remove('bg-header');
};
window.addEventListener('scroll', scrollHeader);

/** DARK \ LIGHT THEME TOGGLE */
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = `fa-sun`;

// Check in localStorage previuosly theme selected
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? `far fa-moon` : `far fa-sun`;

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](
    darkTheme
  );
  themeButton.classList[selectedIcon === `far fa-moon` ? 'add' : 'remove'](
    iconTheme
  );
}

themeButton.addEventListener('click', () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());
});

/************************* CONTACT FORM *************************/
const contactForm = document.getElementById('contact-form'),
  contactName = document.getElementById('name'),
  contactEmail = document.getElementById('email'),
  contactText = document.getElementById('textarea'),
  contactMessage = document.getElementById('message');

const sendEmail = (e) => {
  e.preventDefault();

  // Basic Validation

  if (
    contactName.value.trim() === '' ||
    contactEmail.value.trim() === '' ||
    contactText.value.trim() === ''
  ) {
    // add and remove color
    contactMessage.classList.remove('color-blue');
    contactMessage.classList.add('color-red');

    // Show Message
    contactMessage.textContent = 'PLEASE, WRITE EVERY INPUT FIELD';
  } else {
    // serviceID - templateID - #form - publicKey
    emailjs
      .sendForm(
        'service_hlyjwv9',
        'template_6mje0gc',
        '#contact-form',
        'ooafE1Q66qryTyeXi'
      )
      .then(
        () => {
          contactMessage.classList.add('color-blue');
          contactMessage.textContent = 'THE MESSAGE HAS BEEN SUCCESSFULLY SENT';

          setTimeout(() => {
            contactMessage.textContent = '';
          }, 5000);
        },
        (error) => {
          alert('OPS! SOMETHING WENT WRONG', error);
        }
      );

    // cleaning up form
    contactName.value = '';
    contactEmail.value = '';
    contactText.value = '';
  }
};

contactForm.addEventListener('submit', sendEmail);

/************************* FOOTER DATE YEAR *************************/
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();

/************************* SCROLL UP *************************/
const scrollUp = () => {
  const scrollUpBtn = document.getElementById('scrollup');

  window.scrollY >= 350
    ? scrollUpBtn.classList.add('show-scroll')
    : scrollUpBtn.classList.remove('show-scroll');
};

window.addEventListener('scroll', scrollUp);

/************************* REVEALING *************************/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 400,
  // reset: true /* Animations repeat */,
});

sr.reveal(`.home_data, .projects_container, .footer_container`);
sr.reveal(`.home_info div`, { delay: 600, origin: 'bottom', interval: 100 });
// sr.reveal(`.home_info div`, { delay: 600, origin: 'bottom', interval: 100 });
sr.reveal(`.skill_item:nth-child(even)`, { origin: 'left' });
sr.reveal(`.skill_item:nth-child(odd)`, { origin: 'right' });
sr.reveal(`.contact_content:nth-child(1)`, { origin: 'left' });
sr.reveal(`.contact_content:nth-child(2)`, { origin: 'right' });
sr.reveal(`.services_card`, { interval: 100 });
