(function ($) {
    "use strict";

    // Initiate the wowjs
    new WOW().init();


    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 24,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            992:{
                items:2
            }
        }
    });


    // Mailto forms (static site, no backend: opens the visitor's email
    // client pre-filled instead of actually submitting anywhere)
    document.querySelectorAll('form[data-mailto]').forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var to = form.getAttribute('data-mailto');
            var defaultSubject = form.getAttribute('data-subject') || 'New message from The Leabridge School website';
            var subject = defaultSubject;
            var lines = [];
            form.querySelectorAll('input, textarea').forEach(function (field) {
                if (!field.id) return;
                var labelEl = form.querySelector('label[for="' + field.id + '"]');
                var label = labelEl ? labelEl.textContent.trim() : (field.placeholder || field.id);
                var value = field.value.trim();
                if (field.id === 'subject' && value) {
                    subject = value;
                    return;
                }
                lines.push(label + ': ' + (value || '(not provided)'));
            });
            var mailto = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
            window.location.href = mailto;
        });
    });


    // Gallery filter
    var galleryFilterButtons = document.querySelectorAll('.gallery-filter [data-filter]');
    var galleryItems = document.querySelectorAll('.gallery-item');
    galleryFilterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            galleryFilterButtons.forEach(function (b) {
                b.classList.remove('btn-primary');
                b.classList.add('btn-outline-primary');
            });
            btn.classList.remove('btn-outline-primary');
            btn.classList.add('btn-primary');
            var filter = btn.getAttribute('data-filter');
            galleryItems.forEach(function (item) {
                var show = filter === 'all' || item.getAttribute('data-category') === filter;
                item.closest('.gallery-col').classList.toggle('d-none', !show);
            });
        });
    });

    // Gallery lightbox
    var galleryModal = document.getElementById('galleryModal');
    if (galleryModal) {
        galleryModal.addEventListener('show.bs.modal', function (event) {
            var trigger = event.relatedTarget;
            var img = trigger.querySelector('img');
            var modalImg = galleryModal.querySelector('.modal-body img');
            modalImg.src = img.getAttribute('src');
            modalImg.alt = img.getAttribute('alt');
        });
    }

})(jQuery);

