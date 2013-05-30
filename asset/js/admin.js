(function (global) {
    global.showModal = function (contents) {
        $('#_modalHeader').html(contents.header);
        $('#_modalBody').html(contents.body);
        $('#_modalPrimaryButton').click(contents.action);
        $('#_modal').modal();
    };
    global.submit = function (id, action) {
        if (arguments.length === 1) {
            action = id;
            id = 'form';
        }
        var form = document.getElementById(id),
            orgAction = form.action;
        form.action = action;
        form.submit();
        form.action = orgAction;
    };
    global.del = function (action, done) {
        $.ajax({
            url: action,
            type: 'delete',
            context: document.body
        }).done(done);
    };
    global.put = function (action, payload, done) {
        $.ajax({
            url: action,
            type: 'put',
            data: payload,
            context: document.body
        }).done(done);
    };
    global.post = function (action, payload, done) {
        $.ajax({
            url: action,
            type: 'post',
            data: payload,
            context: document.body
        }).done(done);
    };
    var appendMovie = function (itemDiv) {
        $('.item-embed', itemDiv).append($('input._embed', itemDiv).val());
    };
    var clearMovie = function (itemDiv) {
        $('.item-embed', itemDiv).html('');
    };
    var appendThumbnails = function (itemDiv) {
        var regx = /[0-9]+\.jpg$/,
            thumbnail = $('input._thumbnail', itemDiv).val(),
            match = thumbnail.match(regx),
            rawThumbnail = thumbnail.substr(0, thumbnail.length - match[0].length)
        for (var i = 1; i <= 30; i++) {
            var dropdown = document.createElement('li');
            $(dropdown).addClass('dropdown');
            $(dropdown).addClass('pull-left');
            $(dropdown).html(
                '<a href="#" class="dropdown-toggle" data-toggle="dropdown">' +
                '<img src="' + rawThumbnail + i + '.jpg">' +
                '</a>' +
                '<ul class="dropdown-menu">' +
                '<li role="presentation"><a class="_changeSelection" tabindex="-1" href="javascript:void(0)" data-src="' + rawThumbnail + i + '.jpg">動画サムネイルにする</a></li>' +
                '<li role="presentation"><a class="_setArticleImage" tabindex="-1" href="javascript:void(0)" data-src="' + rawThumbnail + i + '.jpg">記事の表紙画像にする</a></li>' +
                '</ul>'
            );
            $('._changeSelection', $(dropdown)).click(function (event) {
                changeSelection(itemDiv, $(event.target).attr('data-src'));
            });
            $('._setArticleImage', $(dropdown)).click(function (event) {
                setArticleImage($(event.target).attr('data-src'));
            });
            $('.item-thumbnails', itemDiv).append(dropdown);
        }
    };
    var clearThumbnails = function (itemDiv) {
        $('.item-thumbnails img', itemDiv).remove();
    };
    var changeSelection = function (itemDiv, src) {
        $('a.thumbnail img', itemDiv).attr('src', src);
        $('input._thumbnail', itemDiv).val(src);
    };
    var setArticleImage = function (src) {
        var img = document.createElement('img');
        img.src = src;
        img.width = '180';
        img.height = '135';
        $('#articleThumbnail').html('').append(img);
    };
    var changeMetaData = function (itemDiv) {
        var regx = /src="http:\/\/flashservice\.xvideos\.com\/embedframe\/([0-9]+)"/,
            match = $(itemDiv).val().match(regx),
            id = match[1];
        $('.id', itemDiv).html(id);
        $.get('/admin/video/meta/' + id, function (meta) {
            $('.title', itemDiv).html(meta.title);
            $('.thumbnail', itemDiv).val(meta.thumbnail);
            $('input.selected', itemDiv).val(0);
        });
    };
    var save = function (addingItem, callback) {
        var articleId = $('#articleId').val();
        put('/admin/article/' + $('#articleId').val(), getArticleInfo(getItems(addingItem)), callback);
    };
    var getArticleInfo = function (items) {
        return {
            title: $('#title').val(),
            description: $('#description').val(),
            thumbnail: $('img', '#articleThumbnail').attr('src'),
            items: items
        };
    };
    var getItems = function (addingItem) {
        var items = [];
        $('.item', $('#items')).each(function (index, element) {
            var item = {};
            item.videoId = $('._videoId', element).val();
            item.title = $('._title', element).val();
            item.url = $('._url', element).val();
            item.thumbnail = $('._thumbnail', element).val();
            item.selected = $('._selected', element).val();
            item.embed = $('._embed', element).val();
            items.push(item);
        });
        if (addingItem) items.push(addingItem);
        return items;
    };

    $('._saveArticle').click(function (event) {
        $(event.target).button('loading');
        save(null, function () {
            $(event.target).button('reset');
        });
    });
    $('._publishArticle').click(function (event) {
        var url = '/admin/article/' + $(event.target).attr('data-id') + '/publish';
        showModal({
            header: '公開',
            body: '『' + $(event.target).attr('data-title') + '』を公開しますか？',
            action: function (event) {
                $(event.target).button('loading');
                put(url, {}, function () {
                    $(event.target).button('reset');
                    $('#_modal').modal('hide');
                    location.reload();
                });
            }
        });
    });
    $('._unpublishArticle').click(function (event) {
        var url = '/admin/article/' + $(event.target).attr('data-id') + '/unpublish';
        showModal({
            header: '公開停止',
            body: '『' + $(event.target).attr('data-title') + '』を公開停止しますか？',
            action: function (event) {
                $(event.target).button('loading');
                put(url, {}, function () {
                    $(event.target).button('reset');
                    $('#_modal').modal('hide');
                    location.reload();
                });
            }
        });
    });
    $('._deleteArticle').click(function (event) {
        var url = '/admin/article/' + $(event.target).attr('data-id');
        showModal({
            header: '削除',
            body: '『' + $(event.target).attr('data-title') + '』を削除しますか？',
            action: function (event) {
                $(event.target).button('loading');
                del(url, function (event) {
                    $(event.target).button('reset');
                    $('#_modal').modal('hide');
                    location.reload();
                });
            }
        });
    });
    $('._undeleteArticle').click(function (event) {
        var url = '/admin/article/' + $(event.target).attr('data-id') + '/undelete';
        showModal({
            header: '削除取消',
            body: '『' + $(event.target).attr('data-title') + '』を削除取消しますか？',
            action: function (event) {
                $(event.target).button('loading');
                put(url, {}, function (event) {
                    $(event.target).button('reset');
                    $('#_modal').modal('hide');
                    location.reload();
                });
            }
        });
    });
    $('._forceRemoveArticle').click(function (event) {
        var url = '/admin/article/' + $(event.target).attr('data-id') + '/forceRemove';
        showModal({
            header: '発禁',
            body: '『' + $(event.target).attr('data-title') + '』を発禁しますか？',
            action: function (event) {
                $(event.target).button('loading');
                del(url, function (event) {
                    $(event.target).button('reset');
                    $('#_modal').modal('hide');
                    location.reload();
                });
            }
        });
    });
    $('._unforceRemoveArticle').click(function (event) {
        var url = '/admin/article/' + $(event.target).attr('data-id') + '/unforceRemove';
        showModal({
            header: '発禁取消',
            body: '『' + $(event.target).attr('data-title') + '』を発禁取消しますか？',
            action: function (event) {
                $(event.target).button('loading');
                put(url, {}, function (event) {
                    $(event.target).button('reset');
                    $('#_modal').modal('hide');
                    location.reload();
                });
            }
        });
    });
    $('._addItemToArticle').click(function (event) {
        var modal = $('#_videoAddModal');
        modal.modal();
        $('#_videoURL', modal).change(function (event) {
            var regx = /src="http:\/\/flashservice\.xvideos\.com\/embedframe\/([0-9]+)"/,
                match = $(event.target).val().match(regx),
                videoId = match[1];
            if (!videoId) return;
            $('._embed', modal).val($('#_videoURL', modal).val());
            $('.modal-body', modal).activity();
            $.get('/admin/video/meta/' + videoId, function (meta) {
                $('._videoId', modal).val(meta.videoId);
                $('._title', modal).val(meta.title);
                $('._url', modal).val(meta.url);
                $('._thumbnail', modal).val(meta.thumbnail);
                $('.modal-body', modal).html(
                    '<h3 class="title">' + $('._title', modal).val() + '</p>' +
                    '<div class="embed">' + $('._embed', modal).val() + '</div>'
                );
                $('.btn-primary', modal).removeClass('disabled');
                $('.btn-primary', modal).click(function (event) {
                    $('.modal-body', modal).activity();
                    var item = {};
                    item.videoId = $('._videoId', modal).val();
                    item.title = $('._title', modal).val();
                    item.url = $('._url', modal).val();
                    item.thumbnail = $('._thumbnail', modal).val();
                    item.selected = 0;
                    item.embed = $('._embed', modal).val();
                    save(item, function () {
                        modal.modal('hide');
                        location.reload();
                    });
                });
            });
        });
        $('#_videoURL').focus();
    });
    $('._collapse').each(function (index, element) {
        var id = $(element).attr('data-target'),
            item = $('#item_' + id + '.item'),
            accordionBody = $('#body_' + id);
        $('#body_' + id).on('show', function () {
            $('#collapse_' + id).html('<i class="icon-chevron-down"></i>');
            appendThumbnails($('#item_' + id + '.item'));
            appendMovie($('#item_' + id + '.item'));
        });
        $('#body_' + id).on('hide', function () {
            $('#collapse_' + id).html('<i class="icon-chevron-up"></i>');
            clearThumbnails($('#item_' + id + '.item'));
            clearMovie($('#item_' + id + '.item'));
        });
        $(element).click(function (event) {
            $('#body_' + id).collapse('toggle');
        });
    });
})(this);
