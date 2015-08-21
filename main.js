//Author: TrungDQ
//10:40 PM 15 April 2013
var data;
var sequence;
var repeatDelay = 10;
var repeatTimes = 3;
var done = new Array();
var dbCheck = "saved3";
$(document).ready(function () {
    data = JSONDATA.questions;
    var sData = localStorage["i2se_saved"];
    if (sData != dbCheck) {
        refreshSequence();
        refreshDone();
        newSave();
    } else {
        sequence = JSON.parse(localStorage["i2se_sequence"]);
        repeatDelay = parseInt(localStorage["i2se_repeatDelay"]);
        repeatTimes = parseInt(localStorage["i2se_repeatTimes"]);
        done = JSON.parse(localStorage["i2se_done"]);
        if (parseInt(localStorage["i2se_isCheck"]) == 1) {
            $('#checkint').attr("checked", "checked");
        }

        loadSave();
    }
    $('#pack-name').text(JSONDATA.name);

    $('#questionCount').text(JSONDATA.questions.length);
});
function saveStatus() {
    localStorage["i2se_saved"] = dbCheck;
    localStorage["i2se_sequence"] = JSON.stringify(sequence);
    localStorage["i2se_repeatDelay"] = repeatDelay;
    localStorage["i2se_repeatTimes"] = repeatTimes;
    localStorage["i2se_done"] = JSON.stringify(done);
    if ($('#checkint').is(":checked")) {
        localStorage["i2se_isCheck"] = 1;
    } else {
        localStorage["i2se_isCheck"] = 0;
    }
}
function loadSave() {
    console.log("Loaded save!");
    $('#repeatTimes').val(repeatTimes);
    $('#repeatDelay').val(repeatDelay);
    console.log(sequence);
    console.log(done);
}
function newSave() {
    console.log("New save!");
}
function refreshSequence() {
    sequence = new Array();
    for (i = 0; i < data.length; ++i) {
        sequence[i] = i;
    }
    sequence = shuffle(sequence);
}
function refreshDone() {
    for (i = 0; i < data.length; ++i) {
        done[i] = 0;
    }
}
function rand(start, end) {
    return Math.floor((Math.random() * end) + start);
}
function selectquestion() {
    if (sequence.length == 0) {
        refreshSequence();
    }
    return sequence.pop();
}
function logDb(code) {
    if ($('#checkint').is(':checked') == true) {
        for (i = 0; i < repeatTimes; ++i) {
            sequence.splice(sequence.length - repeatDelay * (i + 1), 0, code);
        }

    }
}
function viewanswer() {
    var ans = $('.right');
    ans.each(function () {
        $(this).parent().css('background-color', '#8DFB7A');
    });
}
function checkanswer() {
    var ans = $('.right');
    var ok = true;
    ans.each(function () {
        if ($(this).is(':checked') == false) {
            ok = false;
        }
        ;
    });
    $('#answer input[type=checkbox]').each(function () {
        var obj = $(this);
        if (!obj.hasClass('right')) {
            if (obj.is(':checked') == true) {
                ok = false;
            }
            ;
        }
    });
    if (ok) {
        $('#mess').attr("class", "qtrue");
    } else {
        $('#mess').attr("class", "qfalse");
        if ($('#nextbutton').is(':disabled') == true) {
            logDb(parseInt($('#quescode').html()));//TODO
        }
    }
    done[$('#quescode').html()] += 1;


    $('#nextbutton').removeAttr("disabled");
}
function nextquestion() {
    var nextid = selectquestion();
    $('#quescode').html(nextid);
    var obj = data[nextid];

    $('#text').html('<pre>' + obj.question + '</pre>');
    //$('#answer').html(obj.children[2].innerHTML.replace(/checked=\"checked\"/g,"class=\"right\""));

    var html = "";
    for (var i = 97; obj[String.fromCharCode(i)]; i++) {
        var option = String.fromCharCode(i);
        var type = obj.answer.length == 1 ? 'radio' : 'checkbox';
        html += "<tr><td><label><input type='" + type + "' class='" + (obj.answer.indexOf(option) > -1 ? 'right' : '') + "' value='" + option + "'/>" + obj[option] + "</label></td></tr>"
    }

    $('#answer').html(html);
    $('#answer input').attr('name', 'samename');
    $('#answer').shuffle();
    $('#mess').attr("class", "");
    $('#nextbutton').attr("disabled", "disabled");
    saveStatus();
    calcPercent();
}
function calcPercent() {
    var c = 0;
    for (i = 0; i < data.length; ++i) {
        if (done[i] > 0) ++c;
    }
    var p = (c * 100 / data.length).toFixed(2);
    var pString = Math.round(c * 100 / data.length);

    $('#done').css('width', pString + "%");
    $('#done').html(p + "%");
}
function btnOK() {
    if (!(repeatTimes = parseInt($('#repeatTimes').val()))) {
        repeatTimes = 3;
    }
    if (!(repeatDelay = parseInt($('#repeatDelay').val()))) {
        repeatDelay = 10;
    }

    $('#repeatTimes').val(repeatTimes);
    $('#repeatDelay').val(repeatDelay);

    saveStatus();
    $('#panel-setting').hide();

}

function btnReset() {
    if (confirm("Are you sure?")) {
        var questionPack = localStorage['i2se_question_pack_url'];
        var keys = Object.keys(localStorage);
        for (var i = 0; i < keys.length; i++) {
            delete localStorage[keys[i]];
        }
        localStorage['i2se_question_pack_url'] = questionPack;
        location.reload();
    }
}

function btnImport() {

    var url = prompt("Please import question database URL", "data/luat-giao-thong.json");
    $.ajax({
        url: url,
        async: false,
        dataType: 'json',
        success: function (response) {
            localStorage['i2se_question_pack_url'] = url;
            location.reload();
        },
        error: function (response) {
            alert('Your question database is not exists or not correctly formatted!');
        }
    });

}