'use strict';

var OrderedListModule = (function(){
    //insert html template
    let orderedList = document.createElement('button')
    orderedList.classList = "wysiwyg-item wysiwyg-button wysiwyg-tooltip";
    orderedList.setAttribute('id', 'orderedList');
    orderedList.innerHTML = `
                    <i class="fas fa-list-ol"></i>
                    <span class="wysiwyg-tooltiptext">Ordered&nbsplist</span>`;
    document.getElementsByClassName('wysiwyg-bar')[0].append(orderedList);

    orderedList.addEventListener('click', execOrderedList);

    function execOrderedList(){
        document.getElementById('wysiwygInputArea').focus();
        document.execCommand('insertOrderedList', false, null);
    }
})();
