$(function () {
    function setBodyClass() {
        let activeLink = $('#scrollspy').children('.active'),
            bodyClass = 'color-palette-' + activeLink.index();

        $('body').removeClass().addClass(bodyClass);
    }

    setBodyClass();

    $(window).on('activate.bs.scrollspy', event => {
        setBodyClass();
    });

    $('#scrollspy').on('click', event => {
        let scrollTarget = $(event.target).attr('href');

        if (!scrollTarget) {
            return;
        }

        $('html, body').animate({
            scrollTop: $(scrollTarget).offset().top
        }, 'slow');
    });
});

