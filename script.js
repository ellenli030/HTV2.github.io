(function() {
    $('.navbar-nav > li > a').on('click', function(){
        $('.navbar-collapse').collapse('hide');
    });

    // init smooth scroll
    new SmoothScroll('a[href*="#"]');

    // make navbar transparent if at top of page
    $(window).on('scroll', onScroll);

    // trigger event so if the page is loaded somewhere else than the top the navbar updates
    onScroll();
})();

function onScroll() {
    var scroll = $(window).scrollTop();
    var documentHeight = $(window).height();

    if (scroll > 100)
        $('#site-navigation').removeClass('nav-top');
    else
        $('#site-navigation').addClass('nav-top');

    var $elements = [];

    // get all scrollreveal elements that weren't animated yet
    $('.scrollreveal:not(.revealed)').each(function () {
        var $self = $(this);
        var top = $self.offset().top;
        var height = $self.height();

        if (top < scroll + documentHeight && scroll + documentHeight < top + height)
            // only animate if whole element isn't in viewport (indicating page was refreshed at a certain position)
            $elements.push($self);
        else if (scroll + documentHeight > top + height)
            // reveal immediately if element is completely in viewport
            $self.css('visibility', 'visible').addClass('revealed')
    });

    // iterate through elements that should be animated
    for (var i = 0; i < $elements.length; i++) {
        var $self = $elements[i];
        var animationName = $self.data('animation-name');
        var delay = 100;

        // show element
        $self.css('visibility', 'visible');

        // add delay between elements being revealed at the same time
        $self.css({ 'animation-name': animationName, 'animation-delay': i * delay + 'ms' });
        $self.addClass('animated revealed');
    }
}