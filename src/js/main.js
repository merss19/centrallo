

let btnUrl = document.querySelectorAll('.block-bottom__url')
console.log(btnUrl)
btnUrl.addEventListener('mouseover',showTooltip)
btnUrl.addEventListener('mouseout',hideTooltip)
let checkTooltip = false



function hideTooltip(e){
    console.log(e.target)
    let target = e.target,
        parent = target.parentNode,
        tooltip = parent.querySelector('.tooltip')

    tooltip.style.display = 'none'
    checkTooltip = false
}

function showTooltip(e){
    console.log(e.target)
    let target = e.target,
        className = 'block-bottom__url',
        parent = target.parentNode,
        url = target.getAttribute('data-url'),
        tooltip = parent.querySelector('.tooltip'),
        checkBtn

    if (target.classList)
        checkBtn = target.classList.contains(className)
    else
        checkBtn= new RegExp('(^| )' + className + '( |$)', 'gi').test(target.className)

    if(checkBtn){
        console.log(11111111)
        if(!checkTooltip){
           /* console.log(222222222222)
            console.log(!!checkTooltip)
            tooltip ='<div class="tooltip">'
            tooltip +='<div class="tooltip__arrow"></div>'
            tooltip +='<div class="tooltip__inner">'+url +'</div></div>'

            parent.insertAdjacentHTML("afterBegin", tooltip);*/
            tooltip.style.display = 'inline-block'
            tooltip.querySelector('.tooltip__inner').innerHTML = url
            checkTooltip = true
        }



    }
    console.log(parent)
    console.log(checkBtn)
    console.log(tooltip)

  /*  console.log(url)
    console.log(tooltip)
    console.log(parent)
    console.log(checkBtn)
    console.log('checkBtn && !checkTooltip'+':'+(checkBtn && !checkTooltip))
    console.log('checkTooltip'+':'+checkTooltip)*/
}


