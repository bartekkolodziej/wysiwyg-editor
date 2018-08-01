# wysiwyg-editor
Simple editor built using execComand and contentEditable 

How to:


1.Specify path to modules folder in wysiwyg.js file


2.Include wysiwyg.js file


3.Call::
```
wysiwygEditor.load('divID')
```
Then editor will be placed inside the div with given ID. All modules will be included. Or you can specify which modules you want by passing array as second argument like this:
```
wysiwygEditor.load('divID', ['bold', 'italic', 'images, 'table']);
```

Available modules: 
```
'bold',
'underline',
'italic',
'strikeThrough',
'fonts',
'colors',
'headings',
'orderedList',
'unorderedList',
'indent',
'outdent',
'justify',
'links',
'unlink',
'tables',
'images',
'removeFormat'
```


Demo: https://jsfiddle.net/k3rmzb80/38/
