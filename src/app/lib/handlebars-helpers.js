module.exports = {
    if_eq: function (a, b, admin, opts) {
        a = a.toString();
        b = b.toString();
        if (a == b || admin) {
            return opts.fn(this);
        }
        // else {
        //     return opts.inverse(this);
        // }
    },
    if_eq_prf: function (a, b, opts) {
        a = a.toString();
        b = b.toString();
        if (a == b) {
            return opts.fn(this);
        }
        else {
            return opts.inverse(this);
        }
    },
    handleFlashMessage: function (flash) {
        return `<script>
            toast({
                title: '${flash.title}',
                message: '${flash.message}',
                type: '${flash.type}',
                duration: 3000
            })
        </script>`
    },
    checkPage: function (count, page, category, department) {
        let c = (count - count % 10) / 10
        let d = count % 10;
        c = d > 0 ? c + 1 : c
        let body = ``
        let cate = category ? category : ''
        if (cate) {
            for (let i = 0; i < c; i++) {
                body += (i == page - 1) ? `<li class="notifications-page notifications-active">
                                            <a href="/category/${cate}?page=${i + 1}">${i + 1}</a>
                                        </li>` :
                    `<li class="notifications-page">
                                            <a href="/category/${cate}?page=${i + 1}">${i + 1}</a>
                                        </li>`
            }
            if (body == '') body = "Do not have any notifications"
        }
        else if (department) {
            for (let i = 0; i < c; i++) {
                body += (i == page - 1) ? `<li class="notifications-page notifications-active">
                                            <a href="/department/notify?page=${i + 1}">${i + 1}</a>
                                        </li>` :
                    `<li class="notifications-page">
                                            <a href="/department/notify?page=${i + 1}">${i + 1}</a>
                                        </li>`
            }
            if (body == '') body = "Do not have any notifications"
        }
        else {
            for (let i = 0; i < c; i++) {
                body += (i == page - 1) ? `<li class="notifications-page notifications-active">
                                            <a href="/notify?page=${i + 1}">${i + 1}</a>
                                        </li>` :
                    `<li class="notifications-page">
                                            <a href="/notify?page=${i + 1}">${i + 1}</a>
                                        </li>`
            }
            if (body == '') body = "Do not have any notifications"
        }
        return body
    },
    handleRenderEditNoti: function (account, notification) {
        let { category } = account
        let body = ``
        category.forEach((item, index) => {
            body += (item == notification.category) ?
                `<div class="department-item">
                    <input type="radio" id="${index}" class="checkbox-input" name="category" value='${item}' checked> 
                    <label class="checkbox-label" for="${index}"></label>
                    <label for="${index}">${item}</label>
                </div > `
                :
                `<div class="department-item" >
                <input type="radio" id="${index}" class="checkbox-input" name="category" value='${item}'>
                    <label class="checkbox-label" for="${index}"></label>
                    <label for="${index}">${item}</label>
                </div>`
        })
        return body
    },
    sum: (a, b) => a + b,
    splitContent: function (people) {
        let body = ``
        people.split(',').forEach((item, index) => {
            body += `<div class="department-item">
                            <label for="${index}">${item}</label>
                        </div>`
        }
        )
        return body
    },
    ifEquals: function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    },
};