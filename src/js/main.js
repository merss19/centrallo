

const userPage = {
    init: function(){
        console.log('init')

        let btnsTooltip = document.querySelectorAll('.block-bottom__url'),
            btnsClose = document.querySelectorAll('.js-btn-close'),
            btnsModal = document.querySelectorAll('.js-modal-btn')


        if(btnsTooltip.length != 0){
            userPage.tooltip(btnsTooltip)
        }

        if(btnsClose.length != 0){
            userPage.close(btnsClose)
        }

        if(btnsModal .length != 0){
            userPage.modal(btnsModal)
        }
    },
    modal : function(btnsModal) {
        console.log('modal')

        Array.prototype.forEach.call(btnsModal, (btn, i) => {
            btn.addEventListener('click', openModal)

        })


        function openModal(e) {
            console.log('clickmodal')
            let modal = document.querySelector('.modal'),
                feedback = document.querySelector('.modal__inner'),
                overlay = document.querySelector('.overlay'),
                close = document.querySelector('.js-modal-close')

            overlay.style.display = 'block'
            modal.style.display = 'block'

            overlay.addEventListener('click', closeModal)
            close.addEventListener('click', closeModal)

            window.onresize = () =>{
                let width = window.innerWidth
                if(width > 768){
                    closeModal()
                }
                console.log(window.innerWidth)
            }

            function  closeModal(){
                console.log('closeModal')

                overlay.style.display = 'none'
                modal.style.display = 'none'

                overlay.removeEventListener('click', closeModal)
                close.removeEventListener('click', closeModal)
            }


        }
    },

    close : function(btnsClose){
        console.log(' close')

        Array.prototype.forEach.call(btnsClose, function(btn, i) {
            btn.addEventListener('click', closeBlock)

        })

        function closeBlock(e){

            function closest(target, selector) {
                console.log('closest')
                while (target) {
                    console.log(target)
                    if (target.matches(selector)) return target;
                    target = target.parentNode;
                }

                return null;
            }

            let block = closest(this, '.js-block-close')

            block.style.display = 'none'

        }
    },

    tooltip : function(btns){
        console.log('tooltip')
        Array.prototype.forEach.call(btns, function(btn, i){
            btn.addEventListener('mouseover',showTooltip)
            btn.addEventListener('mouseout',hideTooltip)

            function hideTooltip(e){
                console.log('hideTooltip')
                let target = e.target,
                    parent = target.parentNode,
                    tooltip = parent.querySelector('.tooltip')

                tooltip.style.display = 'none'

            }

            function showTooltip(e){
                console.log('showTooltip')
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

                    tooltip.style.display = 'inline-block'
                    tooltip.querySelector('.tooltip__inner').innerHTML = url


                }
            }
        });
    }


}

userPage.init()

var grid = document.querySelector('.photo-block__list');
var iso = new Isotope( grid, {
    // options...
    itemSelector: '.photo-block__item',
    masonry: {
        columnWidth:2
    }
});



