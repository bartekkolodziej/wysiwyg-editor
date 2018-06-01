'use strict';

var UnlinkModule = (function(){
    //insert html template
    let unlink = document.createElement('button')
    unlink.classList = "wysiwyg-item wysiwyg-button wysiwyg-tooltip";
    unlink.setAttribute('id', 'unlink');
    unlink.innerHTML = `
                    <i class="fas fa-unlink"></i>
                    <span class="wysiwyg-tooltiptext">Unlink</span>`;
    document.getElementsByClassName('wysiwyg-bar')[0].append(unlink);

    unlink.addEventListener('click', execUnlink);

    function execUnlink(){
        document.getElementById('wysiwygInputArea').focus();
        document.execCommand('unlink', false, null);
    }
})();
