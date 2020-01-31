// Constants
const DINGUS_PRICE = 14.25;
const WIDGET_PRICE = 9.99;
const ZERO_FORMAT = '0.00';
const DEBUG = true; // Where might this flag be used? (It's not mandatory)

// Global store (What else would you need here?)
let store = {
  orderHistory: [],
  idNum: 1,
  dingus: 0,
  widget: 0,
  sales: 0.00
};

function generateEntries() {
	// Returns an orderHistory array
	// [ID#, Date, Dingus quantity, Widget quantity]
	return [
	  [1, '01/01/2020', 1, 1], 
	  [2, '01/02/2020', 2, 2]
	]
}

function startUp(){
	// store = localStorage.getItem('global');
	// localStorage.clear();
	var tableRef = document.getElementById('table').getElementsByTagName('tbody')[0];
	// var counter = 0;
	for (i = 0; i < generateEntries().length; i++){
		var row = tableRef.insertRow(-1);
		for (j = 0; j < generateEntries()[0].length; j++){
			var cell = row.insertCell(j);
			cell.innerText = generateEntries()[i][j];
			// counter = counter + 1;
		}
		cell = row.insertCell(-1);
		cell.innerText = '$' + ((generateEntries()[i][2] * DINGUS_PRICE) + (generateEntries()[i][3] * WIDGET_PRICE)).toFixed(2)
		store.dingus = store.dingus + generateEntries()[i][2];
		store.widget = store.widget + generateEntries()[i][3];
		store.sales = (parseFloat(store.sales) + ((generateEntries()[i][2] * DINGUS_PRICE) + (generateEntries()[i][3] * WIDGET_PRICE))).toFixed(2);
		store.idNum = store.idNum + 1;
		store.orderHistory.push(generateEntries()[i]);
	}
	var dingusCount = document.getElementById('dingus_count');
	var widgetCount = document.getElementById('widget_count');
	var salesCount = document.getElementById('sales_count');
	dingusCount.innerText = store.dingus;
	widgetCount.innerText = store.widget;
	salesCount.innerHTML = '<span>&dollar;</span>' + store.sales;
	// var secondRow = tableRef.insertRow(1);
	// counter = 0;
	// for (entries in generateEntries()[1]){
	// 	var cells = secondRow.insertCell(counter);
	// 	cells.innerText = entries;
	// 	counter = counter + 1;
	// }
}

function enableOrder(){
	var dingusRef = document.getElementById('reset1').value;
	var widgetRef = document.getElementById('reset2').value;
	var buttonRef = document.getElementById('success_button');
	if (dingusRef != 0 | widgetRef != 0){
		buttonRef.disabled = false;
	}
	else{
		buttonRef.disabled = true;
	}
}

function clearForms(){
	var buttonRef = document.getElementById('error_button');
	buttonRef.onclick = function(){
		document.getElementById('reset1').value = 0;
		document.getElementById('reset2').value = 0;
		document.getElementById('dingus_total').value = '0.00';
		document.getElementById('widget_total').value = '0.00';
		document.getElementById('dw_total').value = '0.00';
	}
}

function checkDigits(month){
	return month < 10 ? '0' + month: '' + month;
}

