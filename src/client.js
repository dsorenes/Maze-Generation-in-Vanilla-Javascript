
const slider = document.querySelector('#slider');

slider.addEventListener('change', (e) => {
    document.querySelector('#output').innerHTML = slider.value;
});