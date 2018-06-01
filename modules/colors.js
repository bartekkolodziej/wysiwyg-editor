'use strict';

var PickColorModule = (function () {
    //insert html template
    let colorsDD = document.createElement('div')
    colorsDD.classList = "wysiwyg-dropdown wysiwyg-item";
    colorsDD.setAttribute('id', 'colorsDD');
    colorsDD.innerHTML = `
                        <div class="wysiwyg-tooltip">
                            <i class="fas fa-tint" id="colorIcon"></i>
                             <span class="wysiwyg-tooltiptext">Change&nbspcolor</span>
                        </div>
                        <div class="wysiwyg-dropdown-content wysiwyg-dropdown-content3">
                            <div class="wysiwyg-switch">
                                <div class="wysiwyg-item-small wysiwyg-float-left" id="switch3"><span class="wysiwyg-switch-txt wysiwyg-switch-txt-active">Text</span></div>
                                <div class="wysiwyg-item-small wysiwyg-float-left" id="switch4"><span class="wysiwyg-switch-txt">Background</span></div>
                            </div>
                            <table class="wysiwyg-colors-table">
                            </table>
                            <input class="wysiwyg-input" placeholder="#Hex" id="colorHex" />
                            <button class="wysiwyg-btn wysiwyg-button" id="pickColorBtn" >Pick</button>
                        </div>`;
    document.getElementsByClassName('wysiwyg-bar')[0].append(colorsDD);


    //cache DOM
    let switch3 = document.getElementById('switch3');
    let switch4 = document.getElementById('switch4');
    let dropdownContent = colorsDD.getElementsByClassName('wysiwyg-dropdown-content')[0];

    //add event listeners
    colorsDD.addEventListener('click', toggleDropdown)
    dropdownContent.addEventListener('click', function (e) {
        e.stopPropagation()
    });



    //functions
    function toggleDropdown(event){
        colorsDD.classList.toggle('wysiwyg-dropdown-active');
        event.stopPropagation();
    }

    (function initColorsDD() {
        createColorsTable();
        document.getElementById('pickColorBtn').addEventListener('click', function () {
            pickColor();
        });

        switch3.addEventListener('click', function () {
            toggleColorsSlot(switch3);
        });

        switch4.addEventListener('click', function () {
            toggleColorsSlot(switch4);
        });

        switch3.click();
    })();

    function createColorsTable() {
        let colors = [
                ['#c70039', '#ff5733', '#ff8d1a', '#ffc300', '#2B1CFF'],
                ['#eddd53', '#add45c', '#57c785', '#00baad', '#10FF55'],
                ['#2a7b9b', '#3d3d6b', '#511849', '#900c3f', '#9365b8'],
                ['#cecece', '#9a9999', '#6c6969', '#4b4b4b', '#000000']
            ];

        let table = document.getElementsByClassName('wysiwyg-colors-table')[0];
        if (table === null)
            return;
        for (let i = 0; i < 4; i++) {
            let tableRow = document.createElement('tr');
            for (let j = 0; j < 5; j++) {
                let tableCell = document.createElement('td');
                tableCell.style = "background-color:" + colors[i][j] + "; padding:8px";
                tableCell.value = colors[i][j];
                tableCell.addEventListener('click', function () {
                    changeColor(tableCell);
                });
                tableCell.classList.add('wysiwyg-color-brick');
                tableRow.append(tableCell);
            }
            table.append(tableRow);
        }
    }

    function toggleColorsSlot(ref) { //switch between 'picking color' and 'insert HEX' slots
        if (ref.getAttribute('id') === 'switch3') {
            ref.children[0].classList.add('wysiwyg-switch-txt-active');
            switch4.children[0].classList.remove('wysiwyg-switch-txt-active');
        }
        if (ref.getAttribute('id') === 'switch4') {
            ref.children[0].classList.add('wysiwyg-switch-txt-active');
            switch3.children[0].classList.remove('wysiwyg-switch-txt-active');
        }
    }

    function changeColor(ref) {
        document.getElementById('wysiwygInputArea').focus();
        if (switch3.children[0].classList.contains('wysiwyg-switch-txt-active')) {
            document.execCommand('foreColor', false, ref.value);
            colorsDD.classList.remove('wysiwyg-dropdown-active');
        } else {
            document.execCommand('hiliteColor', false, ref.value);
            colorsDD.classList.remove('wysiwyg-dropdown-active');
        }
    }

    function pickColor() { //doesnt work
        changeColor(document.getElementById('colorHex'));
    }
})();
