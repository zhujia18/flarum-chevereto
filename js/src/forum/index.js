import {extend} from "flarum/extend";
import TextEditor from "flarum/components/TextEditor";
import CheveretoButton from "./components/CheveretoButton";

app.initializers.add('jasper-chevereto', app => {
    let cheveretoUploadBtn;
    extend(TextEditor.prototype, 'controlItems', function (items) {
        if (!app.forum.attribute('canCheveretoUpload')) return;
        cheveretoUploadBtn = new CheveretoButton;
        items.add('jasper-chevereto', cheveretoUploadBtn, 0);
        cheveretoUploadBtn.unloadChevereto();
        cheveretoUploadBtn.loadChevereto();
    });
});