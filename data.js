/**
 *
 * Support multiple choice with unlimited answers
 *
 * Data json format:
 * [ 
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
 */

var JSONDATA = [{question:"Which of the following is not considered as part of  ownerís Equity?", a:"Revenue", b:"Withdrawal", c:"Assets", d:"Expense", e:"Contributed capital", f:"", answer:"ac"},{question:"The properties used in operation activities of a business is call: ", a:"Revenue", b:"Withdrawal", c:"Assets", d:"Expense", e:"Liabilities", f:"", answer:"c"},{question:"Which of the following is a liability?", a:"Account payable", b:"Account receivable", c:"Cash", d:"Inventory", e:"expense", f:"", answer:"a"},{question:"Which of the following is not a liability?", a:"Account payable", b:"Note payable", c:"Short term loan", d:"Long term loan", e:"Short term investment", f:"", answer:"e"},{question:"Which of the following is not a category or element of the balance sheet?", a:"Expense             ", b:"Liabilities", c:"Assets", d:"Account payable", e:"Loan", f:"", answer:"ab"},{question:"Accounting is an information and measurement system that: ", a:" Identifies business activities.", b:" Records business activities.", c:"Communicates business activities.", d:"Helps people make better decisions.", e:"All of these.", f:"", answer:"abd"}];