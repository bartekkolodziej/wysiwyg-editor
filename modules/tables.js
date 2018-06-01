'use strict';

var InsertTableModule = (function () {
    //insert html template
    let insertTableDD = document.createElement('div')
    insertTableDD.classList = "wysiwyg-dropdown wysiwyg-item";
    insertTableDD.setAttribute('id', 'insertTableDD');
    insertTableDD.innerHTML = `
                        <div class="wysiwyg-tooltip">
                            <i class="fas fa-table"></i>
                            <span class="wysiwyg-tooltiptext">Insert&nbsptable</span>
                        </div>
                        <div class="wysiwyg-dropdown-content">
                            <table id="tableContainer">
                            </table>
                        </div>`;
    document.getElementsByClassName('wysiwyg-bar')[0].append(insertTableDD);


    //cache DOM
    let tableContainer = document.getElementById('tableContainer');
    let dropdownContent = insertTableDD.getElementsByClassName('wysiwyg-dropdown-content')[0];

    //add event listeners
    tableContainer.addEventListener('mouseleave', setWhiteBackground);
    insertTableDD.addEventListener('click', toggleDropdown)
    dropdownContent.addEventListener('click', function (e) {
        e.stopPropagation()
    });


    //functions
    function toggleDropdown(event){
        insertTableDD.classList.toggle('wysiwyg-dropdown-active');
        event.stopPropagation();
    }

    (function initTableSelector() {
        if (tableContainer === null)
            return;
        for (let i = 0; i < 6; i++) {
            let tr = document.createElement('tr');
            tr.setAttribute('id', 'tr' + i);
            for (let j = 0; j < 6; j++) {
                let td = document.createElement('td');
                td.classList.add('wysiwyg-td-custom');
                td.setAttribute('id', 'td' + i + '' + j);
                td.addEventListener('mouseover', function () {
                    highlightTable(i, j)
                });
                td.addEventListener('click', function () {
                    insertTable(i, j);
                });
                tr.append(td);
            }
            tableContainer.append(tr);
        }
    })();

    function setWhiteBackground() { //set default background on mouse leave in 'insertTableDD'
        for (let tr of tableContainer.childNodes) {
            for (let td of tr.childNodes) {
                if (td.nodeName === 'TD')
                    td.classList.remove('wysiwyg-td-custom-onhover');
            }
        }
    }

    function highlightTable(row, col) { //highlight table rows and cols on hover in 'insertTableDD'
        setWhiteBackground();
        for (let i = 0; i <= row; i++) {
            for (let j = 0; j <= col; j++) {
                let td = document.getElementById('td' + i + '' + j);
                td.classList.add('wysiwyg-td-custom-onhover');
            }
        }
    }

    function insertTable(row, col) { //insert choosen table to editor
        let html = '<table style="border-collapse: collapse; margin:10px">'
        for (let i = 0; i <= row; i++) {
            html += "<tr>"
            for (let j = 0; j <= col; j++) {
                html += '<td style="border: 1px solid black; width:30px; height:30px"></td>';
            }
            html += "</tr>";
        }
        html += "</table>";
        document.getElementById('wysiwygInputArea').focus();
        document.execCommand('insertHTML', false, html);
        document.execCommand('insertHTML', false, '<br/>');
        insertTableDD.classList.remove('wysiwyg-dropdown-active');
    }

})();
