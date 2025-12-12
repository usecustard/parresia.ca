function menuToggle(x) {

    var y = document.getElementsByClassName( 'dropdown-menu' );
    var dropdownMenu = y[0];

    x.classList.toggle( 'dropdown-open' );
    dropdownMenu.classList.toggle( 'dropdown-open' );

}


function closeDropDownMenu() {

    var dropdowns = document.getElementsByClassName( 'dropdown-menu' );
    var dropdownMenu = dropdowns[0];

    var toggles = document.getElementsByClassName( 'topbar__dropdown-toggle' );
    var toggle = toggles[0];

    dropdownMenu.classList.remove( 'dropdown-open' );
    toggle.classList.remove( 'dropdown-open' );
}


function scrollToTarget(e) {
    var dest = $( e ).attr( 'href' );
    var new_position = $( dest ).offset();
    $('html, body').stop().animate({ scrollTop: new_position.top }, 1000);
    closeDropDownMenu();
}

