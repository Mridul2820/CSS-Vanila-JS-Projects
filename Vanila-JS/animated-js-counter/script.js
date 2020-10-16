const counters = document.querySelectorAll('.counter');
const spreed = 200;

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;

        const inc = target/spreed;

        // console.log(count);

        if(count < target) {
            counter.innerHTML = Math.ceil(count + inc);
            setTimeout(updateCount, 1);
        }
        else {
            count.innerText = target;
        }
    }

    updateCount();
})