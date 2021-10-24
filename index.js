window.onload = function () {
    var oWrap = document.getElementById('wrap');
    var aImg = oWrap.getElementsByTagName('img');
    var aBtn = oWrap.getElementsByTagName('span');
    var iNow = 0;

    function tab() {
        for (var i = 0; i < aBtn.length; i++) {//清空所有按钮选中样式以及图片显示样式
            aBtn[i].className = '';
            aImg[i].className = '';
        }
        aBtn[iNow].className = 'active';//设置当前按钮选中样式以及当前图片透明度
        aImg[iNow].className = 'on';
    }

    setInterval(function () {//每4秒循环变换下一张图片
        iNow++;
        if (iNow == aBtn.length) iNow = 0;
        tab();
    }, 350);

    for (var i = 0; i < aBtn.length; i++) {
        aBtn[i].index = i;//为按钮添加自定义属性（索引）目的是使图片和按钮相对应
        //按钮
        aBtn[i].οnmοuseοver = function () {
            iNow = this.index; //是按钮所控制显示的图片与左右箭头控制显示的图片相对应
            tab();
        }

        //下一个箭头
    }

    showTime();//网页一加载就调用showTime()函数；

    // param
    let obj = getRequest(window.location.href);
    console.log(obj);
    document.getElementById('i1').value = obj['userxh'];
    document.getElementById('i2').value = obj['username'];
    document.getElementById('i3').value = obj['userxy'];

    // index
    let next = document.getElementById('next');
    if (next) {
        next.addEventListener('click', function () {
            let param = location.search;
            window.location.href = 'index1.html' + param;
        })
    }

    // index1
    let next1 = document.getElementById('next1');
    if (next1) {
        next1.addEventListener('click', function () {
            let param = location.search;
            window.location.href = 'index.html' + param;
        })
    }
}

function checkTime(i) {  //补位处理
    if (i < 10) {
        i = "0" + i;     //当秒分小于10时，在左边补0；
    }
    return i;
}

function showTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1; //js获取的月份是从0开始；
    var day = now.getDate();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    m = checkTime(m)
    s = checkTime(s)
    document.getElementById("show").innerHTML = "" + year + "/" + month + "/" + day + "" + "  " + h + ":" + m + ":" + s;
    t = setTimeout('showTime()', 500)
}

function getRequest(urlStr) {
    let url = '';
    if (typeof urlStr == "undefined") url = decodeURI(location.search);
    else url = "?" + urlStr.split("?")[1];

    let theRequest = {};
    if (url.indexOf("?") !== -1) {
        let str = url.substr(1);
        let strs = str.split("&");
        if (strs[0] !== 'undefined') {
            for (let i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            }
        }
    }
    return theRequest;
}
