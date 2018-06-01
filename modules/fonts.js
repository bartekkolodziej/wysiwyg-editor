'use strict';

var ChangeFontSizeModule = (function () {
    //insert html template
    let fontSizesDD = document.createElement('div')
    fontSizesDD.classList = "wysiwyg-dropdown wysiwyg-item";
    fontSizesDD.setAttribute('id', 'fontSizesDD');
    fontSizesDD.innerHTML = `
                        <div class="wysiwyg-tooltip">
                             <i class="fas fa-font"></i> <i class="fas fa-arrows-alt-v"></i>
                            <span class="wysiwyg-tooltiptext">Change&nbspfont&nbspsize</span>
                        </div>
                        <div class="wysiwyg-dropdown-content" id="fontSizes"></div>`;
    document.getElementsByClassName('wysiwyg-bar')[0].append(fontSizesDD);

    //cache DOM
    let dropdownContent = fontSizesDD.getElementsByClassName('wysiwyg-dropdown-content')[0];

    //add event listeners
    fontSizesDD.addEventListener('click', toggleDropdown)
    dropdownContent.addEventListener('click', function (e) {
        e.stopPropagation()
    });



    //functions
    function toggleDropdown(event){
        fontSizesDD.classList.toggle('wysiwyg-dropdown-active');
        event.stopPropagation();
    }

    (function initFontSizesDD() { //fill drop down selection with 7 values and add event listeners
        let tmp = document.getElementById('fontSizes');
        if (tmp === null)
            return;
        for (let i = 1; i < 8; i++) {
            let div = document.createElement('div');
            div.classList.add('wysiwyg-font-size');
            div.innerHTML = i;
            div.addEventListener('click', function () {
                changeFontSize(i);
            });
            tmp.appendChild(div);
        }
    })();

    function changeFontSize(size) {
        for (let i of document.getElementsByClassName('wysiwyg-font-size')) {
            if (i.innerHTML == size)
                i.classList.add('wysiwyg-font-size-active');
            else
                i.classList.remove('wysiwyg-font-size-active');
        }

        document.getElementById('wysiwygInputArea').focus();
        document.execCommand('fontSize', false, size);
        fontSizesDD.classList.remove('wysiwyg-dropdown-active');
    }

})();
