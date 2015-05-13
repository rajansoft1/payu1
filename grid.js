var grid = function(data, element, options){
	var self = this;
	var defaultOptions = {
		headerCellClass: 'grid-header-cell',
		headeClass: 'grid-header',
		rowClass: 'grid-row',
		cellClass: 'grid-cell',
		fotterClass: 'grid-fotter',
		conatinerClass: 'container',
		gridClass: 'grid',
		pageNumber: 1,
		pageSize: 3,
		isPaging: true,
		totalPages: function(){
			return Math.ceil(data.length/this.pageSize)
		}
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
		gridContainer.appendChild(renderFotter())
		return gridContainer
	}

	function nextPage(){
		options.pageNumber = options.pageNumber + 1;
		bindData()
	}
	function previousPage(){
		options.pageNumber = options.pageNumber - 1;
		bindData()
	}
	function renderFotter(){
		var fotter = newDiv();
		fotter.className = options.fotterClass;
		var leftButton = document.createElement('Button');
		leftButton.innerHTML = '<';
		leftButton.onclick = previousPage;
		var rightButton = document.createElement('Button');
		rightButton.innerHTML = '>';
		rightButton.onclick = nextPage;
		var currentPage = document.createElement('span');
		currentPage.innerHTML = options.pageNumber + ' of ' + options.totalPages();
		if(options.pageNumber > 1){
		fotter.appendChild(leftButton)
		}
		fotter.appendChild(currentPage)
		if(options.pageNumber < options.totalPages()){
		fotter.appendChild(rightButton)
		}
		return fotter;
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