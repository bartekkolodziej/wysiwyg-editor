'use strict';

var RemoveFormatModule = (function(){
    //insert html template
    let removeFormat = document.createElement('button')
    removeFormat.classList = "wysiwyg-item wysiwyg-button wysiwyg-tooltip";
    removeFormat.setAttribute('id', 'removeFormat');
    removeFormat.innerHTML = `
                    <i class="fas fa-eraser"></i>
                    <span class="wysiwyg-tooltiptext">Remove&nbspformat</span>`;
    document.getElementsByClassName('wysiwyg-bar')[0].append(removeFormat);

    removeFormat.addEventListener('click', execRemoveFormat);

    function execRemoveFormat(){
        document.getElementById('wysiwygInputArea').focus();
        document.execCommand('removeFormat', false, null);
    }
})();
