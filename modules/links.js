'use strict';

var InsertLinkModule = (function () {
    //insert html template
    let insertLinkDD = document.createElement('div')
    insertLinkDD.classList = "wysiwyg-dropdown wysiwyg-item";
    insertLinkDD.setAttribute('id', 'insertLinkDD');
    insertLinkDD.innerHTML = `
                        <div class="wysiwyg-tooltip" >
                            <i class="fa fa-link"></i>
                            <span class="wysiwyg-tooltiptext">Insert&nbsplink</span>
                        </div>
                        <div class="wysiwyg-dropdown-content wysiwyg-dropdown-content2">
                            <input class="wysiwyg-input" placeholder="Url" id="linkUrl" />
                            <input class="wysiwyg-input" placeholder="Text" id="linkText" />
                            <button id="insertLinkBtn" class="wysiwyg-btn wysiwyg-button">Insert</button>
                        </div>`;
    document.getElementsByClassName('wysiwyg-bar')[0].append(insertLinkDD);


    //cache DOM
    let insertLinkBtn = document.getElementById('insertLinkBtn');
    let dropdownContent = insertLinkDD.getElementsByClassName('wysiwyg-dropdown-content')[0];

    //add event listeners
    insertLinkDD.addEventListener('click', toggleDropdown)
    dropdownContent.addEventListener('click', function (e) {
        e.stopPropagation()
    });
    insertLinkDD.addEventListener('click', insertEmptyLink);
    insertLinkBtn.addEventListener('click', insertLink);

    //functions
    function toggleDropdown(event){
        insertLinkDD.classList.toggle('wysiwyg-dropdown-active');
        event.stopPropagation();
    }

    function insertEmptyLink() {
        //if there is already empty link in editor do nothing
        let empty = document.getElementsByClassName('empty-link')[0];
        if (empty !== undefined)
            return;

        document.execCommand('insertHTML', false, '<a class="empty-link"> </a>\u00a0\u00a0');
    }

    function removeEmptyLinks() {
        //delete all empty links
        let emptyLink;
        while ((emptyLink = document.getElementsByClassName('empty-link')[0]) !== undefined) {
            emptyLink.remove();
        }
    }

    function insertLink() {
        let url = document.getElementById('linkUrl').value
        let urlText = document.getElementById('linkText').value
        if (url !== '' && document.getElementsByClassName('empty-link')[0] !== undefined) {
            urlText === '' ? urlText = url : urlText = urlText;
            document.getElementsByClassName('empty-link')[0].innerHTML = urlText;
            document.getElementsByClassName('empty-link')[0].setAttribute('href', url);
            document.getElementsByClassName('empty-link')[0].classList.remove('empty-link');
            document.getElementById('insertLinkDD').classList.remove('wysiwyg-dropdown-active');
        }
    }

    return {
        removeEmptyLinks: removeEmptyLinks
    }

})();
