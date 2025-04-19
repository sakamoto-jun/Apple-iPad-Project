import ipads from '../data/ipads.js';
import navigations from '../data/navigations.js';

// PLAN: 추후 함수형태로 리팩토링

// 장바구니
const basketStarterEl = document.querySelector('header .basket-starter');
const basketEl = basketStarterEl.querySelector('.basket');

basketStarterEl.addEventListener('click', function (e) {
  e.stopPropagation();
  basketEl.classList.toggle('show');
});

basketEl.addEventListener('click', function (e) {
  e.stopPropagation();
});

// 검색
const headerEl = document.querySelector('header');
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')];
const searchWrapEl = headerEl.querySelector('.search-wrap');
const searchStarterEl = headerEl.querySelector('.search-starter');
const searchCloserEl = searchWrapEl.querySelector('.search-closer');
const searchShadowEl = searchWrapEl.querySelector('.shadow');
const searchInputEl = searchWrapEl.querySelector('input');
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')];

searchWrapEl.addEventListener('click', function (e) {
  e.stopPropagation();
});

searchStarterEl.addEventListener('click', showSearch);
searchCloserEl.addEventListener('click', hideSearch);
searchShadowEl.addEventListener('click', hideSearch);

function showSearch() {
  headerEl.classList.add('searching');
  stopScroll();
  [...headerMenuEls].reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * 0.4 / headerMenuEls.length + 's'
  });
  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = index * 0.4 / headerMenuEls.length + 's'
  });
  setTimeout(function () {
    searchInputEl.focus()
  }, 600);
}
function hideSearch() {
  headerEl.classList.remove('searching');
  playScroll();
  headerMenuEls.forEach(function (el, index) {
    el.style.transitionDelay = index * 0.4 / headerMenuEls.length + 's'
  });
  [...searchDelayEls].reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * 0.4 / headerMenuEls.length + 's'
  });
  searchInputEl.value = '';
}

// 헤더 메뉴 토글 (Mobile)
const menuStarterEl = headerEl.querySelector('.menu-starter');

menuStarterEl.addEventListener('click', function (e) {
  e.stopPropagation();
  let isOpen = headerEl.classList.contains('menu-on');

  if (isOpen) {
    headerEl.classList.remove('menu-on');
    searchInputEl.value = '';
    playScroll();
  } else {
    headerEl.classList.add('menu-on');
    basketEl.classList.remove('show');
    stopScroll();
  }
});

// 헤더 검색 (Mobile)
const searchTextFieldEl = searchWrapEl.querySelector('.textfield');
const searchCancelerEl = searchWrapEl.querySelector('.search-canceler');

searchTextFieldEl.addEventListener('click', function () {
  headerEl.classList.add('searching--mobile');
  searchInputEl.focus();
});
searchCancelerEl.addEventListener('click', function () {
  headerEl.classList.remove('searching--mobile');
});

// 네비 메뉴 토글 (Mobile)
const navEl = document.querySelector('nav');
const navMenuTogglerEl = navEl.querySelector('.menu-toggler');
const navMenuShadowEl = navEl.querySelector('.shadow');

navEl.addEventListener('click', function (e) {
  e.stopPropagation();
});
navMenuTogglerEl.addEventListener('click', function () {
  navEl.classList.toggle('menu-on');
});
navMenuShadowEl.addEventListener('click', function () {
  navEl.classList.remove('menu-on');
});

// Window 이벤트 처리 - 클릭
window.addEventListener('click', function () {
  // console.log('윈도우 클릭!');
  if (basketEl.classList.contains('show')) {
    basketEl.classList.remove('show');
  }
  if (navEl.classList.contains('menu-on')) {
    navEl.classList.remove('menu-on');
  }
});
// Window 이벤트 처리 - PC, 태블릿 <-> 모바일 반응 충돌 처리
window.addEventListener('resize', function () {
  if (window.innerWidth <= 740) {
    headerEl.classList.remove('searching');
    playScroll();
  } else {
    headerEl.classList.remove('searching--mobile', 'menu-on');
    playScroll();
  }
});

// 스크롤 제어 함수
function stopScroll() {
  document.documentElement.classList.add('fixed');
}
function playScroll() {
  document.documentElement.classList.remove('fixed');
}

// Info 요소 Intersectiong Observing
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add('show');
  });
});

const infoEls = document.querySelectorAll('.info');
infoEls.forEach(function (el) {
  io.observe(el);
});

// 비디오 Play, Pause
const video = document.querySelector('.stage .video-wrap video');
const playBtn = document.querySelector('.stage .controller--play');
const pauseBtn = document.querySelector('.stage .controller--pause');

playBtn.addEventListener('click', function (e) {
  e.stopPropagation();
  video.play();
  playBtn.classList.add('hide');
  pauseBtn.classList.remove('hide');
});
pauseBtn.addEventListener('click', function (e) {
  e.stopPropagation();
  video.pause();
  pauseBtn.classList.add('hide');
  playBtn.classList.remove('hide');
});

// iPad 제품 비교
const itemsEl = document.querySelector('.compare .items');

ipads.forEach(function (ipad) {
  const itemEl = document.createElement('div');
  itemEl.classList.add('item');

  let colorList = '';
  ipad.colors.forEach(function (color) {
    colorList += `<li style= "background-color: ${color};"></li>`
  });

  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}">
    </div>
    <ul class="colors">${colorList}</ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">
      ${ipad.price.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })} ~
    </p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `;

  itemsEl.append(itemEl);
});

// 푸터 네비게이션
const footerNavigationsEl = document.querySelector('footer .navigations');

navigations.forEach(function (navigation) {
  const mapEl = document.createElement('div');
  mapEl.classList.add('map');

  let mapList = '';
  navigation.maps.forEach(function (map) {
    mapList += /* html */`
      <li>
        <a href="${map.url}">${map.name}</a>
      </li>
    `;
  });

  mapEl.innerHTML = /* html */ `
    <h3>
      <span class="text">${navigation.title}</span>
      <span class="icon">+</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `

  footerNavigationsEl.append(mapEl);
});

const mapEls = footerNavigationsEl.querySelectorAll('.map');

mapEls.forEach(function (el) {
  const mapTitleEl = el.querySelector('h3');

  const toggleHandler = function (e) {
    e.stopPropagation();
    el.classList.toggle('active');
  };

  if (window.innerWidth <= 740) {
    mapTitleEl.addEventListener('click', toggleHandler);
  } else {
    mapTitleEl.removeEventListener('click', toggleHandler);
  }
});

// 년도 가져오기
const thisYearEl = document.querySelector('span.this-year');
thisYearEl.textContent = new Date().getFullYear();

// HTML 문서 언어 가져오기
const localeEl = document.querySelector('.locale');
const htmlLang = document.documentElement.lang;

if (htmlLang === 'ko') {
  localeEl.textContent = '대한민국';
}