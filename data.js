/**
 *
 * Support multiple choice with unlimited answers
 *
 * Data json format:
 *
	 {
	   name: "Luat giao thong",
	   author: "Dinh Quang Trung",
	   questions: [
		  {
			question: "single choice question"
			a: "text",
			b: "text",
			c: "text",
			d: "text",
			e: "text",
			f: "text",
			answer: "a"
		  },
		  {
			question: "multiple choice question"
			a: "text",
			b: "text",
			c: "text",
			d: "text",
			e: "text",
			f: "text",
			answer: "abe"
		  },
		  ...
	   ]
	 }
 */
var QUESTION_PACK_URL = localStorage['i2se_question_pack_url'];
if (!QUESTION_PACK_URL) {
	QUESTION_PACK_URL = prompt("Please import question database URL", "data/luat-giao-thong.json");
	localStorage['i2se_question_pack_url'] = QUESTION_PACK_URL;
}
var JSONDATA;
$.ajax({
	url: QUESTION_PACK_URL,
	async: false,
	dataType: 'json',
	success: function (response) {
		JSONDATA = response;
	},
	error: function (response) {
		alert('Your question database is not exists or not correctly formatted!');
		localStorage['i2se_question_pack_url'] = "";
		location.reload();
	}
});