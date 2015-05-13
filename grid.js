var grid = function(data, element, options){
	var self = this;
	var defaultOptions = {
		headerCellClass: 'grid-header-cell',
		headeClass: 'grid-header',
		rowClass: 'grid-row',
		cellClass: 'grid-cell',
		conatinerClass: 'container',
		gridClass: 'grid',
		pageNumber: 1,
		pageSize: 3,
		isPaging: true
	}

	options = options ? options.assign(defaultOptions) : defaultOptions;
	var rows = []
	var columns = []
	var columnWidth = function(){
		return (100/(columns.length + 1)) + '%';
	}

	function init(){
		columns = getColumns()
		console.log(getFinalData())
		bindData()
	}

	function getFinalData(){
		var data = {}
		data = paginatedData()
		return data;
	}

	function getColumns(){
		return Object.getOwnPropertyNames(data[0])
	}

	function addRow(row){

	}

	function bindData(){
		element.innerHTML = '';
		element.appendChild(renderGrid())
	}	

	function renderGrid(){
		var gridContainer = newDiv();
		gridContainer.appendChild(renderHeader())
		gridContainer.appendChild(renderBody())
		return gridContainer
	}

	function renderBody(){
		var body = newDiv();
		var rows = getFinalData();
		for(row in rows){
			var cRow = addRow();
			for(var i = 0;i< columns.length; i++) {
			 var cell = addColumn();
			 cell.innerHTML = rows[row][columns[i]];
			 cRow.appendChild(cell)
			}
			body.appendChild(cRow);
		}
		return body;
	}

	function renderHeader(){
		var header = addHeader();
		for(var i = 0;i< columns.length; i++) {
			 var hcell = addHeaderCell();
			 hcell.innerHTML = columns[i];
			 header.appendChild(hcell)
		}
		return header;
	}

	function paginatedData(){
		var start = ((options.pageNumber -1) * options.pageSize) ;
		var end = start + options.pageSize;
		return data.slice(start, end);
	}

	function addRow(){
		var newCell = newDiv();
		newCell.className = options.rowClass;
		return newCell;
	}

	function addColumn(){
		var newCol= newDiv();
		newCol.className = options.cellClass;
		newCol.style.width = columnWidth()
		return newCol;
	}

	function addHeader(){
		var newHeader = newDiv();
		newHeader.className = options.headeClass;
		return newHeader;
	}

	function addHeaderCell(){
		var newHeaderCell = newDiv();
		newHeaderCell.className = options.headerCellClass;
		newHeaderCell.style.width = columnWidth()
		return newHeaderCell;
	}

	function newDiv(){
		return document.createElement("div");
	}

	return{
		Init: init
	}

}