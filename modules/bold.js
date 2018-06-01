'use strict';

var BoldModule = (function(){
    //insert html template
    let bold = document.createElement('button')
    bold.classList = "wysiwyg-item wysiwyg-button wysiwyg-tooltip";
    bold.setAttribute('id', 'bold');
    bold.innerHTML = `
                    <i class="fa fa-bold"></i>
                    <span class="wysiwyg-tooltiptext">Bold</span>`;
    document.getElementsByClassName('wysiwyg-bar')[0].append(bold);

    bold.addEventListener('click', execBold);

    function execBold(){
        document.getElementById('wysiwygInputArea').focus();
        document.execCommand('bold', false, null);
    }
})();
