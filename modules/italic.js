'use strict';

var ItalicModule = (function(){
    //insert html template
    let italic = document.createElement('button')
    italic.classList = "wysiwyg-item wysiwyg-button wysiwyg-tooltip";
    italic.setAttribute('id', 'italic');
    italic.innerHTML = `
                    <i class="fa fa-italic"></i>
                    <span class="wysiwyg-tooltiptext">Italic</span>`;
    document.getElementsByClassName('wysiwyg-bar')[0].append(italic);

    italic.addEventListener('click', execItalic);

    function execItalic(){
        document.getElementById('wysiwygInputArea').focus();
        document.execCommand('italic', false, null);
    }
})();
