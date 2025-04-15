import ipads from '../data/ipads.js';
import navigations from '../data/navigations.js';

// 장바구니
const basketStarterEl = document.querySelector('header .basket-starter');
const basketEl = basketStarterEl.querySelector('.basket');

basketStarterEl.addEventListener('click', function (e) {
  e.stopPropagation();
  let isShow = basketEl.classList.contains('show');

  if (isShow) {
    hideBasket();
  } else {
    showBasket();
  }
});

basketEl.addEventListener('click', function (e) {
  e.stopPropagation();
});

window.addEventListener('click', function () {
  hideBasket();
});

function showBasket() {
  basketEl.classList.add('show');
}
function hideBasket() {
  basketEl.classList.remove('show');
}

// 검색
const headerEl = document.querySelector('header');
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')];
const searchWrapEl = headerEl.querySelector('.search-wrap');
const searchStarterEl = headerEl.querySelector('.search-starter');
const searchCloserEl = searchWrapEl.querySelector('.search-closer');
const searchShadowEl = searchWrapEl.querySelector('.shadow');
const searchInputEl = searchWrapEl.querySelector('input');
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')];

searchStarterEl.addEventListener('click', showSearch);
searchCloserEl.addEventListener('click', function (e) {
  e.stopPropagation();
  hideSearch();
});
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

menuStarterEl.addEventListener('click', function () {
  let isOpen = headerEl.classList.contains('menu-on');

  if (isOpen) {
    headerEl.classList.remove('menu-on');
    searchInputEl.value = '';
    playScroll();
  } else {
    headerEl.classList.add('menu-on');
    stopScroll();
  }
});

function stopScroll() {
  document.documentElement.classList.add('fixed');
}
function playScroll() {
  document.documentElement.classList.remove('fixed');
}

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

// PC, 태블릿 <-> 모바일 반응 충돌 처리
window.addEventListener('resize', function () {
  if (window.innerWidth <= 740) {
    headerEl.classList.remove('searching');
    playScroll();
  } else {
    headerEl.classList.remove('searching--mobile', 'menu-on');
    playScroll();
  }
});

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

playBtn.addEventListener('click', function () {
  video.play();
  playBtn.classList.add('hide');
  pauseBtn.classList.remove('hide');
});
pauseBtn.addEventListener('click', function () {
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
const navigationsEl = document.querySelector('footer .navigations');

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
    </h3>
    <ul>
      ${mapList}
    </ul>
  `

  navigationsEl.append(mapEl);
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