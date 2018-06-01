'use strict';

var HeadingsModule = (function () {
    //insert html template
    let headingsDD = document.createElement('div')
    headingsDD.classList = "wysiwyg-dropdown wysiwyg-item";
    headingsDD.setAttribute('id', 'headingsDD');
    headingsDD.innerHTML =  `
                    <div class="wysiwyg-tooltip">
                        <i class="fas fa-heading "></i>
                        <span class="wysiwyg-tooltiptext">Heading</span>
                    </div>
                    <div class="wysiwyg-dropdown-content" id="headings">
                        <h1 class="wysiwyg-item-small wysiwyg-margin-none">H1</h1>
                        <h2 class="wysiwyg-item-small wysiwyg-margin-none">H2</h2>
                        <h3 class="wysiwyg-item-small wysiwyg-margin-none">H3</h3>
                        <h4 class="wysiwyg-item-small wysiwyg-margin-none">H4</h4>
                        <h5 class="wysiwyg-item-small wysiwyg-margin-none">H5</h5>
                        <h6 class="wysiwyg-item-small wysiwyg-margin-none">H6</h6>
                    </div>`;
    document.getElementsByClassName('wysiwyg-bar')[0].append(headingsDD);


    //cache DOM
    let headings = document.getElementById('headings').children;
    let dropdownContent = document.getElementById('headings');

    //add event listeners
    for (let heading of headings)
        heading.addEventListener('click', addHeading.bind(heading));

    headingsDD.addEventListener('click', toggleDropdown)
    dropdownContent.addEventListener('click', function(e){e.stopPropagation()});

    //functions
    function toggleDropdown(event){
        headingsDD.classList.toggle('wysiwyg-dropdown-active');
        event.stopPropagation();
    }

    function addHeading(event) {
        document.getElementById('wysiwygInputArea').focus();
        document.execCommand('heading', false, this.innerHTML);
        headingsDD.classList.remove('wysiwyg-dropdown-active');
        event.stopPropagation();
    }
})();
