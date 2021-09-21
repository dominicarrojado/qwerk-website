/*--------------------------------------------------------------
 MOBILE SIDEBAR
 --------------------------------------------------------------*/

function showMobileSidebar() {
  var mobileSidebar = document.getElementById('mobileSidebar');

  if (!mobileSidebar) return;

  mobileSidebar.style.display = 'block';
  document.body.classList.add('is-mobile-overlay-active');

  setTimeout(function () {
    mobileSidebar.classList.add('show');
  }, 100);
}

function hideMobileSidebar() {
  var mobileSidebar = document.getElementById('mobileSidebar');

  if (!mobileSidebar) return;

  mobileSidebar.classList.remove('show');

  setTimeout(function () {
    mobileSidebar.style.display = '';
    document.body.classList.remove('is-mobile-overlay-active');
  }, 300);
}

var mobileSidebarBtn = document.getElementById('mobileSidebarBtn');

if (mobileSidebarBtn) {
  mobileSidebarBtn.addEventListener('click', showMobileSidebar);
}

var closeMobileSidebarBtn = document.getElementById('closeMobileSidebarBtn');

if (closeMobileSidebarBtn) {
  closeMobileSidebarBtn.addEventListener('click', hideMobileSidebar);
}

/*--------------------------------------------------------------
 NAVBAR
 --------------------------------------------------------------*/

var stickNavbar = {
  lastScrollTop: 0,
  scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
  goingDown: false,
  range: 0,
  isFixed: false,
  isHidden: true,

  autoHideScroll: function () {
    var self = this;
    var currentScrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    var headerMarketing = document.getElementById('headerMarketing');

    // Check if to fix the header or not
    if (currentScrollTop >= 40 && !self.isFixed) {
      headerMarketing.classList.add('fixed');
      self.isFixed = true;
    } else if (currentScrollTop < 40 && self.isFixed) {
      headerMarketing.classList.remove('fixed');
      headerMarketing.classList.remove('show');
      self.isFixed = false;
      return;
    }

    // Check if scroll changes direction (up or down)
    if (
      (currentScrollTop > self.lastScrollTop && !self.goingDown) ||
      (currentScrollTop < self.lastScrollTop && self.goingDown)
    ) {
      self.scrollTop = currentScrollTop;
      self.goingDown = !self.goingDown;
      self.range = 0;
    } else {
      self.range = self.goingDown
        ? currentScrollTop - self.scrollTop
        : self.scrollTop - currentScrollTop;
    }

    // Check the range of scroll
    if (self.range > 10) {
      if (!self.goingDown && self.isHidden) {
        headerMarketing.classList.add('show');
        self.isHidden = false;
      } else if (self.goingDown && !self.isHidden) {
        headerMarketing.classList.remove('show');
        self.isHidden = true;
      }
    }

    self.lastScrollTop = currentScrollTop;
  },
};

window.onscroll = function windowOnScroll() {
  stickNavbar.autoHideScroll();
};

/*--------------------------------------------------------------
 JQUERY
 --------------------------------------------------------------*/

$(document).ready(function () {
  /*--------------------------------------------------------------
     SCROLL TO ELEMENT
     --------------------------------------------------------------*/

  $('.faq-nav-item').on('click', function (event) {
    event.preventDefault();

    var currentScrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    if (currentScrollTop > 0) {
      $('html, body').animate(
        { scrollTop: $('#faq-content').offset().top - 150 },
        800
      );
    }
  });
});
