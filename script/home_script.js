//Display effect
const displayEffect = function()
{
    const menu = document.querySelectorAll('.game');
    menu.forEach((e, i) => {
        e.addEventListener('mousedown', function() {
            const amoutSpan = e.querySelectorAll("span");
            const allSpan = document.querySelectorAll("span:not(.choosed-game)");
            for(let i = 0; i < amoutSpan.length; i++)
            {
                amoutSpan[i].classList.add('choosed-game');
            }
            setTimeout(function() {
                for(let i = 0; i < allSpan.length; i++)
                {
                    allSpan[i].classList.add("remain-game");
                }
            }, 2000)
            clearTimeout();
            // allSpan.forEach(e => {
            //     console.log(e);
            //     // e.setAttribute()
            //     e.classList.add('choosed-game');
            // })
        })
    })
    
}

