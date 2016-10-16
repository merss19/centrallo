

const userPage = {
    init: function(){

        let btnsTooltip = document.querySelectorAll('.block-bottom__url'),
            btnsClose = document.querySelectorAll('.js-btn-close'),
            btnsModal = document.querySelectorAll('.js-modal-btn'),
            gridPhoto = document.querySelector('.photo-block__list')


        if(btnsTooltip.length !== 0){
            userPage.tooltip(btnsTooltip)
        }

        if(btnsClose.length !== 0){
            userPage.close(btnsClose)
        }

        if(btnsModal .length !== 0){
            userPage.modal(btnsModal)
        }

        if(gridPhoto){
            userPage.isotop(gridPhoto)
        }
    }
    ,
    modal : function(btnsModal) {

        function openModal() {

            let modal = document.querySelector('.modal'),
                overlay = document.querySelector('.overlay'),
                close = document.querySelector('.js-modal-close')

            overlay.style.display = 'block'
            modal.style.display = 'block'

            function  closeModal(){
                overlay.style.display = 'none'
                modal.style.display = 'none'

                overlay.removeEventListener('click', closeModal)
                close.removeEventListener('click', closeModal)
            }

            overlay.addEventListener('click', closeModal)
            close.addEventListener('click', closeModal)

            window.onresize = () =>{
                let width = window.innerWidth

                if(width > 768){
                    closeModal()
                }

            }



        }

        Array.prototype.forEach.call(btnsModal, (btn) => {
            btn.addEventListener('click', openModal)

        })


    },

    close : function(btnsClose){

        function closeBlock(){

            function closest(target, selector) {

                while (target) {
                    if (target.matches(selector)) return target
                    target = target.parentNode;
                }

                return null;
            }

            let block = closest(this, '.js-block-close')

            block.style.display = 'none'

        }

        Array.prototype.forEach.call(btnsClose, function(btn) {
            btn.addEventListener('click', closeBlock)

        })

    },

    isotop : (gridPhoto) => {

           new Isotope( gridPhoto, {
            // options...
            itemSelector: '.photo-block__item',
            masonry: {
                columnWidth:2
            }
        });
    },

    tooltip : function(btns){

        function hideTooltip(e){

            let target = e.target,
                parent = target.parentNode,
                tooltip = parent.querySelector('.tooltip')

            tooltip.style.display = 'none'

        }

        function showTooltip(e){

            let target = e.target,
                className = 'block-bottom__url',
                parent = target.parentNode,
                url = target.getAttribute('data-url'),
                tooltip = parent.querySelector('.tooltip'),
                checkBtn

            if (target.classList){
                checkBtn = target.classList.contains(className)
            }
            else{
                checkBtn= new RegExp('(^| )' + className + '( |$)', 'gi').test(target.className)
            }


            if(checkBtn){

                tooltip.style.display = 'inline-block'
                tooltip.querySelector('.tooltip__inner').innerHTML = url


            }
        }

        Array.prototype.forEach.call(btns, function(btn){
            btn.addEventListener('mouseover',showTooltip)
            btn.addEventListener('mouseout',hideTooltip)


        });
    }


}

userPage.init()






