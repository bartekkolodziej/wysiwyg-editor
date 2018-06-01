'use strict';

var StrikeThroughModule = (function(){
    //insert html template
    let strikeThrough = document.createElement('button')
    strikeThrough.classList = "wysiwyg-item wysiwyg-button wysiwyg-tooltip";
    strikeThrough.setAttribute('id', 'strikeThrough');
    strikeThrough.innerHTML = `
                     <i class="fas fa-strikethrough"></i>
                     <span class="wysiwyg-tooltiptext">Strike&nbspthrough</span>`;
    document.getElementsByClassName('wysiwyg-bar')[0].append(strikeThrough);

    strikeThrough.addEventListener('click', execStrikeThrough);

    function execStrikeThrough(){
        document.getElementById('wysiwygInputArea').focus();
        document.execCommand('strikeThrough', false, null);
    }
})();
