<?php

namespace Jasper\Chevereto;

use Flarum\Extend;

return [
    (new Extend\Frontend('admin'))
        ->css(__DIR__.'/resources/less/admin/settingsPage.less')
        ->js(__DIR__.'/js/dist/admin.js'),
    new Extend\Locales(__DIR__.'/resources/locale'),
];
