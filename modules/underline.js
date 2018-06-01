'use strict';

var UnderlineModule = (function(){
    //insert html template
    let underline = document.createElement('button')
    underline.classList = "wysiwyg-item wysiwyg-button wysiwyg-tooltip";
    underline.setAttribute('id', 'underline');
    underline.innerHTML = `
                    <i class="fa fa-underline"></i>
                    <span class="wysiwyg-tooltiptext">Underline</span>`;
    document.getElementsByClassName('wysiwyg-bar')[0].append(underline);

    underline.addEventListener('click', execUnderline);

    function execUnderline(){
        document.getElementById('wysiwygInputArea').focus();
        document.execCommand('underline', false, null);
    }
})();
