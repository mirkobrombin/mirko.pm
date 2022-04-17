function toggleReveal() {
    let reveals = document.querySelectorAll('.reveal');
    reveals.forEach(reveal => {
        let expand = reveal.querySelector('.expand button');
        expand.addEventListener('click', () => {
            let status = reveal.classList.contains('show');
            reveal.classList.toggle('show');
            expand.innerHTML = !status ? 'Collapse text <ion-icon name="chevron-up-outline"></ion-icon>' : 'Expand text <ion-icon name="chevron-down-outline"></ion-icon>';
        });
    });
}

function toggleDropdown() {
    let dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        let button = dropdown.querySelector('button');
        let ul = dropdown.querySelector('ul');
        button.addEventListener('click', () => {
            let status = ul.classList.contains('show');
            let ionIcon = button.querySelector('ion-icon');
            ul.classList.toggle('show');
            ul.classList.toggle('card');
            ionIcon.name = !status ? 'chevron-up-outline' : 'chevron-down-outline';
        });
    });
}

function toggleNav() {
    let toggle = document.querySelector('.menu-toggle');
    let nav = document.querySelector('nav');
    toggle.addEventListener('click', () => {
        let status = nav.classList.contains('show');
        nav.classList.toggle('show');
        nav.classList.toggle('card');
        toggle.innerHTML = !status ? '<ion-icon name="close-outline"></ion-icon>' : '<ion-icon name="menu-outline"></ion-icon>';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    toggleReveal();
    toggleDropdown();
    toggleNav();
});