<?php

namespace Zhujia18\Chevereto\Listeners;

use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\ForumSerializer;
use Illuminate\Events\Dispatcher;

class AddCheveretoApi
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(Serializing::class, [$this, 'prepareApiAttributes']);
    }

    public function prepareApiAttributes(Serializing $event)
    {
        if ($event->isSerializer(ForumSerializer::class)) {
            $event->attributes['canCheveretoUpload'] = $event->actor->can('jasper.chevereto.upload');
        }
    }
}
