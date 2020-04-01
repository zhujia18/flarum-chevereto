<?php

namespace Zhujia18\Chevereto;

use Flarum\Extend;
use Illuminate\Contracts\Events\Dispatcher;

return [
    (new Extend\Frontend('admin'))
        ->css(__DIR__ . '/resources/less/admin/settingsPage.less')
        ->js(__DIR__ . '/js/dist/admin.js'),
    (new Extend\Frontend('forum'))
        ->css(__DIR__ . '/resources/less/forum/cheveretoButton.less')
        ->js(__DIR__ . '/js/dist/forum.js'),
    new Extend\Locales(__DIR__ . '/resources/locale'),
    function (Dispatcher $events) {
        $events->subscribe(Listeners\AddCheveretoApi::class);
    },
];
