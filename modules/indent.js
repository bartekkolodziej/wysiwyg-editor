'use strict';

var IndentModule = (function(){
    //insert html template
    let indent = document.createElement('button')
    indent.classList = "wysiwyg-item wysiwyg-button wysiwyg-tooltip";
    indent.setAttribute('id', 'indent');
    indent.innerHTML = `
                    <i class="fas fa-indent"></i>
                    <span class="wysiwyg-tooltiptext">Indent</span>`;
    document.getElementsByClassName('wysiwyg-bar')[0].append(indent);

    indent.addEventListener('click', execIndent);

    function execIndent(){
        document.getElementById('wysiwygInputArea').focus();
        document.execCommand('indent', false, null);
    }
})();
