function createRipple(event) {
    const element = event.currentTarget;

    const circle = document.createElement('span');
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - element.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - element.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');

    const ripple = element.getElementsByClassName('ripple')[0];

    if (ripple) {
        ripple.remove();
    }

    element.appendChild(circle);
}

// Example usage: 
// document.querySelectorAll('.ripple-btn').forEach(btn => {
//     btn.addEventListener('click', createRipple);
// });
