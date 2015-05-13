		var grid = function(data, element, options){
			var self = this;
			var defaultOptions = {
				headerCellClass: 'grid-header-cell',
				headeClass: 'grid-header',
				rowClass: 'grid-row',
				cellClass: 'grid-cell',
				footerClass: 'grid-footer',
				conatinerClass: 'container',
				gridClass: 'grid',
				pageNumber: 1,
				pageSize: 3,
				isPaging: true,
				formatting: {},
				sortBy: 'paymentId',
				sortOrder: true,
				filters: [],
				filterBy: null,
				filterText: '',
				sorting: [],
				totalPages: function(){
					return Math.ceil(data.length/this.pageSize)
				}
			}
			var dataBackup = data.slice()
			options = options ? util.extend(defaultOptions, options) : defaultOptions;
			var rows = []
			var columns = []
			var columnWidth = function(){
				return (100/(columns.length + 1)) + '%';
			}

			function init(){
				columns = getColumns()
				bindData()
			}

			function getFinalData(){
				var finalData = {}
				finalData = paginatedData()
				return finalData;
			}
			
			function typedData(val){
				if(!isNaN(val)){
					return Number(val)
				}
				if(util.idDate(val)){
					return new Date(val)
				}
				return val;
			}

			function sortData(){
				if(!options.sortBy || !options.sortOrder){
					return
				}

				function compare(a,b) {
					if (typedData(a[options.sortBy]) < typedData(b[options.sortBy])){
		     			return -1;
		     		}
		  			if (typedData(a[options.sortBy]) > typedData(b[options.sortBy])){
		    			return 1;
					}
		  			return 0;
				}
				data = data.sort(compare)
			}
			function getColumns(){
				return Object.getOwnPropertyNames(data[0])
			}

			function addRow(row){

			}

			function bindData(){
				element.innerHTML = '';
				filteData()
				sortData()
				element.appendChild(renderGrid())
			}	

			function renderGrid(){
				var gridContainer = newDiv();
				gridContainer.appendChild(renderHeader())
				gridContainer.appendChild(renderBody())
				gridContainer.appendChild(renderfooter())
				return gridContainer
			}
			function applySorting(elem, col){
				
				elem.onclick = function(){
					if(options.sortBy == col){
					options.sortOrder = !options.sortOrder
					data = data.reverse();
					bindData()
				}
				else{
					options.sortBy = col;
					options.sortOrder = true;
					bindData()
					}
				}
				return elem;
			}

			function nextPage(){
				options.pageNumber = options.pageNumber + 1;
				bindData()
			}
			function previousPage(){
				options.pageNumber = options.pageNumber - 1;
				bindData()
			}
			function renderfooter(){
				var footer = newDiv();
				footer.className = options.footerClass;
				var leftButton = document.createElement('Button');
				leftButton.innerHTML = '<';
				leftButton.onclick = previousPage;
				var rightButton = document.createElement('Button');
				rightButton.innerHTML = '>';
				rightButton.onclick = nextPage;
				var currentPage = document.createElement('span');
				currentPage.innerHTML = options.pageNumber + ' of ' + options.totalPages();
				if(options.pageNumber > 1){
				footer.appendChild(leftButton)
				}
				footer.appendChild(currentPage)
				if(options.pageNumber < options.totalPages()){
				footer.appendChild(rightButton)
				}
				return footer;
			}

			function renderBody(){
				var body = newDiv();
				var rows = getFinalData();
				for(row in rows){
					var cRow = addRow();
					for(var i = 0;i< columns.length; i++) {
					 var cell = addColumn();
					 cell.innerHTML = rows[row][columns[i]];
					 if(options.formatting.hasOwnProperty(columns[i])){
					 	cell = options.formatting[columns[i]](cell);
					 }

					 cRow.appendChild(cell)
					 
					}
					body.appendChild(cRow);
				}
				return body;
			}

	        function bindFilter(elem, col){
				elem.onkeyup = function(){
						options.filterText = event.target.value;
						options.filterBy = col;
						bindData()
				}
				return elem
			}
			function filteData(){
				if(options.filterBy && options.filterText.length > 0){
					data = dataBackup.slice()
					data = data.filter(function(obj){
						if(obj[options.filterBy].indexOf(options.filterText)){
							return false;
						}
						return true;
					})
				}
				else{
					data =dataBackup.slice()
				}
			}
			function renderHeader(){
				var header = addHeader();
				for(var i = 0;i< columns.length; i++) {
					 var hcell = addHeaderCell();
					 if(options.filters.indexOf(columns[i]) > -1){
					 	var input = document.createElement('input');
					 	input.setAttribute('type', 'text');
					 	input.setAttribute('placeholder', columns[i]);
					 	input = bindFilter(input, columns[i])
					 	if(columns[i] == options.filterBy){
					 		input.setAttribute('value', options.filterText)
					 	}
					 	hcell.appendChild(input)

					 }
					 else{
					 	hcell.innerHTML = columns[i];
					 }
					 if(options.sorting.indexOf(columns[i]) > -1){
					 	hcell = applySorting(hcell, columns[i])
					 }
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