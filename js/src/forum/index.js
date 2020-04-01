import {extend} from "flarum/extend";
import TextEditor from "flarum/components/TextEditor";
import CheveretoButton from "./components/CheveretoButton";

app.initializers.add('jasper-chevereto', app => {
    let uploadButton;
    extend(TextEditor.prototype, 'controlItems', function (items) {
        if (!app.forum.attribute('canCheveretoUpload')) return;
        CheveretoButton = new CheveretoButton;
        items.add('jasper-chevereto', CheveretoButton, 0);
        uploadButton.unloadChevereto();
        uploadButton.loadChevereto();
    });
});