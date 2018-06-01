'use strict';

var OutdentModule = (function(){
    //insert html template
    let outdent = document.createElement('button')
    outdent.classList = "wysiwyg-item wysiwyg-button wysiwyg-tooltip";
    outdent.setAttribute('id', 'outdent');
    outdent.innerHTML = `
                    <i class="fas fa-outdent"></i>
                    <span class="wysiwyg-tooltiptext">Outdent</span>`;
    document.getElementsByClassName('wysiwyg-bar')[0].append(outdent);

    outdent.addEventListener('click', execOutdent);

    function execOutdent(){
        document.getElementById('wysiwygInputArea').focus();
        document.execCommand('outdent', false, null);
    }
})();
