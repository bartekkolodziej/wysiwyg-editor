'use strict';

var JustifyModule = (function () {
    //insert html template
    let justifyDD = document.createElement('div');
    justifyDD.className = 'wysiwyg-dropdown wysiwyg-item';
    justifyDD.setAttribute('id', 'justifyDD');
    justifyDD.innerHTML = `
                    <div class="wysiwyg-tooltip">
                        <i class="fas fa-align-center"></i> <i class="fas fa-caret-down"></i>
                        <span class="wysiwyg-tooltiptext">Justify</span>
                    </div>
                    <div class="wysiwyg-dropdown-content">
                        <button id="justifyCenter" class="wysiwyg-item-small wysiwyg-button"><i class="fas fa-sm fa-align-center"></i></button>
                        <button id="justifyLeft" class="wysiwyg-item-small wysiwyg-button"><i class="fas fa-sm fa-align-left"></i></button>
                        <button id="justifyRight" class="wysiwyg-item-small wysiwyg-button"><i class="fas fa-sm fa-align-right"></i></button>
                        <button id="justifyFull"  class="wysiwyg-item-small wysiwyg-button"><i class="fas fa-sm fa-align-justify"></i></button>
                    </div>`;
    document.getElementsByClassName('wysiwyg-bar')[0].append(justifyDD);


    //cache DOM
    let justifyButtons = [document.getElementById('justifyCenter'), document.getElementById('justifyLeft'), document.getElementById('justifyRight'), document.getElementById('justifyFull')]
    let dropdownContent = justifyDD.getElementsByClassName('wysiwyg-dropdown-content')[0];

    //add event listeners
    justifyDD.addEventListener('click', toggleDropdown)
    dropdownContent.addEventListener('click', function (e) {
        e.stopPropagation()
    });

    for (let button of justifyButtons) {
        button.addEventListener('click', justify.bind(button));
    }

    //functions
    function toggleDropdown(event){
        justifyDD.classList.toggle('wysiwyg-dropdown-active');
        event.stopPropagation();
    }

    function justify() {
        document.getElementById('wysiwygInputArea').focus();
        document.execCommand(this.getAttribute('id'), false, null);
        justifyDD.classList.remove('wysiwyg-dropdown-active');
    }

})();