function addOrder(){
	var buttonRef = document.getElementById('success_button');
	buttonRef.onclick = function(){
		var rowList = [];
		var theDate = new Date();
		var dingusRef = document.getElementById('reset1');
		var widgetRef = document.getElementById('reset2');
		rowList.push(store.idNum);
		rowList.push(checkDigits(theDate.getMonth()+1) + '/' + theDate.getDate() + '/' + theDate.getFullYear());
		rowList.push(dingusRef.value);
		rowList.push(widgetRef.value);
		store.orderHistory.push(rowList);
		var tableRef = document.getElementById('table').getElementsByTagName('tbody')[0];
		var row = tableRef.insertRow(-1);
		for (i = 0; i < rowList.length; i++){
			var cell = row.insertCell(i);
			cell.innerText = rowList[i];
		}
		cell = row.insertCell(-1);
		cell.innerText = '$' + ((rowList[2] * DINGUS_PRICE) + (rowList[3] * WIDGET_PRICE)).toFixed(2);
		store.dingus = store.dingus + parseInt(rowList[2]);
		store.widget = store.widget + parseInt(rowList[3]);
		store.sales = (parseFloat(store.sales) + ((rowList[2] * DINGUS_PRICE) + (rowList[3] * WIDGET_PRICE))).toFixed(2);
		var dingusCount = document.getElementById('dingus_count');
		var widgetCount = document.getElementById('widget_count');
		var salesCount = document.getElementById('sales_count');
		dingusCount.innerText = store.dingus;
		widgetCount.innerText = store.widget;
		salesCount.innerHTML = '<span>&dollar;</span>' + store.sales;
		store.idNum = store.idNum + 1;
		dingusRef.value = 0;
		widgetRef.value = 0;
		document.getElementById('dingus_total').value = '0.00';
		document.getElementById('widget_total').value = '0.00';
		document.getElementById('dw_total').value = '0.00';
		if (window.localStorage.getItem('global') == null){
			window.localStorage.setItem("global", JSON.stringify(store.orderHistory));
		}
		else{
			var temp = JSON.parse(window.localStorage.getItem('global'));
			temp.push(rowList);
			window.localStorage.setItem('global', JSON.stringify(temp))
		}
	}
}

function updateTotal(){
	var dingusRef = document.getElementById('reset1');
	var widgetRef = document.getElementById('reset2');
	var dTotalRef = document.getElementById('dingus_total');
	var wTotalRef = document.getElementById('widget_total');
	if (dingusRef.value != 0 | widgetRef.value != 0){
		dTotalRef.value = (dingusRef.value * DINGUS_PRICE).toFixed(2);
		wTotalRef.value = (widgetRef.value * WIDGET_PRICE).toFixed(2);
		document.getElementById('dw_total').value = (parseFloat(dTotalRef.value) + parseFloat(wTotalRef.value)).toFixed(2);
	}
}

function pageReload(){
	var tableRef = document.getElementById('table').getElementsByTagName('tbody')[0];
	var orderRef = JSON.parse(window.localStorage.getItem('global'));
	for (i = 0; i < orderRef.length; i++){
		var row = tableRef.insertRow(-1);
		for (j = 0; j < orderRef[0].length; j++){
			var cell = row.insertCell(j);
			cell.innerText = orderRef[i][j];
		}
		cell = row.insertCell(-1);
		cell.innerText = '$' + ((orderRef[i][2] * DINGUS_PRICE) + (orderRef[i][3] * WIDGET_PRICE)).toFixed(2)
		store.dingus = store.dingus + parseInt(orderRef[i][2]);
		store.widget = store.widget + parseInt(orderRef[i][3]);
		store.sales = (parseFloat(store.sales) + ((orderRef[i][2] * DINGUS_PRICE) + (orderRef[i][3] * WIDGET_PRICE))).toFixed(2);
		store.idNum = store.idNum + 1;
		store.orderHistory.push(orderRef[i]);
	}
	var dingusCount = document.getElementById('dingus_count');
	var widgetCount = document.getElementById('widget_count');
	var salesCount = document.getElementById('sales_count');
	dingusCount.innerText = store.dingus;
	widgetCount.innerText = store.widget;
	salesCount.innerHTML = '<span>&dollar;</span>' + store.sales;
}

if (window.localStorage.getItem('global') == null){
	window.addEventListener('DOMContentLoaded', startUp);
}
else{
	window.addEventListener('DOMContentLoaded', pageReload);
}

window.addEventListener('click', enableOrder);
window.addEventListener('click', clearForms);
window.addEventListener('click', addOrder);
window.addEventListener('click', updateTotal);