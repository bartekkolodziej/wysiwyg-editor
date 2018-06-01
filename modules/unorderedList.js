'use strict';

var UnorderedListModule = (function(){
    //insert html template
    let unorderedList = document.createElement('button')
    unorderedList.classList = "wysiwyg-item wysiwyg-button wysiwyg-tooltip";
    unorderedList.setAttribute('id', 'unorderedList');
    unorderedList.innerHTML = `
                    <i class="fas fa-list-ul"></i>
                    <span class="wysiwyg-tooltiptext">Unordered&nbsplist</span>`;
    document.getElementsByClassName('wysiwyg-bar')[0].append(unorderedList);

    unorderedList.addEventListener('click', execUnorderedList);

    function execUnorderedList(){
        document.getElementById('wysiwygInputArea').focus();
        document.execCommand('insertUnorderedList', false, null);
    }
})();
